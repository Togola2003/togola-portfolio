"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Lang } from "@/content/types";

interface Project {
  slug: string;
  title: string;
  period: string;
  tagline: string;
  bullets: string[];
  stack: string[];
  tags: string[];
  images: string[];
}

export function ProjectGrid({ lang }: { lang: Lang }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState("Tous");
  const [open, setOpen] = useState<Project | null>(null);

  useEffect(() => {
    fetch("/content/projects.json")
      .then((r) => r.json())
      .then((d) => { setProjects(d.projects ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return [lang === "fr" ? "Tous" : "All", ...Array.from(s)];
  }, [projects, lang]);

  const filtered = useMemo(
    () => (tag === "Tous" || tag === "All" ? projects : projects.filter((p) => p.tags.includes(tag))),
    [projects, tag]
  );

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={[
              "rounded-xl border px-3 py-1.5 text-sm font-medium transition-all duration-200",
              t === tag
                ? "border-emerald-500/70 bg-emerald-500/10 text-emerald-400"
                : "border-slate-700/60 bg-slate-900/60 text-slate-300 hover:border-emerald-500/40 hover:text-white",
            ].join(" ")}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grille */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((p) => (
          <button
            key={p.slug}
            onClick={() => setOpen(p)}
            className="text-left rounded-2xl border border-emerald-500/20 bg-slate-900/80 p-5 shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 hover:shadow-emerald-500/20 transition-all duration-300"
          >
            {p.images[0] && (
              <div className="relative mb-4 h-36 overflow-hidden rounded-xl">
                <Image
                  src={`/${p.images[0]}`}
                  alt={p.title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            )}
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <h2 className="text-lg font-semibold text-white">{p.title}</h2>
              <span className="text-sm text-emerald-400 shrink-0">{p.period}</span>
            </div>
            <p className="text-sm text-slate-300 mb-3">{p.tagline}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="text-xs rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-emerald-300">
                  {t}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 md:items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          onClick={() => setOpen(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-emerald-500/30 bg-slate-900 p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">{open.title}</h3>
                <p className="text-sm text-emerald-400 mt-0.5">{open.period}</p>
              </div>
              <button
                onClick={() => setOpen(null)}
                className="rounded-xl border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
              >
                ✕ Fermer
              </button>
            </div>

            {open.images.length > 0 && (
              <div className="grid gap-3 mb-5">
                {open.images.map((img, i) => (
                  <div key={i} className="relative h-48 overflow-hidden rounded-xl">
                    <Image src={`/${img}`} alt={open.title} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}

            <p className="text-slate-300 mb-4">{open.tagline}</p>
            <ul className="space-y-2 mb-5">
              {open.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-300">
                  <span className="text-emerald-400 mt-0.5 shrink-0">→</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {open.stack.map((s) => (
                <span key={s} className="text-xs rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-orange-300">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
