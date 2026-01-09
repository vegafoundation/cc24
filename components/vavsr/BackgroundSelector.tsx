'use client'

import { motion } from 'framer-motion'

interface BackgroundSelectorProps {
  selected: string
  onSelect: (background: string) => void
}

const BACKGROUNDS = [
  { id: 'vavsr_cyan', name: 'VEGA Cyan', gradient: 'linear-gradient(135deg, #00D9FF 0%, #0099CC 100%)' },
  { id: 'vavsr_emerald', name: 'VEGA Emerald', gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' },
  { id: 'vavsr_gold', name: 'VEGA Gold', gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' },
  { id: 'vavsr_dark', name: 'VEGA Dark', gradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' },
  { id: 'showroom_white', name: 'Showroom Weiß', gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)' },
  { id: 'showroom_gray', name: 'Showroom Grau', gradient: 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)' },
]

export default function BackgroundSelector({ selected, onSelect }: BackgroundSelectorProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Hintergrund wählen</h3>
      <div className="grid grid-cols-2 gap-3">
        {BACKGROUNDS.map((bg) => (
          <button
            key={bg.id}
            onClick={() => onSelect(bg.id)}
            className={`relative h-20 rounded-lg overflow-hidden border-2 transition ${
              selected === bg.id
                ? 'border-vega-cyan ring-2 ring-vega-cyan/50'
                : 'border-gray-700 hover:border-gray-600'
            }`}
            style={{ background: bg.gradient }}
          >
            {selected === bg.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/20"
              >
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
              {bg.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
