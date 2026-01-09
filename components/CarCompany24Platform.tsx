'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { tokens, companyData } from '@/lib/design-tokens'
import AnimatedIntro from '@/components/platform/AnimatedIntro'
import { SportsCarIcon, AutohausIcon, HausIcon, RoadIcon } from '@/components/icons/CC24Icons'

// ============================================================================
// CARCOMPANY24 GMBH - PREMIUM AUTOMOTIVE PLATFORM
// MIT PIXELAG VIRTUAL SHOWROOM & ANIMIERTEM INTRO
// ============================================================================

// Design Tokens (re-exported for compatibility)
const Icons = {
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
    glassLight: 'rgba(255,255,255,0.06)',
    glassMedium: 'rgba(255,255,255,0.10)',
    cyanGlow: 'linear-gradient(135deg, #00D4D4 0%, #0FB5BA 100%)',
    goldGlow: 'linear-gradient(135deg, #C9A962 0%, #E8D5A3 50%, #C9A962 100%)',
    redGlow: 'linear-gradient(135deg, #FF3D57 0%, #FF6B6B 100%)',
  },
  fonts: {
    display: "'Montserrat', -apple-system, sans-serif",
    body: "'Inter', -apple-system, sans-serif",
  },
};

// Company Data wird jetzt aus design-tokens importiert

