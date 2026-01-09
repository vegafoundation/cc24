/**
 * Mobile.de Seller API Integration
 * Dokumentation: https://services.mobile.de/docs/seller-api.html
 * 
 * WICHTIG: API-Zugang muss bei service@team.mobile.de beantragt werden
 * Benötigt: Kundennummer und Firmenname
 */

const MOBILE_DE_API_BASE = process.env.MOBILE_DE_API_SANDBOX === 'true'
  ? 'https://services.sandbox.mobile.de'
  : 'https://services.mobile.de'

const MOBILE_DE_API_USERNAME = process.env.MOBILE_DE_API_USERNAME
const MOBILE_DE_API_PASSWORD = process.env.MOBILE_DE_API_PASSWORD

interface MobileDeVehicle {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  fuel: string
  images: string[]
  description: string
}

/**
 * Erstellt Basic Auth Header für Mobile.de API
 */
function getAuthHeader(): string {
  if (!MOBILE_DE_API_USERNAME || !MOBILE_DE_API_PASSWORD) {
    throw new Error('Mobile.de API Credentials nicht konfiguriert')
  }
  const credentials = Buffer.from(`${MOBILE_DE_API_USERNAME}:${MOBILE_DE_API_PASSWORD}`).toString('base64')
  return `Basic ${credentials}`
}

/**
 * Ruft alle Fahrzeuge von Mobile.de ab
 */
export async function getMobileDeVehicles(): Promise<MobileDeVehicle[]> {
  try {
    const response = await fetch(`${MOBILE_DE_API_BASE}/seller-api/ads`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Mobile.de API Error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.ads || []
  } catch (error) {
    console.error('Mobile.de API Error:', error)
    throw error
  }
}

/**
 * Erstellt ein neues Fahrzeug auf Mobile.de
 */
export async function createMobileDeVehicle(vehicle: Partial<MobileDeVehicle>): Promise<MobileDeVehicle> {
  try {
    const response = await fetch(`${MOBILE_DE_API_BASE}/seller-api/ads`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Mobile.de API Error: ${error}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Mobile.de API Error:', error)
    throw error
  }
}

/**
 * Aktualisiert ein Fahrzeug auf Mobile.de
 */
export async function updateMobileDeVehicle(
  vehicleId: string,
  vehicle: Partial<MobileDeVehicle>
): Promise<MobileDeVehicle> {
  try {
    const response = await fetch(`${MOBILE_DE_API_BASE}/seller-api/ads/${vehicleId}`, {
      method: 'PUT',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Mobile.de API Error: ${error}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Mobile.de API Error:', error)
    throw error
  }
}

/**
 * Löscht ein Fahrzeug von Mobile.de
 */
export async function deleteMobileDeVehicle(vehicleId: string): Promise<void> {
  try {
    const response = await fetch(`${MOBILE_DE_API_BASE}/seller-api/ads/${vehicleId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': getAuthHeader(),
      },
    })

    if (!response.ok) {
      throw new Error(`Mobile.de API Error: ${response.statusText}`)
    }
  } catch (error) {
    console.error('Mobile.de API Error:', error)
    throw error
  }
}

/**
 * Synchronisiert lokale Fahrzeuge mit Mobile.de
 */
export async function syncVehiclesToMobileDe(localVehicles: MobileDeVehicle[]): Promise<void> {
  try {
    const mobileDeVehicles = await getMobileDeVehicles()
    const mobileDeIds = new Set(mobileDeVehicles.map(v => v.id))

    for (const vehicle of localVehicles) {
      if (vehicle.id && mobileDeIds.has(vehicle.id)) {
        // Update existing
        await updateMobileDeVehicle(vehicle.id, vehicle)
      } else {
        // Create new
        await createMobileDeVehicle(vehicle)
      }
    }
  } catch (error) {
    console.error('Sync Error:', error)
    throw error
  }
}
