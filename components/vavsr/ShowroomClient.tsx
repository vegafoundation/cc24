'use client'

/**
 * VAVSR Showroom Client
 * Integriert die CC24 Virtual Showroom Beta mit VEGA Branding
 */

import { useState, useEffect, useRef, useCallback } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// VAVSR Theme (VEGA Branding)
const vavsrTheme = {
  colors: {
    primary: '#00D4D4', // VEGA Cyan
    primaryDark: '#00A8A8',
    secondary: '#2A9D8F', // VEGA Teal
    dark: '#0A0F14',
    darker: '#060A0D',
    card: '#1A1F25',
    border: '#2C3239',
    text: '#E8EDF2',
    textMuted: '#9CA8B4',
    success: '#00C853',
    warning: '#FF9500',
    error: '#FF3D57',
    gold: '#C9A962',
  }
}

const REQUIRED_ANGLES = [
  { id: 0, name: 'Front', angle: 0, icon: '🚗' },
  { id: 1, name: 'Front-Rechts', angle: 45, icon: '↗️' },
  { id: 2, name: 'Rechts', angle: 90, icon: '➡️' },
  { id: 3, name: 'Heck-Rechts', angle: 135, icon: '↘️' },
  { id: 4, name: 'Heck', angle: 180, icon: '🔙' },
  { id: 5, name: 'Heck-Links', angle: 225, icon: '↙️' },
  { id: 6, name: 'Links', angle: 270, icon: '⬅️' },
  { id: 7, name: 'Front-Links', angle: 315, icon: '↖️' },
]

const BACKGROUNDS = [
  { id: 'studio_white', name: 'Studio Weiß', gradient: 'linear-gradient(180deg, #ffffff 0%, #e0e0e0 100%)' },
  { id: 'studio_dark', name: 'Studio Dunkel', gradient: 'linear-gradient(180deg, #2a2a2a 0%, #0a0a0a 100%)' },
  { id: 'vavsr_cyan', name: 'VAVSR Cyan', gradient: 'radial-gradient(ellipse at 50% 100%, #00D4D420 0%, #0A0F14 70%)' },
  { id: 'vavsr_luxury', name: 'VEGA Luxury', gradient: 'radial-gradient(ellipse at 50% 100%, #2A9D8F30 0%, #0f0d0a 70%)' },
  { id: 'outdoor_sunset', name: 'Sonnenuntergang', gradient: 'linear-gradient(180deg, #ff7e5f30 0%, #1a0f0a 100%)' },
  { id: 'outdoor_nature', name: 'Natur Grün', gradient: 'linear-gradient(180deg, #00853020 0%, #0a140a 100%)' },
]

