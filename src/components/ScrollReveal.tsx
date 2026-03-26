"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

/**
 * 💡 COMPOSANT : ScrollReveal
 * Enveloppe n'importe quel élément pour l'animer au scroll (fade-in + slide-up).
 */
export function ScrollReveal({ children, width = "100%", delay = 0 }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98] // Cubic bezier personnalisé pour un effet "smooth"
      }}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}
