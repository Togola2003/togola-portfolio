import type { Lang } from "@/content/types";
import { getContent } from "@/content/getContent";

/**
 * Footer : © 2026 N'Golo Togola — Tous droits réservés — Conçu avec passion.
 */
export function Footer({ lang }: { lang: Lang }) {
  const c = getContent(lang);

  return (
    <footer className="mt-16 border-t border-slate-800 pt-6 text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 md:flex-row md:items-center md:justify-between">
        <span>© 2026 {c.meta.name}</span>
        <span>{c.footer.rights}</span>
        <span>{c.footer.madeWith}</span>
      </div>
    </footer>
  );
}
