"""
Database Connection & Models
Basierend auf VEGA Enterprise Wisdom
"""

from sqlalchemy import create_engine, Column, String, Integer, Float, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
import os
from typing import Optional

# Database URL from environment
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/cc24"
)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class Dealer(Base):
    """Autohändler Model"""
    __tablename__ = "dealers"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(50))
    address = Column(Text)
    city = Column(String(100))
    postal_code = Column(String(20))
    country = Column(String(100), default="DE")
    rating = Column(Float, default=0.0)
    total_listings = Column(Integer, default=0)
    total_sales = Column(Integer, default=0)
    total_revenue = Column(Float, default=0.0)
    vega_commission = Column(Float, default=0.0)
    status = Column(String(50), default="active")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    vehicles = relationship("Vehicle", back_populates="dealer")
    financing_requests = relationship("FinancingRequest", back_populates="dealer")


class Vehicle(Base):
    """Fahrzeug Model"""
    __tablename__ = "vehicles"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    dealer_id = Column(UUID(as_uuid=True), ForeignKey("dealers.id"), nullable=False)
    
    # Basic Info
    make = Column(String(100), nullable=False)
    model = Column(String(100), nullable=False)
    year = Column(Integer, nullable=False)
    mileage = Column(Integer, nullable=False)
    fuel = Column(String(50), nullable=False)
    transmission = Column(String(50))
    power = Column(Integer)  # PS
    color = Column(String(50))
    
    # Pricing
    price = Column(Float, nullable=False)
    original_price = Column(Float)
    
    # Description
    description = Column(Text)
    features = Column(JSON)
    
    # Images
    images = Column(JSON)
    images_360 = Column(JSON)
    vavsr_showroom_id = Column(UUID(as_uuid=True))
    
    # Valuation
    buy_price = Column(Float)
    market_value = Column(Float)
    vega_score = Column(Integer)  # 0-100
    
    # Status
    status = Column(String(50), default="draft")
    featured = Column(Boolean, default=False)
    
    # SEO
    slug = Column(String(255), unique=True)
    meta_title = Column(String(255))
    meta_description = Column(Text)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    published_at = Column(DateTime)
    sold_at = Column(DateTime)
    
    # Relationships
    dealer = relationship("Dealer", back_populates="vehicles")
    financing_requests = relationship("FinancingRequest", back_populates="vehicle")
    showroom = relationship("Showroom", back_populates="vehicle", uselist=False)


class FinancingRequest(Base):
    """Finanzierungsanfrage Model"""
    __tablename__ = "financing_requests"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vehicle_id = Column(UUID(as_uuid=True), ForeignKey("vehicles.id"))
    dealer_id = Column(UUID(as_uuid=True), ForeignKey("dealers.id"), nullable=False)
    customer_id = Column(UUID(as_uuid=True))
    
    # Request Data
    kaufpreis = Column(Float, nullable=False)
    Anzahlung = Column(Float, nullable=False)
    laufzeit = Column(Integer, nullable=False)  # Monate
    sollzinssatz = Column(Float, nullable=False)
    
    # Calculated
    nettodarlehensbetrag = Column(Float)
    monatlicheRate = Column(Float)
    gesamtbetrag = Column(Float)
    effektiverJahreszins = Column(Float)
    totalInterest = Column(Float)
    vega_commission = Column(Float)
    
    # Customer Info
    customer_name = Column(String(255))
    customer_email = Column(String(255))
    customer_phone = Column(String(50))
    credit_score = Column(Integer)
    
    # Status
    status = Column(String(50), default="pending")
    pangv_compliant = Column(Boolean, default=True)
    representative_example = Column(Text)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    approved_at = Column(DateTime)
    completed_at = Column(DateTime)
    
    # Relationships
    vehicle = relationship("Vehicle", back_populates="financing_requests")
    dealer = relationship("Dealer", back_populates="financing_requests")


class Showroom(Base):
    """VAVSR 360° Showroom Model"""
    __tablename__ = "showrooms"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vehicle_id = Column(UUID(as_uuid=True), ForeignKey("vehicles.id"), nullable=False)
    dealer_id = Column(UUID(as_uuid=True), ForeignKey("dealers.id"), nullable=False)
    
    # Showroom Data
    background = Column(String(50), default="vavsr_cyan")
    frames = Column(Integer, default=36)
    images = Column(JSON, nullable=False)
    images_360 = Column(JSON)  # 360° processed images
    
    # Processing Status
    status = Column(String(50), default="processing")
    processing_progress = Column(Integer, default=0)  # 0-100
    
    # Export
    exported_to_mobilede = Column(Boolean, default=False)
    exported_to_autoscout24 = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    completed_at = Column(DateTime)
    
    # Relationships
    vehicle = relationship("Vehicle", back_populates="showroom")


class RevenueEntry(Base):
    """Umsatz-Tracking Model"""
    __tablename__ = "revenue_entries"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    dealer_id = Column(UUID(as_uuid=True), ForeignKey("dealers.id"), nullable=False)
    vehicle_id = Column(UUID(as_uuid=True), ForeignKey("vehicles.id"))
    financing_request_id = Column(UUID(as_uuid=True), ForeignKey("financing_requests.id"))
    
    # Revenue Data
    amount = Column(Float, nullable=False)
    type = Column(String(50), nullable=False)  # 'vehicle_sale', 'financing', etc.
    currency = Column(String(3), default="EUR")
    
    # Commission (VEGA 13.58%)
    profit_margin = Column(Float, default=30.0)  # 30%
    net_profit = Column(Float)
    vega_commission = Column(Float, nullable=False)
    
    # Period
    period_date = Column(DateTime, nullable=False)
    
    # Metadata
    description = Column(Text)
    metadata = Column(JSON)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)


def get_db():
    """Dependency for database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Initialize database tables"""
    Base.metadata.create_all(bind=engine)


def calculate_vega_commission(amount: float, profit_margin: float = 30.0) -> tuple:
    """
    Berechnet VEGA Commission (13.58%)
    
    Args:
        amount: Der Umsatzbetrag
        profit_margin: Die Gewinnmarge in Prozent (Standard: 30%)
    
    Returns:
        tuple: (net_profit, vega_commission)
    """
    net_profit = amount * (profit_margin / 100)
    vega_commission = net_profit * 0.1358  # 13.58%
    return round(net_profit, 2), round(vega_commission, 2)
