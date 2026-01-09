'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { vehicleApi, Vehicle } from '@/lib/api'

interface VehicleDetailClientProps {
  vehicleId: string
}

export default function VehicleDetailClient({ vehicleId }: VehicleDetailClientProps) {
  const id = parseInt(vehicleId)
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id || isNaN(id)) {
      setError('Ungültige Fahrzeug-ID')
      setLoading(false)
      return
    }

    const fetchVehicle = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await vehicleApi.getVehicle(id)
        setVehicle(data)
      } catch (err: any) {
        console.error('Error fetching vehicle:', err)
        setError('Fahrzeug konnte nicht geladen werden')
      } finally {
        setLoading(false)
      }
    }

    fetchVehicle()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-16 h-16 border-4 border-vega-cyan border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 text-lg">Lade Fahrzeugdetails von Mobile.de...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400 py-20">
            <p className="mb-4">{error || 'Fahrzeug nicht gefunden.'}</p>
            <Link href="/fahrzeuge" className="text-vega-cyan hover:underline">
              Zurück zur Übersicht
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/fahrzeuge" className="text-vega-cyan hover:underline mb-6 inline-block">
          ← Zurück zur Übersicht
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            {vehicle.main_image_url || (vehicle.image_urls && vehicle.image_urls[0]) ? (
              <div className="mb-4">
                <img
                  src={vehicle.main_image_url || vehicle.image_urls[0]}
                  alt={vehicle.title}
                  className="w-full h-96 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200'
                  }}
                />
              </div>
            ) : null}
            
            {vehicle.image_urls && vehicle.image_urls.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {vehicle.image_urls.slice(1, 5).map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`${vehicle.title} - Bild ${index + 2}`}
                    className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80 transition"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300'
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-vega-cyan to-vega-emerald bg-clip-text text-transparent"
            >
              {vehicle.title}
            </motion.h1>

            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <p className="text-4xl font-bold text-vega-cyan mb-6">
                {vehicle.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                {vehicle.brand && (
                  <div>
                    <span className="text-gray-400">Marke:</span>
                    <p className="text-white font-semibold">{vehicle.brand}</p>
                  </div>
                )}
                {vehicle.model && (
                  <div>
                    <span className="text-gray-400">Modell:</span>
                    <p className="text-white font-semibold">{vehicle.model}</p>
                  </div>
                )}
                {vehicle.year && (
                  <div>
                    <span className="text-gray-400">Baujahr:</span>
                    <p className="text-white font-semibold">{vehicle.year}</p>
                  </div>
                )}
                {vehicle.mileage && (
                  <div>
                    <span className="text-gray-400">Kilometerstand:</span>
                    <p className="text-white font-semibold">{vehicle.mileage.toLocaleString('de-DE')} km</p>
                  </div>
                )}
                {vehicle.fuel_type && (
                  <div>
                    <span className="text-gray-400">Kraftstoff:</span>
                    <p className="text-white font-semibold">{vehicle.fuel_type}</p>
                  </div>
                )}
                {vehicle.power_hp && (
                  <div>
                    <span className="text-gray-400">Leistung:</span>
                    <p className="text-white font-semibold">{vehicle.power_hp} PS ({vehicle.power_kw} kW)</p>
                  </div>
                )}
                {vehicle.transmission && (
                  <div>
                    <span className="text-gray-400">Getriebe:</span>
                    <p className="text-white font-semibold">{vehicle.transmission}</p>
                  </div>
                )}
                {vehicle.doors && (
                  <div>
                    <span className="text-gray-400">Türen:</span>
                    <p className="text-white font-semibold">{vehicle.doors}</p>
                  </div>
                )}
                {vehicle.seats && (
                  <div>
                    <span className="text-gray-400">Sitze:</span>
                    <p className="text-white font-semibold">{vehicle.seats}</p>
                  </div>
                )}
                {vehicle.color && (
                  <div>
                    <span className="text-gray-400">Farbe:</span>
                    <p className="text-white font-semibold">{vehicle.color}</p>
                  </div>
                )}
                {vehicle.first_registration && (
                  <div>
                    <span className="text-gray-400">Erstzulassung:</span>
                    <p className="text-white font-semibold">{vehicle.first_registration}</p>
                  </div>
                )}
              </div>
            </div>

            {vehicle.description && (
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">Beschreibung</h2>
                <p className="text-gray-300">{vehicle.description}</p>
              </div>
            )}

            {vehicle.dealer_name && (
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">Händler</h2>
                <p className="text-white font-semibold">{vehicle.dealer_name}</p>
                {vehicle.dealer_location && (
                  <p className="text-gray-400">{vehicle.dealer_location}</p>
                )}
              </div>
            )}

            <div className="space-y-3">
              <div className="flex gap-4">
                <Link
                  href={`/vavsr?vehicleId=${vehicle.id}`}
                  className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-vega-cyan to-vega-emerald text-gray-900 font-semibold rounded-lg hover:opacity-90 transition"
                >
                  🎥 360° Showroom öffnen
                </Link>
                <Link
                  href="/finanzierung"
                  className="flex-1 text-center px-6 py-3 bg-vega-cyan text-gray-900 font-semibold rounded-lg hover:bg-vega-cyan/80 transition"
                >
                  💰 Finanzierung berechnen
                </Link>
              </div>
              <div className="flex gap-4">
                <Link
                  href="/#contact"
                  className="flex-1 text-center px-6 py-3 border-2 border-vega-cyan text-vega-cyan font-semibold rounded-lg hover:bg-vega-cyan/10 transition"
                >
                  📧 Verkaufsanfrage senden
                </Link>
                {vehicle.mobile_de_url && (
                  <a
                    href={vehicle.mobile_de_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-6 py-3 border-2 border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-gray-500 transition"
                  >
                    🔗 Mobile.de
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
