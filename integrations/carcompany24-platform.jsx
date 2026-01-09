import React, { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================================
// CARCOMPANY24 GMBH - PREMIUM AUTOMOTIVE PLATFORM
// ============================================================================
// Location: Adolf-Hoyer-Straße 12, 37079 Göttingen
// Rating: 4.9/5.0 on Mobile.de (28 Reviews)
// USP: Financing for customers with negative Schufa
// ============================================================================

// Design Tokens - Extracted from brand imagery
const tokens = {
  colors: {
    // Primary brand colors from images
    cyberCyan: '#00D4D4',
    deepCyan: '#00A8A8',
    tealAccent: '#0FB5BA',
    darkShowroom: '#0A0F14',
    charcoalMetal: '#1A1F25',
    gunmetal: '#2C3239',
    chromeWhite: '#E8EDF2',
    silverMist: '#9CA8B4',
    // Accent colors
    premiumGold: '#C9A962',
    successGreen: '#00C853',
    alertRed: '#FF3D57',
    infoBlue: '#2196F3',
    // Glass effects
    glassLight: 'rgba(255,255,255,0.06)',
    glassMedium: 'rgba(255,255,255,0.10)',
    glassHover: 'rgba(255,255,255,0.14)',
    // Gradients
    cyanGlow: 'linear-gradient(135deg, #00D4D4 0%, #0FB5BA 100%)',
    darkGradient: 'linear-gradient(180deg, #0A0F14 0%, #1A1F25 100%)',
  },
  fonts: {
    display: "'Montserrat', -apple-system, sans-serif",
    body: "'Inter', -apple-system, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  shadows: {
    cyan: '0 0 40px rgba(0, 212, 212, 0.3)',
    card: '0 8px 32px rgba(0, 0, 0, 0.4)',
    elevated: '0 20px 60px rgba(0, 0, 0, 0.5)',
  }
};

// Company Data
const companyData = {
  name: 'CarCompany24 GmbH',
  tagline: 'AUTOMOTIVE SERVICE',
  address: 'Adolf-Hoyer-Straße 12',
  city: '37079 Göttingen',
  phone: '+49 551 12345678',
  email: 'info@carcompany24-gmbh.de',
  website: 'carcompany24-gmbh.de',
  rating: 4.9,
  reviews: 28,
  founded: 2020,
  hrb: 'HRB 206118',
  court: 'Amtsgericht Göttingen',
  vatId: 'DE 33615454',
  directors: ['Hatice Yagmur', 'Xhulja Yagmur'],
  capital: '25.000 €',
};

// Demo Vehicle Inventory (Mobile.de style)
const vehicleInventory = [
  { 
    id: 'CC24-001', 
    make: 'BMW', 
    model: '320d Touring', 
    variant: 'M Sport',
    year: 2021, 
    price: 28900, 
    km: 87000, 
    fuel: 'Diesel',
    transmission: 'Automatik',
    power: '190 PS',
    color: 'Schwarz Metallic',
    interior: 'Leder Schwarz',
    firstReg: '03/2021',
    hu: '09/2025',
    doors: 5,
    seats: 5,
    prevOwners: 2,
    co2: 118,
    consumption: '4.5 L/100km',
    effizienz: 'A',
    features: ['Navigation', 'LED', 'Tempomat', 'Parkassistent', 'Sitzheizung'],
    images: 6,
    featured: true,
    financing: { rate: 389, term: 60, anzahlung: 5000 }
  },
  { 
    id: 'CC24-002', 
    make: 'Mercedes-Benz', 
    model: 'C 200', 
    variant: 'AMG Line',
    year: 2022, 
    price: 34500, 
    km: 45000, 
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: '204 PS',
    color: 'Iridiumsilber',
    interior: 'Kunstleder Schwarz',
    firstReg: '06/2022',
    hu: '06/2026',
    doors: 4,
    seats: 5,
    prevOwners: 1,
    co2: 155,
    consumption: '6.8 L/100km',
    effizienz: 'B',
    features: ['MBUX', 'LED Multibeam', '360° Kamera', 'Keyless Go'],
    images: 8,
    featured: true,
    financing: { rate: 449, term: 60, anzahlung: 6000 }
  },
  { 
    id: 'CC24-003', 
    make: 'Volkswagen', 
    model: 'Golf 8', 
    variant: 'GTI',
    year: 2023, 
    price: 38900, 
    km: 22000, 
    fuel: 'Benzin',
    transmission: 'DSG',
    power: '245 PS',
    color: 'Tornado Rot',
    interior: 'Stoff Tartan',
    firstReg: '01/2023',
    hu: '01/2027',
    doors: 5,
    seats: 5,
    prevOwners: 1,
    co2: 168,
    consumption: '7.4 L/100km',
    effizienz: 'C',
    features: ['Digital Cockpit Pro', 'IQ.Drive', 'Beats Sound', 'Matrix LED'],
    images: 7,
    featured: true,
    financing: { rate: 489, term: 60, anzahlung: 7000 }
  },
  { 
    id: 'CC24-004', 
    make: 'Audi', 
    model: 'A4 Avant', 
    variant: '40 TDI quattro',
    year: 2020, 
    price: 32900, 
    km: 98000, 
    fuel: 'Diesel',
    transmission: 'S tronic',
    power: '204 PS',
    color: 'Daytonagrau',
    interior: 'Leder/Alcantara',
    firstReg: '09/2020',
    hu: '09/2024',
    doors: 5,
    seats: 5,
    prevOwners: 2,
    co2: 128,
    consumption: '4.9 L/100km',
    effizienz: 'A',
    features: ['Virtual Cockpit', 'MMI Navigation Plus', 'Bang & Olufsen', 'Panorama'],
    images: 9,
    featured: false,
    financing: { rate: 429, term: 60, anzahlung: 5500 }
  },
  { 
    id: 'CC24-005', 
    make: 'Porsche', 
    model: 'Macan', 
    variant: 'S',
    year: 2021, 
    price: 58900, 
    km: 42000, 
    fuel: 'Benzin',
    transmission: 'PDK',
    power: '380 PS',
    color: 'Schwarz',
    interior: 'Leder Bordeaux',
    firstReg: '04/2021',
    hu: '04/2025',
    doors: 5,
    seats: 5,
    prevOwners: 1,
    co2: 212,
    consumption: '9.4 L/100km',
    effizienz: 'D',
    features: ['Sport Chrono', 'PASM', 'Luftfederung', 'BOSE', '21" Turbo'],
    images: 12,
    featured: true,
    financing: { rate: 749, term: 60, anzahlung: 12000 }
  },
  { 
    id: 'CC24-006', 
    make: 'Seat', 
    model: 'Leon', 
    variant: '1.5 TSI FR',
    year: 2022, 
    price: 24900, 
    km: 35000, 
    fuel: 'Benzin',
    transmission: 'Manuell',
    power: '150 PS',
    color: 'Desire Rot',
    interior: 'Stoff/Kunstleder',
    firstReg: '08/2022',
    hu: '08/2026',
    doors: 5,
    seats: 5,
    prevOwners: 1,
    co2: 132,
    consumption: '5.8 L/100km',
    effizienz: 'A',
    features: ['Full Link', 'Virtual Cockpit', 'BeatsAudio', 'LED'],
    images: 5,
    featured: false,
    financing: { rate: 329, term: 60, anzahlung: 4000 }
  },
];

// Financing Bank Partners
const bankPartners = [
  { id: 1, name: 'Santander Consumer Bank', rate: 4.99, logo: 'S' },
  { id: 2, name: 'Bank11', rate: 5.29, logo: 'B11' },
  { id: 3, name: 'CreditPlus Bank', rate: 5.49, logo: 'C+' },
  { id: 4, name: 'Targobank', rate: 5.79, logo: 'T' },
  { id: 5, name: 'SWK Bank', rate: 5.99, logo: 'SWK' },
];

// ============================================================================
// CUSTOM SVG ICONS (No standard emojis)
// ============================================================================
const Icons = {
  // Car silhouette logo
  CarSilhouette: ({ className = '', size = 120 }) => (
    <svg width={size} height={size * 0.4} viewBox="0 0 120 48" fill="none" className={className}>
      <path 
        d="M10 38 Q5 38 5 33 L5 30 Q5 28 7 28 L20 28 L35 18 Q40 14 50 14 L80 14 Q95 14 100 20 L110 28 Q115 28 115 32 L115 35 Q115 38 110 38 L100 38 Q100 44 92 44 Q84 44 84 38 L36 38 Q36 44 28 44 Q20 44 20 38 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="28" cy="38" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="92" cy="38" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M40 18 L38 26 L75 26 L72 18 Q70 14 65 14 L50 14 Q42 14 40 18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M78 18 L80 26 L100 26 L95 20 Q92 16 85 16 L78 16" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),

  // Speedometer
  Speedometer: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6 L12 8"/>
      <path d="M6 12 L8 12"/>
      <path d="M18 12 L16 12"/>
      <path d="M12 12 L16 8" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),

  // Fuel pump
  Fuel: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="12" height="16" rx="1"/>
      <path d="M15 10 L18 10 Q20 10 20 12 L20 18 Q20 20 18 20"/>
      <rect x="5" y="6" width="8" height="5" rx="0.5"/>
    </svg>
  ),

  // Gearbox
  Gearbox: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="6" cy="6" r="2"/>
      <circle cx="12" cy="6" r="2"/>
      <circle cx="18" cy="6" r="2"/>
      <circle cx="6" cy="18" r="2"/>
      <circle cx="18" cy="18" r="2"/>
      <path d="M6 8 L6 16"/>
      <path d="M12 8 L12 12 L18 12 L18 16"/>
    </svg>
  ),

  // Calendar/Year
  Calendar: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <path d="M3 9 L21 9"/>
      <path d="M8 2 L8 6"/>
      <path d="M16 2 L16 6"/>
    </svg>
  ),

  // Odometer/KM
  Odometer: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22 C6 22 2 17 2 12 C2 7 6 2 12 2 C18 2 22 7 22 12"/>
      <path d="M12 6 L12 12 L16 14"/>
      <rect x="16" y="16" width="6" height="4" rx="1"/>
    </svg>
  ),

  // Euro currency
  Euro: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 5 Q12 2 8 5 Q4 8 4 12 Q4 16 8 19 Q12 22 17 19"/>
      <path d="M3 10 L12 10"/>
      <path d="M3 14 L12 14"/>
    </svg>
  ),

  // Shield/Warranty
  Shield: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2 L20 6 L20 12 Q20 18 12 22 Q4 18 4 12 L4 6 Z"/>
      <path d="M8 12 L11 15 L16 9"/>
    </svg>
  ),

  // Star rating
  Star: ({ size = 24, filled = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M12 2 L15 9 L22 9 L16 14 L18 21 L12 17 L6 21 L8 14 L2 9 L9 9 Z"/>
    </svg>
  ),

  // Location pin
  Location: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2 Q18 2 18 9 Q18 14 12 22 Q6 14 6 9 Q6 2 12 2"/>
      <circle cx="12" cy="9" r="3"/>
    </svg>
  ),

  // Phone
  Phone: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 4 L9 4 L11 9 L8 11 Q10 15 14 17 L16 14 L21 16 L21 20 Q21 22 19 22 Q6 21 3 8 Q2 4 5 4"/>
    </svg>
  ),

  // WhatsApp
  WhatsApp: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2 Q20 2 21 10 Q22 18 14 21 L3 22 L6 14 Q2 6 12 2"/>
      <path d="M9 9 Q9 7 11 7 Q13 7 13 9 L13 10 Q13 11 12 12 L11 13 Q10 14 10 15"/>
      <circle cx="10" cy="17" r="0.5" fill="currentColor"/>
    </svg>
  ),

  // 360 view
  View360: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <ellipse cx="12" cy="12" rx="4" ry="10"/>
      <path d="M2 12 L22 12"/>
      <path d="M4 7 Q12 9 20 7"/>
      <path d="M4 17 Q12 15 20 17"/>
    </svg>
  ),

  // Camera/Photo
  Camera: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="6" width="20" height="14" rx="2"/>
      <circle cx="12" cy="13" r="4"/>
      <path d="M7 6 L9 3 L15 3 L17 6"/>
    </svg>
  ),

  // Check mark
  Check: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M4 12 L9 17 L20 6"/>
    </svg>
  ),

  // TÜV badge
  TUV: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M7 8 L17 8"/>
      <path d="M12 8 L12 16"/>
      <path d="M8 16 L16 16"/>
    </svg>
  ),

  // Menu
  Menu: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6 L21 6"/>
      <path d="M3 12 L21 12"/>
      <path d="M3 18 L21 18"/>
    </svg>
  ),

  // Close
  Close: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6 L18 18"/>
      <path d="M18 6 L6 18"/>
    </svg>
  ),

  // Arrow right
  ArrowRight: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 12 L20 12"/>
      <path d="M14 6 L20 12 L14 18"/>
    </svg>
  ),

  // Calculator
  Calculator: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      <rect x="6" y="4" width="12" height="5"/>
      <circle cx="8" cy="13" r="1" fill="currentColor"/>
      <circle cx="12" cy="13" r="1" fill="currentColor"/>
      <circle cx="16" cy="13" r="1" fill="currentColor"/>
      <circle cx="8" cy="17" r="1" fill="currentColor"/>
      <circle cx="12" cy="17" r="1" fill="currentColor"/>
      <circle cx="16" cy="17" r="1" fill="currentColor"/>
    </svg>
  ),

  // Handshake/Deal
  Handshake: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 11 L6 7 L10 10 L14 7 L18 10"/>
      <path d="M6 7 L2 11 L6 15"/>
      <path d="M18 10 L22 14 L18 18"/>
      <path d="M10 10 Q12 12 14 10"/>
      <path d="M6 15 L12 18 L18 15"/>
    </svg>
  ),

  // Upload
  Upload: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 16 L12 4"/>
      <path d="M7 9 L12 4 L17 9"/>
      <path d="M4 14 L4 20 L20 20 L20 14"/>
    </svg>
  ),

  // Settings/Admin
  Settings: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2 L12 4 M12 20 L12 22 M2 12 L4 12 M20 12 L22 12"/>
      <path d="M4.9 4.9 L6.3 6.3 M17.7 17.7 L19.1 19.1 M4.9 19.1 L6.3 17.7 M17.7 6.3 L19.1 4.9"/>
    </svg>
  ),

  // Leaf/Eco
  Leaf: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 21 Q6 12 12 6 Q18 6 21 3"/>
      <path d="M6 21 Q12 18 21 3"/>
      <path d="M3 18 Q6 15 12 12"/>
    </svg>
  ),
};

