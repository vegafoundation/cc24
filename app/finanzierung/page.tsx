import { Metadata } from 'next'
import FinancingCalculator from '@/components/financing/FinancingCalculator'

export const metadata: Metadata = {
  title: 'Finanzierung trotz Schufa | CarCompany24 GmbH',
  description: 'PAngV-konformer Finanzierungsrechner für Gebrauchtwagen. Auch bei negativer Schufa möglich.',
}

export default function FinanzierungPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FinancingCalculator />
      </div>
    </div>
  )
}
