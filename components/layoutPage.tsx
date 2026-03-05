"use client";

import { Navbar } from "@/components/navbar";
import { FooterImproved } from "@/components/footer-improved";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const DekoransLogo = () => (
  <img
    src="/images/dekorans-icon.png"
    alt="DEKORANS Logo"
    className="w-8 h-8 object-contain"
  />
);

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navLinks = [
    { label: "Productos", href: "/productos", active: true },
    { label: "Visor Interactivo", href: "/" },
    { label: "Empresas", href: "#empresas" },
    { label: "Soporte", href: "#soporte" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        links={navLinks}
        logo={{ icon: <DekoransLogo />, text: "DEKORANS" }}
        userProfile={{
          name: "Juan Pérez",
          plan: "Pro Plan",
          avatarUrl: "https://lh3.googleusercontent.com/a/default-user=s40c",
        }}
      />

      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <FooterImproved />
    </div>
  );
}
