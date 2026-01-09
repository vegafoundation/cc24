'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Car, Shield, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ParticleBackground from '@/components/animations/ParticleBackground'
import AnimatedBackground from '@/components/animations/AnimatedBackground'
import FloatingElements from '@/components/animations/FloatingElements'

export default function Hero() {
  // Hero-Bilder für Animation (aus Assets)
  const heroImages = [
    '/images/hero/hero-background.jpg',
    '/images/hero/showroom-night.jpg',
    '/images/hero/car-showroom.jpg',
    '/images/hero/interior-showroom.jpg',
  ].filter(Boolean)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background Images */}
      <AnimatedBackground images={heroImages} transitionDuration={6000} fadeDuration={1500} />
      
      {/* Particle Background */}
      <ParticleBackground
        particleCount={60}
        speed={0.3}
        color="#00D4D4"
        opacity={0.2}
      />
      
      {/* Floating Elements */}
      <FloatingElements />
      
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 z-[2]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(230, 57, 70, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, rgba(42, 157, 143, 0.3) 0%, transparent 50%)`
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-primary-500">Car</span>
              <span className="text-white">Company</span>
              <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">24</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light">
              Ihr zuverlässiger Partner für Gebrauchtwagen in Göttingen
            </p>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20"
          >
            <div className="flex items-center gap-1 text-yellow-400">
              {'★'.repeat(5)}
            </div>
            <span className="text-white font-semibold">4.9/5.0</span>
            <span className="text-gray-300">auf Mobile.de</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">28 Bewertungen</span>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              { icon: Car, color: 'primary-500', title: 'Kostenlose Lieferung', desc: 'Bis vor Ihre Haustür oder zum Bahnhof' },
              { icon: Shield, color: 'secondary-500', title: 'Finanzierung trotz Schufa', desc: 'Auch bei negativer Bonität möglich' },
              { icon: Clock, color: 'accent-500', title: 'Schnelle Antwort', desc: 'Innerhalb von 4 Stunden' },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className={`w-8 h-8 text-${feature.color} mx-auto mb-3`} />
                  </motion.div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/fahrzeuge"
                className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Fahrzeuge ansehen
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/finanzierung"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border border-white/20 transition-all duration-200 backdrop-blur-sm"
              >
                Finanzierung berechnen
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}
