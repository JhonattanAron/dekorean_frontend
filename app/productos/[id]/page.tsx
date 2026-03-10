"use client";

import { useEffect, useState } from "react";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { ProductReviews } from "@/components/product/ProductReviews";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { ProductDescription } from "@/components/product/ProductDescription";
import LayoutPage from "@/components/layoutPage";

interface Product {
  _id: string;
  title: string;
  mainImage: string;
  images: string[];
  description: {
    general?: string;
    overview?: string;
    highlights?: string;
    installation?: string;
    installationSteps?: string;
    purchaseInstructions?: string;
    specifications?: string;
  };
  price: {
    original?: number;
    current: number;
    currency: string;
  };
  category?: string[];
  brand?: string;
  stock?: number;
  deliveryTime?: string;
  contentSize?: string;
  dimensions?: {
    size?: string;
    capacity?: string;
    price_per_m2?: number;
  };
  reviews?: {
    rating: number;
    count: number;
  };
  videoUrl?: string;
}

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Simular fetch desde API
        // En producción, cambiar esta URL a tu API real
        const response = await fetch(`/api/backend/products/name/${id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <main className="min-h-screen pt-24 bg-background">
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-12 w-1/3" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* ================= ERROR ================= */
  if (error || !product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 border-destructive/50">
          <h1 className="text-2xl font-bold text-destructive mb-2">
            {error ?? "Product not found"}
          </h1>
          <p className="text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
        </Card>
      </main>
    );
  }

  /* ================= PRODUCT DATA ================= */
  const productImages =
    product.images?.length > 0
      ? product.images
      : product.mainImage
        ? [product.mainImage]
        : [];

  const productSpecs = [
    { label: "Brand", value: product.brand ?? "N/A" },
    { label: "Stock", value: 100 },
    { label: "Delivery Time", value: "2 dias" },
    { label: "Content Size", value: product.contentSize ?? "N/A" },
  ];

  const reviews = product.reviews
    ? [
        {
          id: "1",
          author: "Verified Customer",
          rating: Math.round(product.reviews.rating),
          title: "Customer Reviews",
          content: `Overall rating based on ${product.reviews.count} customer reviews. Average score: ${product.reviews.rating.toFixed(1)}/5`,
          date: "Recent",
          helpful: 0,
        },
      ]
    : [];

  function VideoSection() {
    return (
      <div className="w-full h-[240px] flex justify-center">
        <div className="w-full max-w-5xl aspect-video">
          <iframe
            className="w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/RO7FC59b1hY"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <ProductGallery
              images={productImages}
              productName={product.title}
            />

            <ProductInfo
              name={product.title}
              price={product.price.current}
              originalPrice={product.price.original}
              rating={product.reviews?.rating ?? 0}
              reviewCount={product.reviews?.count ?? 0}
              inStock={true}
              description={
                product.description.general ??
                "En Dekorans seleccionamos cuidadosamente productos de alta calidad diseñados para mejorar tus espacios con estilo, funcionalidad y durabilidad. Cada producto de nuestro catálogo está pensado para ofrecer una solución práctica y estética, adaptándose a diferentes necesidades de decoración y renovación.."
              }
              category={product.category?.[0]}
              currency={product.price.currency}
            />
          </div>

          {/* Description Tabs and Specs Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <ProductSpecs
                specs={productSpecs}
                dimensions={product.dimensions}
              />
            </div>

            <VideoSection />
          </div>

          {/* Specs and Reviews Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ProductDescription
                overview={product.description.overview}
                highlights={product.description.highlights}
                installation={product.description.installation}
                installationSteps={product.description.installationSteps}
                purchaseInstructions={product.description.purchaseInstructions}
              />
              <ProductReviews reviews={reviews} />
            </div>

            {/* Sidebar for additional video or content */}
            {product.videoUrl && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <h3 className="text-lg font-semibold mb-4">Video Guide</h3>
                  <VideoSection />
                </div>
              </aside>
            )}
          </div>
        </section>
      </main>
    </LayoutPage>
  );
}
