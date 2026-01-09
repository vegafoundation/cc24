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
            <span className="text-2xl font-display font-bold text-vega-cyan">
              CC24
            </span>
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
            <Link href="/hub" className="text-white hover:text-vega-cyan transition">
              Hub
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
            <Link href="/hub" className="block text-white hover:text-vega-cyan transition">
              Hub
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
