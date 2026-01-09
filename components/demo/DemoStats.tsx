'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, Users, Car, Euro } from 'lucide-react'
import AnimatedStat from '@/components/animations/AnimatedStats'

interface Stat {
  icon: React.ReactNode
  label: string
  value: number
  suffix: string
  color: string
}

export default function DemoStats() {
  const [stats, setStats] = useState<Stat[]>([
    {
      icon: <Car className="w-6 h-6" />,
      label: 'Fahrzeuge im Bestand',
      value: 127,
      suffix: '+',
      color: 'primary',
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: 'Zufriedene Kunden',
      value: 2847,
      suffix: '+',
      color: 'secondary',
    },
    {
      icon: <Euro className="w-6 h-6" />,
      label: 'Durchschnittlicher Verkaufspreis',
      value: 18950,
      suffix: '€',
      color: 'accent',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Wachstum',
      value: 34,
      suffix: '%',
      color: 'primary',
    },
  ])

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Unsere Zahlen sprechen für sich
          </h2>
          <p className="text-lg text-gray-600">
            Transparent, ehrlich, erfolgreich
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  stat.color === 'primary'
                    ? 'bg-primary-100 text-primary-500'
                    : stat.color === 'secondary'
                    ? 'bg-secondary-100 text-secondary-500'
                    : 'bg-accent-100 text-accent-500'
                }`}
              >
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                <AnimatedStat
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.value < 100 ? 0 : 0}
                />
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
