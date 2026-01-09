import React, { useState, useEffect, useCallback } from 'react';

// ============================================================================
// CC24 - CARCENTER24 PREMIUM AUTO TRADING PLATFORM
// ============================================================================
// Features:
// - Fahrzeugbewertung (Vehicle Valuation) with FIN/Zulassungsnummer
// - UberEats-Style Vehicle Browsing & Selection
// - Financing Calculator with German Bank Partners
// - Admin Portal with Inventory Management
// - Customer CRM & Tracking
// - Mobile.de API Integration Ready
// ============================================================================

// Design Tokens - VEGA-Aligned Premium Automotive
const tokens = {
  colors: {
    deepAqua: '#0A2F3F',
    aetherEquilibrium: '#1A4B5C',
    liquidQuicksilver: '#B8C5CC',
    darkNavy: '#0D1B2A',
    chromeAccent: '#E8EEF2',
    goldPremium: '#C9A962',
    emeraldSuccess: '#10B981',
    rubyAlert: '#EF4444',
    sapphireInfo: '#3B82F6',
    obsidianBlack: '#030712',
    glassWhite: 'rgba(255,255,255,0.08)',
    glassHover: 'rgba(255,255,255,0.12)',
  },
  fonts: {
    display: "'Playfair Display', Georgia, serif",
    body: "'DM Sans', -apple-system, sans-serif",
    mono: "'JetBrains Mono', monospace",
  }
};

// German Bank Partners Data (Top 15 for Auto Financing)
const bankPartners = [
  { id: 1, name: 'Volkswagen Bank', logo: '🏦', rate: 4.99, maxAmount: 100000 },
  { id: 2, name: 'Mercedes-Benz Bank', logo: '⭐', rate: 5.29, maxAmount: 150000 },
  { id: 3, name: 'BMW Bank', logo: '🔵', rate: 5.19, maxAmount: 120000 },
  { id: 4, name: 'Deutsche Bank', logo: '🏛️', rate: 5.49, maxAmount: 80000 },
  { id: 5, name: 'Commerzbank', logo: '🟡', rate: 5.39, maxAmount: 75000 },
  { id: 6, name: 'Bank11 (ADAC)', logo: '🚗', rate: 4.89, maxAmount: 150000 },
  { id: 7, name: 'Santander', logo: '🔴', rate: 5.59, maxAmount: 60000 },
  { id: 8, name: 'ING Deutschland', logo: '🟠', rate: 5.29, maxAmount: 70000 },
  { id: 9, name: 'CreditPlus Bank', logo: '💳', rate: 5.69, maxAmount: 50000 },
  { id: 10, name: 'Audi Bank', logo: '💎', rate: 4.99, maxAmount: 100000 },
  { id: 11, name: 'Ford Bank', logo: '🔷', rate: 5.09, maxAmount: 80000 },
  { id: 12, name: 'Opel Bank', logo: '⚡', rate: 5.29, maxAmount: 60000 },
  { id: 13, name: 'Toyota Kreditbank', logo: '🔺', rate: 5.19, maxAmount: 70000 },
  { id: 14, name: 'BDK Bank', logo: '🏢', rate: 5.39, maxAmount: 90000 },
  { id: 15, name: 'Targobank', logo: '🟢', rate: 5.79, maxAmount: 50000 },
];

// Demo Vehicle Inventory
const vehicleInventory = [
  { id: 1, make: 'BMW', model: '3er 320d', year: 2022, price: 38900, km: 45000, fuel: 'Diesel', transmission: 'Automatik', image: '🚗', color: 'Schwarz', power: '190 PS', category: 'Limousine', featured: true },
  { id: 2, make: 'Mercedes-Benz', model: 'C-Klasse C200', year: 2023, price: 42500, km: 28000, fuel: 'Benzin', transmission: 'Automatik', image: '🚙', color: 'Silber', power: '204 PS', category: 'Limousine', featured: true },
  { id: 3, make: 'Audi', model: 'A4 Avant', year: 2021, price: 35900, km: 62000, fuel: 'Diesel', transmission: 'Automatik', image: '🚘', color: 'Weiß', power: '163 PS', category: 'Kombi', featured: false },
  { id: 4, make: 'Volkswagen', model: 'Golf 8 GTI', year: 2022, price: 34500, km: 35000, fuel: 'Benzin', transmission: 'DSG', image: '🏎️', color: 'Rot', power: '245 PS', category: 'Kompakt', featured: true },
  { id: 5, make: 'Porsche', model: 'Taycan', year: 2023, price: 89900, km: 15000, fuel: 'Elektro', transmission: 'Automatik', image: '⚡', color: 'Blau', power: '530 PS', category: 'Sportwagen', featured: true },
  { id: 6, make: 'Tesla', model: 'Model 3 LR', year: 2023, price: 44900, km: 22000, fuel: 'Elektro', transmission: 'Automatik', image: '🔋', color: 'Weiß', power: '440 PS', category: 'Limousine', featured: false },
  { id: 7, make: 'Range Rover', model: 'Evoque', year: 2022, price: 52900, km: 38000, fuel: 'Diesel', transmission: 'Automatik', image: '🚙', color: 'Grau', power: '200 PS', category: 'SUV', featured: false },
  { id: 8, make: 'Volvo', model: 'XC60 T6', year: 2021, price: 41500, km: 55000, fuel: 'Hybrid', transmission: 'Automatik', image: '🌿', color: 'Grün', power: '340 PS', category: 'SUV', featured: false },
];

