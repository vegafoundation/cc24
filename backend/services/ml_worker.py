"""
CC24 ML Worker - Background Removal Service
Basierend auf VEGA Enterprise Wisdom
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import base64
import io
from PIL import Image

app = FastAPI(
    title="CC24 ML Worker",
    description="Background Removal Service für VAVSR Showroom",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Lazy load rembg to avoid startup delay
_rembg_session = None

def get_rembg_session():
    """Lazy load rembg session"""
    global _rembg_session
    if _rembg_session is None:
        from rembg import new_session
        _rembg_session = new_session("u2net")
    return _rembg_session


class BackgroundRemovalRequest(BaseModel):
    imageBase64: str
    model: Optional[str] = "u2net"
    alphaMatting: Optional[bool] = False


class BackgroundRemovalResponse(BaseModel):
    success: bool
    imageBase64: Optional[str] = None
    error: Optional[str] = None


@app.get("/")
async def root():
    return {"service": "CC24 ML Worker", "version": "1.0.0", "status": "running"}


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ml-worker"}


@app.get("/models")
async def list_models():
    """List available background removal models"""
    return {
        "models": [
            {"id": "u2net", "name": "U2-Net", "description": "Fast, good quality"},
            {"id": "u2netp", "name": "U2-Net-P", "description": "Lightweight, fastest"},
            {"id": "isnet-general-use", "name": "IS-Net", "description": "High quality"},
        ],
        "default": "u2net"
    }


@app.post("/remove-background-base64", response_model=BackgroundRemovalResponse)
async def remove_background_base64(request: BackgroundRemovalRequest):
    """
    Entfernt Hintergrund von Base64-codiertem Bild
    """
    try:
        # Decode base64 image
        image_data = base64.b64decode(request.imageBase64)
        input_image = Image.open(io.BytesIO(image_data))
        
        # Convert to RGB if necessary
        if input_image.mode != "RGB":
            input_image = input_image.convert("RGB")
        
        # Remove background using rembg
        from rembg import remove
        output_image = remove(
            input_image,
            session=get_rembg_session(),
            alpha_matting=request.alphaMatting
        )
        
        # Encode result to base64
        output_buffer = io.BytesIO()
        output_image.save(output_buffer, format="PNG")
        output_base64 = base64.b64encode(output_buffer.getvalue()).decode("utf-8")
        
        return BackgroundRemovalResponse(
            success=True,
            imageBase64=output_base64
        )
        
    except Exception as e:
        return BackgroundRemovalResponse(
            success=False,
            error=str(e)
        )


@app.post("/remove-background")
async def remove_background_file(file: bytes):
    """
    Entfernt Hintergrund von hochgeladenem Bild (Raw bytes)
    """
    try:
        input_image = Image.open(io.BytesIO(file))
        
        if input_image.mode != "RGB":
            input_image = input_image.convert("RGB")
        
        from rembg import remove
        output_image = remove(
            input_image,
            session=get_rembg_session()
        )
        
        output_buffer = io.BytesIO()
        output_image.save(output_buffer, format="PNG")
        
        return {
            "success": True,
            "imageBase64": base64.b64encode(output_buffer.getvalue()).decode("utf-8")
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
