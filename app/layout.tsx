import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import QuickContact from '@/components/demo/QuickContact'
import { generateMetadata as getMetadata } from './metadata'
import { headers } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer />
        <QuickContact />
      </body>
    </html>
  )
}
