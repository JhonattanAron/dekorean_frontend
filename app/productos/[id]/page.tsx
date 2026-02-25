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
  const param = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await getProductById(param.id as string);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("[v0] Error loading product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [getProductById]);

  // Fallback data if product doesn't load
  const fallbackProduct: Product = {
    _id: param.id as string,
    externalId: "TP-XP-2024",
    title: "Premium Tech Accessory XP-2024",
    description:
      "Experience next-level technology with our premium accessory. Designed with precision engineering and cutting-edge materials, this product delivers exceptional performance and durability. Perfect for professionals and enthusiasts who demand quality.",
    specifications: "Premium build, 2-year warranty, IP67 water resistance",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1506749193789-89ca0cd00e1b?w=800&h=800&fit=crop",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
    sourceUrl: "",
    videoUrl: "",
    price: 249.99,
    rating: 4.8,
    reviews: 1247,
    badge: "Best Seller",
    badgeColor: "#000000",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const displayProduct = product || fallbackProduct;
  const productImages = displayProduct.images || [displayProduct.mainImage];

  const productSpecs = [
    { label: "Brand", value: displayProduct.color || "TechPro" },
    { label: "Model", value: displayProduct.externalId || "XP-2024" },
    { label: "Color", value: displayProduct.color || "Midnight Black" },
    { label: "Material", value: displayProduct.material || "Premium Aluminum" },
    { label: "Weight", value: "185g" },
    { label: "Warranty", value: "2 Years" },
    { label: "Water Resistance", value: "IP67" },
    { label: "Connectivity", value: "Bluetooth 5.3, WiFi 6E" },
  ];

  const reviews = [
    {
      id: "1",
      author: "Sarah Johnson",
      rating: 5,
      title: "Absolutely Incredible Quality!",
      content:
        "This product exceeded all my expectations. The build quality is premium, the performance is flawless, and customer service was exceptional. Highly recommend!",
      date: "Feb 15, 2024",
      helpful: 342,
    },
    {
      id: "2",
      author: "Michael Chen",
      rating: 4,
      title: "Great Product, Minor Issues",
      content:
        "Really satisfied with my purchase. Works exactly as advertised. Only minor complaint is the packaging could be better, but the product itself is solid.",
      date: "Feb 10, 2024",
      helpful: 128,
    },
    {
      id: "3",
      author: "Emma Williams",
      rating: 5,
      title: "Best Purchase Ever",
      content:
        "I've been using this for 2 weeks now and it's been perfect. Great design, intuitive interface, and fantastic performance. Worth every penny!",
      date: "Feb 8, 2024",
      helpful: 256,
    },
  ];

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </main>
    );
  }

  if (error && !product) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">{error}</p>
          <p className="text-muted-foreground text-sm">
            Showing demo product data
          </p>
        </div>
      </main>
    );
  }

  function VideoSection() {
    return (
      <div className="w-full flex justify-center">
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
      <main className="min-h-screen bg-background">
        {/* Product Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Gallery */}
            <ProductGallery
              images={productImages}
              productName={displayProduct.title}
            />

            {/* Product Info */}
            <ProductInfo
              name={displayProduct.title}
              price={displayProduct.price || 249.99}
              rating={displayProduct.rating || 4.8}
              reviewCount={displayProduct.reviews || 1247}
              inStock={true}
              description={displayProduct.description}
            />
          </div>

          {/* Specs and Reviews */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ProductSpecs specs={productSpecs} />
              <ProductReviews reviews={reviews} />
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <VideoSection />
            </aside>
          </div>
        </section>
      </main>
    </LayoutPage>
  );
}
