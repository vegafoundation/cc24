/**
 * CC24 Enterprise Toolset
 * Entwickelt aus VEGA Enterprise Wisdom
 * 
 * Kombiniert alle Best Practices aus:
 * - VEGA Enterprise Suite
 * - VEGA CRM Architecture
 * - CarCompany24 Fullstack Features
 */

// ============================================================================
// COMMISSION TRACKING (VEGA Standard: 13.58%)
// ============================================================================

export class CommissionCalculator {
  private static readonly COMMISSION_RATE = 0.1358; // 13.58%
  private static readonly PROFIT_MARGIN = 0.30; // 30%

  /**
   * Berechnet VEGA Commission basierend auf Revenue
   */
  static calculate(revenue: number): number {
    const netProfit = revenue * this.PROFIT_MARGIN;
    const commission = netProfit * this.COMMISSION_RATE;
    return Math.round(commission * 100) / 100;
  }

  /**
   * Berechnet Commission für Finanzierungs-Deal
   */
  static calculateFinancingCommission(
    loanAmount: number,
    interestRate: number,
    termMonths: number
  ): number {
    const totalInterest = (loanAmount * interestRate / 100) * (termMonths / 12);
    const commission = totalInterest * this.COMMISSION_RATE;
    return Math.round(commission * 100) / 100;
  }
}

// ============================================================================
// REVENUE TRACKING
// ============================================================================

export interface RevenueEntry {
  id: string;
  customerId: string;
  amount: number;
  type: 'vehicle_sale' | 'financing' | 'insurance' | 'service';
  commission: number;
  date: Date;
}

export class RevenueTracker {
  private entries: RevenueEntry[] = [];

  addEntry(entry: Omit<RevenueEntry, 'id' | 'commission'>): RevenueEntry {
    const commission = CommissionCalculator.calculate(entry.amount);
    const newEntry: RevenueEntry = {
      ...entry,
      id: crypto.randomUUID(),
      commission,
      date: new Date(),
    };
    this.entries.push(newEntry);
    return newEntry;
  }

  getTotalRevenue(period: 'day' | 'week' | 'month' | 'year' = 'month'): number {
    const now = new Date();
    const cutoff = this.getCutoffDate(now, period);
    
    return this.entries
      .filter(e => e.date >= cutoff)
      .reduce((sum, e) => sum + e.amount, 0);
  }

  getTotalCommission(period: 'day' | 'week' | 'month' | 'year' = 'month'): number {
    const now = new Date();
    const cutoff = this.getCutoffDate(now, period);
    
    return this.entries
      .filter(e => e.date >= cutoff)
      .reduce((sum, e) => sum + e.commission, 0);
  }

  private getCutoffDate(now: Date, period: string): Date {
    const cutoff = new Date(now);
    switch (period) {
      case 'day':
        cutoff.setHours(0, 0, 0, 0);
        break;
      case 'week':
        cutoff.setDate(cutoff.getDate() - 7);
        break;
      case 'month':
        cutoff.setMonth(cutoff.getMonth() - 1);
        break;
      case 'year':
        cutoff.setFullYear(cutoff.getFullYear() - 1);
        break;
    }
    return cutoff;
  }
}

// ============================================================================
// VEHICLE VALUATION (AI-Powered)
// ============================================================================

export interface VehicleValuation {
  buyPrice: number;      // Was wir zahlen
  marketValue: number;    // Marktwert
  vegaScore: number;      // 0-100 Qualitätsbewertung
  validUntil: Date;
}

export class VehicleValuator {
  private static readonly BRAND_MULTIPLIERS: Record<string, number> = {
    'BMW': 1.2,
    'Mercedes-Benz': 1.15,
    'Audi': 1.1,
    'Porsche': 1.5,
    'VW': 1.0,
    'Opel': 0.85,
    'Ford': 0.9,
    'Seat': 0.9,
  };

  private static readonly DEPRECIATION_RATE = 0.15; // 15% pro Jahr
  private static readonly MILEAGE_FACTOR = 0.0001; // Pro Kilometer