// ============================================================================
// LOADING SCREEN
// ============================================================================
const LoadingScreen = ({ progress = 0, message = 'Lade Fahrzeuge...' }) => {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: tokens.colors.darkGradient,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      {/* Animated glow rings */}
      <div style={{ position: 'relative', marginBottom: 40 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: i === 0 ? 'relative' : 'absolute',
            inset: i === 0 ? 'auto' : -20 * (i + 1),
            width: i === 0 ? 100 : 'auto',
            height: i === 0 ? 100 : 'auto',
            borderRadius: '50%',
            border: `2px solid ${tokens.colors.cyberCyan}`,
            opacity: 0.3 - i * 0.1,
            animation: `pulse ${2 + i * 0.5}s ease-in-out infinite`,
          }} />
        ))}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: tokens.colors.cyberCyan,
        }}>
          <Icons.CarSilhouette size={80} />
        </div>
      </div>

      {/* Brand name */}
      <h1 style={{
        fontFamily: tokens.fonts.display,
        fontSize: 32,
        fontWeight: 700,
        color: tokens.colors.chromeWhite,
        letterSpacing: 2,
        margin: 0,
      }}>
        Car<span style={{ color: tokens.colors.cyberCyan }}>Company</span>24
      </h1>
      <p style={{
        fontFamily: tokens.fonts.body,
        fontSize: 12,
        color: tokens.colors.silverMist,
        letterSpacing: 4,
        textTransform: 'uppercase',
        marginTop: 8,
      }}>
        {companyData.tagline}
      </p>

      {/* Progress */}
      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <div style={{
          width: 200,
          height: 3,
          background: tokens.colors.glassLight,
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: tokens.colors.cyanGlow,
            transition: 'width 0.3s ease',
          }} />
        </div>
        <p style={{
          fontFamily: tokens.fonts.body,
          fontSize: 13,
          color: tokens.colors.silverMist,
          marginTop: 16,
        }}>
          {message}{dots}
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// SVG LOGO COMPONENT
// ============================================================================
const Logo = ({ variant = 'full', size = 'md' }) => {
  const sizes = {
    sm: { width: 140, height: 50 },
    md: { width: 200, height: 70 },
    lg: { width: 280, height: 100 },
  };
  
  const { width, height } = sizes[size];

  return (
    <svg width={width} height={height} viewBox="0 0 200 70" fill="none">
      {/* Car silhouette */}
      <path 
        d="M10 45 Q5 45 5 40 L5 36 Q5 34 7 34 L22 34 L40 22 Q46 17 58 17 L105 17 Q125 17 132 24 L148 34 Q153 34 153 38 L153 42 Q153 45 148 45 L136 45 Q136 52 126 52 Q116 52 116 45 L44 45 Q44 52 34 52 Q24 52 24 45 Z"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="2.5"
      />
      {/* Wheels */}
      <circle cx="34" cy="45" r="6" fill="none" stroke="url(#logoGradient)" strokeWidth="2"/>
      <circle cx="126" cy="45" r="6" fill="none" stroke="url(#logoGradient)" strokeWidth="2"/>
      {/* Windows */}
      <path d="M48 24 L45 32 L90 32 L86 24 Q83 19 75 19 L58 19 Q50 19 48 24" fill="none" stroke="url(#logoGradient)" strokeWidth="1.5"/>
      <path d="M94 24 L96 32 L130 32 L122 24 Q118 20 110 20 L98 20" fill="none" stroke="url(#logoGradient)" strokeWidth="1.5"/>
      
      {/* Gradient definition */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={tokens.colors.silverMist} />
          <stop offset="50%" stopColor={tokens.colors.chromeWhite} />
          <stop offset="100%" stopColor={tokens.colors.silverMist} />
        </linearGradient>
      </defs>

      {variant === 'full' && (
        <>
          {/* Company name */}
          <text x="10" y="68" fontFamily={tokens.fonts.display} fontSize="18" fontWeight="600" fill={tokens.colors.chromeWhite}>
            Car
            <tspan fill={tokens.colors.cyberCyan}>Company</tspan>
            24
          </text>
          <text x="155" y="68" fontFamily={tokens.fonts.display} fontSize="10" fontWeight="500" fill={tokens.colors.silverMist}>
            GmbH
          </text>
        </>
      )}
    </svg>
  );
};

// ============================================================================
// VEHICLE CARD COMPONENT
// ============================================================================
const VehicleCard = ({ vehicle, onSelect, onFinancing, isCompact = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(vehicle)}
      style={{
        background: tokens.colors.charcoalMetal,
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? tokens.shadows.elevated : tokens.shadows.card,
        border: `1px solid ${isHovered ? tokens.colors.cyberCyan + '40' : 'transparent'}`,
      }}
    >
      {/* Image area with overlay */}
      <div style={{
        position: 'relative',
        height: isCompact ? 140 : 180,
        background: `linear-gradient(135deg, ${tokens.colors.darkShowroom} 0%, ${tokens.colors.gunmetal} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Cyan accent light effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${tokens.colors.cyberCyan}10 0%, transparent 50%)`,
          pointerEvents: 'none',
        }} />

        {/* Car icon placeholder */}
        <div style={{ color: tokens.colors.gunmetal, opacity: 0.5 }}>
          <Icons.CarSilhouette size={isCompact ? 100 : 140} />
        </div>

        {/* Badges */}
        <div style={{
          position: 'absolute',
          top: 12,
          left: 12,
          display: 'flex',
          gap: 6,
        }}>
          {vehicle.featured && (
            <span style={{
              padding: '4px 10px',
              fontSize: 10,
              fontWeight: 700,
              background: tokens.colors.premiumGold,
              color: tokens.colors.darkShowroom,
              borderRadius: 4,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
              Premium
            </span>
          )}
          <span style={{
            padding: '4px 10px',
            fontSize: 10,
            fontWeight: 600,
            background: tokens.colors.glassLight,
            color: tokens.colors.chromeWhite,
            borderRadius: 4,
            backdropFilter: 'blur(10px)',
          }}>
            {vehicle.images} Fotos
          </span>
        </div>

        {/* 360° badge if available */}
        <div style={{
          position: 'absolute',
          top: 12,
          right: 12,
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: tokens.colors.glassMedium,
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: tokens.colors.cyberCyan,
        }}>
          <Icons.View360 size={20} />
        </div>

        {/* HU/TÜV status */}
        <div style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 10px',
          background: tokens.colors.successGreen + '20',
          borderRadius: 4,
          color: tokens.colors.successGreen,
          fontSize: 11,
          fontWeight: 600,
        }}>
          <Icons.TUV size={14} />
          <span>HU {vehicle.hu}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: isCompact ? 16 : 20 }}>
        {/* Header */}
        <div style={{ marginBottom: 12 }}>
          <p style={{
            fontSize: 11,
            fontWeight: 700,
            color: tokens.colors.cyberCyan,
            textTransform: 'uppercase',
            letterSpacing: 1,
            margin: 0,
          }}>
            {vehicle.make}
          </p>
          <h3 style={{
            fontFamily: tokens.fonts.display,
            fontSize: isCompact ? 16 : 18,
            fontWeight: 600,
            color: tokens.colors.chromeWhite,
            margin: '4px 0 0',
          }}>
            {vehicle.model} {vehicle.variant}
          </h3>
        </div>

        {/* Specs row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 16,
        }}>
          {[
            { icon: Icons.Calendar, value: vehicle.year },
            { icon: Icons.Odometer, value: `${(vehicle.km / 1000).toFixed(0)}T km` },
            { icon: Icons.Fuel, value: vehicle.fuel },
            { icon: Icons.Gearbox, value: vehicle.transmission.slice(0, 4) },
          ].map((spec, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              color: tokens.colors.silverMist,
              fontSize: 12,
            }}>
              <spec.icon size={14} />
              <span>{spec.value}</span>
            </div>
          ))}
        </div>

        {/* EnVKV compliance data */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 16,
          padding: '8px 12px',
          background: tokens.colors.glassLight,
          borderRadius: 8,
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 4,
            background: vehicle.effizienz === 'A' ? tokens.colors.successGreen 
              : vehicle.effizienz === 'B' ? '#8BC34A'
              : vehicle.effizienz === 'C' ? '#FFC107'
              : '#FF9800',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 16,
            color: tokens.colors.darkShowroom,
          }}>
            {vehicle.effizienz}
          </div>
          <div>
            <p style={{ fontSize: 10, color: tokens.colors.silverMist, margin: 0 }}>
              {vehicle.consumption} • {vehicle.co2} g/km CO₂
            </p>
            <p style={{ fontSize: 9, color: tokens.colors.silverMist, margin: '2px 0 0', opacity: 0.7 }}>
              (kombiniert, WLTP)
            </p>
          </div>
        </div>

        {/* Price section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingTop: 12,
          borderTop: `1px solid ${tokens.colors.glassLight}`,
        }}>
          <div>
            <p style={{
              fontFamily: tokens.fonts.display,
              fontSize: 24,
              fontWeight: 700,
              color: tokens.colors.chromeWhite,
              margin: 0,
            }}>
              €{vehicle.price.toLocaleString('de-DE')}
            </p>
            <p style={{
              fontSize: 12,
              color: tokens.colors.silverMist,
              margin: '2px 0 0',
            }}>
              inkl. MwSt., zzgl. Überführung
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{
              fontSize: 11,
              color: tokens.colors.cyberCyan,
              margin: 0,
            }}>
              ab €{vehicle.financing.rate}/Monat
            </p>
            <p style={{
              fontSize: 10,
              color: tokens.colors.silverMist,
              margin: '2px 0 0',
            }}>
              {vehicle.financing.term} Mon. • €{vehicle.financing.anzahlung.toLocaleString('de-DE')} Anz.
            </p>
          </div>
        </div>

        {/* CTA buttons */}
        {!isCompact && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
            marginTop: 16,
          }}>
            <button
              onClick={(e) => { e.stopPropagation(); onFinancing(vehicle); }}
              style={{
                padding: '12px 16px',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: tokens.fonts.body,
                background: tokens.colors.cyanGlow,
                color: tokens.colors.darkShowroom,
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <Icons.Calculator size={16} />
              Finanzieren
            </button>
            <button
              style={{
                padding: '12px 16px',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: tokens.fonts.body,
                background: 'transparent',
                color: tokens.colors.chromeWhite,
                border: `1px solid ${tokens.colors.glassMedium}`,
                borderRadius: 8,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <Icons.Phone size={16} />
              Anfragen
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// FINANCING CALCULATOR (PAngV Compliant)
// ============================================================================
const FinancingCalculator = ({ vehicle, onClose }) => {
  const [price, setPrice] = useState(vehicle?.price || 25000);
  const [anzahlung, setAnzahlung] = useState(vehicle?.financing?.anzahlung || 5000);
  const [laufzeit, setLaufzeit] = useState(vehicle?.financing?.term || 48);
  const [zinssatz, setZinssatz] = useState(4.99);
  const [ballonRate, setBallonRate] = useState(0);
  const [selectedBank, setSelectedBank] = useState(bankPartners[0]);

  const nettokredit = price - anzahlung;
  const ballonBetrag = (nettokredit * ballonRate) / 100;
  const finanzierterBetrag = nettokredit - ballonBetrag;
  
  // Monthly rate calculation
  const monatszins = zinssatz / 100 / 12;
  const rate = monatszins === 0 
    ? finanzierterBetrag / laufzeit
    : (finanzierterBetrag * monatszins * Math.pow(1 + monatszins, laufzeit)) / (Math.pow(1 + monatszins, laufzeit) - 1);
  
  const gesamtBetrag = (rate * laufzeit) + ballonBetrag + anzahlung;
  const zinsKosten = gesamtBetrag - price;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 20,
    }}>
      <div style={{
        background: tokens.colors.charcoalMetal,
        borderRadius: 20,
        maxWidth: 600,
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        border: `1px solid ${tokens.colors.glassMedium}`,
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 24,
          borderBottom: `1px solid ${tokens.colors.glassLight}`,
        }}>
          <div>
            <h2 style={{
              fontFamily: tokens.fonts.display,
              fontSize: 20,
              color: tokens.colors.chromeWhite,
              margin: 0,
            }}>
              Finanzierungsrechner
            </h2>
            {vehicle && (
              <p style={{ fontSize: 13, color: tokens.colors.silverMist, margin: '4px 0 0' }}>
                {vehicle.year} {vehicle.make} {vehicle.model}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: tokens.colors.glassLight,
              border: 'none',
              color: tokens.colors.chromeWhite,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icons.Close size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: 24 }}>
          {/* Sliders */}
          <div style={{ display: 'grid', gap: 24, marginBottom: 24 }}>
            {/* Price */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 13, color: tokens.colors.silverMist }}>Fahrzeugpreis</label>
                <span style={{ fontSize: 15, fontWeight: 600, color: tokens.colors.chromeWhite }}>
                  €{price.toLocaleString('de-DE')}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="500"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: tokens.colors.cyberCyan }}
              />
            </div>

            {/* Anzahlung */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 13, color: tokens.colors.silverMist }}>Anzahlung</label>
                <span style={{ fontSize: 15, fontWeight: 600, color: tokens.colors.chromeWhite }}>
                  €{anzahlung.toLocaleString('de-DE')} ({Math.round(anzahlung / price * 100)}%)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={price * 0.5}
                step="500"
                value={anzahlung}
                onChange={(e) => setAnzahlung(Number(e.target.value))}
                style={{ width: '100%', accentColor: tokens.colors.cyberCyan }}
              />
            </div>

            {/* Laufzeit */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 13, color: tokens.colors.silverMist }}>Laufzeit</label>
                <span style={{ fontSize: 15, fontWeight: 600, color: tokens.colors.chromeWhite }}>
                  {laufzeit} Monate
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[24, 36, 48, 60, 72, 84].map(months => (
                  <button
                    key={months}
                    onClick={() => setLaufzeit(months)}
                    style={{
                      flex: 1,
                      padding: '10px 8px',
                      fontSize: 13,
                      fontFamily: tokens.fonts.body,
                      background: laufzeit === months ? tokens.colors.cyberCyan + '20' : tokens.colors.glassLight,
                      border: `1px solid ${laufzeit === months ? tokens.colors.cyberCyan : 'transparent'}`,
                      borderRadius: 8,
                      color: laufzeit === months ? tokens.colors.cyberCyan : tokens.colors.silverMist,
                      cursor: 'pointer',
                    }}
                  >
                    {months}
                  </button>
                ))}
              </div>
            </div>

            {/* Balloon payment */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 13, color: tokens.colors.silverMist }}>
                  Schlussrate (Ballonfinanzierung)
                </label>
                <span style={{ fontSize: 15, fontWeight: 600, color: tokens.colors.chromeWhite }}>
                  {ballonRate}% (€{Math.round(ballonBetrag).toLocaleString('de-DE')})
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={ballonRate}
                onChange={(e) => setBallonRate(Number(e.target.value))}
                style={{ width: '100%', accentColor: tokens.colors.cyberCyan }}
              />
            </div>
          </div>

          {/* Bank selection */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, color: tokens.colors.silverMist, display: 'block', marginBottom: 12 }}>
              Finanzierungspartner
            </label>
            <div style={{ display: 'grid', gap: 8 }}>
              {bankPartners.map(bank => (
                <div
                  key={bank.id}
                  onClick={() => { setSelectedBank(bank); setZinssatz(bank.rate); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: 12,
                    background: selectedBank.id === bank.id ? tokens.colors.cyberCyan + '15' : tokens.colors.glassLight,
                    border: `1px solid ${selectedBank.id === bank.id ? tokens.colors.cyberCyan : 'transparent'}`,
                    borderRadius: 10,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: tokens.colors.glassMedium,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 12,
                    color: tokens.colors.chromeWhite,
                  }}>
                    {bank.logo}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: tokens.colors.chromeWhite, margin: 0 }}>
                      {bank.name}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 16, fontWeight: 700, color: tokens.colors.successGreen, margin: 0 }}>
                      {bank.rate}%
                    </p>
                    <p style={{ fontSize: 10, color: tokens.colors.silverMist, margin: 0 }}>eff. p.a.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Result box */}
          <div style={{
            background: `linear-gradient(135deg, ${tokens.colors.deepCyan}20, ${tokens.colors.cyberCyan}10)`,
            borderRadius: 16,
            padding: 24,
            textAlign: 'center',
            marginBottom: 24,
            border: `1px solid ${tokens.colors.cyberCyan}30`,
          }}>
            <p style={{ fontSize: 12, color: tokens.colors.silverMist, textTransform: 'uppercase', letterSpacing: 2, margin: 0 }}>
              Ihre monatliche Rate
            </p>
            <p style={{
              fontFamily: tokens.fonts.display,
              fontSize: 48,
              fontWeight: 700,
              color: tokens.colors.chromeWhite,
              margin: '8px 0',
            }}>
              €{Math.round(rate).toLocaleString('de-DE')}
            </p>
            {ballonRate > 0 && (
              <p style={{ fontSize: 13, color: tokens.colors.cyberCyan, margin: '0 0 8px' }}>
                + €{Math.round(ballonBetrag).toLocaleString('de-DE')} Schlussrate
              </p>
            )}
            <p style={{ fontSize: 12, color: tokens.colors.silverMist, margin: 0 }}>
              Gesamtbetrag: €{Math.round(gesamtBetrag).toLocaleString('de-DE')} • 
              Zinskosten: €{Math.round(zinsKosten).toLocaleString('de-DE')}
            </p>
          </div>

          {/* PAngV compliant disclosure */}
          <div style={{
            background: tokens.colors.glassLight,
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
          }}>
            <p style={{
              fontSize: 11,
              color: tokens.colors.silverMist,
              margin: 0,
              lineHeight: 1.6,
            }}>
              <strong style={{ color: tokens.colors.chromeWhite }}>Repräsentatives Beispiel gem. §17 Abs. 4 PAngV:</strong><br />
              Kaufpreis: €{price.toLocaleString('de-DE')} | 
              Anzahlung: €{anzahlung.toLocaleString('de-DE')} | 
              Nettodarlehensbetrag: €{nettokredit.toLocaleString('de-DE')}<br />
              Laufzeit: {laufzeit} Monate | 
              Sollzinssatz (gebunden p.a.): {(zinssatz * 0.97).toFixed(2)}% | 
              <strong> Effektiver Jahreszins: {zinssatz.toFixed(2)}%</strong><br />
              Monatliche Rate: €{Math.round(rate).toLocaleString('de-DE')} | 
              {ballonRate > 0 && `Schlussrate: €${Math.round(ballonBetrag).toLocaleString('de-DE')} | `}
              Gesamtbetrag: €{Math.round(gesamtBetrag).toLocaleString('de-DE')}<br />
              Vermittlung erfolgt durch {selectedBank.name}. Bonität vorausgesetzt.
            </p>
          </div>

          {/* Special financing note */}
          <div style={{
            background: tokens.colors.premiumGold + '15',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            border: `1px solid ${tokens.colors.premiumGold}30`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icons.Shield size={24} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: tokens.colors.premiumGold, margin: 0 }}>
                  Finanzierung auch bei negativer Schufa möglich
                </p>
                <p style={{ fontSize: 11, color: tokens.colors.silverMist, margin: '4px 0 0' }}>
                  Wir prüfen individuelle Lösungen für Sie. Sprechen Sie uns an!
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            style={{
              width: '100%',
              padding: '16px 24px',
              fontSize: 16,
              fontWeight: 600,
              fontFamily: tokens.fonts.body,
              background: tokens.colors.cyanGlow,
              color: tokens.colors.darkShowroom,
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Icons.Handshake size={20} />
            Unverbindliches Angebot anfordern
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// VEHICLE UPLOAD / TRADE-IN TOOL
// ============================================================================
const TradeInTool = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [formData, setFormData] = useState({
    make: '', model: '', year: '', km: '', condition: 'gut',
    name: '', phone: '', email: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [valuation, setValuation] = useState(null);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      angle: photos.length < 4 ? ['front', 'back', 'left', 'right'][photos.length] : 'detail'
    }));
    setPhotos([...photos, ...newPhotos]);
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const baseValue = Math.random() * 15000 + 5000;
    const yearFactor = (parseInt(formData.year) - 2015) / 10;
    const kmFactor = 1 - (parseInt(formData.km) || 80000) / 300000;
    const conditionFactors = { sehr_gut: 1.15, gut: 1.0, befriedigend: 0.85, mangelhaft: 0.65 };
    const calculatedValue = Math.round(baseValue * (1 + yearFactor) * kmFactor * (conditionFactors[formData.condition] || 1));
    
    setValuation({
      min: Math.round(calculatedValue * 0.85),
      max: Math.round(calculatedValue * 1.1),
      avg: calculatedValue,
    });
    setIsProcessing(false);
    setStep(4);
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    fontSize: 14,
    fontFamily: tokens.fonts.body,
    background: tokens.colors.glassLight,
    border: `1px solid ${tokens.colors.glassMedium}`,
    borderRadius: 10,
    color: tokens.colors.chromeWhite,
    outline: 'none',
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 20,
    }}>
      <div style={{
        background: tokens.colors.charcoalMetal,
        borderRadius: 20,
        maxWidth: 560,
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        border: `1px solid ${tokens.colors.glassMedium}`,
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 24,
          borderBottom: `1px solid ${tokens.colors.glassLight}`,
        }}>
          <div>
            <h2 style={{
              fontFamily: tokens.fonts.display,
              fontSize: 20,
              color: tokens.colors.chromeWhite,
              margin: 0,
            }}>
              Fahrzeug verkaufen
            </h2>
            <p style={{ fontSize: 13, color: tokens.colors.silverMist, margin: '4px 0 0' }}>
              Kostenlose Bewertung in Minuten
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: tokens.colors.glassLight,
              border: 'none',
              color: tokens.colors.chromeWhite,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icons.Close size={20} />
          </button>
        </div>

        {/* Progress */}
        <div style={{
          display: 'flex',
          gap: 8,
          padding: '16px 24px',
          background: tokens.colors.glassLight,
        }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: s <= step ? tokens.colors.cyberCyan : tokens.colors.glassMedium,
              transition: 'background 0.3s ease',
            }} />
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: 24 }}>
          {step === 1 && (
            <>
              <h3 style={{ fontSize: 16, color: tokens.colors.chromeWhite, marginBottom: 20 }}>
                Fotos hochladen
              </h3>
              <p style={{ fontSize: 13, color: tokens.colors.silverMist, marginBottom: 20 }}>
                Laden Sie mindestens 4 Fotos hoch: Front, Heck, beide Seiten. Je mehr, desto genauer!
              </p>

              {/* Upload area */}
              <label style={{
                display: 'block',
                padding: 40,
                border: `2px dashed ${tokens.colors.glassMedium}`,
                borderRadius: 16,
                textAlign: 'center',
                cursor: 'pointer',
                marginBottom: 20,
              }}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />
                <div style={{ color: tokens.colors.cyberCyan, marginBottom: 12 }}>
                  <Icons.Upload size={40} />
                </div>
                <p style={{ fontSize: 14, color: tokens.colors.chromeWhite, margin: 0 }}>
                  Fotos hier ablegen oder klicken
                </p>
                <p style={{ fontSize: 12, color: tokens.colors.silverMist, margin: '8px 0 0' }}>
                  JPG, PNG bis 10MB pro Foto
                </p>
              </label>

              {/* Photo previews */}
              {photos.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 8,
                  marginBottom: 20,
                }}>
                  {photos.map((photo, i) => (
                    <div key={photo.id} style={{
                      position: 'relative',
                      aspectRatio: '4/3',
                      borderRadius: 8,
                      overflow: 'hidden',
                      background: tokens.colors.glassLight,
                    }}>
                      <img
                        src={photo.preview}
                        alt={`Foto ${i + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{
                        position: 'absolute',
                        bottom: 4,
                        left: 4,
                        padding: '2px 6px',
                        fontSize: 9,
                        background: tokens.colors.darkShowroom + 'cc',
                        color: tokens.colors.chromeWhite,
                        borderRadius: 4,
                        textTransform: 'uppercase',
                      }}>
                        {photo.angle}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={photos.length < 4}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: tokens.fonts.body,
                  background: photos.length >= 4 ? tokens.colors.cyanGlow : tokens.colors.glassMedium,
                  color: photos.length >= 4 ? tokens.colors.darkShowroom : tokens.colors.silverMist,
                  border: 'none',
                  borderRadius: 10,
                  cursor: photos.length >= 4 ? 'pointer' : 'not-allowed',
                }}
              >
                Weiter ({photos.length}/4 Fotos)
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h3 style={{ fontSize: 16, color: tokens.colors.chromeWhite, marginBottom: 20 }}>
                Fahrzeugdaten
              </h3>

              <div style={{ display: 'grid', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, color: tokens.colors.silverMist, display: 'block', marginBottom: 6 }}>
                      Marke
                    </label>
                    <select
                      value={formData.make}
                      onChange={(e) => setFormData({...formData, make: e.target.value})}
                      style={inputStyle}
                    >
                      <option value="">Auswählen</option>
                      {['Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Porsche', 'Opel', 'Ford', 'Seat', 'Skoda'].map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: tokens.colors.silverMist, display: 'block', marginBottom: 6 }}>
                      Modell
                    </label>
                    <input
                      type="text"
                      placeholder="z.B. 3er, A4, Golf"
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, color: tokens.colors.silverMist, display: 'block', marginBottom: 6 }}>
                      Erstzulassung
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      style={inputStyle}
                    >
                      <option value="">Jahr</option>
                      {Array.from({length: 15}, (_, i) => 2024 - i).map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: tokens.colors.silverMist, display: 'block', marginBottom: 6 }}>
                      Kilometerstand
                    </label>
                    <input
                      type="number"
                      placeholder="z.B. 85000"
                      value={formData.km}
                      onChange={(e) => setFormData({...formData, km: e.target.value})}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 12, color: tokens.colors.silverMist, display: 'block', marginBottom: 6 }}>
                    Zustand
                  </label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[
                      { value: 'sehr_gut', label: 'Sehr gut' },
                      { value: 'gut', label: 'Gut' },
                      { value: 'befriedigend', label: 'OK' },
                      { value: 'mangelhaft', label: 'Mängel' },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setFormData({...formData, condition: opt.value})}
                        style={{
                          flex: 1,
                          padding: '12px 8px',
                          fontSize: 13,
                          fontFamily: tokens.fonts.body,
                          background: formData.condition === opt.value ? tokens.colors.cyberCyan + '20' : tokens.colors.glassLight,
                          border: `1px solid ${formData.condition === opt.value ? tokens.colors.cyberCyan : 'transparent'}`,
                          borderRadius: 8,
                          color: formData.condition === opt.value ? tokens.colors.cyberCyan : tokens.colors.silverMist,
                          cursor: 'pointer',
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    padding: '14px 24px',
                    fontSize: 14,
                    fontFamily: tokens.fonts.body,
                    background: 'transparent',
                    border: `1px solid ${tokens.colors.glassMedium}`,
                    borderRadius: 10,
                    color: tokens.colors.silverMist,
                    cursor: 'pointer',
                  }}
                >
                  Zurück
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.make || !formData.model || !formData.year}
                  style={{
                    flex: 1,
                    padding: '14px 24px',
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: tokens.fonts.body,
                    background: (formData.make && formData.model && formData.year) 
                      ? tokens.colors.cyanGlow 
                      : tokens.colors.glassMedium,
                    color: (formData.make && formData.model && formData.year) 
                      ? tokens.colors.darkShowroom 
                      : tokens.colors.silverMist,
                    border: 'none',
                    borderRadius: 10,
                    cursor: (formData.make && formData.model && formData.year) ? 'pointer' : 'not-allowed',
                  }}
                >
                  Weiter
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3 style={{ fontSize: 16, color: tokens.colors.chromeWhite, marginBottom: 20 }}>
                Ihre Kontaktdaten
              </h3>

              <div style={{ display: 'grid', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12, color: tokens.colors.silverMist, display: 'block', marginBottom: 6 }}>
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Ihr Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={inputStyle}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, color: tokens.colors.silverMist, display: 'block', marginBottom: 6 }}>
                      Telefon
                    </label>
                    <input
                      type="tel"
                      placeholder="+49 151..."
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: tokens.colors.silverMist, display: 'block', marginBottom: 6 }}>
                      E-Mail
                    </label>
                    <input
                      type="email"
                      placeholder="ihre@email.de"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              <div style={{
                marginTop: 20,
                padding: 16,
                background: tokens.colors.glassLight,
                borderRadius: 12,
              }}>
                <p style={{ fontSize: 11, color: tokens.colors.silverMist, margin: 0 }}>
                  Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu. 
                  Wir verwenden Ihre Daten ausschließlich zur Bearbeitung Ihrer Anfrage.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button
                  onClick={() => setStep(2)}
                  style={{
                    padding: '14px 24px',
                    fontSize: 14,
                    fontFamily: tokens.fonts.body,
                    background: 'transparent',
                    border: `1px solid ${tokens.colors.glassMedium}`,
                    borderRadius: 10,
                    color: tokens.colors.silverMist,
                    cursor: 'pointer',
                  }}
                >
                  Zurück
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.phone}
                  style={{
                    flex: 1,
                    padding: '14px 24px',
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: tokens.fonts.body,
                    background: (formData.name && formData.phone) 
                      ? tokens.colors.successGreen 
                      : tokens.colors.glassMedium,
                    color: (formData.name && formData.phone) 
                      ? tokens.colors.chromeWhite 
                      : tokens.colors.silverMist,
                    border: 'none',
                    borderRadius: 10,
                    cursor: (formData.name && formData.phone) ? 'pointer' : 'not-allowed',
                  }}
                >
                  {isProcessing ? 'Bewertung läuft...' : 'Jetzt bewerten'}
                </button>
              </div>
            </>
          )}

          {step === 4 && valuation && (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 80,
                height: 80,
                margin: '0 auto 20px',
                borderRadius: '50%',
                background: tokens.colors.successGreen + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: tokens.colors.successGreen,
              }}>
                <Icons.Check size={40} />
              </div>

              <h3 style={{
                fontFamily: tokens.fonts.display,
                fontSize: 20,
                color: tokens.colors.chromeWhite,
                marginBottom: 8,
              }}>
                Ihre Fahrzeugbewertung
              </h3>
              <p style={{ fontSize: 13, color: tokens.colors.silverMist, marginBottom: 24 }}>
                {formData.year} {formData.make} {formData.model} • {parseInt(formData.km || 0).toLocaleString('de-DE')} km
              </p>

              <div style={{
                background: tokens.colors.premiumGold + '15',
                borderRadius: 16,
                padding: 24,
                marginBottom: 24,
                border: `1px solid ${tokens.colors.premiumGold}30`,
              }}>
                <p style={{ fontSize: 11, color: tokens.colors.premiumGold, textTransform: 'uppercase', letterSpacing: 2, margin: 0 }}>
                  Geschätzter Ankaufpreis
                </p>
                <p style={{
                  fontFamily: tokens.fonts.display,
                  fontSize: 40,
                  fontWeight: 700,
                  color: tokens.colors.chromeWhite,
                  margin: '8px 0',
                }}>
                  €{valuation.avg.toLocaleString('de-DE')}
                </p>
                <p style={{ fontSize: 12, color: tokens.colors.silverMist, margin: 0 }}>
                  Spanne: €{valuation.min.toLocaleString('de-DE')} – €{valuation.max.toLocaleString('de-DE')}
                </p>
              </div>

              <p style={{ fontSize: 13, color: tokens.colors.silverMist, marginBottom: 24 }}>
                Unser Team wird Sie innerhalb von 24 Stunden kontaktieren, 
                um Ihr Fahrzeug zu besichtigen und ein verbindliches Angebot zu erstellen.
              </p>

              <button
                onClick={onClose}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: tokens.fonts.body,
                  background: tokens.colors.cyanGlow,
                  color: tokens.colors.darkShowroom,
                  border: 'none',
                  borderRadius: 10,
                  cursor: 'pointer',
                }}
              >
                Verstanden
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN PLATFORM COMPONENT
// ============================================================================
const CarCompany24Platform = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Initialisiere...');
  const [activeView, setActiveView] = useState('home');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showFinancing, setShowFinancing] = useState(false);
  const [showTradeIn, setShowTradeIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filters, setFilters] = useState({
    make: 'all',
    priceMax: 100000,
    fuelType: 'all',
  });

  // Loading sequence
  useEffect(() => {
    const messages = [
      { msg: 'Initialisiere CarCompany24', progress: 15 },
      { msg: 'Verbinde mit Mobile.de API', progress: 35 },
      { msg: 'Lade Fahrzeugbestand', progress: 55 },
      { msg: 'Lade Finanzierungspartner', progress: 75 },
      { msg: 'Bereite Showroom vor', progress: 90 },
      { msg: 'Bereit', progress: 100 },
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setLoadingMessage(messages[i].msg);
        setLoadingProgress(messages[i].progress);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 400);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const filteredVehicles = vehicleInventory.filter(v => {
    if (filters.make !== 'all' && v.make !== filters.make) return false;
    if (v.price > filters.priceMax) return false;
    if (filters.fuelType !== 'all' && v.fuel !== filters.fuelType) return false;
    return true;
  });

  const featuredVehicles = vehicleInventory.filter(v => v.featured);

  if (isLoading) {
    return <LoadingScreen progress={loadingProgress} message={loadingMessage} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: tokens.colors.darkShowroom,
      fontFamily: tokens.fonts.body,
      color: tokens.colors.chromeWhite,
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '12px 24px',
        background: `${tokens.colors.darkShowroom}ee`,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${tokens.colors.glassLight}`,
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Logo variant="full" size="sm" />

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <div style={{ display: 'flex', gap: 24 }}>
              {[
                { id: 'home', label: 'Start' },
                { id: 'vehicles', label: 'Fahrzeuge' },
                { id: 'services', label: 'Leistungen' },
                { id: 'contact', label: 'Kontakt' },
              ].map(nav => (
                <button
                  key={nav.id}
                  onClick={() => setActiveView(nav.id)}
                  style={{
                    fontSize: 14,
                    fontFamily: tokens.fonts.body,
                    fontWeight: activeView === nav.id ? 600 : 400,
                    color: activeView === nav.id ? tokens.colors.cyberCyan : tokens.colors.silverMist,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {nav.label}
                </button>
              ))}
            </div>

            {/* Rating badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 12px',
              background: tokens.colors.glassLight,
              borderRadius: 8,
            }}>
              <div style={{ display: 'flex', color: tokens.colors.premiumGold }}>
                {[1,2,3,4,5].map(i => <Icons.Star key={i} size={14} filled />)}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{companyData.rating}</span>
              <span style={{ fontSize: 11, color: tokens.colors.silverMist }}>
                ({companyData.reviews})
              </span>
            </div>

            {/* WhatsApp CTA */}
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: tokens.fonts.body,
              background: tokens.colors.successGreen,
              color: tokens.colors.chromeWhite,
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
            }}>
              <Icons.WhatsApp size={18} />
              WhatsApp
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {activeView === 'home' && (
        <section style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: 80,
          overflow: 'hidden',
        }}>
          {/* Background with cyan glow */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 80% 50% at 70% 50%, ${tokens.colors.cyberCyan}15 0%, transparent 70%)`,
          }} />

          <div style={{
            position: 'relative',
            maxWidth: 1400,
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            alignItems: 'center',
          }}>
            {/* Left content */}
            <div>
              {/* Trust badges */}
              <div style={{
                display: 'flex',
                gap: 12,
                marginBottom: 24,
              }}>
                {[
                  { icon: Icons.Shield, text: '12 Mon. Garantie' },
                  { icon: Icons.TUV, text: 'TÜV geprüft' },
                  { icon: Icons.Handshake, text: 'Schufa-Finanzierung' },
                ].map((badge, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 12px',
                    background: tokens.colors.glassLight,
                    borderRadius: 6,
                    fontSize: 11,
                    color: tokens.colors.silverMist,
                  }}>
                    <badge.icon size={14} />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>

              <h1 style={{
                fontFamily: tokens.fonts.display,
                fontSize: 56,
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: 20,
              }}>
                Premium Gebrauchtwagen
                <br />
                <span style={{ color: tokens.colors.cyberCyan }}>mit Vertrauen</span>
              </h1>

              <p style={{
                fontSize: 18,
                color: tokens.colors.silverMist,
                lineHeight: 1.6,
                marginBottom: 32,
                maxWidth: 500,
              }}>
                Ihr zuverlässiger Partner in Göttingen für hochwertige Gebrauchtwagen. 
                Mit {companyData.rating} Sternen auf Mobile.de und flexibler Finanzierung – 
                auch bei negativer Schufa.
              </p>

              {/* CTA buttons */}
              <div style={{ display: 'flex', gap: 16, marginBottom: 40 }}>
                <button
                  onClick={() => setActiveView('vehicles')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '16px 32px',
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: tokens.fonts.body,
                    background: tokens.colors.cyanGlow,
                    color: tokens.colors.darkShowroom,
                    border: 'none',
                    borderRadius: 12,
                    cursor: 'pointer',
                  }}
                >
                  Fahrzeuge entdecken
                  <Icons.ArrowRight size={20} />
                </button>
                <button
                  onClick={() => setShowTradeIn(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '16px 32px',
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: tokens.fonts.body,
                    background: 'transparent',
                    color: tokens.colors.chromeWhite,
                    border: `2px solid ${tokens.colors.glassMedium}`,
                    borderRadius: 12,
                    cursor: 'pointer',
                  }}
                >
                  <Icons.Camera size={20} />
                  Fahrzeug verkaufen
                </button>
              </div>

              {/* Stats */}
              <div style={{
                display: 'flex',
                gap: 40,
              }}>
                {[
                  { value: '500+', label: 'Verkaufte Fahrzeuge' },
                  { value: '100%', label: 'Empfehlungsrate' },
                  { value: '24h', label: 'Finanzierungszusage' },
                ].map((stat, i) => (
                  <div key={i}>
                    <p style={{
                      fontFamily: tokens.fonts.display,
                      fontSize: 32,
                      fontWeight: 700,
                      color: tokens.colors.cyberCyan,
                      margin: 0,
                    }}>
                      {stat.value}
                    </p>
                    <p style={{
                      fontSize: 13,
                      color: tokens.colors.silverMist,
                      margin: '4px 0 0',
                    }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Featured vehicle */}
            <div style={{ position: 'relative' }}>
              {/* Glow effect */}
              <div style={{
                position: 'absolute',
                inset: -40,
                background: `radial-gradient(circle at center, ${tokens.colors.cyberCyan}20 0%, transparent 70%)`,
                filter: 'blur(40px)',
              }} />

              {/* Large car silhouette */}
              <div style={{
                position: 'relative',
                color: tokens.colors.cyberCyan,
                opacity: 0.8,
                textAlign: 'center',
              }}>
                <Icons.CarSilhouette size={400} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Vehicles Section */}
      {activeView === 'home' && (
        <section style={{
          padding: '80px 24px',
          background: tokens.colors.charcoalMetal,
        }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 40,
            }}>
              <div>
                <h2 style={{
                  fontFamily: tokens.fonts.display,
                  fontSize: 36,
                  fontWeight: 700,
                  marginBottom: 8,
                }}>
                  Aktuelle <span style={{ color: tokens.colors.cyberCyan }}>Highlights</span>
                </h2>
                <p style={{
                  fontSize: 16,
                  color: tokens.colors.silverMist,
                }}>
                  Handverlesene Qualitätsfahrzeuge mit Garantie
                </p>
              </div>
              <button
                onClick={() => setActiveView('vehicles')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: tokens.colors.cyberCyan,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Alle Fahrzeuge
                <Icons.ArrowRight size={18} />
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 24,
            }}>
              {featuredVehicles.map(vehicle => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelect={() => setSelectedVehicle(vehicle)}
                  onFinancing={() => { setSelectedVehicle(vehicle); setShowFinancing(true); }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Vehicles View */}
      {activeView === 'vehicles' && (
        <section style={{
          paddingTop: 100,
          minHeight: '100vh',
        }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ marginBottom: 40 }}>
              <h1 style={{
                fontFamily: tokens.fonts.display,
                fontSize: 36,
                fontWeight: 700,
                marginBottom: 16,
              }}>
                Unser Fahrzeugbestand
              </h1>

              {/* Filters */}
              <div style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
              }}>
                <select
                  value={filters.make}
                  onChange={(e) => setFilters({...filters, make: e.target.value})}
                  style={{
                    padding: '12px 16px',
                    fontSize: 14,
                    background: tokens.colors.glassLight,
                    border: `1px solid ${tokens.colors.glassMedium}`,
                    borderRadius: 8,
                    color: tokens.colors.chromeWhite,
                    cursor: 'pointer',
                  }}
                >
                  <option value="all">Alle Marken</option>
                  {[...new Set(vehicleInventory.map(v => v.make))].map(make => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>

                <select
                  value={filters.fuelType}
                  onChange={(e) => setFilters({...filters, fuelType: e.target.value})}
                  style={{
                    padding: '12px 16px',
                    fontSize: 14,
                    background: tokens.colors.glassLight,
                    border: `1px solid ${tokens.colors.glassMedium}`,
                    borderRadius: 8,
                    color: tokens.colors.chromeWhite,
                    cursor: 'pointer',
                  }}
                >
                  <option value="all">Alle Kraftstoffe</option>
                  <option value="Benzin">Benzin</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Elektro">Elektro</option>
                  <option value="Hybrid">Hybrid</option>
                </select>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '0 16px',
                  background: tokens.colors.glassLight,
                  border: `1px solid ${tokens.colors.glassMedium}`,
                  borderRadius: 8,
                }}>
                  <span style={{ fontSize: 13, color: tokens.colors.silverMist }}>Max Preis:</span>
                  <input
                    type="range"
                    min="10000"
                    max="100000"
                    step="5000"
                    value={filters.priceMax}
                    onChange={(e) => setFilters({...filters, priceMax: Number(e.target.value)})}
                    style={{ width: 120, accentColor: tokens.colors.cyberCyan }}
                  />
                  <span style={{ fontSize: 14, fontWeight: 600 }}>
                    €{filters.priceMax.toLocaleString('de-DE')}
                  </span>
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: 24,
              paddingBottom: 80,
            }}>
              {filteredVehicles.map(vehicle => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelect={() => setSelectedVehicle(vehicle)}
                  onFinancing={() => { setSelectedVehicle(vehicle); setShowFinancing(true); }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {activeView === 'home' && (
        <section style={{
          padding: '80px 24px',
          background: tokens.colors.darkShowroom,
        }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 60,
            }}>
              <div>
                <h2 style={{
                  fontFamily: tokens.fonts.display,
                  fontSize: 36,
                  fontWeight: 700,
                  marginBottom: 24,
                }}>
                  Besuchen Sie uns
                </h2>

                <div style={{ display: 'grid', gap: 20, marginBottom: 32 }}>
                  {[
                    { icon: Icons.Location, label: 'Adresse', value: `${companyData.address}, ${companyData.city}` },
                    { icon: Icons.Phone, label: 'Telefon', value: companyData.phone },
                    { icon: Icons.WhatsApp, label: 'WhatsApp', value: 'Jetzt chatten' },
                    { icon: Icons.Calendar, label: 'Öffnungszeiten', value: 'Mo-Fr: 9-18 Uhr | Sa: 10-14 Uhr' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                    }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: tokens.colors.glassLight,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: tokens.colors.cyberCyan,
                      }}>
                        <item.icon size={22} />
                      </div>
                      <div>
                        <p style={{ fontSize: 12, color: tokens.colors.silverMist, margin: 0 }}>
                          {item.label}
                        </p>
                        <p style={{ fontSize: 15, fontWeight: 500, margin: '2px 0 0' }}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reviews highlight */}
                <div style={{
                  padding: 24,
                  background: tokens.colors.glassLight,
                  borderRadius: 16,
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 16,
                  }}>
                    <div style={{ display: 'flex', color: tokens.colors.premiumGold }}>
                      {[1,2,3,4,5].map(i => <Icons.Star key={i} size={20} filled />)}
                    </div>
                    <span style={{ fontSize: 24, fontWeight: 700 }}>{companyData.rating}</span>
                    <span style={{ color: tokens.colors.silverMist }}>
                      / 5.0 • {companyData.reviews} Bewertungen
                    </span>
                  </div>
                  <p style={{
                    fontSize: 14,
                    color: tokens.colors.silverMist,
                    fontStyle: 'italic',
                    margin: 0,
                  }}>
                    "Super freundlich, kompetente Beratung und faire Preise. 
                    Fahrzeug wurde sogar kostenlos geliefert. Absolute Empfehlung!"
                  </p>
                  <p style={{
                    fontSize: 12,
                    color: tokens.colors.silverMist,
                    marginTop: 8,
                    opacity: 0.7,
                  }}>
                    — Mobile.de Kunde, verifizierter Kauf
                  </p>
                </div>
              </div>

              {/* Contact form */}
              <div style={{
                background: tokens.colors.charcoalMetal,
                borderRadius: 20,
                padding: 32,
                border: `1px solid ${tokens.colors.glassMedium}`,
              }}>
                <h3 style={{
                  fontFamily: tokens.fonts.display,
                  fontSize: 20,
                  marginBottom: 24,
                }}>
                  Schnellanfrage
                </h3>

                <form style={{ display: 'grid', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <input
                      type="text"
                      placeholder="Ihr Name"
                      style={{
                        padding: '14px 16px',
                        fontSize: 14,
                        background: tokens.colors.glassLight,
                        border: `1px solid ${tokens.colors.glassMedium}`,
                        borderRadius: 10,
                        color: tokens.colors.chromeWhite,
                        outline: 'none',
                      }}
                    />
                    <input
                      type="tel"
                      placeholder="Telefon"
                      style={{
                        padding: '14px 16px',
                        fontSize: 14,
                        background: tokens.colors.glassLight,
                        border: `1px solid ${tokens.colors.glassMedium}`,
                        borderRadius: 10,
                        color: tokens.colors.chromeWhite,
                        outline: 'none',
                      }}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="E-Mail"
                    style={{
                      padding: '14px 16px',
                      fontSize: 14,
                      background: tokens.colors.glassLight,
                      border: `1px solid ${tokens.colors.glassMedium}`,
                      borderRadius: 10,
                      color: tokens.colors.chromeWhite,
                      outline: 'none',
                    }}
                  />
                  <select
                    style={{
                      padding: '14px 16px',
                      fontSize: 14,
                      background: tokens.colors.glassLight,
                      border: `1px solid ${tokens.colors.glassMedium}`,
                      borderRadius: 10,
                      color: tokens.colors.chromeWhite,
                      cursor: 'pointer',
                    }}
                  >
                    <option value="">Interesse an...</option>
                    <option value="buy">Fahrzeug kaufen</option>
                    <option value="sell">Fahrzeug verkaufen</option>
                    <option value="finance">Finanzierung anfragen</option>
                    <option value="service">Service / Werkstatt</option>
                  </select>
                  <textarea
                    placeholder="Ihre Nachricht (optional)"
                    rows={4}
                    style={{
                      padding: '14px 16px',
                      fontSize: 14,
                      background: tokens.colors.glassLight,
                      border: `1px solid ${tokens.colors.glassMedium}`,
                      borderRadius: 10,
                      color: tokens.colors.chromeWhite,
                      outline: 'none',
                      resize: 'none',
                      fontFamily: tokens.fonts.body,
                    }}
                  />

                  <button
                    type="submit"
                    style={{
                      padding: '16px 32px',
                      fontSize: 16,
                      fontWeight: 600,
                      fontFamily: tokens.fonts.body,
                      background: tokens.colors.cyanGlow,
                      color: tokens.colors.darkShowroom,
                      border: 'none',
                      borderRadius: 12,
                      cursor: 'pointer',
                    }}
                  >
                    Nachricht senden
                  </button>

                  <p style={{
                    fontSize: 11,
                    color: tokens.colors.silverMist,
                    textAlign: 'center',
                    margin: 0,
                  }}>
                    Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{
        padding: '60px 24px 30px',
        background: tokens.colors.charcoalMetal,
        borderTop: `1px solid ${tokens.colors.glassLight}`,
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 40,
            marginBottom: 40,
          }}>
            <div>
              <Logo variant="full" size="md" />
              <p style={{
                fontSize: 13,
                color: tokens.colors.silverMist,
                marginTop: 16,
                lineHeight: 1.6,
              }}>
                Ihr vertrauenswürdiger Partner für Gebrauchtwagen in Göttingen und Umgebung. 
                Mit über {new Date().getFullYear() - companyData.founded} Jahren Erfahrung und erstklassigem Service.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Leistungen</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Fahrzeugverkauf', 'Finanzierung', 'Inzahlungnahme', 'Abschleppdienst', 'Fahrzeugaufbereitung'].map(item => (
                  <li key={item} style={{ marginBottom: 10 }}>
                    <a href="#" style={{ fontSize: 13, color: tokens.colors.silverMist, textDecoration: 'none' }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Rechtliches</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Impressum', 'Datenschutz', 'AGB', 'Widerrufsrecht'].map(item => (
                  <li key={item} style={{ marginBottom: 10 }}>
                    <a href="#" style={{ fontSize: 13, color: tokens.colors.silverMist, textDecoration: 'none' }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Kontakt</h4>
              <div style={{ fontSize: 13, color: tokens.colors.silverMist, lineHeight: 1.8 }}>
                <p style={{ margin: 0 }}>{companyData.name}</p>
                <p style={{ margin: 0 }}>{companyData.address}</p>
                <p style={{ margin: 0 }}>{companyData.city}</p>
                <p style={{ margin: '8px 0 0' }}>{companyData.phone}</p>
                <p style={{ margin: 0 }}>{companyData.email}</p>
              </div>
            </div>
          </div>

          {/* Legal info line */}
          <div style={{
            paddingTop: 24,
            borderTop: `1px solid ${tokens.colors.glassLight}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 11,
            color: tokens.colors.silverMist,
          }}>
            <div>
              © {new Date().getFullYear()} {companyData.name} | 
              {companyData.hrb}, {companyData.court} | 
              Geschäftsführer: {companyData.directors.join(', ')} | 
              USt-IdNr: {companyData.vatId}
            </div>
            <div style={{ opacity: 0.6 }}>
              Powered by VΞGΔ Foundation
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showFinancing && (
        <FinancingCalculator
          vehicle={selectedVehicle}
          onClose={() => setShowFinancing(false)}
        />
      )}

      {showTradeIn && (
        <TradeInTool onClose={() => setShowTradeIn(false)} />
      )}

      {/* Floating WhatsApp button */}
      <button
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: tokens.colors.successGreen,
          color: tokens.colors.chromeWhite,
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0, 200, 83, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 90,
        }}
      >
        <Icons.WhatsApp size={28} />
      </button>
    </div>
  );
};

export default CarCompany24Platform;
