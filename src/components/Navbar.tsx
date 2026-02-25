"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/content/types";
import { getContent } from "@/content/getContent";

/**
 * Navbar : logo NT, liens avec soulignement animé, switch FR/EN.
 */
export function Navbar({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const c = getContent(lang);

  const links = [
    { href: `/${lang}#hero`, label: c.nav.home },
    { href: `/${lang}#experience`, label: c.nav.experience },
    { href: `/${lang}#education`, label: lang === "fr" ? "Formation" : "Education" },
    { href: `/${lang}#projects`, label: c.nav.projects },
    { href: `/${lang}#skills`, label: lang === "fr" ? "Compétences" : "Skills" },
    { href: `/${lang}#contact`, label: lang === "fr" ? "Contact" : "Contact" },
    { href: `/${lang}/resume`, label: c.nav.resume },
  ];

  const otherLang: Lang = lang === "fr" ? "en" : "fr";
  const switchHref = pathname.startsWith(`/${lang}`)
    ? pathname.replace(`/${lang}`, `/${otherLang}`)
    : `/${otherLang}`;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo NT qui ramène en haut de la home */}
        <Link
          href={`/${lang}#hero`}
          className="inline-flex items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-sm font-semibold tracking-tight text-slate-50 hover:bg-slate-800 transition"
        >
          NT
        </Link>

        <nav className="flex items-center gap-2">
          {links.map((l) => {
            const isResume = l.href.endsWith("/resume");
            const active = isResume ? pathname.endsWith("/resume") : false;

            return (
              <Link
                key={l.href}
                href={l.href}
                className="group relative px-3 py-2 text-sm text-slate-300 hover:text-slate-50 transition"
              >
                {l.label}
                <span
                  className={[
                    "pointer-events-none absolute left-3 right-3 bottom-1 h-[2px] origin-left scale-x-0 rounded-full bg-emerald-400/80 transition-transform",
                    active ? "scale-x-100" : "group-hover:scale-x-100",
                  ].join(" ")}
                />
              </Link>
            );
          })}

          <a
            href={switchHref}
            className="ml-2 inline-flex items-center justify-center rounded-xl border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-900 transition"
          >
            {otherLang.toUpperCase()}
          </a>
        </nav>
      </div>
    </div>
  );
}