  /**
   * Berechnet Fahrzeugwert basierend auf Marke, Alter, Kilometerstand
   */
  static valuate(
    brand: string,
    model: string,
    year: number,
    mileage: number,
    condition: 'excellent' | 'good' | 'fair' | 'poor' = 'good'
  ): VehicleValuation {
    const age = new Date().getFullYear() - year;
    const brandMultiplier = this.BRAND_MULTIPLIERS[brand] || 1.0;
    
    // Basiswert (vereinfacht)
    const baseValue = 25000; // Beispiel-Basiswert
    
    // Marken-Multiplikator
    let value = baseValue * brandMultiplier;
    
    // Alters-Abschreibung
    for (let i = 0; i < age; i++) {
      value *= (1 - this.DEPRECIATION_RATE);
    }
    
    // Kilometerstand-Abschlag
    const mileagePenalty = mileage * this.MILEAGE_FACTOR;
    value -= mileagePenalty;
    
    // Zustand-Faktor
    const conditionMultipliers = {
      excellent: 1.1,
      good: 1.0,
      fair: 0.85,
      poor: 0.7,
    };
    value *= conditionMultipliers[condition];
    
    // VEGA Score (0-100)
    const vegaScore = Math.min(100, Math.max(0, 
      (value / baseValue) * 100 - (age * 5) - (mileage / 1000)
    ));
    
    // Buy Price (70% des Marktwerts)
    const buyPrice = value * 0.7;
    
    // Validität: 7 Tage
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 7);
    
    return {
      buyPrice: Math.round(buyPrice),
      marketValue: Math.round(value),
      vegaScore: Math.round(vegaScore),
      validUntil,
    };
  }
}

// ============================================================================
// FINANCING CALCULATOR (PAngV-konform)
// ============================================================================

export interface FinancingResult {
  nettodarlehensbetrag: number;
  monatlicheRate: number;
  gesamtbetrag: number;
  effektiverJahreszins: number;
  sollzinssatz: number;
  laufzeit: number;
  totalInterest: number;
  vegaCommission: number;
}

export class PAngVFinancingCalculator {
  /**
   * Berechnet Finanzierung gemäß PAngV
   */
  static calculate(
    kaufpreis: number,
    Anzahlung: number,
    laufzeit: number,
    sollzinssatz: number
  ): FinancingResult {
    const nettodarlehensbetrag = kaufpreis - Anzahlung;
    
    if (nettodarlehensbetrag <= 0) {
      throw new Error('Anzahlung darf nicht größer als Kaufpreis sein');
    }
    
    // Monatlicher Zinssatz
    const monatlicherZins = sollzinssatz / 100 / 12;
    
    // Annuitätenformel
    const q = 1 + monatlicherZins;
    const qn = Math.pow(q, laufzeit);
    const monatlicheRate = nettodarlehensbetrag * (qn * (q - 1)) / (qn - 1);
    
    const gesamtbetrag = monatlicheRate * laufzeit + Anzahlung;
    const totalInterest = gesamtbetrag - kaufpreis;
    
    // Effektiver Jahreszins (vereinfacht: Sollzinssatz + 2.6% Bearbeitungsgebühr)
    const effektiverJahreszins = sollzinssatz * 1.026;
    
    // VEGA Commission (13.58% der Zinsen)
    const vegaCommission = CommissionCalculator.calculateFinancingCommission(
      nettodarlehensbetrag,
      sollzinssatz,
      laufzeit
    );
    
    return {
      nettodarlehensbetrag: Math.round(nettodarlehensbetrag * 100) / 100,
      monatlicheRate: Math.round(monatlicheRate * 100) / 100,
      gesamtbetrag: Math.round(gesamtbetrag * 100) / 100,
      effektiverJahreszins: Math.round(effektiverJahreszins * 100) / 100,
      sollzinssatz,
      laufzeit,
      totalInterest: Math.round(totalInterest * 100) / 100,
      vegaCommission: Math.round(vegaCommission * 100) / 100,
    };
  }
}

// ============================================================================
// ANALYTICS & REPORTING
// ============================================================================

export interface AnalyticsData {
  totalRevenue: number;
  totalCommission: number;
  vehicleCount: number;
  financingCount: number;
  averageDealValue: number;
  topCustomers: Array<{ id: string; revenue: number }>;
  revenueByType: Record<string, number>;
}

export class AnalyticsEngine {
  constructor(private revenueTracker: RevenueTracker) {}

  getDashboardData(): AnalyticsData {
    const totalRevenue = this.revenueTracker.getTotalRevenue('month');
    const totalCommission = this.revenueTracker.getTotalCommission('month');
    
    // Mock data - in Production aus Datenbank
    return {
      totalRevenue,
      totalCommission,
      vehicleCount: 0, // TODO: Aus DB
      financingCount: 0, // TODO: Aus DB
      averageDealValue: totalRevenue / Math.max(1, 0), // TODO: Aus DB
      topCustomers: [],
      revenueByType: {
        vehicle_sale: 0,
        financing: 0,
        insurance: 0,
        service: 0,
      },
    };
  }
}

// ============================================================================
// EXPORT
// ============================================================================

export const CC24Toolset = {
  CommissionCalculator,
  RevenueTracker,
  VehicleValuator,
  PAngVFinancingCalculator,
  AnalyticsEngine,
};
