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
      price: product.price || 120,
      quantity: 1,
      image: product.mainImage,
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
          <h1 className="text-5xl font-bold text-foreground">
            Premium Collection
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            Discover our curated selection of premium products
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
      </div>

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
          products.map((product) => (
            <Link key={product._id} href={`/productos/${product._id}`}>
              <div className="group flex flex-col h-full rounded-lg overflow-hidden border border-border hover:border-foreground transition-all duration-300 bg-card hover:shadow-lg hover:shadow-foreground/5">
                {/* Image Container */}
                <div className="relative overflow-hidden bg-secondary aspect-square">
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-foreground text-background px-3 py-1 rounded-full text-xs font-semibold">
                      {product.badge}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(e, product._id)}
                    className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        wishlist.has(product._id)
                          ? "fill-destructive text-destructive"
                          : "text-foreground"
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-foreground transition-colors">
                    {product.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                      {renderStars(product.rating || 5).map((star, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-foreground text-foreground"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews || 0})
                    </span>
                  </div>

                  {/* Description snippet */}
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {product.description || "Premium quality product"}
                  </p>

                  {/* Price */}
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-foreground">
                      ${(product.price || 120).toFixed(2)}
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className={`w-full py-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                      addedToCart.has(product._id)
                        ? "bg-foreground text-background"
                        : "bg-foreground text-background hover:opacity-90"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {addedToCart.has(product._id) ? "Added!" : "Add to Cart"}
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
