'use client'

import { useState, useEffect } from 'react'
import { getDomainConfig, DOMAIN_CONFIGS } from '@/lib/domains'
import { Globe, Sparkles, Home } from 'lucide-react'
import Link from 'next/link'

export default function DomainSelector() {
  const [currentConfig, setCurrentConfig] = useState<any>(null)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    setCurrentConfig(getDomainConfig())
  }, [])

  if (!currentConfig) return null

  const domains = [
    { type: 'online', config: DOMAIN_CONFIGS.online, icon: Globe },
    { type: 'vip', config: DOMAIN_CONFIGS.vip, icon: Sparkles },
    { type: 'local', config: DOMAIN_CONFIGS.local, icon: Home },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
      >
        <span className="text-sm font-semibold">{currentConfig.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[200px] z-50">
          <div className="py-2">
            {domains.map(({ type, config, icon: Icon }) => (
              <Link
                key={type}
                href={type === 'local' ? '/' : `/${type}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <Icon className="w-5 h-5" style={{ color: config.primaryColor }} />
                <div>
                  <div className="font-semibold text-sm">{config.name}</div>
                  <div className="text-xs text-gray-500">{config.domain}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
