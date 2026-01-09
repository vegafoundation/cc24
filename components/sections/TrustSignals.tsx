'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Users, TrendingUp } from 'lucide-react'

const signals = [
  { icon: Shield, text: 'Geprüfte Qualität', color: 'text-vega-cyan' },
  { icon: Award, text: 'Zertifizierte Händler', color: 'text-vega-emerald' },
  { icon: Users, text: '10.000+ zufriedene Kunden', color: 'text-vega-gold' },
  { icon: TrendingUp, text: 'Beste Preise garantiert', color: 'text-vega-cyan' },
]

export default function TrustSignals() {
  return (
    <section className="py-20 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {signals.map((signal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <signal.icon className={`w-12 h-12 mx-auto mb-4 ${signal.color}`} />
              <p className="text-white font-semibold">{signal.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
