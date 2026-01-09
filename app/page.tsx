'use client'

import { motion } from 'framer-motion'
import Hero from '@/components/sections/Hero'
import TrustSignals from '@/components/sections/TrustSignals'
import VehicleShowcase from '@/components/sections/VehicleShowcase'
import Services from '@/components/sections/Services'
import Financing from '@/components/sections/Financing'
import Contact from '@/components/sections/Contact'
import ParticleBackground from '@/components/animations/ParticleBackground'

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <TrustSignals />
        <VehicleShowcase />
        <Services />
        <Financing />
        <Contact />
      </motion.div>
    </div>
  )
}
