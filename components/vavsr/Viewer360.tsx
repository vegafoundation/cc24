'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Viewer360Props {
  images: string[]
  background: string
  vehicleTitle: string
}

const BACKGROUNDS: Record<string, { name: string; gradient: string }> = {
  vavsr_cyan: {
    name: 'VEGA Cyan',
    gradient: 'linear-gradient(135deg, #00D9FF 0%, #0099CC 100%)',
  },
  vavsr_emerald: {
    name: 'VEGA Emerald',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  },
  vavsr_gold: {
    name: 'VEGA Gold',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  },
  vavsr_dark: {
    name: 'VEGA Dark',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
  },
  showroom_white: {
    name: 'Showroom Weiß',
    gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)',
  },
  showroom_gray: {
    name: 'Showroom Grau',
    gradient: 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)',
  },
}

export default function Viewer360({ images, background, vehicleTitle }: Viewer360Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [autoRotate, setAutoRotate] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const bgConfig = BACKGROUNDS[background] || BACKGROUNDS.vavsr_cyan

  useEffect(() => {
    if (autoRotate && images.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, 150)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoRotate, images.length])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart(e.clientX)
    setAutoRotate(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || images.length === 0) return

    const delta = dragStart - e.clientX
    const sensitivity = 3
    const steps = Math.floor(Math.abs(delta) / sensitivity)

    if (steps > 0) {
      const direction = delta > 0 ? 1 : -1
      setCurrentIndex((prev) => {
        const newIndex = prev + direction * steps
        if (newIndex < 0) return images.length - 1
        if (newIndex >= images.length) return 0
        return newIndex
      })
      setDragStart(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setDragStart(e.touches[0].clientX)
    setAutoRotate(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || images.length === 0) return

    const delta = dragStart - e.touches[0].clientX
    const sensitivity = 3
    const steps = Math.floor(Math.abs(delta) / sensitivity)

    if (steps > 0) {
      const direction = delta > 0 ? 1 : -1
      setCurrentIndex((prev) => {
        const newIndex = prev + direction * steps
        if (newIndex < 0) return images.length - 1
        if (newIndex >= images.length) return 0
        return newIndex
      })
      setDragStart(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setAutoRotate(false)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setAutoRotate(false)
  }

  if (images.length === 0) {
    return (
      <div className="w-full h-[600px] bg-gray-800 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">Keine Bilder verfügbar</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative w-full h-[600px] rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ background: bgConfig.gradient }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Current Image */}
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${vehicleTitle} - View ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200'
          }}
        />

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition z-10"
          aria-label="Vorheriges Bild"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition z-10"
          aria-label="Nächstes Bild"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Auto-Rotate Toggle */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg transition z-10 ${
            autoRotate
              ? 'bg-vega-cyan text-gray-900'
              : 'bg-black/50 hover:bg-black/70 text-white'
          }`}
        >
          {autoRotate ? '⏸ Pause' : '▶ Auto-Rotate'}
        </button>

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm z-10">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setAutoRotate(false)
            }}
            className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition ${
              index === currentIndex
                ? 'border-vega-cyan ring-2 ring-vega-cyan/50'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200'
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
