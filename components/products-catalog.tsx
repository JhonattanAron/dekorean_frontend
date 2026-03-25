"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useProductsStore } from "@/lib/products-store";

export function ProductsCatalog() {
  const { products, fetchProducts, loading } = useProductsStore();
  const { addItem } = useCartStore();

  useEffect(() => {
    fetchProducts(1, 4); // 👈 trae solo 4 productos
  }, [fetchProducts]);

  function renderStars(rating: number = 0) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) stars.push("full");
      else if (i < rating) stars.push("half");
      else stars.push("empty");
    }
    return stars;
  }

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();

    addItem({
      id: product._id,
      name: product.title,
      price: product.price?.current || product.price_per_m2 || 0,
      quantity: 1,
      image: product.mainImage,
    });
  };

  if (loading) {
    return (
      <section className="py-24 text-center">
        <p className="text-muted-foreground">Cargando productos...</p>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-12">
        <span className="text-primary font-bold tracking-widest uppercase text-sm">
          Exclusividad
        </span>
        <h2 className="text-4xl md:text-5xl mt-2 font-bold">
          Productos Destacados
        </h2>
        <p className="text-muted-foreground text-sm mt-2 max-w-md">
          Los mejores productos seleccionados para tu espacio.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <Link key={product._id} href={`/productos/${product.slug}`}>
            <div className="glass rounded-xl overflow-hidden group hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 flex flex-col border border-white/5 cursor-pointer h-full">
              {/* IMAGE */}
              <div className="relative aspect-square overflow-hidden bg-slate-800">
                <img
                  src={product.mainImage}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition line-clamp-2">
                  {product.title}
                </h3>

                {/* REVIEWS */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(product.reviews?.rating).map((star, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        star === "full"
                          ? "fill-primary text-primary"
                          : star === "half"
                            ? "fill-primary text-primary opacity-50"
                            : "text-slate-700"
                      }`}
                    />
                  ))}
                  <span className="text-[10px] text-muted-foreground ml-2">
                    ({product.reviews?.count || 0})
                  </span>
                </div>

                {/* PRICE */}
                <p className="text-2xl font-bold mt-auto mb-4 text-primary">
                  $
                  {(
                    product.price?.current ||
                    product.price_per_m2 ||
                    0
                  ).toLocaleString("es-ES")}
                </p>

                {/* BUTTON */}
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-white hover:bg-slate-100 text-slate-900 py-3 rounded-lg text-sm font-bold transition active:scale-95 flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Agregar
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-12">
        <Link href="/productos">
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold transition shadow-lg">
            Ver Todos los Productos
          </button>
        </Link>
      </div>
    </section>
  );
}
