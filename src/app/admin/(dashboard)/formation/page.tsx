import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { deleteEducation } from "../../actions";
import { PageTitle } from "../ui";

export const dynamic = "force-dynamic";

export default async function FormationPage() {
  const db = createAdminClient();
  const { data } = await db.from("education").select("*").order("sort");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle title="Formation" subtitle={`${data?.length ?? 0} formation(s)`} />
        <Link href="/admin/formation/new" className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-emerald-400">
          + Nouvelle
        </Link>
      </div>
      <div className="space-y-3">
        {(data ?? []).map((e) => (
          <div key={e.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-4">
            <div className="min-w-0">
              <p className="truncate font-bold text-white">{e.fr?.title}</p>
              <p className="truncate text-sm text-slate-400">{e.place} · {e.period}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link href={`/admin/formation/${e.id}`} className="rounded-lg border border-white/10 px-3 py-1.5 text-sm font-bold text-slate-200 hover:bg-white/5">Modifier</Link>
              <form action={deleteEducation}>
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
