'use client'

import { motion } from 'framer-motion'
import { Car, CreditCard, FileCheck, HeadphonesIcon } from 'lucide-react'

const services = [
  {
    icon: Car,
    title: 'Fahrzeugsuche',
    description: 'Über 1.000 geprüfte Gebrauchtwagen in unserem Bestand.',
  },
  {
    icon: CreditCard,
    title: 'Finanzierung',
    description: 'Transparente Konditionen, faire Zinsen, schnelle Entscheidung.',
  },
  {
    icon: FileCheck,
    title: 'Vollständige Dokumentation',
    description: 'Alle Unterlagen komplett, rechtssicher, sofort verfügbar.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Persönliche Beratung',
    description: 'Unser Team steht Ihnen jederzeit zur Verfügung.',
  },
]

export default function Services() {
  return (
    <section className="py-20 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-display font-bold text-center mb-12 bg-gradient-to-r from-vega-cyan to-vega-emerald bg-clip-text text-transparent"
        >
          Unsere Leistungen
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900 p-6 rounded-lg border border-vega-cyan/20 hover:border-vega-cyan/40 transition"
            >
              <service.icon className="w-12 h-12 text-vega-cyan mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
