"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Heart,
  Filter,
  X,
  Search,
} from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { useProductsStore } from "@/lib/products-store";
import { useCartStore } from "@/lib/cart-store";
import { Dialog } from "./ui/dialog";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";

function renderStars(rating: number = 5) {
  return Array.from({ length: 5 }, (_, i) => (i < rating ? "full" : "empty"));
}

export function SearchModal() {
  const { products, loading, fetchProducts } = useProductsStore();
  const { addItem } = useCartStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;

  // Fetch products on mount
  useEffect(() => {
    fetchProducts(1, 100);
  }, [fetchProducts]);

  // Extract unique colors and categories from products
  const COLORS = useMemo(() => {
    const colors = new Set<string>();
    products.forEach((product: any) => {
      if (product.color) colors.add(product.color);
    });
    return Array.from(colors);
  }, [products]);

  const CATEGORIES = useMemo(() => {
    const categories = new Set<string>();
    products.forEach((product: any) => {
      if (Array.isArray(product.category)) {
        product.category.forEach((cat: string) => categories.add(cat));
      } else if (product.category) {
        categories.add(product.category);
      }
    });
    return Array.from(categories);
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product: any) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesColor =
        selectedColors.size === 0 || selectedColors.has(product.color);
      const matchesCategory =
        selectedCategories.size === 0 ||
        (Array.isArray(product.category)
          ? product.category.some((cat: string) => selectedCategories.has(cat))
          : selectedCategories.has(product.category));
      const currentPrice = product.price?.current || product.price?.base || 0;
      const matchesPrice =
        currentPrice >= priceRange[0] && currentPrice <= priceRange[1];

      return matchesSearch && matchesColor && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, selectedColors, selectedCategories, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const toggleColor = (color: string) => {
    const newColors = new Set(selectedColors);
    if (newColors.has(color)) {
      newColors.delete(color);
    } else {
      newColors.add(color);
    }
    setSelectedColors(newColors);
    setPage(1);
  };

  const toggleCategory = (category: string) => {
    const newCategories = new Set(selectedCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setSelectedCategories(newCategories);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedColors(new Set());
    setSelectedCategories(new Set());
    setPriceRange([0, 5000]);
    setPage(1);
  };

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    const price = product.price?.current || product.price?.base || 0;
    addItem({
      id: product._id,
      name: product.title,
      price: price,
      quantity: 1,
      image: product.images?.[0] || "",
    });
    setAddedToCart(new Set([...addedToCart, product._id]));
    setTimeout(() => {
      setAddedToCart(
        (prev) => new Set([...prev].filter((id) => id !== product._id)),
      );
    }, 2000);
  };

  const toggleWishlist = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  const hasActiveFilters =
    selectedColors.size > 0 ||
    selectedCategories.size > 0 ||
    searchQuery !== "" ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 2000;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <>
      {/* Botón trigger */}
      <Button
        onClick={() => setOpen(true)}
        className="
    w-full 
    h-12 
    justify-start 
    gap-3 
    px-4 
    rounded-2xl 
    bg-background/70 
    backdrop-blur-xl 
    border 
    border-border 
    text-black
    my-10
    hover:bg-slate-300
    bg-white
    transition-all 
    duration-300
    shadow-sm
  "
      >
        <Search className="h-4 w-4 opacity-70" />
        <span className="text-sm">Buscar productos...</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Buscar productos</DialogTitle>
          <div className="fixed inset-0 z-50 bg-black/80 text-white backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-7xl h-[90vh] bg-black/80 border border-border rounded-2xl shadow-2xl overflow-hidden flex">
              {/* SIDEBAR */}
              <aside className="w-72 border-r border-border bg-card/40 backdrop-blur-xl overflow-y-auto">
                <div className="p-6 space-y-8">
                  <h2 className="text-xl font-semibold tracking-tight">
                    Filtros
                  </h2>

                  {/* Search */}
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Buscar
                    </label>
                    <Input
                      placeholder="Ej: iPhone, Samsung..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setPage(1);
                      }}
                    />
                  </div>

                  {/* Colores */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Colores</h3>
                    <div className="space-y-2">
                      {COLORS.map((color) => (
                        <label
                          key={color}
                          className="flex items-center gap-2 cursor-pointer text-sm hover:text-primary transition-colors"
                        >
                          <Checkbox
                            checked={selectedColors.has(color)}
                            onCheckedChange={() => toggleColor(color)}
                          />
                          {color}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Categorías */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Categorías</h3>
                    <div className="space-y-2">
                      {CATEGORIES.map((category) => (
                        <label
                          key={category}
                          className="flex items-center gap-2 cursor-pointer text-sm hover:text-primary transition-colors"
                        >
                          <Checkbox
                            checked={selectedCategories.has(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          {category}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Precio */}
                  <div>
                    <h3 className="text-sm font-medium mb-4">Precio</h3>
                    <Slider
                      value={priceRange}
                      onValueChange={(value) => {
                        setPriceRange(value as [number, number]);
                        setPage(1);
                      }}
                      max={5000}
                      step={100}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <Button
                      onClick={clearFilters}
                      variant="secondary"
                      className="w-full"
                    >
                      Limpiar filtros
                    </Button>
                  )}
                </div>
              </aside>

              {/* MAIN */}
              <main className="flex-1 flex flex-col">
                {/* HEADER */}
                <div className="px-8 py-6 border-b border-border flex items-center justify-between bg-card/30 backdrop-blur-md">
                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                      Catálogo
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {loading
                        ? "Cargando..."
                        : `${filteredProducts.length} productos`}
                    </p>
                  </div>

                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto p-8">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin h-10 w-10 border-2 border-primary border-t-transparent rounded-full" />
                    </div>
                  ) : paginatedProducts.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {paginatedProducts.map((product: any) => (
                          <Link
                            key={product._id}
                            href={`/productos/${product.slug}`}
                          >
                            <div className="group bg-card/40 backdrop-blur-xl border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 flex flex-col">
                              <div className="aspect-square bg-muted overflow-hidden">
                                <img
                                  src={
                                    product.images?.[0] || "/placeholder.jpg"
                                  }
                                  alt={product.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>

                              <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-sm font-medium mb-2 line-clamp-2 text-white group-hover:text-primary transition-colors">
                                  {product.title}
                                </h3>

                                <p className="text-lg font-semibold mb-4">
                                  $
                                  {(
                                    product.price?.current ||
                                    product.price?.base ||
                                    0
                                  ).toLocaleString("es-ES")}
                                </p>

                                <button
                                  onClick={(e) => handleAddToCart(e, product)}
                                  className="mt-auto w-full bg-primary text-primary-foreground py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-all"
                                >
                                  {addedToCart.has(product._id)
                                    ? "Agregado ✓"
                                    : "Agregar al carrito"}
                                </button>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* PAGINACIÓN PRO */}
                      {totalPages > 1 && (
                        <div className="flex justify-center mt-10 gap-2">
                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1,
                          ).map((p) => (
                            <button
                              key={p}
                              onClick={() => setPage(p)}
                              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                                p === page
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted hover:bg-muted/70"
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
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
