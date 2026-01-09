"""
CC24 Virtual Showroom - ML Worker
Background Removal with Rembg (BiRefNet/U2Net)
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import os
import io
import base64
from PIL import Image

# Try to import rembg, fallback if not available
try:
    from rembg import remove, new_session
    REMBG_AVAILABLE = True
except ImportError:
    REMBG_AVAILABLE = False
    print("⚠️ rembg not installed. Run: pip install rembg[gpu]")

app = FastAPI(
    title="CC24 ML Worker",
    description="Background removal service for CC24 Virtual Showroom",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
PROCESSED_DIR = os.getenv("PROCESSED_DIR", "./processed")
Path(PROCESSED_DIR).mkdir(parents=True, exist_ok=True)

# Available models
MODELS = {
    "u2net": "u2net",
    "u2netp": "u2netp",  # Lightweight, faster
    "u2net_human_seg": "u2net_human_seg",
    "isnet-general-use": "isnet-general-use",
    "birefnet-general": "birefnet-general",  # Best quality
}

# Pre-load default session
ml_session = None
if REMBG_AVAILABLE:
    try:
        ml_session = new_session("u2net")
        print("✅ ML Session loaded with u2net model")
    except Exception as e:
        print(f"⚠️ Could not load ML model: {e}")

# ============================================================================
# REQUEST MODELS
# ============================================================================

class RemoveBackgroundRequest(BaseModel):
    imagePath: str
    model: str = "u2net"
    outputFormat: str = "png"
    alphaMatting: bool = False

class RemoveBackgroundBase64Request(BaseModel):
    imageBase64: str
    model: str = "u2net"
    alphaMatting: bool = False

class PlateDetectionRequest(BaseModel):
    imagePath: str
    blur: bool = True
    blurStrength: int = 50

# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "rembg_available": REMBG_AVAILABLE,
        "models": list(MODELS.keys()),
        "session_loaded": ml_session is not None
    }

@app.get("/models")
async def list_models():
    return {
        "models": MODELS,
        "recommended": "birefnet-general",
        "fastest": "u2netp"
    }

@app.post("/remove-background")
async def remove_background(request: RemoveBackgroundRequest):
    """Remove background from image file"""
    
    if not REMBG_AVAILABLE:
        raise HTTPException(
            status_code=503,
            detail="rembg not installed. Run: pip install rembg[gpu]"
        )
    
    input_path = Path(request.imagePath)
    if not input_path.exists():
        raise HTTPException(status_code=404, detail=f"File not found: {request.imagePath}")
    
    try:
        # Load image
        with open(input_path, "rb") as f:
            input_data = f.read()
        
        # Get or create session for model
        model_name = MODELS.get(request.model, "u2net")
        session = new_session(model_name)
        
        # Remove background
        output_data = remove(
            input_data,
            session=session,
            alpha_matting=request.alphaMatting,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
        )
        
        # Save output
        output_filename = f"nobg_{input_path.stem}.png"
        output_path = Path(PROCESSED_DIR) / input_path.parent.name / output_filename
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_path, "wb") as f:
            f.write(output_data)
        
        return {
            "success": True,
            "inputPath": str(input_path),
            "outputPath": str(output_path),
            "model": model_name,
            "outputSize": len(output_data)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/remove-background-base64")
async def remove_background_base64(request: RemoveBackgroundBase64Request):
    """Remove background from base64 encoded image"""
    
    if not REMBG_AVAILABLE:
        raise HTTPException(
            status_code=503,
            detail="rembg not installed. Run: pip install rembg[gpu]"
        )
    
    try:
        # Decode base64
        image_data = base64.b64decode(request.imageBase64)
        
        # Get or create session
        model_name = MODELS.get(request.model, "u2net")
        session = new_session(model_name)
        
        # Remove background
        output_data = remove(
            image_data,
            session=session,
            alpha_matting=request.alphaMatting
        )
        
        # Encode result
        output_base64 = base64.b64encode(output_data).decode("utf-8")
        
        return {
            "success": True,
            "imageBase64": output_base64,
            "model": model_name
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/batch-process")
async def batch_process(image_paths: list[str], model: str = "u2net"):
    """Process multiple images at once"""
    
    if not REMBG_AVAILABLE:
        raise HTTPException(status_code=503, detail="rembg not installed")
    
    results = []
    model_name = MODELS.get(model, "u2net")
    session = new_session(model_name)
    
    for img_path in image_paths:
        try:
            input_path = Path(img_path)
            if not input_path.exists():
                results.append({"path": img_path, "success": False, "error": "File not found"})
                continue
            
            with open(input_path, "rb") as f:
                input_data = f.read()
            
            output_data = remove(input_data, session=session)
            
            output_filename = f"nobg_{input_path.stem}.png"
            output_path = Path(PROCESSED_DIR) / input_path.parent.name / output_filename
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            with open(output_path, "wb") as f:
                f.write(output_data)
            
            results.append({
                "path": img_path,
                "success": True,
                "outputPath": str(output_path)
            })
            
        except Exception as e:
            results.append({"path": img_path, "success": False, "error": str(e)})
    
    return {
        "processed": len([r for r in results if r["success"]]),
        "failed": len([r for r in results if not r["success"]]),
        "results": results
    }

@app.post("/detect-plate")
async def detect_plate(request: PlateDetectionRequest):
    """Detect and optionally blur license plate (GDPR compliance)"""
    
    # This is a placeholder - in production, use Fast-ALPR or OpenALPR
    # pip install fast-alpr
    
    try:
        from PIL import Image, ImageFilter
        
        input_path = Path(request.imagePath)
        if not input_path.exists():
            raise HTTPException(status_code=404, detail="File not found")
        
        img = Image.open(input_path)
        
        # Placeholder: In production, use actual plate detection
        # from fast_alpr import ALPR
        # alpr = ALPR()
        # detections = alpr.predict(input_path)
        
        # For demo: return mock detection
        return {
            "success": True,
            "detected": False,  # Would be True if plate found
            "message": "Plate detection requires fast-alpr. Install with: pip install fast-alpr",
            "blurred": False
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# MAIN
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    
    print("""
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🤖 CC24 ML Worker - Background Removal Service          ║
║                                                           ║
║   Starting on: http://localhost:8001                      ║
║   Docs:        http://localhost:8001/docs                 ║
║                                                           ║
║   Models:      u2net, u2netp, birefnet-general            ║
║   rembg:       """ + ("✅ Available" if REMBG_AVAILABLE else "❌ Not installed") + """                              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    """)
    
    uvicorn.run(app, host="0.0.0.0", port=8001)
