'use client'

import { Wrench, Car, CreditCard, HeadphonesIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/animations/ScrollReveal'

const services = [
  {
    icon: Car,
    title: 'Fahrzeugverkauf',
    description: 'Qualitätsgeprüfte Gebrauchtwagen in verschiedenen Preisklassen',
    color: 'primary',
  },
  {
    icon: CreditCard,
    title: 'Finanzierung',
    description: 'Auch bei negativer Schufa - individuelle Lösungen für jeden',
    color: 'secondary',
  },
  {
    icon: Wrench,
    title: 'Service & Reparatur',
    description: 'Professionelle Wartung und Reparatur für alle Marken',
    color: 'accent',
  },
  {
    icon: HeadphonesIcon,
    title: 'Beratung',
    description: 'Persönliche Beratung vor, während und nach dem Kauf',
    color: 'primary',
  },
]

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Unsere Leistungen
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Alles aus einer Hand für Ihren Fahrzeugkauf
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            const colorClasses = {
              primary: 'bg-primary-100 text-primary-500',
              secondary: 'bg-secondary-100 text-secondary-500',
              accent: 'bg-accent-100 text-accent-500',
            }

            return (
              <ScrollReveal
                key={index}
                direction="up"
                delay={index * 0.1}
                duration={0.5}
              >
                <motion.div
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-primary-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:via-primary-500/5 group-hover:to-primary-500/10 transition-all duration-500 rounded-lg" />
                  
                  <div className="relative z-10">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${colorClasses[service.color as keyof typeof colorClasses]}`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
