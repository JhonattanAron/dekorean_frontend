"use client";

import { ReactNode, useState } from "react";
import { X, Menu } from "lucide-react";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar para desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 border-gray-200 p-4 flex flex-col
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Botón cerrar (solo visible en móvil) */}
        <div className="flex justify-end lg:hidden">
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <h2 className="text-xl font-bold mb-6">Admin</h2>

        <nav className="flex flex-col space-y-2">
          <a href="/admin/products" className="px-2 py-1 hover:underline">
            Productos
          </a>
          <a href="/admin/users" className="px-2 py-1 hover:underline">
            Usuarios
          </a>
          <a href="/admin/settings" className="px-2 py-1 hover:underline">
            Configuración
          </a>
        </nav>
      </aside>

      {/* Botón abrir sidebar (solo móvil) */}
      <button
        className="fixed top-4 left-4 z-40 lg:hidden  p-2 rounded-md"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Contenido principal */}
      <main className="flex-1 p-6 overflow-auto lg:ml-64">{children}</main>
    </div>
  );
}
