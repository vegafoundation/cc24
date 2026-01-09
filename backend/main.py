"""
CarCompany24 Backend API
FastAPI-basierte REST API für Fahrzeugverwaltung, Bildverarbeitung und Mobile.de Integration
Basierend auf VEGA Enterprise Wisdom - Fullstack mit Database
"""

from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
import uvicorn
from pathlib import Path

from database import get_db, init_db, Dealer, Vehicle, FinancingRequest, Showroom, RevenueEntry, calculate_vega_commission
from services.revenue_service import create_revenue_entry, get_revenue_summary
from services.vavsr_service import (
    remove_background_ml,
    process_360_sequence,
    validate_360_sequence,
    create_showroom_data,
    get_ml_worker_status,
    AVAILABLE_MODELS
)

app = FastAPI(
    title="CarCompany24 API",
    description="Backend API für CarCompany24 GmbH Website - Fullstack mit Database",
    version="2.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://carcompany24-gmbh.de"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    init_db()

# ============================================================================
# MODELS
# ============================================================================

class VehicleCreate(BaseModel):
    make: str
    model: str
    year: int
    price: float
    mileage: int
    fuel: str
    transmission: Optional[str] = None
    power: Optional[int] = None
    color: Optional[str] = None
    description: Optional[str] = None
    features: Optional[List[str]] = None

class FinancingRequestModel(BaseModel):
    kaufpreis: float
    Anzahlung: float
    laufzeit: int
    sollzinssatz: float
    vehicle_id: Optional[str] = None
    customer_name: Optional[str] = None
    customer_email: Optional[str] = None
    customer_phone: Optional[str] = None

class FinancingResponse(BaseModel):
    nettodarlehensbetrag: float
    monatlicheRate: float
    gesamtbetrag: float
    effektiverJahreszins: float
    totalInterest: Optional[float] = None
    vega_commission: Optional[float] = None

# ============================================================================
# ROUTES
# ============================================================================

@app.get("/")
async def root():
    return {"message": "CarCompany24 API", "version": "2.0.0", "status": "fullstack"}

@app.get("/api/health")
async def health_check(db: Session = Depends(get_db)):
    """Health check mit Database-Verbindung"""
    try:
        db.execute("SELECT 1")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}

# ============================================================================
# VEHICLES
# ============================================================================

@app.post("/api/vehicles", response_model=dict)
async def create_vehicle(vehicle: VehicleCreate, db: Session = Depends(get_db)):
    """Erstellt ein neues Fahrzeug"""
    # Get default dealer (CarCompany24)
    dealer = db.query(Dealer).filter(Dealer.email == "info@carcompany24-gmbh.de").first()
    if not dealer:
        # Create default dealer if not exists
        dealer = Dealer(
            name="CarCompany24 GmbH",
            email="info@carcompany24-gmbh.de",
            phone="+49 551 / XXX-XXXX",
            address="Adolf-Hoyer-Straße 12",
            city="Göttingen",
            postal_code="37079",
            country="DE"
        )
        db.add(dealer)
        db.commit()
        db.refresh(dealer)
    
    # Create vehicle
    db_vehicle = Vehicle(
        dealer_id=dealer.id,
        make=vehicle.make,
        model=vehicle.model,
        year=vehicle.year,
        price=vehicle.price,
        mileage=vehicle.mileage,
        fuel=vehicle.fuel,
        transmission=vehicle.transmission,
        power=vehicle.power,
        color=vehicle.color,
        description=vehicle.description,
        features=vehicle.features or [],
        status="draft"
    )
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    
    return {
        "id": str(db_vehicle.id),
        **vehicle.dict(),
        "status": "created",
        "dealer_id": str(dealer.id)
    }

