'use client'

import { Search } from 'lucide-react'
import { UploadBox } from '@/components/upload-box'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface HomeHeroProps {
  demoImages?: Array<{ src: string; alt: string }>
}

export function HomeHero({ demoImages = [] }: HomeHeroProps) {
  const router = useRouter()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [selectedDemo, setSelectedDemo] = useState<number | null>(null)

  const handleUpload = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0]
      setUploadedFile(file)
      
      // Convert file to URL and redirect to visualizer
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        const encodedUrl = encodeURIComponent(imageUrl)
        const encodedName = encodeURIComponent(file.name)
        router.push(`/visualizer?imageUrl=${encodedUrl}&imageName=${encodedName}`)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDemoClick = (index: number) => {
    setSelectedDemo(index)
    // Redirect to visualizer with demo image
    if (demoImages[index]) {
      const encodedUrl = encodeURIComponent(demoImages[index].src)
      const encodedName = encodeURIComponent(`Demo ${index + 1}`)
      router.push(`/visualizer?imageUrl=${encodedUrl}&imageName=${encodedName}`)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          alt="Luxury living room with modern wall panels"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoLEMiTicQNt_u-vXfoy-gj_7Zv2SIGbR0qLrUT7zdwAdlNdErf0M6qVLncjFfiN1KHRNBdOwODaMI2zxaYa2BcIGTRqEYFjvXXiOzm3llRydH0zYAycQ-EIaIRAeVVuG9n9wtdEafmUZ6oCfEbOT_H3ZSLibXvp9s_4p9hz_ydp1EdHCMHHozWf9BUBk9nHBauvGhQHj7PNuj-_xHKnKcUPVKGCfgebkDrwG7BLe1OuxYUQj9DKjnFhGY3bIiR8U4I_kz4DEiSw"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-white text-balance">
              Personaliza tu <br />
              <span className="text-primary">espacio</span> con <br />
              paneles <br />
              innovadores
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-lg leading-relaxed">
              Arrastra y sube una foto de tu pared para aplicarle paneles a escala real y visualizar tu próximo proyecto.
            </p>
          </div>

          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-white/40" />
            </div>
            <input
              className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-md transition-all"
              placeholder="Proyecta todo tu espacio"
              type="text"
            />
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <UploadBox
            title="Arrastra una foto aquí"
            description="Soporta formatos JPG, PNG y HEIC hasta 20MB."
            buttonText="Subir Una Foto"
            demoImages={demoImages}
            onUpload={handleUpload}
            onDemoClick={handleDemoClick}
          />
        </div>
      </div>

      {(uploadedFile || selectedDemo !== null) && (
        <div className="fixed bottom-20 left-6 z-50 bg-primary/20 backdrop-blur border border-primary/50 rounded-lg p-4 max-w-xs">
          {uploadedFile && <p className="text-sm text-white">📁 Cargando: {uploadedFile.name}...</p>}
          {selectedDemo !== null && <p className="text-sm text-white">🖼️ Abriendo demo #{selectedDemo + 1}...</p>}
        </div>
      )}
    </section>
  )
}

