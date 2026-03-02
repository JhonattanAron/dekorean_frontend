"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginModal } from "@/components/admin/login-component";

export default function UnderConstructionPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl bg-primary/20"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl bg-secondary/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        {/* Status badge */}
        <div className="mb-8 inline-block">
          <span className="inline-flex items-center gap-2 text-2xl px-4 py-2 rounded-full border border-muted bg-muted/30 text-muted-foreground">
            <span className="w-5 h-5 rounded-full bg-yellow-400 animate-pulse"></span>
            En construcción 🚧
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
          Estamos creando algo <span className="text-primary">increíble</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance">
          Nuestro equipo está trabajando en construir la mejor experiencia para
          ti. Vuelve pronto para descubrir lo que tenemos preparado.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => setIsLoginModalOpen(true)}
            size="lg"
            className="px-8 py-6 text-base font-semibold rounded-full"
          >
            Ir a Login
          </Button>
        </div>

        {/* Divider */}
        <div className="my-16 max-w-md mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-muted to-transparent"></div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </main>
  );
}
