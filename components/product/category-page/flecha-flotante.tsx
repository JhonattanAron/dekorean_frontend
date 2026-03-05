"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FlechaFlotante() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
    >
      <motion.button
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
        animate={{ y: [0, 12, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center text-white/80 hover:text-white transition"
      >
        <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>

        <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
          <ChevronDown size={28} />
        </div>
      </motion.button>
    </motion.div>
  );
}
