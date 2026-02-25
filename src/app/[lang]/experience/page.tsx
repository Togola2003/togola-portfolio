import type { Lang } from "@/content/types";
import { getContent } from "@/content/getContent";

/**
 * Page CV : bouton download + aperçu PDF (iframe).
 */
export default async function ResumePage(props: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await props.params;
  const c = getContent(lang);

  const pdfUrl = "/cv/CV-TOGOLA-2026.pdf";

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">{c.nav.resume}</h1>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5 space-y-3">
        <a
          href={pdfUrl}
          className="inline-flex rounded-xl bg-white text-black px-4 py-2 text-sm font-medium hover:opacity-90 transition"
          target="_blank"
          rel="noreferrer"
        >
          {lang === "fr" ? "Télécharger le CV (PDF)" : "Download resume (PDF)"}
        </a>
        <p className="text-sm text-zinc-400">
          {lang === "fr" ? "PDF hébergé sur le site." : "PDF hosted on this site."}
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950/40">
        <iframe title="CV PDF" src={pdfUrl} className="w-full h-[78vh]" />
      </div>
    </div>
  );
}
