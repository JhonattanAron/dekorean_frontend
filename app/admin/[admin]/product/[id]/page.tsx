"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/admin-layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Product = {
  _id: string;
  externalId: string;
  title: string;
  description?: string;
  images?: string[];
  mainImage?: string;
  specifications?: string;
  sourceUrl?: string;
  videoUrl?: string;
};

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleDownload() {
    if (!selectedImage) return;

    const encodedUrl = encodeURIComponent(selectedImage);

    // Esto llama a tu backend que genera la URL firmada
    const res = await fetch(
      `http://localhost:8082/storage/download?url=${encodedUrl}`,
    );

    if (!res.ok) {
      alert("Error al obtener la URL de descarga");
      return;
    }

    const blob = await res.blob(); // obtenemos el contenido de la imagen
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;

    // Generar nombre de archivo a partir de la URL original
    const fileName = selectedImage.split("/").pop() || "imagen.jpg";
    a.download = fileName;

    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(blobUrl);
  }
  // 🔹 Cargar producto
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:8082/products/${params.id}`);
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.images?.[0] || null);
      } catch (error) {
        console.error("Error al cargar producto:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  // 🔹 Guardar cambios
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!product) return;

    setSaving(true);
    try {
      const res = await fetch(`http://localhost:8082/products/${product._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error(await res.text());

      alert("Producto actualizado con éxito");
      router.back();
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar el producto");
    } finally {
      setSaving(false);
    }
  }

  // 🔹 Subir nueva imagen
  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !product) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      // 🔹 Subir al storage
      const uploadRes = await fetch("http://localhost:8082/storage/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Error al subir imagen");

      const data = await uploadRes.json();
      const imageUrl = data.url;

      // 🔹 Actualizar producto local
      const updatedImages = [...(product.images || []), imageUrl];

      const updatedProduct = {
        ...product,
        images: updatedImages,
        mainImage: product.mainImage || imageUrl,
      };

      setProduct(updatedProduct);
      setSelectedImage(imageUrl);

      // 🔹 PATCH inmediato SOLO imágenes
      const patchRes = await fetch(
        `http://localhost:8082/products/${product._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            images: updatedImages,
            mainImage: updatedProduct.mainImage,
          }),
        },
      );

      if (!patchRes.ok) throw new Error("Error guardando referencia");
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("Error al subir imagen");
    } finally {
      setUploading(false);
    }
  }

  // 🔹 Reemplazar imagen seleccionada
  async function handleReplace(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !product || !selectedImage) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      // 🔹 Subir nueva imagen
      const uploadRes = await fetch("http://localhost:8082/storage/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Error al subir imagen");

      const data = await uploadRes.json();
      const newUrl = data.url;

      // 🔹 Reemplazar en array
      const updatedImages =
        product.images?.map((img) => (img === selectedImage ? newUrl : img)) ||
        [];

      const updatedProduct = {
        ...product,
        images: updatedImages,
        mainImage:
          product.mainImage === selectedImage ? newUrl : product.mainImage,
      };

      setProduct(updatedProduct);
      setSelectedImage(newUrl);

      // 🔹 PATCH inmediato
      const patchRes = await fetch(
        `http://localhost:8082/products/${product._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            images: updatedImages,
            mainImage: updatedProduct.mainImage,
          }),
        },
      );

      if (!patchRes.ok) throw new Error("Error guardando referencia");
    } catch (error) {
      console.error("Error reemplazando imagen:", error);
      alert("Error al reemplazar imagen");
    } finally {
      setUploading(false);
    }
  }

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <AdminLayout>
      <div className="flex gap-6 p-4">
        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-4 max-w-lg">
          <h1 className="text-2xl font-semibold">Editar Producto</h1>

          <div>
            <label>Título</label>
            <Input
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label>Descripción</label>
            <Textarea
              value={product.description || ""}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </div>

          <Button type="submit" disabled={saving}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </form>

        {/* IMÁGENES */}
        <div className="flex-1 flex flex-col gap-4">
          {selectedImage && (
            <div className="border rounded p-4 flex flex-col items-center gap-2">
              <img src={selectedImage} className="max-h-96 object-contain" />

              <Button type="button" onClick={handleDownload}>
                Descargar
              </Button>
              <label className="cursor-pointer px-4 py-2 bg-yellow-500 text-white rounded">
                {uploading ? "Subiendo..." : "Reemplazar imagen"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleReplace}
                />
              </label>
            </div>
          )}

          {/* Subir nueva */}
          <label className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded w-fit">
            {uploading ? "Subiendo..." : "Agregar nueva imagen"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleUpload}
            />
          </label>

          {/* Galería */}
          <div className="flex flex-wrap gap-2">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  img === selectedImage ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
