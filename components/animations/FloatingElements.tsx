'use client'

import { useEffect, useRef, useState } from 'react'
import { Car, Shield, CreditCard, TrendingUp } from 'lucide-react'

interface FloatingElement {
  iconType: 'car' | 'shield' | 'card' | 'trend'
  x: number
  y: number
  speedX: number
  speedY: number
  size: number
  opacity: number
}

const iconMap = {
  car: Car,
  shield: Shield,
  card: CreditCard,
  trend: TrendingUp,
}

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const elementCount = 8
    const iconTypes: Array<'car' | 'shield' | 'card' | 'trend'> = ['car', 'shield', 'card', 'trend']
    
    const initialElements: FloatingElement[] = []
    for (let i = 0; i < elementCount; i++) {
      initialElements.push({
        iconType: iconTypes[Math.floor(Math.random() * iconTypes.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speedX: (Math.random() - 0.5) * 0.02,
        speedY: (Math.random() - 0.5) * 0.02,
        size: Math.random() * 20 + 10,
        opacity: Math.random() * 0.2 + 0.05,
      })
    }
    setElements(initialElements)

    let animationFrameId: number
    const animate = () => {
      setElements(prev => prev.map(element => {
        let newX = element.x + element.speedX
        let newY = element.y + element.speedY
        let newSpeedX = element.speedX
        let newSpeedY = element.speedY

        // Bounce off edges
        if (newX > 100 || newX < 0) newSpeedX *= -1
        if (newY > 100 || newY < 0) newSpeedY *= -1

        // Keep in bounds
        newX = Math.max(0, Math.min(100, newX))
        newY = Math.max(0, Math.min(100, newY))

        return {
          ...element,
          x: newX,
          y: newY,
          speedX: newSpeedX,
          speedY: newSpeedY,
        }
      }))

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {elements.map((element, i) => {
        const Icon = iconMap[element.iconType]
        return (
          <div
            key={i}
            className="absolute text-primary-500/20 transition-all duration-1000"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              opacity: element.opacity,
              transform: 'translate(-50%, -50%)',
              width: `${element.size}px`,
              height: `${element.size}px`,
            }}
          >
            <Icon className="w-full h-full" />
          </div>
        )
      })}
    </div>
  )
}
