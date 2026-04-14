"use client";

import { useState } from "react";

interface Props {
  videos?: string[];
  mainVideo?: string;
}

export function ProductVideoViewer({ videos = [], mainVideo }: Props) {
  const [activeVideo, setActiveVideo] = useState(mainVideo || videos[0] || "");

  if (!videos.length) return null;

  return (
    <div className="space-y-4">
      {/* 🎬 VIDEO PRINCIPAL */}
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
        {activeVideo && (
          <video
            src={activeVideo}
            controls
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* 🎞 LISTA DE VIDEOS */}
      <div className="flex gap-2 overflow-x-auto">
        {videos.map((vid) => (
          <button
            key={vid}
            onClick={() => setActiveVideo(vid)}
            className={`w-24 h-16 bg-black rounded border-2 flex items-center justify-center ${
              activeVideo === vid ? "border-blue-500" : "border-transparent"
            }`}
          >
            <span className="text-white text-xs">▶</span>
          </button>
        ))}
      </div>
    </div>
  );
}
