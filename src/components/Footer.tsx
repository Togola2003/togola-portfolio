import type { Lang } from "@/content/types";
import { getContent } from "@/content/getContent";

export function Footer({ lang }: { lang: Lang }) {
  const c = getContent(lang);

  return (
    <footer className="mt-12 border-t border-slate-800 pt-6 pb-2">
      <div className="flex flex-col gap-1 text-center text-sm text-slate-500 md:flex-row md:justify-between">
        <span>© 2026 {c.meta.name}</span>
        <span>{c.footer.rights}</span>
        <span>{c.footer.madeWith}</span>
      </div>
    </footer>
  );
}
