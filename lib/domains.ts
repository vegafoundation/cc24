/**
 * Domain Configuration für Multi-Domain Support
 * CC24.ONLINE und CC24.VIP
 */

export interface DomainConfig {
  domain: string
  name: string
  primaryColor: string
  secondaryColor: string
  cta: string
  description: string
}

export const domainConfigs: Record<string, DomainConfig> = {
  'cc24.online': {
    domain: 'cc24.online',
    name: 'CC24.ONLINE',
    primaryColor: '#00D9FF',
    secondaryColor: '#10B981',
    cta: 'Jetzt anfragen',
    description: 'Online-Fokus, schnelle Transaktionen',
  },
  'cc24.vip': {
    domain: 'cc24.vip',
    name: 'CC24.VIP',
    primaryColor: '#E63946',
    secondaryColor: '#F77F00',
    cta: 'Premium anfragen',
    description: 'Premium-Fokus, exklusive Fahrzeuge',
  },
  'localhost': {
    domain: 'localhost',
    name: 'CC24 Demo',
    primaryColor: '#00D9FF',
    secondaryColor: '#10B981',
    cta: 'Jetzt anfragen',
    description: 'Lokale Entwicklung',
  },
  'github.io': {
    domain: 'github.io',
    name: 'CC24 Demo',
    primaryColor: '#00D9FF',
    secondaryColor: '#10B981',
    cta: 'Jetzt anfragen',
    description: 'GitHub Pages Demo',
  },
}

export function getDomainConfig(): DomainConfig {
  if (typeof window === 'undefined') {
    // Server-side: Use environment variable or default
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'localhost'
    return domainConfigs[domain] || domainConfigs['localhost']
  }

  // Client-side: Detect from hostname
  const hostname = window.location.hostname.toLowerCase()
  
  // Check for exact domain matches
  if (hostname.includes('cc24.online')) {
    return domainConfigs['cc24.online']
  }
  if (hostname.includes('cc24.vip')) {
    return domainConfigs['cc24.vip']
  }
  if (hostname.includes('github.io')) {
    return domainConfigs['github.io']
  }
  
  // Default
  return domainConfigs['localhost']
}

export function getDomainName(): string {
  return getDomainConfig().name
}

export function getPrimaryColor(): string {
  return getDomainConfig().primaryColor
}

export function getSecondaryColor(): string {
  return getDomainConfig().secondaryColor
}