// ============================================================================
// ENHANCED SVG ICONS - Detailed & Premium
// ============================================================================
const Icons = {
  // Premium detailed sports car silhouette
  SportsCar: ({ size = 120, color = 'currentColor', style = {} }) => (
    <svg width={size} height={size * 0.35} viewBox="0 0 200 70" fill="none" style={style}>
      {/* Car body - sleek sports design */}
      <path 
        d="M15 52 
           L15 45 Q15 42 18 42 
           L35 42 L45 32 Q50 26 60 24 L85 22 
           Q95 21 105 22 L130 24 Q145 26 155 35 
           L170 42 Q180 42 182 45 L185 48 
           Q188 52 185 55 L180 55 
           Q180 62 170 62 Q160 62 160 55 
           L55 55 
           Q55 62 45 62 Q35 62 35 55 
           L20 55 Q15 55 15 52 Z"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      {/* Front wheel with rim detail */}
      <circle cx="45" cy="55" r="9" stroke={color} strokeWidth="2" fill="none"/>
      <circle cx="45" cy="55" r="5" stroke={color} strokeWidth="1" fill="none"/>
      <circle cx="45" cy="55" r="2" fill={color}/>
      {/* Rear wheel with rim detail */}
      <circle cx="170" cy="55" r="9" stroke={color} strokeWidth="2" fill="none"/>
      <circle cx="170" cy="55" r="5" stroke={color} strokeWidth="1" fill="none"/>
      <circle cx="170" cy="55" r="2" fill={color}/>
      {/* Windshield */}
      <path d="M55 32 L52 40 L90 40 L85 28 Q80 24 70 24 L60 25 Q55 26 55 32" 
            stroke={color} strokeWidth="1.5" fill="none"/>
      {/* Side window */}
      <path d="M95 28 L92 40 L140 40 L145 35 Q142 28 130 26 L100 26 Q95 26 95 28" 
            stroke={color} strokeWidth="1.5" fill="none"/>
      {/* Headlights */}
      <ellipse cx="178" cy="45" rx="4" ry="2" stroke={color} strokeWidth="1" fill="none"/>
      {/* Taillights */}
      <rect x="17" y="44" width="6" height="3" rx="1" stroke={color} strokeWidth="1" fill="none"/>
      {/* Door handle */}
      <line x1="100" y1="42" x2="108" y2="42" stroke={color} strokeWidth="1.5"/>
      {/* Side mirror */}
      <path d="M52 34 L48 32 L48 36 Z" fill={color}/>
      {/* Air vents */}
      <path d="M150 42 L155 42" stroke={color} strokeWidth="1"/>
      <path d="M152 44 L157 44" stroke={color} strokeWidth="1"/>
    </svg>
  ),

  // Autohaus (Car Dealership) Building
  Autohaus: ({ size = 100, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Main building */}
      <rect x="10" y="35" width="80" height="55" stroke={color} strokeWidth="2" fill="none" rx="2"/>
      {/* Roof with angle */}
      <path d="M5 35 L50 10 L95 35" stroke={color} strokeWidth="2" fill="none"/>
      {/* Large showroom windows */}
      <rect x="15" y="45" width="25" height="40" stroke={color} strokeWidth="1.5" fill="none" rx="1"/>
      <rect x="45" y="45" width="25" height="40" stroke={color} strokeWidth="1.5" fill="none" rx="1"/>
      {/* Door */}
      <rect x="75" y="55" width="12" height="30" stroke={color} strokeWidth="1.5" fill="none" rx="1"/>
      <circle cx="78" cy="70" r="1" fill={color}/>
      {/* Car silhouette in window */}
      <path d="M20 72 L22 68 L30 68 L32 72" stroke={color} strokeWidth="1" fill="none"/>
      <circle cx="23" cy="73" r="2" stroke={color} strokeWidth="0.5" fill="none"/>
      <circle cx="31" cy="73" r="2" stroke={color} strokeWidth="0.5" fill="none"/>
      {/* Sign on roof */}
      <rect x="35" y="15" width="30" height="12" stroke={color} strokeWidth="1" fill="none" rx="1"/>
      <text x="50" y="24" fontSize="6" fill={color} textAnchor="middle" fontWeight="bold">AUTO</text>
      {/* Flag */}
      <line x1="75" y1="10" x2="75" y2="25" stroke={color} strokeWidth="1"/>
      <path d="M75 10 L85 13 L75 16" fill={color} opacity="0.5"/>
    </svg>
  ),

  // House (Haus) - Customer's Home
  Haus: ({ size = 100, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Main house body */}
      <rect x="20" y="45" width="60" height="45" stroke={color} strokeWidth="2" fill="none"/>
      {/* Roof */}
      <path d="M15 48 L50 20 L85 48" stroke={color} strokeWidth="2.5" fill="none"/>
      {/* Chimney */}
      <rect x="65" y="25" width="10" height="18" stroke={color} strokeWidth="1.5" fill="none"/>
      {/* Smoke */}
      <path d="M70 22 Q68 18 72 15 Q70 12 73 8" stroke={color} strokeWidth="1" fill="none" opacity="0.5"/>
      {/* Door */}
      <rect x="42" y="60" width="16" height="30" stroke={color} strokeWidth="1.5" fill="none" rx="1"/>
      <circle cx="54" cy="77" r="2" fill={color}/>
      {/* Windows */}
      <rect x="25" y="55" width="12" height="12" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="31" y1="55" x2="31" y2="67" stroke={color} strokeWidth="1"/>
      <line x1="25" y1="61" x2="37" y2="61" stroke={color} strokeWidth="1"/>
      <rect x="63" y="55" width="12" height="12" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="69" y1="55" x2="69" y2="67" stroke={color} strokeWidth="1"/>
      <line x1="63" y1="61" x2="75" y2="61" stroke={color} strokeWidth="1"/>
      {/* Attic window */}
      <circle cx="50" cy="38" r="6" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="50" y1="32" x2="50" y2="44" stroke={color} strokeWidth="1"/>
      <line x1="44" y1="38" x2="56" y2="38" stroke={color} strokeWidth="1"/>
      {/* Ground/grass */}
      <path d="M10 90 Q20 88 30 90 Q40 92 50 90 Q60 88 70 90 Q80 92 90 90" stroke={color} strokeWidth="1" opacity="0.3"/>
    </svg>
  ),

  // Road/Street
  Road: ({ width = 400, color = 'currentColor' }) => (
    <svg width={width} height="30" viewBox={`0 0 ${width} 30`} fill="none">
      {/* Road surface */}
      <rect x="0" y="8" width={width} height="14" fill={color} opacity="0.2"/>
      {/* Road lines (dashed) */}
      {Array.from({ length: Math.ceil(width / 40) }, (_, i) => (
        <rect key={i} x={i * 40 + 10} y="14" width="20" height="2" fill={color} opacity="0.5"/>
      ))}
    </svg>
  ),

  // Other icons...
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

  Fire: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C12 2 8 6 8 10C8 12 9 14 12 14C15 14 16 12 16 10C16 6 12 2 12 2Z"/>
      <path d="M12 14C12 14 10 16 10 18C10 20 11 22 12 22C13 22 14 20 14 18C14 16 12 14 12 14Z"/>
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

  Refresh: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12C3 7 7 3 12 3C17 3 21 7 21 12"/>
      <path d="M21 12C21 17 17 21 12 21C7 21 3 17 3 12"/>
      <path d="M16 3L21 3L21 8"/>
      <path d="M8 21L3 21L3 16"/>
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

  Sparkle: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8Z"/>
      <path d="M19 14L20 16L22 17L20 18L19 20L18 18L16 17L18 16Z" opacity="0.6"/>
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

  Percent: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="7" cy="7" r="3"/>
      <circle cx="17" cy="17" r="3"/>
      <path d="M5 19L19 5"/>
    </svg>
  ),

  Clock: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6L12 12L16 14"/>
    </svg>
  ),

  Leaf: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 21Q6 12 12 6Q18 6 21 3"/>
      <path d="M6 21Q12 18 21 3"/>
    </svg>
  ),

  // PixelAG Logo
  PixelAG: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="3"/>
      <rect x="5" y="5" width="4" height="4" fill="currentColor"/>
      <rect x="10" y="5" width="4" height="4" fill="currentColor" opacity="0.7"/>
      <rect x="15" y="5" width="4" height="4" fill="currentColor" opacity="0.4"/>
      <rect x="5" y="10" width="4" height="4" fill="currentColor" opacity="0.7"/>
      <rect x="5" y="15" width="4" height="4" fill="currentColor" opacity="0.4"/>
      <path d="M12 12L19 19" strokeWidth="3"/>
    </svg>
  ),

  Wand: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 4L20 9L9 20L4 15Z"/>
      <path d="M12 7L17 12"/>
      <circle cx="18" cy="3" r="1" fill="currentColor"/>
      <circle cx="21" cy="6" r="0.5" fill="currentColor"/>
      <circle cx="20" cy="1" r="0.5" fill="currentColor"/>
    </svg>
  ),
};

