interface SkillGroup {
  title: string;
  items: string[];
}

/**
 * 💡 COMPOSANT : SkillsGrid
 * Affiche les groupes de compétences reçus en props depuis le Server
 * Component parent (déjà chargés depuis Supabase) : la section reste
 * indexable par les moteurs de recherche, sans second appel réseau.
 */
export function SkillsGrid({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {groups.map((g) => (
        <div
          key={g.title}
          className="rounded-2xl border border-white/5 bg-slate-950/50 p-6 hover:bg-slate-900 transition-all duration-300 hover:border-amber-500/20"
        >
          <p className="font-black text-amber-400 text-lg uppercase tracking-wide">{g.title}</p>
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
