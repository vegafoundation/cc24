'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  text: string
  vehicle: string
  image?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Michael Schmidt',
    location: 'Göttingen',
    rating: 5,
    text: 'Sehr professionelle Beratung und schnelle Abwicklung. Das Auto war genau wie beschrieben. Kann ich nur weiterempfehlen!',
    vehicle: 'BMW 320d (2019)',
  },
  {
    id: 2,
    name: 'Sarah Müller',
    location: 'Kassel',
    rating: 5,
    text: 'Trotz negativer Schufa wurde mir eine Finanzierung ermöglicht. Vielen Dank für die unkomplizierte Lösung!',
    vehicle: 'VW Golf 8 (2021)',
  },
  {
    id: 3,
    name: 'Thomas Weber',
    location: 'Hannover',
    rating: 5,
    text: 'Der 360° Showroom ist genial! Konnte das Auto von allen Seiten betrachten, bevor ich es gekauft habe.',
    vehicle: 'Mercedes C-Klasse (2020)',
  },
  {
    id: 4,
    name: 'Lisa Hoffmann',
    location: 'Braunschweig',
    rating: 5,
    text: 'Kostenlose Lieferung bis vor die Haustür - das hat mich überzeugt. Sehr zuverlässiger Service!',
    vehicle: 'Audi A4 (2018)',
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Was unsere Kunden sagen
          </h2>
          <p className="text-lg text-gray-600">
            Über 2.800 zufriedene Kunden vertrauen auf CarCompany24
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 rounded-lg p-8 md:p-12"
            >
              <Quote className="w-12 h-12 text-primary-500 mb-6" />
              <p className="text-lg text-gray-700 mb-6 italic">
                &quot;{testimonials[currentIndex].text}&quot;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="font-semibold text-gray-900">{testimonials[currentIndex].name}</p>
                  <p className="text-sm text-gray-600">
                    {testimonials[currentIndex].location} • {testimonials[currentIndex].vehicle}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Vorheriges Testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Nächstes Testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary-500 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
