'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ImageParallaxProps {
  src: string
  alt: string
  speed?: number
  className?: string
  fallback?: string
}

export default function ImageParallax({
  src,
  alt,
  speed = 0.5,
  className = '',
  fallback,
}: ImageParallaxProps) {
  const [scrollY, setScrollY] = useState(0)
  const [imageError, setImageError] = useState(false)

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
