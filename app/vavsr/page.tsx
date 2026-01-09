import { Metadata } from 'next'
import VAVSRShowroom from '@/components/vavsr/VAVSRShowroom'

export const metadata: Metadata = {
  title: 'VAVSR - VEGA Automotive Virtual Showroom | CarCompany24',
  description: 'Professioneller 360° Virtual Showroom für Autohändler - Powered by VEGA Enterprise',
}

export default function VAVSRPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <VAVSRShowroom />
    </div>
  )
}
