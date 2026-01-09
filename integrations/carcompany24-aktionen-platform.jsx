import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// CARCOMPANY24 GMBH - PREMIUM AUTOMOTIVE PLATFORM
// MIT AKTIONS-SYSTEM & ALT-FÜR-NEU PROGRAMM
// ============================================================================

// Design Tokens
const tokens = {
  colors: {
    cyberCyan: '#00D4D4',
    deepCyan: '#00A8A8',
    tealAccent: '#0FB5BA',
    darkShowroom: '#0A0F14',
    charcoalMetal: '#1A1F25',
    gunmetal: '#2C3239',
    chromeWhite: '#E8EDF2',
    silverMist: '#9CA8B4',
    premiumGold: '#C9A962',
    successGreen: '#00C853',
    alertRed: '#FF3D57',
    warningOrange: '#FF9500',
    infoBlue: '#2196F3',
    glassLight: 'rgba(255,255,255,0.06)',
    glassMedium: 'rgba(255,255,255,0.10)',
    cyanGlow: 'linear-gradient(135deg, #00D4D4 0%, #0FB5BA 100%)',
    goldGlow: 'linear-gradient(135deg, #C9A962 0%, #E8D5A3 50%, #C9A962 100%)',
    redGlow: 'linear-gradient(135deg, #FF3D57 0%, #FF6B6B 100%)',
    orangeGlow: 'linear-gradient(135deg, #FF9500 0%, #FFB84D 100%)',
  },
  fonts: {
    display: "'Montserrat', -apple-system, sans-serif",
    body: "'Inter', -apple-system, sans-serif",
  },
  shadows: {
    cyan: '0 0 40px rgba(0, 212, 212, 0.3)',
    gold: '0 0 40px rgba(201, 169, 98, 0.3)',
    card: '0 8px 32px rgba(0, 0, 0, 0.4)',
  }
};

// Company Data
const companyData = {
  name: 'CarCompany24 GmbH',
  tagline: 'AUTOMOTIVE SERVICE',
  address: 'Adolf-Hoyer-Straße 12',
  city: '37079 Göttingen',
  phone: '+49 551 12345678',
  whatsapp: '+49 151 12345678',
  email: 'info@carcompany24-gmbh.de',
  rating: 4.9,
  reviews: 28,
};

// Enhanced Vehicle Inventory with Aktion Status
const vehicleInventory = [
  { 
    id: 'CC24-001', 
    make: 'BMW', 
    model: '320d Touring', 
    variant: 'M Sport',
    year: 2021, 
    price: 28900, 
    originalPrice: 31900,
    km: 87000, 
    fuel: 'Diesel',
    transmission: 'Automatik',
    power: '190 PS',
    color: 'Schwarz Metallic',
    firstReg: '03/2021',
    hu: '09/2025',
    co2: 118,
    consumption: '4.5 L/100km',
    effizienz: 'A',
    features: ['Navigation', 'LED', 'Tempomat', 'Parkassistent', 'Sitzheizung'],
    images: 8,
    // Aktion System
    daysListed: 45,
    isAktion: true,
    aktionType: 'langzeit', // länger inseriert
    aktionDiscount: 3000,
    altFuerNeuBonus: 1500, // Extra bei Inzahlungnahme
    financing: { rate: 349, term: 60, anzahlung: 5000 }
  },
  { 
    id: 'CC24-002', 
    make: 'Mercedes-Benz', 
    model: 'C 200', 
    variant: 'AMG Line',
    year: 2022, 
    price: 34500, 
    originalPrice: 34500,
    km: 45000, 
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: '204 PS',
    color: 'Iridiumsilber',
    firstReg: '06/2022',
    hu: '06/2026',
    co2: 155,
    consumption: '6.8 L/100km',
    effizienz: 'B',
    features: ['MBUX', 'LED Multibeam', '360° Kamera', 'Keyless Go'],
    images: 12,
    daysListed: 14,
    isAktion: false,
    isPremium: true, // Neueres Fahrzeug
    premiumFinancing: true, // 0% Finanzierung möglich
    altFuerNeuBonus: 2000,
    financing: { rate: 449, term: 60, anzahlung: 6000 }
  },
  { 
    id: 'CC24-003', 
    make: 'Volkswagen', 
    model: 'Golf 8', 
    variant: 'GTI',
    year: 2023, 
    price: 38900, 
    originalPrice: 38900,
    km: 22000, 
    fuel: 'Benzin',
    transmission: 'DSG',
    power: '245 PS',
    color: 'Tornado Rot',
    firstReg: '01/2023',
    hu: '01/2027',
    co2: 168,
    consumption: '7.4 L/100km',
    effizienz: 'C',
    features: ['Digital Cockpit Pro', 'IQ.Drive', 'Beats Sound', 'Matrix LED'],
    images: 10,
    daysListed: 7,
    isAktion: false,
    isPremium: true,
    premiumFinancing: true,
    altFuerNeuBonus: 2500,
    financing: { rate: 489, term: 60, anzahlung: 7000 }
  },
  { 
    id: 'CC24-004', 
    make: 'Audi', 
    model: 'A4 Avant', 
    variant: '40 TDI quattro',
    year: 2020, 
    price: 29900, 
    originalPrice: 34900,
    km: 98000, 
    fuel: 'Diesel',
    transmission: 'S tronic',
    power: '204 PS',
    color: 'Daytonagrau',
    firstReg: '09/2020',
    hu: '09/2024',
    co2: 128,
    consumption: '4.9 L/100km',
    effizienz: 'A',
    features: ['Virtual Cockpit', 'MMI Navigation Plus', 'Bang & Olufsen', 'Panorama'],
    images: 9,
    daysListed: 62,
    isAktion: true,
    aktionType: 'langzeit',
    aktionDiscount: 5000,
    altFuerNeuBonus: 2000,
    financing: { rate: 389, term: 60, anzahlung: 5000 }
  },
  { 
    id: 'CC24-005', 
    make: 'Porsche', 
    model: 'Macan', 
    variant: 'S',
    year: 2021, 
    price: 54900, 
    originalPrice: 58900,
    km: 42000, 
    fuel: 'Benzin',
    transmission: 'PDK',
    power: '380 PS',
    color: 'Schwarz',
    firstReg: '04/2021',
    hu: '04/2025',
    co2: 212,
    consumption: '9.4 L/100km',
    effizienz: 'D',
    features: ['Sport Chrono', 'PASM', 'Luftfederung', 'BOSE', '21" Turbo'],
    images: 15,
    daysListed: 35,
    isAktion: true,
    aktionType: 'premium_deal',
    aktionDiscount: 4000,
    altFuerNeuBonus: 3000,
    financing: { rate: 699, term: 60, anzahlung: 10000 }
  },
  { 
    id: 'CC24-006', 
    make: 'Seat', 
    model: 'Leon', 
    variant: '1.5 TSI FR',
    year: 2022, 
    price: 21900, 
    originalPrice: 26900,
    km: 55000, 
    fuel: 'Benzin',
    transmission: 'Manuell',
    power: '150 PS',
    color: 'Desire Rot',
    firstReg: '08/2022',
    hu: '08/2026',
    co2: 132,
    consumption: '5.8 L/100km',
    effizienz: 'A',
    features: ['Full Link', 'Virtual Cockpit', 'BeatsAudio', 'LED'],
    images: 6,
    daysListed: 78,
    isAktion: true,
    aktionType: 'super_deal', // Besonders lang inseriert
    aktionDiscount: 5000,
    altFuerNeuBonus: 1000,
    financing: { rate: 279, term: 60, anzahlung: 3000 }
  },
  { 
    id: 'CC24-007', 
    make: 'Opel', 
    model: 'Corsa-e', 
    variant: 'Elegance',
    year: 2023, 
    price: 28500, 
    originalPrice: 28500,
    km: 18000, 
    fuel: 'Elektro',
    transmission: 'Automatik',
    power: '136 PS',
    color: 'Quarz Silber',
    firstReg: '05/2023',
    hu: '05/2027',
    co2: 0,
    consumption: '16.1 kWh/100km',
    effizienz: 'A+',
    features: ['Navi Pro', 'Rückfahrkamera', 'LED Matrix', 'Wärmepumpe'],
    images: 8,
    daysListed: 21,
    isAktion: false,
    isPremium: true,
    isElektro: true,
    premiumFinancing: true,
    altFuerNeuBonus: 3000, // Höherer Bonus für E-Auto
    financing: { rate: 359, term: 60, anzahlung: 5000 }
  },
  { 
    id: 'CC24-008', 
    make: 'Skoda', 
    model: 'Octavia Combi', 
    variant: '2.0 TDI Style',
    year: 2021, 
    price: 23900, 
    originalPrice: 27900,
    km: 72000, 
    fuel: 'Diesel',
    transmission: 'DSG',
    power: '150 PS',
    color: 'Magnetic Braun',
    firstReg: '11/2021',
    hu: '11/2025',
    co2: 115,
    consumption: '4.4 L/100km',
    effizienz: 'A',
    features: ['Columbus Navi', 'Canton Sound', 'Kessy', 'Panorama'],
    images: 7,
    daysListed: 54,
    isAktion: true,
    aktionType: 'langzeit',
    aktionDiscount: 4000,
    altFuerNeuBonus: 1500,
    financing: { rate: 299, term: 60, anzahlung: 4000 }
  },
];

