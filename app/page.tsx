import { Suspense } from 'react'
import { headers } from 'next/headers'
import CarCompany24Loader from '@/components/CarCompany24Loader'
import Hero from '@/components/sections/Hero'
import VehicleShowcase from '@/components/sections/VehicleShowcase'
import Services from '@/components/sections/Services'
import Financing from '@/components/sections/Financing'
import TrustSignals from '@/components/sections/TrustSignals'
import Contact from '@/components/sections/Contact'
import DomainBanner from '@/components/domain/DomainBanner'
import DemoStats from '@/components/demo/DemoStats'
import TestimonialCarousel from '@/components/demo/TestimonialCarousel'
import NewsletterSignup from '@/components/demo/NewsletterSignup'
import { generateMetadata as getMetadata } from './metadata'

export async function generateMetadata() {
  // Domain aus Headers erkennen
  const headersList = await headers()
  const hostname = headersList.get('host') || ''
  
  let domainType: 'online' | 'vip' | 'local' = 'local'
  if (hostname.includes('cc24.online')) {
    domainType = 'online'
  } else if (hostname.includes('cc24.vip')) {
    domainType = 'vip'
  }
  
  return getMetadata(domainType)
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <DomainBanner />
      <Suspense fallback={<CarCompany24Loader />}>
        <Hero />
        <TrustSignals />
        <DemoStats />
        <VehicleShowcase />
        <Services />
        <TestimonialCarousel />
        <Financing />
        <NewsletterSignup />
        <Contact />
      </Suspense>
    </main>
  )
}
