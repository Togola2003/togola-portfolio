import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { Card, PageTitle } from "./ui";

export const dynamic = "force-dynamic";

const TILES = [
  { href: "/admin/textes", label: "Textes & statut", desc: "Hero, statut, à propos, contact" },
  { href: "/admin/projets", label: "Projets", desc: "Ajouter / modifier / supprimer" },
  { href: "/admin/experiences", label: "Expériences", desc: "Parcours professionnel" },
  { href: "/admin/formation", label: "Formation", desc: "Diplômes et études" },
  { href: "/admin/competences", label: "Compétences", desc: "Groupes de compétences" },
  { href: "/admin/fichiers", label: "CV & photo", desc: "Uploader le CV PDF et la photo" },
];

export default async function Dashboard() {
  const db = createAdminClient();
  const [p, e, ed, s] = await Promise.all([
    db.from("projects").select("*", { count: "exact", head: true }),
    db.from("experiences").select("*", { count: "exact", head: true }),
    db.from("education").select("*", { count: "exact", head: true }),
    db.from("skill_groups").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Projets", value: p.count ?? 0 },
    { label: "Expériences", value: e.count ?? 0 },
    { label: "Formations", value: ed.count ?? 0 },
    { label: "Groupes de compétences", value: s.count ?? 0 },
  ];

  return (
    <div className="space-y-8">
      <PageTitle title="Tableau de bord" subtitle="Gère tout le contenu de ton portfolio depuis ici." />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((st) => (
          <Card key={st.label} className="text-center">
            <p className="text-3xl font-black text-emerald-400">{st.value}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-400">{st.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TILES.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group rounded-2xl border border-white/10 bg-slate-900/50 p-6 hover:border-emerald-500/40 hover:bg-slate-900 transition-all"
          >
            <p className="font-black text-white group-hover:text-emerald-400 transition-colors">{t.label}</p>
            <p className="mt-1 text-sm text-slate-400">{t.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
