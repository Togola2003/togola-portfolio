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
        <p className="font-mono text-xs tracking-[0.22em] text-amber-400/90 mb-3">
          {lang === "fr" ? "// TRAVAUX & RÉALISATIONS" : "// WORK & PROJECTS"}
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
          {c.projects.title}
        </h1>
        <div className="h-1 w-16 rounded-full bg-amber-500" />
        <p className="mt-3 text-slate-300">{c.projects.intro}</p>
      </div>

      <div className="section-appear-2">
        <ProjectGrid lang={lang} projects={c.projects.items} />
      </div>

      <Footer lang={lang} />
    </div>
  );
}
