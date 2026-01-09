'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Github, Code, Package, Play, GitBranch, Calendar, CheckCircle, Sparkles } from 'lucide-react'

const versions = [
  {
    id: 'v1-initial',
    name: 'v1 - Initial Setup',
    hash: '8d0d4e3',
    branch: 'version/v1-initial',
    date: '2026-01-09',
    description: 'Vollständig reaktive und responsive Website mit Multi-Deployment',
    features: [
      'Next.js Website',
      'Multi-Deployment Support',
      'Responsive Design',
      'Basis-Komponenten',
      'Navigation & Footer'
    ],
    status: 'stable',
    color: 'blue'
  },
  {
    id: 'v2-full-features',
    name: 'v2 - Vollständige Features',
    hash: '395b4fd',
    branch: 'version/v2-full-features',
    date: '2026-01-09',
    description: 'Alle Features komplett - FinancingCalculator, OfferForm, Unternehmensdaten, SVGs',
    features: [
      'FinancingCalculator (PAngV)',
      'OfferForm',
      'Unternehmensdaten',
      'SVG Assets',
      'Mobile.de Integration'
    ],
    status: 'stable',
    color: 'green'
  },
  {
    id: 'v3-fix',
    name: 'v3 - VehicleDetailClient Fix',
    hash: 'aa8acfd',
    branch: 'version/v3-fix',
    date: '2026-01-09',
    description: 'Action Buttons korrigiert und Layout verbessert',
    features: [
      'Button-Layout Fix',
      'Responsive Buttons',
      'Konsistentes Styling'
    ],
    status: 'stable',
    color: 'yellow'
  },
  {
    id: 'v4-multi',
    name: 'v4 - Multi-Deployment',
    hash: '5baa987',
    branch: 'version/v4-multi',
    date: '2026-01-09',
    description: 'Perfect Multi-Deployment Setup - Domain Config, Navigation/Footer, Docker Workflow',
    features: [
      'Multi-Domain Support',
      'Domain-aware Navigation',
      'Demo-Statistiken',
      'Testimonial-Carousel',
      'Docker CI/CD'
    ],
    status: 'stable',
    color: 'purple'
  },
  {
    id: 'v5-enterprise',
    name: 'v5 - Enterprise Version',
    hash: 'ccc15b8',
    branch: 'version/v5-enterprise',
    date: '2026-01-09',
    description: 'Vollständige Enterprise Version mit Multi-Domain, VAVSR, All Features Complete',
    features: [
      'Multi-Domain vollständig',
      'VAVSR vollständig integriert',
      'Alle Enterprise-Features'
    ],
    status: 'stable',
    color: 'indigo'
  },
  {
    id: 'v6-config',
    name: 'v6 - Next.js Config Fix',
    hash: '6214510',
    branch: 'version/v6-config',
    date: '2026-01-09',
    description: 'Conditional Output für Multi-Deployment - Docker, GitHub Pages, Vercel',
    features: [
      'Conditional Output',
      'Docker: standalone',
      'GitHub Pages: export',
      'Vercel: standard'
    ],
    status: 'stable',
    color: 'pink'
  },
  {
    id: 'v7-platform',
    name: 'v7 - Initiale Platform',
    hash: 'c43f8e7',
    branch: 'version/v7-platform',
    date: '2026-01-09',
    description: 'Initiale CarCompany24 Platform mit PixelAG Showroom, Animated Intro, SVG Icons',
    features: [
      'PixelAG Virtual Showroom',
      'Animated Intro',
      'SVG Icons',
      'Vehicle Cards',
      'Vehicle Inventory'
    ],
    status: 'stable',
    color: 'cyan'
  },
  {
    id: 'v8-modular',
    name: 'v8 - Modular Structure',
    hash: 'b672336',
    branch: 'version/v8-modular',
    date: '2026-01-09',
    description: 'Modular Structure, TypeScript Types, Performance Optimizations',
    features: [
      'Modulare Struktur',
      'TypeScript Types',
      'Performance Optimizations',
      'Design Tokens',
      'Saubere Imports'
    ],
    status: 'stable',
    color: 'teal'
  },
  {
    id: 'v9-current',
    name: 'v9 - Current (Final)',
    hash: '85c11ee',
    branch: 'version/v9-current',
    date: '2026-01-09',
    description: 'Finale bereinigte Version - Alle Optimierungen, keine Duplikate',
    features: [
      'Finale Version',
      'Alle Optimierungen',
      'Code bereinigt',
      'Production Ready'
    ],
    status: 'current',
    color: 'emerald'
  }
]

const colorClasses = {
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  green: 'bg-green-500/10 border-green-500/20 text-green-400',
  yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
  pink: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
  cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
  teal: 'bg-teal-500/10 border-teal-500/20 text-teal-400',
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
}

