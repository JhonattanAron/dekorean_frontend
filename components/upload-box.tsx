"use client";

import { Cloud, Upload, Image } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface UploadBoxProps {
  title: string;
  description: string;
  buttonText: string;
  demoImages?: Array<{ src: string; alt: string }>;
  onUpload: (files: FileList | null) => void;
  onDemoClick: (index: number) => void;
}

export function UploadBox({
  title,
  description,
  buttonText,
  demoImages = [],
  onUpload,
  onDemoClick,
}: UploadBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredDemo, setHoveredDemo] = useState<number | null>(null);

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
    onUpload(e.dataTransfer.files);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpload(e.target.files);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const demoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div className="w-full max-w-md" initial="hidden" animate="visible">
      {/* Main upload area */}
      <motion.div
        className="relative group"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            opacity: isDragging ? 1 : 0,
            scale: isDragging ? 1.05 : 1,
          }}
        />

        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 backdrop-blur-md transition-all duration-300 ${
            isDragging
              ? "border-cyan-400 bg-gradient-to-br from-cyan-500/20 to-purple-500/20"
              : "border-white/20 bg-gradient-to-br from-white/5 to-white/10 hover:border-cyan-400/50 hover:bg-gradient-to-br hover:from-cyan-500/10 hover:to-purple-500/10"
          }`}
        >
          {/* Upload icon with animation */}
          <motion.div
            className="flex justify-center mb-4"
            animate={isDragging ? { scale: 1.2, y: -10 } : { scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Cloud className="relative w-12 h-12 text-cyan-400 z-10" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-xl font-bold text-white text-center mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-sm text-slate-300 text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {description}
          </motion.p>

          {/* Upload button */}
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <motion.button
            onClick={handleButtonClick}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-cyan-500/25"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Upload className="w-5 h-5" />
            {buttonText}
          </motion.button>
        </div>
      </motion.div>

      {/* Demo images */}
      {demoImages.length > 0 && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm font-semibold text-slate-300 mb-4 text-center">
            O prueba con nuestras demos
          </p>
          <div className="grid grid-cols-2 gap-4">
            {demoImages.map((demo, index) => (
              <motion.button
                key={index}
                variants={demoVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                onClick={() => onDemoClick(index)}
                onMouseEnter={() => setHoveredDemo(index)}
                onMouseLeave={() => setHoveredDemo(null)}
                className="relative group overflow-hidden rounded-lg aspect-square cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/40 to-purple-500/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center"
                  animate={{ opacity: hoveredDemo === index ? 1 : 0 }}
                >
                  <Image className="w-6 h-6 text-white" />
                </motion.div>

                {/* Demo image */}
                <img
                  src={demo.src}
                  alt={demo.alt}
                  className="w-full h-full object-cover"
                />

                {/* Border effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-cyan-400/0 rounded-lg"
                  animate={{
                    borderColor:
                      hoveredDemo === index
                        ? "rgba(34, 211, 238, 1)"
                        : "rgba(34, 211, 238, 0)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