// AnimatedIntro wird jetzt aus separatem Modul importiert

// ============================================================================
// PIXELAG VIRTUAL SHOWROOM - Our Own Open Source Solution
// ============================================================================
const PixelAGShowroom = ({ vehicleImage, onClose }) => {
  const [selectedBackground, setSelectedBackground] = useState('showroom_modern');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);
  const [settings, setSettings] = useState({
    shadowIntensity: 70,
    reflectionStrength: 50,
    brightness: 100,
    contrast: 100,
    removeBackground: true,
  });

  // Virtual Showroom Backgrounds (SVG-based for demo)
  const backgrounds = [
    { id: 'showroom_modern', name: 'Moderner Showroom', color: '#1a1f25', accent: '#00D4D4' },
    { id: 'showroom_luxury', name: 'Luxus Halle', color: '#0f1419', accent: '#C9A962' },
    { id: 'showroom_white', name: 'Studio Weiß', color: '#f5f5f5', accent: '#333' },
    { id: 'outdoor_city', name: 'City Straße', color: '#2c3e50', accent: '#e74c3c' },
    { id: 'outdoor_nature', name: 'Natur', color: '#27ae60', accent: '#f39c12' },
    { id: 'garage_premium', name: 'Premium Garage', color: '#34495e', accent: '#9b59b6' },
  ];

  const handleProcess = async () => {
    setIsProcessing(true);
    // Simulate AI processing
    await new Promise(r => setTimeout(r, 2000));
    setProcessedImage(true);
    setIsProcessing(false);
  };

  const currentBg = backgrounds.find(b => b.id === selectedBackground);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.9)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      zIndex: 1000,
    }}>
      {/* Left Panel - Controls */}
      <div style={{
        width: 320,
        background: tokens.colors.charcoalMetal,
        borderRight: `1px solid ${tokens.colors.glassLight}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}>
        {/* Header */}
        <div style={{
          padding: 20,
          borderBottom: `1px solid ${tokens.colors.glassLight}`,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: tokens.colors.cyanGlow,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: tokens.colors.darkShowroom,
          }}>
            <Icons.PixelAG size={24} />
          </div>
          <div>
            <h2 style={{
              fontFamily: tokens.fonts.display,
              fontSize: 18,
              fontWeight: 700,
              color: tokens.colors.chromeWhite,
              margin: 0,
            }}>
              PixelAG
            </h2>
            <p style={{ fontSize: 11, color: tokens.colors.silverMist, margin: 0 }}>
              Virtual Showroom Studio
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              marginLeft: 'auto',
              width: 32,
              height: 32,
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
            <Icons.Close size={16} />
          </button>
        </div>

        {/* Background Selection */}
        <div style={{ padding: 20 }}>
          <h3 style={{
            fontSize: 12,
            fontWeight: 600,
            color: tokens.colors.silverMist,
            textTransform: 'uppercase',
            letterSpacing: 1,
            marginBottom: 12,
          }}>
            Hintergrund wählen
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
          }}>
            {backgrounds.map(bg => (
              <button
                key={bg.id}
                onClick={() => setSelectedBackground(bg.id)}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  border: `2px solid ${selectedBackground === bg.id ? tokens.colors.cyberCyan : 'transparent'}`,
                  background: bg.color,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Mini preview */}
                <div style={{
                  width: '100%',
                  height: 50,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                  <SportsCarIcon size={60} color={bg.accent} />
                </div>
                <p style={{
                  fontSize: 10,
                  color: bg.color === '#f5f5f5' ? '#333' : '#fff',
                  marginTop: 8,
                  textAlign: 'center',
                }}>
                  {bg.name}
                </p>
                {selectedBackground === bg.id && (
                  <div style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: tokens.colors.cyberCyan,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icons.Check size={10} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div style={{ padding: '0 20px 20px' }}>
          <h3 style={{
            fontSize: 12,
            fontWeight: 600,
            color: tokens.colors.silverMist,
            textTransform: 'uppercase',
            letterSpacing: 1,
            marginBottom: 12,
          }}>
            Einstellungen
          </h3>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { key: 'shadowIntensity', label: 'Schatten', max: 100 },
              { key: 'reflectionStrength', label: 'Reflexion', max: 100 },
              { key: 'brightness', label: 'Helligkeit', max: 150 },
              { key: 'contrast', label: 'Kontrast', max: 150 },
            ].map(setting => (
              <div key={setting.key}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 6,
                }}>
                  <label style={{ fontSize: 12, color: tokens.colors.silverMist }}>
                    {setting.label}
                  </label>
                  <span style={{ fontSize: 12, color: tokens.colors.chromeWhite }}>
                    {settings[setting.key]}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={setting.max}
                  value={settings[setting.key]}
                  onChange={(e) => setSettings({
                    ...settings,
                    [setting.key]: Number(e.target.value)
                  })}
                  style={{
                    width: '100%',
                    accentColor: tokens.colors.cyberCyan,
                  }}
                />
              </div>
            ))}

            {/* Toggle for background removal */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: 12,
              background: tokens.colors.glassLight,
              borderRadius: 8,
              cursor: 'pointer',
            }}>
              <input
                type="checkbox"
                checked={settings.removeBackground}
                onChange={(e) => setSettings({
                  ...settings,
                  removeBackground: e.target.checked
                })}
                style={{ display: 'none' }}
              />
              <div style={{
                width: 44,
                height: 24,
                borderRadius: 12,
                background: settings.removeBackground ? tokens.colors.cyberCyan : tokens.colors.glassMedium,
                position: 'relative',
                transition: 'background 0.2s',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 2,
                  left: settings.removeBackground ? 22 : 2,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: '#fff',
                  transition: 'left 0.2s',
                }} />
              </div>
              <span style={{ fontSize: 13, color: tokens.colors.chromeWhite }}>
                Hintergrund entfernen
              </span>
            </label>
          </div>
        </div>

        {/* Process Button */}
        <div style={{ padding: 20, marginTop: 'auto' }}>
          <button
            onClick={handleProcess}
            disabled={isProcessing}
            style={{
              width: '100%',
              padding: '16px 24px',
              fontSize: 15,
              fontWeight: 600,
              fontFamily: tokens.fonts.body,
              background: isProcessing ? tokens.colors.glassMedium : tokens.colors.cyanGlow,
              color: isProcessing ? tokens.colors.silverMist : tokens.colors.darkShowroom,
              border: 'none',
              borderRadius: 12,
              cursor: isProcessing ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            {isProcessing ? (
              <>
                <div style={{
                  width: 20,
                  height: 20,
                  border: '2px solid currentColor',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }} />
                Verarbeite...
              </>
            ) : (
              <>
                <Icons.Wand size={20} />
                Bild verarbeiten
              </>
            )}
          </button>

          <p style={{
            fontSize: 11,
            color: tokens.colors.silverMist,
            textAlign: 'center',
            marginTop: 12,
          }}>
            Kostenlos • Keine Anmeldung • Open Source
          </p>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        background: currentBg?.color || tokens.colors.darkShowroom,
        transition: 'background 0.3s ease',
      }}>
        <div style={{
          position: 'relative',
          maxWidth: 800,
          width: '100%',
        }}>
          {/* Showroom Floor Effect */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '10%',
            right: '10%',
            height: 60,
            background: `linear-gradient(to top, ${currentBg?.accent}20, transparent)`,
            filter: 'blur(20px)',
            opacity: settings.reflectionStrength / 100,
          }} />

          {/* Shadow under car */}
          <div style={{
            position: 'absolute',
            bottom: 20,
            left: '15%',
            right: '15%',
            height: 30,
            background: 'rgba(0,0,0,0.4)',
            borderRadius: '50%',
            filter: 'blur(15px)',
            opacity: settings.shadowIntensity / 100,
          }} />

          {/* Car Display */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 0 80px',
            filter: `brightness(${settings.brightness}%) contrast(${settings.contrast}%)`,
          }}>
            {vehicleImage ? (
              <img
                src={vehicleImage}
                alt="Vehicle"
                style={{
                  maxWidth: '100%',
                  maxHeight: 400,
                  objectFit: 'contain',
                }}
              />
            ) : (
              <SportsCarIcon
                size={500}
                color={currentBg?.accent || tokens.colors.chromeWhite}
              />
            )}

            {/* Processing overlay */}
            {isProcessing && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 16,
              }}>
                <div style={{
                  width: 60,
                  height: 60,
                  border: `3px solid ${tokens.colors.cyberCyan}`,
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }} />
                <p style={{
                  fontSize: 14,
                  color: tokens.colors.chromeWhite,
                }}>
                  KI analysiert Bild...
                </p>
              </div>
            )}
          </div>

          {/* Reflection on floor */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
            background: `linear-gradient(to bottom, transparent, ${currentBg?.color || '#000'}cc)`,
            pointerEvents: 'none',
          }}>
            <div style={{
              transform: 'scaleY(-1) translateY(50%)',
              opacity: settings.reflectionStrength / 200,
              filter: 'blur(3px)',
            }}>
              <SportsCarIcon
                size={500}
                color={currentBg?.accent || tokens.colors.chromeWhite}
                style={{ margin: '0 auto', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Download buttons (shown after processing) */}
      {processedImage && (
        <div style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          display: 'flex',
          gap: 12,
        }}>
          <button style={{
            padding: '12px 24px',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: tokens.fonts.body,
            background: tokens.colors.glassLight,
            color: tokens.colors.chromeWhite,
            border: `1px solid ${tokens.colors.glassMedium}`,
            borderRadius: 10,
            cursor: 'pointer',
          }}>
            Als PNG speichern
          </button>
          <button style={{
            padding: '12px 24px',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: tokens.fonts.body,
            background: tokens.colors.successGreen,
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
          }}>
            Für Inserat verwenden
          </button>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// VEHICLE CARD WITH VIRTUAL SHOWROOM
// ============================================================================
const VehicleCard = ({ vehicle, onInquiry, onFinancing, onShowroom }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasDiscount = vehicle.originalPrice > vehicle.price;

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
        boxShadow: isHovered ? '0 20px 60px rgba(0,212,212,0.2)' : '0 8px 32px rgba(0,0,0,0.4)',
        border: `1px solid ${isHovered ? tokens.colors.cyberCyan + '50' : 'transparent'}`,
      }}
    >
      {/* Image Area with Virtual Showroom */}
      <div style={{
        position: 'relative',
        height: 200,
        background: vehicle.showroomBg || `linear-gradient(135deg, ${tokens.colors.darkShowroom}, ${tokens.colors.gunmetal})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Showroom lighting effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '20%',
          right: '20%',
          height: 100,
          background: `radial-gradient(ellipse at center, ${tokens.colors.cyberCyan}15, transparent)`,
          filter: 'blur(20px)',
        }} />

        {/* Floor reflection */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: `linear-gradient(to top, rgba(0,212,212,0.1), transparent)`,
        }} />

        {/* Vehicle shadow */}
        <div style={{
          position: 'absolute',
          bottom: 15,
          left: '20%',
          right: '20%',
          height: 20,
          background: 'rgba(0,0,0,0.4)',
          borderRadius: '50%',
          filter: 'blur(10px)',
        }} />

        {/* Car in showroom */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          color: tokens.colors.chromeWhite,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.3s ease',
        }}>
          <SportsCarIcon size={180} color={tokens.colors.chromeWhite} />
        </div>

        {/* Badges */}
        <div style={{
          position: 'absolute',
          top: 12,
          left: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}>
          {vehicle.isAktion && (
            <span style={{
              padding: '6px 12px',
              background: tokens.colors.redGlow,
              borderRadius: 6,
              color: '#fff',
              fontWeight: 700,
              fontSize: 11,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              <Icons.Fire size={12} />
              AKTION
            </span>
          )}
          {vehicle.isPremium && !vehicle.isAktion && (
            <span style={{
              padding: '6px 12px',
              background: tokens.colors.goldGlow,
              borderRadius: 6,
              color: tokens.colors.darkShowroom,
              fontWeight: 700,
              fontSize: 11,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              <Icons.Sparkle size={12} />
              PREMIUM
            </span>
          )}
        </div>

        {/* PixelAG / 360° buttons */}
        <div style={{
          position: 'absolute',
          top: 12,
          right: 12,
          display: 'flex',
          gap: 6,
        }}>
          <button
            onClick={(e) => { e.stopPropagation(); onShowroom(vehicle); }}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: tokens.colors.glassMedium,
              backdropFilter: 'blur(10px)',
              border: 'none',
              color: tokens.colors.cyberCyan,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="PixelAG Showroom"
          >
            <Icons.PixelAG size={18} />
          </button>
          <button
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: tokens.colors.glassMedium,
              backdropFilter: 'blur(10px)',
              border: 'none',
              color: tokens.colors.chromeWhite,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="360° Ansicht"
          >
            <Icons.View360 size={18} />
          </button>
        </div>

        {/* Photo count */}
        <div style={{
          position: 'absolute',
          bottom: 12,
          left: 12,
          padding: '4px 10px',
          background: tokens.colors.glassMedium,
          backdropFilter: 'blur(10px)',
          borderRadius: 20,
          fontSize: 11,
          color: tokens.colors.chromeWhite,
        }}>
          {vehicle.images} Fotos
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 20 }}>
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
            fontSize: 18,
            fontWeight: 600,
            color: tokens.colors.chromeWhite,
            margin: '4px 0 0',
          }}>
            {vehicle.model} {vehicle.variant}
          </h3>
        </div>

        {/* Specs */}
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
            { icon: Icons.Gearbox, value: vehicle.transmission?.slice(0, 5) },
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

        {/* Price */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingTop: 12,
          borderTop: `1px solid ${tokens.colors.glassLight}`,
        }}>
          <div>
            {hasDiscount && (
              <p style={{
                fontSize: 14,
                color: tokens.colors.alertRed,
                textDecoration: 'line-through',
                margin: 0,
                opacity: 0.7,
              }}>
                €{vehicle.originalPrice.toLocaleString('de-DE')}
              </p>
            )}
            <p style={{
              fontFamily: tokens.fonts.display,
              fontSize: 24,
              fontWeight: 700,
              color: hasDiscount ? tokens.colors.successGreen : tokens.colors.chromeWhite,
              margin: 0,
            }}>
              €{vehicle.price.toLocaleString('de-DE')}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 12, color: tokens.colors.cyberCyan, margin: 0 }}>
              ab €{vehicle.financing?.rate || 299}/Mo
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          marginTop: 16,
        }}>
          <button
            onClick={(e) => { e.stopPropagation(); onInquiry(vehicle); }}
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
            <Icons.Phone size={16} />
            Anfragen
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onFinancing(vehicle); }}
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
            <Icons.Calculator size={16} />
            Finanzieren
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// VEHICLE INVENTORY
// ============================================================================
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
    images: 8,
    isAktion: true,
    financing: { rate: 349 }
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
    images: 12,
    isPremium: true,
    financing: { rate: 449 }
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
    images: 10,
    isPremium: true,
    financing: { rate: 489 }
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
    images: 9,
    isAktion: true,
    financing: { rate: 389 }
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
    images: 15,
    isAktion: true,
    financing: { rate: 699 }
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
    images: 6,
    isAktion: true,
    financing: { rate: 279 }
  },
];

