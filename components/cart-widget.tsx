'use client'

import { X, Trash2, ShoppingCart } from 'lucide-react'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface CartWidgetProps {
  items: CartItem[]
  onRemoveItem: (id: number) => void
  onUpdateQuantity: (id: number, quantity: number) => void
  onClearCart: () => void
  isOpen: boolean
  onToggle: () => void
}

export function CartWidget({ items, onRemoveItem, onUpdateQuantity, onClearCart, isOpen, onToggle }: CartWidgetProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0
  const total = subtotal + shipping

  return (
    <>
      {/* Toggle Button - Visible on mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden z-40">
        <button
          onClick={onToggle}
          className="bg-primary text-slate-900 p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2 font-bold"
        >
          <ShoppingCart className="w-5 h-5" />
          {items.length > 0 && <span className="bg-slate-900/30 px-2 py-0.5 rounded-full text-xs">{items.length}</span>}
        </button>
      </div>

      {/* Overlay on mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 lg:hidden z-30" onClick={onToggle} />
      )}

      {/* Cart Widget */}
      <aside
        className={`fixed lg:fixed right-0 lg:right-6 top-24 w-full sm:w-96 h-[calc(100vh-120px)] lg:h-[calc(100vh-150px)] glass rounded-l-xl lg:rounded-xl p-6 border border-white/10 shadow-2xl flex flex-col transition-all duration-300 z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">Tu Carrito</h2>
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">{items.length}</span>
          </div>
          <button onClick={onToggle} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        {items.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 group">
                  <div className="w-20 h-20 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0">
                    <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">{item.name}</h4>
                    <p className="text-[10px] text-slate-500 mt-1">240x60cm</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-white/5 rounded px-2 py-1 gap-2 border border-white/10">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="text-slate-400 hover:text-primary font-bold text-sm"
                        >
                          −
                        </button>
                        <span className="text-xs w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="text-slate-400 hover:text-primary font-bold text-sm"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-bold text-primary">${(item.price * item.quantity).toLocaleString('es-ES')}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-slate-500 hover:text-red-400 self-start transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Totals & CTA */}
            <div className="pt-4 border-t border-white/5 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString('es-ES')}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Envío</span>
                  <span className="text-primary font-semibold">Gratis</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/5">
                  <span>Total</span>
                  <span className="text-primary">${total.toLocaleString('es-ES')}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full bg-primary text-slate-900 py-3 px-4 rounded-lg font-bold transition-all hover:bg-primary/90 shadow-lg hover:shadow-primary/30 active:scale-[0.98]">
                  Comprar Ahora
                </button>
                <button
                  onClick={onToggle}
                  className="w-full bg-white/5 border border-white/20 text-white py-3 rounded-lg font-bold transition-all hover:bg-white/10 hover:border-white/40"
                >
                  Seguir Comprando
                </button>
              </div>

              <button
                onClick={onClearCart}
                className="w-full text-slate-500 hover:text-red-400 text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-colors mt-2"
              >
                <Trash2 className="w-3 h-3" />
                Vaciar Carrito
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-slate-600 mb-3" />
            <p className="text-slate-400 text-center">Tu carrito está vacío</p>
            <p className="text-slate-500 text-xs text-center mt-2">Agrega productos para comenzar</p>
          </div>
        )}
      </aside>
    </>
  )
}
