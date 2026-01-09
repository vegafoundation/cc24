'use client'

import { useState } from 'react'
import { Mail, Send, Check } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simuliere API-Call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmitted(true)
    setLoading(false)
    setEmail('')

    // Reset nach 3 Sekunden
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Mail className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Verpassen Sie keine Angebote mehr
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Erhalten Sie exklusive Angebote und Neuigkeiten direkt in Ihr Postfach
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ihre E-Mail-Adresse"
                  required
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-primary-500 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Abonnieren
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-6 flex items-center gap-3"
              >
                <Check className="w-6 h-6" />
                <p className="text-lg">Vielen Dank! Sie erhalten nun unsere Newsletter.</p>
              </motion.div>
            )}

            <p className="text-sm opacity-75 mt-4">
              Abmeldung jederzeit möglich. Keine Spam-Mails. Datenschutz respektiert.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
