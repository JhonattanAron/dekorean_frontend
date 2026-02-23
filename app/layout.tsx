import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { CartModal } from '@/components/cart-modal'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DEKORANS | Paneles Acústicos Innovadores',
  description: 'Personaliza tu espacio con paneles innovadores. Arrastra y sube una foto de tu pared para visualizar a escala real.',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FBD723',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-background-light dark:bg-background-dark text-white`}>
        {children}
        <CartModal />
      </body>
    </html>
  )
}

