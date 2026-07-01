"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/**
 * 💡 COMPOSANT : Lightbox
 * Affiche une grille de vignettes. Au clic, l'image s'ouvre en plein écran
 * EN ENTIER (object-contain → aucun recadrage), avec navigation ◀ ▶,
 * fermeture au clic sur le fond ou via Échap. On ne quitte pas la page.
 */
export function Lightbox({
  images,
  thumbHeight = "h-32",
  columns = "grid-cols-2 sm:grid-cols-3",
}: {
  images: string[];
  thumbHeight?: string;
  columns?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  // Navigation clavier + blocage du scroll quand ouvert
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, prev, next]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* GRILLE DE VIGNETTES */}
      <div className={`grid gap-2 ${columns}`}>
        {images.map((img, i) => (
          <button
            key={img + i}
            type="button"
            onClick={() => setIndex(i)}
            className={`group relative ${thumbHeight} overflow-hidden rounded-xl border border-white/5 cursor-zoom-in`}
          >
            <Image
              src={img}
              alt={`Image ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-slate-950/0 opacity-0 transition-all duration-300 group-hover:bg-slate-950/40 group-hover:opacity-100">
              <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                🔍 Agrandir
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* OVERLAY PLEIN ÉCRAN */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4"
            onClick={close}
          >
            {/* Bouton fermer */}
            <button
              type="button"
              onClick={close}
              aria-label="Fermer"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl text-white hover:bg-white/15 transition-colors"
            >
              ✕
            </button>

            {/* Flèche précédente */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Précédente"
                className="absolute left-3 md:left-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl text-white hover:bg-white/15 transition-colors"
              >
                ‹
              </button>
            )}

            {/* Image en entier */}
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative h-[82vh] w-[90vw] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[index]}
                alt={`Image ${index + 1}`}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Flèche suivante */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Suivante"
                className="absolute right-3 md:right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl text-white hover:bg-white/15 transition-colors"
              >
                ›
              </button>
            )}

            {/* Compteur */}
            {images.length > 1 && (
              <span className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-white backdrop-blur-sm">
                {index + 1} / {images.length}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
