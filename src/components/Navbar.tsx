"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/content/types";
import { motion, AnimatePresence } from "framer-motion";

/**
 * 💡 COMPOSANT : Navbar
 * Barre de navigation fixe avec effet de flou (glassmorphism) et animations fluides.
 */
export function Navbar({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Détecter le scroll pour changer le style de la barre
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ✏️ MODIFIER ICI : La langue alternative */
  const otherLang: Lang = lang === "fr" ? "en" : "fr";
  const switchHref = pathname.replace(`/${lang}`, `/${otherLang}`);

  /* ✏️ MODIFIER ICI : Vos liens de navigation (ajoutez ou supprimez des sections ici) */
  const links = [
    { href: `/${lang}#hero`,       label: lang === "fr" ? "Accueil"      : "Home"       },
    { href: `/${lang}/experience`,  label: lang === "fr" ? "Expérience"   : "Experience" },
    { href: `/${lang}#education`,   label: lang === "fr" ? "Formation"    : "Education"  },
    { href: `/${lang}/projects`,    label: lang === "fr" ? "Projets"      : "Projects"   },
    { href: `/${lang}#skills`,      label: lang === "fr" ? "Compétences"  : "Skills"     },
    { href: `/${lang}#contact`,     label: "Contact"                                     },
  ];

  const isActive = (href: string) =>
    !href.includes("#") &&
    (pathname === href || pathname.startsWith(href + "/"));

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <nav className={`flex items-center justify-between rounded-2xl px-4 h-14 transition-all duration-500 ${
          scrolled ? "glass shadow-2xl shadow-emerald-500/10 border-emerald-500/10" : "bg-transparent border-transparent"
        }`}>
          {/* LOGO */}
          <Link
            href={`/${lang}#hero`}
            className="group flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-slate-950 font-black text-xl shadow-glow-emerald group-hover:scale-110 transition-transform">
              NT
            </div>
            <span className="hidden sm:block font-black text-white tracking-tighter text-lg">
              PORTFOLIO
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link 
                key={l.href} 
                href={l.href} 
                className={`px-4 py-2 text-sm font-bold transition-all duration-300 rounded-xl relative ${
                  isActive(l.href) ? "text-emerald-400" : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {l.label}
                {isActive(l.href) && (
                  <motion.div 
                    layoutId="nav-underline" 
                    className="absolute bottom-1 left-4 right-4 h-0.5 bg-emerald-400 rounded-full" 
                  />
                )}
              </Link>
            ))}
            
            {/* SWITCH LANGUE */}
            <div className="ml-2 pl-2 border-l border-white/10">
              <Link
                href={switchHref}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-[11px] font-black text-emerald-400 hover:bg-emerald-500/20 transition-all duration-300"
              >
                {otherLang.toUpperCase()}
              </Link>
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex items-center gap-3 md:hidden">
             <Link
                href={switchHref}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-[11px] font-black text-emerald-400"
              >
                {otherLang.toUpperCase()}
              </Link>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-slate-300 hover:text-emerald-400 transition-colors"
              aria-label="Menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${open ? "rotate-45 translate-y-2.5" : ""}`}></span>
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${open ? "opacity-0" : ""}`}></span>
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}></span>
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE MENU DÉROULANT */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-b border-white/5 bg-slate-950/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1 p-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-4 rounded-2xl text-base font-bold transition-all ${
                    isActive(l.href) ? "bg-emerald-500/10 text-emerald-400" : "text-slate-300 active:bg-white/5"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
