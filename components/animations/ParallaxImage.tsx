'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  speed?: number
  className?: string
  fallback?: string
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.5,
  className = '',
  fallback,
}: ParallaxImageProps) {
  const [scrollY, setScrollY] = useState(0)
  const [imageError, setImageError] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const translateY = scrollY * speed

  return (
    <div
      ref={imageRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        transform: `translateY(${translateY}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <Image
        src={imageError && fallback ? fallback : src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => {
          if (fallback && !imageError) {
            setImageError(true)
          }
        }}
      />
    </div>
  )
}
