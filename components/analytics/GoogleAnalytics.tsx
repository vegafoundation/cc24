'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { getDomainConfig } from '@/lib/domains'

// Google Analytics 4 Measurement IDs
const GA_MEASUREMENT_IDS = {
  online: process.env.NEXT_PUBLIC_GA_ID_ONLINE || 'G-XXXXXXXXXX',
  vip: process.env.NEXT_PUBLIC_GA_ID_VIP || 'G-YYYYYYYYYY',
  local: process.env.NEXT_PUBLIC_GA_ID_LOCAL || '',
}

export default function GoogleAnalytics() {
  useEffect(() => {
    const config = getDomainConfig()
    const domainType = config.domain.includes('online') ? 'online' : 
                      config.domain.includes('vip') ? 'vip' : 'local'
    
    const measurementId = GA_MEASUREMENT_IDS[domainType]
    
    if (!measurementId || typeof window === 'undefined') return

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', measurementId, {
      page_path: window.location.pathname,
    })

    // Track page views
    const handleRouteChange = () => {
      gtag('config', measurementId, {
        page_path: window.location.pathname,
      })
    }

    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  const config = getDomainConfig()
  const domainType = config.domain.includes('online') ? 'online' : 
                    config.domain.includes('vip') ? 'vip' : 'local'
  const measurementId = GA_MEASUREMENT_IDS[domainType]

  if (!measurementId) return null

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}
