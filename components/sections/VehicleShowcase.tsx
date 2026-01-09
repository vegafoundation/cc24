'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { vehicleApi, Vehicle } from '@/lib/api'

export default function VehicleShowcase() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehicleApi.getVehicles({ limit: 6 })
        setVehicles(data)
      } catch (error) {
        console.error('Error fetching vehicles:', error)
        // Fallback to empty array on error
        setVehicles([])
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-display font-bold text-center mb-12 bg-gradient-to-r from-vega-cyan to-vega-emerald bg-clip-text text-transparent"
          >
            Unsere Premium Fahrzeuge
          </motion.h2>
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <div className="w-8 h-8 border-4 border-vega-cyan border-t-transparent rounded-full animate-spin"></div>
            <span>Lade Fahrzeuge von Mobile.de...</span>
          </div>
        </div>
      </section>
    )
  }

  if (vehicles.length === 0) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-display font-bold text-center mb-12 bg-gradient-to-r from-vega-cyan to-vega-emerald bg-clip-text text-transparent"
          >
            Unsere Premium Fahrzeuge
          </motion.h2>
          <div className="text-center text-gray-400">
            <p className="mb-4">Noch keine Fahrzeuge verfügbar.</p>
            <p className="text-sm">Bitte synchronisieren Sie Fahrzeuge von Mobile.de.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-display font-bold text-center mb-12 bg-gradient-to-r from-vega-cyan to-vega-emerald bg-clip-text text-transparent"
        >
          Unsere Premium Fahrzeuge
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-vega-cyan/20 transition"
            >
              <div className="relative h-64 bg-gray-700">
                {vehicle.main_image_url || (vehicle.image_urls && vehicle.image_urls[0]) ? (
                  <img
                    src={vehicle.main_image_url || vehicle.image_urls[0]}
                    alt={vehicle.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Kein Bild
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {vehicle.title}
                </h3>
                <div className="text-gray-400 text-sm mb-2">
                  {vehicle.brand && vehicle.model && `${vehicle.brand} ${vehicle.model}`}
                  {vehicle.year && ` • ${vehicle.year}`}
                  {vehicle.mileage && ` • ${vehicle.mileage.toLocaleString('de-DE')} km`}
                </div>
                <p className="text-2xl font-bold text-vega-cyan mb-4">
                  {vehicle.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                </p>
                <Link
                  href={`/fahrzeuge/${vehicle.id}`}
                  className="block w-full text-center px-4 py-2 bg-vega-cyan text-gray-900 font-semibold rounded hover:bg-vega-cyan/80 transition"
                >
                  Details ansehen
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/fahrzeuge"
            className="inline-block px-8 py-4 border-2 border-vega-cyan text-vega-cyan font-semibold rounded-lg hover:bg-vega-cyan/10 transition"
          >
            Alle Fahrzeuge ansehen
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
