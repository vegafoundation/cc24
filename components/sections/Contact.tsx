'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import OfferForm from '@/components/contact/OfferForm'
import OfferForm from '@/components/contact/OfferForm'

export default function Contact() {
  return (
    <section className="py-20 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-display font-bold text-center mb-12 bg-gradient-to-r from-vega-cyan to-vega-emerald bg-clip-text text-transparent"
        >
          Kontaktieren Sie uns
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-gray-900 p-6 rounded-lg border border-vega-cyan/20"
          >
            <Mail className="w-12 h-12 text-vega-cyan mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
            <p className="text-gray-400">info@carcompany24.de</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center bg-gray-900 p-6 rounded-lg border border-vega-cyan/20"
          >
            <Phone className="w-12 h-12 text-vega-cyan mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Telefon</h3>
            <p className="text-gray-400">+49 (0) XXX XXX XXX</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center bg-gray-900 p-6 rounded-lg border border-vega-cyan/20"
          >
            <MapPin className="w-12 h-12 text-vega-cyan mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Adresse</h3>
            <p className="text-gray-400">Musterstraße 123<br />12345 Musterstadt</p>
          </motion.div>
        </div>

        <div className="mt-12">
          <OfferForm />
        </div>
      </div>
    </section>
  )
}
