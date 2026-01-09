'use client'

import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/animations/ScrollReveal'
import ParticleBackground from '@/components/animations/ParticleBackground'

export default function Contact() {
  const contactItems = [
    {
      icon: MapPin,
      title: 'Adresse',
      content: (
        <>
          Adolf-Hoyer-Straße 12<br />
          37079 Göttingen
        </>
      ),
      color: 'primary',
      delay: 0,
    },
    {
      icon: Phone,
      title: 'Telefon',
      content: (
        <a href="tel:+49" className="hover:text-primary-400 transition-colors">
          +49 (0) 551 / XXX-XXXX
        </a>
      ),
      color: 'secondary',
      delay: 0.1,
    },
    {
      icon: Mail,
      title: 'E-Mail',
      content: (
        <a href="mailto:info@carcompany24-gmbh.de" className="hover:text-primary-400 transition-colors">
          info@carcompany24-gmbh.de
        </a>
      ),
      color: 'accent',
      delay: 0.2,
    },
    {
      icon: Clock,
      title: 'Öffnungszeiten',
      content: (
        <>
          Mo-Fr: 9:00 - 18:00<br />
          Sa: 9:00 - 14:00
        </>
      ),
      color: 'primary',
      delay: 0.3,
    },
  ]

  const colorClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    accent: 'bg-accent-500',
  }

  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Subtle particles */}
      <ParticleBackground
        particleCount={30}
        speed={0.2}
        color="#FFFFFF"
        opacity={0.1}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" delay={0} duration={0.6}>
            <div className="text-center mb-12">
              <motion.h2
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Kontakt
              </motion.h2>
              <motion.p
                className="text-xl text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Wir sind für Sie da - persönlich, telefonisch oder per E-Mail
              </motion.p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactItems.map((item, index) => {
              const Icon = item.icon
              return (
                <ScrollReveal
                  key={index}
                  direction="up"
                  delay={item.delay}
                  duration={0.5}
                >
                  <motion.div
                    className="text-center bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 ${colorClasses[item.color as keyof typeof colorClasses]} rounded-full mb-4`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.content}</p>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
