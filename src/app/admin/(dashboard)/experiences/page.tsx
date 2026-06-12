import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { deleteExperience } from "../../actions";
import { PageTitle } from "../ui";

export const dynamic = "force-dynamic";

export default async function ExperiencesPage() {
  const db = createAdminClient();
  const { data } = await db.from("experiences").select("*").order("sort");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle title="Expériences" subtitle={`${data?.length ?? 0} expérience(s)`} />
        <Link href="/admin/experiences/new" className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-emerald-400">
          + Nouvelle
        </Link>
      </div>
      <div className="space-y-3">
        {(data ?? []).map((e) => (
          <div key={e.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-4">
            <div className="min-w-0">
              <p className="truncate font-bold text-white">{e.fr?.title}</p>
              <p className="truncate text-sm text-slate-400">{e.company} · {e.period}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link href={`/admin/experiences/${e.id}`} className="rounded-lg border border-white/10 px-3 py-1.5 text-sm font-bold text-slate-200 hover:bg-white/5">Modifier</Link>
              <form action={deleteExperience}>
                <input type="hidden" name="id" value={e.id} />
                <button className="rounded-lg border border-red-500/30 px-3 py-1.5 text-sm font-bold text-red-300 hover:bg-red-500/10">Supprimer</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
