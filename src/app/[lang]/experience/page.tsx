import type { Lang } from "@/content/types";
import { getContent } from "@/content/getContent";
import { Timeline } from "@/components/Timeline";
import { Footer } from "@/components/Footer";

export default async function ExperiencePage(props: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await props.params;
  const c = await getContent(lang);

  return (
    <div className="space-y-8">
      <div className="section-appear">
        <p className="font-mono text-xs tracking-[0.22em] text-amber-400/90 mb-3">
          {lang === "fr" ? "// PARCOURS PROFESSIONNEL" : "// PROFESSIONAL BACKGROUND"}
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
          {c.experience.title}
        </h1>
        <div className="h-1 w-16 rounded-full bg-amber-500" />
      </div>

      <div className="section-appear-2">
        <Timeline items={c.experience.items} />
      </div>

      <Footer lang={lang} />
    </div>
  );
}
