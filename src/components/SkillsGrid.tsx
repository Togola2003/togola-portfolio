"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/content/types";

interface SkillGroup {
  title: string;
  items: string[];
}

interface SkillsData {
  title: string;
  groups: SkillGroup[];
  interestsTitle: string;
  interests: string[];
}

/**
 * 💡 COMPOSANT : SkillsGrid
 * Affiche les compétences chargées depuis /public/content/skills.json
 * Pour ajouter ou modifier des compétences, éditez uniquement ce fichier JSON.
 */
export function SkillsGrid({ lang }: { lang: Lang }) {
  const [data, setData] = useState<SkillsData | null>(null);

  useEffect(() => {
    fetch("/api/skills")
      .then((r) => r.json())
      .then((d) => setData(d[lang] ?? null))
      .catch(() => {});
  }, [lang]);

  if (!data) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data.groups.map((g) => (
        <div
          key={g.title}
          className="rounded-2xl border border-white/5 bg-slate-950/50 p-6 hover:bg-slate-900 transition-all duration-300 hover:border-emerald-500/20"
        >
          <p className="font-black text-emerald-400 text-lg uppercase tracking-wide">{g.title}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {g.items.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-xl border border-white/5 bg-slate-800 text-sm font-medium text-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
