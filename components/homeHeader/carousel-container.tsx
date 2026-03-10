"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PanelesSlide } from "./carousel-slides/paneles-slide";
import { CocinaSlide } from "./carousel-slides/cocina-slide";
import { PlantasSlide } from "./carousel-slides/plantas-slide";
import { PersonalizacionSlide } from "./carousel-slides/personalizacion-slide";
import { AmbientesSlide } from "./carousel-slides/ambientes-slide";
import { HomeHero } from "./carousel-slides/home-hero";

const slides = [
  { id: 0, component: HomeHero, title: "Editor" },
  { id: 1, component: PanelesSlide, title: "Paneles" },
  { id: 2, component: CocinaSlide, title: "Cocina" },
  { id: 3, component: PlantasSlide, title: "Plantas" },
  { id: 4, component: PersonalizacionSlide, title: "Personalización" },
  { id: 5, component: AmbientesSlide, title: "Ambientes" },
];

export function CarouselContainer() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setDirection(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoplay]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIsAutoplay(false);
    setCurrent((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = slides.length - 1;
      if (next >= slides.length) next = 0;
      return next;
    });
    setTimeout(() => setIsAutoplay(true), 1000);
  };

  const goToSlide = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setIsAutoplay(false);
    setCurrent(index);
    setTimeout(() => setIsAutoplay(true), 1000);
  };

  const CurrentSlide = slides[current].component;

  return (
    <div className="relative w-full">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="w-full"
        >
          <CurrentSlide />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 backdrop-blur-md"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={() => paginate(1)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 backdrop-blur-md"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === current
                ? "bg-primary w-8 h-2"
                : "bg-white/30 hover:bg-white/50 w-2 h-2"
            } rounded-full`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-20 flex items-center gap-2 bg-black/40 backdrop-blur border border-white/10 px-4 py-2 rounded-lg">
        <span className="text-white font-semibold">
          {String(current + 1).padStart(2, "0")}
        </span>
        <span className="text-white/50">/</span>
        <span className="text-white/50 font-semibold">
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
