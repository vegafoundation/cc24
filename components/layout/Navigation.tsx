'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-vega-cyan/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <svg width="120" height="36" viewBox="0 0 200 60" className="h-8 w-auto">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor:'#00D9FF',stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#10B981',stopOpacity:1}} />
                </linearGradient>
              </defs>
              <text x="10" y="40" fontFamily="Orbitron, monospace" fontSize="32" fontWeight="bold" fill="url(#logoGradient)">
                CC24
              </text>
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-vega-cyan transition">
              Startseite
            </Link>
            <Link href="/fahrzeuge" className="text-white hover:text-vega-cyan transition">
              Fahrzeuge
            </Link>
            <Link href="/finanzierung" className="text-white hover:text-vega-cyan transition">
              Finanzierung
            </Link>
            <Link href="/vavsr" className="text-white hover:text-vega-cyan transition">
              VAVSR
            </Link>
            <Link href="/boerse" className="text-white hover:text-vega-cyan transition">
              Börse
            </Link>
            <Link href="/admin" className="text-white hover:text-vega-cyan transition">
              Admin
            </Link>
            <Link href="/kontakt" className="text-white hover:text-vega-cyan transition">
              Kontakt
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/" className="block text-white hover:text-vega-cyan transition">
              Startseite
            </Link>
            <Link href="/fahrzeuge" className="block text-white hover:text-vega-cyan transition">
              Fahrzeuge
            </Link>
            <Link href="/finanzierung" className="block text-white hover:text-vega-cyan transition">
              Finanzierung
            </Link>
            <Link href="/vavsr" className="block text-white hover:text-vega-cyan transition">
              VAVSR
            </Link>
            <Link href="/boerse" className="block text-white hover:text-vega-cyan transition">
              Börse
            </Link>
            <Link href="/admin" className="block text-white hover:text-vega-cyan transition">
              Admin
            </Link>
            <Link href="/kontakt" className="block text-white hover:text-vega-cyan transition">
              Kontakt
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
