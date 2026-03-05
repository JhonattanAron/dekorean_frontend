"use client";

import Link from "next/link";
import {
  Star,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Heart,
} from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useProductsStore } from "@/lib/products-store";
import { useEffect, useState } from "react";
import { SearchBar } from "./product/seach-bar";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import { formatLink } from "@/lib/utils";
import { SearchModal } from "./search-modal";

function renderStars(rating: number = 5) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(i < rating ? "full" : "empty");
  }
  return stars;
}

export function ProductsGrid() {
  const { addItem } = useCartStore();
  const { products, loading, fetchProducts, page, totalPages } =
    useProductsStore();
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set());
  const param = useParams();

  useEffect(() => {
    fetchProducts(1, 12);
  }, []);

  const handlePrevious = () => {
    if (page > 1) {
      fetchProducts(page - 1, 12);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      fetchProducts(page + 1, 12);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAddToCart = (
    e: React.MouseEvent,
    product: (typeof products)[0],
  ) => {
    e.preventDefault();

    addItem({
      id: product._id,
      name: product.title,
      price: product.price?.current || 120,
      quantity: 1,
      image: product.images[0],
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

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-bold text-white">
            {!param.category
              ? "Premium Collection"
              : `Explora nuestra Coleccion de ${formatLink(param.category as string)}`}
          </h1>
          <p className="text-muted-foreground text-sm mt-2 text-white">
            Discover our curated selection of premium products
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
      </div>
      <SearchModal />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {loading ? (
          <div className="col-span-full flex justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin h-12 w-12 border-2 border-foreground border-t-transparent rounded-full"></div>
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          </div>
        ) : products.length > 0 ? (
          products.map((product, index) => (
            <Link key={product._id} href={`/productos/${product.slug}`}>
              <div className="glass rounded-xl overflow-hidden group hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col border border-white/5 cursor-pointer h-full backdrop-blur-md bg-card/60">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-slate-900">
                  <img
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={product.images?.[0] || "/placeholder.jpg"}
                  />

                  {/* Badge dinámico */}
                  {product.inStock === false && (
                    <div className="absolute top-3 right-3 glass px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-white/10">
                      <span className="text-red-400">Agotado</span>
                    </div>
                  )}

                  {product.price?.original &&
                    product.price.original > product.price.current && (
                      <div className="absolute top-3 left-3 glass px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-white/10">
                        <span className="text-green-400">Oferta</span>
                      </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Title */}
                  <h3 className="text-base font-semibold mb-2 group-hover:text-gray-300 transition-colors line-clamp-2 text-white">
                    {product.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4 text-white">
                    {renderStars(product.reviews?.rating || 0).map(
                      (star, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            star === "full"
                              ? "fill-white text-white"
                              : star === "half"
                                ? "fill-white text-white opacity-50"
                                : "text-slate-700"
                          }`}
                        />
                      ),
                    )}

                    <span className="text-[10px] text-slate-500 ml-2">
                      ({product.reviews?.count || 0})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-auto mb-4">
                    {product.price?.original &&
                      product.price.original > product.price.current && (
                        <p className="text-xs line-through ">
                          ${product.price.original.toLocaleString("es-ES")}
                        </p>
                      )}

                    <p className="text-2xl font-bold text-white">
                      ${product.price?.current?.toLocaleString("es-ES")}
                    </p>
                  </div>

                  {/* Button */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full bg-white hover:bg-slate-100 text-slate-900 py-3 rounded-lg text-sm font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Agregar
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-muted-foreground text-lg">No products found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-8 border-t border-border">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className="p-2 rounded-lg border border-border hover:border-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => fetchProducts(p, 12)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                  p === page
                    ? "bg-foreground text-background"
                    : "border border-border hover:border-foreground text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="p-2 rounded-lg border border-border hover:border-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      )}
    </section>
  );
}