// ============================================================================
// PREMIUM LOADING SCREEN COMPONENT
// ============================================================================
const LoadingScreen = ({ message = 'Initialisiere System...', progress = 0 }) => {
  const [dots, setDots] = useState('');
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: `linear-gradient(135deg, ${tokens.colors.obsidianBlack} 0%, ${tokens.colors.deepAqua} 50%, ${tokens.colors.darkNavy} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      overflow: 'hidden',
    }}>
      {/* Animated Particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: p.size,
          height: p.size,
          borderRadius: '50%',
          background: tokens.colors.goldPremium,
          opacity: 0.3,
          animation: `float ${p.duration}s ease-in-out infinite`,
          animationDelay: `${p.delay}s`,
        }} />
      ))}

      {/* Sacred Geometry Logo */}
      <div style={{
        position: 'relative',
        width: 120,
        height: 120,
        marginBottom: 40,
      }}>
        {/* Rotating outer ring */}
        <div style={{
          position: 'absolute',
          inset: 0,
          border: `2px solid ${tokens.colors.goldPremium}`,
          borderRadius: '50%',
          animation: 'spin 8s linear infinite',
        }}>
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: 8,
              height: 8,
              background: tokens.colors.goldPremium,
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transform: `rotate(${deg}deg) translateY(-56px) translateX(-4px)`,
            }} />
          ))}
        </div>

        {/* Inner hexagon */}
        <div style={{
          position: 'absolute',
          inset: 20,
          background: `linear-gradient(135deg, ${tokens.colors.aetherEquilibrium}, ${tokens.colors.deepAqua})`,
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          animation: 'pulse 2s ease-in-out infinite',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: tokens.fonts.display,
            fontSize: 28,
            fontWeight: 700,
            color: tokens.colors.chromeAccent,
            letterSpacing: 2,
          }}>CC</span>
        </div>
      </div>

      {/* Brand Name */}
      <h1 style={{
        fontFamily: tokens.fonts.display,
        fontSize: 42,
        fontWeight: 400,
        color: tokens.colors.chromeAccent,
        letterSpacing: 8,
        margin: 0,
        textTransform: 'uppercase',
      }}>
        Car<span style={{ color: tokens.colors.goldPremium }}>Center</span>24
      </h1>

      {/* Status Message */}
      <p style={{
        fontFamily: tokens.fonts.body,
        fontSize: 14,
        color: tokens.colors.liquidQuicksilver,
        marginTop: 24,
        letterSpacing: 1,
      }}>
        {message}{dots}
      </p>

      {/* Progress Bar */}
      <div style={{
        width: 280,
        height: 3,
        background: tokens.colors.glassWhite,
        borderRadius: 2,
        marginTop: 20,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${tokens.colors.goldPremium}, ${tokens.colors.chromeAccent})`,
          borderRadius: 2,
          transition: 'width 0.5s ease-out',
        }} />
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 0.8; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
        @keyframes float { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; } 50% { transform: translateY(-20px) scale(1.2); opacity: 0.6; } }
      `}</style>
    </div>
  );
};

// ============================================================================
// VEHICLE VALUATION COMPONENT (Pfando-Style)
// ============================================================================
const VehicleValuation = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    licensePlate: '',
    vin: '',
    make: '',
    model: '',
    year: '',
    mileage: '',
    condition: 'gut',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [valuation, setValuation] = useState(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Calculate demo valuation based on inputs
    const baseValue = Math.random() * 30000 + 10000;
    const yearFactor = (parseInt(formData.year) - 2015) / 10;
    const kmFactor = 1 - (parseInt(formData.mileage) || 50000) / 500000;
    const conditionFactors = { sehr_gut: 1.1, gut: 1.0, befriedigend: 0.85, ausreichend: 0.7 };
    
    const calculatedValue = Math.round(baseValue * (1 + yearFactor) * kmFactor * (conditionFactors[formData.condition] || 1));
    
    setValuation({
      minValue: Math.round(calculatedValue * 0.9),
      maxValue: Math.round(calculatedValue * 1.15),
      avgValue: calculatedValue,
      confidence: Math.round(Math.random() * 15 + 85),
      comparisons: Math.round(Math.random() * 500 + 100),
    });
    setIsLoading(false);
    setStep(4);
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    fontSize: 16,
    fontFamily: tokens.fonts.body,
    background: tokens.colors.glassWhite,
    border: `1px solid ${tokens.colors.glassHover}`,
    borderRadius: 12,
    color: tokens.colors.chromeAccent,
    outline: 'none',
    transition: 'all 0.3s ease',
  };

  const labelStyle = {
    display: 'block',
    fontSize: 13,
    color: tokens.colors.liquidQuicksilver,
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  };

  return (
    <div style={{
      background: `linear-gradient(180deg, ${tokens.colors.deepAqua}15 0%, transparent 100%)`,
      borderRadius: 24,
      padding: 40,
      border: `1px solid ${tokens.colors.glassWhite}`,
    }}>
      {/* Progress Steps */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 40,
      }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{
            width: s <= step ? 60 : 40,
            height: 4,
            borderRadius: 2,
            background: s <= step ? tokens.colors.goldPremium : tokens.colors.glassWhite,
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 style={{
            fontFamily: tokens.fonts.display,
            fontSize: 28,
            color: tokens.colors.chromeAccent,
            marginBottom: 8,
            textAlign: 'center',
          }}>
            Fahrzeug Identifikation
          </h2>
          <p style={{
            fontFamily: tokens.fonts.body,
            color: tokens.colors.liquidQuicksilver,
            textAlign: 'center',
            marginBottom: 32,
          }}>
            Geben Sie Ihr Kennzeichen oder die FIN ein für eine sofortige Bewertung
          </p>

          <div style={{ display: 'grid', gap: 20 }}>
            <div>
              <label style={labelStyle}>Kennzeichen (z.B. B-CC 2024)</label>
              <input
                type="text"
                placeholder="B-CC 2024"
                value={formData.licensePlate}
                onChange={e => setFormData({...formData, licensePlate: e.target.value.toUpperCase()})}
                style={inputStyle}
              />
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              color: tokens.colors.liquidQuicksilver,
            }}>
              <div style={{ flex: 1, height: 1, background: tokens.colors.glassWhite }} />
              <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 2 }}>oder</span>
              <div style={{ flex: 1, height: 1, background: tokens.colors.glassWhite }} />
            </div>

            <div>
              <label style={labelStyle}>Fahrzeug-Identifizierungsnummer (FIN)</label>
              <input
                type="text"
                placeholder="WVWZZZ3CZWE123456"
                value={formData.vin}
                onChange={e => setFormData({...formData, vin: e.target.value.toUpperCase()})}
                style={inputStyle}
                maxLength={17}
              />
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!formData.licensePlate && !formData.vin}
            style={{
              width: '100%',
              padding: '18px 32px',
              marginTop: 32,
              fontSize: 16,
              fontWeight: 600,
              fontFamily: tokens.fonts.body,
              background: (formData.licensePlate || formData.vin) 
                ? `linear-gradient(135deg, ${tokens.colors.goldPremium}, ${tokens.colors.goldPremium}cc)`
                : tokens.colors.glassWhite,
              color: (formData.licensePlate || formData.vin) ? tokens.colors.obsidianBlack : tokens.colors.liquidQuicksilver,
              border: 'none',
              borderRadius: 12,
              cursor: (formData.licensePlate || formData.vin) ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Weiter zur Fahrzeugdetails →
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 style={{
            fontFamily: tokens.fonts.display,
            fontSize: 28,
            color: tokens.colors.chromeAccent,
            marginBottom: 32,
            textAlign: 'center',
          }}>
            Fahrzeugdetails
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={labelStyle}>Marke</label>
              <select
                value={formData.make}
                onChange={e => setFormData({...formData, make: e.target.value})}
                style={{...inputStyle, cursor: 'pointer'}}
              >
                <option value="">Auswählen...</option>
                {['Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Porsche', 'Ford', 'Opel', 'Toyota', 'Tesla'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Modell</label>
              <input
                type="text"
                placeholder="z.B. 3er, A4, Golf"
                value={formData.model}
                onChange={e => setFormData({...formData, model: e.target.value})}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Erstzulassung</label>
              <select
                value={formData.year}
                onChange={e => setFormData({...formData, year: e.target.value})}
                style={{...inputStyle, cursor: 'pointer'}}
              >
                <option value="">Jahr...</option>
                {Array.from({length: 15}, (_, i) => 2024 - i).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Kilometerstand</label>
              <input
                type="number"
                placeholder="z.B. 85000"
                value={formData.mileage}
                onChange={e => setFormData({...formData, mileage: e.target.value})}
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Zustand</label>
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { value: 'sehr_gut', label: 'Sehr Gut' },
                  { value: 'gut', label: 'Gut' },
                  { value: 'befriedigend', label: 'Befriedigend' },
                  { value: 'ausreichend', label: 'Ausreichend' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setFormData({...formData, condition: opt.value})}
                    style={{
                      flex: 1,
                      padding: '14px 16px',
                      fontSize: 14,
                      fontFamily: tokens.fonts.body,
                      background: formData.condition === opt.value 
                        ? `${tokens.colors.goldPremium}20`
                        : tokens.colors.glassWhite,
                      border: `1px solid ${formData.condition === opt.value ? tokens.colors.goldPremium : 'transparent'}`,
                      borderRadius: 10,
                      color: formData.condition === opt.value ? tokens.colors.goldPremium : tokens.colors.liquidQuicksilver,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
            <button
              onClick={() => setStep(1)}
              style={{
                padding: '16px 24px',
                fontSize: 14,
                fontFamily: tokens.fonts.body,
                background: 'transparent',
                border: `1px solid ${tokens.colors.glassHover}`,
                borderRadius: 10,
                color: tokens.colors.liquidQuicksilver,
                cursor: 'pointer',
              }}
            >
              ← Zurück
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!formData.make || !formData.model || !formData.year}
              style={{
                flex: 1,
                padding: '16px 32px',
                fontSize: 16,
                fontWeight: 600,
                fontFamily: tokens.fonts.body,
                background: (formData.make && formData.model && formData.year)
                  ? `linear-gradient(135deg, ${tokens.colors.goldPremium}, ${tokens.colors.goldPremium}cc)`
                  : tokens.colors.glassWhite,
                color: (formData.make && formData.model && formData.year) ? tokens.colors.obsidianBlack : tokens.colors.liquidQuicksilver,
                border: 'none',
                borderRadius: 10,
                cursor: (formData.make && formData.model && formData.year) ? 'pointer' : 'not-allowed',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Weiter →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 style={{
            fontFamily: tokens.fonts.display,
            fontSize: 28,
            color: tokens.colors.chromeAccent,
            marginBottom: 32,
            textAlign: 'center',
          }}>
            Ihre Kontaktdaten
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={labelStyle}>Vorname</label>
              <input
                type="text"
                placeholder="Max"
                value={formData.firstName}
                onChange={e => setFormData({...formData, firstName: e.target.value})}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Nachname</label>
              <input
                type="text"
                placeholder="Mustermann"
                value={formData.lastName}
                onChange={e => setFormData({...formData, lastName: e.target.value})}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>E-Mail</label>
              <input
                type="email"
                placeholder="max@beispiel.de"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Telefon</label>
              <input
                type="tel"
                placeholder="+49 151 12345678"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
            <button
              onClick={() => setStep(2)}
              style={{
                padding: '16px 24px',
                fontSize: 14,
                fontFamily: tokens.fonts.body,
                background: 'transparent',
                border: `1px solid ${tokens.colors.glassHover}`,
                borderRadius: 10,
                color: tokens.colors.liquidQuicksilver,
                cursor: 'pointer',
              }}
            >
              ← Zurück
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.firstName || !formData.email}
              style={{
                flex: 1,
                padding: '16px 32px',
                fontSize: 16,
                fontWeight: 600,
                fontFamily: tokens.fonts.body,
                background: (formData.firstName && formData.email)
                  ? `linear-gradient(135deg, ${tokens.colors.emeraldSuccess}, ${tokens.colors.emeraldSuccess}cc)`
                  : tokens.colors.glassWhite,
                color: (formData.firstName && formData.email) ? tokens.colors.chromeAccent : tokens.colors.liquidQuicksilver,
                border: 'none',
                borderRadius: 10,
                cursor: (formData.firstName && formData.email) ? 'pointer' : 'not-allowed',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              {isLoading ? 'Bewertung läuft...' : 'Jetzt Bewerten'}
            </button>
          </div>
        </div>
      )}

      {step === 4 && valuation && (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 80,
            height: 80,
            margin: '0 auto 24px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${tokens.colors.emeraldSuccess}20, ${tokens.colors.emeraldSuccess}40)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
          }}>
            ✓
          </div>

          <h2 style={{
            fontFamily: tokens.fonts.display,
            fontSize: 24,
            color: tokens.colors.chromeAccent,
            marginBottom: 8,
          }}>
            Ihr Fahrzeug wurde erfolgreich bewertet!
          </h2>
          <p style={{
            fontFamily: tokens.fonts.body,
            fontSize: 14,
            color: tokens.colors.liquidQuicksilver,
            marginBottom: 32,
          }}>
            {formData.year} {formData.make} {formData.model} • {parseInt(formData.mileage || 0).toLocaleString('de-DE')} km
          </p>

          <div style={{
            background: `linear-gradient(135deg, ${tokens.colors.goldPremium}10, ${tokens.colors.goldPremium}20)`,
            border: `1px solid ${tokens.colors.goldPremium}40`,
            borderRadius: 20,
            padding: 32,
            marginBottom: 24,
          }}>
            <p style={{
              fontSize: 13,
              color: tokens.colors.goldPremium,
              textTransform: 'uppercase',
              letterSpacing: 2,
              marginBottom: 8,
            }}>
              Geschätzter Marktwert
            </p>
            <div style={{
              fontFamily: tokens.fonts.display,
              fontSize: 48,
              fontWeight: 700,
              color: tokens.colors.chromeAccent,
            }}>
              €{valuation.avgValue.toLocaleString('de-DE')}
            </div>
            <p style={{
              fontSize: 14,
              color: tokens.colors.liquidQuicksilver,
              marginTop: 8,
            }}>
              Spanne: €{valuation.minValue.toLocaleString('de-DE')} – €{valuation.maxValue.toLocaleString('de-DE')}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            marginBottom: 32,
          }}>
            <div style={{
              padding: 20,
              background: tokens.colors.glassWhite,
              borderRadius: 12,
            }}>
              <p style={{ fontSize: 28, fontWeight: 700, color: tokens.colors.emeraldSuccess }}>{valuation.confidence}%</p>
              <p style={{ fontSize: 12, color: tokens.colors.liquidQuicksilver, textTransform: 'uppercase' }}>Konfidenz</p>
            </div>
            <div style={{
              padding: 20,
              background: tokens.colors.glassWhite,
              borderRadius: 12,
            }}>
              <p style={{ fontSize: 28, fontWeight: 700, color: tokens.colors.sapphireInfo }}>{valuation.comparisons}</p>
              <p style={{ fontSize: 12, color: tokens.colors.liquidQuicksilver, textTransform: 'uppercase' }}>Vergleiche</p>
            </div>
          </div>

          <button
            onClick={() => onComplete && onComplete(valuation)}
            style={{
              width: '100%',
              padding: '18px 32px',
              fontSize: 16,
              fontWeight: 600,
              fontFamily: tokens.fonts.body,
              background: `linear-gradient(135deg, ${tokens.colors.goldPremium}, ${tokens.colors.goldPremium}cc)`,
              color: tokens.colors.obsidianBlack,
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Verkaufsangebot anfordern
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// VEHICLE CARD COMPONENT (UberEats Style)
// ============================================================================
const VehicleCard = ({ vehicle, onSelect, isSelected }) => (
  <div
    onClick={() => onSelect(vehicle)}
    style={{
      background: isSelected 
        ? `linear-gradient(135deg, ${tokens.colors.goldPremium}15, ${tokens.colors.goldPremium}25)` 
        : tokens.colors.glassWhite,
      border: `1px solid ${isSelected ? tokens.colors.goldPremium : 'transparent'}`,
      borderRadius: 20,
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
    }}
  >
    {/* Vehicle Image Area */}
    <div style={{
      height: 160,
      background: `linear-gradient(135deg, ${tokens.colors.deepAqua}80, ${tokens.colors.darkNavy})`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      <span style={{ fontSize: 64 }}>{vehicle.image}</span>
      
      {vehicle.featured && (
        <div style={{
          position: 'absolute',
          top: 12,
          left: 12,
          background: tokens.colors.goldPremium,
          color: tokens.colors.obsidianBlack,
          padding: '4px 10px',
          borderRadius: 6,
          fontSize: 10,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}>
          Premium
        </div>
      )}

      {isSelected && (
        <div style={{
          position: 'absolute',
          top: 12,
          right: 12,
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: tokens.colors.emeraldSuccess,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
        }}>
          ✓
        </div>
      )}
    </div>

    {/* Vehicle Details */}
    <div style={{ padding: 20 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
      }}>
        <div>
          <h3 style={{
            fontFamily: tokens.fonts.body,
            fontSize: 16,
            fontWeight: 600,
            color: tokens.colors.chromeAccent,
            margin: 0,
          }}>
            {vehicle.make} {vehicle.model}
          </h3>
          <p style={{
            fontFamily: tokens.fonts.body,
            fontSize: 13,
            color: tokens.colors.liquidQuicksilver,
            margin: '4px 0 0',
          }}>
            {vehicle.year} • {vehicle.km.toLocaleString('de-DE')} km
          </p>
        </div>
        <div style={{
          fontFamily: tokens.fonts.display,
          fontSize: 20,
          fontWeight: 700,
          color: tokens.colors.goldPremium,
        }}>
          €{vehicle.price.toLocaleString('de-DE')}
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {[vehicle.fuel, vehicle.transmission, vehicle.power].map((tag, i) => (
          <span key={i} style={{
            padding: '4px 10px',
            fontSize: 11,
            background: tokens.colors.glassHover,
            borderRadius: 6,
            color: tokens.colors.liquidQuicksilver,
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// ============================================================================
// FINANCING CALCULATOR COMPONENT
// ============================================================================
const FinancingCalculator = ({ vehicle, onRequestFinancing }) => {
  const [amount, setAmount] = useState(vehicle?.price || 30000);
  const [downPayment, setDownPayment] = useState(Math.round((vehicle?.price || 30000) * 0.2));
  const [term, setTerm] = useState(48);
  const [selectedBank, setSelectedBank] = useState(null);

  const loanAmount = amount - downPayment;
  const monthlyPayment = selectedBank 
    ? Math.round((loanAmount * (1 + (selectedBank.rate / 100) * (term / 12))) / term)
    : 0;

  return (
    <div style={{
      background: tokens.colors.glassWhite,
      borderRadius: 24,
      padding: 32,
      border: `1px solid ${tokens.colors.glassHover}`,
    }}>
      <h3 style={{
        fontFamily: tokens.fonts.display,
        fontSize: 24,
        color: tokens.colors.chromeAccent,
        marginBottom: 24,
      }}>
        Finanzierungsrechner
      </h3>

      <div style={{ display: 'grid', gap: 24 }}>
        {/* Amount Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, color: tokens.colors.liquidQuicksilver, textTransform: 'uppercase' }}>
              Fahrzeugpreis
            </label>
            <span style={{ fontSize: 16, fontWeight: 600, color: tokens.colors.chromeAccent }}>
              €{amount.toLocaleString('de-DE')}
            </span>
          </div>
          <input
            type="range"
            min="5000"
            max="150000"
            step="1000"
            value={amount}
            onChange={e => {
              const newAmount = parseInt(e.target.value);
              setAmount(newAmount);
              setDownPayment(Math.min(downPayment, newAmount - 1000));
            }}
            style={{ width: '100%', accentColor: tokens.colors.goldPremium }}
          />
        </div>

        {/* Down Payment Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, color: tokens.colors.liquidQuicksilver, textTransform: 'uppercase' }}>
              Anzahlung
            </label>
            <span style={{ fontSize: 16, fontWeight: 600, color: tokens.colors.chromeAccent }}>
              €{downPayment.toLocaleString('de-DE')} ({Math.round(downPayment / amount * 100)}%)
            </span>
          </div>
          <input
            type="range"
            min="0"
            max={amount - 1000}
            step="500"
            value={downPayment}
            onChange={e => setDownPayment(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: tokens.colors.goldPremium }}
          />
        </div>

        {/* Term Selection */}
        <div>
          <label style={{ fontSize: 13, color: tokens.colors.liquidQuicksilver, textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
            Laufzeit
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {[24, 36, 48, 60, 72, 84].map(months => (
              <button
                key={months}
                onClick={() => setTerm(months)}
                style={{
                  flex: 1,
                  padding: '12px 8px',
                  fontSize: 14,
                  fontWeight: term === months ? 600 : 400,
                  fontFamily: tokens.fonts.body,
                  background: term === months ? `${tokens.colors.goldPremium}20` : 'transparent',
                  border: `1px solid ${term === months ? tokens.colors.goldPremium : tokens.colors.glassHover}`,
                  borderRadius: 8,
                  color: term === months ? tokens.colors.goldPremium : tokens.colors.liquidQuicksilver,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {months}M
              </button>
            ))}
          </div>
        </div>

        {/* Bank Partners */}
        <div>
          <label style={{ fontSize: 13, color: tokens.colors.liquidQuicksilver, textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
            Finanzierungspartner
          </label>
          <div style={{
            maxHeight: 240,
            overflowY: 'auto',
            display: 'grid',
            gap: 8,
            paddingRight: 8,
          }}>
            {bankPartners.slice(0, 8).map(bank => (
              <div
                key={bank.id}
                onClick={() => setSelectedBank(bank)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: 16,
                  background: selectedBank?.id === bank.id ? `${tokens.colors.goldPremium}15` : tokens.colors.glassWhite,
                  border: `1px solid ${selectedBank?.id === bank.id ? tokens.colors.goldPremium : 'transparent'}`,
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{ fontSize: 24 }}>{bank.logo}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: tokens.colors.chromeAccent, margin: 0 }}>
                    {bank.name}
                  </p>
                  <p style={{ fontSize: 12, color: tokens.colors.liquidQuicksilver, margin: '2px 0 0' }}>
                    bis €{bank.maxAmount.toLocaleString('de-DE')}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 16, fontWeight: 600, color: tokens.colors.emeraldSuccess, margin: 0 }}>
                    {bank.rate}%
                  </p>
                  <p style={{ fontSize: 10, color: tokens.colors.liquidQuicksilver, margin: 0 }}>
                    eff. p.a.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        {selectedBank && (
          <div style={{
            background: `linear-gradient(135deg, ${tokens.colors.deepAqua}, ${tokens.colors.aetherEquilibrium})`,
            borderRadius: 16,
            padding: 24,
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 12, color: tokens.colors.liquidQuicksilver, textTransform: 'uppercase', letterSpacing: 2, margin: 0 }}>
              Ihre monatliche Rate
            </p>
            <p style={{
              fontFamily: tokens.fonts.display,
              fontSize: 42,
              fontWeight: 700,
              color: tokens.colors.chromeAccent,
              margin: '8px 0',
            }}>
              €{monthlyPayment.toLocaleString('de-DE')}
            </p>
            <p style={{ fontSize: 13, color: tokens.colors.liquidQuicksilver, margin: 0 }}>
              Kreditbetrag: €{loanAmount.toLocaleString('de-DE')} • {term} Monate • {selectedBank.name}
            </p>
          </div>
        )}

        <button
          onClick={() => onRequestFinancing && onRequestFinancing({ amount, downPayment, term, selectedBank, monthlyPayment })}
          disabled={!selectedBank}
          style={{
            width: '100%',
            padding: '18px 32px',
            fontSize: 16,
            fontWeight: 600,
            fontFamily: tokens.fonts.body,
            background: selectedBank
              ? `linear-gradient(135deg, ${tokens.colors.emeraldSuccess}, ${tokens.colors.emeraldSuccess}cc)`
              : tokens.colors.glassHover,
            color: selectedBank ? tokens.colors.chromeAccent : tokens.colors.liquidQuicksilver,
            border: 'none',
            borderRadius: 12,
            cursor: selectedBank ? 'pointer' : 'not-allowed',
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Finanzierung anfragen
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// ADMIN PORTAL COMPONENT
// ============================================================================
const AdminPortal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [stats] = useState({
    totalVehicles: 847,
    activeListings: 612,
    pendingRequests: 28,
    revenue: 2847000,
    leads: 156,
    conversions: 42,
  });

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: tokens.colors.obsidianBlack,
      zIndex: 1000,
      overflow: 'auto',
    }}>
      {/* Admin Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 32px',
        borderBottom: `1px solid ${tokens.colors.glassWhite}`,
        position: 'sticky',
        top: 0,
        background: tokens.colors.obsidianBlack,
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{
            fontFamily: tokens.fonts.display,
            fontSize: 20,
            color: tokens.colors.goldPremium,
          }}>CC24</span>
          <span style={{
            padding: '4px 12px',
            fontSize: 11,
            background: tokens.colors.rubyAlert,
            color: tokens.colors.chromeAccent,
            borderRadius: 6,
            fontWeight: 600,
            textTransform: 'uppercase',
          }}>Admin</span>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {['inventory', 'customers', 'analytics', 'mobile.de'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                fontSize: 13,
                fontFamily: tokens.fonts.body,
                background: activeTab === tab ? tokens.colors.glassHover : 'transparent',
                border: 'none',
                borderRadius: 8,
                color: activeTab === tab ? tokens.colors.chromeAccent : tokens.colors.liquidQuicksilver,
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {tab === 'mobile.de' ? 'Mobile.de Sync' : tab}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            padding: '10px 20px',
            fontSize: 13,
            fontFamily: tokens.fonts.body,
            background: tokens.colors.glassWhite,
            border: 'none',
            borderRadius: 8,
            color: tokens.colors.chromeAccent,
            cursor: 'pointer',
          }}
        >
          ← Zurück zum Shop
        </button>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: 16,
        padding: '24px 32px',
      }}>
        {[
          { label: 'Fahrzeuge Gesamt', value: stats.totalVehicles, icon: '🚗' },
          { label: 'Aktive Inserate', value: stats.activeListings, icon: '📢' },
          { label: 'Offene Anfragen', value: stats.pendingRequests, icon: '📬', highlight: true },
          { label: 'Umsatz (MTD)', value: `€${(stats.revenue / 1000).toFixed(0)}k`, icon: '💰' },
          { label: 'Neue Leads', value: stats.leads, icon: '👤' },
          { label: 'Conversions', value: `${stats.conversions}%`, icon: '📈' },
        ].map((stat, i) => (
          <div key={i} style={{
            padding: 20,
            background: stat.highlight ? `${tokens.colors.goldPremium}20` : tokens.colors.glassWhite,
            borderRadius: 16,
            border: stat.highlight ? `1px solid ${tokens.colors.goldPremium}` : 'none',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 24 }}>{stat.icon}</span>
              {stat.highlight && (
                <span style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: tokens.colors.rubyAlert,
                  animation: 'pulse 2s infinite',
                }} />
              )}
            </div>
            <p style={{
              fontFamily: tokens.fonts.display,
              fontSize: 28,
              fontWeight: 700,
              color: tokens.colors.chromeAccent,
              margin: 0,
            }}>
              {typeof stat.value === 'number' ? stat.value.toLocaleString('de-DE') : stat.value}
            </p>
            <p style={{ fontSize: 12, color: tokens.colors.liquidQuicksilver, margin: '4px 0 0' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div style={{ padding: '0 32px 32px' }}>
        {activeTab === 'inventory' && (
          <div style={{
            background: tokens.colors.glassWhite,
            borderRadius: 20,
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 24px',
              borderBottom: `1px solid ${tokens.colors.glassHover}`,
            }}>
              <h3 style={{
                fontFamily: tokens.fonts.body,
                fontSize: 16,
                fontWeight: 600,
                color: tokens.colors.chromeAccent,
                margin: 0,
              }}>
                Fahrzeugbestand
              </h3>
              <button style={{
                padding: '10px 20px',
                fontSize: 13,
                fontFamily: tokens.fonts.body,
                background: `linear-gradient(135deg, ${tokens.colors.goldPremium}, ${tokens.colors.goldPremium}cc)`,
                color: tokens.colors.obsidianBlack,
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
              }}>
                + Fahrzeug hinzufügen
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: tokens.colors.glassHover }}>
                  {['ID', 'Fahrzeug', 'Jahr', 'KM', 'Preis', 'Status', 'Aktionen'].map(h => (
                    <th key={h} style={{
                      padding: '14px 16px',
                      fontSize: 11,
                      fontWeight: 600,
                      color: tokens.colors.liquidQuicksilver,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      textAlign: 'left',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vehicleInventory.map((v, i) => (
                  <tr key={v.id} style={{
                    borderBottom: `1px solid ${tokens.colors.glassHover}`,
                    transition: 'background 0.2s ease',
                  }}>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: tokens.colors.liquidQuicksilver }}>
                      #{v.id.toString().padStart(4, '0')}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 24 }}>{v.image}</span>
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 500, color: tokens.colors.chromeAccent, margin: 0 }}>
                            {v.make} {v.model}
                          </p>
                          <p style={{ fontSize: 12, color: tokens.colors.liquidQuicksilver, margin: 0 }}>
                            {v.fuel} • {v.transmission}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 14, color: tokens.colors.chromeAccent }}>{v.year}</td>
                    <td style={{ padding: '14px 16px', fontSize: 14, color: tokens.colors.chromeAccent }}>{v.km.toLocaleString('de-DE')}</td>
                    <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: tokens.colors.goldPremium }}>
                      €{v.price.toLocaleString('de-DE')}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '4px 10px',
                        fontSize: 11,
                        fontWeight: 600,
                        background: v.featured ? `${tokens.colors.emeraldSuccess}20` : tokens.colors.glassHover,
                        color: v.featured ? tokens.colors.emeraldSuccess : tokens.colors.liquidQuicksilver,
                        borderRadius: 6,
                      }}>
                        {v.featured ? 'Premium' : 'Standard'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {['✏️', '👁️', '🗑️'].map((icon, j) => (
                          <button key={j} style={{
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: tokens.colors.glassHover,
                            border: 'none',
                            borderRadius: 6,
                            cursor: 'pointer',
                            fontSize: 14,
                          }}>
                            {icon}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'mobile.de' && (
          <div style={{
            background: tokens.colors.glassWhite,
            borderRadius: 20,
            padding: 32,
          }}>
            <h3 style={{
              fontFamily: tokens.fonts.body,
              fontSize: 18,
              fontWeight: 600,
              color: tokens.colors.chromeAccent,
              marginBottom: 24,
            }}>
              Mobile.de API Integration
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
            }}>
              <div style={{
                padding: 24,
                background: tokens.colors.glassHover,
                borderRadius: 16,
              }}>
                <h4 style={{ fontSize: 14, color: tokens.colors.chromeAccent, marginBottom: 16 }}>API Status</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: tokens.colors.emeraldSuccess,
                  }} />
                  <span style={{ fontSize: 14, color: tokens.colors.chromeAccent }}>Verbunden</span>
                </div>
                <p style={{ fontSize: 13, color: tokens.colors.liquidQuicksilver, margin: 0 }}>
                  Seller-API: services.mobile.de<br />
                  Letzte Sync: vor 2 Stunden
                </p>
              </div>

              <div style={{
                padding: 24,
                background: tokens.colors.glassHover,
                borderRadius: 16,
              }}>
                <h4 style={{ fontSize: 14, color: tokens.colors.chromeAccent, marginBottom: 16 }}>Sync Statistik</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <p style={{ fontSize: 24, fontWeight: 700, color: tokens.colors.emeraldSuccess, margin: 0 }}>612</p>
                    <p style={{ fontSize: 12, color: tokens.colors.liquidQuicksilver, margin: 0 }}>Aktive Inserate</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 24, fontWeight: 700, color: tokens.colors.sapphireInfo, margin: 0 }}>47</p>
                    <p style={{ fontSize: 12, color: tokens.colors.liquidQuicksilver, margin: 0 }}>Pending Updates</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
              <button style={{
                padding: '14px 24px',
                fontSize: 14,
                fontFamily: tokens.fonts.body,
                background: `linear-gradient(135deg, ${tokens.colors.sapphireInfo}, ${tokens.colors.sapphireInfo}cc)`,
                color: tokens.colors.chromeAccent,
                border: 'none',
                borderRadius: 10,
                cursor: 'pointer',
                fontWeight: 600,
              }}>
                🔄 Jetzt synchronisieren
              </button>
              <button style={{
                padding: '14px 24px',
                fontSize: 14,
                fontFamily: tokens.fonts.body,
                background: tokens.colors.glassHover,
                color: tokens.colors.chromeAccent,
                border: 'none',
                borderRadius: 10,
                cursor: 'pointer',
              }}>
                📋 Export CSV
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
};

// ============================================================================
// MAIN CC24 PLATFORM COMPONENT
// ============================================================================
const CC24Platform = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Initialisiere CarCenter24');
  const [activeView, setActiveView] = useState('home');
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 150000],
    year: 'all',
  });

  // Loading sequence
  useEffect(() => {
    const messages = [
      { msg: 'Initialisiere CarCenter24', progress: 20 },
      { msg: 'Lade Fahrzeugbestand', progress: 40 },
      { msg: 'Verbinde Finanzierungspartner', progress: 60 },
      { msg: 'Synchronisiere Mobile.de API', progress: 80 },
      { msg: 'System bereit', progress: 100 },
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setLoadingMessage(messages[i].msg);
        setLoadingProgress(messages[i].progress);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 500);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const toggleVehicleSelection = (vehicle) => {
    setSelectedVehicles(prev => {
      const exists = prev.find(v => v.id === vehicle.id);
      if (exists) {
        return prev.filter(v => v.id !== vehicle.id);
      }
      return [...prev, vehicle];
    });
  };

  const filteredVehicles = vehicleInventory.filter(v => {
    if (filters.category !== 'all' && v.category !== filters.category) return false;
    if (v.price < filters.priceRange[0] || v.price > filters.priceRange[1]) return false;
    if (filters.year !== 'all' && v.year !== parseInt(filters.year)) return false;
    return true;
  });

  const totalSelectedValue = selectedVehicles.reduce((sum, v) => sum + v.price, 0);

  if (isLoading) {
    return <LoadingScreen message={loadingMessage} progress={loadingProgress} />;
  }

  if (showAdmin) {
    return <AdminPortal onClose={() => setShowAdmin(false)} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(180deg, ${tokens.colors.obsidianBlack} 0%, ${tokens.colors.deepAqua} 100%)`,
      fontFamily: tokens.fonts.body,
    }}>
      {/* Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        position: 'sticky',
        top: 0,
        background: `${tokens.colors.obsidianBlack}ee`,
        backdropFilter: 'blur(20px)',
        zIndex: 100,
        borderBottom: `1px solid ${tokens.colors.glassWhite}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <h1 style={{
            fontFamily: tokens.fonts.display,
            fontSize: 24,
            fontWeight: 400,
            color: tokens.colors.chromeAccent,
            margin: 0,
            letterSpacing: 2,
          }}>
            Car<span style={{ color: tokens.colors.goldPremium }}>Center</span>24
          </h1>

          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { id: 'home', label: 'Fahrzeuge' },
              { id: 'valuation', label: 'Bewertung' },
              { id: 'financing', label: 'Finanzierung' },
            ].map(nav => (
              <button
                key={nav.id}
                onClick={() => setActiveView(nav.id)}
                style={{
                  padding: '10px 20px',
                  fontSize: 14,
                  fontFamily: tokens.fonts.body,
                  background: activeView === nav.id ? tokens.colors.glassHover : 'transparent',
                  border: 'none',
                  borderRadius: 8,
                  color: activeView === nav.id ? tokens.colors.chromeAccent : tokens.colors.liquidQuicksilver,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {nav.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Cart Badge */}
          {selectedVehicles.length > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 20px',
              background: `${tokens.colors.goldPremium}20`,
              border: `1px solid ${tokens.colors.goldPremium}`,
              borderRadius: 12,
            }}>
              <span style={{ fontSize: 18 }}>🛒</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: tokens.colors.chromeAccent, margin: 0 }}>
                  {selectedVehicles.length} Fahrzeug{selectedVehicles.length !== 1 ? 'e' : ''}
                </p>
                <p style={{ fontSize: 12, color: tokens.colors.goldPremium, margin: 0 }}>
                  €{totalSelectedValue.toLocaleString('de-DE')}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowAdmin(true)}
            style={{
              padding: '10px 20px',
              fontSize: 13,
              fontFamily: tokens.fonts.body,
              background: tokens.colors.rubyAlert,
              color: tokens.colors.chromeAccent,
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Admin
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '40px' }}>
        {activeView === 'home' && (
          <>
            {/* Hero Section */}
            <div style={{
              textAlign: 'center',
              marginBottom: 48,
            }}>
              <h2 style={{
                fontFamily: tokens.fonts.display,
                fontSize: 48,
                fontWeight: 400,
                color: tokens.colors.chromeAccent,
                marginBottom: 16,
                letterSpacing: -1,
              }}>
                Premium Fahrzeuge.<br />
                <span style={{ color: tokens.colors.goldPremium }}>Faire Preise.</span>
              </h2>
              <p style={{
                fontSize: 18,
                color: tokens.colors.liquidQuicksilver,
                maxWidth: 600,
                margin: '0 auto',
              }}>
                Wählen Sie Ihr Traumfahrzeug aus unserem kuratierten Bestand. 
                Finanzierung in Minuten – mit den besten deutschen Banken.
              </p>
            </div>

            {/* Category Filters */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 12,
              marginBottom: 40,
            }}>
              {['all', 'Limousine', 'SUV', 'Kombi', 'Kompakt', 'Sportwagen'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilters({...filters, category: cat})}
                  style={{
                    padding: '12px 24px',
                    fontSize: 14,
                    fontFamily: tokens.fonts.body,
                    background: filters.category === cat ? tokens.colors.goldPremium : tokens.colors.glassWhite,
                    color: filters.category === cat ? tokens.colors.obsidianBlack : tokens.colors.liquidQuicksilver,
                    border: 'none',
                    borderRadius: 10,
                    cursor: 'pointer',
                    fontWeight: filters.category === cat ? 600 : 400,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat === 'all' ? 'Alle Fahrzeuge' : cat}
                </button>
              ))}
            </div>

            {/* Vehicle Grid (UberEats Style) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 24,
            }}>
              {filteredVehicles.map(vehicle => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelect={toggleVehicleSelection}
                  isSelected={selectedVehicles.some(v => v.id === vehicle.id)}
                />
              ))}
            </div>

            {/* Selection Action Bar */}
            {selectedVehicles.length > 0 && (
              <div style={{
                position: 'fixed',
                bottom: 24,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: '16px 24px',
                background: `${tokens.colors.deepAqua}ee`,
                backdropFilter: 'blur(20px)',
                borderRadius: 16,
                border: `1px solid ${tokens.colors.goldPremium}`,
                boxShadow: `0 20px 60px ${tokens.colors.obsidianBlack}80`,
              }}>
                <div>
                  <p style={{ fontSize: 14, color: tokens.colors.liquidQuicksilver, margin: 0 }}>
                    {selectedVehicles.length} ausgewählt
                  </p>
                  <p style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.goldPremium, margin: 0 }}>
                    €{totalSelectedValue.toLocaleString('de-DE')}
                  </p>
                </div>
                <button
                  onClick={() => setActiveView('financing')}
                  style={{
                    padding: '14px 28px',
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: tokens.fonts.body,
                    background: `linear-gradient(135deg, ${tokens.colors.goldPremium}, ${tokens.colors.goldPremium}cc)`,
                    color: tokens.colors.obsidianBlack,
                    border: 'none',
                    borderRadius: 10,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}
                >
                  Finanzierung berechnen
                </button>
              </div>
            )}
          </>
        )}

        {activeView === 'valuation' && (
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: tokens.fonts.display,
              fontSize: 36,
              color: tokens.colors.chromeAccent,
              textAlign: 'center',
              marginBottom: 8,
            }}>
              Fahrzeugbewertung
            </h2>
            <p style={{
              fontSize: 16,
              color: tokens.colors.liquidQuicksilver,
              textAlign: 'center',
              marginBottom: 40,
            }}>
              Erhalten Sie in wenigen Minuten eine professionelle Bewertung Ihres Fahrzeugs
            </p>
            <VehicleValuation onComplete={(val) => console.log('Valuation complete:', val)} />
          </div>
        )}

        {activeView === 'financing' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: selectedVehicles.length > 0 ? '1fr 400px' : '1fr',
            gap: 32,
            maxWidth: 1200,
            margin: '0 auto',
          }}>
            <div>
              <h2 style={{
                fontFamily: tokens.fonts.display,
                fontSize: 36,
                color: tokens.colors.chromeAccent,
                marginBottom: 8,
              }}>
                Finanzierung
              </h2>
              <p style={{
                fontSize: 16,
                color: tokens.colors.liquidQuicksilver,
                marginBottom: 32,
              }}>
                Berechnen Sie Ihre monatliche Rate mit unseren Partner-Banken
              </p>

              <FinancingCalculator 
                vehicle={selectedVehicles[0]}
                onRequestFinancing={(data) => console.log('Financing request:', data)}
              />
            </div>

            {selectedVehicles.length > 0 && (
              <div style={{
                background: tokens.colors.glassWhite,
                borderRadius: 20,
                padding: 24,
                height: 'fit-content',
                position: 'sticky',
                top: 100,
              }}>
                <h3 style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: tokens.colors.chromeAccent,
                  marginBottom: 20,
                }}>
                  Ausgewählte Fahrzeuge
                </h3>
                <div style={{ display: 'grid', gap: 16 }}>
                  {selectedVehicles.map(v => (
                    <div key={v.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: 16,
                      background: tokens.colors.glassHover,
                      borderRadius: 12,
                    }}>
                      <span style={{ fontSize: 32 }}>{v.image}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 500, color: tokens.colors.chromeAccent, margin: 0 }}>
                          {v.make} {v.model}
                        </p>
                        <p style={{ fontSize: 12, color: tokens.colors.liquidQuicksilver, margin: 0 }}>
                          {v.year} • {v.km.toLocaleString('de-DE')} km
                        </p>
                      </div>
                      <p style={{ fontSize: 16, fontWeight: 600, color: tokens.colors.goldPremium }}>
                        €{v.price.toLocaleString('de-DE')}
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: 20,
                  paddingTop: 20,
                  borderTop: `1px solid ${tokens.colors.glassHover}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ fontSize: 14, color: tokens.colors.liquidQuicksilver }}>Gesamtwert</span>
                  <span style={{
                    fontFamily: tokens.fonts.display,
                    fontSize: 24,
                    fontWeight: 700,
                    color: tokens.colors.goldPremium,
                  }}>
                    €{totalSelectedValue.toLocaleString('de-DE')}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        padding: '40px',
        borderTop: `1px solid ${tokens.colors.glassWhite}`,
        marginTop: 80,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          <div>
            <h3 style={{
              fontFamily: tokens.fonts.display,
              fontSize: 20,
              color: tokens.colors.chromeAccent,
              margin: 0,
            }}>
              Car<span style={{ color: tokens.colors.goldPremium }}>Center</span>24
            </h3>
            <p style={{ fontSize: 13, color: tokens.colors.liquidQuicksilver, margin: '8px 0 0' }}>
              Premium Autohandel mit Integrität
            </p>
          </div>

          <div style={{ display: 'flex', gap: 32 }}>
            {['Über Uns', 'Datenschutz', 'Impressum', 'AGB'].map(link => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: 13,
                  color: tokens.colors.liquidQuicksilver,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                {link}
              </a>
            ))}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 12,
            color: tokens.colors.liquidQuicksilver,
          }}>
            <span>Finanzierungspartner:</span>
            <div style={{ display: 'flex', gap: 8 }}>
              {bankPartners.slice(0, 5).map(b => (
                <span key={b.id} title={b.name}>{b.logo}</span>
              ))}
              <span>+10</span>
            </div>
          </div>
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: 12,
          color: tokens.colors.liquidQuicksilver,
          marginTop: 40,
          opacity: 0.6,
        }}>
          © 2026 CarCenter24 GmbH. Alle Rechte vorbehalten. | Powered by VΞGΔ Foundation
        </p>
      </footer>
    </div>
  );
};

export default CC24Platform;
