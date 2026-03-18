"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Visualizer } from "@/components/vizualizer/visualizer";
import LayoutPage from "@/components/layoutPage";
import { set } from "date-fns";

function VisualizerContent({
  imageUrl,
  imageName,
}: {
  imageUrl: string;
  imageName: string;
}) {
  return <Visualizer imageUrl={imageUrl} imageName={imageName} />;
}

export default function VisualizerPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");

  const id = params.id;

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/backend/users-projects/${id}`);
        const data = await res.json();
        setImageUrl(data.imageUrl);
        setImageName(data.imageName);
      } catch (error) {
        console.error(error);
      } finally {
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
        <VisualizerContent imageUrl={imageUrl} imageName="Imagen cargada" />
      </Suspense>
    </LayoutPage>
  );
}
