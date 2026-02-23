"use client";

import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

export function ProductsCatalog() {
  const products = [
    {
      id: "1",
      name: "Panel Acústico Roble Claro",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCkdM7usne-Z2bYweT_0bwv0IcIS2H88O-1aYTM0xdjePJAlBiJ6JfxF19yr7ErSqgdgDavgdWWnSvhg9VuNJvIWwYlSJW7R_oGqTDZudd3MVR0PXjtnVdssYhTMD2WKMn3enDB2GsZENr_FT-_wmTWV_kd2m-78jlB1TsUnYMYme6vMRt8yhHYwuOWxOreOLlG2JnirhCb2UYCGLq_b8YEotJpJEWpLVGA1jLQlXhDc3oktIRpWCg8Cn5HkaSnIKU7Xs99cfUIYQ",
      rating: 4.5,
      reviews: 120,
      price: 1469,
      badge: "Best Seller",
      badgeColor: "text-primary",
    },
    {
      id: "2",
      name: "Panel 3D Texturizado Gris",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuACEiCQ3ANZONId7tAjmTgco8bQHlkrF-XFwf5IV6YNefvUZqU4Zez2B9izD3lHSm__qfhpgdSLDHw2Lvo21US-b9wlPo9G3S3S9YDNxPMqLI-PGr0CvV-ttmRWbP__hMXf3G5s86yA7wOly-tuUTUXhEiOiIWdWdBDETi5kvlfVcHmjoP58KbuRG_4tRzy-DJnSomvXY5YaTXmLrV_5SSy_VS7BgpZQcjSFqgMvT0r2Td6lzGPd4DVi7q4MU4tuf0iSUgT03aH8w",
      rating: 4,
      reviews: 85,
      price: 2120,
    },
    {
      id: "3",
      name: "Panel Chapado en Nogal",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBXBh3exnSEFNpSTIrQfyNYKUWgOdn_KYgY0O3ly30bNmn1SMV-Dv4TwwdCV1Il88K7zb2_TdumkxGTgGkYP3204-7MOZBNj-pS3asGzh0l5lNROBigOzyYMcuca66k3GHarwPGF8fQ43rhHLex5D2y5UV4r9YyM9avNGv99a6UP7Qtc62t0bJelZsEvB5QcJ_MtS6kahe_6VS6xRlq8jYCvaYlawXj7wDT2ya_I6eNtlB1e1MSXb5pXFLDzYhX19YAYrdahrPiWQ",
      rating: 5,
      reviews: 42,
      price: 1850,
      badge: "Premium",
      badgeColor: "text-white",
    },
    {
      id: "4",
      name: "Difusor Negro Mate",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD_v6M1jRqF4d_Gd-HtF-nqn3bHkYXuAcGCUXP6uMylA0Xl9FXKAHLMLbFS-P52es30yABPhwuaWsrUH5krBOcSo1w_skJq0fDqw6tT4NPbBOtWfbpQeqF6OdXzdPXUApYYg2zL_gCjzqpmgwtWrGdSR6SxYf5pMT8cYhyy5ekzH5_69mvuro7dUYxDTUnb923crc-FSo14kt72vyh8AX0327iAD87jAOlAUjMWG4Lhin4KznZ4r9S71Swot9TH-s_NZeE_VGXX3w",
      rating: 4,
      reviews: 28,
      price: 980,
    },
  ];

  function renderStars(rating: number) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push("full");
      } else if (i < rating) {
        stars.push("half");
      } else {
        stars.push("empty");
      }
    }
    return stars;
  }

  const { addItem } = useCartStore();

  const handleAddToCart = (
    e: React.MouseEvent,
    product: (typeof products)[0],
  ) => {
    e.preventDefault();
    addItem({
      id: product.id as string,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="mb-12">
        <span className="text-primary font-bold tracking-widest uppercase text-sm">
          Exclusividad
        </span>
        <h2 className="text-4xl md:text-5xl mt-2 font-bold">
          Paneles Destacados
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-md">
          Los mejores productos seleccionados para tu espacio. Calidad premium
          garantizada.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/productos/${product.id}`}>
            <div className="glass rounded-xl overflow-hidden group hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 flex flex-col border border-white/5 cursor-pointer h-full">
              <div className="relative aspect-square overflow-hidden bg-slate-800">
                <img
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={product.image}
                />
                {product.badge && (
                  <div className="absolute top-3 right-3 glass px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-white/10">
                    <span className={product.badgeColor}>{product.badge}</span>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-1 mb-4">
                  {renderStars(product.rating).map((star, i) => (
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
                  <span className="text-[10px] text-slate-500 ml-2">
                    ({product.reviews})
                  </span>
                </div>

                <p className="text-2xl font-bold mt-auto mb-4 text-primary">
                  ${product.price.toLocaleString("es-ES")}
                </p>

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
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link href="/productos">
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg">
            Ver Todos los Productos
          </button>
        </Link>
      </div>
    </section>
  );
}
