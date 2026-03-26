"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * 💡 COMPOSANT : MouseGlow
 * Ajoute une lueur subtile qui suit le curseur pour un effet premium.
 */
export function MouseGlow() {
  /* ✏️ MODIFIER ICI : Rayon de la lueur et couleurs de l'effet de suivi de souris */
  const glowRadius = 350;
  const glowColor = "rgba(16, 185, 129, 0.15)"; /* ✏️ Couleur principale (Emerald) */

  // On utilise MotionValues pour éviter les re-renders fréquents de React
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // On ajoute de l'inertie (spring) pour un mouvement plus élégant et fluide
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - glowRadius / 2);
      mouseY.set(e.clientY - glowRadius / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, glowRadius]);

  return (
    <motion.div
      className="fixed top-0 left-0 -z-10 pointer-events-none hidden lg:block rounded-full"
      style={{
        width: glowRadius,
        height: glowRadius,
        x: springX,
        y: springY,
        background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        filter: "blur(40px)",
      }}
    />
  );
}
