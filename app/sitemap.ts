import { MetadataRoute } from 'next'
import { DOMAIN_CONFIGS } from '@/lib/domains'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrls = [
    'https://cc24.online',
    'https://cc24.vip',
  ]

  const routes = [
    '',
    '/fahrzeuge',
    '/finanzierung',
    '/boerse',
    '/vavsr',
    '/datenschutz',
    '/impressum',
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  baseUrls.forEach(baseUrl => {
    routes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      })
    })
  })

  return sitemapEntries
}
