'use client'

export function FinalCTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto bg-charcoal dark:bg-primary/10 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 relative z-10">
          Dale vida a tus paredes hoy mismo
        </h2>
        <p className="text-white/70 text-lg mb-12 max-w-xl mx-auto relative z-10">
          Hacemos realidad tu visión de un hogar elegante. Solicita una cotización sin compromiso.
        </p>
        <button className="bg-primary hover:bg-primary/90 text-white px-12 py-5 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-2xl relative z-10">
          Cotiza tu proyecto ahora
        </button>
      </div>
    </section>
  )
}
