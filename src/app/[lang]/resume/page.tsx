import type { Lang } from "@/content/types";
import { Footer } from "@/components/Footer";
import { getAssets } from "@/content/getContent";

export default async function ResumePage(props: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await props.params;
  const { cvUrl: pdfUrl } = await getAssets();

  return (
    <div className="space-y-6">
      <div className="section-appear">
        <h1 className="text-3xl font-bold text-white mb-1">
          {lang === "fr" ? "Mon CV" : "My Resume"}
        </h1>
        <div className="h-1 w-16 rounded-full bg-amber-500" />
      </div>

      <div className="section-appear-2 rounded-2xl border border-amber-500/20 bg-slate-900/80 p-5 shadow-xl">
        <p className="text-slate-300 mb-4">
          {lang === "fr"
            ? "Téléchargez ou consultez mon CV au format PDF."
            : "Download or view my resume in PDF format."}
        </p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-amber-400 transition-all duration-300 hover:scale-105 shadow-lg shadow-amber-500/30"
        >
          ↓ {lang === "fr" ? "Télécharger le CV (PDF)" : "Download Resume (PDF)"}
        </a>
      </div>

      <div className="section-appear-2 overflow-hidden rounded-2xl border border-amber-500/20 bg-slate-900 shadow-xl">
        <iframe
          title="CV PDF"
          src={pdfUrl}
          className="h-[78vh] w-full"
        />
      </div>

      <Footer lang={lang} />
    </div>
  );
}
