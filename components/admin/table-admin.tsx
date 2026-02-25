"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";

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
  createdAt: string;
  updatedAt: string;
};

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 50; // 50 productos por página
  const router = useRouter();
  const params = useParams();

  if (params.admin != "aron") {
    return <h1>No puedes Acedder a esta Pagina</h1>;
  }

  async function handleDelete(id: string): Promise<boolean> {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return false;

    try {
      const res = await fetch(`https://api.dekorans.es/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.error("Error al eliminar el producto", await res.text());
        return false;
      }
      fetchProducts();
      return true;
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      return false;
    }
  }

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.dekorans.es/products?page=${page}&limit=${limit}`,
      );
      const data = await res.json();

      setProducts(Array.isArray(data.items) ? data.items : data.data || []);
      setTotalPages(Math.ceil(data.total / limit) || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [page]);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <table className="min-w-full border-collapse border border-blue-300">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-2 text-left text-sm font-medium">Numero</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Título</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Imagen</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Fuente</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Video</th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr
              key={p._id}
              className="hover:bg-blue-700 duration-500 transition-colors"
            >
              <td className="px-4 py-2 text-sm">{index + 1}</td>
              <td className="px-4 py-2 text-sm">{p.title}</td>
              <td className="px-4 py-2 text-sm">
                {p.images?.[0] ? (
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-2 text-sm">
                {p.sourceUrl ? (
                  <a
                    href={p.sourceUrl}
                    target="_blank"
                    className=" hover:underline"
                  >
                    Ver
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-2 text-sm">
                {p.videoUrl ? (
                  <a
                    href={p.videoUrl}
                    target="_blank"
                    className=" hover:underline"
                  >
                    Ver
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-2 flex space-x-2">
                <Button
                  onClick={() =>
                    router.push(`${params.admin}/product/${p._id}`)
                  }
                  className="bg-green-700 hover:bg-green-500"
                  size="sm"
                >
                  Editar
                </Button>
                <Button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-900 hover:bg-red-600"
                  size="sm"
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-end mt-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Anterior
        </Button>
        <span className="flex items-center px-2 text-sm">
          Página {page} de {totalPages}
        </span>
        <Button
          size="sm"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
