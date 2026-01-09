import { MetadataRoute } from 'next'
import { DOMAIN_CONFIGS } from '@/lib/domains'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CarCompany24 - Gebrauchtwagen Online',
    short_name: 'CC24',
    description: 'Ihr zuverlässiger Partner für Gebrauchtwagen',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#00D4D4',
    icons: [
      {
        src: '/images/logo/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/logo/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
