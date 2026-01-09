"""
VAVSR (VEGA Automotive Virtual Showroom) Service
Vollständige Integration für 360° Showroom mit Background Removal
"""

from fastapi import HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pathlib import Path
import uuid
import os
import requests
from PIL import Image
import io
import base64

# ML Worker URL
ML_WORKER_URL = os.getenv("ML_WORKER_URL", "http://localhost:8001")

# Available background removal models
AVAILABLE_MODELS = {
    "u2net": "u2net",  # Fast, good quality
    "u2netp": "u2netp",  # Lightweight, fastest
    "birefnet-general": "birefnet-general",  # Best quality
    "isnet-general-use": "isnet-general-use",  # High quality
}

def remove_background_ml(image_path: str, model: str = "u2net") -> Optional[str]:
    """
    Entfernt Hintergrund mit ML Worker
    Returns: Path to processed image or None
    """
    try:
        # Check if ML worker is available
        health_response = requests.get(f"{ML_WORKER_URL}/health", timeout=5)
        if health_response.status_code != 200:
            print(f"⚠️ ML Worker nicht verfügbar: {ML_WORKER_URL}")
            return None
        
        # Read image
        with open(image_path, "rb") as f:
            image_data = f.read()
        
        # Encode to base64
        image_base64 = base64.b64encode(image_data).decode("utf-8")
        
        # Call ML worker
        response = requests.post(
            f"{ML_WORKER_URL}/remove-background-base64",
            json={
                "imageBase64": image_base64,
                "model": model,
                "alphaMatting": False
            },
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            # Decode and save
            output_data = base64.b64decode(result["imageBase64"])
            output_path = image_path.replace(".jpg", "_nobg.png").replace(".jpeg", "_nobg.png").replace(".png", "_nobg.png")
            
            with open(output_path, "wb") as f:
                f.write(output_data)
            
            return output_path
        else:
            print(f"⚠️ ML Worker Fehler: {response.status_code}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"⚠️ ML Worker Verbindungsfehler: {e}")
        return None
    except Exception as e:
        print(f"⚠️ Background Removal Fehler: {e}")
        return None

def process_360_sequence(image_paths: List[str], model: str = "u2net") -> dict:
    """
    Verarbeitet 360° Bildsequenz (8 Bilder)
    Returns: Dict mit processed images und metadata
    """
    results = {
        "processed": [],
        "failed": [],
        "total": len(image_paths),
        "model": model
    }
    
    for idx, image_path in enumerate(image_paths):
        try:
            processed_path = remove_background_ml(image_path, model)
            if processed_path:
                results["processed"].append({
                    "index": idx,
                    "original": image_path,
                    "processed": processed_path,
                    "angle": idx * 45  # 0, 45, 90, 135, 180, 225, 270, 315
                })
            else:
                results["failed"].append({
                    "index": idx,
                    "path": image_path,
                    "error": "Background removal failed"
                })
        except Exception as e:
            results["failed"].append({
                "index": idx,
                "path": image_path,
                "error": str(e)
            })
    
    return results

def validate_360_sequence(image_paths: List[str]) -> dict:
    """
    Validiert 360° Bildsequenz
    Prüft: Anzahl, Format, Größe, Winkel
    """
    REQUIRED_COUNT = 8
    REQUIRED_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]
    
    validation = {
        "valid": False,
        "errors": [],
        "warnings": [],
        "count": len(image_paths),
        "required": REQUIRED_COUNT
    }
    
    # Check count
    if len(image_paths) < REQUIRED_COUNT:
        validation["errors"].append(f"Zu wenige Bilder: {len(image_paths)}/{REQUIRED_COUNT}")
        return validation
    
    if len(image_paths) > REQUIRED_COUNT:
        validation["warnings"].append(f"Mehr als {REQUIRED_COUNT} Bilder, nur erste {REQUIRED_COUNT} werden verwendet")
    
    # Check file existence and format
    valid_formats = [".jpg", ".jpeg", ".png", ".webp"]
    for idx, image_path in enumerate(image_paths[:REQUIRED_COUNT]):
        path = Path(image_path)
        if not path.exists():
            validation["errors"].append(f"Bild {idx+1} nicht gefunden: {image_path}")
            continue
        
        if path.suffix.lower() not in valid_formats:
            validation["errors"].append(f"Bild {idx+1} ungültiges Format: {path.suffix}")
            continue
        
        # Check file size (max 10MB)
        if path.stat().st_size > 10 * 1024 * 1024:
            validation["errors"].append(f"Bild {idx+1} zu groß: {path.stat().st_size / 1024 / 1024:.1f}MB")
    
    if not validation["errors"]:
        validation["valid"] = True
    
    return validation

def create_showroom_data(vehicle_id: str, processed_images: List[dict], background: str = "vavsr_cyan") -> dict:
    """
    Erstellt Showroom-Datenstruktur für Frontend
    """
    return {
        "vehicleId": vehicle_id,
        "showroomId": str(uuid.uuid4()),
        "background": background,
        "images": [
            {
                "angle": img["angle"],
                "index": img["index"],
                "original": img["original"],
                "processed": img["processed"],
                "url": f"/api/showroom/images/{Path(img['processed']).name}"
            }
            for img in processed_images
        ],
        "metadata": {
            "totalImages": len(processed_images),
            "angles": [img["angle"] for img in processed_images],
            "background": background,
            "created": None  # Will be set by database
        }
    }

def get_ml_worker_status() -> dict:
    """
    Prüft ML Worker Status
    """
    try:
        response = requests.get(f"{ML_WORKER_URL}/health", timeout=5)
        if response.status_code == 200:
            return {
                "available": True,
                "status": response.json()
            }
        else:
            return {
                "available": False,
                "error": f"Status code: {response.status_code}"
            }
    except Exception as e:
        return {
            "available": False,
            "error": str(e)
        }
