'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Car, Fuel, Gauge, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import ScrollReveal from '@/components/animations/ScrollReveal'
import ParallaxImage from '@/components/animations/ParallaxImage'

// Mock data - wird später durch API ersetzt
const featuredVehicles = [
  {
    id: 1,
    make: 'BMW',
    model: '320d',
    year: 2018,
    price: 18900,
    mileage: 125000,
    fuel: 'Diesel',
    image: '/images/vehicles/exterior/bmw-320d-2018.jpg',
    fallbackImage: '/images/vehicles/exterior/placeholder.jpg',
  },
  {
    id: 2,
    make: 'Mercedes-Benz',
    model: 'C 220 d',
    year: 2019,
    price: 22900,
    mileage: 98000,
    fuel: 'Diesel',
    image: '/images/vehicles/exterior/mercedes-c220d-2019.jpg',
    fallbackImage: '/images/vehicles/exterior/placeholder.jpg',
  },
  {
    id: 3,
    make: 'VW',
    model: 'Golf 7',
    year: 2017,
    price: 12900,
    mileage: 145000,
    fuel: 'Benzin',
    image: '/images/vehicles/exterior/vw-golf7-2017.jpg',
    fallbackImage: '/images/vehicles/exterior/placeholder.jpg',
  },
]

export default function VehicleShowcase() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Unsere Fahrzeuge
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Qualitätsgeprüfte Gebrauchtwagen in verschiedenen Preisklassen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVehicles.map((vehicle, index) => (
            <ScrollReveal
              key={vehicle.id}
              direction="up"
              delay={index * 0.1}
              duration={0.5}
            >
              <Link
                href={`/fahrzeuge/${vehicle.id}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 block"
              >
                <motion.div
                  className="relative h-64 bg-gray-200 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <ParallaxImage
                    src={vehicle.image}
                    fallback={vehicle.fallbackImage}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    speed={0.3}
                    className="object-cover"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Info auf Hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-semibold">
                      Jetzt ansehen →
                    </p>
                  </div>
                  <motion.div
                    className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {vehicle.year}
                  </motion.div>
                </motion.div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {vehicle.make} {vehicle.model}
                </h3>
                <div className="flex items-center gap-4 text-gray-600 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Gauge className="w-4 h-4" />
                    <span>{vehicle.mileage.toLocaleString('de-DE')} km</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel className="w-4 h-4" />
                    <span>{vehicle.fuel}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary-500">
                    {vehicle.price.toLocaleString('de-DE')} €
                  </span>
                  <span className="text-sm text-gray-500">Details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/fahrzeuge"
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
          >
            Alle Fahrzeuge ansehen
            <Car className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
