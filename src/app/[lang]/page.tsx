import Image from "next/image";
import Link from "next/link";
import type { Lang } from "@/content/types";
import { getContent, getAssets } from "@/content/getContent";
import { ContactActions } from "@/components/ContactActions";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SkillsGrid } from "@/components/SkillsGrid";
import { SectionHeader } from "@/components/SectionHeader";

/**
 * 💡 PAGE : HomePage
 * La page principale avec animations ScrollReveal et un design modernisé.
 */
export default async function HomePage(props: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await props.params;
  const c = await getContent(lang);
  const { photoUrl } = await getAssets();

  /* ✏️ MODIFIER ICI : Personnalisez l'objet de votre email de contact et le message de base */
  const subject = encodeURIComponent("Contact — Portfolio");
  const body = encodeURIComponent("Bonjour Ladji,\n\nJe te contacte pour...\n\nCordialement,");
  const mailto = `mailto:${c.contact.email}?subject=${subject}&body=${body}`;

  return (
    <div className="space-y-16 pb-12">

      {/* ── SECTION HERO ── */}
      <ScrollReveal>
        <section id="hero" className="grid items-center gap-10 md:grid-cols-[1.2fr_.8fr] py-10">
          {/* Texte gauche */}
          <div className="space-y-6">
            <div className="font-mono text-xs tracking-[0.22em] text-amber-400/90">
              {lang === "fr" ? "// INGÉNIEUR · MÉCATRONIQUE — 2026" : "// ENGINEER · MECHATRONICS — 2026"}
            </div>
            <div className="inline-flex items-start gap-2.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 shadow-glow-amber w-fit max-w-full sm:max-w-md">
              <span className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-400"></span>
              </span>
              <span className="text-sm font-bold leading-snug tracking-wide text-amber-300">{c.hero.statusLine}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-[1.15] tracking-tight">
              {c.hero.headline}
            </h1>

            <p className="text-lg md:text-xl font-bold bg-linear-to-r from-amber-400 to-steel-400 bg-clip-text text-transparent">
              {c.hero.titleLine}
            </p>

            <p className="max-w-xl text-slate-400 leading-relaxed text-lg">
              {c.about.paragraphs[0]}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={mailto}
                className="inline-flex items-center justify-center rounded-2xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-amber-400 hover:scale-[1.03] active:scale-95 shadow-lg shadow-amber-500/40"
              >
                ✉ {c.hero.ctas.primary}
              </a>
              <Link
                href={`/${lang}/resume`}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/50 px-6 py-3.5 text-sm font-bold text-slate-100 hover:bg-slate-800 hover:border-amber-500/50 hover:scale-[1.03] active:scale-95 backdrop-blur-sm"
              >
                ↓ {c.hero.ctas.secondary}
              </Link>
            </div>

            <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              📍 {c.contact.location}
            </p>
          </div>

          {/* Photo droite */}
          <div className="flex flex-col items-center gap-4 relative group">
            {/* ✏️ MODIFIER ICI : L'image de profil. Assurez-vous d'avoir 'profile.jpg' dans le dossier /public */}
            <div className="tech-corners w-full relative z-10 rounded-3xl border border-amber-500/25 bg-slate-900/40 p-3 shadow-2xl shadow-amber-500/10 backdrop-blur-xl group-hover:shadow-amber-500/30 group-hover:-translate-y-2 transition-all duration-500">
              <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-950">
                <Image
                  src={photoUrl}
                  alt={c.meta.name}
                  width={900}
                  height={900}
                  className="h-87.5 md:h-112.5 w-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  priority
                />
              </div>
            </div>
            {/* NOM SOUS LA PHOTO */}
            <div className="text-center group-hover:scale-105 transition-transform duration-500">
              <p className="text-2xl md:text-3xl font-black tracking-tight text-white drop-shadow-md">
                {c.meta.name}
              </p>
              <p className="text-sm font-bold text-amber-400 mt-1 uppercase tracking-widest">
                {lang === "fr" ? "Élève-ingénieur 5e année · Mécatronique" : "5th-year Engineering Student · Mechatronics"}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── SECTION A PROPOS ── */}
      <ScrollReveal delay={0.2}>
        <section
          id="about"
          className="glass rounded-3xl p-8 shadow-xl hover:border-amber-500/30 transition-all duration-500 space-y-4 group"
        >
          <SectionHeader index="01" title={c.about.title} />
          {c.about.paragraphs.map((p) => (
            <p key={p} className="text-slate-300 leading-relaxed text-lg max-w-4xl">{p}</p>
          ))}
        </section>
      </ScrollReveal>

      {/* ── SECTION EXPERIENCE & FORMATION ── */}
      <section id="experience" className="space-y-6">
        <ScrollReveal>
          <SectionHeader index="02" title={lang === "fr" ? "Parcours" : "Background"} />
        </ScrollReveal>
        <div className="grid gap-8 md:grid-cols-2">
        <ScrollReveal delay={0.1}>
          <div className="glass h-full rounded-3xl p-8 shadow-xl hover:border-amber-500/30 transition-all duration-500 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white">{c.experience.title}</h3>
              <Link href={`/${lang}/experience`} className="text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors">
                {lang === "fr" ? "Voir tout →" : "See all →"}
              </Link>
            </div>
            <div className="space-y-4">
              {c.experience.items.slice(0, 2).map((e) => (
                <div key={e.title} className="rounded-2xl border border-white/5 bg-slate-950/50 p-5 hover:bg-slate-900 transition-all duration-300 hover:border-amber-500/20 group">
                  <p className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors">{e.title}</p>
                  <p className="text-sm font-medium text-slate-400 mt-1">{e.company} • {e.period}</p>
                  <p className="text-sm text-slate-300 mt-3 line-clamp-2">{e.bullets[0]}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div id="education" className="glass h-full rounded-3xl p-8 shadow-xl hover:border-amber-500/30 transition-all duration-500 space-y-6">
            <h3 className="text-xl font-black text-white">{c.education.title}</h3>
            <div className="space-y-4">
              {c.education.items.map((ed) => (
                <div key={ed.title} className="rounded-2xl border border-white/5 bg-slate-950/50 p-5 hover:bg-slate-900 transition-all duration-300 hover:border-amber-500/20 group">
                  <p className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors">{ed.title}</p>
                  <p className="text-sm font-medium text-slate-400 mt-1">{ed.place} • {ed.period}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
        </div>
      </section>

      {/* ── SECTION PROJETS ── */}
      <ScrollReveal>
        <section id="projects" className="glass rounded-3xl p-8 shadow-xl hover:border-amber-500/30 transition-all duration-500 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <SectionHeader index="03" title={c.projects.title} />
              <p className="text-slate-400 max-w-2xl">{c.projects.intro}</p>
            </div>
            <Link href={`/${lang}/projects`} className="text-sm font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group">
              {lang === "fr" ? "Explorer tous les projets" : "Explore all projects"}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {c.projects.items.slice(0, 4).map((p) => (
              <Link
                key={p.slug}
                href={`/${lang}/projects`}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-slate-950/50 p-6 hover:bg-slate-900 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="relative z-10">
                  <p className="font-black text-xl text-white group-hover:text-amber-400 transition-colors">{p.title}</p>
                  <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">{p.period}</p>
                  <p className="text-sm text-slate-300 mt-3 leading-relaxed">{p.tagline}</p>
                </div>
                {/* Petit badge technique fictif ou icône peut être ajouté ici */}
                <div className="absolute top-4 right-4 text-amber-500/20 group-hover:text-amber-500/60 transition-colors">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── SECTION COMPÉTENCES ── */}
      <ScrollReveal>
        <section id="skills" className="glass rounded-3xl p-8 shadow-xl hover:border-amber-500/30 transition-all duration-500 space-y-6">
          <SectionHeader index="04" title={c.skills.title} />
          <SkillsGrid groups={c.skills.groups} />
        </section>
      </ScrollReveal>

      {/* ── SECTION CONTACT ── */}
      <ScrollReveal>
        <section id="contact" className="relative overflow-hidden rounded-3xl bg-linear-to-br from-amber-500/20 to-steel-500/20 p-8 md:p-12 shadow-2xl border border-amber-500/20 space-y-6">
          {/* Décoration d'arrière-plan */}
          <div className="absolute top-0 right-0 -m-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[80px]"></div>

          <div className="relative z-10 space-y-4 max-w-2xl">
            <SectionHeader index="05" title={c.contactSection.title} />
            <p className="text-slate-200 text-lg leading-relaxed">{c.contactSection.intro}</p>
            <div className="pt-4">
              <ContactActions c={c} />
            </div>
          </div>
        </section>
      </ScrollReveal>

      <Footer lang={lang} />
    </div>
  );
}
