"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { useProductsStore, Product } from "@/lib/products-store";

import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

interface Props {
  product: Product;
  setProduct: (p: Product) => void;
  selectedImage: string | null;
  setSelectedImage: (img: string) => void;
}

export function ImageUploader({
  product,
  setProduct,
  selectedImage,
  setSelectedImage,
}: Props) {
  const { updateProduct } = useProductsStore();
  const [uploading, setUploading] = useState(false);

  /* ---------------- UPLOAD IMAGE ---------------- */

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      const res = await fetch(`/api/backend/storage/upload`, {
        method: "POST",
        body: formData, // ✅ NO JSON
      });

      if (!res.ok) throw new Error("Error subiendo imagen");

      const data = await res.json();
      const newImages = [...(product.images || []), data.url];

      const updated: Product = {
        ...product,
        images: newImages,
        mainImage: product.mainImage || data.url,
      };

      setProduct(updated);
      setSelectedImage(data.url);

      // ✅ PATCH solo con campos a actualizar
      await fetch(`/api/backend/products/${product._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          images: newImages,
          mainImage: updated.mainImage,
        }),
      });

      updateProduct(product._id, updated);
    } catch (err) {
      console.error(err);
      alert("Error subiendo imagen");
    } finally {
      setUploading(false);
    }
  }

  /* ---------------- REPLACE IMAGE ---------------- */

  async function handleReplace(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !selectedImage) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      const res = await fetch(`/api/backend/storage/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("UPLOAD ERROR:", text);
        throw new Error(text);
      }

      const data = await res.json();
      const newImages =
        product.images?.map((img) =>
          img === selectedImage ? data.url : img,
        ) || [];

      const updated: Product = {
        ...product,
        images: newImages,
        mainImage:
          product.mainImage === selectedImage ? data.url : product.mainImage,
      };

      setProduct(updated);
      setSelectedImage(data.url);
      console.log(product._id);

      await fetch(`/api/backend/products/${product._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          images: newImages,
          mainImage: updated.mainImage,
        }),
      });

      updateProduct(product._id, updated);
    } catch (err) {
      console.error(err);
      alert("Error reemplazando imagen");
    } finally {
      setUploading(false);
    }
  }

  /* ---------------- DOWNLOAD ---------------- */

  async function handleDownload() {
    if (!selectedImage) return;

    const encodedUrl = encodeURIComponent(selectedImage);
    const res = await fetch(`/api/backend/storage/download?url=${encodedUrl}`);

    if (!res.ok) {
      alert("Error descargando");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = selectedImage.split("/").pop() || "image.jpg";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = product.images.indexOf(active.id);
    const newIndex = product.images.indexOf(over.id);

    const updatedImages = arrayMove(product.images, oldIndex, newIndex);

    const updatedProduct = {
      ...product,
      images: updatedImages,
      mainImage: updatedImages[0], // 🔥 importante
    };

    setProduct(updatedProduct);

    // 🔥 guardar en backend
    fetch(`/api/backend/products/${product._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        images: updatedImages,
        mainImage: updatedImages[0],
      }),
    });

    updateProduct(product._id, updatedProduct);
  }

  return (
    <div className="flex flex-col gap-4">
      {selectedImage && (
        <div className="border rounded p-4 flex flex-col items-center gap-2">
          <img src={selectedImage} className="max-h-96 object-contain" />
          <Button onClick={handleDownload}>Descargar</Button>
          <label className="cursor-pointer px-4 py-2 bg-yellow-500 text-white rounded">
            {uploading ? "Subiendo..." : "Reemplazar imagen"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleReplace}
            />
          </label>
        </div>
      )}

      <label className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded w-fit">
        {uploading ? "Subiendo..." : "Agregar imagen"}
        <input type="file" hidden accept="image/*" onChange={handleUpload} />
      </label>

      <div className="flex flex-wrap gap-2">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={product.images || []}
            strategy={rectSortingStrategy}
          >
            <div className="flex flex-wrap gap-2">
              {product.images?.map((img) => (
                <SortableImage
                  key={img}
                  id={img}
                  src={img}
                  selected={img === selectedImage}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableImage({
  id,
  src,
  selected,
  onClick,
}: {
  id: string;
  src: string;
  selected: boolean;
  onClick: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <img
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      src={src}
      onClick={onClick}
      className={`w-20 h-20 object-cover rounded cursor-grab border ${
        selected ? "border-blue-500" : "border-gray-300"
      }`}
    />
  );
}
