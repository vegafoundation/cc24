import type { Metadata } from 'next'
import { DOMAIN_CONFIGS, getDomainConfig } from '@/lib/domains'

/**
 * Generiert Metadata basierend auf der aktuellen Domain
 */
export function generateMetadata(domainType: 'online' | 'vip' | 'local' = 'local'): Metadata {
  const config = DOMAIN_CONFIGS[domainType]
  
  return {
    title: config.seo.title,
    description: config.seo.description,
    keywords: config.seo.keywords.join(', '),
    authors: [{ name: 'CarCompany24 GmbH' }],
    openGraph: {
      title: config.seo.title,
      description: config.description,
      type: 'website',
      locale: 'de_DE',
      siteName: config.name,
      url: `https://${config.domain}`,
      images: [
        {
          url: `https://${config.domain}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: config.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.seo.title,
      description: config.description,
      images: [`https://${config.domain}/images/twitter-card.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://${config.domain}`,
    },
    metadataBase: new URL(`https://${config.domain}`),
  }
}
