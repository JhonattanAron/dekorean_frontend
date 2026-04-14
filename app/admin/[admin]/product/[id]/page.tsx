"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/admin-layout";
import { useProductsStore, Product } from "@/lib/products-store";
import { EditProduct } from "@/components/edit-product/edit-product";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const { getProductByIdAdmin, updateProduct } = useProductsStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD PRODUCT ---------------- */

  useEffect(() => {
    async function load() {
      const data = await getProductByIdAdmin(id as string);

      if (data && typeof data === "object" && data._id) {
        setProduct(data);
      } else {
        setProduct(null);
      }

      setLoading(false);
    }

    load();
  }, [id]);

  /* ---------------- SAVE PRODUCT ---------------- */

  async function handleSave(updatedProduct: Product) {
    try {
      const res = await fetch(`/api/backend/products/${updatedProduct._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      updateProduct(updatedProduct._id, updatedProduct);

      alert("Producto actualizado");
      router.back();
    } catch (err) {
      console.error(err);
      alert("Error actualizando");
    }
  }
  /* ---------------- STATES ---------------- */

  if (loading) return <p className="p-6">Cargando...</p>;
  if (!product) return <p className="p-6">Producto no encontrado</p>;

  return (
    <AdminLayout>
      <EditProduct product={product} onSave={handleSave} />
    </AdminLayout>
  );
}
