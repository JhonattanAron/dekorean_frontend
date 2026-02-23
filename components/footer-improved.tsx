'use client'

import { Instagram, Linkedin, Mail, Phone } from 'lucide-react'

export function FooterImproved() {
  return (
    <footer className="bg-[#212129]/95 backdrop-blur border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">DEKORANS</h3>
            <p className="text-sm text-white/60">
              Paneles acústicos y decorativos innovadores para transformar tu espacio.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-primary transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-primary transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-primary transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Productos</h4>
            <ul className="space-y-2">
              <li>
                <a href="/productos" className="text-sm text-white/60 hover:text-primary transition-colors">
                  Paneles Premium
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-primary transition-colors">
                  3D Texturizados
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-primary transition-colors">
                  Difusores Acústicos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-primary transition-colors">
                  Catálogo Completo
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Empresa</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-primary transition-colors">
                  Acerca de Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-primary transition-colors">
                  Empleos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-primary transition-colors">
                  Prensa
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Soporte</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-primary transition-colors">
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-primary transition-colors">
                  Envíos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-primary transition-colors">
                  Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-primary transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-primary transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Términos de Servicio
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Política de Cookies
            </a>
          </div>
          <div className="text-sm text-white/50">© 2024 DEKORANS. Todos los derechos reservados.</div>
        </div>
      </div>
    </footer>
  )
}
