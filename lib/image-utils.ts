/**
 * Bild-Utility-Funktionen für CarCompany24
 */

/**
 * Generiert Array von 360° Bild-URLs für ein Fahrzeug
 */
export function generate360ImageUrls(vehicleId: number, basePath: string = '/images/vehicles/360'): string[] {
  return Array.from({ length: 36 }, (_, i) => 
    `${basePath}/${vehicleId}/frame-${String(i + 1).padStart(2, '0')}.jpg`
  )
}

/**
 * Generiert Array von Exterior-Bild-URLs
 */
export function generateExteriorImageUrls(vehicleId: number, count: number = 8): string[] {
  return Array.from({ length: count }, (_, i) => 
    `/images/vehicles/exterior/vehicle-${vehicleId}-${i + 1}.jpg`
  )
}

/**
 * Generiert Array von Interior-Bild-URLs
 */
export function generateInteriorImageUrls(vehicleId: number, count: number = 6): string[] {
  return Array.from({ length: count }, (_, i) => 
    `/images/vehicles/interior/vehicle-${vehicleId}-interior-${i + 1}.jpg`
  )
}

/**
 * Validiert ob ein Bild existiert (Client-seitig)
 */
export async function checkImageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

/**
 * Erstellt optimierte Bild-URL für Next.js Image Component
 */
export function getOptimizedImageUrl(
  src: string,
  width?: number,
  height?: number,
  quality: number = 85
): string {
  // Wenn bereits eine externe URL, direkt zurückgeben
  if (src.startsWith('http')) {
    return src
  }

  // Für lokale Bilder kann imgproxy verwendet werden
  const params = new URLSearchParams()
  if (width) params.append('w', width.toString())
  if (height) params.append('h', height.toString())
  params.append('q', quality.toString())

  return params.toString() ? `${src}?${params.toString()}` : src
}
