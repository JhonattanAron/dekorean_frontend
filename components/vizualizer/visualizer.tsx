"use client";

import { useEffect, useState } from "react";
import { ZoomIn, ZoomOut, Maximize2, RotateCw } from "lucide-react";
import { ProductSidebarInputs, SelectionPayload } from "./vizualizer-inputs";
import { Button } from "../ui/button";

interface VisualizerProps {
  imageUrl: string;
  projectId: string; // 🔥 IMPORTANTE
}

export function Visualizer({ imageUrl, projectId }: VisualizerProps) {
  const [zoom, setZoom] = useState(100);
  const [isGenerating, setIsGenerating] = useState(false);

  // 🔥 imagen actual (UX instantánea)
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    if (imageUrl) {
      setCurrentImage(imageUrl);
    }
  }, [imageUrl]);

  const [selection, setSelection] = useState<SelectionPayload>({
    images: [],
    placement: "",
  });

  const handleZoomIn = () => setZoom((z) => Math.min(z + 10, 200));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 10, 50));
  const handleReset = () => setZoom(100);

  // 🔥 NUEVO: guardar como VERSION
  const saveVersion = async (url: string, prompt: string) => {
    try {
      await fetch(`/api/backend/projects/${projectId}/versions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: url,
          prompt,
        }),
      });
    } catch (err) {
      console.error("Error guardando versión", err);
    }
  };

  const handleGenerateDesign = async () => {
    // 🔥 VALIDACIONES
    if (!currentImage) {
      alert("No hay imagen base");
      return;
    }

    if (!selection.images.length) {
      alert("Debes seleccionar al menos una imagen");
      return;
    }

    if (!selection.placement.trim()) {
      alert("Debes escribir dónde colocar los elementos");
      return;
    }

    const hasEmptyRole = selection.images.some(
      (img) => !img.role || img.role.trim() === "",
    );

    if (hasEmptyRole) {
      alert("Todas las imágenes deben tener un role");
      return;
    }

    // 🔥 PROMPT PRO
    const rolesDescription = selection.images.map((img) => img.role).join(", ");

    const prompt = `Usa la primera imagen como escena base. Inserta ${rolesDescription}. ${selection.placement}. Mantén iluminación, perspectiva y estructura original.`;

    // 🔥 BODY FINAL (como tu backend espera)
    const body = {
      prompt,
      referenceImages: [
        {
          url: currentImage,
          role: "escena base",
        },
        ...selection.images.map((img) => ({
          url: img.imageUrl,
          role: img.role,
          priority: "alta",
        })),
      ],
    };

    console.log("BODY FINAL:", body);

    setIsGenerating(true);

    try {
      const res = await fetch("/api/backend/aurentric/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Error: " + data.message);
        return;
      }

      // 🔥 1. UX inmediata
      setCurrentImage(data.url);

      // 🔥 2. guardar como NUEVA VERSION
      await saveVersion(data.url, prompt);

      console.log("✅ Nueva versión guardada");
    } catch (err) {
      console.error(err);
      alert("Error generando imagen");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-screen   mt-[8rem]">
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div className="flex-1 flex items-center justify-center gap-8 p-8">
          {/* 🔥 SIDEBAR */}
          <ProductSidebarInputs onSelectionChange={setSelection} />

          {/* 🔥 BOTÓN GENERAR */}
          <div className="absolute top-6 right-6 z-30">
            <Button
              onClick={handleGenerateDesign}
              disabled={
                isGenerating || !selection.images.length || !selection.placement
              }
              className="px-10 py-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Generando...
                </>
              ) : (
                <>✨ Generar versión</>
              )}
            </Button>
          </div>

          {/* 🔥 CANVAS */}
          <div className="relative w-[60vw] h-[80vh] max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50">
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-500"
              style={{
                backgroundImage: `url("${currentImage}")`,
                transform: `scale(${zoom / 100})`,
              }}
            />

            {/* CONTROLES */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-slate-900/90 backdrop-blur-xl rounded-full px-3 py-2 border border-slate-700 z-20">
              <button onClick={handleZoomIn} className="p-2 text-white">
                <ZoomIn className="w-5 h-5" />
              </button>
              <button onClick={handleZoomOut} className="p-2 text-white">
                <ZoomOut className="w-5 h-5" />
              </button>
              <button onClick={handleReset} className="p-2 text-white">
                <Maximize2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-white">
                <RotateCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
