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
        <h1 className="text-3xl font-bold text-white mb-1">
          {c.experience.title}
        </h1>
        <div className="h-1 w-16 rounded-full bg-emerald-500" />
      </div>

      <div className="section-appear-2">
        <Timeline items={c.experience.items} />
      </div>

      <Footer lang={lang} />
    </div>
  );
}
