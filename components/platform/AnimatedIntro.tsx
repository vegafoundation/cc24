'use client'

import { useState, useEffect } from 'react'
import { tokens } from '@/lib/design-tokens'
import { AutohausIcon, HausIcon, RoadIcon, SportsCarIcon } from '@/components/icons/CC24Icons'

interface AnimatedIntroProps {
  onComplete: () => void
}

export default function AnimatedIntro({ onComplete }: AnimatedIntroProps) {
  const [phase, setPhase] = useState<'start' | 'driving' | 'arriving'>('start')
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('driving'), 500)
    const timer2 = setTimeout(() => setShowText(true), 1500)
    const timer3 = setTimeout(() => setPhase('arriving'), 2500)
    const timer4 = setTimeout(() => onComplete(), 3500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: tokens.colors.darkShowroom,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at 20% 30%, ${tokens.colors.cyberCyan}08 0%, transparent 40%),
                     radial-gradient(circle at 80% 70%, ${tokens.colors.premiumGold}08 0%, transparent 40%)`,
      }} />

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 900,
        height: 300,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '0 60px',
      }}>
        <div style={{
          position: 'absolute',
          right: 60,
          bottom: 50,
          opacity: phase === 'start' ? 0 : 1,
          transform: phase === 'start' ? 'translateY(20px)' : 'translateY(0)',
          transition: 'all 0.5s ease',
          color: tokens.colors.cyberCyan,
        }}>
          <AutohausIcon size={120} />
          <p style={{
            fontSize: 12,
            textAlign: 'center',
            color: tokens.colors.silverMist,
            marginTop: 8,
            fontWeight: 600,
            letterSpacing: 1,
          }}>
            AUTOHAUS
          </p>
        </div>

        <div style={{
          position: 'absolute',
          left: 60,
          bottom: 50,
          opacity: phase === 'start' ? 0 : 1,
          transform: phase === 'start' ? 'translateY(20px)' : 'translateY(0)',
          transition: 'all 0.5s ease 0.2s',
          color: tokens.colors.premiumGold,
        }}>
          <HausIcon size={100} />
          <p style={{
            fontSize: 12,
            textAlign: 'center',
            color: tokens.colors.silverMist,
            marginTop: 8,
            fontWeight: 600,
            letterSpacing: 1,
          }}>
            IHR ZUHAUSE
          </p>
        </div>

        <div style={{
          position: 'absolute',
          bottom: 40,
          left: 0,
          right: 0,
          color: tokens.colors.silverMist,
          opacity: phase === 'start' ? 0 : 0.5,
          transition: 'opacity 0.5s ease',
        }}>
          <RoadIcon width={900} />
        </div>

        <div style={{
          position: 'absolute',
          bottom: 55,
          right: phase === 'driving' || phase === 'arriving' ? 'calc(100% - 200px)' : '180px',
          transition: 'right 2s cubic-bezier(0.4, 0, 0.2, 1)',
          color: tokens.colors.chromeWhite,
          filter: `drop-shadow(0 0 20px ${tokens.colors.cyberCyan}50)`,
          zIndex: 10,
        }}>
          <div style={{
            position: 'absolute',
            left: -30,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 60,
            height: 20,
            background: `linear-gradient(to left, ${tokens.colors.premiumGold}60, transparent)`,
            borderRadius: '50%',
            filter: 'blur(8px)',
            opacity: phase === 'driving' ? 1 : 0,
            transition: 'opacity 0.3s',
          }} />
          <div style={{
            position: 'absolute',
            right: -40,
            bottom: 0,
            width: 50,
            height: 15,
            background: `linear-gradient(to right, ${tokens.colors.silverMist}30, transparent)`,
            borderRadius: '50%',
            filter: 'blur(5px)',
            opacity: phase === 'driving' ? 0.6 : 0,
            transition: 'opacity 0.3s',
          }} />
          <SportsCarIcon size={160} color={tokens.colors.chromeWhite} style={{
            transform: 'scaleX(-1)',
          }} />
        </div>

        {phase === 'driving' && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  right: `${20 + i * 15}%`,
                  top: `${45 + (i % 3) * 5}%`,
                  width: 40 + i * 10,
                  height: 2,
                  background: `linear-gradient(to left, ${tokens.colors.cyberCyan}40, transparent)`,
                  animation: `speedLine ${0.3 + i * 0.1}s linear infinite`,
                  opacity: 0.5,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div style={{
        marginTop: 60,
        textAlign: 'center',
        opacity: showText ? 1 : 0,
        transform: showText ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s ease',
      }}>
        <h1 style={{
          fontFamily: tokens.fonts.display,
          fontSize: 42,
          fontWeight: 700,
          color: tokens.colors.chromeWhite,
          margin: 0,
          letterSpacing: 2,
        }}>
          Car<span style={{ color: tokens.colors.cyberCyan }}>Company</span>24
        </h1>
        <p style={{
          fontSize: 14,
          color: tokens.colors.silverMist,
          marginTop: 8,
          letterSpacing: 4,
          textTransform: 'uppercase',
        }}>
          Wir bringen Ihr Traumauto nach Hause
        </p>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: tokens.colors.silverMist,
        fontSize: 12,
      }}>
        <div style={{
          width: 150,
          height: 3,
          background: tokens.colors.glassLight,
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          <div style={{
            width: phase === 'arriving' ? '100%' : phase === 'driving' ? '60%' : '20%',
            height: '100%',
            background: tokens.colors.cyanGlow,
            transition: 'width 1s ease',
          }} />
        </div>
        <span>Wird geladen...</span>
      </div>

      <style>{`
        @keyframes speedLine {
          0% { transform: translateX(0); opacity: 0.5; }
          100% { transform: translateX(100px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
