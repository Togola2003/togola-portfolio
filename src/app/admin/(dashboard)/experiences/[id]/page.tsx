import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { saveExperience } from "../../../actions";
import { PageTitle, Field, TextArea, SaveButton } from "../../ui";
import { ImageManager } from "../../ImageManager";

export const dynamic = "force-dynamic";

export default async function ExperienceEditPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const isNew = id === "new";
  let e: any = {};
  if (!isNew) {
    const db = createAdminClient();
    const { data } = await db.from("experiences").select("*").eq("id", id).single();
    if (!data) notFound();
    e = data;
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/experiences" className="text-sm font-bold text-emerald-400 hover:text-emerald-300">← Retour</Link>
      <PageTitle title={isNew ? "Nouvelle expérience" : "Modifier l'expérience"} />
      <form action={saveExperience} className="space-y-6">
        {!isNew && <input type="hidden" name="id" value={e.id} />}
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Entreprise" name="company" defaultValue={e.company} />
          <Field label="Lieu" name="location" defaultValue={e.location} />
          <Field label="Période" name="period" defaultValue={e.period} placeholder="Juil – Août 2025" />
          <Field label="Ordre d'affichage" name="sort" type="number" defaultValue={e.sort ?? 0} />
        </div>
        <Field label="Tags (séparés par virgules)" name="tags" defaultValue={(e.tags ?? []).join(", ")} />
        <ImageManager name="images" folder="experiences" initial={e.images ?? []} />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-400">Français</p>
            <Field label="Intitulé du poste" name="fr_title" defaultValue={e.fr?.title} />
            <TextArea label="Missions" name="fr_bullets" rows={5} hint="Une mission par ligne." defaultValue={(e.fr?.bullets ?? []).join("\n")} />
          </div>
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-400">English</p>
            <Field label="Job title" name="en_title" defaultValue={e.en?.title} />
            <TextArea label="Tasks" name="en_bullets" rows={5} hint="One task per line." defaultValue={(e.en?.bullets ?? []).join("\n")} />
          </div>
        </div>
        <SaveButton>Enregistrer l'expérience</SaveButton>
      </form>
    </div>
  );
}
