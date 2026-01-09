'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-vega-cyan/10 via-transparent to-vega-emerald/10" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-vega-cyan via-vega-emerald to-vega-gold bg-clip-text text-transparent"
        >
          CarCompany24
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Premium Gebrauchtwagen mit integrierter Finanzierung. 
          Transparent, fair, professionell.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/fahrzeuge"
            className="px-8 py-4 bg-vega-cyan text-gray-900 font-semibold rounded-lg hover:bg-vega-cyan/80 transition transform hover:scale-105"
          >
            Fahrzeuge entdecken
          </Link>
          <Link
            href="/finanzierung"
            className="px-8 py-4 border-2 border-vega-cyan text-vega-cyan font-semibold rounded-lg hover:bg-vega-cyan/10 transition"
          >
            Finanzierung berechnen
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