// Bank Partners
const bankPartners = [
  { id: 1, name: 'Santander Consumer Bank', rate: 4.99, maxAmount: 75000, logo: 'S' },
  { id: 2, name: 'Bank11 für Privatkunden', rate: 5.29, maxAmount: 100000, logo: 'B11' },
  { id: 3, name: 'CreditPlus Bank', rate: 5.49, maxAmount: 60000, logo: 'C+' },
  { id: 4, name: 'Targobank', rate: 5.79, maxAmount: 50000, logo: 'T' },
  { id: 5, name: 'SWK Bank', rate: 5.99, maxAmount: 80000, logo: 'SWK' },
];

// ============================================================================
// CUSTOM SVG ICONS
// ============================================================================
const Icons = {
  CarSilhouette: ({ size = 120 }) => (
    <svg width={size} height={size * 0.4} viewBox="0 0 120 48" fill="none">
      <path 
        d="M10 38 Q5 38 5 33 L5 30 Q5 28 7 28 L20 28 L35 18 Q40 14 50 14 L80 14 Q95 14 100 20 L110 28 Q115 28 115 32 L115 35 Q115 38 110 38 L100 38 Q100 44 92 44 Q84 44 84 38 L36 38 Q36 44 28 44 Q20 44 20 38 Z"
        stroke="currentColor" strokeWidth="2" fill="none"
      />
      <circle cx="28" cy="38" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="92" cy="38" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  ),
  
  Fire: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C12 2 8 6 8 10C8 12 9 14 12 14C15 14 16 12 16 10C16 6 12 2 12 2Z"/>
      <path d="M12 14C12 14 10 16 10 18C10 20 11 22 12 22C13 22 14 20 14 18C14 16 12 14 12 14Z"/>
    </svg>
  ),

  Tag: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 12L12 22L22 12L12 2Z"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),

  Percent: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="7" cy="7" r="3"/>
      <circle cx="17" cy="17" r="3"/>
      <path d="M5 19L19 5"/>
    </svg>
  ),

  Refresh: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12C3 7 7 3 12 3C17 3 21 7 21 12"/>
      <path d="M21 12C21 17 17 21 12 21C7 21 3 17 3 12"/>
      <path d="M16 3L21 3L21 8"/>
      <path d="M8 21L3 21L3 16"/>
    </svg>
  ),

  Star: ({ size = 24, filled = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M12 2L15 9L22 9L16 14L18 21L12 17L6 21L8 14L2 9L9 9Z"/>
    </svg>
  ),

  Shield: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L20 6L20 12Q20 18 12 22Q4 18 4 12L4 6Z"/>
      <path d="M8 12L11 15L16 9"/>
    </svg>
  ),

  Euro: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 5Q12 2 8 5Q4 8 4 12Q4 16 8 19Q12 22 17 19"/>
      <path d="M3 10L12 10"/>
      <path d="M3 14L12 14"/>
    </svg>
  ),

  Calendar: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <path d="M3 9L21 9"/>
      <path d="M8 2L8 6"/>
      <path d="M16 2L16 6"/>
    </svg>
  ),

  Fuel: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="12" height="16" rx="1"/>
      <path d="M15 10L18 10Q20 10 20 12L20 18Q20 20 18 20"/>
      <rect x="5" y="6" width="8" height="5" rx="0.5"/>
    </svg>
  ),

  Odometer: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22C6 22 2 17 2 12C2 7 6 2 12 2C18 2 22 7 22 12"/>
      <path d="M12 6L12 12L16 14"/>
    </svg>
  ),

  Gearbox: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="6" cy="6" r="2"/>
      <circle cx="12" cy="6" r="2"/>
      <circle cx="18" cy="6" r="2"/>
      <circle cx="6" cy="18" r="2"/>
      <circle cx="18" cy="18" r="2"/>
      <path d="M6 8L6 16"/>
      <path d="M12 8L12 12L18 12L18 16"/>
    </svg>
  ),

  Phone: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 4L9 4L11 9L8 11Q10 15 14 17L16 14L21 16L21 20Q21 22 19 22Q6 21 3 8Q2 4 5 4"/>
    </svg>
  ),

  WhatsApp: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C10 22 8 21.5 6.5 20.5L2 22L3.5 17.5C2.5 16 2 14 2 12C2 6.5 6.5 2 12 2Z"/>
      <path d="M8 10C8 9 9 8 10 8C11 8 12 9 12 10L12 11C12 12 11 13 10 13"/>
      <path d="M14 10C14 9 15 8 16 8"/>
    </svg>
  ),

  Location: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2Q18 2 18 9Q18 14 12 22Q6 14 6 9Q6 2 12 2"/>
      <circle cx="12" cy="9" r="3"/>
    </svg>
  ),

  Check: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M4 12L9 17L20 6"/>
    </svg>
  ),

  Close: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6L18 18"/>
      <path d="M18 6L6 18"/>
    </svg>
  ),

  ArrowRight: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 12L20 12"/>
      <path d="M14 6L20 12L14 18"/>
    </svg>
  ),

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

  Camera: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="6" width="20" height="14" rx="2"/>
      <circle cx="12" cy="13" r="4"/>
      <path d="M7 6L9 3L15 3L17 6"/>
    </svg>
  ),

  Upload: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 16L12 4"/>
      <path d="M7 9L12 4L17 9"/>
      <path d="M4 14L4 20L20 20L20 14"/>
    </svg>
  ),

  Clock: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6L12 12L16 14"/>
    </svg>
  ),

  Gift: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="8" width="18" height="14" rx="1"/>
      <path d="M12 8L12 22"/>
      <path d="M3 12L21 12"/>
      <path d="M7 8C7 5 9 4 12 4C9 4 7 3 7 1"/>
      <path d="M17 8C17 5 15 4 12 4C15 4 17 3 17 1"/>
    </svg>
  ),

  Leaf: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 21Q6 12 12 6Q18 6 21 3"/>
      <path d="M6 21Q12 18 21 3"/>
    </svg>
  ),

  TUV: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M7 8L17 8"/>
      <path d="M12 8L12 16"/>
      <path d="M8 16L16 16"/>
    </svg>
  ),

  View360: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <ellipse cx="12" cy="12" rx="4" ry="10"/>
      <path d="M2 12L22 12"/>
    </svg>
  ),

  Handshake: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 11L6 7L10 10L14 7L18 10"/>
      <path d="M6 7L2 11L6 15"/>
      <path d="M18 10L22 14L18 18"/>
      <path d="M6 15L12 18L18 15"/>
    </svg>
  ),

  Sparkle: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8Z"/>
      <path d="M19 14L20 16L22 17L20 18L19 20L18 18L16 17L18 16Z" opacity="0.6"/>
    </svg>
  ),
};

// ============================================================================
// SVG LOGO
// ============================================================================
const Logo = ({ size = 'md' }) => {
  const sizes = { sm: { w: 160, h: 55 }, md: { w: 200, h: 70 }, lg: { w: 280, h: 100 } };
  const { w, h } = sizes[size];
  
  return (
    <svg width={w} height={h} viewBox="0 0 200 70" fill="none">
      <path 
        d="M10 45 Q5 45 5 40 L5 36 Q5 34 7 34 L22 34 L40 22 Q46 17 58 17 L105 17 Q125 17 132 24 L148 34 Q153 34 153 38 L153 42 Q153 45 148 45 L136 45 Q136 52 126 52 Q116 52 116 45 L44 45 Q44 52 34 52 Q24 52 24 45 Z"
        fill="none" stroke="url(#logoGrad)" strokeWidth="2.5"
      />
      <circle cx="34" cy="45" r="6" fill="none" stroke="url(#logoGrad)" strokeWidth="2"/>
      <circle cx="126" cy="45" r="6" fill="none" stroke="url(#logoGrad)" strokeWidth="2"/>
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={tokens.colors.silverMist}/>
          <stop offset="50%" stopColor={tokens.colors.chromeWhite}/>
          <stop offset="100%" stopColor={tokens.colors.silverMist}/>
        </linearGradient>
      </defs>
      <text x="10" y="68" fontFamily={tokens.fonts.display} fontSize="18" fontWeight="600" fill={tokens.colors.chromeWhite}>
        Car<tspan fill={tokens.colors.cyberCyan}>Company</tspan>24
      </text>
      <text x="155" y="68" fontFamily={tokens.fonts.display} fontSize="10" fontWeight="500" fill={tokens.colors.silverMist}>GmbH</text>
    </svg>
  );
};

