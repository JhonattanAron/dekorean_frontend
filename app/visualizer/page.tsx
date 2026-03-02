"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Visualizer } from "@/components/visualizer";

function VisualizerContent() {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("imageUrl");
  const imageName = searchParams.get("imageName");

  return (
    <Visualizer
      imageUrl={
        "https://www.viacelere.com/wp-content/uploads/old-blog/2017/10/tipos-de-cocina_opt.jpg"
      }
      imageName={imageName || "Imagen cargada"}
    />
  );
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
  );
}
