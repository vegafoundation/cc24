'use client'

import { useEffect, useState } from 'react'
import { getDomainConfig, isProductionDomain } from '@/lib/domains'
import { X } from 'lucide-react'

export default function DomainBanner() {
  const [show, setShow] = useState(false)
  const [config, setConfig] = useState<any>(null)

  useEffect(() => {
    const config = getDomainConfig()
    setConfig(config)
    
    // Zeige Banner nur auf Production-Domains
    if (isProductionDomain()) {
      setShow(true)
    }
  }, [])

  if (!show || !config) return null

  return (
    <div className="relative bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold">🌐 {config.name}</span>
          <span className="opacity-90">|</span>
          <span className="opacity-90">{config.description}</span>
        </div>
        <button
          onClick={() => setShow(false)}
          className="hover:opacity-70 transition-opacity"
          aria-label="Banner schließen"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
