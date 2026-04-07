"use client";

import { Cloud, Upload, Image } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface UploadBoxProps {
  title: string;
  description: string;
  buttonText: string;
  demoImages?: Array<{ src: string; alt: string }>;
  onDemoClick?: (index: number) => void;
}

export function UploadBox({
  title,
  description,
  buttonText,
  demoImages = [],
  onDemoClick,
}: UploadBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredDemo, setHoveredDemo] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files?.[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    if (loading) return;

    try {
      setLoading(true);

      // 🔥 1. SUBIR IMAGEN
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/backend/storage/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Error subiendo imagen");

      const uploadData = await uploadRes.json();

      const imageUrl = uploadData.url.url; // 👈 importante
      console.log("Imagen subida:", imageUrl);

      // 🔥 2. CREAR PROYECTO (VERSIÓN 1 AUTOMÁTICA)
      const projectRes = await fetch("/api/backend/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          userId: "demo-user", // 🔥 luego lo sacas de auth
        }),
      });

      if (!projectRes.ok) throw new Error("Error creando proyecto");

      const projectData = await projectRes.json();

      const project = projectData.data; // 👈 porque tu controller devuelve { success, data }

      console.log("Proyecto creado:", project);

      // 🔥 3. REDIRIGIR AL VISUALIZER
      router.push(`/visualizer/${project._id}`);
    } catch (error) {
      console.error(error);
      alert("Error subiendo imagen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="w-full max-w-md" initial="hidden" animate="visible">
      <motion.div
        className="relative group"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 backdrop-blur-md transition-all ${
            isDragging
              ? "border-cyan-400 bg-cyan-500/20"
              : "border-white/20 bg-white/5 hover:border-cyan-400/50"
          }`}
        >
          {/* ICON */}
          <div className="flex justify-center mb-4">
            <Cloud className="w-12 h-12 text-cyan-400" />
          </div>

          {/* TITLE */}
          <h3 className="text-xl font-bold text-white text-center mb-2">
            {title}
          </h3>

          {/* DESC */}
          <p className="text-sm text-slate-300 text-center mb-6">
            {description}
          </p>

          {/* INPUT */}
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* BUTTON */}
          <Button
            type="button"
            onClick={handleButtonClick}
            disabled={loading}
            className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            {loading ? "Subiendo..." : buttonText}
          </Button>
        </div>
      </motion.div>

      {/* DEMOS */}
      {demoImages.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          {demoImages.map((demo, index) => (
            <button
              key={index}
              onClick={() => onDemoClick?.(index)}
              onMouseEnter={() => setHoveredDemo(index)}
              onMouseLeave={() => setHoveredDemo(null)}
              className="relative rounded-lg overflow-hidden"
            >
              <img
                src={demo.src}
                alt={demo.alt}
                className="w-full h-full object-cover"
              />

              {hoveredDemo === index && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Image className="w-6 h-6 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
