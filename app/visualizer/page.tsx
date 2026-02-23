'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Visualizer } from '@/components/visualizer'

function VisualizerContent() {
  const searchParams = useSearchParams()
  const imageUrl = searchParams.get('imageUrl')
  const imageName = searchParams.get('imageName')

  if (!imageUrl) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background-dark">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">No se encontró imagen</h1>
          <p className="text-slate-400 mb-6">Por favor, sube una imagen desde el home para visualizarla.</p>
          <a
            href="/"
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all"
          >
            Volver al Home
          </a>
        </div>
      </div>
    )
  }

  return <Visualizer imageUrl={imageUrl} imageName={imageName || 'Imagen cargada'} />
}

export default function VisualizerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-background-dark">
          <div className="text-white">Cargando visualizador...</div>
        </div>
      }
    >
      <VisualizerContent />
    </Suspense>
  )
}
