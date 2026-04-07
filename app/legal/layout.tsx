import { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const legalPages = [
  { slug: "terminos-servicio", label: "Términos de Servicio" },
  { slug: "privacidad", label: "Política de Privacidad" },
  { slug: "cookies", label: "Política de Cookies" },
  { slug: "aviso-legal", label: "Aviso Legal" },
  { slug: "devolucion", label: "Política de Devoluciones" },
];

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Documentos Legales</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Centro de Documentos Legales
          </h1>
          <p className="text-muted-foreground mt-2">
            Información importante sobre nuestros términos, políticas y
            regulaciones
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="sticky top-6 rounded-lg border border-border bg-card p-6">
              <h2 className="text-sm font-semibold text-foreground mb-4">
                Documentos
              </h2>
              <ul className="space-y-2">
                {legalPages.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/legal/${page.slug}`}
                      className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-card rounded-lg border border-border p-8">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 DEKORANS - Todos los derechos reservados</p>
            <p className="mt-2">
              Última actualización: Abril 2025 | Versión 1.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
