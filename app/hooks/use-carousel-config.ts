"use client";

import { useState, useEffect } from "react";

export interface CarouselSectionConfig {
  _id?: string;
  section: string;
  headerImage?: string;
  backgroundImage?: string;
  extraImages: string[];
}

export type CarouselConfigMap = Record<string, CarouselSectionConfig>;

export const DEFAULT_CAROUSEL_CONFIG: CarouselConfigMap = {
  homeHero: {
    section: "homeHero",
    backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoLEMiTicQNt_u-vXfoy-gj_7Zv2SIGbR0qLrUT7zdwAdlNdErf0M6qVLncjFfiN1KHRNBdOwODaMI2zxaYa2BcIGTRqEYFjvXXiOzm3llRydH0zYAycQ-EIaIRAeVVuG9n9wtdEafmUZ6oCfEbOT_H3ZSLibXvp9s_4p9hz_ydp1EdHCMHHozWf9BUBk9nHBauvGhQHj7PNuj-_xHKnKcUPVKGCfgebkDrwG7BLe1OuxYUQj9DKjnFhGY3bIiR8U4I_kz4DEiSw",
    extraImages: [],
  },
  paneles: {
    section: "paneles",
    backgroundImage: "/carousel/paneles.jpg",
    extraImages: [],
  },
  cocina: {
    section: "cocina",
    backgroundImage: "/carousel/cocina.jpg",
    extraImages: [],
  },
  plantas: {
    section: "plantas",
    backgroundImage: "/carousel/plantas.jpg",
    extraImages: [],
  },
  personalizacion: {
    section: "personalizacion",
    backgroundImage: "/carousel/personalizacion.jpg",
    extraImages: [],
  },
  ambientes: {
    section: "ambientes",
    backgroundImage: "/carousel/ambientes.jpg",
    extraImages: [],
  },
};

export function useCarouselConfig() {
  const [config, setConfig] = useState<CarouselConfigMap>(DEFAULT_CAROUSEL_CONFIG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/backend/carousel-config");
      if (!response.ok) {
        throw new Error("Failed to fetch carousel config");
      }
      const data = await response.json();
      // Merge with defaults to ensure all sections exist
      setConfig((prev) => ({ ...prev, ...data }));
    } catch (err) {
      console.error("Error fetching carousel config:", err);
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return { config, loading, error, refetch: fetchConfig };
}
