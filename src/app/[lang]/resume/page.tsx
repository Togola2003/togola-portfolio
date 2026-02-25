import type { Lang } from "@/content/types";
import { getContent } from "@/content/getContent";

/**
 * Page CV : bouton download + aperçu PDF.
 */
export default async function ResumePage(props: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await props.params;
  const c = getContent(lang);

  // Chemin du fichier CV dans public/cv
  const pdfUrl = "/cv/CV-TOGOLA-2026.pdf";

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-50">
        {lang === "fr" ? "CV" : "Resume"}
      </h1>

      <div className="rounded-2xl border border-cyan-900/30 bg-slate-950/60 p-5 shadow-[0_0_40px_rgba(15,23,42,0.6)] space-y-3">
        <a
          href={pdfUrl}
          className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 transition"
          target="_blank"
          rel="noreferrer"
        >
          {lang === "fr" ? "Télécharger le CV (PDF)" : "Download resume (PDF)"}
        </a>
        <p className="text-sm text-slate-400">
          {lang === "fr" ? "PDF hébergé sur le site." : "PDF hosted on this site."}
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden border border-cyan-900/30 bg-slate-950/80 shadow-[0_0_40px_rgba(15,23,42,0.6)]">
        <iframe
          title="CV PDF"
          src={pdfUrl}
          className="h-[78vh] w-full"
        />
      </div>
    </div>
  );
}
