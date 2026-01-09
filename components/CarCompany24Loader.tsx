'use client'

import React, { useState, useEffect } from 'react'

const CarCompany24Loader = () => {
  const [phase, setPhase] = useState(0)
  const [morphProgress, setMorphProgress] = useState(0)

  // CarCompany24 Service-Bereiche
  const entities = [
    { name: 'FAHRZEUGE', symbol: '🚗', color: '#E63946' },
    { name: 'FINANZIERUNG', symbol: '💰', color: '#2A9D8F' },
    { name: 'SERVICE', symbol: '🔧', color: '#E9C46A' },
    { name: 'BERATUNG', symbol: '💬', color: '#264653' },
    { name: 'GARANTIE', symbol: '✓', color: '#F4A261' }
  ]

  useEffect(() => {
    let frame = 0
    const interval = setInterval(() => {
      frame++
      setMorphProgress((frame % 100) / 100)
      if (frame % 100 === 0) {
        setPhase(p => (p + 1) % entities.length)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [entities.length])

  const currentEntity = entities[phase]
  const nextEntity = entities[(phase + 1) % entities.length]

  const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  const easedProgress = ease(morphProgress)

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 }
  }

  const lerpColor = (c1: string, c2: string, t: number) => {
    const rgb1 = hexToRgb(c1)
    const rgb2 = hexToRgb(c2)
    return `rgb(${Math.round(rgb1.r + (rgb2.r - rgb1.r) * t)}, ${Math.round(rgb1.g + (rgb2.g - rgb1.g) * t)}, ${Math.round(rgb1.b + (rgb2.b - rgb1.b) * t)})`
  }

  const currentColor = lerpColor(currentEntity.color, nextEntity.color, easedProgress)
  const glowIntensity = 0.3 + Math.sin(morphProgress * Math.PI * 2) * 0.2

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Subtle pattern background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(230, 57, 70, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 50%, rgba(42, 157, 143, 0.05) 0%, transparent 50%)
        `,
        opacity: 0.8
      }} />
      
      {/* Central glow */}
      <div style={{
        position: 'absolute',
        width: '350px',
        height: '350px',
        background: `radial-gradient(circle, ${currentColor}${Math.round(glowIntensity * 20).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(50px)',
        transition: 'background 0.5s ease'
      }} />
      
      {/* Logo */}
      <div style={{
        marginBottom: '40px',
        fontSize: '28px',
        fontWeight: '700',
        letterSpacing: '0.05em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{ color: '#E63946' }}>Car</span>
        <span style={{ color: '#ffffff' }}>Company</span>
        <span style={{
          background: 'linear-gradient(135deg, #E63946 0%, #F4A261 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '800'
        }}>24</span>
      </div>
      
      {/* Main symbol container */}
      <div style={{
        position: 'relative',
        width: '140px',
        height: '140px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '32px'
      }}>
        
        {/* Rotating ring - outer */}
        <svg style={{
          position: 'absolute',
          width: '140px',
          height: '140px',
          animation: 'rotate 6s linear infinite'
        }} viewBox="0 0 140 140">
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentColor} stopOpacity="0.9" />
              <stop offset="50%" stopColor={currentColor} stopOpacity="0" />
              <stop offset="100%" stopColor={currentColor} stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <circle
            cx="70" cy="70" r="65"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="2"
            strokeDasharray="100 300"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Inner ring */}
        <svg style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          animation: 'rotateReverse 4s linear infinite'
        }} viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke={currentColor}
            strokeWidth="1"
            strokeDasharray="30 70"
            opacity="0.4"
          />
        </svg>
        
        {/* Symbol morph */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${1 - easedProgress * 0.3})`,
            opacity: 1 - easedProgress,
            fontSize: '48px',
            transition: 'all 0.1s'
          }}>
            {currentEntity.symbol}
          </div>
          <div style={{
            fontSize: '48px',
            opacity: easedProgress,
            transform: `scale(${0.7 + easedProgress * 0.3})`
          }}>
            {nextEntity.symbol}
          </div>
        </div>
      </div>
      
      {/* Entity name */}
      <div style={{
        position: 'relative',
        height: '28px',
        marginBottom: '40px'
      }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 1 - easedProgress,
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.3em',
          color: currentEntity.color,
          whiteSpace: 'nowrap'
        }}>
          {currentEntity.name}
        </div>
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: easedProgress,
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.3em',
          color: nextEntity.color,
          whiteSpace: 'nowrap'
        }}>
          {nextEntity.name}
        </div>
      </div>
      
      {/* Progress bar */}
      <div style={{
        width: '180px',
        height: '3px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
        marginBottom: '20px'
      }}>
        <div style={{
          height: '100%',
          width: `${morphProgress * 100}%`,
          background: `linear-gradient(90deg, ${currentColor}, ${nextEntity.color})`,
          borderRadius: '2px',
          transition: 'background 0.3s ease'
        }} />
      </div>
      
      {/* Dot indicators */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '32px'
      }}>
        {entities.map((entity, i) => (
          <div
            key={i}
            style={{
              width: i === phase ? '18px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === phase ? entity.color : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
              boxShadow: i === phase ? `0 0 10px ${entity.color}80` : 'none'
            }}
          />
        ))}
      </div>
      
      {/* Footer */}
      <div style={{
        fontSize: '11px',
        letterSpacing: '0.25em',
        color: 'rgba(255,255,255,0.3)',
        fontWeight: '400'
      }}>
        QUALITÄT · VERTRAUEN · SERVICE
      </div>
      
      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotateReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  )
}

export default CarCompany24Loader
