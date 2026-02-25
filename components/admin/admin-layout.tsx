"use client";

import { ReactNode } from "react";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 p-4 flex flex-col">
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

      {/* Contenido principal */}
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
