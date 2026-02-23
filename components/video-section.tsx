'use client'

import { Play } from 'lucide-react'

export function VideoSection() {
  return (
    <section className="bg-charcoal text-white py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-12">Mira cómo transformamos espacios</h2>
        <div className="relative group cursor-pointer aspect-video rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all z-10 flex items-center justify-center">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-primary rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-xl">
              <Play className="w-10 h-10 md:w-14 md:h-14 text-slate-900 fill-current" />
            </div>
          </div>
          <img
            alt="Video transformation preview"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5BA0o7NbHv-nYToEzOxAmvCLASre-YnSwzOEOwapRhjdQkfRd44F9uJ8T5tjVwo2Cm058-cy4Dln8cR5PEUbHPb2t-tp2A1MxLoQtLpYHAbCwL8syyT8-qfWtyC260yFe89vBfB3nHQdRpt3pcSfLUF4bRTqb2c2df68sCu5b4SFPEIKLw7C0JvufFUY0-fv1kanQtCkXXBtxJPgSJUAEGW3-qE9fIcP4vBU7fq_KQ5XoMVLipoa3gdlT1ZWioaPFa5OTBLYlFJU"
          />
          <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
            <span className="bg-red-600 w-2 h-2 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest">En directo desde obra</span>
          </div>
        </div>
      </div>
    </section>
  )
}
