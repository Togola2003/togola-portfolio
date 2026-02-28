"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/content/types";

export function Navbar({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const otherLang: Lang = lang === "fr" ? "en" : "fr";
  const switchHref = pathname.replace(`/${lang}`, `/${otherLang}`);

  const links = [
    { href: `/${lang}#hero`,       label: lang === "fr" ? "Accueil"      : "Home"       },
    { href: `/${lang}/experience`,  label: lang === "fr" ? "Expérience"   : "Experience" },
    { href: `/${lang}#education`,   label: lang === "fr" ? "Formation"    : "Education"  },
    { href: `/${lang}/projects`,    label: lang === "fr" ? "Projets"      : "Projects"   },
    { href: `/${lang}#skills`,      label: lang === "fr" ? "Compétences"  : "Skills"     },
    { href: `/${lang}#contact`,     label: "Contact"                                     },
    { href: `/${lang}/resume`,      label: "CV"                                          },
  ];

  const isActive = (href: string) =>
    !href.includes("#") &&
    (pathname === href || pathname.startsWith(href + "/"));

  const linkClass = (href: string) =>
    [
      "text-sm font-medium rounded-xl border px-3 py-1.5 transition-all duration-200",
      isActive(href)
        ? "border-emerald-500/70 bg-emerald-500/10 text-emerald-400"
        : "border-slate-700/60 bg-slate-900/60 text-slate-300 hover:border-emerald-500/50 hover:bg-slate-800 hover:text-white",
    ].join(" ");

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo NT */}
        <Link
          href={`/${lang}#hero`}
          className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm font-bold text-white hover:border-emerald-500/60 hover:bg-slate-800 transition-all duration-200"
        >
          NT
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
          <Link
            href={switchHref}
            className="ml-1 text-sm font-bold rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-emerald-400 hover:bg-emerald-500/20 transition-all duration-200"
          >
            {otherLang.toUpperCase()}
          </Link>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href={switchHref}
            className="text-xs font-bold rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1.5 text-emerald-400"
          >
            {otherLang.toUpperCase()}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-xl border border-slate-700 bg-slate-900 p-2 text-slate-300 hover:text-white transition-all"
            aria-label="Menu"
          >
            {open ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 px-4 py-4">
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={linkClass(l.href) + " text-center"}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
