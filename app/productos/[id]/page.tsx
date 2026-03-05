"use client";

import { useEffect, useState } from "react";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { ProductReviews } from "@/components/product/ProductReviews";
import { Product, useProductsStore } from "@/lib/products-store";
import { useParams } from "next/navigation";
import LayoutPage from "@/components/layoutPage";

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getProductById = useProductsStore((state) => state.getProductById);
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await getProductById(id);

        if (!fetchedProduct) {
          setError("Product not found");
          return;
        }

        setProduct(fetchedProduct);
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, getProductById]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading product...</p>
      </main>
    );
  }

  /* ================= ERROR ================= */

  if (error || !product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>{error ?? "Product not found"}</p>
      </main>
    );
  }

  /* ================= DESDE AQUÍ product YA NO ES NULL ================= */

  const productImages =
    product.images?.length > 0
      ? product.images
      : product.mainImage
        ? [product.mainImage]
        : [];

  const productSpecs = [
    { label: "Brand", value: product.brand ?? "N/A" },
    { label: "Stock", value: product.stock?.toString() ?? "N/A" },
    { label: "Delivery", value: product.deliveryTime ?? "N/A" },
    { label: "Content Size", value: product.contentSize ?? "N/A" },
  ];

  const reviews = product.reviews
    ? [
        {
          id: "1",
          author: "User",
          rating: product.reviews.rating,
          title: "Customer Review",
          content: "Rating based on aggregated reviews.",
          date: "Recent",
          helpful: 0,
        },
      ]
    : [];

  function VideoSection() {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-5xl aspect-video">
          <iframe
            className="w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/RO7FC59b1hY"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
    <LayoutPage>
      <main className="min-h-screen pt-24 bg-background">
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <ProductGallery
              images={productImages}
              productName={product.title}
            />

            <ProductInfo
              name={product.title}
              price={product.price?.current ?? 0}
              rating={product.reviews?.rating ?? 0}
              reviewCount={product.reviews?.count ?? 0}
              inStock={true}
              description={
                product.description?.general ?? "No description available."
              }
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ProductSpecs specs={productSpecs} />
              <ProductReviews reviews={reviews} />
            </div>

            <aside>
              <VideoSection />
            </aside>
          </div>
        </section>
      </main>
    </LayoutPage>
  );
}
