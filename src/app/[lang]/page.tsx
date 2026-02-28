import Image from "next/image";
import Link from "next/link";
import type { Lang } from "@/content/types";
import { getContent } from "@/content/getContent";
import { ContactActions } from "@/components/ContactActions";
import { Footer } from "@/components/Footer";

export default async function HomePage(props: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await props.params;
  const c = getContent(lang);
  const subject = encodeURIComponent("Contact — Portfolio");
  const body = encodeURIComponent("Bonjour Ladji,\n\nJe te contacte pour...\n\nCordialement,");
  const mailto = `mailto:${c.contact.email}?subject=${subject}&body=${body}`;

  return (
    <div className="space-y-12">

      {/* ── HERO ── */}
      <section id="hero" className="section-appear grid items-center gap-10 md:grid-cols-[1.2fr_.8fr]">
        {/* Texte gauche */}
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-400 animate-pulse">
            {c.hero.statusLine}
          </p>

          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
            {c.hero.headline}
          </h2>

          <p className="text-base font-medium text-emerald-400">
            {c.hero.titleLine}
          </p>

          <p className="max-w-xl text-slate-300 leading-relaxed">
            {c.about.paragraphs[0]}
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={mailto}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400 transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/30"
            >
              {lang === "fr" ? "✉ Envoyez-moi un message" : "✉ Send me a message"}
            </a>
            <Link
              href={`/${lang}/resume`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105"
            >
              {lang === "fr" ? "↓ Télécharger mon CV" : "↓ Download my resume"}
            </Link>
          </div>

          <p className="text-sm text-slate-500">📍 {c.contact.location}</p>
        </div>

        {/* Photo droite + nom SOUS la photo */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-full rounded-2xl border border-emerald-500/25 bg-slate-900/80 p-3 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/30 hover:-translate-y-1 transition-all duration-500">
            <div className="overflow-hidden rounded-xl border border-slate-800">
              <Image
                src="/profile.jpg"
                alt={c.meta.name}
                width={900}
                height={900}
                className="h-[320px] w-full object-cover hover:scale-110 transition-transform duration-700"
                priority
              />
            </div>
          </div>
          {/* NOM SOUS LA PHOTO */}
          <div className="text-center">
            <p className="text-xl md:text-2xl font-black tracking-tight text-white">
              {c.meta.name}
            </p>
            <p className="text-sm text-emerald-400 mt-0.5">
              {lang === "fr" ? "Ingénieur Généraliste — Mécatronique" : "Generalist Engineer — Mechatronics"}
            </p>
          </div>
        </div>
      </section>

      {/* ── A PROPOS ── */}
      <section
        id="about"
        className="section-appear-2 rounded-2xl border border-emerald-500/20 bg-slate-900/80 p-6 shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 space-y-3"
      >
        <h2 className="text-2xl font-semibold text-white">{c.about.title}</h2>
        {c.about.paragraphs.map((p) => (
          <p key={p} className="text-slate-300 leading-relaxed">{p}</p>
        ))}
      </section>

      {/* ── EXPERIENCE + FORMATION ── */}
      <section id="experience" className="section-appear grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/80 p-6 shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">{c.experience.title}</h2>
            <Link href={`/${lang}/experience`} className="text-xs text-emerald-400 hover:underline">
              {lang === "fr" ? "Voir tout →" : "See all →"}
            </Link>
          </div>
          {c.experience.items.slice(0, 2).map((e) => (
            <div key={e.title} className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 hover:bg-slate-900 transition-all duration-200 hover:border-emerald-500/30">
              <p className="font-semibold text-white">{e.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">{e.company} • {e.period}</p>
              <p className="text-sm text-slate-300 mt-2">{e.bullets[0]}</p>
            </div>
          ))}
        </div>

        <div id="education" className="rounded-2xl border border-emerald-500/20 bg-slate-900/80 p-6 shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 space-y-3">
          <h2 className="text-xl font-semibold text-white">{c.education.title}</h2>
          {c.education.items.map((ed) => (
            <div key={ed.title} className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 hover:bg-slate-900 transition-all duration-200 hover:border-emerald-500/30">
              <p className="font-semibold text-white">{ed.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">{ed.place} • {ed.period}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJETS ── */}
      <section id="projects" className="section-appear-2 rounded-2xl border border-emerald-500/20 bg-slate-900/80 p-6 shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">{c.projects.title}</h2>
          <Link href={`/${lang}/projects`} className="text-xs text-emerald-400 hover:underline">
            {lang === "fr" ? "Voir tout →" : "See all →"}
          </Link>
        </div>
        <p className="text-slate-300">{c.projects.intro}</p>
        <div className="grid gap-4 md:grid-cols-2">
          {c.projects.items.slice(0, 4).map((p) => (
            <Link
              key={p.slug}
              href={`/${lang}/projects`}
              className="block rounded-xl border border-slate-800 bg-slate-950/80 p-4 hover:bg-slate-900 hover:border-emerald-500/30 transition-all duration-200"
            >
              <p className="font-semibold text-white">{p.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">{p.period}</p>
              <p className="text-sm text-slate-300 mt-2">{p.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── COMPÉTENCES ── */}
      <section id="skills" className="section-appear rounded-2xl border border-emerald-500/20 bg-slate-900/80 p-6 shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 space-y-4">
        <h2 className="text-xl font-semibold text-white">{c.skills.title}</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {c.skills.groups.map((g) => (
            <div key={g.title} className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 hover:bg-slate-900 hover:border-emerald-500/30 transition-all duration-200">
              <p className="font-semibold text-white">{g.title}</p>
              <p className="text-sm text-slate-300 mt-2">{g.items.join(" • ")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-appear-2 rounded-2xl border border-emerald-500/20 bg-slate-900/80 p-6 shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 space-y-4">
        <h2 className="text-xl font-semibold text-white">{c.contactSection.title}</h2>
        <p className="text-slate-300">{c.contactSection.intro}</p>
        <ContactActions c={c} />
      </section>

      <Footer lang={lang} />
    </div>
  );
}
