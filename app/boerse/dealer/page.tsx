import { Metadata } from 'next'
import DealerDashboard from '@/components/boerse/DealerDashboard'

export const metadata: Metadata = {
  title: 'Dealer Dashboard | CC24 Börse',
  description: 'Verwalten Sie Ihre Fahrzeuginserate und Finanzierungen',
}

export default function DealerPage() {
  return <DealerDashboard />
}
