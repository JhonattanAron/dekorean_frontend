'use client'

import { Shield, Truck, Wrench, Sparkles } from 'lucide-react'

export function QualitySection() {
  const features = [
    {
      icon: Shield,
      title: 'Material resistente',
      description: 'Soporta humedad y roces diarios.',
    },
    {
      icon: Truck,
      title: 'Importación directa',
      description: 'Precios competitivos sin intermediarios.',
    },
    {
      icon: Wrench,
      title: 'Fácil instalación',
      description: 'Sistema click de montaje rápido.',
    },
    {
      icon: Sparkles,
      title: 'Acabados premium',
      description: 'Texturas realistas al tacto y vista.',
    },
  ]

  return (
    <section className="bg-sand dark:bg-background-dark/30 py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full z-0"></div>
            <img
              alt="Textura de panel"
              className="relative z-10 w-full rounded-2xl shadow-2xl"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ7-zPGXlNtnIdrnnwls-hrT3d7sPTTD1LaAHtkXyzA_8RpF3UPZ5lCjTUQ6pJYtmz7BzZ3Tm18taMPlSYdZd3nLFDWZYX6sEVkvDf3tr3v-6mQakhuChEUiN6A1CbpLIYEZNBYBX_MJ0cKHFLfhCivdRXfQ91UIfFYkQCI-Mis58iNe0_WwKxw76PDcodo0694arCkTfVNtny8UYYKPeGDPR66Udd2xChHf-0xX8wQ-AfKtPmyc7SzGvLfdSDrxzDAWXafwWFbPQ"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border-8 border-primary/10 rounded-2xl z-0"></div>
          </div>

          <div className="space-y-8">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm">El Estándar más Alto</span>
              <h2 className="font-serif text-4xl md:text-5xl mt-2 leading-tight">Calidad que se siente</h2>
              <p className="text-charcoal/70 dark:text-slate-400 mt-4 text-lg">
                Nuestros paneles están diseñados para ofrecer una experiencia sensorial única y una durabilidad excepcional en cualquier entorno.
              </p>
            </div>

            <ul className="space-y-4">
              {features.map((feature, idx) => {
                const IconComponent = feature.icon
                return (
                  <li key={idx} className="flex items-center gap-4 group">
                    <div className="bg-primary/10 group-hover:bg-primary group-hover:text-white transition-all p-2 rounded-full">
                      <IconComponent className="w-5 h-5 text-primary group-hover:text-white" />
                    </div>
                    <span className="font-medium text-lg">
                      <strong>{feature.title}:</strong> {feature.description}
                    </span>
                  </li>
                )
              })}
            </ul>

            <button className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg">
              Solicitar información
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

