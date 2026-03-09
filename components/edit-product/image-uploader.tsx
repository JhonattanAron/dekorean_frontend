"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { useProductsStore, Product } from "@/lib/products-store";

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
        {product.images?.map((img, i) => (
          <img
            key={i}
            src={img}
            className={`w-20 h-20 object-cover rounded cursor-pointer border ${
              img === selectedImage ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
    </div>
  );
}
