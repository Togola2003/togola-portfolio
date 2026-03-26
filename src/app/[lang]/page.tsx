import Image from "next/image";
import Link from "next/link";
import type { Lang } from "@/content/types";
import { getContent } from "@/content/getContent";
import { ContactActions } from "@/components/ContactActions";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

/**
 * 💡 PAGE : HomePage
 * La page principale avec animations ScrollReveal et un design modernisé.
 */
export default async function HomePage(props: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await props.params;
  const c = getContent(lang);

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
            <p className="text-xs uppercase font-bold tracking-[0.3em] text-emerald-400 animate-pulse bg-emerald-500/10 w-fit px-3 py-1 rounded-full border border-emerald-500/20 shadow-glow-emerald">
              {c.hero.statusLine}
            </p>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
              {c.hero.headline}
            </h1>

            <p className="text-lg md:text-xl font-medium bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {c.hero.titleLine}
            </p>

            <p className="max-w-xl text-slate-400 leading-relaxed text-lg">
              {c.about.paragraphs[0]}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={mailto}
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 hover:scale-[1.03] active:scale-95 shadow-lg shadow-emerald-500/40"
              >
                {lang === "fr" ? "✉ Envoyez-moi un message" : "✉ Send me a message"}
              </a>
              <Link
                href={`/${lang}/resume`}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/50 px-6 py-3.5 text-sm font-bold text-slate-100 hover:bg-slate-800 hover:border-emerald-500/50 hover:scale-[1.03] active:scale-95 backdrop-blur-sm"
              >
                {lang === "fr" ? "↓ Télécharger mon CV" : "↓ Download my resume"}
              </Link>
            </div>

            <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              📍 {c.contact.location}
            </p>
          </div>

          {/* Photo droite */}
          <div className="flex flex-col items-center gap-4 relative group">
            {/* ✏️ MODIFIER ICI : L'image de profil. Assurez-vous d'avoir 'profile.jpg' dans le dossier /public */}
            <div className="w-full relative z-10 rounded-3xl border border-emerald-500/25 bg-slate-900/40 p-3 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl group-hover:shadow-emerald-500/30 group-hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-950">
                <Image
                  src="/profile.jpg"
                  alt={c.meta.name}
                  width={900}
                  height={900}
                  className="h-[350px] md:h-[450px] w-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  priority
                />
              </div>
            </div>
            {/* NOM SOUS LA PHOTO */}
            <div className="text-center group-hover:scale-105 transition-transform duration-500">
              <p className="text-2xl md:text-3xl font-black tracking-tight text-white drop-shadow-md">
                {c.meta.name}
              </p>
              <p className="text-sm font-bold text-emerald-400 mt-1 uppercase tracking-widest">
                {lang === "fr" ? "Ingénieur Généraliste — Mécatronique" : "Generalist Engineer — Mechatronics"}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── SECTION A PROPOS ── */}
      <ScrollReveal delay={0.2}>
        <section
          id="about"
          className="glass rounded-3xl p-8 shadow-xl hover:border-emerald-500/30 transition-all duration-500 space-y-4 group"
        >
          <div className="flex items-center gap-3">
             <div className="w-8 h-1 bg-emerald-500 rounded-full group-hover:w-12 transition-all duration-500"></div>
             <h2 className="text-3xl font-black text-white">{c.about.title}</h2>
          </div>
          {c.about.paragraphs.map((p) => (
            <p key={p} className="text-slate-300 leading-relaxed text-lg max-w-4xl">{p}</p>
          ))}
        </section>
      </ScrollReveal>

      {/* ── SECTION EXPERIENCE & FORMATION ── */}
      <section id="experience" className="grid gap-8 md:grid-cols-2">
        <ScrollReveal delay={0.1}>
          <div className="glass h-full rounded-3xl p-8 shadow-xl hover:border-emerald-500/30 transition-all duration-500 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">{c.experience.title}</h2>
              <Link href={`/${lang}/experience`} className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
                {lang === "fr" ? "Voir tout →" : "See all →"}
              </Link>
            </div>
            <div className="space-y-4">
              {c.experience.items.slice(0, 2).map((e) => (
                <div key={e.title} className="rounded-2xl border border-white/5 bg-slate-950/50 p-5 hover:bg-slate-900 transition-all duration-300 hover:border-emerald-500/20 group">
                  <p className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">{e.title}</p>
                  <p className="text-sm font-medium text-slate-400 mt-1">{e.company} • {e.period}</p>
                  <p className="text-sm text-slate-300 mt-3 line-clamp-2">{e.bullets[0]}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div id="education" className="glass h-full rounded-3xl p-8 shadow-xl hover:border-emerald-500/30 transition-all duration-500 space-y-6">
            <h2 className="text-2xl font-black text-white">{c.education.title}</h2>
            <div className="space-y-4">
              {c.education.items.map((ed) => (
                <div key={ed.title} className="rounded-2xl border border-white/5 bg-slate-950/50 p-5 hover:bg-slate-900 transition-all duration-300 hover:border-emerald-500/20 group">
                  <p className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">{ed.title}</p>
                  <p className="text-sm font-medium text-slate-400 mt-1">{ed.place} • {ed.period}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── SECTION PROJETS ── */}
      <ScrollReveal>
        <section id="projects" className="glass rounded-3xl p-8 shadow-xl hover:border-emerald-500/30 transition-all duration-500 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white">{c.projects.title}</h2>
              <p className="text-slate-400 max-w-2xl">{c.projects.intro}</p>
            </div>
            <Link href={`/${lang}/projects`} className="text-sm font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group">
              {lang === "fr" ? "Explorer tous les projets" : "Explore all projects"}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {c.projects.items.slice(0, 4).map((p) => (
              <Link
                key={p.slug}
                href={`/${lang}/projects`}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-slate-950/50 p-6 hover:bg-slate-900 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="relative z-10">
                  <p className="font-black text-xl text-white group-hover:text-emerald-400 transition-colors">{p.title}</p>
                  <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">{p.period}</p>
                  <p className="text-sm text-slate-300 mt-3 leading-relaxed">{p.tagline}</p>
                </div>
                {/* Petit badge technique fictif ou icône peut être ajouté ici */}
                <div className="absolute top-4 right-4 text-emerald-500/20 group-hover:text-emerald-500/60 transition-colors">
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
        <section id="skills" className="glass rounded-3xl p-8 shadow-xl hover:border-emerald-500/30 transition-all duration-500 space-y-6">
          <h2 className="text-3xl font-black text-white">{c.skills.title}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {c.skills.groups.map((g) => (
              <div key={g.title} className="rounded-2xl border border-white/5 bg-slate-950/50 p-6 hover:bg-slate-900 transition-all duration-300 hover:border-emerald-500/20">
                <p className="font-black text-emerald-400 text-lg uppercase tracking-wide">{g.title}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                   {g.items.map((skill) => (
                     <span key={skill} className="px-3 py-1.5 rounded-xl border border-white/5 bg-slate-800 text-sm font-medium text-slate-200">
                       {skill}
                     </span>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── SECTION CONTACT ── */}
      <ScrollReveal>
        <section id="contact" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-8 md:p-12 shadow-2xl border border-emerald-500/20 space-y-6">
          {/* Décoration d'arrière-plan */}
          <div className="absolute top-0 right-0 -m-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[80px]"></div>

          <div className="relative z-10 space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-white">{c.contactSection.title}</h2>
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
