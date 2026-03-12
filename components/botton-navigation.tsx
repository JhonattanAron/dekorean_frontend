"use client";

import { ShoppingCart, Home, Package } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BottomNavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface BottomNavigationProps {
  links?: BottomNavLink[];
}

export function BottomNavigation({ links }: BottomNavigationProps) {
  const { items, toggleCart } = useCartStore();
  const pathname = usePathname();

  // Default links if not provided
  const defaultLinks: BottomNavLink[] = [
    { label: "Home", href: "/", icon: <Home className="w-6 h-6" /> },
    {
      label: "Productos",
      href: "/productos",
      icon: <Package className="w-6 h-6" />,
    },
    {
      label: "Carrito",
      href: "/carrito",
      icon: <ShoppingCart className="w-6 h-6" />,
    },
  ];

  const navLinks = links || defaultLinks;

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="mx-auto bg-gradient-to-t from-slate-900/95 to-slate-900/90 backdrop-blur-xl border-t border-white/10 shadow-2xl">
        <div className="flex items-center justify-around px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive(link.href)
                  ? "text-primary bg-white/10"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.icon}
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          ))}

          {/* Carrito con badge */}
          <button
            onClick={toggleCart}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 relative ${
              isActive("/carrito")
                ? "text-primary bg-white/10"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
            aria-label="Carrito de compras"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-slate-900 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">Carrito</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
