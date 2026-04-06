"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CategoryInput } from "../edit-product/catgeoryInput";
import Link from "next/link";

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

interface Product {
  _id: string;
  title: string;
  price?: {
    current?: number;
  };
  category?: string[];
  images?: string[];
  brand?: string;
  imagesUpdated?: boolean;
}

export default function ProductsTable() {
  const router = useRouter();
  const params = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const [openBulkModal, setOpenBulkModal] = useState(false);
  const [bulkCategories, setBulkCategories] = useState<string[]>([]);

  const LIMIT = 50;

  /* ========== DEBOUNCE ========== */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /* ========== LOAD CATEGORIES ========== */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/backend/categories/tree");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  /* ========== FETCH PRODUCTS ========== */
  async function fetchProducts(p: number, search: string, category: string) {
    setLoading(true);

    try {
      const url = new URL("/api/backend/products", window.location.origin);
      url.searchParams.set("page", p.toString());
      url.searchParams.set("limit", LIMIT.toString());
      if (search) url.searchParams.set("search", search);
      if (category) url.searchParams.set("category", category);

      const res = await fetch(url.toString());
      const data = await res.json();

      setProducts(data.data || []);
      setTotalPages(data.pages || 1);
    } catch (err) {
      console.error("Error cargando productos:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts(page, debouncedSearch, categoryFilter);
  }, [debouncedSearch, page, categoryFilter]);

  /* ========== SELECTION ========== */
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length && products.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p._id));
    }
  };

  /* ========== DELETE BULK ========== */
  async function handleDeleteSelected() {
    if (!confirm("¿Eliminar los productos seleccionados?")) return;

    try {
      const res = await fetch("/api/backend/products/bulk", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (!res.ok) throw new Error("Error eliminando");

      setSelectedIds([]);
      fetchProducts(page, debouncedSearch, categoryFilter);
    } catch (err) {
      console.error("Error:", err);
    }
  }

  /* ========== BULK CATEGORIES ========== */
  async function handleBulkAddCategories() {
    try {
      const res = await fetch("/api/backend/products/bulk/categories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: selectedIds,
          categories: bulkCategories,
        }),
      });

      if (!res.ok) throw new Error("Error actualizando categorías");

      setSelectedIds([]);
      setBulkCategories([]);
      setOpenBulkModal(false);
      fetchProducts(page, debouncedSearch, categoryFilter);
    } catch (err) {
      console.error("Error:", err);
    }
  }

  /* ========== DELETE SINGLE ========== */
  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar producto?")) return;

    try {
      const res = await fetch(`/api/backend/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error eliminando");

      fetchProducts(page, debouncedSearch, categoryFilter);
    } catch (err) {
      console.error("Error:", err);
    }
  }

  return (
    <div className="space-y-6">
      {/* ========== HEADER ========== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Productos</h1>
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setPage(1);
          }}
          className="w-full sm:w-64 px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <optgroup key={cat._id} label={cat.name}>
              <option value={cat.slug}>{cat.name}</option>
              {cat.children?.map((sub) => (
                <option key={sub._id} value={sub.slug}>
                  {`  └ ${sub.name}`}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* ========== SEARCH ========== */}
      <input
        type="text"
        placeholder="Buscar por nombre, marca..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
      />

      {/* ========== ACTIONS ========== */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/aron/product/create"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ➕ Crear Nuevo Producto
        </Link>
        <button
          onClick={() => setOpenBulkModal(true)}
          disabled={selectedIds.length === 0}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ➕ Categorías ({selectedIds.length})
        </button>

        <button
          onClick={handleDeleteSelected}
          disabled={selectedIds.length === 0}
          className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🗑 Eliminar ({selectedIds.length})
        </button>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Página <span className="font-semibold text-foreground">{page}</span>{" "}
          de <span className="font-semibold text-foreground">{totalPages}</span>
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-card border border-border rounded-lg text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            ← Anterior
          </button>

          <button
            onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Siguiente →
          </button>
        </div>
      </div>

      {/* ========== TABLE ========== */}
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                <input
                  type="checkbox"
                  checked={
                    selectedIds.length === products.length &&
                    products.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                #
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Imagen
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Producto
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Marca
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Categorías
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Precio
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Imágenes
              </th>
              <th className="px-4 py-3 text-right font-semibold text-foreground">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Cargando productos...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No hay productos para mostrar
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr
                  key={product._id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(product._id)}
                      onChange={() => toggleSelect(product._id)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-medium">
                    {(page - 1) * LIMIT + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <img
                      src={product.images?.[0] || "/placeholder.jpg"}
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded-md border border-border"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground max-w-xs">
                    <span className="line-clamp-2">{product.title}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {product.brand || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {product.category?.map((cat) => (
                        <span
                          key={cat}
                          className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-medium"
                        >
                          {cat}
                        </span>
                      )) || <span className="text-muted-foreground">—</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground">
                    {product.price?.current
                      ? `$${product.price.current.toLocaleString("es-ES")}`
                      : "$0"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${
                        product.imagesUpdated
                          ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-200"
                          : "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {product.imagesUpdated ? "Reemplazadas" : "Originales"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          router.push(`${params.admin}/product/${product._id}`)
                        }
                        className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-xs font-medium hover:opacity-90 transition-opacity"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-3 py-1 bg-destructive text-destructive-foreground rounded-md text-xs font-medium hover:opacity-90 transition-opacity"
                      >
                        Borrar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ========== PAGINATION ========== */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Página <span className="font-semibold text-foreground">{page}</span>{" "}
          de <span className="font-semibold text-foreground">{totalPages}</span>
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-card border border-border rounded-lg text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            ← Anterior
          </button>

          <button
            onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Siguiente →
          </button>
        </div>
      </div>

      {/* ========== BULK CATEGORIES MODAL ========== */}
      {openBulkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md p-6 space-y-6">
            <h2 className="text-xl font-bold text-foreground">
              Agregar categorías a {selectedIds.length} producto
              {selectedIds.length > 1 ? "s" : ""}
            </h2>

            <CategoryInput
              label="Seleccionar categorías"
              value={bulkCategories}
              onChange={setBulkCategories}
            />

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setOpenBulkModal(false)}
                className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleBulkAddCategories}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
