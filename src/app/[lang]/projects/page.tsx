import type { Lang } from "@/content/types";
import { getContent } from "@/content/getContent";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Footer } from "@/components/Footer";

export default async function ProjectsPage(props: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await props.params;
  const c = await getContent(lang);

  return (
    <div className="space-y-8">
      <div className="section-appear">
        <h1 className="text-3xl font-bold text-white mb-1">
          {c.projects.title}
        </h1>
        <div className="h-1 w-16 rounded-full bg-emerald-500" />
        <p className="mt-3 text-slate-300">{c.projects.intro}</p>
      </div>

      <div className="section-appear-2">
        <ProjectGrid lang={lang} />
      </div>

      <Footer lang={lang} />
    </div>
  );
}
