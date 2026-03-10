"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function PanelesSlide() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          alt="Paneles decorativos modernos"
          className="w-full h-full object-cover"
          src="/carousel/paneles.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-20">
        <div className="max-w-2xl">
          <div className="space-y-6">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/20 border border-primary/50 rounded-full text-primary text-sm font-semibold mb-4">
                Transformación Visual
              </span>
              <h2 className="text-5xl md:text-6xl font-black leading-[1.1] tracking-tight text-white text-balance">
                Paneles <span className="text-primary">Decorativos</span>
              </h2>
            </div>
            <p className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
              Descubre nuestra colección de paneles decorativos que
              revolucionarán tu espacio con diseños modernos e innovadores.
              Transforma tus paredes en obras de arte.
            </p>
            <Link
              href={"/productos/categories/paneles"}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300 hover:gap-3"
            >
              Explorar Paneles
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
