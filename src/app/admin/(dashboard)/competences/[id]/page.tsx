import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { saveSkillGroup } from "../../../actions";
import { PageTitle, Field, TextArea, SaveButton } from "../../ui";

export const dynamic = "force-dynamic";

export default async function SkillGroupEditPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const isNew = id === "new";
  let g: any = {};
  if (!isNew) {
    const db = createAdminClient();
    const { data } = await db.from("skill_groups").select("*").eq("id", id).single();
    if (!data) notFound();
    g = data;
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/competences" className="text-sm font-bold text-emerald-400 hover:text-emerald-300">← Retour</Link>
      <PageTitle title={isNew ? "Nouveau groupe de compétences" : "Modifier le groupe"} />
      <form action={saveSkillGroup} className="space-y-6">
        {!isNew && <input type="hidden" name="id" value={g.id} />}
        <Field label="Ordre d'affichage" name="sort" type="number" defaultValue={g.sort ?? 0} />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-400">Français</p>
            <Field label="Titre du groupe" name="fr_title" defaultValue={g.fr?.title} placeholder="CAO / DAO" />
            <TextArea label="Compétences" name="fr_items" rows={5} hint="Une compétence par ligne." defaultValue={(g.fr?.items ?? []).join("\n")} />
          </div>
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-400">English</p>
            <Field label="Group title" name="en_title" defaultValue={g.en?.title} placeholder="CAD / DAO" />
            <TextArea label="Skills" name="en_items" rows={5} hint="One skill per line." defaultValue={(g.en?.items ?? []).join("\n")} />
          </div>
        </div>
        <SaveButton>Enregistrer le groupe</SaveButton>
      </form>
    </div>
  );
}
