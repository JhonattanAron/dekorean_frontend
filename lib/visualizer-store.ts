'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface VisualizerImage {
  url: string
  name: string
}

interface VisualizerStore {
  image: VisualizerImage | null
  zoom: number
  
  setImage: (image: VisualizerImage | null) => void
  clearImage: () => void
  setZoom: (zoom: number) => void
  resetZoom: () => void
}

export const useVisualizerStore = create<VisualizerStore>()(
  persist(
    (set) => ({
      image: null,
      zoom: 100,
      
      setImage: (image) => set({ image }),
      
      clearImage: () => set({ image: null }),
      
      setZoom: (zoom) => set({ zoom: Math.min(Math.max(zoom, 50), 200) }),
      
      resetZoom: () => set({ zoom: 100 }),
    }),
    {
      name: 'visualizer-store',
    }
  )
)
