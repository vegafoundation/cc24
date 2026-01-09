import { Metadata } from 'next'
import Image from 'next/image'
import Vehicle360Viewer from '@/components/vehicles/Vehicle360Viewer'
import { Car, Fuel, Gauge, Calendar, Shield, MapPin } from 'lucide-react'
import Link from 'next/link'

// Mock data - wird später durch API ersetzt
async function getVehicle(id: string) {
  // TODO: API Call
  return {
    id: parseInt(id),
    make: 'BMW',
    model: '320d',
    year: 2018,
    price: 18900,
    mileage: 125000,
    fuel: 'Diesel',
    power: '135 kW (184 PS)',
    transmission: 'Automatik',
    color: 'Schwarz',
    description: 'Gepflegter BMW 320d mit umfangreicher Ausstattung.',
    images360: Array.from({ length: 36 }, (_, i) => 
      `/images/vehicles/360/${id}/frame-${String(i + 1).padStart(2, '0')}.jpg`
    ),
    images: [
      `/images/vehicles/exterior/vehicle-${id}-1.jpg`,
      `/images/vehicles/exterior/vehicle-${id}-2.jpg`,
      `/images/vehicles/interior/vehicle-${id}-interior-1.jpg`,
    ],
    features: [
      'Klimaanlage',
      'Navigationssystem',
      'Sitzheizung',
      'Bluetooth',
      'LED-Scheinwerfer',
    ],
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const vehicle = await getVehicle(params.id)
  
  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model} | CarCompany24 Göttingen`,
    description: `${vehicle.make} ${vehicle.model} - ${vehicle.price.toLocaleString('de-DE')} € - ${vehicle.mileage.toLocaleString('de-DE')} km - ${vehicle.fuel}`,
    openGraph: {
      title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      description: `${vehicle.price.toLocaleString('de-DE')} € - ${vehicle.mileage.toLocaleString('de-DE')} km`,
      images: vehicle.images,
    },
  }
}

export default async function VehicleDetailPage({ params }: { params: { id: string } }) {
  const vehicle = await getVehicle(params.id)

  // Schema.org JSON-LD für SEO
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    brand: {
      '@type': 'Brand',
      name: vehicle.make,
    },
    model: vehicle.model,
    productionDate: vehicle.year.toString(),
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: vehicle.mileage,
      unitCode: 'KMT',
    },
    fuelType: vehicle.fuel,
    offers: {
      '@type': 'Offer',
      price: vehicle.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'AutoDealer',
        name: 'CarCompany24 GmbH',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Adolf-Hoyer-Straße 12',
          addressLocality: 'Göttingen',
          postalCode: '37079',
          addressCountry: 'DE',
        },
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-500">
              Start
            </Link>
            {' / '}
            <Link href="/fahrzeuge" className="text-gray-500 hover:text-primary-500">
              Fahrzeuge
            </Link>
            {' / '}
            <span className="text-gray-900">{vehicle.make} {vehicle.model}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Bilder */}
            <div>
              <Vehicle360Viewer
                images={vehicle.images360 || vehicle.images}
                amount={36}
                speed={100}
                autoplay={false}
              />
              {/* Zusätzliche Galerie-Bilder */}
              {vehicle.images && vehicle.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {vehicle.images.map((img, idx) => (
                    <div key={idx} className="relative h-24 bg-gray-200 rounded overflow-hidden">
                      <Image
                        src={img}
                        alt={`${vehicle.make} ${vehicle.model} - Bild ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <div className="text-4xl font-bold text-primary-500 mb-6">
                {vehicle.price.toLocaleString('de-DE')} €
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Gauge className="w-5 h-5" />
                  <span>{vehicle.mileage.toLocaleString('de-DE')} km</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Fuel className="w-5 h-5" />
                  <span>{vehicle.fuel}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>{vehicle.year}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Car className="w-5 h-5" />
                  <span>{vehicle.transmission}</span>
                </div>
              </div>

              <div className="border-t pt-6 mb-6">
                <h3 className="text-lg font-semibold mb-3">Ausstattung</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {vehicle.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-primary-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/finanzierung?vehicle=${vehicle.id}`}
                  className="block w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-lg text-center transition-colors duration-200"
                >
                  Finanzierung berechnen
                </Link>
                <button className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 rounded-lg transition-colors duration-200">
                  Jetzt anfragen
                </button>
              </div>
            </div>
          </div>

          {/* Beschreibung */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Beschreibung</h2>
            <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>
          </div>

          {/* Standort */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Standort</h2>
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-primary-500 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">CarCompany24 GmbH</p>
                <p className="text-gray-600">Adolf-Hoyer-Straße 12</p>
                <p className="text-gray-600">37079 Göttingen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
