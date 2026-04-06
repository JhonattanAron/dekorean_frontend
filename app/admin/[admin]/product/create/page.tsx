"use client";

import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/admin-layout";
import { useProductsStore, ProductCreate } from "@/lib/products-store";
import { CreateProduct } from "@/components/edit-product/create-product"; // 👈 tu nuevo componente

export default function CreateProductPage() {
  const router = useRouter();

  const { addProduct } = useProductsStore();

  /* ---------------- CREATE PRODUCT ---------------- */

  async function handleCreate(newProduct: ProductCreate) {
    try {
      /* 🔥 Auto data (muy importante) */
      const productToSend: ProductCreate = {
        ...newProduct,
        slug: newProduct.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),

        mainImage: newProduct.images[0] || "",

        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const res = await fetch(`/api/backend/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToSend),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const created = await res.json();

      /* 🔥 Actualiza store */
      addProduct(created);

      alert("Producto creado 🚀");

      /* 🔥 Redirige (puedes cambiar esto) */
      router.push(`/admin/products/${created._id}`);
    } catch (err) {
      console.error(err);
      alert("Error creando producto");
    }
  }

  return (
    <AdminLayout>
      <CreateProduct onCreate={handleCreate} />
    </AdminLayout>
  );
}
