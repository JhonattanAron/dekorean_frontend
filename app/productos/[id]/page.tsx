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
              <div className="bg-secondary rounded-lg p-6 sticky top-24 space-y-4">
                <h3 className="font-semibold text-foreground text-lg">
                  Recommended For You
                </h3>
                <div className="space-y-3">
                  <div className="pb-3 border-b border-border">
                    <p className="text-sm font-medium text-foreground">
                      Protective Case
                    </p>
                    <p className="text-xs text-muted-foreground">$29.99</p>
                  </div>
                  <div className="pb-3 border-b border-border">
                    <p className="text-sm font-medium text-foreground">
                      Screen Protector
                    </p>
                    <p className="text-xs text-muted-foreground">$14.99</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Charging Cable
                    </p>
                    <p className="text-xs text-muted-foreground">$19.99</p>
                  </div>
                </div>
                <button className="w-full bg-foreground text-background rounded-lg py-2 font-medium hover:opacity-90 transition-opacity text-sm">
                  View All Accessories
                </button>
              </div>
            </aside>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-secondary mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-semibold text-foreground mb-4">About</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Press
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Shipping Info
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Terms
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Connect</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
              <p>&copy; 2024 ShopHub. All rights reserved.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <button className="hover:text-foreground transition-colors">
                  Security & Privacy
                </button>
                <button className="hover:text-foreground transition-colors">
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </LayoutPage>
  );
}
