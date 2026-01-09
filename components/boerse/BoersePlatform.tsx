'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Filter, Car, Euro, TrendingUp, Shield, CreditCard } from 'lucide-react'

// Mock Data - wird später durch API ersetzt
const featuredVehicles = [
  {
    id: 1,
    dealer: 'Autohaus Müller',
    make: 'BMW',
    model: '320d',
    year: 2018,
    price: 18900,
    mileage: 125000,
    fuel: 'Diesel',
    location: 'Göttingen',
    financing: true,
    rating: 4.9,
    image: '/images/vehicles/exterior/bmw-320d-2018.jpg',
    vavsr: true, // Hat VAVSR 360° Showroom
  },
  {
    id: 2,
    dealer: 'CarCompany24 GmbH',
    make: 'Mercedes-Benz',
    model: 'C 220 d',
    year: 2019,
    price: 22900,
    mileage: 98000,
    fuel: 'Diesel',
    location: 'Göttingen',
    financing: true,
    rating: 4.9,
    image: '/images/vehicles/exterior/mercedes-c220d-2019.jpg',
    vavsr: true,
  },
  {
    id: 3,
    dealer: 'Auto Center Schmidt',
    make: 'VW',
    model: 'Golf 7',
    year: 2017,
    price: 12900,
    mileage: 145000,
    fuel: 'Benzin',
    location: 'Hannover',
    financing: true,
    rating: 4.7,
    image: '/images/vehicles/exterior/vw-golf7-2017.jpg',
    vavsr: false,
  },
]

export default function BoersePlatform() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CC24</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  CC24 <span className="text-primary-500">Gebrauchtwagen-Börse</span>
                </h1>
                <p className="text-xs text-gray-500">Mit integrierter Finanzierung</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/boerse/dealer"
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                Dealer werden
              </Link>
              <Link
                href="/vavsr"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg text-sm font-semibold transition-colors"
              >
                VAVSR Showroom
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Gebrauchtwagen finden & direkt finanzieren
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Wie Mobile.de, aber mit integrierter Finanzierung über CC24
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg p-2 flex gap-2 mb-6">
              <div className="flex-1 flex items-center gap-2 px-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Marke, Modell, VIN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 py-2 outline-none text-gray-900"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-900 font-semibold flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="px-6 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg text-white font-semibold">
                Suchen
              </button>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Shield className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Finanzierung trotz Schufa</h3>
                <p className="text-sm opacity-90">Auch bei negativer Bonität möglich</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <CreditCard className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Sofort-Entscheidung</h3>
                <p className="text-sm opacity-90">Innerhalb von 4 Stunden</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Beste Preise</h3>
                <p className="text-sm opacity-90">Direkt von Autohändlern</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Listings */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Verfügbare Fahrzeuge ({featuredVehicles.length})
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Sortieren:</span>
            <select className="px-3 py-1 border border-gray-300 rounded-lg">
              <option>Preis aufsteigend</option>
              <option>Preis absteigend</option>
              <option>Jahr neueste</option>
              <option>Kilometerstand</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle) => (
            <Link
              key={vehicle.id}
              href={`/boerse/fahrzeuge/${vehicle.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                <Image
                  src={vehicle.image}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/images/vehicles/exterior/placeholder.jpg'
                  }}
                />
                {vehicle.vavsr && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-primary-500 text-white text-xs font-bold rounded">
                    360° VAVSR
                  </div>
                )}
                {vehicle.financing && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-success text-white text-xs font-bold rounded flex items-center gap-1">
                    <CreditCard className="w-3 h-3" />
                    Finanzierung
                  </div>
                )}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  {vehicle.year}
                </div>
              </div>

              {/* Details */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-sm text-gray-600">{vehicle.dealer}</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {'★'.repeat(Math.floor(vehicle.rating))}
                    <span className="text-gray-600 text-xs ml-1">{vehicle.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Car className="w-4 h-4" />
                    {vehicle.mileage.toLocaleString('de-DE')} km
                  </span>
                  <span>{vehicle.fuel}</span>
                  <span>{vehicle.location}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-2xl font-bold text-primary-500">
                    {vehicle.price.toLocaleString('de-DE')} €
                  </span>
                  <span className="text-sm text-gray-500">Details →</span>
                </div>

                {vehicle.financing && (
                  <button className="w-full mt-3 py-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors">
                    Finanzierung berechnen
                  </button>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Sind Sie Autohändler?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Stellen Sie Ihre Fahrzeuge kostenlos ein und bieten Sie Finanzierung über CC24 an
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/boerse/dealer"
              className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
            >
              Jetzt Dealer werden
            </Link>
            <Link
              href="/vavsr"
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
            >
              VAVSR Showroom erstellen
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
