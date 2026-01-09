'use client'

import { useState } from 'react'
import { Phone, Mail, MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function QuickContact() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-primary-500 text-white rounded-full p-4 shadow-2xl z-50 hover:bg-primary-600 transition-colors"
        aria-label="Kontakt öffnen"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Contact Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-8 right-8 bg-white rounded-lg shadow-2xl z-50 w-80 max-w-[calc(100vw-2rem)]"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Kontakt</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Schließen"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <a
                    href="tel:+49551"
                    className="flex items-center gap-3 p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors group"
                  >
                    <div className="bg-primary-500 text-white rounded-full p-2 group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Anrufen</p>
                      <p className="text-sm text-gray-600">+49 (0) 551 / XXX-XXXX</p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@carcompany24-gmbh.de"
                    className="flex items-center gap-3 p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors group"
                  >
                    <div className="bg-secondary-500 text-white rounded-full p-2 group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">E-Mail</p>
                      <p className="text-sm text-gray-600">info@carcompany24-gmbh.de</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/49123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                  >
                    <div className="bg-green-500 text-white rounded-full p-2 group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">WhatsApp</p>
                      <p className="text-sm text-gray-600">Sofort antworten</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
