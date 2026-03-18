"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Visualizer } from "@/components/visualizer";
import { HomeHero } from "@/components/homeHeader/carousel-slides/home-hero";
import LayoutPage from "@/components/layoutPage";
import { ro } from "date-fns/locale";

function VisualizerContent() {
  return (
    <Visualizer
      imageUrl="https://www.viacelere.com/wp-content/uploads/old-blog/2017/10/tipos-de-cocina_opt.jpg"
      imageName="Imagen cargada"
    />
  );
}

export default function VisualizerPage() {
  const searchParams = useSearchParams();
  const params = useParams();

  const id = params.id;

  if (!id) {
    return <div>sin Id</div>;
  }

  return (
    <LayoutPage>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-background-dark">
            <div className="text-white">Cargando visualizador...</div>
          </div>
        }
      >
        <VisualizerContent />
      </Suspense>
    </LayoutPage>
  );
}
