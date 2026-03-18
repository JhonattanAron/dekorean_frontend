"use client";

import { useState } from "react";
import { ZoomIn, ZoomOut, Maximize2, RotateCw } from "lucide-react";

import { ProductSidebarInputs } from "./vizualizer-inputs";

interface VisualizerProps {
  imageUrl: string;
  imageName?: string;
}

export function Visualizer({ imageUrl, imageName }: VisualizerProps) {
  const [zoom, setZoom] = useState(100);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [hotspots] = useState([
    { x: 33, y: 50, label: "Paneles Superiores" },
    { x: 50, y: 75, label: "Área Principal" },
  ]);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 10, 200));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 10, 50));
  const handleReset = () => setZoom(100);

  const handleGenerateDesign = async (prompt: string) => {
    setIsGenerating(true);
    try {
      // Simulate AI design generation
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log("Design generated with AI:", prompt);
      // Here you would integrate with your actual AI API
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOpenAIModal = () => {
    setShowAIModal(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 mt-[4rem]">
      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center gap-8 p-8 bg-gradient-to-br from-slate-950 to-slate-900">
          <ProductSidebarInputs />
          <div className="relative w-[60vw] h-[80vh] max-w-6xl max-h-full bg-white rounded-3xl shadow-2xl overflow-hidden group border border-slate-700/50 backdrop-blur-xl">
            {/* Image Container */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 "
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
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="size-8 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 backdrop-blur-md rounded-full border-2 border-cyan-400 flex items-center justify-center animate-pulse hover:animate-none transition-all shadow-lg shadow-cyan-500/50">
                  <div className="size-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" />
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-md text-white text-xs font-bold rounded-lg opacity-0 group-hover/hotspot:opacity-100 transition-opacity whitespace-nowrap z-10 border border-slate-700/50 shadow-lg">
                  {hotspot.label}
                </div>
              </div>
            ))}

            {/* Canvas Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/10 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl rounded-full px-3 py-2 border border-slate-700/50 z-20">
              <button
                onClick={handleZoomIn}
                className="p-2.5 hover:bg-white/20 dark:hover:bg-slate-800 rounded-full transition-all text-white hover:scale-110"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2.5 hover:bg-white/20 dark:hover:bg-slate-800 rounded-full transition-all text-white hover:scale-110"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <div className="h-5 w-px bg-slate-600 mx-1" />
              <button
                onClick={handleReset}
                className="p-2.5 hover:bg-white/20 dark:hover:bg-slate-800 rounded-full transition-all text-white hover:scale-110"
                title="Reset Zoom"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <button
                className="p-2.5 hover:bg-white/20 dark:hover:bg-slate-800 rounded-full transition-all text-white hover:scale-110"
                title="Rotate"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Panel - Enhanced */}
      </main>
    </div>
  );
}
