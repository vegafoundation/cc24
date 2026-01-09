'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import FinancingCalculator from '@/components/financing/FinancingCalculator'

export default function Financing() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-6 bg-gradient-to-r from-vega-cyan to-vega-emerald bg-clip-text text-transparent">
              Individuelle Finanzierung
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              Wir bieten Ihnen flexible Finanzierungsmöglichkeiten mit transparenten Konditionen. 
              Berechnen Sie jetzt Ihre monatliche Rate.
            </p>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li className="flex items-center">
                <span className="text-vega-cyan mr-2">✓</span>
                Zinsen ab 2,9% effektiv
              </li>
              <li className="flex items-center">
                <span className="text-vega-cyan mr-2">✓</span>
                Laufzeiten von 12-84 Monaten
              </li>
              <li className="flex items-center">
                <span className="text-vega-cyan mr-2">✓</span>
                Schnelle Entscheidung in 24h
              </li>
              <li className="flex items-center">
                <span className="text-vega-cyan mr-2">✓</span>
                PAngV-konforme Darstellung
              </li>
            </ul>
            <Link
              href="/finanzierung"
              className="inline-block px-8 py-4 bg-vega-cyan text-gray-900 font-semibold rounded-lg hover:bg-vega-cyan/80 transition transform hover:scale-105"
            >
              Finanzierung berechnen
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <FinancingCalculator />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
