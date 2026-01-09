'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Car, Euro, TrendingUp, Settings, FileText, CreditCard, BarChart3 } from 'lucide-react'

export default function DealerDashboard() {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'financing' | 'stats'>('vehicles')

  // Mock Data
  const vehicles = [
    { id: 1, make: 'BMW', model: '320d', price: 18900, status: 'aktiv', views: 234, inquiries: 12 },
    { id: 2, make: 'Mercedes', model: 'C 220 d', price: 22900, status: 'aktiv', views: 189, inquiries: 8 },
  ]

  const financingRequests = [
    { id: 1, customer: 'Max Mustermann', vehicle: 'BMW 320d', amount: 15000, status: 'pending' },
    { id: 2, customer: 'Anna Schmidt', vehicle: 'Mercedes C 220 d', amount: 20000, status: 'approved' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dealer Dashboard</h1>
              <p className="text-sm text-gray-600">Autohaus Müller</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/vavsr"
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Neues Fahrzeug
              </Link>
              <Link
                href="/boerse"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg text-sm font-semibold transition-colors"
              >
                Zur Börse
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktive Inserate</p>
                <p className="text-3xl font-bold text-gray-900">{vehicles.length}</p>
              </div>
              <Car className="w-12 h-12 text-primary-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Finanzierungsanfragen</p>
                <p className="text-3xl font-bold text-gray-900">{financingRequests.length}</p>
              </div>
              <CreditCard className="w-12 h-12 text-secondary-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Gesamtumsatz</p>
                <p className="text-3xl font-bold text-gray-900">€{vehicles.reduce((sum, v) => sum + v.price, 0).toLocaleString('de-DE')}</p>
              </div>
              <Euro className="w-12 h-12 text-success" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Durchschnittliche Views</p>
                <p className="text-3xl font-bold text-gray-900">
                  {Math.round(vehicles.reduce((sum, v) => sum + v.views, 0) / vehicles.length)}
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-accent-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: 'vehicles', name: 'Fahrzeuge', icon: Car },
                { id: 'financing', name: 'Finanzierungen', icon: CreditCard },
                { id: 'stats', name: 'Statistiken', icon: BarChart3 },
              ].map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-4 border-b-2 font-semibold transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-500'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'vehicles' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Meine Fahrzeuge</h3>
                  <Link
                    href="/vavsr"
                    className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Neues Fahrzeug
                  </Link>
                </div>
                <div className="space-y-4">
                  {vehicles.map(vehicle => (
                    <div key={vehicle.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {vehicle.make} {vehicle.model}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {vehicle.price.toLocaleString('de-DE')} € • {vehicle.views} Views • {vehicle.inquiries} Anfragen
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          vehicle.status === 'aktiv' ? 'bg-success/20 text-success' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {vehicle.status}
                        </span>
                        <button className="px-3 py-1 text-gray-600 hover:text-gray-900">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'financing' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Finanzierungsanfragen</h3>
                <div className="space-y-4">
                  {financingRequests.map(request => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{request.customer}</h4>
                          <p className="text-sm text-gray-600">{request.vehicle}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          request.status === 'approved' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                        }`}>
                          {request.status === 'approved' ? 'Genehmigt' : 'Ausstehend'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-primary-500">
                          {request.amount.toLocaleString('de-DE')} €
                        </p>
                        <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold">
                          Details ansehen
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Statistiken</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Performance</h4>
                    <p className="text-sm text-gray-600">Durchschnittliche Views pro Inserat: 211</p>
                    <p className="text-sm text-gray-600">Konversionsrate: 5.2%</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Finanzierung</h4>
                    <p className="text-sm text-gray-600">Genehmigte Finanzierungen: {financingRequests.filter(r => r.status === 'approved').length}</p>
                    <p className="text-sm text-gray-600">Durchschnittlicher Betrag: €{Math.round(financingRequests.reduce((sum, r) => sum + r.amount, 0) / financingRequests.length).toLocaleString('de-DE')}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
