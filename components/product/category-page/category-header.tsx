"use client";

import { useState, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatLink } from "@/lib/utils";

const departments = [
  {
    id: 1,
    name: "Paneles",
    description: "Paneles decorativos y funcionales para tu hogar",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2070",
    icon: "🖼️",
  },
  {
    id: 2,
    name: "Cocinas",
    description: "Soluciones modernas para tu cocina",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
    icon: "👨‍🍳",
  },
  {
    id: 3,
    name: "Plantas Artificiales",
    description: "Naturaleza sin mantenimiento para tu espacio",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=2070",
    icon: "🌿",
  },
  {
    id: 4,
    name: "Vajillas y Cristalería",
    description: "Cristalería y vajilla de diseño",
    image:
      "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?q=80&w=2070",
    icon: "🍷",
  },
  {
    id: 5,
    name: "Dekorans Art Design",
    description: "Colección exclusiva de arte y diseño",
    image:
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=2070",
    icon: "🎨",
  },
];

export default function CategoryHeader() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const params = useParams();

  // 🔥 Buscar el departamento correspondiente
  const currentDepartment = useMemo(() => {
    return departments.find(
      (dep) =>
        dep.name.toLowerCase() ===
        formatLink(params.category as string).toLowerCase(),
    );
  }, [params.category]);

  return (
    <header
      className="relative mx-10 rounded-lg shadow-2xl h-screen md:h-[50vh] flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${currentDepartment?.image})`,
      }}
    >
      {/* Overlay oscuro para que el texto sea legible */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative w-full px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header text */}
        <div className="text-center mb-12 md:mb-16 z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Te Encuentras en
            <br />
            {params.category && formatLink(params.category as string)}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            {currentDepartment?.description}
          </p>
        </div>

        {/* Categories */}
        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 justify-center flex-wrap">
          {departments.map((category) => (
            <Link
              href={`${formatLink(category.name)}`}
              key={category.id}
              className={`flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold whitespace-nowrap transition-all duration-300 text-base md:text-lg ${
                activeCategory === category.id
                  ? "bg-white text-black shadow-lg scale-105"
                  : "bg-white/20 text-white hover:bg-white/40"
              }`}
            >
              <span className="text-xl md:text-2xl">{category.icon}</span>
              {category.name}
              {activeCategory === category.id && (
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 ml-1" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
