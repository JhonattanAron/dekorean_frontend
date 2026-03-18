"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader } from "lucide-react";
import { useProductsStore, Product } from "@/lib/products-store";
import { useImageSelectionStore } from "@/lib/use-image-selector-store";

interface ImageModalProps {
  categoryId: string;
  categoryLabel: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageModal({
  categoryId,
  categoryLabel,
  isOpen,
  onClose,
}: ImageModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const products = useProductsStore((state) => state.products);
  const fetchProducts = useProductsStore((state) => state.fetchProducts);

  const setSelectedImage = useImageSelectionStore(
    (state) => state.setSelectedImage,
  );

  /* ========== FETCH SIEMPRE AL ABRIR ========== */
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);

      fetchProducts(1, 100, "", categoryId).finally(() => setIsLoading(false));
    }
  }, [isOpen, categoryId, fetchProducts]);

  /* ========== SOLO FILTRO DE BUSQUEDA ========== */
  useEffect(() => {
    const filtered = products.filter((product) => {
      return (
        searchQuery === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  /* ========== SELECT IMAGE ========== */
  const handleSelectImage = (product: Product) => {
    if (product.images && product.images.length > 0) {
      setSelectedImage(categoryId, {
        productId: product._id,
        imageUrl: product.images[0],
        productTitle: product.title,
        price: product.price?.current,
        category: categoryId,
      });

      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Seleccionar imagen - {categoryLabel}</DialogTitle>
          <DialogDescription>
            Busca y selecciona un producto para esta categoría
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* SEARCH */}
          <Input
            placeholder="Buscar por nombre o marca..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* CONTENT */}
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">
                No hay productos en esta categoría
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 max-h-[calc(80vh-200px)] overflow-y-auto">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleSelectImage(product)}
                  className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer group"
                >
                  {/* IMAGE */}
                  {product.images?.[0] ? (
                    <div className="relative w-full h-40 bg-muted overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {product.inStock && (
                        <Badge className="absolute top-2 right-2 bg-green-600">
                          Stock
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center bg-muted">
                      <span className="text-xs text-muted-foreground">
                        Sin imagen
                      </span>
                    </div>
                  )}

                  {/* INFO */}
                  <div className="p-3 space-y-1">
                    <h3 className="text-sm font-medium truncate group-hover:text-primary">
                      {product.title}
                    </h3>

                    <p className="text-xs text-muted-foreground">
                      {product.brand}
                    </p>

                    {product.price?.current && (
                      <p className="text-sm font-semibold text-primary">
                        ${product.price.current.toFixed(2)}
                      </p>
                    )}

                    {product.reviews && (
                      <div className="text-xs flex items-center">
                        ⭐ {product.reviews.rating.toFixed(1)}
                        <span className="ml-1 text-muted-foreground">
                          ({product.reviews.count})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
