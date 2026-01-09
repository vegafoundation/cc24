'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Viewer360 from './Viewer360'
import BackgroundSelector from './BackgroundSelector'
import { vehicleApi, Vehicle } from '@/lib/api'

interface VAVSRShowroomProps {
  vehicleId?: number
}

export default function VAVSRShowroom({ vehicleId }: VAVSRShowroomProps) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [selectedBackground, setSelectedBackground] = useState('vavsr_cyan')
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    if (vehicleId) {
      fetchVehicle()
    } else {
      // Load first vehicle as demo
      loadDemoVehicle()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleId])

  const fetchVehicle = async () => {
    try {
      setLoading(true)
      const data = await vehicleApi.getVehicle(vehicleId!)
      setVehicle(data)
      setImages(data.image_urls || [])
    } catch (error) {
      console.error('Error fetching vehicle:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadDemoVehicle = async () => {
    try {
      setLoading(true)
      const vehicles = await vehicleApi.getVehicles({ limit: 1 })
      if (vehicles.length > 0) {
        setVehicle(vehicles[0])
        setImages(vehicles[0].image_urls || [])
      }
    } catch (error) {
      console.error('Error loading demo vehicle:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vega-cyan mx-auto mb-4"></div>
          <p className="text-gray-400">Lade VAVSR Showroom...</p>
        </div>
      </div>
    )
  }

  if (!vehicle || images.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Kein Fahrzeug mit Bildern gefunden.</p>
          <p className="text-sm text-gray-500">Bitte synchronisieren Sie Fahrzeuge von Mobile.de.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold mb-2 bg-gradient-to-r from-vega-cyan to-vega-emerald bg-clip-text text-transparent">
            VAVSR - VEGA Automotive Virtual Showroom
          </h1>
          <p className="text-gray-400">{vehicle.title}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 360 Viewer */}
          <div className="lg:col-span-2">
            <Viewer360
              images={images}
              background={selectedBackground}
              vehicleTitle={vehicle.title}
            />
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <BackgroundSelector
              selected={selectedBackground}
              onSelect={setSelectedBackground}
            />

            {/* Vehicle Info */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Fahrzeugdetails</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">Preis:</span>
                  <p className="text-white font-semibold">
                    {vehicle.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </p>
                </div>
                {vehicle.year && (
                  <div>
                    <span className="text-gray-400">Baujahr:</span>
                    <p className="text-white">{vehicle.year}</p>
                  </div>
                )}
                {vehicle.mileage && (
                  <div>
                    <span className="text-gray-400">Kilometerstand:</span>
                    <p className="text-white">{vehicle.mileage.toLocaleString('de-DE')} km</p>
                  </div>
                )}
                {vehicle.fuel_type && (
                  <div>
                    <span className="text-gray-400">Kraftstoff:</span>
                    <p className="text-white">{vehicle.fuel_type}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
