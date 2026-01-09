"""
Revenue Tracking Service
VEGA Commission Tracking (13.58%)
"""

from sqlalchemy.orm import Session
from datetime import datetime, date
from typing import Optional
from database import RevenueEntry, Dealer, calculate_vega_commission


def create_revenue_entry(
    db: Session,
    dealer_id: str,
    amount: float,
    revenue_type: str,
    vehicle_id: Optional[str] = None,
    financing_request_id: Optional[str] = None,
    profit_margin: float = 30.0,
    description: Optional[str] = None
) -> RevenueEntry:
    """
    Erstellt einen Revenue Entry mit automatischer VEGA Commission Berechnung
    """
    net_profit, vega_commission = calculate_vega_commission(amount, profit_margin)
    
    revenue_entry = RevenueEntry(
        dealer_id=dealer_id,
        vehicle_id=vehicle_id,
        financing_request_id=financing_request_id,
        amount=amount,
        type=revenue_type,
        currency="EUR",
        profit_margin=profit_margin,
        net_profit=net_profit,
        vega_commission=vega_commission,
        period_date=datetime.now(),
        description=description
    )
    
    db.add(revenue_entry)
    
    # Update dealer totals
    dealer = db.query(Dealer).filter(Dealer.id == dealer_id).first()
    if dealer:
        dealer.total_revenue += amount
        dealer.vega_commission += vega_commission
        if revenue_type == "vehicle_sale":
            dealer.total_sales += 1
    
    db.commit()
    db.refresh(revenue_entry)
    
    return revenue_entry


def get_revenue_summary(
    db: Session,
    dealer_id: Optional[str] = None,
    period: str = "month"
) -> dict:
    """
    Gibt Revenue Summary zurück
    """
    query = db.query(RevenueEntry)
    
    if dealer_id:
        query = query.filter(RevenueEntry.dealer_id == dealer_id)
    
    # Period filter
    now = datetime.now()
    if period == "day":
        cutoff = datetime(now.year, now.month, now.day)
    elif period == "week":
        cutoff = datetime(now.year, now.month, now.day - 7)
    elif period == "month":
        cutoff = datetime(now.year, now.month, 1)
    elif period == "year":
        cutoff = datetime(now.year, 1, 1)
    else:
        cutoff = datetime(1970, 1, 1)
    
    query = query.filter(RevenueEntry.period_date >= cutoff)
    
    entries = query.all()
    
    total_revenue = sum(e.amount for e in entries)
    total_profit = sum(e.net_profit or 0 for e in entries)
    total_commission = sum(e.vega_commission for e in entries)
    
    return {
        "period": period,
        "total_revenue": round(total_revenue, 2),
        "total_profit": round(total_profit, 2),
        "total_commission": round(total_commission, 2),
        "transaction_count": len(entries),
        "by_type": {
            "vehicle_sale": sum(e.amount for e in entries if e.type == "vehicle_sale"),
            "financing": sum(e.amount for e in entries if e.type == "financing"),
            "insurance": sum(e.amount for e in entries if e.type == "insurance"),
            "service": sum(e.amount for e in entries if e.type == "service"),
        }
    }
