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
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

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
      {/* DESKTOP */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        <nav
          className={`
            mx-auto max-w-7xl flex items-center justify-between px-6 py-5
            rounded-2xl border backdrop-blur-xl transition-all duration-500
            ${
              isScrolled
                ? "bg-background/70 border-border shadow-lg"
                : "bg-background/40 border-transparent"
            }
          `}
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-primary transition-transform group-hover:scale-110">
              {logo.icon}
            </div>
            <span className="font-bold text-xl text-foreground tracking-tight">
              {logo.text}
            </span>
          </Link>

          {/* LINKS */}
          {links && (
            <div className="hidden md:flex items-center gap-6 relative">
              {links.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-2 py-1 text-sm font-medium"
                  >
                    <span
                      className={`transition ${
                        active
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </span>

                    {/* underline animado */}
                    <span
                      className={`
                        absolute left-0 -bottom-1 h-[2px] w-full
                        bg-primary transition-all duration-300
                        ${
                          active
                            ? "opacity-100 scale-x-100"
                            : "opacity-0 scale-x-0 group-hover:scale-x-100"
                        }
                      `}
                    />
                  </Link>
                );
              })}
            </div>
          )}

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* CART */}
            <button
              onClick={toggleCart}
              className="
                relative hidden md:flex items-center justify-center
                p-2 rounded-xl
                bg-accent hover:bg-primary/10
                transition-all
              "
            >
              <ShoppingCart className="w-5 h-5 text-muted-foreground hover:text-primary transition" />

              {items.length > 0 && (
                <span
                  className="
                  absolute -top-1 -right-1
                  bg-primary text-primary-foreground
                  text-xs font-bold
                  w-5 h-5 rounded-full flex items-center justify-center
                  animate-pulse
                "
                >
                  {items.length}
                </span>
              )}
            </button>

            {/* USER */}
            {userProfile && (
              <div className="flex items-center gap-3 pl-3 border-l border-border">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-semibold text-foreground">
                    {userProfile.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {userProfile.plan}
                  </p>
                </div>

                <div
                  className="
                    size-9 rounded-full bg-cover bg-center
                    border border-border
                    hover:scale-105 transition
                  "
                  style={{ backgroundImage: `url('${userProfile.avatarUrl}')` }}
                />
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* MOBILE */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden w-[95%]">
        <div className="flex items-center justify-around px-4 py-3 rounded-2xl bg-background/80 backdrop-blur-xl border border-border shadow-xl">
          {mobileLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className={`
                    p-2 rounded-xl transition
                    ${
                      active
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground"
                    }
                  `}
                >
                  {link.icon}
                </div>
                <span className="text-xs">{link.label}</span>
              </Link>
            );
          })}

          {/* CART */}
          <button
            onClick={toggleCart}
            className="relative flex flex-col items-center"
          >
            <div className="p-2 rounded-xl text-muted-foreground">
              <ShoppingCart className="w-5 h-5" />
            </div>

            {items.length > 0 && (
              <span className="absolute top-0 right-1 bg-primary text-primary-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
