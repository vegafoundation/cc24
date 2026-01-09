/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Static export für GitHub Pages
  images: {
    unoptimized: true, // Für GitHub Pages notwendig
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
  experimental: {
    optimizeCss: true,
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // GitHub Pages basePath (optional, wenn im Subfolder)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // Trailing slash für GitHub Pages
  trailingSlash: true,
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
