'use client'

import { useEffect, useRef } from 'react'

interface Vehicle360ViewerProps {
  images: string[] // Array von Bild-URLs für 360° Sequenz
  amount?: number // Anzahl der Frames (Standard: 36)
  speed?: number // Rotationsgeschwindigkeit
  autoplay?: boolean
}

export default function Vehicle360Viewer({
  images,
  amount = 36,
  speed = 100,
  autoplay = false,
}: Vehicle360ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || images.length === 0) return

    // Dynamisches Laden des js-cloudimage-360-view Scripts
    const loadScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (document.querySelector('script[src*="js-cloudimage-360-view"]')) {
          resolve()
          return
        }

        const script = document.createElement('script')
        script.src = 'https://scaleflex.cloudimg.io/v7/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js'
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Failed to load 360 viewer'))
        document.head.appendChild(script)
      })
    }

    loadScript()
      .then(() => {
        // Warten bis das Script geladen ist
        if (typeof (window as any).cloudimage360View !== 'undefined') {
          initializeViewer()
        } else {
          // Fallback: Manuelles 360° Viewer mit Canvas
          initializeManualViewer()
        }
      })
      .catch(() => {
        // Fallback zu manuellem Viewer
        initializeManualViewer()
      })

    function initializeViewer() {
      if (!containerRef.current) return

      // js-cloudimage-360-view Implementation
      const viewer = new (window as any).cloudimage360View({
        container: containerRef.current,
        folder: images[0].substring(0, images[0].lastIndexOf('/') + 1),
        filename: images[0].substring(images[0].lastIndexOf('/') + 1).replace(/\d+/, '{index}'),
        amount: amount,
        speed: speed,
        autoplay: autoplay,
        magnifier: 3,
      })

      return () => {
        if (viewer && viewer.destroy) {
          viewer.destroy()
        }
      }
    }

    function initializeManualViewer() {
      // Fallback: Einfacher Image-Slider für 360° Sequenz
      if (!containerRef.current) return

      let currentIndex = 0
      let isDragging = false
      let startX = 0

      const canvas = document.createElement('canvas')
      canvas.width = 800
      canvas.height = 600
      canvas.style.width = '100%'
      canvas.style.height = 'auto'
      canvas.style.cursor = 'grab'
      canvas.style.touchAction = 'none'
      containerRef.current.innerHTML = ''
      containerRef.current.appendChild(canvas)

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const img = new Image()
      img.crossOrigin = 'anonymous'

      const loadImage = (index: number) => {
        img.src = images[index % images.length]
        img.onload = () => {
          const scale = Math.min(canvas.width / img.width, canvas.height / img.height)
          const x = (canvas.width - img.width * scale) / 2
          const y = (canvas.height - img.height * scale) / 2
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
        }
      }

      loadImage(0)

      const handleMove = (clientX: number) => {
        if (!isDragging) return
        const deltaX = clientX - startX
        const sensitivity = 2
        const newIndex = Math.round((currentIndex - deltaX / sensitivity) % images.length)
        if (newIndex !== currentIndex && newIndex >= 0) {
          currentIndex = newIndex
          loadImage(currentIndex)
        }
      }

      canvas.addEventListener('mousedown', (e) => {
        isDragging = true
        startX = e.clientX
        canvas.style.cursor = 'grabbing'
      })

      canvas.addEventListener('mousemove', (e) => {
        handleMove(e.clientX)
      })

      canvas.addEventListener('mouseup', () => {
        isDragging = false
        canvas.style.cursor = 'grab'
      })

      canvas.addEventListener('mouseleave', () => {
        isDragging = false
        canvas.style.cursor = 'grab'
      })

      // Touch support
      canvas.addEventListener('touchstart', (e) => {
        isDragging = true
        startX = e.touches[0].clientX
      })

      canvas.addEventListener('touchmove', (e) => {
        e.preventDefault()
        handleMove(e.touches[0].clientX)
      })

      canvas.addEventListener('touchend', () => {
        isDragging = false
      })
    }
  }, [images, amount, speed, autoplay])

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="cloudimage-360 w-full bg-gray-100 rounded-lg overflow-hidden"
        style={{ minHeight: '400px' }}
      />
      <p className="text-sm text-gray-500 mt-2 text-center">
        Ziehen Sie mit der Maus oder dem Finger, um das Fahrzeug zu drehen
      </p>
    </div>
  )
}
