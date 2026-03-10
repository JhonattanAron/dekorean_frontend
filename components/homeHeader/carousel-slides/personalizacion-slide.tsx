'use client';

import { ArrowRight } from 'lucide-react';

export function PersonalizacionSlide() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          alt="Cocina personalizada"
          className="w-full h-full object-cover"
          src="/carousel/personalizacion.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-20">
        <div className="max-w-2xl">
          <div className="space-y-6">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/20 border border-primary/50 rounded-full text-primary text-sm font-semibold mb-4">
                Tu Estilo Personal
              </span>
              <h2 className="text-5xl md:text-6xl font-black leading-[1.1] tracking-tight text-white text-balance">
                Decora tu <span className="text-primary">Cocina</span>
              </h2>
            </div>
            <p className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
              Personaliza tu cocina a tu gusto con una infinidad de opciones decorativas y funcionales. Adapta cada elemento a tu visión y estilo personal.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300 hover:gap-3">
              Personalizar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
