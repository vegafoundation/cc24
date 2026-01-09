'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'

export default function OfferForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleId: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Here you would send to your backend API
    console.log('Verkaufsanfrage:', formData)
    
    setLoading(false)
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', vehicleId: '', message: '' })
    }, 3000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gray-900 p-8 rounded-lg border border-vega-cyan/20"
    >
      <h3 className="text-2xl font-semibold text-white mb-6">
        Verkaufsanfrage / Unverbindliches Angebot
      </h3>
      
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <CheckCircle className="w-16 h-16 text-vega-emerald mx-auto mb-4" />
          <p className="text-xl text-white mb-2">Anfrage erfolgreich versendet!</p>
          <p className="text-gray-400">Wir melden uns schnellstmöglich bei Ihnen.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:border-vega-cyan focus:outline-none"
              placeholder="Max Mustermann"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:border-vega-cyan focus:outline-none"
              placeholder="max@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Telefon</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:border-vega-cyan focus:outline-none"
              placeholder="+49 (0) XXX XXX XXX"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Fahrzeug-ID (optional)</label>
            <input
              type="text"
              value={formData.vehicleId}
              onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:border-vega-cyan focus:outline-none"
              placeholder="Fahrzeug-ID falls bekannt"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Nachricht</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:border-vega-cyan focus:outline-none"
              placeholder="Ihre Nachricht oder spezielle Anfrage..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-vega-cyan text-gray-900 font-semibold rounded-lg hover:bg-vega-cyan/80 transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                <span>Wird gesendet...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Verkaufsanfrage senden</span>
              </>
            )}
          </button>
        </form>
      )}
    </motion.div>
  )
}
