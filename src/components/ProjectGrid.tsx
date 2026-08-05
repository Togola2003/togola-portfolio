"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Lang, ProjectItem } from "@/content/types";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbox } from "./Lightbox";

const t = {
  fr: {
    keyPoints: "Points clés",
    technologies: "Technologies",
    interestedTitle: "Intéressé par ce projet ?",
    interestedBody: "N'hésitez pas à me poser des questions sur les défis techniques rencontrés.",
    all: "Tous",
  },
  en: {
    keyPoints: "Key points",
    technologies: "Technologies",
    interestedTitle: "Interested in this project?",
    interestedBody: "Feel free to ask me about the technical challenges I faced.",
    all: "All",
  },
};

/**
 * 💡 COMPOSANT : ProjectGrid
 * Affiche vos projets avec un système de filtrage animé et une modale de détails.
 * Les données sont déjà chargées côté serveur (Server Component parent) et
 * reçues ici en props : la page reste indexable par les moteurs de recherche
 * et aucun second appel à la base de données n'est nécessaire.
 */
export function ProjectGrid({ lang, projects }: { lang: Lang; projects: ProjectItem[] }) {
  const [tag, setTag] = useState(lang === "fr" ? "Tous" : "All");
  const [open, setOpen] = useState<ProjectItem | null>(null);

  const tx = t[lang];

  // Calculer dynamiquement tous les tags disponibles
  const allTags = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.tags.forEach((tg) => s.add(tg)));
    return [tx.all, ...Array.from(s)];
  }, [projects, tx.all]);

  // Filtrer les projets selon le tag sélectionné
  const filtered = useMemo(
    () => (tag === tx.all ? projects : projects.filter((p) => p.tags.includes(tag))),
    [projects, tag, tx.all]
  );

  return (
    <div className="space-y-8">
      {/* ── BARRE DE FILTRES ── */}
      <div className="flex flex-wrap gap-2 p-1 bg-slate-900/40 rounded-2xl border border-white/5 w-fit">
        {allTags.map((tg) => (
          <button
            key={tg}
            onClick={() => setTag(tg)}
            className={`relative rounded-xl px-5 py-2 text-sm font-bold transition-all duration-300 ${
              tg === tag
                ? "text-slate-950"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span className="relative z-10">{tg}</span>
            {tg === tag && (
              <motion.div
                layoutId="active-tag"
                className="absolute inset-0 bg-amber-500 rounded-xl shadow-lg shadow-amber-500/20"
              />
            )}
          </button>
        ))}
      </div>

      {/* ── GRILLE DE PROJETS ── */}
      <motion.div
        layout
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.button
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={p.slug}
              onClick={() => setOpen(p)}
              className="group text-left relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/40 p-5 shadow-xl hover:border-amber-500/30 transition-all duration-500 backdrop-blur-sm"
            >
              {p.images?.[0] && (
                <div className="relative mb-5 h-52 overflow-hidden rounded-2xl border border-white/5">
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">{p.title}</h3>
                  <span className="text-xs font-bold text-amber-500/80 uppercase tracking-widest">{p.period}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{p.tagline}</p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {p.tags.map((tg) => (
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
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-900/50 sticky top-0 z-10 backdrop-blur-sm">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-white">{open.title}</h3>
                  <p className="text-sm font-bold text-amber-400 mt-1 uppercase tracking-widest">{open.period}</p>
                </div>
                <button
                  onClick={() => setOpen(null)}
                  className="group h-10 w-10 flex items-center justify-center rounded-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all"
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

                <div className="grid md:grid-cols-[1.5fr_1fr] gap-10">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                        Description
                      </h4>
                      <p className="text-slate-300 leading-relaxed text-lg">{open.tagline}</p>
                    </div>

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
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-white">{tx.technologies}</h4>
                      <div className="flex flex-wrap gap-2">
                        {open.stack.map((s) => (
                          <span key={s} className="px-3 py-1.5 rounded-xl border border-steel-500/25 bg-steel-500/5 text-xs font-bold text-steel-300">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 space-y-3">
                      <p className="text-xs font-black text-amber-400 uppercase tracking-widest text-center">{tx.interestedTitle}</p>
                      <p className="text-xs text-slate-400 text-center">{tx.interestedBody}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
