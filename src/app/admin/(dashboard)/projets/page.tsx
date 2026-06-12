import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { deleteProject } from "../../actions";
import { PageTitle } from "../ui";

export const dynamic = "force-dynamic";

export default async function ProjetsPage() {
  const db = createAdminClient();
  const { data } = await db.from("projects").select("*").order("sort");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle title="Projets" subtitle={`${data?.length ?? 0} projet(s)`} />
        <Link
          href="/admin/projets/new"
          className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-emerald-400"
        >
          + Nouveau projet
        </Link>
      </div>

      <div className="space-y-3">
        {(data ?? []).map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-4"
          >
            <div className="min-w-0">
              <p className="truncate font-bold text-white">{p.fr?.title ?? p.slug}</p>
              <p className="truncate text-sm text-slate-400">
                {p.period} · {(p.tags ?? []).join(", ")}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/admin/projets/${p.id}`}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm font-bold text-slate-200 hover:bg-white/5"
              >
                Modifier
              </Link>
              <form action={deleteProject}>
                <input type="hidden" name="id" value={p.id} />
                <button className="rounded-lg border border-red-500/30 px-3 py-1.5 text-sm font-bold text-red-300 hover:bg-red-500/10">
                  Supprimer
                </button>
              </form>
            </div>
          </div>
        ))}
        {(!data || data.length === 0) && (
          <p className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 text-center text-slate-400">
            Aucun projet. Clique sur « Nouveau projet ».
          </p>
        )}
      </div>
    </div>
  );
}
