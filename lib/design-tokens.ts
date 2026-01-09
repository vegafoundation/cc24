/**
 * Design Tokens für CarCompany24 Platform
 */
export const tokens = {
  colors: {
    cyberCyan: '#00D4D4',
    deepCyan: '#00A8A8',
    tealAccent: '#0FB5BA',
    darkShowroom: '#0A0F14',
    charcoalMetal: '#1A1F25',
    gunmetal: '#2C3239',
    chromeWhite: '#E8EDF2',
    silverMist: '#9CA8B4',
    premiumGold: '#C9A962',
    successGreen: '#00C853',
    alertRed: '#FF3D57',
    warningOrange: '#FF9500',
    glassLight: 'rgba(255,255,255,0.06)',
    glassMedium: 'rgba(255,255,255,0.10)',
    cyanGlow: 'linear-gradient(135deg, #00D4D4 0%, #0FB5BA 100%)',
    goldGlow: 'linear-gradient(135deg, #C9A962 0%, #E8D5A3 50%, #C9A962 100%)',
    redGlow: 'linear-gradient(135deg, #FF3D57 0%, #FF6B6B 100%)',
  },
  fonts: {
    display: "'Montserrat', -apple-system, sans-serif",
    body: "'Inter', -apple-system, sans-serif",
  },
} as const

export const companyData = {
  name: 'CarCompany24 GmbH',
  address: 'Adolf-Hoyer-Straße 12',
  city: '37079 Göttingen',
  phone: '+49 551 12345678',
  rating: 4.9,
  reviews: 28,
} as const
