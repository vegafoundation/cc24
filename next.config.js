/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Output-Konfiguration für Multi-Deployment
  // - Vercel: Standard Next.js (kein output)
  // - GitHub Pages: Static export (NEXT_PUBLIC_STATIC_EXPORT=true)
  // - Docker: Standalone (DOCKER_BUILD=true)
  output: process.env.DOCKER_BUILD === 'true' 
    ? 'standalone' 
    : (process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true' ? 'export' : undefined),
  images: {
    unoptimized: process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true', // Nur für GitHub Pages
    domains: [
      'localhost',
      'carcompany24-gmbh.de',
      'cc24.online',
      'cc24.vip',
      'www.cc24.online',
      'www.cc24.vip',
      'github.com',
      'raw.githubusercontent.com',
      '[USERNAME].github.io'
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // experimental: {
  //   optimizeCss: true, // Deaktiviert - benötigt 'critters' Package
  // },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // GitHub Pages basePath (nur wenn gesetzt)
  ...(process.env.NEXT_PUBLIC_BASE_PATH && {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
    trailingSlash: true,
  }),
  // Multi-Domain Support
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Domain',
            value: process.env.NEXT_PUBLIC_DOMAIN || 'local',
          },
        ],
      },
    ]
  },
  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