// ============================================================================
// SVG LOGO
// ============================================================================
const Logo = ({ size = 'md' }) => {
  const sizes = { sm: { w: 160, h: 55 }, md: { w: 200, h: 70 } };
  const { w, h } = sizes[size];
  
  return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ color: tokens.colors.cyberCyan }}>
        <SportsCarIcon size={60} color={tokens.colors.cyberCyan} />
      </div>
      <div>
        <h1 style={{
          fontFamily: tokens.fonts.display,
          fontSize: 20,
          fontWeight: 700,
          color: tokens.colors.chromeWhite,
          margin: 0,
          lineHeight: 1,
        }}>
          Car<span style={{ color: tokens.colors.cyberCyan }}>Company</span>24
        </h1>
        <p style={{
          fontSize: 9,
          color: tokens.colors.silverMist,
          margin: 0,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}>
          GmbH • Göttingen
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN PLATFORM COMPONENT
// ============================================================================
// Vehicle Type
interface Vehicle {
  id: string
  make: string
  model: string
  variant: string
  year: number
  price: number
  originalPrice: number
  km: number
  fuel: string
  transmission: string
  images: number
  isAktion?: boolean
  isPremium?: boolean
  financing?: { rate: number }
  showroomBg?: string
}

const CarCompany24Platform = () => {
  const [showIntro, setShowIntro] = useState(true)
  const [activeView, setActiveView] = useState<'home' | 'vehicles'>('home')
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [showShowroom, setShowShowroom] = useState(false)

  const handleInquiry = useCallback((vehicle: Vehicle) => {
    // TODO: Integrate with contact form
    console.log('Inquiry for:', vehicle)
  }, [])

  const handleFinancing = useCallback((vehicle: Vehicle) => {
    // TODO: Navigate to financing page
    window.location.href = `/finanzierung?vehicle=${vehicle.id}`
  }, [])

  const handleShowroom = useCallback((vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    setShowShowroom(true)
  }, [])

  if (showIntro) {
    return <AnimatedIntro onComplete={() => setShowIntro(false)} />
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
          <Logo size="sm" />

          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {['home', 'vehicles'].map(view => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                style={{
                  fontSize: 14,
                  fontWeight: activeView === view ? 600 : 400,
                  color: activeView === view ? tokens.colors.cyberCyan : tokens.colors.silverMist,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {view === 'home' ? 'Start' : 'Fahrzeuge'}
              </button>
            ))}

            {/* Rating */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              background: tokens.colors.glassLight,
              borderRadius: 8,
            }}>
              <div style={{ display: 'flex', color: tokens.colors.premiumGold }}>
                {[1,2,3,4,5].map(i => <Icons.Star key={i} size={12} filled />)}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{companyData.rating}</span>
            </div>

            {/* WhatsApp */}
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: tokens.fonts.body,
              background: tokens.colors.successGreen,
              color: '#fff',
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

      {/* Hero */}
      {activeView === 'home' && (
        <section style={{
          minHeight: '100vh',
          paddingTop: 100,
          display: 'flex',
          alignItems: 'center',
          background: `radial-gradient(ellipse 80% 50% at 70% 50%, ${tokens.colors.cyberCyan}12, transparent)`,
        }}>
          <div style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            alignItems: 'center',
          }}>
            <div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                {[
                  { icon: Icons.Shield, text: '12 Mon. Garantie' },
                  { icon: Icons.TUV, text: 'TÜV geprüft' },
                  { icon: Icons.Handshake, text: 'Schufa-Finanzierung' },
                ].map((b, i) => (
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
                    <b.icon size={14} />
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>

              <h1 style={{
                fontFamily: tokens.fonts.display,
                fontSize: 52,
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: 20,
              }}>
                Premium Gebrauchtwagen
                <br />
                <span style={{ color: tokens.colors.cyberCyan }}>im virtuellen Showroom</span>
              </h1>

              <p style={{
                fontSize: 18,
                color: tokens.colors.silverMist,
                lineHeight: 1.6,
                marginBottom: 32,
              }}>
                Erleben Sie Ihr Traumauto in unserem PixelAG Virtual Showroom. 
                Mit {companyData.rating} Sternen und flexibler Finanzierung.
              </p>

              <div style={{ display: 'flex', gap: 16 }}>
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
                  onClick={() => setShowShowroom(true)}
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
                  <Icons.PixelAG size={20} />
                  PixelAG Studio
                </button>
              </div>
            </div>

            {/* Hero Car */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                position: 'absolute',
                inset: -40,
                background: `radial-gradient(circle, ${tokens.colors.cyberCyan}20, transparent 70%)`,
                filter: 'blur(40px)',
              }} />
              <SportsCarIcon size={450} color={tokens.colors.cyberCyan} />
            </div>
          </div>
        </section>
      )}

      {/* Vehicles Grid */}
      {activeView === 'vehicles' && (
        <section style={{ paddingTop: 100, minHeight: '100vh' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 24px' }}>
            <h1 style={{
              fontFamily: tokens.fonts.display,
              fontSize: 36,
              fontWeight: 700,
              marginBottom: 32,
            }}>
              Unser <span style={{ color: tokens.colors.cyberCyan }}>Fahrzeugbestand</span>
            </h1>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: 24,
            }}>
              {vehicleInventory.map(vehicle => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onInquiry={handleInquiry}
                  onFinancing={handleFinancing}
                  onShowroom={handleShowroom}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured on Home */}
      {activeView === 'home' && (
        <section style={{ padding: '80px 24px', background: tokens.colors.charcoalMetal }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 32,
            }}>
              <div>
                <h2 style={{
                  fontFamily: tokens.fonts.display,
                  fontSize: 32,
                  fontWeight: 700,
                  color: tokens.colors.chromeWhite,
                  margin: 0,
                }}>
                  Aktuelle <span style={{ color: tokens.colors.cyberCyan }}>Highlights</span>
                </h2>
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
                Alle ansehen
                <Icons.ArrowRight size={18} />
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: 24,
            }}>
              {vehicleInventory.slice(0, 3).map(vehicle => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onInquiry={handleInquiry}
                  onFinancing={handleFinancing}
                  onShowroom={handleShowroom}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PixelAG Banner */}
      {activeView === 'home' && (
        <section style={{
          padding: '60px 24px',
          background: `linear-gradient(135deg, ${tokens.colors.cyberCyan}15, ${tokens.colors.cyberCyan}05)`,
          borderTop: `1px solid ${tokens.colors.cyberCyan}20`,
          borderBottom: `1px solid ${tokens.colors.cyberCyan}20`,
        }}>
          <div style={{
            maxWidth: 900,
            margin: '0 auto',
            textAlign: 'center',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 24px',
              background: tokens.colors.cyberCyan + '20',
              borderRadius: 12,
              marginBottom: 24,
            }}>
              <Icons.PixelAG size={32} />
              <span style={{
                fontFamily: tokens.fonts.display,
                fontSize: 24,
                fontWeight: 700,
                color: tokens.colors.cyberCyan,
              }}>
                PixelAG Virtual Showroom
              </span>
            </div>

            <h2 style={{
              fontFamily: tokens.fonts.display,
              fontSize: 32,
              fontWeight: 700,
              color: tokens.colors.chromeWhite,
              marginBottom: 16,
            }}>
              Unser eigenes Open-Source Studio
            </h2>
            <p style={{
              fontSize: 16,
              color: tokens.colors.silverMist,
              marginBottom: 32,
              maxWidth: 600,
              margin: '0 auto 32px',
            }}>
              Keine €40/Monat für externe Tools. Professionelle Fahrzeugfotos 
              mit KI-Hintergrundentfernung, virtuellen Showrooms und mehr.
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 40,
              marginBottom: 32,
            }}>
              {[
                { icon: Icons.Camera, label: 'Foto Upload' },
                { icon: Icons.Wand, label: 'KI Processing' },
                { icon: Icons.PixelAG, label: 'Virtual Showroom' },
              ].map((step, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: tokens.colors.cyberCyan + '20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                    color: tokens.colors.cyberCyan,
                  }}>
                    <step.icon size={28} />
                  </div>
                  <p style={{ fontSize: 13, color: tokens.colors.chromeWhite }}>{step.label}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowShowroom(true)}
              style={{
                padding: '16px 40px',
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
              PixelAG Studio öffnen
            </button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{
        padding: '40px 24px',
        background: tokens.colors.charcoalMetal,
        borderTop: `1px solid ${tokens.colors.glassLight}`,
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Logo size="sm" />
          <p style={{ fontSize: 12, color: tokens.colors.silverMist }}>
            © {new Date().getFullYear()} {companyData.name} | Powered by PixelAG & VΞGΔ
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <button style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: tokens.colors.successGreen,
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0, 200, 83, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 90,
      }}>
        <Icons.WhatsApp size={28} />
      </button>

      {/* PixelAG Showroom Modal */}
      {showShowroom && (
        <PixelAGShowroom
          vehicleImage={null}
          onClose={() => setShowShowroom(false)}
        />
      )}
    </div>
  );
};

export default CarCompany24Platform;
