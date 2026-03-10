"use client";

import { Search, Sparkles, ArrowRight } from "lucide-react";
import { UploadBox } from "@/components/upload-box";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const demoImages = [
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    alt: "Demo 1 - Modern living room",
  },
  {
    src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=400&fit=crop",
    alt: "Demo 2 - Contemporary bedroom",
  },
];

export function HomeHero() {
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 50]);

  const handleUpload = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      setUploadedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const encodedUrl = encodeURIComponent(imageUrl);
        const encodedName = encodeURIComponent(file.name);
        router.push(
          `/visualizer?imageUrl=${encodedUrl}&imageName=${encodedName}`,
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDemoClick = (index: number) => {
    setSelectedDemo(index);
    if (demoImages[index]) {
      const encodedUrl = encodeURIComponent(demoImages[index].src);
      const encodedName = encodeURIComponent(`Demo ${index + 1}`);
      router.push(
        `/visualizer?imageUrl=${encodedUrl}&imageName=${encodedName}`,
      );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background with gradient orbs */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <img
          alt="Luxury living room with modern wall panels"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoLEMiTicQNt_u-vXfoy-gj_7Zv2SIGbR0qLrUT7zdwAdlNdErf0M6qVLncjFfiN1KHRNBdOwODaMI2zxaYa2BcIGTRqEYFjvXXiOzm3llRydH0zYAycQ-EIaIRAeVVuG9n9wtdEafmUZ6oCfEbOT_H3ZSLibXvp9s_4p9hz_ydp1EdHCMHHozWf9BUBk9nHBauvGhQHj7PNuj-_xHKnKcUPVKGCfgebkDrwG7BLe1OuxYUQj9DKjnFhGY3bIiR8U4I_kz4DEiSw"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/50 to-slate-900/70"
          animate={{
            background: [
              "linear-gradient(to bottom right, rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.7))",
              "linear-gradient(to bottom right, rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.4), rgba(15, 23, 42, 0.6))",
              "linear-gradient(to bottom right, rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.7))",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        {/* Animated gradient orbs - Premium glow effects */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-500/30 to-blue-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-purple-500/25 to-pink-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [50, -50, 50],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Grid pattern overlay */}
      <motion.div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)",
          backgroundSize: "50px 50px",
        }}
        animate={{ y: [0, 50] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div
        className="relative z-10 max-w-7xl mx-auto w-full px-6 py-20 grid lg:grid-cols-2 gap-12 items-center"
        ref={containerRef}
      >
        {/* Left content */}
        <motion.div
          className="flex flex-col gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Badge */}
          <motion.div>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 backdrop-blur-md w-fit"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Visualización 3D Premium
              </span>
            </motion.div>
          </motion.div>

          {/* Title with gradient */}
          <motion.div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
              <motion.span
                className="block text-white text-balance"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : "hidden"}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Personaliza tu
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent text-balance"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : "hidden"}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                espacio
              </motion.span>
              <motion.span
                className="block text-white text-balance"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : "hidden"}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                con paneles innovadores
              </motion.span>
            </h1>

            <motion.p className="text-base md:text-lg text-slate-300 max-w-lg leading-relaxed">
              Arrastra y sube una foto de tu pared para aplicarle paneles a
              escala real y visualizar tu próximo proyecto de forma instantánea.
            </motion.p>
          </motion.div>

          {/* Search input */}
          <motion.div className="relative max-w-md w-full">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-cyan-400/60" />
              </div>
              <motion.input
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 backdrop-blur-md transition-all"
                placeholder="Proyecta todo tu espacio"
                type="text"
                whileFocus={{
                  borderColor: "rgba(34, 211, 238, 0.5)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Upload box */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="w-full"
          >
            <UploadBox
              title="Arrastra una foto aquí"
              description="Soporta formatos JPG, PNG y HEIC hasta 20MB."
              buttonText="Subir Una Foto"
              demoImages={demoImages}
              onUpload={handleUpload}
              onDemoClick={handleDemoClick}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Status notification */}
      {(uploadedFile || selectedDemo !== null) && (
        <motion.div
          className="fixed bottom-20 left-6 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <motion.div
            className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-cyan-500/50 rounded-xl p-4 max-w-xs shadow-lg shadow-cyan-500/10"
            animate={{
              boxShadow: [
                "0 0 20px rgba(34, 211, 238, 0.1)",
                "0 0 40px rgba(34, 211, 238, 0.2)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {uploadedFile && (
              <p className="text-sm text-cyan-100 font-medium">
                ✨ Cargando: {uploadedFile.name}...
              </p>
            )}
            {selectedDemo !== null && (
              <p className="text-sm text-blue-100 font-medium">
                🎨 Abriendo demo #{selectedDemo + 1}...
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
