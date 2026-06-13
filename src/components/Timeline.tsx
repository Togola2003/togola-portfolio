import type { ExperienceItem } from "@/content/types";
import { ScrollReveal } from "./ScrollReveal";
import { Lightbox } from "./Lightbox";

/**
 * 💡 COMPOSANT : Timeline
 * Affiche votre parcours (Expériences ou Formations) sous forme de liste animée.
 */
export function Timeline({ items }: { items: ExperienceItem[] }) {
  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-amber-500/20 before:to-transparent">
      {items.map((e, index) => (
        <ScrollReveal key={e.title + e.period} delay={index * 0.1}>
          <article
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
          >
            {/* Le point sur la ligne */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-amber-500/30 bg-slate-950 text-amber-400 shadow-xl z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-500 group-hover:scale-125 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:shadow-glow-amber">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            {/* La carte de contenu */}
            <div className="w-[calc(100%-4rem)] md:w-[45%] glass p-6 rounded-3xl shadow-xl hover:border-amber-500/40 transition-all duration-500">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">{e.title}</h3>
                <time className="text-xs font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  {e.period}
                </time>
              </div>
              
              <p className="text-sm font-bold text-slate-400 flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                {e.company} • {e.location}
              </p>

              <ul className="space-y-3">
                {e.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                    <span className="text-amber-500 font-bold shrink-0">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {e.images && e.images.length > 0 && (
                <div className="mt-5">
                  <Lightbox images={e.images} thumbHeight="h-28" columns="grid-cols-2" />
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {e.tags.map((t) => (
                  <span key={t} className="font-mono text-[10px] font-bold uppercase tracking-wider rounded-lg border border-steel-500/25 bg-steel-500/5 px-2.5 py-1 text-steel-300 transition-all">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </ScrollReveal>
      ))}
    </div>
  );
}
