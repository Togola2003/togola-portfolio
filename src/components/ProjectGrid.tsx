"use client";

import { useMemo, useState } from "react";
import type { Lang, ProjectItem } from "@/content/types";
import { getContent } from "@/content/getContent";

/**
 * Grille projets : filtre + modal.
 */
export function ProjectGrid({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const items = c.projects.items;

  const allTags = useMemo(() => {
    const s = new Set<string>();
    items.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return [c.ui.all, ...Array.from(s)];
  }, [items, c.ui.all]);

  const [tag, setTag] = useState<string>(c.ui.all);
  const [open, setOpen] = useState<ProjectItem | null>(null);

  const filtered = useMemo(() => {
    if (tag === c.ui.all) return items;
    return items.filter((p) => p.tags.includes(tag));
  }, [items, tag, c.ui.all]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-400">{c.projects.filtersLabel}</span>
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={[
              "text-sm rounded-xl px-3 py-1.5 border transition",
              t === tag
                ? "bg-emerald-500 text-black border-emerald-400"
                : "border-slate-700 text-slate-200 hover:bg-slate-900",
            ].join(" ")}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((p) => (
          <button
            key={p.slug}
            onClick={() => setOpen(p)}
            className="text-left rounded-2xl border border-cyan-900/30 bg-slate-950/60 p-5 shadow-[0_0_40px_rgba(15,23,42,0.6)] hover:bg-slate-900/60 transition"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold text-slate-50">{p.title}</h2>
              <span className="text-sm text-slate-400">{p.period}</span>
            </div>
            <p className="mt-2 text-slate-300">{p.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs rounded-full border border-slate-700 bg-slate-900/80 px-2 py-1 text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 md:items-center"
          onClick={() => setOpen(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-cyan-900/40 bg-slate-950/95 p-5 shadow-[0_0_50px_rgba(15,23,42,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-slate-50">{open.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{open.period}</p>
              </div>
              <button
                onClick={() => setOpen(null)}
                className="rounded-xl border border-slate-700 px-3 py-1.5 text-sm text-slate-100 hover:bg-slate-900 transition"
              >
                {c.ui.close}
              </button>
            </div>

            <p className="mt-3 text-slate-300">{open.tagline}</p>

            <ul className="mt-4 space-y-2 text-slate-300">
              {open.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-slate-500">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {open.stack.map((s) => (
                <span
                  key={s}
                  className="text-xs rounded-full bg-emerald-500/15 px-2 py-1 text-emerald-300 border border-emerald-500/40"
                >
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
