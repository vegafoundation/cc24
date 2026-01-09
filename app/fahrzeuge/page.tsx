'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { vehicleApi, Vehicle } from '@/lib/api'

export default function FahrzeugePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    min_price: '',
    max_price: '',
  })

  useEffect(() => {
    fetchVehicles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchVehicles = async () => {
    try {
      setLoading(true)
      const params: any = { limit: 50 }
      if (filters.make) params.make = filters.make
      if (filters.model) params.model = filters.model
      if (filters.min_price) params.min_price = parseInt(filters.min_price)
      if (filters.max_price) params.max_price = parseInt(filters.max_price)
      
      const data = await vehicleApi.getVehicles(params)
      setVehicles(data)
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleApplyFilters = () => {
    fetchVehicles()
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400 py-20">Lade Fahrzeuge...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-display font-bold text-center mb-12 bg-gradient-to-r from-vega-cyan to-vega-emerald bg-clip-text text-transparent"
        >
          Unsere Fahrzeugflotte
        </motion.h1>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Filter</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Marke</label>
              <input
                type="text"
                value={filters.make}
                onChange={(e) => handleFilterChange('make', e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                placeholder="z.B. BMW"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Modell</label>
              <input
                type="text"
                value={filters.model}
                onChange={(e) => handleFilterChange('model', e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                placeholder="z.B. 320d"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Min. Preis</label>
              <input
                type="number"
                value={filters.min_price}
                onChange={(e) => handleFilterChange('min_price', e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Max. Preis</label>
              <input
                type="number"
                value={filters.max_price}
                onChange={(e) => handleFilterChange('max_price', e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                placeholder="100000"
              />
            </div>
          </div>
          <button
            onClick={handleApplyFilters}
            className="mt-4 px-6 py-2 bg-vega-cyan text-gray-900 font-semibold rounded hover:bg-vega-cyan/80 transition"
          >
            Filter anwenden
          </button>
        </div>

        {/* Vehicles Grid */}
        {vehicles.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p className="mb-4">Keine Fahrzeuge gefunden.</p>
            <p className="text-sm">Bitte passen Sie Ihre Filter an oder synchronisieren Sie Fahrzeuge von Mobile.de.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
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
                  <div className="text-gray-400 text-sm mb-2 space-y-1">
                    {vehicle.brand && vehicle.model && (
                      <p>{vehicle.brand} {vehicle.model}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {vehicle.year && <span>Baujahr: {vehicle.year}</span>}
                      {vehicle.mileage && <span>• {vehicle.mileage.toLocaleString('de-DE')} km</span>}
                      {vehicle.fuel_type && <span>• {vehicle.fuel_type}</span>}
                      {vehicle.power_hp && <span>• {vehicle.power_hp} PS</span>}
                    </div>
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
        )}
      </div>
    </div>
  )
}
