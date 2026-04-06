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
import { GripVertical, X } from "lucide-react";

interface Props {
  product: Product;
  setProduct: (p: Product) => void;
}

type FileItem = {
  key: string;
  url: string;
};

/* ==================== SORTABLE IMAGE ITEM ==================== */

function SortableImageItem({
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

      <img
        src={url}
        alt="producto"
        className="w-12 h-12 object-cover rounded"
      />

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

export function ImageSelector({ product, setProduct }: Props) {
  const { updateProduct } = useProductsStore();

  const [files, setFiles] = useState<FileItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUrl, setSelectedUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

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

  const filtered = files
    .filter((f) => /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(f.url))
    .filter((f) => f.url.toLowerCase().includes(search.toLowerCase()));

  /* ==================== SAVE PRODUCT ==================== */

  async function saveProduct(updated: Product) {
    await fetch(`/api/backend/products/${product._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        images: updated.images,
        mainImage: updated.mainImage,
      }),
    });

    updateProduct(product._id, updated);
  }

  /* ==================== ADD IMAGE ==================== */

  async function addImage(url: string) {
    if (!url) return;

    const newImages = [...(product.images || []), url];

    const updated: Product = {
      ...product,
      images: newImages,
      mainImage: product.mainImage || url,
    };

    setProduct(updated);
    setSelectedUrl("");

    await saveProduct(updated);
  }

  /* ==================== REMOVE IMAGE ==================== */

  async function removeImage(url: string) {
    const newImages = product.images.filter((img) => img !== url);

    const updated: Product = {
      ...product,
      images: newImages,
      mainImage:
        product.mainImage === url ? newImages[0] || "" : product.mainImage,
    };

    setProduct(updated);
    await saveProduct(updated);
  }

  /* ==================== HANDLE DRAG END ==================== */

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = product.images.indexOf(active.id as string);
        const newIndex = product.images.indexOf(over.id as string);

        const newImages = arrayMove(product.images, oldIndex, newIndex);

        const updated: Product = {
          ...product,
          images: newImages,
        };

        setProduct(updated);
        await saveProduct(updated);
      }
    },
    [product, setProduct, saveProduct],
  );

  /* ==================== UI ==================== */

  return (
    <div className="flex flex-col gap-6">
      {/* 🔍 BUSCADOR */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Buscar imagen</label>
        <Input
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>

      {/* 📂 CARRUSEL DE IMÁGENES SERVIDOR */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">
            Imágenes disponibles en el Servidor ({filtered.length})
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
              {filtered.map((file) => (
                <CarouselItem
                  key={file.key}
                  className="md:basis-1/4 lg:basis-1/6"
                >
                  <button
                    onClick={() => addImage(file.url)}
                    onMouseEnter={() => setHoveredImage(file.url)}
                    onMouseLeave={() => setHoveredImage(null)}
                    className="relative w-full aspect-square rounded-lg border-2 overflow-hidden transition-all border-gray-300 hover:border-blue-400"
                  >
                    <img
                      src={file.url}
                      alt={file.key}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {hoveredImage === file.url && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xs text-center px-2">
                          Click para agregar
                        </span>
                      </div>
                    )}
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {search
              ? "No hay imágenes que coincidan con tu búsqueda"
              : "No hay imágenes disponibles"}
          </div>
        )}
      </div>

      {/* 🧾 IMÁGENES DEL PRODUCTO (REORDENABLES CON DRAG & DROP) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">
          Imágenes del Producto ({product.images?.length || 0})
        </label>
        {product.images && product.images.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={product.images}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-2">
                {product.images.map((img) => (
                  <SortableImageItem
                    key={img}
                    id={img}
                    url={img}
                    onRemove={removeImage}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <p className="text-gray-500 text-sm">
            No hay imágenes en el producto
          </p>
        )}
      </div>

      {/* 📂 MODAL CON TODAS LAS IMÁGENES SERVIDOR */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Todas las imágenes disponibles ({filtered.length})
            </DialogTitle>
          </DialogHeader>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5">
              {filtered.map((file) => (
                <button
                  key={file.key}
                  onClick={() => {
                    addImage(file.url);
                    setIsModalOpen(false);
                  }}
                  onMouseEnter={() => setHoveredImage(file.url)}
                  onMouseLeave={() => setHoveredImage(null)}
                  className="relative aspect-square rounded-lg border-2 overflow-hidden transition-all border-gray-300 hover:border-blue-400"
                >
                  <img
                    src={file.url}
                    alt={file.key}
                    className="w-full h-full object-cover"
                  />

                  {hoveredImage === file.url && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-xs text-center px-2">
                        Click para agregar
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No hay imágenes disponibles
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