export default function HubPage() {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'stable' | 'current'>('all')

  const filteredVersions = versions.filter(v => {
    if (filter === 'all') return true
    if (filter === 'current') return v.status === 'current'
    return v.status === 'stable'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                CC24 Demo Hub
              </h1>
              <p className="text-gray-400 mt-1">Präsentations- & Entwicklungshub</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/20 transition"
              >
                Zur Website
              </Link>
              <a
                href="https://github.com/vegafoundation/cc24"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="border-b border-gray-700/50 bg-gray-800/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400">{versions.length}</div>
              <div className="text-gray-400 mt-1">Versionen</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400">
                {versions.filter(v => v.status === 'stable').length}
              </div>
              <div className="text-gray-400 mt-1">Stable</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">3</div>
              <div className="text-gray-400 mt-1">Deployment-Optionen</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">100%</div>
              <div className="text-gray-400 mt-1">Production Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-gray-700/50 bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Filter:</span>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'all'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Alle
            </button>
            <button
              onClick={() => setFilter('stable')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'stable'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Stable
            </button>
            <button
              onClick={() => setFilter('current')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'current'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Current
            </button>
          </div>
        </div>
      </section>

      {/* Versions Grid */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVersions.map((version) => (
            <div
              key={version.id}
              className={`bg-gray-800/50 border rounded-xl p-6 hover:border-cyan-500/50 transition-all ${
                selectedVersion === version.id ? 'border-cyan-500 ring-2 ring-cyan-500/20' : 'border-gray-700'
              } ${version.status === 'current' ? 'ring-2 ring-emerald-500/20' : ''}`}
              onClick={() => setSelectedVersion(selectedVersion === version.id ? null : version.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{version.name}</h3>
                    {version.status === 'current' && (
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded border border-emerald-500/20">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{version.description}</p>
                </div>
                <div className={`px-3 py-1 rounded border ${colorClasses[version.color as keyof typeof colorClasses]}`}>
                  {version.id}
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <GitBranch className="w-4 h-4" />
                  <code className="text-xs">{version.branch}</code>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Code className="w-4 h-4" />
                  <code className="text-xs">{version.hash.substring(0, 7)}</code>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{version.date}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-300 mb-2">Features:</div>
                <ul className="space-y-1">
                  {version.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                      <CheckCircle className="w-3 h-3 text-cyan-400" />
                      {feature}
                    </li>
                  ))}
                  {version.features.length > 3 && (
                    <li className="text-xs text-gray-500">+{version.features.length - 3} weitere</li>
                  )}
                </ul>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-700">
                <a
                  href={`https://github.com/vegafoundation/cc24/tree/${version.branch}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 p-2 bg-gray-700/50 rounded hover:bg-gray-700 transition text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4" />
                  <span>Code</span>
                </a>
                <a
                  href={`https://github.com/vegafoundation/cc24/commit/${version.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 p-2 bg-gray-700/50 rounded hover:bg-gray-700 transition text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Code className="w-4 h-4" />
                  <span>Commit</span>
                </a>
                <a
                  href={`https://github.com/vegafoundation/cc24/compare/main...${version.branch}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 p-2 bg-gray-700/50 rounded hover:bg-gray-700 transition text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GitBranch className="w-4 h-4" />
                  <span>Compare</span>
                </a>
              </div>

              {/* Deployment Links (expanded) */}
              {selectedVersion === version.id && (
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
                  <div className="text-sm font-semibold text-gray-300 mb-2">Deployment:</div>
                  <div className="grid grid-cols-1 gap-2">
                    <a
                      href={`https://github.com/vegafoundation/cc24/tree/${version.branch}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-cyan-500/10 border border-cyan-500/20 rounded hover:bg-cyan-500/20 transition text-sm"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub Pages</span>
                      <ExternalLink className="w-3 h-3 ml-auto" />
                    </a>
                    <a
                      href={`https://vercel.com/new?import-project&repository-url=https://github.com/vegafoundation/cc24/tree/${version.branch}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-purple-500/10 border border-purple-500/20 rounded hover:bg-purple-500/20 transition text-sm"
                    >
                      <Package className="w-4 h-4" />
                      <span>Vercel</span>
                      <ExternalLink className="w-3 h-3 ml-auto" />
                    </a>
                    <a
                      href={`https://github.com/vegafoundation/cc24/pkgs/container/cc24%2F${version.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-blue-500/10 border border-blue-500/20 rounded hover:bg-blue-500/20 transition text-sm"
                    >
                      <Package className="w-4 h-4" />
                      <span>Docker Image</span>
                      <ExternalLink className="w-3 h-3 ml-auto" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700/50 bg-gray-900/50 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Dokumentation</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/VERSIONS_HISTORY.md" className="hover:text-cyan-400 transition">
                    Versionshistorie
                  </a>
                </li>
                <li>
                  <a href="/VERSIONS_DETAILED.md" className="hover:text-cyan-400 transition">
                    Detaillierte Übersicht
                  </a>
                </li>
                <li>
                  <a href="https://github.com/vegafoundation/cc24" className="hover:text-cyan-400 transition">
                    GitHub Repository
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Deployment</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="https://github.com/vegafoundation/cc24/actions" className="hover:text-cyan-400 transition">
                    GitHub Actions
                  </a>
                </li>
                <li>
                  <a href="https://vercel.com" className="hover:text-cyan-400 transition">
                    Vercel Dashboard
                  </a>
                </li>
                <li>
                  <a href="https://github.com/vegafoundation/cc24/pkgs" className="hover:text-cyan-400 transition">
                    Docker Images
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Entwicklung</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/scripts" className="hover:text-cyan-400 transition">
                    Scripts
                  </a>
                </li>
                <li>
                  <a href="/scripts/reconstruct-versions.ps1" className="hover:text-cyan-400 transition">
                    Versionen rekonstruieren
                  </a>
                </li>
                <li>
                  <a href="/scripts/compare-versions.ps1" className="hover:text-cyan-400 transition">
                    Versionen vergleichen
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>CC24 Demo Hub - Präsentations- & Entwicklungshub</p>
            <p className="mt-2">© 2026 CarCompany24 GmbH | Powered by VΞGΔ</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
