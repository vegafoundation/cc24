import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata: Metadata = {
  title: 'CarCompany24 - Premium Gebrauchtwagen & Finanzierung',
  description: 'Professioneller Gebrauchtwagenhandel mit integrierter Finanzierung. Premium Fahrzeuge, faire Preise, transparente Konditionen.',
  keywords: ['Gebrauchtwagen', 'Finanzierung', 'Auto', 'Kfz', 'CarCompany24'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="min-h-screen bg-gray-900 text-white">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
