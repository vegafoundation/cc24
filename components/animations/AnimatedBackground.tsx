'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface AnimatedBackgroundProps {
  images: string[]
  transitionDuration?: number
  fadeDuration?: number
}

export default function AnimatedBackground({
  images,
  transitionDuration = 8000,
  fadeDuration = 2000,
}: AnimatedBackgroundProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    if (images.length === 0) return

    const interval = setInterval(() => {
      // Fade out
      setOpacity(0)
      
      setTimeout(() => {
        // Change image
        setCurrentIndex((prev) => (prev + 1) % images.length)
        // Fade in
        setOpacity(1)
      }, fadeDuration)
    }, transitionDuration)

    return () => clearInterval(interval)
  }, [images.length, transitionDuration, fadeDuration])

  if (images.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{
            opacity: index === currentIndex ? opacity : 0,
            zIndex: index === currentIndex ? 1 : 0,
          }}
        >
          <Image
            src={image}
            alt={`Background ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            quality={85}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
          {/* Overlay für bessere Lesbarkeit */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
      ))}
    </div>
  )
}
