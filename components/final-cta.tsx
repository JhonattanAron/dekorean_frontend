"use client";

export function FinalCTA() {
  return (
    <section className="py-24 px-6">
      <div className="relative max-w-5xl mx-auto">
        {/* Glow background */}
        <div className="absolute inset-0 bg-primary/10 blur-3xl opacity-40 rounded-3xl"></div>

        {/* Card */}
        <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center overflow-hidden shadow-2xl">
          {/* Decorative gradients */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>

          {/* Content */}
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Dale vida a tus paredes
          </h2>

          <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Convierte cualquier espacio en una experiencia visual elegante y
            moderna. Diseños exclusivos pensados para destacar tu estilo.
          </p>

          {/* CTA */}
          <button
            className="
            relative inline-flex items-center justify-center
            px-10 py-4 rounded-xl font-semibold text-lg
            bg-primary text-primary-foreground
            shadow-lg shadow-primary/30
            transition-all duration-300
            hover:scale-105 hover:shadow-primary/50
            active:scale-95
          "
          >
            Cotiza tu proyecto
          </button>

          {/* Subtext */}
          <p className="text-xs text-muted-foreground mt-6">
            Sin compromiso • Respuesta en menos de 24h
          </p>
        </div>
      </div>
    </section>
  );
}
