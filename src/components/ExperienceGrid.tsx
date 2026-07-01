"use client";

import { useState } from "react";
import Image from "next/image";
import type { ExperienceItem, Lang } from "@/content/types";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbox } from "./Lightbox";

const t = {
  fr: {
    keyPoints: "Missions & réalisations",
    empty: "Aucune expérience à afficher.",
  },
  en: {
    keyPoints: "Missions & achievements",
    empty: "No experience to display.",
  },
};

/**
 * 💡 COMPOSANT : ExperienceGrid
 * Affiche le parcours sous forme de grille de cartes, avec une fiche de
 * détails au clic (même principe que ProjectGrid) : galerie d'images,
 * missions complètes et tags.
 */
export function ExperienceGrid({ items, lang }: { items: ExperienceItem[]; lang: Lang }) {
  const [open, setOpen] = useState<ExperienceItem | null>(null);
  const tx = t[lang];

  if (items.length === 0) {
    return <p className="text-slate-400">{tx.empty}</p>;
  }

  return (
    <div className="space-y-8">
      {/* ── GRILLE D'EXPÉRIENCES ── */}
      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {items.map((e) => (
            <motion.button
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={e.title + e.period}
              onClick={() => setOpen(e)}
              className="group text-left relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/40 p-5 shadow-xl hover:border-amber-500/30 transition-all duration-500 backdrop-blur-sm"
            >
              {e.images?.[0] && (
                <div className="relative mb-5 h-44 overflow-hidden rounded-2xl border border-white/5">
                  <Image
                    src={e.images[0]}
                    alt={e.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">{e.title}</h3>
                  <span className="text-xs font-bold text-amber-500/80 uppercase tracking-widest shrink-0">{e.period}</span>
                </div>
                <p className="text-sm font-medium text-slate-400">{e.company} • {e.location}</p>
                <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">{e.bullets[0]}</p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {e.tags.map((tg) => (
                    <span key={tg} className="font-mono text-[10px] font-bold uppercase tracking-wider rounded-lg border border-steel-500/30 bg-steel-500/5 px-2.5 py-1 text-steel-300">
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── MODALE DE DÉTAILS ── */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              onClick={() => setOpen(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Modale */}
              <div className="flex items-center justify-between gap-4 p-6 border-b border-white/5 bg-slate-900/50 sticky top-0 z-10 backdrop-blur-sm">
                <div className="min-w-0">
                  <h3 className="text-2xl md:text-3xl font-black text-white">{open.title}</h3>
                  <p className="text-sm font-bold text-amber-400 mt-1 uppercase tracking-widest truncate">
                    {open.company} • {open.period}
                  </p>
                </div>
                <button
                  onClick={() => setOpen(null)}
                  className="group h-10 w-10 flex items-center justify-center rounded-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all shrink-0"
                >
                  <span className="text-xl group-hover:rotate-90 transition-transform duration-300">✕</span>
                </button>
              </div>

              {/* Contenu Modale */}
              <div className="overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar">
                {/* Galerie Images (clic = agrandir en entier) */}
                {open.images && open.images.length > 0 && (
                  <Lightbox images={open.images} columns="grid-cols-2 sm:grid-cols-3" thumbHeight="h-40" />
                )}

                <p className="text-sm font-medium text-slate-400">{open.location}</p>

                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                    {tx.keyPoints}
                  </h4>
                  <ul className="grid gap-3">
                    {open.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="text-amber-400 font-bold shrink-0">0{i + 1}</span>
                        <span className="text-sm leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {open.tags.map((tg) => (
                    <span key={tg} className="px-3 py-1.5 rounded-xl border border-steel-500/25 bg-steel-500/5 text-xs font-bold text-steel-300">
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
