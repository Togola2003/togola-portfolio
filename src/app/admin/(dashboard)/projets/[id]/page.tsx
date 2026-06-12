import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { ProjectForm } from "../ProjectForm";
import { PageTitle } from "../../ui";

export const dynamic = "force-dynamic";

export default async function ProjectEditPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const isNew = id === "new";

  let project = null;
  if (!isNew) {
    const db = createAdminClient();
    const { data } = await db.from("projects").select("*").eq("id", id).single();
    if (!data) notFound();
    project = data;
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/projets" className="text-sm font-bold text-emerald-400 hover:text-emerald-300">
        ← Retour aux projets
      </Link>
      <PageTitle title={isNew ? "Nouveau projet" : "Modifier le projet"} />
      <ProjectForm project={project} />
    </div>
  );
}
