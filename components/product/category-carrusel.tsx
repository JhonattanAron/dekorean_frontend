"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

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

export default function CategoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % departments.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + departments.length) % departments.length,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % departments.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const current = departments[currentIndex];

  return (
    <div className="w-full min-h-[600px] flex flex-col">
      {/* Main Carousel */}
      <div className="relative flex-1 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out scale-105"
          style={{
            backgroundImage: `url(${current.image})`,
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-brightness-75" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 md:px-12 pt-[10rem]">
          <div className="text-7xl md:text-8xl mb-6 drop-shadow-lg">
            {current.icon}
          </div>

          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg">
            {current.name}
          </h2>

          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow">
            {current.description}
          </p>

          <Button className="mt-10 px-10 py-6 text-lg font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl">
            Explorar
          </Button>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all z-20 backdrop-blur-md"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all z-20 backdrop-blur-md"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Indicators */}
      <div className="bg-background py-8 flex items-center justify-center gap-3 flex-wrap">
        {departments.map((dept, index) => (
          <Button
            key={dept.id}
            onClick={() => goToSlide(index)}
            className={`px-5 py-2 rounded-full font-medium transition-all transform hover:scale-110 ${
              index === currentIndex
                ? "bg-primary text-primary-foreground scale-110"
                : "bg-muted text-muted-foreground hover:bg-secondary"
            }`}
          >
            {dept.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
