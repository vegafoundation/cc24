'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Car } from 'lucide-react'
import { getDomainConfig } from '@/lib/domains'
import DomainSelector from '@/components/domain/DomainSelector'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [domainConfig, setDomainConfig] = useState<any>(null)

  useEffect(() => {
    setDomainConfig(getDomainConfig())
  }, [])

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Car 
              className="w-8 h-8" 
              style={{ color: domainConfig?.primaryColor || '#E63946' }} 
            />
            <span className="text-xl font-bold">
              <span style={{ color: domainConfig?.primaryColor || '#E63946' }}>
                Car
              </span>
              <span className="text-gray-900">Company</span>
              <span style={{ color: domainConfig?.primaryColor || '#E63946' }}>
                24
              </span>
              {domainConfig && (
                <span className="text-xs ml-1 opacity-70">
                  {domainConfig.domain.includes('.') ? `.${domainConfig.domain.split('.')[1]}` : ''}
                </span>
              )}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-primary-500 transition-colors">
              Start
            </Link>
            <Link href="/boerse" className="text-gray-700 hover:text-primary-500 transition-colors">
              Börse
            </Link>
            <Link href="/vavsr" className="text-gray-700 hover:text-primary-500 transition-colors">
              VAVSR
            </Link>
            <Link href="/fahrzeuge" className="text-gray-700 hover:text-primary-500 transition-colors">
              Fahrzeuge
            </Link>
            <Link href="/finanzierung" className="text-gray-700 hover:text-primary-500 transition-colors">
              Finanzierung
            </Link>
            <Link href="/#services" className="text-gray-700 hover:text-primary-500 transition-colors">
              Service
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-primary-500 transition-colors">
              Kontakt
            </Link>
            <Link
              href="/#contact"
              className="px-6 py-2 rounded-lg transition-colors text-white font-semibold"
              style={{
                background: domainConfig 
                  ? `linear-gradient(135deg, ${domainConfig.primaryColor}, ${domainConfig.secondaryColor})`
                  : '#E63946'
              }}
            >
              {domainConfig?.cta || 'Jetzt anfragen'}
            </Link>
            <DomainSelector />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-primary-500 transition-colors"
              >
                Start
              </Link>
              <Link
                href="/fahrzeuge"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-primary-500 transition-colors"
              >
                Fahrzeuge
              </Link>
              <Link
                href="/finanzierung"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-primary-500 transition-colors"
              >
                Finanzierung
              </Link>
              <Link
                href="/#services"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-primary-500 transition-colors"
              >
                Service
              </Link>
              <Link
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-primary-500 transition-colors"
              >
                Kontakt
              </Link>
              <Link
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg text-center transition-colors"
              >
                Jetzt anfragen
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
