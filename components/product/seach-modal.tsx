"use client";

import { useState, useMemo } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { DialogTitle } from "@radix-ui/react-dialog";

// Datos simulados de productos
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Camiseta Premium",
    category: "Ropa",
    color: "Azul",
    price: 29.99,
    image: "🔵",
  },
  {
    id: 2,
    name: "Pantalón Casual",
    category: "Ropa",
    color: "Negro",
    price: 59.99,
    image: "⚫",
  },
  {
    id: 3,
    name: "Zapatos Deportivos",
    category: "Calzado",
    color: "Rojo",
    price: 89.99,
    image: "🔴",
  },
  {
    id: 4,
    name: "Gorro Invierno",
    category: "Accesorios",
    color: "Verde",
    price: 19.99,
    image: "🟢",
  },
  {
    id: 5,
    name: "Bufanda Elegante",
    category: "Accesorios",
    color: "Blanco",
    price: 24.99,
    image: "⚪",
  },
  {
    id: 6,
    name: "Chaqueta Cuero",
    category: "Ropa",
    color: "Gris",
    price: 99.99,
    image: "⚫",
  },
];

interface SearchModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
}

export function SearchModal({
  isOpen,
  onOpenChange,
  searchQuery,
}: SearchModalProps) {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    colors: true,
    categories: true,
  });

  const colors = ["Azul", "Negro", "Rojo", "Verde", "Blanco", "Gris"];
  const categories = ["Ropa", "Calzado", "Accesorios"];

  const filteredResults = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesQuery =
        !searchQuery.trim() ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesColor =
        selectedColors.length === 0 || selectedColors.includes(product.color);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      return matchesQuery && matchesColor && matchesCategory;
    });
  }, [searchQuery, selectedColors, selectedCategories]);

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const clearAllFilters = () => {
    setSelectedColors([]);
    setSelectedCategories([]);
  };

  const hasActiveFilters =
    selectedColors.length > 0 || selectedCategories.length > 0;

  return (
    <Dialog>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-5xl overflow-hidden p-0 border-0 bg-background/80 backdrop-blur-xl shadow-2xl rounded-2xl">
        <DialogTitle className="sr-only">Buscar productos</DialogTitle>

        <div className="flex h-[90vh] overflow-hidden">
          {/* SIDEBAR MODERNO */}
          <div className="w-64 border-r border-border/60 bg-muted/30 backdrop-blur-lg overflow-y-auto flex-shrink-0">
            <div className="sticky top-0 bg-background/70 backdrop-blur-xl z-20 p-5 border-b border-border/60">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-wide">Filtros</h3>

                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-primary hover:underline transition"
                  >
                    Limpiar
                  </button>
                )}
              </div>
            </div>

            <div className="p-5 space-y-6">
              {/* COLORES */}
              <div className="space-y-3">
                <button
                  onClick={() => toggleSection("colors")}
                  className="w-full flex items-center justify-between text-sm font-medium hover:text-primary transition"
                >
                  Color
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      expandedSections.colors ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                </button>

                {expandedSections.colors && (
                  <div className="space-y-3 pt-2">
                    {colors.map((color) => (
                      <div key={color} className="flex items-center space-x-3">
                        <Checkbox
                          id={`color-${color}`}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={() => toggleColor(color)}
                        />
                        <Label
                          htmlFor={`color-${color}`}
                          className="text-sm cursor-pointer hover:text-primary transition"
                        >
                          {color}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CATEGORÍAS */}
              <div className="space-y-3">
                <button
                  onClick={() => toggleSection("categories")}
                  className="w-full flex items-center justify-between text-sm font-medium hover:text-primary transition"
                >
                  Categoría
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      expandedSections.categories ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                </button>

                {expandedSections.categories && (
                  <div className="space-y-3 pt-2">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-3"
                      >
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label
                          htmlFor={`category-${category}`}
                          className="text-sm cursor-pointer hover:text-primary transition"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RESULTADOS */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* HEADER MEJORADO */}
            <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/60 px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    {searchQuery ? (
                      <>
                        Resultados para{" "}
                        <span className="text-primary">"{searchQuery}"</span>
                      </>
                    ) : (
                      "Explorar productos"
                    )}
                  </h2>

                  <p className="text-sm text-muted-foreground mt-1">
                    {filteredResults.length} resultado
                    {filteredResults.length !== 1 && "s"} encontrados
                  </p>
                </div>
              </div>
            </div>

            {/* GRID MÁS ELEGANTE */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredResults.map((product) => (
                    <div
                      key={product.id}
                      className="
                    group
                    rounded-xl
                    border border-border/60
                    bg-card/60
                    backdrop-blur-md
                    hover:border-primary/40
                    hover:shadow-xl
                    transition-all duration-300
                    overflow-hidden
                    "
                    >
                      <div className="p-5 space-y-4">
                        <div className="h-28 flex items-center justify-center bg-muted/40 rounded-lg group-hover:bg-muted/60 transition">
                          <span className="text-6xl">{product.image}</span>
                        </div>

                        <div>
                          <h3 className="font-medium text-sm group-hover:text-primary transition">
                            {product.name}
                          </h3>

                          <div className="flex gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {product.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {product.color}
                            </Badge>
                          </div>

                          <div className="mt-4 pt-3 border-t border-border/50">
                            <p className="font-semibold text-primary text-base">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-center">
                  <div>
                    <p className="text-muted-foreground text-base">
                      No se encontraron resultados
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Prueba con otros filtros o términos de búsqueda
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
