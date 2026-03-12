"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { ShoppingCart, Home, Package } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  logo: {
    icon: React.ReactNode;
    text: string;
  };
  links?: NavLink[];
  userProfile?: {
    name: string;
    plan: string;
    avatarUrl: string;
  };
}

export function Navbar({ logo, links, userProfile }: NavbarProps) {
  const { items, toggleCart } = useCartStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Default mobile navigation links
  const mobileLinks = [
    { label: "Home", href: "/", icon: <Home className="w-6 h-6" /> },
    {
      label: "Productos",
      href: "/productos",
      icon: <Package className="w-6 h-6" />,
    },
  ];

  return (
    <>
      {/* Desktop/Tablet Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "top-0 py-2" : "top-4 py-0"
        }`}
      >
        <nav
          className={`mx-auto flex items-center justify-between px-6 rounded-2xl transition-all duration-500 ${
            isScrolled
              ? "py-3 bg-slate-700/95 border-white/5 shadow-xl"
              : "py-4 mx-auto bg-gradient-to-b from-slate-900/90 to-slate-950/90 max-w-7xl border-white/10 shadow-2xl"
          } backdrop-blur-xl border`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="text-primary">{logo.icon}</div>
            <span
              className={`font-bold tracking-tight text-white transition-all duration-500 ${
                isScrolled ? "text-lg" : "text-xl"
              }`}
            >
              {logo.text}
            </span>
          </Link>

          {/* Desktop Navigation Links (hidden on mobile) */}
          {links && (
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-300 ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right Section: Theme + User Profile */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />
            <button
              onClick={toggleCart}
              className="relative md:flex hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Carrito de compras"
            >
              <ShoppingCart className="w-5 h-5 text-white/80 hover:text-primary transition-colors" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-slate-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>

            {/* User Profile */}
            {userProfile && (
              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-semibold text-white">
                    {userProfile.name}
                  </p>
                  <p className="text-[10px] text-white/50">
                    {userProfile.plan}
                  </p>
                </div>
                <div
                  className="size-10 rounded-full bg-cover bg-center border border-white/20"
                  style={{ backgroundImage: `url('${userProfile.avatarUrl}')` }}
                  aria-label="User profile"
                />
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="mx-auto bg-gradient-to-t from-slate-900/95 to-slate-900/90 backdrop-blur-xl border-t border-white/10 shadow-2xl">
          <div className="flex items-center justify-around px-4 py-3">
            {mobileLinks.map((link) => (
              <Link
                key={link.href}
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

            {/* Cart with badge */}
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Carrito de compras"
            >
              <ShoppingCart className="w-5 h-5 text-white/80 hover:text-primary transition-colors" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-slate-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
