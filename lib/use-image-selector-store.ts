"use client";

import { create } from "zustand";

export interface SelectedImage {
  productId: string;
  imageUrl: string;
  productTitle: string;
  price?: number;
  category: string;
}

interface ImageSelectionStore {
  selectedImages: Record<string, SelectedImage>;
  setSelectedImage: (category: string, image: SelectedImage) => void;
  removeSelectedImage: (category: string) => void;
  getSelectedImage: (category: string) => SelectedImage | null;
  clearAll: () => void;
}

export const useImageSelectionStore = create<ImageSelectionStore>(
  (set, get) => ({
    selectedImages: {},

    setSelectedImage: (category: string, image: SelectedImage) =>
      set((state) => ({
        selectedImages: {
          ...state.selectedImages,
          [category]: image,
        },
      })),

    removeSelectedImage: (category: string) =>
      set((state) => {
        const newImages = { ...state.selectedImages };
        delete newImages[category];
        return { selectedImages: newImages };
      }),

    getSelectedImage: (category: string) => {
      const state = get();
      return state.selectedImages[category] || null;
    },

    clearAll: () => set({ selectedImages: {} }),
  }),
);
