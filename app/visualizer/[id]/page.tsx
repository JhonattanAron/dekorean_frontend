"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Visualizer } from "@/components/vizualizer/visualizer";
import LayoutPage from "@/components/layoutPage";
import { set } from "date-fns";

function VisualizerContent({ imageUrl, id }: { imageUrl: string; id: string }) {
  return <Visualizer imageUrl={imageUrl} projectId={id as string} />;
}

export default function VisualizerPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const [imageUrl, setImageUrl] = useState("");

  const id = params.id;

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        // 🔥 obtener imagen actual (version activa)
        const res = await fetch(`/api/backend/projects/${id}/current-image`);

        const data = await res.json();

        if (!data.success) {
          console.error(data.message);
          return;
        }

        setImageUrl(data.url);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, [id]);

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
        <VisualizerContent imageUrl={imageUrl} id={id as string} />
      </Suspense>
    </LayoutPage>
  );
}
