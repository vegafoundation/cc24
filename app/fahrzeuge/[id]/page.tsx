import type { Metadata } from 'next'
import VehicleDetailClient from './VehicleDetailClient'

// Für static export (GitHub Pages)
// Leeres Array erlaubt client-side routing für dynamische IDs
export async function generateStaticParams() {
  // Für static export: leeres Array = client-side routing
  // Alternativ: echte IDs von API holen für pre-rendering
  return []
}

// Erlaube dynamische Parameter für client-side routing
export const dynamicParams = true

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: 'Fahrzeugdetails | CarCompany24',
    description: 'Detaillierte Informationen zum Fahrzeug',
  }
}

export default async function VehicleDetailPage({ params }: { params: { id: string } }) {
  return <VehicleDetailClient vehicleId={params.id} />
}