// ============================================================================
// LOADING SCREEN
// ============================================================================
const LoadingScreen = ({ progress, message }) => (
  <div style={{
    position: 'fixed', inset: 0,
    background: tokens.colors.darkShowroom,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    zIndex: 9999,
  }}>
    <div style={{ color: tokens.colors.cyberCyan, marginBottom: 30, animation: 'pulse 2s infinite' }}>
      <Icons.CarSilhouette size={100} />
    </div>
    <h1 style={{ fontFamily: tokens.fonts.display, fontSize: 28, color: tokens.colors.chromeWhite, margin: 0 }}>
      Car<span style={{ color: tokens.colors.cyberCyan }}>Company</span>24
    </h1>
    <div style={{ width: 200, height: 3, background: tokens.colors.glassLight, borderRadius: 2, marginTop: 30 }}>
      <div style={{ width: `${progress}%`, height: '100%', background: tokens.colors.cyanGlow, borderRadius: 2, transition: 'width 0.3s' }}/>
    </div>
    <p style={{ fontSize: 13, color: tokens.colors.silverMist, marginTop: 16 }}>{message}</p>
    <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }`}</style>
  </div>
);

// ============================================================================
// AKTION BADGE COMPONENT
// ============================================================================
const AktionBadge = ({ type, discount, days }) => {
  const configs = {
    super_deal: {
      bg: tokens.colors.redGlow,
      icon: Icons.Fire,
      text: 'SUPER DEAL',
      subtext: `-€${discount.toLocaleString('de-DE')}`,
    },
    langzeit: {
      bg: tokens.colors.orangeGlow,
      icon: Icons.Percent,
      text: 'AKTION',
      subtext: `-€${discount.toLocaleString('de-DE')}`,
    },
    premium_deal: {
      bg: tokens.colors.goldGlow,
      icon: Icons.Sparkle,
      text: 'PREMIUM DEAL',
      subtext: `-€${discount.toLocaleString('de-DE')}`,
    },
  };
  
  const config = configs[type] || configs.langzeit;
  
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '6px 12px',
      background: config.bg,
      borderRadius: 6,
      color: '#fff',
      fontWeight: 700,
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    }}>
      <config.icon size={14} />
      <span>{config.text}</span>
      <span style={{ 
        marginLeft: 4, 
        padding: '2px 6px', 
        background: 'rgba(0,0,0,0.2)', 
        borderRadius: 4,
        fontSize: 10,
      }}>
        {config.subtext}
      </span>
    </div>
  );
};

// ============================================================================
// VEHICLE CARD WITH AKTION SYSTEM
// ============================================================================
const VehicleCard = ({ vehicle, onInquiry, onFinancing, onAltFuerNeu }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasDiscount = vehicle.originalPrice > vehicle.price;
  const discountPercent = hasDiscount ? Math.round((1 - vehicle.price / vehicle.originalPrice) * 100) : 0;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: tokens.colors.charcoalMetal,
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: isHovered ? tokens.shadows.cyan : tokens.shadows.card,
        border: `1px solid ${isHovered ? tokens.colors.cyberCyan + '50' : 'transparent'}`,
        position: 'relative',
      }}
    >
      {/* Image Area */}
      <div style={{
        position: 'relative',
        height: 180,
        background: `linear-gradient(135deg, ${tokens.colors.darkShowroom}, ${tokens.colors.gunmetal})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Badges Container */}
        <div style={{
          position: 'absolute', top: 12, left: 12, right: 12,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {vehicle.isAktion && (
              <AktionBadge type={vehicle.aktionType} discount={vehicle.aktionDiscount} days={vehicle.daysListed} />
            )}
            {vehicle.isPremium && !vehicle.isAktion && (
              <span style={{
                padding: '6px 12px',
                background: tokens.colors.goldGlow,
                borderRadius: 6,
                color: tokens.colors.darkShowroom,
                fontWeight: 700, fontSize: 11,
                textTransform: 'uppercase',
              }}>
                <Icons.Sparkle size={12} /> PREMIUM
              </span>
            )}
            {vehicle.isElektro && (
              <span style={{
                padding: '4px 10px',
                background: tokens.colors.successGreen + '30',
                borderRadius: 4,
                color: tokens.colors.successGreen,
                fontWeight: 600, fontSize: 10,
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <Icons.Leaf size={12} /> E-AUTO
              </span>
            )}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
            <span style={{
              padding: '4px 10px',
              background: tokens.colors.glassMedium,
              borderRadius: 20,
              color: tokens.colors.chromeWhite,
              fontSize: 11, fontWeight: 500,
              backdropFilter: 'blur(10px)',
            }}>
              {vehicle.images} Fotos
            </span>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: tokens.colors.glassMedium,
              backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: tokens.colors.cyberCyan,
            }}>
              <Icons.View360 size={18} />
            </div>
          </div>
        </div>

        {/* Car Icon */}
        <div style={{ color: tokens.colors.gunmetal, opacity: 0.4 }}>
          <Icons.CarSilhouette size={140} />
        </div>

        {/* Days Listed Indicator */}
        {vehicle.daysListed > 30 && (
          <div style={{
            position: 'absolute', bottom: 12, left: 12,
            padding: '4px 10px',
            background: tokens.colors.warningOrange + '20',
            borderRadius: 4,
            color: tokens.colors.warningOrange,
            fontSize: 10, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <Icons.Clock size={12} />
            {vehicle.daysListed} Tage inseriert
          </div>
        )}

        {/* HU Badge */}
        <div style={{
          position: 'absolute', bottom: 12, right: 12,
          padding: '4px 10px',
          background: tokens.colors.successGreen + '20',
          borderRadius: 4,
          color: tokens.colors.successGreen,
          fontSize: 11, fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <Icons.TUV size={14} />
          HU {vehicle.hu}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 20 }}>
        {/* Header */}
        <div style={{ marginBottom: 12 }}>
          <p style={{
            fontSize: 11, fontWeight: 700, color: tokens.colors.cyberCyan,
            textTransform: 'uppercase', letterSpacing: 1, margin: 0,
          }}>
            {vehicle.make}
          </p>
          <h3 style={{
            fontFamily: tokens.fonts.display, fontSize: 18, fontWeight: 600,
            color: tokens.colors.chromeWhite, margin: '4px 0 0',
          }}>
            {vehicle.model} {vehicle.variant}
          </h3>
        </div>

        {/* Specs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          {[
            { icon: Icons.Calendar, value: vehicle.year },
            { icon: Icons.Odometer, value: `${(vehicle.km / 1000).toFixed(0)}T km` },
            { icon: Icons.Fuel, value: vehicle.fuel },
            { icon: Icons.Gearbox, value: vehicle.transmission.slice(0, 5) },
          ].map((spec, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 4,
              color: tokens.colors.silverMist, fontSize: 12,
            }}>
              <spec.icon size={14} />
              <span>{spec.value}</span>
            </div>
          ))}
        </div>

        {/* EnVKV Data */}
        <div style={{
          display: 'flex', gap: 8, marginBottom: 16,
          padding: '8px 12px', background: tokens.colors.glassLight, borderRadius: 8,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 4,
            background: vehicle.effizienz === 'A+' ? tokens.colors.successGreen 
              : vehicle.effizienz === 'A' ? '#4CAF50' 
              : vehicle.effizienz === 'B' ? '#8BC34A'
              : vehicle.effizienz === 'C' ? '#FFC107' : '#FF9800',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: vehicle.effizienz === 'A+' ? 11 : 16,
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

        {/* Alt für Neu Bonus */}
        {vehicle.altFuerNeuBonus > 0 && (
          <div 
            onClick={(e) => { e.stopPropagation(); onAltFuerNeu(vehicle); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px', marginBottom: 16,
              background: `linear-gradient(135deg, ${tokens.colors.premiumGold}15, ${tokens.colors.premiumGold}05)`,
              border: `1px solid ${tokens.colors.premiumGold}30`,
              borderRadius: 10,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: tokens.colors.premiumGold + '20',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: tokens.colors.premiumGold,
            }}>
              <Icons.Refresh size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: tokens.colors.premiumGold, margin: 0 }}>
                Alt für Neu Bonus
              </p>
              <p style={{ fontSize: 10, color: tokens.colors.silverMist, margin: '2px 0 0' }}>
                Bis zu €{vehicle.altFuerNeuBonus.toLocaleString('de-DE')} bei Inzahlungnahme
              </p>
            </div>
            <Icons.ArrowRight size={16} />
          </div>
        )}

        {/* Price Section */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          paddingTop: 12, borderTop: `1px solid ${tokens.colors.glassLight}`,
        }}>
          <div>
            {hasDiscount && (
              <p style={{
                fontSize: 14, color: tokens.colors.alertRed,
                textDecoration: 'line-through', margin: 0, opacity: 0.7,
              }}>
                €{vehicle.originalPrice.toLocaleString('de-DE')}
              </p>
            )}
            <p style={{
              fontFamily: tokens.fonts.display, fontSize: 26, fontWeight: 700,
              color: hasDiscount ? tokens.colors.successGreen : tokens.colors.chromeWhite,
              margin: '2px 0 0',
            }}>
              €{vehicle.price.toLocaleString('de-DE')}
              {hasDiscount && (
                <span style={{
                  marginLeft: 8, fontSize: 12, padding: '2px 6px',
                  background: tokens.colors.successGreen + '20',
                  borderRadius: 4, color: tokens.colors.successGreen,
                }}>
                  -{discountPercent}%
                </span>
              )}
            </p>
            <p style={{ fontSize: 11, color: tokens.colors.silverMist, margin: '2px 0 0' }}>
              inkl. MwSt.
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 12, color: tokens.colors.cyberCyan, margin: 0, fontWeight: 600 }}>
              ab €{vehicle.financing.rate}/Mo
            </p>
            <p style={{ fontSize: 10, color: tokens.colors.silverMist, margin: '2px 0 0' }}>
              {vehicle.financing.term} Mon.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
          <button
            onClick={(e) => { e.stopPropagation(); onInquiry(vehicle); }}
            style={{
              padding: '12px 16px', fontSize: 13, fontWeight: 600,
              fontFamily: tokens.fonts.body,
              background: tokens.colors.cyanGlow,
              color: tokens.colors.darkShowroom,
              border: 'none', borderRadius: 8, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            <Icons.Phone size={16} />
            Anfragen
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onFinancing(vehicle); }}
            style={{
              padding: '12px 16px', fontSize: 13, fontWeight: 600,
              fontFamily: tokens.fonts.body,
              background: 'transparent',
              color: tokens.colors.chromeWhite,
              border: `1px solid ${tokens.colors.glassMedium}`,
              borderRadius: 8, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            <Icons.Calculator size={16} />
            Finanzieren
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// VEHICLE INQUIRY MODAL
// ============================================================================
const InquiryModal = ({ vehicle, onClose }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: `Ich interessiere mich für Ihren ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.id}).`,
    probefahrt: false, finanzierung: false, inzahlungnahme: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%', padding: '14px 16px', fontSize: 14,
    fontFamily: tokens.fonts.body,
    background: tokens.colors.glassLight,
    border: `1px solid ${tokens.colors.glassMedium}`,
    borderRadius: 10,
    color: tokens.colors.chromeWhite,
    outline: 'none',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: 20,
    }}>
      <div style={{
        background: tokens.colors.charcoalMetal,
        borderRadius: 20, maxWidth: 500, width: '100%',
        maxHeight: '90vh', overflow: 'auto',
        border: `1px solid ${tokens.colors.glassMedium}`,
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: 24, borderBottom: `1px solid ${tokens.colors.glassLight}`,
        }}>
          <div>
            <h2 style={{ fontFamily: tokens.fonts.display, fontSize: 20, color: tokens.colors.chromeWhite, margin: 0 }}>
              Fahrzeug anfragen
            </h2>
            <p style={{ fontSize: 13, color: tokens.colors.cyberCyan, margin: '4px 0 0' }}>
              {vehicle.year} {vehicle.make} {vehicle.model} • €{vehicle.price.toLocaleString('de-DE')}
            </p>
          </div>
          <button onClick={onClose} style={{
            width: 40, height: 40, borderRadius: '50%',
            background: tokens.colors.glassLight, border: 'none',
            color: tokens.colors.chromeWhite, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icons.Close size={20} />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ padding: 24 }}>
            <div style={{ display: 'grid', gap: 16 }}>
              <input
                type="text" placeholder="Ihr Name *" required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={inputStyle}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <input
                  type="email" placeholder="E-Mail *" required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={inputStyle}
                />
                <input
                  type="tel" placeholder="Telefon *" required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={inputStyle}
                />
              </div>
              <textarea
                placeholder="Ihre Nachricht"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                style={{...inputStyle, resize: 'none'}}
              />

              {/* Interest checkboxes */}
              <div style={{
                padding: 16, background: tokens.colors.glassLight, borderRadius: 12,
              }}>
                <p style={{ fontSize: 13, color: tokens.colors.silverMist, margin: '0 0 12px' }}>
                  Ich interessiere mich für:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {[
                    { key: 'probefahrt', label: 'Probefahrt', icon: Icons.CarSilhouette },
                    { key: 'finanzierung', label: 'Finanzierung', icon: Icons.Calculator },
                    { key: 'inzahlungnahme', label: 'Inzahlungnahme', icon: Icons.Refresh },
                  ].map(opt => (
                    <label key={opt.key} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '8px 14px', borderRadius: 8,
                      background: formData[opt.key] ? tokens.colors.cyberCyan + '20' : 'transparent',
                      border: `1px solid ${formData[opt.key] ? tokens.colors.cyberCyan : tokens.colors.glassMedium}`,
                      cursor: 'pointer', fontSize: 13,
                      color: formData[opt.key] ? tokens.colors.cyberCyan : tokens.colors.silverMist,
                    }}>
                      <input
                        type="checkbox"
                        checked={formData[opt.key]}
                        onChange={(e) => setFormData({...formData, [opt.key]: e.target.checked})}
                        style={{ display: 'none' }}
                      />
                      {formData[opt.key] ? <Icons.Check size={14} /> : <opt.icon size={14} />}
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Alt für Neu hint */}
              {vehicle.altFuerNeuBonus > 0 && (
                <div style={{
                  padding: 16, borderRadius: 12,
                  background: `linear-gradient(135deg, ${tokens.colors.premiumGold}15, ${tokens.colors.premiumGold}05)`,
                  border: `1px solid ${tokens.colors.premiumGold}30`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Icons.Gift size={24} />
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: tokens.colors.premiumGold, margin: 0 }}>
                        Alt für Neu Bonus: €{vehicle.altFuerNeuBonus.toLocaleString('de-DE')}
                      </p>
                      <p style={{ fontSize: 11, color: tokens.colors.silverMist, margin: '4px 0 0' }}>
                        Geben Sie Ihr altes Fahrzeug in Zahlung und erhalten Sie zusätzlichen Rabatt!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button type="submit" style={{
                padding: '16px 24px', fontSize: 16, fontWeight: 600,
                fontFamily: tokens.fonts.body,
                background: tokens.colors.cyanGlow,
                color: tokens.colors.darkShowroom,
                border: 'none', borderRadius: 12, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <Icons.Phone size={20} />
                Anfrage senden
              </button>
            </div>
          </form>
        ) : (
          <div style={{ padding: 40, textAlign: 'center' }}>
            <div style={{
              width: 80, height: 80, margin: '0 auto 20px', borderRadius: '50%',
              background: tokens.colors.successGreen + '20',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: tokens.colors.successGreen,
            }}>
              <Icons.Check size={40} />
            </div>
            <h3 style={{ fontFamily: tokens.fonts.display, fontSize: 22, color: tokens.colors.chromeWhite, marginBottom: 12 }}>
              Anfrage gesendet!
            </h3>
            <p style={{ fontSize: 14, color: tokens.colors.silverMist, marginBottom: 24 }}>
              Wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>
            <button onClick={onClose} style={{
              padding: '14px 32px', fontSize: 15, fontWeight: 600,
              fontFamily: tokens.fonts.body,
              background: tokens.colors.glassLight,
              color: tokens.colors.chromeWhite,
              border: 'none', borderRadius: 10, cursor: 'pointer',
            }}>
              Schließen
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// ALT FÜR NEU MODAL
// ============================================================================
const AltFuerNeuModal = ({ vehicle, onClose }) => {
  const [step, setStep] = useState(1);
  const [altFahrzeug, setAltFahrzeug] = useState({
    make: '', model: '', year: '', km: '',
  });
  const [bewertung, setBewertung] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateValue = async () => {
    setIsCalculating(true);
    await new Promise(r => setTimeout(r, 2000));
    
    const baseValue = Math.random() * 10000 + 3000;
    const yearFactor = (parseInt(altFahrzeug.year) - 2010) / 15;
    const kmFactor = 1 - (parseInt(altFahrzeug.km) || 100000) / 350000;
    const value = Math.round(baseValue * (1 + yearFactor) * kmFactor);
    
    setBewertung({
      value,
      bonus: vehicle.altFuerNeuBonus,
      total: value + vehicle.altFuerNeuBonus,
      newPrice: vehicle.price - value - vehicle.altFuerNeuBonus,
    });
    setIsCalculating(false);
    setStep(2);
  };

  const inputStyle = {
    width: '100%', padding: '14px 16px', fontSize: 14,
    fontFamily: tokens.fonts.body,
    background: tokens.colors.glassLight,
    border: `1px solid ${tokens.colors.glassMedium}`,
    borderRadius: 10,
    color: tokens.colors.chromeWhite,
    outline: 'none',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: 20,
    }}>
      <div style={{
        background: tokens.colors.charcoalMetal,
        borderRadius: 20, maxWidth: 560, width: '100%',
        maxHeight: '90vh', overflow: 'auto',
        border: `1px solid ${tokens.colors.premiumGold}30`,
      }}>
        {/* Header */}
        <div style={{
          padding: 24, borderBottom: `1px solid ${tokens.colors.glassLight}`,
          background: `linear-gradient(135deg, ${tokens.colors.premiumGold}10, transparent)`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 12px', borderRadius: 6,
                background: tokens.colors.premiumGold + '20',
                color: tokens.colors.premiumGold,
                fontSize: 12, fontWeight: 700, marginBottom: 12,
              }}>
                <Icons.Refresh size={14} />
                ALT FÜR NEU AKTION
              </div>
              <h2 style={{ fontFamily: tokens.fonts.display, fontSize: 22, color: tokens.colors.chromeWhite, margin: 0 }}>
                Ihr altes Fahrzeug in Zahlung geben
              </h2>
              <p style={{ fontSize: 13, color: tokens.colors.silverMist, margin: '8px 0 0' }}>
                Für: {vehicle.year} {vehicle.make} {vehicle.model} • €{vehicle.price.toLocaleString('de-DE')}
              </p>
            </div>
            <button onClick={onClose} style={{
              width: 40, height: 40, borderRadius: '50%',
              background: tokens.colors.glassLight, border: 'none',
              color: tokens.colors.chromeWhite, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icons.Close size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 24 }}>
          {step === 1 && (
            <>
              <h3 style={{ fontSize: 16, color: tokens.colors.chromeWhite, marginBottom: 20 }}>
                Daten Ihres aktuellen Fahrzeugs
              </h3>

              <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, color: tokens.colors.silverMist, marginBottom: 6, display: 'block' }}>
                      Marke
                    </label>
                    <select
                      value={altFahrzeug.make}
                      onChange={(e) => setAltFahrzeug({...altFahrzeug, make: e.target.value})}
                      style={inputStyle}
                    >
                      <option value="">Auswählen</option>
                      {['Audi', 'BMW', 'Ford', 'Mercedes-Benz', 'Opel', 'Seat', 'Skoda', 'Volkswagen', 'Andere'].map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: tokens.colors.silverMist, marginBottom: 6, display: 'block' }}>
                      Modell
                    </label>
                    <input
                      type="text" placeholder="z.B. Golf, A4, 3er"
                      value={altFahrzeug.model}
                      onChange={(e) => setAltFahrzeug({...altFahrzeug, model: e.target.value})}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, color: tokens.colors.silverMist, marginBottom: 6, display: 'block' }}>
                      Erstzulassung
                    </label>
                    <select
                      value={altFahrzeug.year}
                      onChange={(e) => setAltFahrzeug({...altFahrzeug, year: e.target.value})}
                      style={inputStyle}
                    >
                      <option value="">Jahr</option>
                      {Array.from({length: 20}, (_, i) => 2024 - i).map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: tokens.colors.silverMist, marginBottom: 6, display: 'block' }}>
                      Kilometerstand
                    </label>
                    <input
                      type="number" placeholder="z.B. 120000"
                      value={altFahrzeug.km}
                      onChange={(e) => setAltFahrzeug({...altFahrzeug, km: e.target.value})}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Bonus highlight */}
              <div style={{
                padding: 20, borderRadius: 12,
                background: `linear-gradient(135deg, ${tokens.colors.premiumGold}15, ${tokens.colors.premiumGold}05)`,
                border: `1px solid ${tokens.colors.premiumGold}30`,
                marginBottom: 24,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: 12,
                    background: tokens.colors.premiumGold + '20',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: tokens.colors.premiumGold,
                  }}>
                    <Icons.Gift size={30} />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: tokens.colors.chromeWhite, margin: 0 }}>
                      Ihr Bonus bei diesem Fahrzeug
                    </p>
                    <p style={{
                      fontFamily: tokens.fonts.display, fontSize: 28, fontWeight: 700,
                      color: tokens.colors.premiumGold, margin: '4px 0 0',
                    }}>
                      +€{vehicle.altFuerNeuBonus.toLocaleString('de-DE')}
                    </p>
                    <p style={{ fontSize: 11, color: tokens.colors.silverMist, margin: '4px 0 0' }}>
                      Zusätzlich zum Ankaufswert Ihres Fahrzeugs
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={calculateValue}
                disabled={!altFahrzeug.make || !altFahrzeug.model || !altFahrzeug.year || isCalculating}
                style={{
                  width: '100%', padding: '16px 24px', fontSize: 16, fontWeight: 600,
                  fontFamily: tokens.fonts.body,
                  background: (altFahrzeug.make && altFahrzeug.model && altFahrzeug.year) 
                    ? tokens.colors.goldGlow 
                    : tokens.colors.glassMedium,
                  color: (altFahrzeug.make && altFahrzeug.model && altFahrzeug.year)
                    ? tokens.colors.darkShowroom 
                    : tokens.colors.silverMist,
                  border: 'none', borderRadius: 12, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                {isCalculating ? (
                  <>Berechne...</>
                ) : (
                  <>
                    <Icons.Calculator size={20} />
                    Wert berechnen
                  </>
                )}
              </button>
            </>
          )}

          {step === 2 && bewertung && (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 80, height: 80, margin: '0 auto 20px', borderRadius: '50%',
                background: tokens.colors.successGreen + '20',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: tokens.colors.successGreen,
              }}>
                <Icons.Check size={40} />
              </div>

              <h3 style={{ fontSize: 20, color: tokens.colors.chromeWhite, marginBottom: 24 }}>
                Ihre Alt-für-Neu Kalkulation
              </h3>

              {/* Calculation breakdown */}
              <div style={{
                background: tokens.colors.glassLight, borderRadius: 16, padding: 24,
                textAlign: 'left', marginBottom: 24,
              }}>
                <div style={{ display: 'grid', gap: 16 }}>
                  {/* Current vehicle */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    paddingBottom: 16, borderBottom: `1px solid ${tokens.colors.glassMedium}`,
                  }}>
                    <div>
                      <p style={{ fontSize: 11, color: tokens.colors.silverMist, margin: 0 }}>Ihr Wunschfahrzeug</p>
                      <p style={{ fontSize: 14, fontWeight: 600, color: tokens.colors.chromeWhite, margin: '4px 0 0' }}>
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </p>
                    </div>
                    <p style={{ fontSize: 18, fontWeight: 700, color: tokens.colors.chromeWhite }}>
                      €{vehicle.price.toLocaleString('de-DE')}
                    </p>
                  </div>

                  {/* Old vehicle value */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: 11, color: tokens.colors.silverMist, margin: 0 }}>Ihr Fahrzeug (geschätzt)</p>
                      <p style={{ fontSize: 14, fontWeight: 500, color: tokens.colors.chromeWhite, margin: '4px 0 0' }}>
                        {altFahrzeug.year} {altFahrzeug.make} {altFahrzeug.model}
                      </p>
                    </div>
                    <p style={{ fontSize: 16, fontWeight: 600, color: tokens.colors.successGreen }}>
                      -€{bewertung.value.toLocaleString('de-DE')}
                    </p>
                  </div>

                  {/* Bonus */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: 11, color: tokens.colors.premiumGold, margin: 0 }}>Alt-für-Neu Bonus</p>
                      <p style={{ fontSize: 14, fontWeight: 500, color: tokens.colors.chromeWhite, margin: '4px 0 0' }}>
                        Zusätzlicher Rabatt
                      </p>
                    </div>
                    <p style={{ fontSize: 16, fontWeight: 600, color: tokens.colors.premiumGold }}>
                      -€{bewertung.bonus.toLocaleString('de-DE')}
                    </p>
                  </div>

                  {/* Final price */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    paddingTop: 16, borderTop: `2px solid ${tokens.colors.cyberCyan}`,
                  }}>
                    <div>
                      <p style={{ fontSize: 12, color: tokens.colors.cyberCyan, margin: 0, fontWeight: 600 }}>
                        IHR PREIS
                      </p>
                    </div>
                    <p style={{
                      fontFamily: tokens.fonts.display, fontSize: 28, fontWeight: 700,
                      color: tokens.colors.cyberCyan,
                    }}>
                      €{bewertung.newPrice.toLocaleString('de-DE')}
                    </p>
                  </div>

                  {/* Total savings */}
                  <div style={{
                    padding: 12, background: tokens.colors.successGreen + '15',
                    borderRadius: 8, textAlign: 'center',
                  }}>
                    <p style={{ fontSize: 13, color: tokens.colors.successGreen, margin: 0 }}>
                      Sie sparen insgesamt: <strong>€{bewertung.total.toLocaleString('de-DE')}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 12, color: tokens.colors.silverMist, marginBottom: 24 }}>
                * Schätzwert basierend auf Ihren Angaben. Finales Angebot nach Fahrzeugbegutachtung.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    padding: '14px 24px', fontSize: 14, fontWeight: 600,
                    fontFamily: tokens.fonts.body,
                    background: 'transparent',
                    color: tokens.colors.chromeWhite,
                    border: `1px solid ${tokens.colors.glassMedium}`,
                    borderRadius: 10, cursor: 'pointer',
                  }}
                >
                  Zurück
                </button>
                <button
                  onClick={onClose}
                  style={{
                    padding: '14px 24px', fontSize: 14, fontWeight: 600,
                    fontFamily: tokens.fonts.body,
                    background: tokens.colors.cyanGlow,
                    color: tokens.colors.darkShowroom,
                    border: 'none', borderRadius: 10, cursor: 'pointer',
                  }}
                >
                  Angebot anfordern
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// FINANCING CALCULATOR MODAL
// ============================================================================
const FinancingModal = ({ vehicle, onClose }) => {
  const [price, setPrice] = useState(vehicle?.price || 25000);
  const [anzahlung, setAnzahlung] = useState(vehicle?.financing?.anzahlung || 5000);
  const [laufzeit, setLaufzeit] = useState(vehicle?.financing?.term || 48);
  const [zinssatz, setZinssatz] = useState(4.99);
  const [selectedBank, setSelectedBank] = useState(bankPartners[0]);

  const nettokredit = price - anzahlung;
  const monatszins = zinssatz / 100 / 12;
  const rate = monatszins === 0 
    ? nettokredit / laufzeit
    : (nettokredit * monatszins * Math.pow(1 + monatszins, laufzeit)) / (Math.pow(1 + monatszins, laufzeit) - 1);
  const gesamtBetrag = rate * laufzeit + anzahlung;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: 20,
    }}>
      <div style={{
        background: tokens.colors.charcoalMetal,
        borderRadius: 20, maxWidth: 600, width: '100%',
        maxHeight: '90vh', overflow: 'auto',
        border: `1px solid ${tokens.colors.glassMedium}`,
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: 24, borderBottom: `1px solid ${tokens.colors.glassLight}`,
        }}>
          <div>
            <h2 style={{ fontFamily: tokens.fonts.display, fontSize: 20, color: tokens.colors.chromeWhite, margin: 0 }}>
              Finanzierungsrechner
            </h2>
            {vehicle && (
              <p style={{ fontSize: 13, color: tokens.colors.silverMist, margin: '4px 0 0' }}>
                {vehicle.year} {vehicle.make} {vehicle.model}
              </p>
            )}
          </div>
          <button onClick={onClose} style={{
            width: 40, height: 40, borderRadius: '50%',
            background: tokens.colors.glassLight, border: 'none',
            color: tokens.colors.chromeWhite, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icons.Close size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: 24 }}>
          {/* Sliders */}
          <div style={{ display: 'grid', gap: 20, marginBottom: 24 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 13, color: tokens.colors.silverMist }}>Fahrzeugpreis</label>
                <span style={{ fontSize: 15, fontWeight: 600, color: tokens.colors.chromeWhite }}>
                  €{price.toLocaleString('de-DE')}
                </span>
              </div>
              <input
                type="range" min="5000" max="100000" step="500" value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: tokens.colors.cyberCyan }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 13, color: tokens.colors.silverMist }}>Anzahlung</label>
                <span style={{ fontSize: 15, fontWeight: 600, color: tokens.colors.chromeWhite }}>
                  €{anzahlung.toLocaleString('de-DE')} ({Math.round(anzahlung / price * 100)}%)
                </span>
              </div>
              <input
                type="range" min="0" max={price * 0.5} step="500" value={anzahlung}
                onChange={(e) => setAnzahlung(Number(e.target.value))}
                style={{ width: '100%', accentColor: tokens.colors.cyberCyan }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 13, color: tokens.colors.silverMist }}>Laufzeit</label>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[24, 36, 48, 60, 72, 84].map(months => (
                  <button
                    key={months}
                    onClick={() => setLaufzeit(months)}
                    style={{
                      flex: 1, padding: '10px 8px', fontSize: 13,
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
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: 12,
                    background: selectedBank.id === bank.id ? tokens.colors.cyberCyan + '15' : tokens.colors.glassLight,
                    border: `1px solid ${selectedBank.id === bank.id ? tokens.colors.cyberCyan : 'transparent'}`,
                    borderRadius: 10, cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: tokens.colors.glassMedium,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 12, color: tokens.colors.chromeWhite,
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

          {/* Result */}
          <div style={{
            background: `linear-gradient(135deg, ${tokens.colors.deepCyan}20, ${tokens.colors.cyberCyan}10)`,
            borderRadius: 16, padding: 24, textAlign: 'center', marginBottom: 24,
            border: `1px solid ${tokens.colors.cyberCyan}30`,
          }}>
            <p style={{ fontSize: 12, color: tokens.colors.silverMist, textTransform: 'uppercase', letterSpacing: 2, margin: 0 }}>
              Ihre monatliche Rate
            </p>
            <p style={{ fontFamily: tokens.fonts.display, fontSize: 48, fontWeight: 700, color: tokens.colors.chromeWhite, margin: '8px 0' }}>
              €{Math.round(rate).toLocaleString('de-DE')}
            </p>
            <p style={{ fontSize: 12, color: tokens.colors.silverMist, margin: 0 }}>
              Gesamtbetrag: €{Math.round(gesamtBetrag).toLocaleString('de-DE')}
            </p>
          </div>

          {/* PAngV disclosure */}
          <div style={{
            background: tokens.colors.glassLight, borderRadius: 12, padding: 16, marginBottom: 24,
          }}>
            <p style={{ fontSize: 11, color: tokens.colors.silverMist, margin: 0, lineHeight: 1.6 }}>
              <strong style={{ color: tokens.colors.chromeWhite }}>Repräsentatives Beispiel gem. §17 Abs. 4 PAngV:</strong><br />
              Kaufpreis: €{price.toLocaleString('de-DE')} | Anzahlung: €{anzahlung.toLocaleString('de-DE')} | 
              Nettodarlehensbetrag: €{nettokredit.toLocaleString('de-DE')} | Laufzeit: {laufzeit} Monate | 
              Sollzinssatz (gebunden p.a.): {(zinssatz * 0.97).toFixed(2)}% | 
              <strong> Effektiver Jahreszins: {zinssatz.toFixed(2)}%</strong> | 
              Monatliche Rate: €{Math.round(rate).toLocaleString('de-DE')} | 
              Gesamtbetrag: €{Math.round(gesamtBetrag).toLocaleString('de-DE')} | 
              Vermittlung durch {selectedBank.name}. Bonität vorausgesetzt.
            </p>
          </div>

          {/* Schufa hint */}
          <div style={{
            padding: 16, borderRadius: 12,
            background: tokens.colors.premiumGold + '15',
            border: `1px solid ${tokens.colors.premiumGold}30`,
            marginBottom: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icons.Shield size={24} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: tokens.colors.premiumGold, margin: 0 }}>
                  Finanzierung auch bei negativer Schufa
                </p>
                <p style={{ fontSize: 11, color: tokens.colors.silverMist, margin: '4px 0 0' }}>
                  Wir prüfen individuelle Lösungen. Sprechen Sie uns an!
                </p>
              </div>
            </div>
          </div>

          <button style={{
            width: '100%', padding: '16px 24px', fontSize: 16, fontWeight: 600,
            fontFamily: tokens.fonts.body,
            background: tokens.colors.cyanGlow,
            color: tokens.colors.darkShowroom,
            border: 'none', borderRadius: 12, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <Icons.Handshake size={20} />
            Unverbindliches Angebot anfordern
          </button>
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
  const [filters, setFilters] = useState({ showAktionen: false, make: 'all' });
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showInquiry, setShowInquiry] = useState(false);
  const [showFinancing, setShowFinancing] = useState(false);
  const [showAltFuerNeu, setShowAltFuerNeu] = useState(false);

  // Loading sequence
  useEffect(() => {
    const steps = [
      { msg: 'Initialisiere Platform', p: 20 },
      { msg: 'Lade Fahrzeugbestand', p: 40 },
      { msg: 'Prüfe Aktionsangebote', p: 60 },
      { msg: 'Verbinde Finanzierungspartner', p: 80 },
      { msg: 'Bereit', p: 100 },
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setLoadingMessage(steps[i].msg);
        setLoadingProgress(steps[i].p);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 400);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const filteredVehicles = vehicleInventory.filter(v => {
    if (filters.showAktionen && !v.isAktion) return false;
    if (filters.make !== 'all' && v.make !== filters.make) return false;
    return true;
  });

  const aktionVehicles = vehicleInventory.filter(v => v.isAktion);
  const premiumVehicles = vehicleInventory.filter(v => v.isPremium);

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
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '12px 24px',
        background: `${tokens.colors.darkShowroom}ee`,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${tokens.colors.glassLight}`,
      }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <Logo size="sm" />

          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {[
              { id: 'home', label: 'Start' },
              { id: 'aktionen', label: 'Aktionen' },
              { id: 'vehicles', label: 'Alle Fahrzeuge' },
            ].map(nav => (
              <button
                key={nav.id}
                onClick={() => setActiveView(nav.id)}
                style={{
                  fontSize: 14, fontWeight: activeView === nav.id ? 600 : 400,
                  color: activeView === nav.id ? tokens.colors.cyberCyan : tokens.colors.silverMist,
                  background: 'none', border: 'none', cursor: 'pointer',
                }}
              >
                {nav.label}
              </button>
            ))}

            {/* Rating */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', background: tokens.colors.glassLight, borderRadius: 8,
            }}>
              <div style={{ display: 'flex', color: tokens.colors.premiumGold }}>
                {[1,2,3,4,5].map(i => <Icons.Star key={i} size={12} filled />)}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{companyData.rating}</span>
            </div>

            {/* WhatsApp */}
            <button style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', fontSize: 14, fontWeight: 600,
              fontFamily: tokens.fonts.body,
              background: tokens.colors.successGreen,
              color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer',
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
          minHeight: '100vh', paddingTop: 100,
          display: 'flex', alignItems: 'center',
          background: `radial-gradient(ellipse 80% 50% at 70% 50%, ${tokens.colors.cyberCyan}12, transparent)`,
        }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ maxWidth: 700 }}>
              {/* Trust badges */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                {[
                  { icon: Icons.Shield, text: '12 Mon. Garantie' },
                  { icon: Icons.TUV, text: 'TÜV geprüft' },
                  { icon: Icons.Handshake, text: 'Schufa-Finanzierung' },
                ].map((b, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 12px', background: tokens.colors.glassLight,
                    borderRadius: 6, fontSize: 11, color: tokens.colors.silverMist,
                  }}>
                    <b.icon size={14} />
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>

              <h1 style={{
                fontFamily: tokens.fonts.display, fontSize: 52, fontWeight: 700,
                lineHeight: 1.1, marginBottom: 20,
              }}>
                Premium Gebrauchtwagen
                <br />
                <span style={{ color: tokens.colors.cyberCyan }}>mit Vertrauen</span>
              </h1>

              <p style={{
                fontSize: 18, color: tokens.colors.silverMist,
                lineHeight: 1.6, marginBottom: 32,
              }}>
                Ihr zuverlässiger Partner in Göttingen. Mit {companyData.rating} Sternen 
                und flexibler Finanzierung – auch bei negativer Schufa.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveView('aktionen')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '16px 32px', fontSize: 16, fontWeight: 600,
                    fontFamily: tokens.fonts.body,
                    background: tokens.colors.redGlow,
                    color: '#fff', border: 'none', borderRadius: 12, cursor: 'pointer',
                  }}
                >
                  <Icons.Fire size={20} />
                  Aktionsangebote
                </button>
                <button
                  onClick={() => setActiveView('vehicles')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '16px 32px', fontSize: 16, fontWeight: 600,
                    fontFamily: tokens.fonts.body,
                    background: tokens.colors.cyanGlow,
                    color: tokens.colors.darkShowroom,
                    border: 'none', borderRadius: 12, cursor: 'pointer',
                  }}
                >
                  Alle Fahrzeuge
                  <Icons.ArrowRight size={20} />
                </button>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 40 }}>
                {[
                  { value: aktionVehicles.length, label: 'Aktionsfahrzeuge' },
                  { value: '100%', label: 'Empfehlungsrate' },
                  { value: '24h', label: 'Finanzierungszusage' },
                ].map((stat, i) => (
                  <div key={i}>
                    <p style={{
                      fontFamily: tokens.fonts.display, fontSize: 32, fontWeight: 700,
                      color: i === 0 ? tokens.colors.alertRed : tokens.colors.cyberCyan, margin: 0,
                    }}>
                      {stat.value}
                    </p>
                    <p style={{ fontSize: 13, color: tokens.colors.silverMist, margin: '4px 0 0' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Aktionen Section */}
      {activeView === 'aktionen' && (
        <section style={{ paddingTop: 100, minHeight: '100vh' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
            {/* Aktionen Header */}
            <div style={{
              padding: '40px', marginBottom: 40, borderRadius: 20,
              background: `linear-gradient(135deg, ${tokens.colors.alertRed}20, ${tokens.colors.warningOrange}10)`,
              border: `1px solid ${tokens.colors.alertRed}30`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 12,
                  background: tokens.colors.redGlow,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff',
                }}>
                  <Icons.Fire size={32} />
                </div>
                <div>
                  <h1 style={{
                    fontFamily: tokens.fonts.display, fontSize: 36, fontWeight: 700,
                    color: tokens.colors.chromeWhite, margin: 0,
                  }}>
                    Aktionsfahrzeuge
                  </h1>
                  <p style={{ fontSize: 16, color: tokens.colors.silverMist, margin: '4px 0 0' }}>
                    Bis zu €5.000 Rabatt + Alt-für-Neu Bonus
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div style={{
                  padding: '16px 24px', background: tokens.colors.glassLight,
                  borderRadius: 12, flex: 1, minWidth: 200,
                }}>
                  <p style={{ fontSize: 12, color: tokens.colors.silverMist, margin: 0 }}>
                    Fahrzeuge im Angebot
                  </p>
                  <p style={{ fontSize: 28, fontWeight: 700, color: tokens.colors.alertRed, margin: '4px 0 0' }}>
                    {aktionVehicles.length}
                  </p>
                </div>
                <div style={{
                  padding: '16px 24px', background: tokens.colors.glassLight,
                  borderRadius: 12, flex: 1, minWidth: 200,
                }}>
                  <p style={{ fontSize: 12, color: tokens.colors.silverMist, margin: 0 }}>
                    Max. Gesamtersparnis
                  </p>
                  <p style={{ fontSize: 28, fontWeight: 700, color: tokens.colors.successGreen, margin: '4px 0 0' }}>
                    €{(Math.max(...aktionVehicles.map(v => v.aktionDiscount + v.altFuerNeuBonus))).toLocaleString('de-DE')}
                  </p>
                </div>
                <div style={{
                  padding: '16px 24px', background: tokens.colors.premiumGold + '15',
                  borderRadius: 12, flex: 1, minWidth: 200,
                  border: `1px solid ${tokens.colors.premiumGold}30`,
                }}>
                  <p style={{ fontSize: 12, color: tokens.colors.premiumGold, margin: 0 }}>
                    Alt-für-Neu Bonus
                  </p>
                  <p style={{ fontSize: 28, fontWeight: 700, color: tokens.colors.premiumGold, margin: '4px 0 0' }}>
                    bis €3.000
                  </p>
                </div>
              </div>
            </div>

            {/* Aktion Vehicles Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: 24, paddingBottom: 80,
            }}>
              {aktionVehicles.map(vehicle => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onInquiry={(v) => { setSelectedVehicle(v); setShowInquiry(true); }}
                  onFinancing={(v) => { setSelectedVehicle(v); setShowFinancing(true); }}
                  onAltFuerNeu={(v) => { setSelectedVehicle(v); setShowAltFuerNeu(true); }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Vehicles Section */}
      {activeView === 'vehicles' && (
        <section style={{ paddingTop: 100, minHeight: '100vh' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ marginBottom: 32 }}>
              <h1 style={{
                fontFamily: tokens.fonts.display, fontSize: 36, fontWeight: 700,
                color: tokens.colors.chromeWhite, marginBottom: 16,
              }}>
                Unser Fahrzeugbestand
              </h1>

              {/* Filters */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button
                  onClick={() => setFilters({...filters, showAktionen: !filters.showAktionen})}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '10px 16px', fontSize: 13, fontWeight: 600,
                    fontFamily: tokens.fonts.body,
                    background: filters.showAktionen ? tokens.colors.alertRed + '20' : tokens.colors.glassLight,
                    border: `1px solid ${filters.showAktionen ? tokens.colors.alertRed : tokens.colors.glassMedium}`,
                    borderRadius: 8,
                    color: filters.showAktionen ? tokens.colors.alertRed : tokens.colors.silverMist,
                    cursor: 'pointer',
                  }}
                >
                  <Icons.Fire size={16} />
                  Nur Aktionen
                </button>

                <select
                  value={filters.make}
                  onChange={(e) => setFilters({...filters, make: e.target.value})}
                  style={{
                    padding: '10px 16px', fontSize: 13,
                    background: tokens.colors.glassLight,
                    border: `1px solid ${tokens.colors.glassMedium}`,
                    borderRadius: 8, color: tokens.colors.chromeWhite, cursor: 'pointer',
                  }}
                >
                  <option value="all">Alle Marken</option>
                  {[...new Set(vehicleInventory.map(v => v.make))].map(make => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Vehicles Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: 24, paddingBottom: 80,
            }}>
              {filteredVehicles.map(vehicle => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onInquiry={(v) => { setSelectedVehicle(v); setShowInquiry(true); }}
                  onFinancing={(v) => { setSelectedVehicle(v); setShowFinancing(true); }}
                  onAltFuerNeu={(v) => { setSelectedVehicle(v); setShowAltFuerNeu(true); }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium Vehicles Section - Home */}
      {activeView === 'home' && (
        <section style={{ padding: '80px 24px', background: tokens.colors.charcoalMetal }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
              marginBottom: 32,
            }}>
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '6px 12px', borderRadius: 6,
                  background: tokens.colors.premiumGold + '20',
                  color: tokens.colors.premiumGold,
                  fontSize: 12, fontWeight: 700, marginBottom: 12,
                }}>
                  <Icons.Sparkle size={14} />
                  PREMIUM AUSWAHL
                </div>
                <h2 style={{
                  fontFamily: tokens.fonts.display, fontSize: 32, fontWeight: 700,
                  color: tokens.colors.chromeWhite, margin: 0,
                }}>
                  Neueste Fahrzeuge
                </h2>
              </div>
              <button
                onClick={() => setActiveView('vehicles')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 14, fontWeight: 600, color: tokens.colors.cyberCyan,
                  background: 'none', border: 'none', cursor: 'pointer',
                }}
              >
                Alle ansehen
                <Icons.ArrowRight size={18} />
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: 24,
            }}>
              {premiumVehicles.slice(0, 3).map(vehicle => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onInquiry={(v) => { setSelectedVehicle(v); setShowInquiry(true); }}
                  onFinancing={(v) => { setSelectedVehicle(v); setShowFinancing(true); }}
                  onAltFuerNeu={(v) => { setSelectedVehicle(v); setShowAltFuerNeu(true); }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Alt für Neu Banner - Home */}
      {activeView === 'home' && (
        <section style={{
          padding: '60px 24px',
          background: `linear-gradient(135deg, ${tokens.colors.premiumGold}15, ${tokens.colors.premiumGold}05)`,
          borderTop: `1px solid ${tokens.colors.premiumGold}20`,
          borderBottom: `1px solid ${tokens.colors.premiumGold}20`,
        }}>
          <div style={{
            maxWidth: 1000, margin: '0 auto', textAlign: 'center',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              padding: '12px 24px', borderRadius: 12,
              background: tokens.colors.premiumGold + '20',
              marginBottom: 24,
            }}>
              <Icons.Refresh size={32} />
              <span style={{
                fontFamily: tokens.fonts.display, fontSize: 24, fontWeight: 700,
                color: tokens.colors.premiumGold,
              }}>
                ALT FÜR NEU AKTION
              </span>
            </div>

            <h2 style={{
              fontFamily: tokens.fonts.display, fontSize: 36, fontWeight: 700,
              color: tokens.colors.chromeWhite, marginBottom: 16,
            }}>
              Geben Sie Ihr Fahrzeug in Zahlung
            </h2>
            <p style={{
              fontSize: 18, color: tokens.colors.silverMist,
              marginBottom: 32, maxWidth: 600, margin: '0 auto 32px',
            }}>
              Erhalten Sie den besten Preis für Ihr altes Auto plus bis zu €3.000 
              zusätzlichen Bonus beim Kauf eines neuen Fahrzeugs.
            </p>

            <div style={{
              display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 32,
            }}>
              {[
                { icon: Icons.Camera, text: 'Fotos hochladen' },
                { icon: Icons.Calculator, text: 'Sofort Bewertung' },
                { icon: Icons.Gift, text: 'Bonus erhalten' },
              ].map((step, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: '50%',
                    background: tokens.colors.premiumGold + '20',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 12px', color: tokens.colors.premiumGold,
                  }}>
                    <step.icon size={28} />
                  </div>
                  <p style={{ fontSize: 14, color: tokens.colors.chromeWhite, margin: 0 }}>
                    {step.text}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveView('aktionen')}
              style={{
                padding: '16px 40px', fontSize: 16, fontWeight: 600,
                fontFamily: tokens.fonts.body,
                background: tokens.colors.goldGlow,
                color: tokens.colors.darkShowroom,
                border: 'none', borderRadius: 12, cursor: 'pointer',
              }}
            >
              Jetzt Fahrzeug bewerten lassen
            </button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{
        padding: '60px 24px 30px', background: tokens.colors.charcoalMetal,
        borderTop: `1px solid ${tokens.colors.glassLight}`,
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 40, marginBottom: 40,
          }}>
            <div>
              <Logo size="md" />
              <p style={{ fontSize: 13, color: tokens.colors.silverMist, marginTop: 16, lineHeight: 1.6 }}>
                Ihr Partner für Premium Gebrauchtwagen in Göttingen.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Kontakt</h4>
              <div style={{ fontSize: 13, color: tokens.colors.silverMist, lineHeight: 1.8 }}>
                <p style={{ margin: 0 }}>{companyData.address}</p>
                <p style={{ margin: 0 }}>{companyData.city}</p>
                <p style={{ margin: '8px 0 0' }}>{companyData.phone}</p>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Rechtliches</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Impressum', 'Datenschutz', 'AGB'].map(item => (
                  <a key={item} href="#" style={{ fontSize: 13, color: tokens.colors.silverMist, textDecoration: 'none' }}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            paddingTop: 24, borderTop: `1px solid ${tokens.colors.glassLight}`,
            fontSize: 11, color: tokens.colors.silverMist,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span>
              © {new Date().getFullYear()} {companyData.name} | HRB 206118 Göttingen | 
              Geschäftsführer: Hatice Yagmur, Xhulja Yagmur
            </span>
            <span style={{ opacity: 0.6 }}>Powered by VΞGΔ Foundation</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <button style={{
        position: 'fixed', bottom: 24, right: 24,
        width: 60, height: 60, borderRadius: '50%',
        background: tokens.colors.successGreen,
        color: '#fff', border: 'none', cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0, 200, 83, 0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 90,
      }}>
        <Icons.WhatsApp size={28} />
      </button>

      {/* Modals */}
      {showInquiry && selectedVehicle && (
        <InquiryModal vehicle={selectedVehicle} onClose={() => setShowInquiry(false)} />
      )}
      {showFinancing && selectedVehicle && (
        <FinancingModal vehicle={selectedVehicle} onClose={() => setShowFinancing(false)} />
      )}
      {showAltFuerNeu && selectedVehicle && (
        <AltFuerNeuModal vehicle={selectedVehicle} onClose={() => setShowAltFuerNeu(false)} />
      )}
    </div>
  );
};

export default CarCompany24Platform;
