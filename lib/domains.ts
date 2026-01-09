/**
 * Domain Configuration
 * Multi-Domain Support für CC24.ONLINE und CC24.VIP
 */

export type DomainType = 'online' | 'vip' | 'local'

export interface DomainConfig {
  domain: string
  name: string
  description: string
  primaryColor: string
  secondaryColor: string
  features: string[]
  cta: string
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export const DOMAIN_CONFIGS: Record<DomainType, DomainConfig> = {
  online: {
    domain: 'cc24.online',
    name: 'CarCompany24.ONLINE',
    description: 'Ihr Online-Partner für Gebrauchtwagen - Schnell, Transparent, Zuverlässig',
    primaryColor: '#00D4D4',
    secondaryColor: '#00FF88',
    features: [
      'Online-Fahrzeugsuche',
      'Sofort-Finanzierung',
      'Kostenlose Lieferung',
      '360° Virtual Showroom'
    ],
    cta: 'Jetzt online kaufen',
    seo: {
      title: 'CarCompany24.ONLINE - Gebrauchtwagen online kaufen | Finanzierung trotz Schufa',
      description: 'Gebrauchtwagen online kaufen bei CarCompany24.ONLINE. Schnelle Finanzierung auch bei negativer Schufa. Kostenlose Lieferung. 360° Virtual Showroom.',
      keywords: [
        'gebrauchtwagen online',
        'auto online kaufen',
        'finanzierung trotz schufa',
        'cc24 online',
        'gebrauchtwagen göttingen'
      ]
    }
  },
  vip: {
    domain: 'cc24.vip',
    name: 'CarCompany24.VIP',
    description: 'Premium Gebrauchtwagen - Exklusiv, Luxuriös, Erstklassig',
    primaryColor: '#D4AF37',
    secondaryColor: '#FFD700',
    features: [
      'Premium-Fahrzeuge',
      'Exklusive Auswahl',
      'VIP-Beratung',
      'Premium-Finanzierung'
    ],
    cta: 'VIP-Angebot anfragen',
    seo: {
      title: 'CarCompany24.VIP - Premium Gebrauchtwagen | Exklusive Luxusfahrzeuge',
      description: 'Premium Gebrauchtwagen bei CarCompany24.VIP. Exklusive Auswahl an Luxusfahrzeugen. VIP-Beratung und Premium-Finanzierung.',
      keywords: [
        'premium gebrauchtwagen',
        'luxusfahrzeuge',
        'cc24 vip',
        'exklusive autos',
        'premium autohaus'
      ]
    }
  },
  local: {
    domain: 'localhost',
    name: 'CarCompany24',
    description: 'Ihr zuverlässiger Partner für Gebrauchtwagen in Göttingen',
    primaryColor: '#E63946',
    secondaryColor: '#2A9D8F',
    features: [
      'Gebrauchtwagen Göttingen',
      'Finanzierung trotz Schufa',
      'Kostenlose Lieferung',
      '4.9/5.0 Sterne'
    ],
    cta: 'Jetzt anfragen',
    seo: {
      title: 'CarCompany24 GmbH - Gebrauchtwagen Göttingen | Finanzierung trotz Schufa',
      description: 'CarCompany24 GmbH - Ihr zuverlässiger Partner für Gebrauchtwagen in Göttingen. Finanzierung auch bei negativer Schufa. Kostenlose Lieferung.',
      keywords: [
        'gebrauchtwagen göttingen',
        'autohaus göttingen',
        'kfz finanzierung',
        'carcompany24',
        'gebrauchtwagen kaufen'
      ]
    }
  }
}

/**
 * Erkennt die aktuelle Domain und gibt die entsprechende Konfiguration zurück
 */
export function getDomainConfig(): DomainConfig {
  if (typeof window === 'undefined') {
    // Server-side: Prüfe über Headers oder Environment
    const envDomain = process.env.NEXT_PUBLIC_DOMAIN
    if (envDomain === 'online') return DOMAIN_CONFIGS.online
    if (envDomain === 'vip') return DOMAIN_CONFIGS.vip
    return DOMAIN_CONFIGS.local
  }

  const hostname = window.location.hostname.toLowerCase()
  
  // GitHub Pages Support
  if (hostname.includes('github.io')) {
    // Prüfe URL-Parameter oder Path für Domain-Erkennung
    const path = window.location.pathname
    if (path.includes('online') || path.includes('cc24.online')) {
      return DOMAIN_CONFIGS.online
    }
    if (path.includes('vip') || path.includes('cc24.vip')) {
      return DOMAIN_CONFIGS.vip
    }
  }
  
  if (hostname.includes('cc24.online') || hostname === 'cc24.online') {
    return DOMAIN_CONFIGS.online
  }
  
  if (hostname.includes('cc24.vip') || hostname === 'cc24.vip') {
    return DOMAIN_CONFIGS.vip
  }
  
  return DOMAIN_CONFIGS.local
}

/**
 * Prüft ob die aktuelle Domain eine Production-Domain ist
 */
export function isProductionDomain(): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  
  const hostname = window.location.hostname.toLowerCase()
  return hostname.includes('cc24.online') || hostname.includes('cc24.vip')
}

/**
 * Gibt die Basis-URL für die aktuelle Domain zurück
 */
export function getBaseUrl(): string {
  if (typeof window === 'undefined') {
    return 'https://cc24.online'
  }
  
  const protocol = window.location.protocol
  const hostname = window.location.hostname
  
  return `${protocol}//${hostname}`
}
