/**
 * Mock data for CC24 vehicles
 * Used as fallback when API is unavailable (e.g., Vercel usage exceeded)
 */

import { Vehicle } from './api'

export const mockVehicles: Vehicle[] = [
  {
    id: 1,
    mobile_de_id: 'mock-001',
    title: 'Mercedes-Benz C-Class C 200',
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2022,
    price: 45900,
    mileage: 15000,
    fuel_type: 'Benzin',
    power_kw: 150,
    power_hp: 204,
    transmission: 'Automatik',
    doors: 4,
    seats: 5,
    color: 'Schwarz',
    description: 'Traumhafter Mercedes-Benz C-Class in Top-Zustand. Vollständig gewartet und technisch einwandfrei.',
    image_urls: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800'
    ],
    main_image_url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    dealer_name: 'CarCompany24',
    dealer_location: 'München',
    first_registration: '2022-03',
  },
  {
    id: 2,
    mobile_de_id: 'mock-002',
    title: 'BMW 3er 320d',
    brand: 'BMW',
    model: '3er',
    year: 2021,
    price: 38500,
    mileage: 28000,
    fuel_type: 'Diesel',
    power_kw: 140,
    power_hp: 190,
    transmission: 'Automatik',
    doors: 4,
    seats: 5,
    color: 'Weiß',
    description: 'Sportlicher BMW 3er mit effizienter Diesel-Technologie. Perfekt für Langstrecken.',
    image_urls: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800'
    ],
    main_image_url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    dealer_name: 'CarCompany24',
    dealer_location: 'Hamburg',
    first_registration: '2021-06',
  },
  {
    id: 3,
    mobile_de_id: 'mock-003',
    title: 'Audi A4 Avant 2.0 TFSI',
    brand: 'Audi',
    model: 'A4',
    year: 2023,
    price: 52900,
    mileage: 8500,
    fuel_type: 'Benzin',
    power_kw: 140,
    power_hp: 190,
    transmission: 'Automatik',
    doors: 5,
    seats: 5,
    color: 'Grau',
    description: 'Praktischer Audi A4 Avant mit viel Platz und modernster Technologie.',
    image_urls: [
      'https://images.unsplash.com/photo-1610768764270-790fbec18178?w=800',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'
    ],
    main_image_url: 'https://images.unsplash.com/photo-1610768764270-790fbec18178?w=800',
    dealer_name: 'CarCompany24',
    dealer_location: 'Berlin',
    first_registration: '2023-01',
  },
  {
    id: 4,
    mobile_de_id: 'mock-004',
    title: 'Volkswagen Golf 8 GTI',
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2022,
    price: 42900,
    mileage: 12000,
    fuel_type: 'Benzin',
    power_kw: 180,
    power_hp: 245,
    transmission: 'Manuell',
    doors: 5,
    seats: 5,
    color: 'Rot',
    description: 'Legendärer Golf GTI mit sportlicher Performance und ikonischem Design.',
    image_urls: [
      'https://images.unsplash.com/photo-1622353219448-46a5edd026bc?w=800',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'
    ],
    main_image_url: 'https://images.unsplash.com/photo-1622353219448-46a5edd026bc?w=800',
    dealer_name: 'CarCompany24',
    dealer_location: 'Frankfurt',
    first_registration: '2022-08',
  },
  {
    id: 5,
    mobile_de_id: 'mock-005',
    title: 'Porsche Cayenne S',
    brand: 'Porsche',
    model: 'Cayenne',
    year: 2021,
    price: 89900,
    mileage: 22000,
    fuel_type: 'Benzin',
    power_kw: 324,
    power_hp: 440,
    transmission: 'Automatik',
    doors: 5,
    seats: 5,
    color: 'Schwarz',
    description: 'Luxuriöser Porsche Cayenne S mit beeindruckender Leistung und Komfort.',
    image_urls: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
      'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=800'
    ],
    main_image_url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
    dealer_name: 'CarCompany24',
    dealer_location: 'Stuttgart',
    first_registration: '2021-04',
  },
  {
    id: 6,
    mobile_de_id: 'mock-006',
    title: 'Tesla Model 3 Long Range',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 54900,
    mileage: 5000,
    fuel_type: 'Elektro',
    power_kw: 366,
    power_hp: 498,
    transmission: 'Automatik',
    doors: 4,
    seats: 5,
    color: 'Blau',
    description: 'Zukunftsorientiertes Tesla Model 3 mit großer Reichweite und Autopilot.',
    image_urls: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
    ],
    main_image_url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    dealer_name: 'CarCompany24',
    dealer_location: 'München',
    first_registration: '2023-02',
  },
]

export const getMockVehicles = (params?: {
  limit?: number
  make?: string
  model?: string
  min_price?: number
  max_price?: number
}): Vehicle[] => {
  let filtered = [...mockVehicles]

  // Filter by make
  if (params?.make) {
    filtered = filtered.filter(v => 
      v.brand?.toLowerCase().includes(params.make!.toLowerCase())
    )
  }

  // Filter by model
  if (params?.model) {
    filtered = filtered.filter(v => 
      v.model?.toLowerCase().includes(params.model!.toLowerCase())
    )
  }

  // Filter by price range
  if (params?.min_price) {
    filtered = filtered.filter(v => v.price >= params.min_price!)
  }
  if (params?.max_price) {
    filtered = filtered.filter(v => v.price <= params.max_price!)
  }

  // Limit results
  if (params?.limit) {
    filtered = filtered.slice(0, params.limit)
  }

  return filtered
}

export const getMockVehicle = (id: number): Vehicle | undefined => {
  return mockVehicles.find(v => v.id === id)
}
