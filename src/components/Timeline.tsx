import type { ExperienceItem } from "@/content/types";

export function Timeline({ items }: { items: ExperienceItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((e) => (
        <article
          key={e.title + e.period}
          className="rounded-2xl border border-emerald-500/20 bg-slate-900/80 p-5 shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-semibold text-white">{e.title}</h2>
            <span className="text-sm text-emerald-400 font-medium">{e.period}</span>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            {e.company} • {e.location}
          </p>
          <ul className="mt-3 space-y-1.5 text-slate-300">
            {e.bullets.map((b) => (
              <li key={b} className="flex gap-2 text-sm">
                <span className="text-emerald-500 mt-0.5">→</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {e.tags.map((t) => (
              <span key={t} className="text-xs rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-300">
                {t}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
