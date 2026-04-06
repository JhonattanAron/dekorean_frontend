"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useProductsStore, Product } from "@/lib/products-store";
import { Input } from "@/components/ui/input";

interface Props {
  product: Product;
  setProduct: (p: Product) => void;
}

type FileItem = {
  key: string;
  url: string;
};

export function ImageSelector({ product, setProduct }: Props) {
  const { updateProduct } = useProductsStore();

  const [files, setFiles] = useState<FileItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUrl, setSelectedUrl] = useState("");
  const [selectedDelete, setSelectedDelete] = useState("");
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const isVideo = (url: string) => /\.(mp4|webm|mov)$/i.test(url);
  const isImage = (url: string) => /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(url);

  /* ---------------- FETCH FILES ---------------- */

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

  /* ---------------- FILTER ---------------- */

  const filtered = files
    .filter((f) => /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(f.url)) // ✅ solo imágenes
    .filter((f) => f.url.toLowerCase().includes(search.toLowerCase()));

  /* ---------------- SAVE PRODUCT ---------------- */

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

  /* ---------------- ADD IMAGE ---------------- */

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

  /* ---------------- REMOVE FROM PRODUCT ---------------- */

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

  /* ---------------- DELETE FROM STORAGE ---------------- */

  async function deleteFromStorage() {
    if (!selectedDelete) return;

    const confirmDelete = confirm("¿Eliminar del storage?");
    if (!confirmDelete) return;

    await fetch(`/api/backend/storage/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: selectedDelete }),
    });

    setSelectedDelete("");
    fetchFiles();
  }

  /* ---------------- UI ---------------- */

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

      {/* 📂 GALERÍA CON PREVIEWS */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">
          Imágenes disponibles en el Servidor ({filtered.length})
        </label>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
            {filtered.map((file) => (
              <button
                key={file.key}
                onClick={() => addImage(file.url)}
                onMouseEnter={() => setHoveredImage(file.url)}
                onMouseLeave={() => setHoveredImage(null)}
                className={`relative aspect-square rounded-lg border-2 overflow-hidden transition-all ${
                  selectedUrl === file.url
                    ? "border-blue-500 shadow-lg"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <img
                  src={file.url}
                  alt={file.key}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Overlay con info al pasar el mouse */}
                {hoveredImage === file.url && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-xs text-center px-2">
                      Click para agregar
                    </span>
                  </div>
                )}

                {/* Checkmark si está seleccionada */}
                {selectedUrl === file.url && (
                  <div className="absolute top-2 right-2 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {search
              ? "No hay imágenes que coincidan con tu búsqueda"
              : "No hay imágenes disponibles"}
          </div>
        )}
      </div>

      {/* 🧾 IMÁGENES DEL PRODUCTO */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">
          Imágenes del Producto ({product.images?.length || 0})
        </label>
        {product.images && product.images.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {product.images.map((img) => (
              <div key={img} className="relative group">
                <img
                  src={img}
                  alt="producto"
                  className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
                />

                <button
                  onClick={() => removeImage(img)}
                  className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕ Quitar
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            No hay imágenes en el producto
          </p>
        )}
      </div>
    </div>
  );
}
