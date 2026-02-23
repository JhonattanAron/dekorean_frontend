'use client'

import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'

interface NavLink {
  label: string
  href: string
  active?: boolean
}

interface NavbarProps {
  links: NavLink[]
  logo: {
    icon: React.ReactNode
    text: string
  }
  userProfile?: {
    name: string
    plan: string
    avatarUrl: string
  }
}

export function Navbar({ links, logo, userProfile }: NavbarProps) {
  const { items, toggleCart } = useCartStore()

  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-white/10 shadow-2xl">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="text-primary">{logo.icon}</div>
          <span className="text-xl font-bold tracking-tight text-white">{logo.text}</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link, index) => (
            <a
              key={`${link.label}-${index}`}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                link.active
                  ? 'text-primary underline underline-offset-8'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Section: Cart + User Profile */}
        <div className="flex items-center gap-6">
          {/* Cart Button */}
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

          {/* User Profile */}
          {userProfile && (
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-white">{userProfile.name}</p>
                <p className="text-[10px] text-white/50">{userProfile.plan}</p>
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
  )
}
