"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useProductsStore, Product } from "@/lib/products-store";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X, Play } from "lucide-react";
interface Props {
  formData: any;
  onChange: (field: string, value: any) => void;
  isLoading?: boolean;
}

type FileItem = {
  key: string;
  url: string;
};

/* ==================== SORTABLE VIDEO ITEM ==================== */

function SortableVideoItem({
  id,
  url,
  onRemove,
}: {
  id: string;
  url: string;
  onRemove: (url: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      <div className="w-12 h-12 bg-gray-900 rounded flex items-center justify-center flex-shrink-0">
        <Play className="w-5 h-5 text-white fill-white" />
      </div>

      <span className="flex-1 text-sm text-gray-600 truncate">{url}</span>

      <button
        onClick={() => onRemove(url)}
        className="p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

/* ==================== MAIN COMPONENT ==================== */

export function VideoSelector({ formData, onChange, isLoading }: Props) {
  const { updateProduct } = useProductsStore();

  const [files, setFiles] = useState<FileItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUrl, setSelectedUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  /* ==================== FETCH FILES ==================== */

  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    try {
      const res = await fetch("/api/backend/storage/files");
      const data = await res.json();
      setFiles(data.files || []);
    } catch (err) {
      console.error(err);
    }
  }

  /* ==================== FILTER ==================== */

  const filtered = [...files] // 👈 CLONAR ARRAY
    .sort((a, b) => b.key.localeCompare(a.key)) // 👈 ORDENAR

    .filter((f) => /\.(mp4|webm|mov|avi|mkv|flv|wmv|m4v)$/i.test(f.url))
    .filter((f) => f.url.toLowerCase().includes(search.toLowerCase()));

  /* ==================== ADD VIDEO ==================== */
  const addVideo = (url: string) => {
    if (!url) return;

    if (formData.videos?.includes(url)) return; // evitar duplicados

    const newVideos = [...(formData.videos || []), url];

    onChange("videos", newVideos);

    if (!formData.mainVideo) {
      onChange("mainVideo", url);
    }
  };
  /* ==================== REMOVE VIDEO ==================== */

  const removeVideo = (url: string) => {
    const newVideos = (formData.videos || []).filter(
      (vid: string) => vid !== url,
    );

    onChange("videos", newVideos);

    if (formData.mainVideo === url) {
      onChange("mainVideo", newVideos[0] || "");
    }
  };

  /* ==================== HANDLE DRAG END ==================== */

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id && formData.videos) {
        const oldIndex = formData.videos.indexOf(active.id as string);
        const newIndex = formData.videos.indexOf(over.id as string);

        const newVideos = arrayMove(formData.videos, oldIndex, newIndex);

        onChange("videos", newVideos);
      }
    },
    [formData.videos, onChange],
  );
  /* ==================== UI ==================== */

  return (
    <div className="flex flex-col gap-6">
      {/* 🔍 BUSCADOR */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Buscar video</label>
        <Input
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>

      {/* 📂 CARRUSEL DE VIDEOS SERVIDOR */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">
            Videos disponibles en el Servidor ({filtered.length})
          </label>
          {filtered.length > 0 && (
            <Button
              className="bg-blue-600 hover:bg-blue-400 text-white"
              size="lg"
              onClick={() => setIsModalOpen(true)}
            >
              Ver todas
            </Button>
          )}
        </div>

        {filtered.length > 0 ? (
          <Carousel className="w-full">
            <CarouselContent>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {filtered.map((file) => (
                    <div
                      key={file.key}
                      className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition"
                    >
                      {/* 🎬 VIDEO */}
                      <div className="w-full aspect-video bg-black">
                        <video
                          src={file.url}
                          className="w-full h-full object-cover"
                          controls
                          preload="metadata"
                        />
                      </div>

                      {/* 🔽 FOOTER */}
                      <div className="p-3 flex flex-col gap-2">
                        <p className="text-xs text-gray-500 truncate">
                          {file.url}
                        </p>

                        <Button
                          onClick={() => {
                            addVideo(file.url);
                            setIsModalOpen(false);
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                        >
                          Agregar video
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No hay videos disponibles
                </div>
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {search
              ? "No hay videos que coincidan con tu búsqueda"
              : "No hay videos disponibles"}
          </div>
        )}
      </div>

      {/* 🧾 VIDEOS DEL PRODUCTO (REORDENABLES CON DRAG & DROP) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">
          Videos del Producto ({formData.videos?.length || 0})
        </label>
        {formData.videos && formData.videos.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={formData.videos}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-2">
                {formData.videos.map((vid: string) => (
                  <SortableVideoItem
                    key={vid}
                    id={vid}
                    url={vid}
                    onRemove={removeVideo}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <p className="text-gray-500 text-sm">No hay videos en el producto</p>
        )}
      </div>

      {/* 📂 MODAL CON TODOS LOS VIDEOS SERVIDOR */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Todos los videos disponibles ({filtered.length})
            </DialogTitle>
          </DialogHeader>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((file) => (
                <div
                  key={file.key}
                  className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition"
                >
                  {/* 🎬 VIDEO */}
                  <div className="w-full aspect-video bg-black">
                    <video
                      src={file.url}
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                    />
                  </div>

                  {/* 🔽 FOOTER */}
                  <div className="p-3 flex flex-col gap-2">
                    <p className="text-xs text-gray-500 truncate">{file.url}</p>

                    <Button
                      onClick={() => {
                        addVideo(file.url);
                        setIsModalOpen(false);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                    >
                      Agregar video
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No hay videos disponibles
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