export default function ShowroomClient() {
  const [view, setView] = useState<'upload' | 'processing' | 'showroom'>('upload')
  const [uploadedFiles, setUploadedFiles] = useState(
    REQUIRED_ANGLES.map(() => ({ file: null, preview: null, processed: null }))
  )
  const [selectedBackground, setSelectedBackground] = useState('vavsr_cyan')
  const [processingStatus, setProcessingStatus] = useState('upload')
  const [processingProgress, setProcessingProgress] = useState(0)
  const [vehicleId, setVehicleId] = useState<string | null>(null)

  const handleFilesSelected = (files: File[]) => {
    const newUploaded = [...uploadedFiles]
    
    files.forEach((file) => {
      const emptyIndex = newUploaded.findIndex(u => !u.file)
      if (emptyIndex !== -1) {
        const preview = URL.createObjectURL(file)
        newUploaded[emptyIndex] = { file, preview, processed: null }
      }
    })
    
    setUploadedFiles(newUploaded)
  }

  const handleRemoveFile = (index: number) => {
    const newUploaded = [...uploadedFiles]
    if (newUploaded[index].preview) {
      URL.revokeObjectURL(newUploaded[index].preview)
    }
    newUploaded[index] = { file: null, preview: null, processed: null }
    setUploadedFiles(newUploaded)
  }

  const handleStartProcessing = async () => {
    setView('processing')
    const filesToProcess = uploadedFiles.filter(u => u.file)
    
    const vId = `VAVSR-${Date.now().toString(36).toUpperCase()}`
    setVehicleId(vId)

    try {
      // Simuliere Verarbeitung (in Production: API Calls)
      setProcessingStatus('upload')
      for (let i = 0; i < filesToProcess.length; i++) {
        setProcessingProgress(Math.round((i / filesToProcess.length) * 20))
        await new Promise(r => setTimeout(r, 300))
      }

      setProcessingStatus('remove_bg')
      for (let i = 0; i < filesToProcess.length; i++) {
        setProcessingProgress(30 + Math.round((i / filesToProcess.length) * 40))
        await new Promise(r => setTimeout(r, 500))
        
        const newUploaded = [...uploadedFiles]
        const originalIndex = uploadedFiles.findIndex(u => u.file === filesToProcess[i].file)
        if (originalIndex !== -1) {
          newUploaded[originalIndex].processed = newUploaded[originalIndex].preview
        }
        setUploadedFiles(newUploaded)
      }

      setProcessingStatus('enhance')
      setProcessingProgress(80)
      await new Promise(r => setTimeout(r, 1000))

      setProcessingStatus('complete')
      setProcessingProgress(100)
      await new Promise(r => setTimeout(r, 500))

      setView('showroom')
    } catch (error) {
      console.error('Processing error:', error)
    }
  }

  const readyToProcess = uploadedFiles.filter(u => u.file).length >= 8

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {view === 'upload' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Zone */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-2">Fahrzeugfotos hochladen</h2>
              <p className="text-gray-400 mb-6">
                Mindestens 8 Fotos aus verschiedenen Winkeln für 360° Showroom
              </p>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gray-400">
                    {uploadedFiles.filter(u => u.file).length} von {REQUIRED_ANGLES.length} Fotos
                  </span>
                  <span className="text-primary-500 font-semibold">
                    {Math.round((uploadedFiles.filter(u => u.file).length / 8) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300"
                    style={{ width: `${(uploadedFiles.filter(u => u.file).length / 8) * 100}%` }}
                  />
                </div>
              </div>

              {/* Angle Grid */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {REQUIRED_ANGLES.map((angle, index) => {
                  const uploaded = uploadedFiles[index]
                  return (
                    <div
                      key={angle.id}
                      className="aspect-[4/3] rounded-lg border-2 border-dashed flex flex-col items-center justify-center relative overflow-hidden cursor-pointer transition-all hover:border-primary-500"
                      style={{
                        borderColor: uploaded?.file ? vavsrTheme.colors.success : vavsrTheme.colors.border,
                        background: uploaded?.preview 
                          ? `url(${uploaded.preview}) center/cover`
                          : vavsrTheme.colors.card
                      }}
                      onClick={() => !uploaded?.file && document.getElementById('file-input')?.click()}
                    >
                      {uploaded?.file ? (
                        <>
                          <div className="absolute top-2 right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center text-white text-xs">
                            ✓
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleRemoveFile(index); }}
                            className="absolute bottom-2 right-2 w-7 h-7 bg-error rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="text-2xl mb-1">{angle.icon}</span>
                          <span className="text-xs text-gray-400">{angle.name}</span>
                          <span className="text-xs text-gray-600">{angle.angle}°</span>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Drop Zone */}
              <div
                className="border-2 border-dashed border-gray-700 rounded-xl p-10 text-center cursor-pointer hover:border-primary-500 transition-colors"
                onClick={() => document.getElementById('file-input')?.click()}
                onDrop={(e) => {
                  e.preventDefault()
                  const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
                  if (files.length > 0) {
                    handleFilesSelected(files)
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="text-primary-500 mb-3">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-white font-semibold mb-1">Fotos hierher ziehen</p>
                <p className="text-gray-400 text-sm">oder klicken zum Auswählen</p>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || [])
                    if (files.length > 0) {
                      handleFilesSelected(files)
                    }
                  }}
                  className="hidden"
                />
              </div>
            </div>

            {/* Preview & Settings */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Vorschau & Einstellungen</h3>
              
              {/* 360 Viewer Preview */}
              <div className="mb-6 aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-transparent" />
                {uploadedFiles.filter(u => u.preview).length > 0 ? (
                  <img
                    src={uploadedFiles.find(u => u.preview)?.preview}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center text-gray-500">
                    <span className="text-4xl mb-2 block">🚗</span>
                    <p>Keine Bilder vorhanden</p>
                  </div>
                )}
              </div>

              {/* Background Selector */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Showroom Hintergrund</h4>
                <div className="flex gap-2 flex-wrap">
                  {BACKGROUNDS.map(bg => (
                    <button
                      key={bg.id}
                      onClick={() => setSelectedBackground(bg.id)}
                      className="w-16 h-10 rounded-lg border-2 transition-all relative overflow-hidden"
                      style={{
                        borderColor: selectedBackground === bg.id ? vavsrTheme.colors.primary : 'transparent',
                        background: bg.gradient
                      }}
                    >
                      {selectedBackground === bg.id && (
                        <div className="absolute inset-0 bg-primary-500/30 flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Process Button */}
              <button
                onClick={handleStartProcessing}
                disabled={!readyToProcess}
                className="w-full py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <span>✨</span>
                360° Showroom erstellen
              </button>

              {!readyToProcess && (
                <p className="text-warning text-sm text-center mt-2">
                  Noch {8 - uploadedFiles.filter(u => u.file).length} Fotos benötigt
                </p>
              )}
            </div>
          </div>
        )}

        {view === 'processing' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6">Verarbeitung läuft...</h3>
              
              <div className="space-y-4">
                {['upload', 'analyze', 'remove_bg', 'enhance', 'complete'].map((stage, index) => {
                  const isActive = processingStatus === stage
                  const isComplete = ['upload', 'analyze', 'remove_bg', 'enhance'].indexOf(processingStatus) > index
                  
                  return (
                    <div key={stage} className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          isComplete ? 'bg-success' : isActive ? 'bg-primary-500' : 'bg-gray-700'
                        }`}
                      >
                        {isComplete ? '✓' : index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold capitalize">{stage.replace('_', ' ')}</p>
                        {isActive && (
                          <div className="h-1 bg-gray-700 rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-primary-500 animate-pulse" style={{ width: '60%' }} />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300"
                    style={{ width: `${processingProgress}%` }}
                  />
                </div>
                <p className="text-center text-sm text-gray-400 mt-2">{processingProgress}% abgeschlossen</p>
              </div>
            </div>
          </div>
        )}

        {view === 'showroom' && (
          <div>
            <div className="bg-gray-800 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Ihr 360° Showroom ist fertig! 🎉</h2>
                  <p className="text-gray-400">Vehicle ID: {vehicleId}</p>
                </div>
                <button
                  onClick={() => { setView('upload'); setVehicleId(null) }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Neues Fahrzeug
                </button>
              </div>

              {/* 360 Viewer */}
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  {uploadedFiles.filter(u => u.processed || u.preview).length > 0 && (
                    <img
                      src={uploadedFiles.find(u => u.processed || u.preview)?.processed || uploadedFiles.find(u => u.preview)?.preview}
                      alt="360 View"
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary-500 rounded-full text-sm font-bold">
                  360° VAVSR
                </div>
              </div>

              {/* Export Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'boerse', name: 'In Börse einstellen', icon: '📊' },
                  { id: 'mobilede', name: 'Mobile.de Export', icon: '🚗' },
                  { id: 'download', name: 'Download ZIP', icon: '📦' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => alert(`Export für ${opt.name} wird vorbereitet...`)}
                    className="p-6 bg-gray-700 hover:bg-gray-600 rounded-lg text-center transition-colors"
                  >
                    <span className="text-4xl block mb-2">{opt.icon}</span>
                    <span className="font-semibold">{opt.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
