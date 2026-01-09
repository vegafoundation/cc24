'use client'

import { Award, Shield, CheckCircle, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/animations/ScrollReveal'
import AnimatedStat from '@/components/animations/AnimatedStats'

export default function TrustSignals() {
  const stats = [
    {
      icon: Star,
      value: 4.9,
      suffix: '/5.0',
      label: 'Bewertung auf Mobile.de',
      color: 'primary',
      delay: 0,
    },
    {
      icon: Shield,
      value: 1,
      suffix: ' Jahr',
      label: 'Gewährleistung inklusive',
      color: 'secondary',
      delay: 0.1,
    },
    {
      icon: CheckCircle,
      value: 100,
      suffix: '%',
      label: 'Empfehlungsrate',
      color: 'accent',
      delay: 0.2,
    },
    {
      icon: Award,
      value: 2020,
      suffix: '',
      label: 'Erfahrung & Vertrauen',
      color: 'primary',
      delay: 0.3,
    },
  ]

  const colorClasses = {
    primary: 'bg-primary-100 text-primary-500',
    secondary: 'bg-secondary-100 text-secondary-500',
    accent: 'bg-accent-100 text-accent-500',
  }

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Subtle background particles */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-secondary-500 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-accent-500 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
        <div className="absolute bottom-10 right-1/3 w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <ScrollReveal
                key={index}
                direction="up"
                delay={stat.delay}
                duration={0.5}
              >
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 ${colorClasses[stat.color as keyof typeof colorClasses]} rounded-full mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    <AnimatedStat
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.value < 10 ? 1 : 0}
                    />
                  </h3>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-secondary-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">1 Jahr</h3>
            <p className="text-gray-600 text-sm">Gewährleistung inklusive</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-accent-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
            <p className="text-gray-600 text-sm">Empfehlungsrate</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <Award className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Seit 2020</h3>
            <p className="text-gray-600 text-sm">Erfahrung & Vertrauen</p>
          </div>
        </div>
      </div>
    </section>
  )
}
