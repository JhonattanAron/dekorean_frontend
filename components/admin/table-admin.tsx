"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { useProductsStore } from "@/lib/products-store";
interface SubCategory {
  _id: string;
  name: string;
  slug: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  children?: SubCategory[];
}

export default function ProductsTable() {
  const router = useRouter();
  const params = useParams();

  const { products, loading, fetchProducts, page, totalPages } =
    useProductsStore();

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/backend/categories/tree");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("error cargando categorias", error);
      }
    };

    fetchCategories();
  }, []);

  const limit = 50;

  if (params.admin != "aron") {
    return <h1>No puedes acceder a esta página</h1>;
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar producto?")) return;

    try {
      const res = await fetch(`/api/backend/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error eliminando");

      fetchProducts(page, limit, "", category);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchProducts(page, limit, "", category);
  }, [page, category]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Productos</h1>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-lg text-sm"
        >
          <option value="">Todas las categorías</option>

          {categories.map((cat) => (
            <optgroup key={cat._id} label={cat.name}>
              <option value={cat.slug}>{cat.name}</option>

              {cat.children?.map((sub) => (
                <option key={sub._id} value={sub.slug}>
                  └ {sub.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto border border-zinc-800 rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-900">
            <tr className="text-left border-b border-zinc-800">
              <th className="px-4 py-3">#</th>

              <th className="px-4 py-3">Imagen</th>

              <th className="px-4 py-3">Producto</th>

              <th className="px-4 py-3">Marca</th>

              <th className="px-4 py-3">Categorías</th>

              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Imagenes Editadas</th>

              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-10">
                  Cargando productos...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10">
                  No hay productos
                </td>
              </tr>
            ) : (
              products.map((p, index) => (
                <tr
                  key={p._id}
                  className="border-b border-zinc-800 hover:bg-zinc-900 transition-colors"
                >
                  <td className="px-4 py-3 text-zinc-400">
                    {(page - 1) * limit + index + 1}
                  </td>

                  <td className="px-4 py-3">
                    <img
                      src={p.images?.[0] || "/placeholder.jpg"}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                  </td>

                  <td className="px-4 py-3 font-medium max-w-[250px] truncate">
                    {p.title}
                  </td>

                  <td className="px-4 py-3 text-zinc-400">{p.brand || "-"}</td>

                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {p.category?.map((c) => (
                        <span
                          key={c}
                          className="text-xs bg-zinc-800 px-2 py-1 rounded"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    ${p.price?.current ?? "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full border
    ${
      p.imagesUpdated
        ? "bg-green-100 text-green-700 border-green-200"
        : "bg-gray-100 text-gray-600 border-gray-200"
    }`}
                    >
                      {p.imagesUpdated ? "Imágenes reemplazadas" : "Originales"}
                    </span>
                  </td>

                  <td className="px-4 py-3 flex justify-end gap-2">
                    <Button
                      onClick={() =>
                        router.push(`${params.admin}/product/${p._id}`)
                      }
                      className="bg-green-700 hover:bg-green-600"
                      size="sm"
                    >
                      Editar
                    </Button>

                    <Button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-800 hover:bg-red-600"
                      size="sm"
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-zinc-400">
          Página {page} de {totalPages}
        </span>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => fetchProducts(page - 1, limit, "", category)}
          >
            Anterior
          </Button>

          <Button
            size="sm"
            disabled={page === totalPages}
            onClick={() => fetchProducts(page + 1, limit, "", category)}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
