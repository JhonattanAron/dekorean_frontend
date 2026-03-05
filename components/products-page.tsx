"use client";
import { ProductsGrid } from "./products-grid";

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
      <main className="flex-1 pt-24">
        <div className="max-w-[1600px] mx-auto p-6 lg:p-8">
          <ProductsGrid />
        </div>
      </main>
    </div>
  );
}
