import { Metadata } from 'next'
import BoersePlatform from '@/components/boerse/BoersePlatform'

export const metadata: Metadata = {
  title: 'CC24 Gebrauchtwagen-Börse | Autohändler inserieren & finanzieren',
  description: 'Professionelle Gebrauchtwagen-Börse mit integrierter Finanzierung. Autohändler können direkt inserieren und Kunden finanzieren lassen.',
}

export default function BoersePage() {
  return <BoersePlatform />
}
