import type { Metadata } from 'next'
import VehicleDetailClient from './VehicleDetailClient'

// Für static export (GitHub Pages)
export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: 'Fahrzeugdetails | CarCompany24',
    description: 'Detaillierte Informationen zum Fahrzeug',
  }
}

export default async function VehicleDetailPage({ params }: { params: { id: string } }) {
  return <VehicleDetailClient vehicleId={params.id} />
}
