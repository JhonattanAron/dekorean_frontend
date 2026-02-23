'use client'

import { Truck, CheckCircle, Headphones, Hammer } from 'lucide-react'

export function WhyChooseUs() {
  const benefits = [
    {
      icon: Truck,
      title: 'Envío seguro',
      description: 'Entrega garantizada con embalaje reforzado.',
    },
    {
      icon: CheckCircle,
      title: 'Garantía',
      description: 'Protección de fábrica por más de 5 años.',
    },
    {
      icon: Headphones,
      title: 'Soporte',
      description: 'Asesoría personalizada para tu proyecto.',
    },
    {
      icon: Hammer,
      title: 'Instalación',
      description: 'Personal calificado para un acabado perfecto.',
    },
  ]

  return (
    <section className="py-24 bg-background-light dark:bg-background-dark px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => {
            const IconComponent = benefit.icon
            return (
              <div
                key={idx}
                className="bg-sand dark:bg-primary/5 p-10 rounded-2xl text-center border border-primary/5 hover:border-primary/20 transition-all"
              >
                <div className="flex justify-center mb-4">
                  <IconComponent className="w-12 h-12 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">{benefit.title}</h3>
                <p className="text-charcoal/60 dark:text-slate-400">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
