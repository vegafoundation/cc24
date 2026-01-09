'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { vehicleApi, SyncStatus } from '@/lib/api'

export default function AdminPage() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [syncResult, setSyncResult] = useState<any>(null)
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    limit: '20',
  })

  useEffect(() => {
    fetchSyncStatus()
  }, [])

  const fetchSyncStatus = async () => {
    try {
      const status = await vehicleApi.getSyncStatus()
      setSyncStatus(status)
    } catch (error) {
      console.error('Error fetching sync status:', error)
    }
  }

  const handleSync = async (syncNow: boolean = false) => {
    try {
      setLoading(true)
      setSyncResult(null)

      const params: any = {}
      if (filters.make) params.make = filters.make
      if (filters.model) params.model = filters.model
      if (filters.limit) params.limit = parseInt(filters.limit)

      if (syncNow) {
        const result = await vehicleApi.syncMobileDeNow(params)
        setSyncResult(result)
      } else {
        const result = await vehicleApi.syncMobileDe(params)
        setSyncResult(result)
      }

      // Refresh status after sync
      setTimeout(() => {
        fetchSyncStatus()
      }, 2000)
    } catch (error: any) {
      setSyncResult({
        success: false,
        error: error.message || 'Sync fehlgeschlagen',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-display font-bold mb-8 bg-gradient-to-r from-vega-cyan to-vega-emerald bg-clip-text text-transparent"
        >
          Admin - Mobile.de Sync
        </motion.h1>

        {/* Sync Status */}
        {syncStatus && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Sync-Status</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Gesamt Fahrzeuge</p>
                <p className="text-2xl font-bold text-vega-cyan">{syncStatus.total_vehicles}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Aktive Fahrzeuge</p>
                <p className="text-2xl font-bold text-vega-emerald">{syncStatus.active_vehicles}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Synchronisiert</p>
                <p className="text-2xl font-bold text-vega-gold">{syncStatus.synced_vehicles}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Letzter Sync</p>
                <p className="text-sm text-white">
                  {syncStatus.last_sync
                    ? new Date(syncStatus.last_sync).toLocaleString('de-DE')
                    : 'Nie'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Sync Controls */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Fahrzeuge synchronisieren</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Marke (optional)</label>
              <input
                type="text"
                value={filters.make}
                onChange={(e) => setFilters({ ...filters, make: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                placeholder="z.B. BMW"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Modell (optional)</label>
              <input
                type="text"
                value={filters.model}
                onChange={(e) => setFilters({ ...filters, model: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                placeholder="z.B. 320d"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Anzahl</label>
              <input
                type="number"
                value={filters.limit}
                onChange={(e) => setFilters({ ...filters, limit: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                placeholder="20"
                min="1"
                max="100"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => handleSync(false)}
              disabled={loading}
              className="px-6 py-3 bg-vega-cyan text-gray-900 font-semibold rounded-lg hover:bg-vega-cyan/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sync läuft...' : 'Sync starten (Background)'}
            </button>
            <button
              onClick={() => handleSync(true)}
              disabled={loading}
              className="px-6 py-3 bg-vega-emerald text-gray-900 font-semibold rounded-lg hover:bg-vega-emerald/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sync läuft...' : 'Sync sofort (Synchronous)'}
            </button>
            <button
              onClick={fetchSyncStatus}
              className="px-6 py-3 border-2 border-vega-cyan text-vega-cyan font-semibold rounded-lg hover:bg-vega-cyan/10 transition"
            >
              Status aktualisieren
            </button>
          </div>
        </div>

        {/* Sync Result */}
        {syncResult && (
          <div className={`bg-gray-800 rounded-lg p-6 ${syncResult.success ? 'border-l-4 border-vega-emerald' : 'border-l-4 border-red-500'}`}>
            <h2 className="text-2xl font-semibold text-white mb-4">Sync-Ergebnis</h2>
            {syncResult.success !== false ? (
              <div className="space-y-2">
                <p className="text-white">
                  <span className="text-vega-emerald">✓</span> Synchronisiert: {syncResult.synced || 0}
                </p>
                <p className="text-white">
                  <span className="text-vega-cyan">+</span> Erstellt: {syncResult.created || 0}
                </p>
                <p className="text-white">
                  <span className="text-vega-gold">↻</span> Aktualisiert: {syncResult.updated || 0}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-red-400">✗ Fehler: {syncResult.error || 'Unbekannter Fehler'}</p>
              </div>
            )}
          </div>
        )}

        {/* Info */}
        <div className="bg-gray-800 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Hinweise</h2>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>• Ohne Mobile.de API-Credentials werden Mock-Daten verwendet</li>
            <li>• Background-Sync läuft asynchron und blockiert nicht</li>
            <li>• Synchron-Sync wartet auf Ergebnis (empfohlen für Tests)</li>
            <li>• Fahrzeuge werden automatisch aktualisiert wenn bereits vorhanden</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
