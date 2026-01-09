'use client'

import Link from 'next/link'
import { Calculator, Shield, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/animations/ScrollReveal'
import ParticleBackground from '@/components/animations/ParticleBackground'

export default function Financing() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-600 text-white relative overflow-hidden">
      {/* Subtle particles */}
      <ParticleBackground
        particleCount={40}
        speed={0.2}
        color="#FFFFFF"
        opacity={0.15}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" delay={0} duration={0.6}>
            <div className="text-center mb-12">
              <motion.h2
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Finanzierung trotz Schufa
              </motion.h2>
              <motion.p
                className="text-xl opacity-90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Individuelle Lösungen für jeden - auch bei negativer Bonität
              </motion.p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Shield,
                title: 'PAngV-konform',
                description: 'Vollständig transparente Finanzierungsangebote gemäß Preisangabenverordnung',
                delay: 0.1,
              },
              {
                icon: CheckCircle,
                title: 'Schnelle Entscheidung',
                description: 'Unverbindliche Finanzierungsanfrage - Antwort innerhalb von 4 Stunden',
                delay: 0.2,
              },
              {
                icon: Calculator,
                title: 'Online-Rechner',
                description: 'Berechnen Sie Ihre monatliche Rate direkt online',
                delay: 0.3,
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <ScrollReveal
                  key={index}
                  direction="up"
                  delay={feature.delay}
                  duration={0.5}
                >
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8 mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="opacity-90 text-sm">{feature.description}</p>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>

          <ScrollReveal direction="up" delay={0.4} duration={0.5}>
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/finanzierung"
                  className="inline-flex items-center gap-2 bg-white text-primary-500 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Finanzierung berechnen
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Calculator className="w-5 h-5" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
