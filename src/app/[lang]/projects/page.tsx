import type { Lang } from "@/content/types";
import { getContent } from "@/content/getContent";
import { ProjectGrid } from "@/components/ProjectGrid";

/**
 * Page Projets : grille filtrable + modal.
 */
export default async function ProjectsPage(props: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await props.params;
  const c = getContent(lang);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{c.projects.title}</h1>
        <p className="text-zinc-300">{c.projects.intro}</p>
      </header>

      <ProjectGrid lang={lang} />
    </div>
  );
}
