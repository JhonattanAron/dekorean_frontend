"use client";

import { useEffect, useState, FormEvent } from "react";
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
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const params = useParams();

  // Cargar producto
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `https://api.dekorans.es/products/${params.id}`,
        );
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

  // Guardar cambios
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!product) return;

    setSaving(true);
    try {
      const res = await fetch(
        `https://api.dekorans.es/products/${product._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        },
      );

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

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <AdminLayout>
      <div className="flex gap-6 p-4">
        {/* Formulario de edición */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-4 max-w-lg">
          <h1 className="text-2xl font-semibold">Editar Producto</h1>

          <div>
            <label className="block mb-1">Título</label>
            <Input
              type="text"
              className="w-full border rounded p-2"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block mb-1">Descripción</label>
            <Textarea
              className="w-full border rounded p-2"
              value={product.description || ""}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-1">Imagen principal</label>
            <Input
              type="text"
              className="w-full border rounded p-2"
              value={product.mainImage || ""}
              onChange={(e) =>
                setProduct({ ...product, mainImage: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-1">Especificaciones</label>
            <Input
              type="text"
              className="w-full border rounded p-2"
              value={product.specifications || ""}
              onChange={(e) =>
                setProduct({ ...product, specifications: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-1">Video (URL)</label>
            <Input
              type="url"
              className="w-full border rounded p-2"
              value={product.videoUrl || ""}
              onChange={(e) =>
                setProduct({ ...product, videoUrl: e.target.value })
              }
            />
          </div>

          <Button type="submit" disabled={saving}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </form>

        {/* Visualizador de imágenes */}
        <div className="flex-1 flex flex-col gap-4">
          {selectedImage && (
            <div className="border rounded p-2 flex flex-col items-center">
              <img
                src={selectedImage}
                alt="Imagen seleccionada"
                className="max-h-96 object-contain"
              />
              <a
                href={selectedImage}
                download
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Descargar
              </a>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Imagen ${idx + 1}`}
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
