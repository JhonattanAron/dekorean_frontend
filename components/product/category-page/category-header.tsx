"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatLink } from "@/lib/utils";
import { motion } from "framer-motion";
import FlechaFlotante from "./flecha-flotante";

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
      className="relative  rounded-3xl shadow-2xl h-[85vh] md:h-[65vh] flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${currentDepartment?.image})`,
      }}
    >
      {/* Animated Gradient Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40"
      />

      {/* Glow blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -left-32 w-96 h-96 bg-primary/40 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/40 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="uppercase tracking-[0.3em] text-sm text-white/70 mb-4"
        >
          Departamento
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight"
        >
          {params.category && formatLink(params.category as string)}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
        >
          {currentDepartment?.description}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full bg-white text-black font-semibold shadow-lg hover:shadow-2xl transition-all"
          >
            Explorar Productos
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent" />
      <FlechaFlotante />
    </header>
  );
}
