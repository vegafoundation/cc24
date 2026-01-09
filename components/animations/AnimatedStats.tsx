'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedStatProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
}

function AnimatedStat({ value, suffix = '', prefix = '', duration = 2000, decimals = 0 }: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const startValue = 0
    const endValue = value

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = startValue + (endValue - startValue) * easeOut

      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(endValue)
      }
    }

    animate()
  }, [isInView, value, duration])

  return (
    <span ref={ref}>
      {prefix}
      {displayValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
      {suffix}
    </span>
  )
}

export default AnimatedStat
