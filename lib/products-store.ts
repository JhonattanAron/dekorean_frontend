"use client";

import { BundleTier } from "@/components/edit-product/admin-packs";
import { create } from "zustand";

// Sub-interfaces basadas en tus sub-schemas

export interface PriceTier {
  min: number;
  max?: number;
  price: number;
}

export interface Variant {
  specs: Record<string, any>; // 🔥 dinámico

  sku?: string;
  stock?: number;

  weight?: string;
  packaging?: string;

  pricing: PriceTier[];
}
export interface Description {
  general: string;
  highlights: string[];
  installation: string;
  installationSteps: string[];
  overview: string;
  purchaseInstructions: string;
}

export interface Price {
  original: number;
  current: number;
  currency: string;
}

export interface Reviews {
  rating: number;
  count: number;
}

// Interface principal del producto

export interface Product {
  _id: string;

  brand: string;
  category: string[];
  claims: string[];

  contentSize: string;
  deliveryTime: string;

  description?: Description;

  dimensions?: Record<string, any>;

  features: string[];
  images: string[];
  mainImage: string;
  packs?: BundleTier[];

  inStock: boolean;
  stock?: number;

  price?: Price;
  price_per_m2: number;
  reviews?: Reviews;
  slug: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  imagesUpdated: boolean;
  videos?: string[];
  mainVideo?: string;
  variants?: Variant[];
}
export interface ProductCreate {
  brand: string;
  category: string[];
  claims: string[];

  contentSize: string;
  deliveryTime: string;

  description?: Description;

  dimensions?: Record<string, any>;

  features: string[];
  images: string[];
  mainImage: string;

  inStock: boolean;
  stock?: number;

  price?: Price;
  price_per_m2: number;
  reviews?: Reviews;
  slug: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  variants?: Variant[];
  imagesUpdated: boolean;
}

interface ProductsStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  // Actions
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  getProductById: (id: string) => Promise<Product | undefined>;
  getProductByIdAdmin: (id: string) => Promise<Product | undefined>;
  // Fetch actions
  fetchProducts: (
    page?: number,
    limit?: number,
    search?: string,
    category?: string,
  ) => Promise<void>;
  searchProducts: (query: string) => Product[];
}

// Test data
const testProducts: Product[] = [];
const apiUrl = "/api/backend"; // Cambia esto a tu URL real del backend

export const useProductsStore = create<ProductsStore>((set, get) => ({
  products: testProducts,
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  total: testProducts.length,
  totalPages: Math.ceil(testProducts.length / 10),

  setProducts: (products: Product[]) => set({ products }),

  addProduct: (product: Product) =>
    set((state) => ({ products: [...state.products, product] })),

  removeProduct: (id: string) =>
    set((state) => ({
      products: state.products.filter((p) => p._id !== id),
    })),

  updateProduct: (id: string, updatedProduct: Partial<Product>) =>
    set((state) => ({
      products: state.products.map((p) =>
        p._id === id ? { ...p, ...updatedProduct } : p,
      ),
    })),

  getProductById: async (id: string) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(`${apiUrl}/products/name/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const product: Product = await response.json();

      // Guardar en el store si no existe
      set((state) => {
        const exists = state.products.some((p) => p._id === id);

        return {
          products: exists ? state.products : [...state.products, product],
          loading: false,
        };
      });

      return product;
    } catch (error) {
      console.error("Error fetching product by id:", error);
      set({
        error: error instanceof Error ? error.message : "Error",
        loading: false,
      });
      return undefined;
    }
  },
  getProductByIdAdmin: async (id: string) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(`${apiUrl}/products/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const product: Product = await response.json();

      // Guardar en el store si no existe
      set((state) => {
        const exists = state.products.some((p) => p._id === id);

        return {
          products: exists ? state.products : [...state.products, product],
          loading: false,
        };
      });

      return product;
    } catch (error) {
      console.error("Error fetching product by id:", error);
      set({
        error: error instanceof Error ? error.message : "Error",
        loading: false,
      });
      return undefined;
    }
  },

  searchProducts: (query: string) => {
    const state = get();
    const lowerQuery = query.toLowerCase();
    return state.products.filter((p) =>
      p.title.toLowerCase().includes(lowerQuery),
    );
  },

  // Fetch products from API
  fetchProducts: async (page = 1, limit = 10, search = "", category = "") => {
    set({ loading: true, error: null });
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());
      if (search) {
        queryParams.append("search", search);
      }
      if (category) {
        queryParams.append("category", category);
      }

      const response = await fetch(`${apiUrl}/products?${queryParams}`);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      set({
        products: data.data || data.products || [],
        page: data.page || page,
        limit: data.limit || limit,
        total: data.total || data.data?.length || 0,
        totalPages: data.totalPages || Math.ceil((data.total || 0) / limit),
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        loading: false,
        // Fallback to test data on error
        products: testProducts,
        total: testProducts.length,
        totalPages: Math.ceil(testProducts.length / limit),
      });
    }
  },
}));
