"use client";

import { useState } from "react";
import { Cloud, ImagePlus } from "lucide-react";

interface UploadBoxProps {
  title: string;
  description: string;
  buttonText: string;
  demoImages: Array<{
    src: string;
    alt: string;
  }>;
  onUpload?: (files: FileList) => void;
  onDemoClick?: (index: number) => void;
}

export function UploadBox({
  title,
  description,
  buttonText,
  demoImages,
  onUpload,
  onDemoClick,
}: UploadBoxProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && onUpload) {
      onUpload(e.dataTransfer.files);
    }
  };

  return (
    <div
      className="w-full max-w-md aspect-square rounded-xl glass-panel p-8 flex flex-col items-center justify-center text-center gap-6 group hover:border-primary/50 transition-all duration-500 shadow-2xl"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Icon */}
      <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
        <Cloud className="w-12 h-12" />
      </div>

      {/* Title and Description */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-white/50 max-w-[240px]">{description}</p>
      </div>

      {/* Upload Button */}
      <div className="w-full border-2 border-dashed border-white/20 rounded-lg p-1 transition-colors group-hover:border-primary/40">
        <label className="block w-full">
          <input
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/heic"
            //onChange={(e) => onUpload?.(e.target.files)}
          />
          <button
            type="button"
            onClick={(e) => {
              //e.currentTarget.closest('label')?.querySelector('input[type="file"]')?.click?.()
            }}
            className="w-full bg-white text-background-dark font-bold py-4 rounded-lg shadow-lg hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <ImagePlus className="w-5 h-5" />
            {buttonText}
          </button>
        </label>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 font-bold">
        <span className="h-px w-8 bg-white/10"></span>O utiliza una demo
        <span className="h-px w-8 bg-white/10"></span>
      </div>

      {/* Demo Images */}
      <div className="flex gap-3">
        {demoImages.map((image, index) => (
          <div
            key={index}
            className="size-12 rounded-lg bg-cover bg-center cursor-pointer hover:ring-2 ring-primary transition-all"
            style={{ backgroundImage: `url('${image.src}')` }}
            role="button"
            tabIndex={0}
            onClick={() => onDemoClick?.(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onDemoClick?.(index);
            }}
            aria-label={image.alt}
          />
        ))}
      </div>
    </div>
  );
}
