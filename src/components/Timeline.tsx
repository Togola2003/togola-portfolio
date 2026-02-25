import type { ExperienceItem } from "@/content/types";

/**
 * Timeline des expériences : cartes avec halo léger.
 */
export function Timeline({ items }: { items: ExperienceItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((e) => (
        <article
          key={e.title + e.period}
          className="rounded-2xl border border-cyan-900/30 bg-slate-950/60 p-5 shadow-[0_0_40px_rgba(15,23,42,0.6)] hover:bg-slate-900/60 transition"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-semibold text-slate-50">{e.title}</h2>
            <p className="text-sm text-slate-400">{e.period}</p>
          </div>

          <p className="mt-1 text-sm text-slate-300">
            {e.company} • {e.location}
          </p>

          <ul className="mt-3 space-y-2 text-slate-300">
            {e.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-slate-500">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            {e.tags.map((t) => (
              <span
                key={t}
                className="text-xs rounded-full border border-slate-700 bg-slate-900/80 px-2 py-1 text-slate-200"
              >
                {t}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
