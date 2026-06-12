import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { saveEducation } from "../../../actions";
import { PageTitle, Field, SaveButton } from "../../ui";

export const dynamic = "force-dynamic";

export default async function EducationEditPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const isNew = id === "new";
  let e: any = {};
  if (!isNew) {
    const db = createAdminClient();
    const { data } = await db.from("education").select("*").eq("id", id).single();
    if (!data) notFound();
    e = data;
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/formation" className="text-sm font-bold text-emerald-400 hover:text-emerald-300">← Retour</Link>
      <PageTitle title={isNew ? "Nouvelle formation" : "Modifier la formation"} />
      <form action={saveEducation} className="space-y-6">
        {!isNew && <input type="hidden" name="id" value={e.id} />}
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Établissement" name="place" defaultValue={e.place} />
          <Field label="Période" name="period" defaultValue={e.period} placeholder="2022 – 2027" />
          <Field label="Ordre d'affichage" name="sort" type="number" defaultValue={e.sort ?? 0} />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Intitulé (FR)" name="fr_title" defaultValue={e.fr?.title} />
          <Field label="Title (EN)" name="en_title" defaultValue={e.en?.title} />
        </div>
        <SaveButton>Enregistrer la formation</SaveButton>
      </form>
    </div>
  );
}
