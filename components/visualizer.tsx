'use client'

import { useState } from 'react'
import { ChevronLeft, ZoomIn, ZoomOut, Maximize2, RotateCw } from 'lucide-react'
import Link from 'next/link'
import { useVisualizerStore } from '@/lib/visualizer-store'

interface VisualizerProps {
  imageUrl: string
  imageName?: string
}

export function Visualizer({ imageUrl, imageName }: VisualizerProps) {
  const [zoom, setZoom] = useState(100)
  const { toggleCart } = useCart()
  const [hotspots] = useState([
    { x: 33, y: 50, label: 'Paneles Superiores' },
    { x: 50, y: 75, label: 'Área Principal' },
  ])

  const handleZoomIn = () => setZoom((z) => Math.min(z + 10, 200))
  const handleZoomOut = () => setZoom((z) => Math.max(z - 10, 50))
  const handleReset = () => setZoom(100)

  return (
    <div className="flex flex-col h-screen bg-background-dark dark:bg-background-dark">
      {/* Header */}
      <header className="flex items-center justify-between h-16 px-6 bg-slate-900 border-b border-slate-800 shrink-0 z-30">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-400 hover:text-white" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-white">Visualizador de Paneles</h1>
            {imageName && (
              <p className="text-xs text-slate-400">{imageName}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 px-3 py-1 bg-slate-800 rounded-full">
            {zoom}%
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-slate-950 to-slate-900">
          <div className="relative w-full h-full max-w-6xl max-h-full bg-white rounded-2xl shadow-2xl overflow-hidden group border border-slate-800">
            {/* Image Container */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
              style={{
                backgroundImage: `url("${imageUrl}")`,
                transform: `scale(${zoom / 100})`,
              }}
            />

            {/* Hotspots */}
            {hotspots.map((hotspot, idx) => (
              <div
                key={idx}
                className="absolute group/hotspot cursor-pointer"
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="size-8 bg-primary/20 backdrop-blur-md rounded-full border border-primary flex items-center justify-center animate-pulse hover:animate-none transition-all">
                  <div className="size-2 bg-primary rounded-full" />
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold rounded opacity-0 group-hover/hotspot:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {hotspot.label}
                </div>
              </div>
            ))}

            {/* Canvas Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/10 dark:bg-slate-900/90 backdrop-blur shadow-lg rounded-full px-2 py-1.5 border border-slate-700/50 z-20">
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-white/20 dark:hover:bg-slate-800 rounded-full transition-colors text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-white/20 dark:hover:bg-slate-800 rounded-full transition-colors text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <div className="h-4 w-px bg-slate-600 mx-1" />
              <button
                onClick={handleReset}
                className="p-2 hover:bg-white/20 dark:hover:bg-slate-800 rounded-full transition-colors text-white"
                title="Reset Zoom"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <button
                className="p-2 hover:bg-white/20 dark:hover:bg-slate-800 rounded-full transition-colors text-white"
                title="Rotate"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="bg-slate-900 border-t border-slate-800 p-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Personaliza tu Proyecto</h3>
              <p className="text-xs text-slate-400">Haz clic en los puntos interactivos para seleccionar paneles y configurar tu diseño</p>
            </div>
            <Link href="/productos">
              <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-primary/30">
                Ver Catálogo de Paneles
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
