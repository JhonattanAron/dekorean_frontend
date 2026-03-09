"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { X, Search, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { useProductsStore } from "@/lib/products-store";
import { useCartStore } from "@/lib/cart-store";
import { Dialog } from "./ui/dialog";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";

export function SearchModal() {
  const { products, loading, fetchProducts, totalPages } = useProductsStore();
  const { addItem } = useCartStore();

  const [open, setOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set());

  const itemsPerPage = 100;

  /* ---------------- FETCH SEARCH ---------------- */

  useEffect(() => {
    if (!open) return;

    const timeout = setTimeout(() => {
      fetchProducts(page, itemsPerPage, searchQuery);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery, page, open]);

  /* ---------------- DATA EXTRACTION ---------------- */

  const COLORS = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p: any) => p.color && set.add(p.color));
    return Array.from(set);
  }, [products]);

  const CATEGORIES = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p: any) => {
      if (Array.isArray(p.category))
        p.category.forEach((c: string) => set.add(c));
      else if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [products]);

  /* ---------------- FILTER FRONTEND ---------------- */

  const filteredProducts = useMemo(() => {
    return products.filter((product: any) => {
      const price = product.price?.current || product.price?.base || 0;

      const matchColor =
        selectedColors.size === 0 || selectedColors.has(product.color);

      const matchCategory =
        selectedCategories.size === 0 ||
        (Array.isArray(product.category)
          ? product.category.some((c: string) => selectedCategories.has(c))
          : selectedCategories.has(product.category));

      const matchPrice = price >= priceRange[0] && price <= priceRange[1];

      return matchColor && matchCategory && matchPrice;
    });
  }, [products, selectedColors, selectedCategories, priceRange]);

  /* ---------------- CART ---------------- */

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();

    const price = product.price?.current || product.price?.base || 0;

    addItem({
      id: product._id,
      name: product.title,
      price,
      quantity: 1,
      image: product.images?.[0] || "",
    });

    setAddedToCart((prev) => new Set(prev).add(product._id));

    setTimeout(() => {
      setAddedToCart((prev) => {
        const set = new Set(prev);
        set.delete(product._id);
        return set;
      });
    }, 2000);
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      {/* BOTÓN BUSCAR */}
      <Button
        onClick={() => setOpen(true)}
        className="w-full h-12 justify-start gap-3 px-4 rounded-2xl bg-white text-black my-10 hover:bg-slate-300"
      >
        <Search className="h-4 w-4 opacity-70" />
        <span className="text-sm">Buscar productos...</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 border-none bg-transparent max-w-7xl">
          <DialogTitle className="hidden">Buscar</DialogTitle>

          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
            <div
              className="
              w-full 
              h-full 
              md:h-[90vh] 
              md:max-w-7xl
              bg-black/90 
              text-white
              md:rounded-2xl
              flex 
              flex-col
              md:flex-row
              overflow-hidden
            "
            >
              {/* SIDEBAR DESKTOP */}
              <aside className="hidden md:block w-72 border-r border-border overflow-y-auto bg-card/40">
                <Filters
                  {...{
                    searchQuery,
                    setSearchQuery,
                    COLORS,
                    CATEGORIES,
                    selectedColors,
                    selectedCategories,
                    setSelectedColors,
                    setSelectedCategories,
                    priceRange,
                    setPriceRange,
                  }}
                />
              </aside>

              {/* MAIN */}
              <main className="flex-1 flex flex-col">
                {/* HEADER */}
                <div className="p-4 md:p-6 border-b border-border flex items-center justify-between">
                  <div>
                    <h1 className="text-xl md:text-2xl font-semibold">
                      Catálogo
                    </h1>

                    <p className="text-sm text-muted-foreground">
                      {loading
                        ? "Cargando..."
                        : `${filteredProducts.length} productos`}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {/* BOTÓN FILTROS MOBILE */}
                    <button
                      onClick={() => setFiltersOpen(!filtersOpen)}
                      className="md:hidden p-2 rounded-lg bg-muted"
                    >
                      <Filter className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => setOpen(false)}
                      className="p-2 rounded-lg hover:bg-muted"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* FILTROS MOBILE */}
                {filtersOpen && (
                  <div className="md:hidden border-b border-border p-4 overflow-y-auto max-h-[40vh]">
                    <Filters
                      {...{
                        searchQuery,
                        setSearchQuery,
                        COLORS,
                        CATEGORIES,
                        selectedColors,
                        selectedCategories,
                        setSelectedColors,
                        setSelectedCategories,
                        priceRange,
                        setPriceRange,
                      }}
                    />
                  </div>
                )}

                {/* GRID */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                  {loading ? (
                    <div className="flex justify-center items-center h-full">
                      <div className="animate-spin h-10 w-10 border-2 border-primary border-t-transparent rounded-full" />
                    </div>
                  ) : filteredProducts.length > 0 ? (
                    <div
                      className="
                      grid
                      grid-cols-2
                      md:grid-cols-2
                      lg:grid-cols-3
                      gap-4
                      md:gap-8
                    "
                    >
                      {filteredProducts.map((product: any) => (
                        <Link
                          key={product._id}
                          href={`/productos/${product.slug}`}
                        >
                          <div className="group border border-border rounded-2xl overflow-hidden flex flex-col bg-card/40">
                            <div className="aspect-square overflow-hidden">
                              <img
                                src={product.images?.[0] || "/placeholder.jpg"}
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition"
                              />
                            </div>

                            <div className="p-3 md:p-5 flex flex-col flex-1">
                              <h3 className="text-xs md:text-sm font-medium line-clamp-2 mb-2">
                                {product.title}
                              </h3>

                              <p className="text-sm md:text-lg font-semibold mb-3">
                                $
                                {(product.price?.current || 0).toLocaleString(
                                  "es-ES",
                                )}
                              </p>

                              <button
                                onClick={(e) => handleAddToCart(e, product)}
                                className="mt-auto w-full bg-primary py-2 rounded-xl text-xs md:text-sm"
                              >
                                {addedToCart.has(product._id)
                                  ? "✓ Agregado"
                                  : "Agregar"}
                              </button>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-full text-muted-foreground">
                      No se encontraron productos
                    </div>
                  )}
                </div>
              </main>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ---------------- COMPONENTE FILTROS ---------------- */

function Filters({
  searchQuery,
  setSearchQuery,
  COLORS,
  CATEGORIES,
  selectedColors,
  selectedCategories,
  setSelectedColors,
  setSelectedCategories,
  priceRange,
  setPriceRange,
}: any) {
  const toggleColor = (color: string) => {
    const set = new Set(selectedColors);
    set.has(color) ? set.delete(color) : set.add(color);
    setSelectedColors(set);
  };

  const toggleCategory = (cat: string) => {
    const set = new Set(selectedCategories);
    set.has(cat) ? set.delete(cat) : set.add(cat);
    setSelectedCategories(set);
  };

  return (
    <div className="space-y-6 m-10">
      <Input
        placeholder="Buscar..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div>
        <h3 className="text-sm font-medium mb-2">Colores</h3>

        {COLORS.map((color: string) => (
          <label key={color} className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={selectedColors.has(color)}
              onCheckedChange={() => toggleColor(color)}
            />
            {color}
          </label>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Categorías</h3>

        {CATEGORIES.map((cat: string) => (
          <label key={cat} className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={selectedCategories.has(cat)}
              onCheckedChange={() => toggleCategory(cat)}
            />
            {cat}
          </label>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Precio</h3>

        <Slider
          value={priceRange}
          max={5000}
          step={100}
          onValueChange={(v) => setPriceRange(v)}
        />

        <div className="flex justify-between text-xs mt-1">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}
