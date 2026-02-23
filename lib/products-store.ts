"use client";

import { create } from "zustand";

export interface Product {
  _id: string;
  externalId: string;
  title: string;
  description: string;
  specifications: string;
  images: string[];
  mainImage: string;
  sourceUrl: string;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
  price?: number;
  rating?: number;
  reviews?: number;
  badge?: string;
  badgeColor?: string;
  color?: string;
  material?: string;
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
  // Fetch actions
  fetchProducts: (
    page?: number,
    limit?: number,
    search?: string,
  ) => Promise<void>;
  searchProducts: (query: string) => Product[];
}

// Test data
const testProducts: Product[] = [];

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
      const apiUrl = "http://localhost:8082";

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
    return state.products.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.specifications.toLowerCase().includes(lowerQuery),
    );
  },

  // Fetch products from API
  fetchProducts: async (page = 1, limit = 10, search = "") => {
    set({ loading: true, error: null });
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());
      if (search) {
        queryParams.append("search", search);
      }

      // TODO: Replace with your actual API endpoint
      const apiUrl = "http://localhost:8081";
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
      console.error("[v0] Error fetching products:", error);
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
