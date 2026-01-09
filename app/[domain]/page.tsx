import { Suspense } from 'react'
import CarCompany24Loader from '@/components/CarCompany24Loader'
import DomainHero from '@/components/domain/DomainHero'
import VehicleShowcase from '@/components/sections/VehicleShowcase'
import Services from '@/components/sections/Services'
import Financing from '@/components/sections/Financing'
import TrustSignals from '@/components/sections/TrustSignals'
import Contact from '@/components/sections/Contact'
import { generateMetadata as getMetadata } from '../metadata'

type Props = {
  params: {
    domain?: string
  }
}

// Für static export (GitHub Pages)
export async function generateStaticParams() {
  return [
    { domain: 'online' },
    { domain: 'vip' },
    { domain: 'local' },
  ]
}

export async function generateMetadata(props: Props) {
  const domain = props.params?.domain || 'local'
  const domainType = domain === 'online' ? 'online' : domain === 'vip' ? 'vip' : 'local'
  return getMetadata(domainType)
}

export default function DomainPage({ params }: Props) {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<CarCompany24Loader />}>
        <DomainHero />
        <TrustSignals />
        <VehicleShowcase />
        <Services />
        <Financing />
        <Contact />
      </Suspense>
    </main>
  )
}
