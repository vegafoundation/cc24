'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'

// Dynamisches Laden des Showroom-Clients (aus Beta)
const ShowroomClient = dynamic(() => import('./ShowroomClient'), {
  ssr: false,
  loading: () => <VAVSRLoader />
})

function VAVSRLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-2xl font-bold">
            <span className="text-primary-500">VAVSR</span>
            <span className="text-white"> - VEGA Automotive Virtual Showroom</span>
          </span>
        </div>
        <p className="text-gray-400">Lade Showroom...</p>
      </div>
    </div>
  )
}

export default function VAVSRShowroom() {
  return (
    <div className="min-h-screen">
      {/* VAVSR Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                <span className="text-primary-500">VAVSR</span>
                <span className="text-gray-300"> - VEGA Automotive Virtual Showroom</span>
              </h1>
              <p className="text-xs text-gray-500">
                Powered by VEGA Enterprise • CarCompany24 GmbH
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/boerse"
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Zur Börse
            </a>
            <a
              href="/"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Startseite
            </a>
          </div>
        </div>
      </header>

      {/* Showroom Client */}
      <ShowroomClient />
    </div>
  )
}