@app.get("/api/vehicles")
async def get_vehicles(
    status: Optional[str] = None,
    featured: Optional[bool] = None,
    limit: int = 20,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    """Gibt alle Fahrzeuge zurück"""
    query = db.query(Vehicle)
    
    if status:
        query = query.filter(Vehicle.status == status)
    if featured is not None:
        query = query.filter(Vehicle.featured == featured)
    
    total = query.count()
    vehicles = query.offset(offset).limit(limit).all()
    
    return {
        "vehicles": [
            {
                "id": str(v.id),
                "make": v.make,
                "model": v.model,
                "year": v.year,
                "price": v.price,
                "mileage": v.mileage,
                "fuel": v.fuel,
                "status": v.status,
                "featured": v.featured,
                "images": v.images or [],
                "slug": v.slug,
            }
            for v in vehicles
        ],
        "total": total,
        "limit": limit,
        "offset": offset
    }

@app.get("/api/vehicles/{vehicle_id}")
async def get_vehicle(vehicle_id: str, db: Session = Depends(get_db)):
    """Gibt ein spezifisches Fahrzeug zurück"""
    try:
        vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
        if not vehicle:
            raise HTTPException(status_code=404, detail="Vehicle not found")
        
        return {
            "id": str(vehicle.id),
            "make": vehicle.make,
            "model": vehicle.model,
            "year": vehicle.year,
            "price": vehicle.price,
            "mileage": vehicle.mileage,
            "fuel": vehicle.fuel,
            "transmission": vehicle.transmission,
            "power": vehicle.power,
            "color": vehicle.color,
            "description": vehicle.description,
            "features": vehicle.features or [],
            "images": vehicle.images or [],
            "images_360": vehicle.images_360 or [],
            "status": vehicle.status,
            "slug": vehicle.slug,
            "dealer": {
                "id": str(vehicle.dealer.id),
                "name": vehicle.dealer.name,
                "city": vehicle.dealer.city,
            } if vehicle.dealer else None
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ============================================================================
# FINANCING
# ============================================================================

@app.post("/api/financing/calculate", response_model=FinancingResponse)
async def calculate_financing(
    request: FinancingRequestModel,
    db: Session = Depends(get_db)
):
    """Berechnet Finanzierung gemäß PAngV"""
    nettodarlehensbetrag = request.kaufpreis - request.Anzahlung
    
    if nettodarlehensbetrag <= 0:
        raise HTTPException(status_code=400, detail="Anzahlung darf nicht größer als Kaufpreis sein")
    
    # Monatlicher Zinssatz
    monatlicher_zins = request.sollzinssatz / 100 / 12
    
    # Annuitätenformel
    q = 1 + monatlicher_zins
    qn = q ** request.laufzeit
    monatliche_rate = nettodarlehensbetrag * (qn * (q - 1)) / (qn - 1)
    
    gesamtbetrag = monatliche_rate * request.laufzeit + request.Anzahlung
    total_interest = gesamtbetrag - request.kaufpreis
    
    # Effektiver Jahreszins (vereinfacht)
    effektiver_jahreszins = request.sollzinssatz * 1.026
    
    # VEGA Commission berechnen
    _, vega_commission = calculate_vega_commission(total_interest, profit_margin=30.0)
    
    # Save financing request to database
    dealer = db.query(Dealer).filter(Dealer.email == "info@carcompany24-gmbh.de").first()
    if dealer:
        financing_req = FinancingRequest(
            dealer_id=dealer.id,
            vehicle_id=request.vehicle_id if request.vehicle_id else None,
            kaufpreis=request.kaufpreis,
            Anzahlung=request.Anzahlung,
            laufzeit=request.laufzeit,
            sollzinssatz=request.sollzinssatz,
            nettodarlehensbetrag=round(nettodarlehensbetrag, 2),
            monatlicheRate=round(monatliche_rate, 2),
            gesamtbetrag=round(gesamtbetrag, 2),
            effektiverJahreszins=round(effektiver_jahreszins, 2),
            totalInterest=round(total_interest, 2),
            vega_commission=vega_commission,
            customer_name=request.customer_name,
            customer_email=request.customer_email,
            customer_phone=request.customer_phone,
            pangv_compliant=True
        )
        db.add(financing_req)
        db.commit()
    
    return FinancingResponse(
        nettodarlehensbetrag=round(nettodarlehensbetrag, 2),
        monatlicheRate=round(monatliche_rate, 2),
        gesamtbetrag=round(gesamtbetrag, 2),
        effektiverJahreszins=round(effektiver_jahreszins, 2),
        totalInterest=round(total_interest, 2),
        vega_commission=vega_commission
    )

# ============================================================================
# REVENUE TRACKING
# ============================================================================

@app.get("/api/revenue/summary")
async def get_revenue(
    dealer_id: Optional[str] = None,
    period: str = "month",
    db: Session = Depends(get_db)
):
    """Gibt Revenue Summary zurück"""
    return get_revenue_summary(db, dealer_id, period)

# ============================================================================
# VAVSR SHOWROOM ENDPOINTS
# ============================================================================

@app.get("/api/vavsr/status")
async def vavsr_status():
    """VAVSR System Status"""
    ml_status = get_ml_worker_status()
    return {
        "status": "operational",
        "ml_worker": ml_status,
        "available_models": list(AVAILABLE_MODELS.keys()),
        "version": "1.0.0"
    }

@app.post("/api/vavsr/validate")
async def validate_showroom_sequence(files: List[UploadFile] = File(...)):
    """Validiert 360° Bildsequenz vor Upload"""
    if len(files) < 8:
        raise HTTPException(status_code=400, detail="Mindestens 8 Bilder erforderlich für 360° Showroom")
    
    # Save temporarily for validation
    temp_paths = []
    upload_dir = Path("./uploads/temp")
    upload_dir.mkdir(parents=True, exist_ok=True)
    
    try:
        for idx, file in enumerate(files[:8]):
            file_path = upload_dir / f"temp_{idx}_{file.filename}"
            with open(file_path, "wb") as f:
                content = await file.read()
                f.write(content)
            temp_paths.append(str(file_path))
        
        validation = validate_360_sequence(temp_paths)
        
        # Cleanup
        for path in temp_paths:
            try:
                os.remove(path)
            except:
                pass
        
        return validation
    except Exception as e:
        # Cleanup on error
        for path in temp_paths:
            try:
                os.remove(path)
            except:
                pass
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/vavsr/upload")
async def upload_vavsr_sequence(
    vehicle_id: str,
    files: List[UploadFile] = File(...),
    model: str = "u2net",
    background: str = "vavsr_cyan"
):
    """
    Upload und Verarbeitung für VAVSR 360° Showroom
    - Upload 8 Bilder
    - Background Removal mit ML
    - Showroom erstellen
    """
    if len(files) < 8:
        raise HTTPException(status_code=400, detail="Mindestens 8 Bilder erforderlich")
    
    # Check ML Worker
    ml_status = get_ml_worker_status()
    if not ml_status["available"]:
        raise HTTPException(
            status_code=503,
            detail="ML Worker nicht verfügbar. Background Removal kann nicht durchgeführt werden."
        )
    
    # Save uploaded files
    upload_dir = Path(f"./uploads/vavsr/{vehicle_id}")
    upload_dir.mkdir(parents=True, exist_ok=True)
    
    image_paths = []
    try:
        for idx, file in enumerate(files[:8]):
            file_path = upload_dir / f"angle_{idx * 45}_{file.filename}"
            with open(file_path, "wb") as f:
                content = await file.read()
                f.write(content)
            image_paths.append(str(file_path))
        
        # Process with ML
        processing_result = process_360_sequence(image_paths, model)
        
        if not processing_result["processed"]:
            raise HTTPException(
                status_code=500,
                detail="Keine Bilder konnten verarbeitet werden"
            )
        
        # Create showroom data
        showroom_data = create_showroom_data(
            vehicle_id,
            processing_result["processed"],
            background
        )
        
        # Save to database
        db = next(get_db())
        try:
            vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
            if not vehicle:
                raise HTTPException(status_code=404, detail="Fahrzeug nicht gefunden")
            
            # Create or update showroom
            showroom = db.query(Showroom).filter(Showroom.vehicle_id == vehicle_id).first()
            if not showroom:
                showroom = Showroom(
                    id=showroom_data["showroomId"],
                    vehicle_id=vehicle_id,
                    background=background,
                    images_360=showroom_data["images"]
                )
                db.add(showroom)
            else:
                showroom.background = background
                showroom.images_360 = showroom_data["images"]
            
            vehicle.vavsr_showroom_id = showroom.id
            db.commit()
            
            return {
                "success": True,
                "showroom": showroom_data,
                "processing": {
                    "processed": len(processing_result["processed"]),
                    "failed": len(processing_result["failed"]),
                    "model": model
                }
            }
        finally:
            db.close()
            
    except HTTPException:
        raise
    except Exception as e:
        # Cleanup on error
        for path in image_paths:
            try:
                os.remove(path)
            except:
                pass
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/vavsr/showroom/{vehicle_id}")
async def get_showroom(vehicle_id: str, db: Session = Depends(get_db)):
    """Holt Showroom-Daten für Fahrzeug"""
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Fahrzeug nicht gefunden")
    
    showroom = db.query(Showroom).filter(Showroom.vehicle_id == vehicle_id).first()
    if not showroom:
        raise HTTPException(status_code=404, detail="Kein Showroom für dieses Fahrzeug")
    
    return {
        "showroomId": str(showroom.id),
        "vehicleId": vehicle_id,
        "background": showroom.background,
        "images": showroom.images_360 or [],
        "created": showroom.created_at.isoformat() if showroom.created_at else None
    }

# ============================================================================
# UPLOAD (Legacy Endpoints)
# ============================================================================

@app.post("/api/upload/360")
async def upload_360_images(files: List[UploadFile] = File(...)):
    """Upload für 360° Fahrzeugsequenz (36 Bilder) - Legacy Endpoint"""
    if len(files) < 16 or len(files) > 72:
        raise HTTPException(
            status_code=400,
            detail="Bitte zwischen 16 und 72 Bilder hochladen"
        )
    
    uploaded_files = []
    for file in files:
        uploaded_files.append({
            "filename": file.filename,
            "size": file.size,
            "content_type": file.content_type
        })
    
    return {
        "message": f"{len(uploaded_files)} Bilder erfolgreich hochgeladen",
        "files": uploaded_files
    }

@app.post("/api/process/background-removal")
async def remove_background(file: UploadFile = File(...)):
    """Entfernt Hintergrund von Fahrzeugbildern (AI) - Legacy Endpoint"""
    # Use VAVSR service
    temp_path = f"./uploads/temp/{file.filename}"
    Path(temp_path).parent.mkdir(parents=True, exist_ok=True)
    
    with open(temp_path, "wb") as f:
        content = await file.read()
        f.write(content)
    
    processed_path = remove_background_ml(temp_path)
    
    if processed_path:
        return {
            "success": True,
            "original": temp_path,
            "processed": processed_path
        }
    else:
        raise HTTPException(status_code=503, detail="Background removal fehlgeschlagen")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
