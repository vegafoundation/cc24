'use client'

import { useEffect, useState } from 'react'
import { getDomainConfig } from '@/lib/domains'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function DomainHero() {
  const [config, setConfig] = useState<any>(null)

  useEffect(() => {
    setConfig(getDomainConfig())
  }, [])

  if (!config) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Domain-spezifischer Hintergrund */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(135deg, ${config.primaryColor}22 0%, ${config.secondaryColor}22 100%)`
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Domain Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <Sparkles className="w-5 h-5" style={{ color: config.primaryColor }} />
              <span className="font-semibold">{config.name}</span>
            </div>
          </motion.div>

          {/* Hauptüberschrift */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span style={{ color: config.primaryColor }}>Car</span>
            <span className="text-white">Company</span>
            <span 
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})`
              }}
            >
              24
            </span>
          </motion.h1>

          {/* Beschreibung */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12"
          >
            {config.description}
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {config.features.map((feature: string, index: number) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
              >
                <p className="text-sm text-gray-300">{feature}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link
              href="/fahrzeuge"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})`
              }}
            >
              {config.cta}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
