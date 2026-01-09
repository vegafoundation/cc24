/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Output-Konfiguration für Multi-Deployment
  output: process.env.DOCKER_BUILD === 'true' 
    ? 'standalone' 
    : (process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true' ? 'export' : undefined),
  images: {
    unoptimized: process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true',
    domains: [
      'localhost',
      'carcompany24-gmbh.de',
      'cc24.online',
      'cc24.vip',
      'www.cc24.online',
      'www.cc24.vip',
      'images.unsplash.com',
      'suchen.mobile.de',
      'api.mobile.de',
      'github.com',
      'raw.githubusercontent.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  // GitHub Pages basePath (nur wenn gesetzt)
  ...(process.env.NEXT_PUBLIC_BASE_PATH && {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
    trailingSlash: true,
  }),
}

module.exports = nextConfig
