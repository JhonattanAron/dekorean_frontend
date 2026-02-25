"use client";

import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { FooterImproved } from "@/components/footer-improved";
import { ProductsGrid } from "@/components/products-grid";
import { SearchBar } from "./product/seach-bar";

const DekoransLogo = () => (
  <img
    src="/images/dekorans-icon.png"
    alt="DEKORANS Logo"
    className="w-8 h-8 object-contain"
  />
);

export function ProductsPage() {
  const navLinks = [
    {
      label: "Productos",
      href: "/productos",
      active: true,
      id: "nav-productos-prod",
    },
    { label: "Visor Interactivo", href: "/", id: "nav-visor-prod" },
    { label: "Empresas", href: "#empresas", id: "nav-empresas-prod" },
    { label: "Soporte", href: "#soporte", id: "nav-soporte-prod" },
  ];

  return (
    <div className="min-h-screen bg-[#212129] flex flex-col">
      <Navbar
        links={navLinks}
        logo={{ icon: <DekoransLogo />, text: "DEKORANS" }}
        userProfile={{
          name: "Juan Pérez",
          plan: "Pro Plan",
          avatarUrl: "https://lh3.googleusercontent.com/a/default-user=s40c",
        }}
      />

      <main className="flex-1 pt-24">
        <div className="max-w-[1600px] mx-auto p-6 lg:p-8">
          <ProductsGrid />
        </div>
      </main>

      <FooterImproved />
    </div>
  );
}
