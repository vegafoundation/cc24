'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

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
            className="bg-gray-800 p-8 rounded-lg border border-vega-cyan/20"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              Finanzierungsrechner
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Fahrzeugpreis</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                  placeholder="25.000 €"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Anzahlung</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                  placeholder="5.000 €"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Laufzeit</label>
                <select className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white">
                  <option>36 Monate</option>
                  <option>48 Monate</option>
                  <option>60 Monate</option>
                  <option>72 Monate</option>
                </select>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <p className="text-gray-300 mb-2">Geschätzte monatliche Rate:</p>
                <p className="text-3xl font-bold text-vega-cyan">ca. 450 €</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
