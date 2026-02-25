import Image from "next/image";
import Link from "next/link";
import type { Lang } from "@/content/types";
import { getContent } from "@/content/getContent";
import { ContactActions } from "@/components/ContactActions";
import { Footer } from "@/components/Footer";

/**
 * Page d'accueil : hero + à propos + expérience + formation + projets + compétences + contact.
 */
export default async function HomePage(props: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await props.params;
  const c = getContent(lang);

  const subject = encodeURIComponent("Contact — Portfolio");
  const body = encodeURIComponent("Bonjour Ladji,\n\nJe te contacte pour...\n\nCordialement,");
  const mailto = `mailto:${c.contact.email}?subject=${subject}&body=${body}`;

  return (
    <div className="space-y-14">
      {/* HERO */}
      <section
        id="hero"
        className="section-appear grid items-center gap-10 md:grid-cols-[1.2fr_.8fr]"
      >
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
            {c.hero.statusLine}
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-50 md:text-5xl">
            {c.meta.name}
          </h1>

          <p className="text-lg font-medium text-emerald-400">
            {c.hero.titleLine}
          </p>

          <p className="max-w-xl text-slate-300 leading-relaxed">
            {c.about.paragraphs[0]}
          </p>

          <p className="text-sm text-slate-400">
            English: {c.englishLevel}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={mailto}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-medium text-black hover:bg-emerald-400 transition"
            >
              {lang === "fr" ? "Envoyez-moi un message" : "Send me a message"}
            </a>

            <Link
              href={`/${lang}/resume`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-100 hover:bg-slate-900 transition"
            >
              {lang === "fr" ? "Télécharger mon CV" : "Download my resume"}
            </Link>
          </div>

          <p className="pt-1 text-sm text-slate-400">
            {c.contact.location}
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-900/30 bg-slate-950/60 p-4 shadow-[0_0_40px_rgba(15,23,42,0.6)]">
          <div className="overflow-hidden rounded-xl border border-slate-800">
            <Image
              src="/profile.jpg"
              alt={c.meta.name}
              width={900}
              height={900}
              className="h-[360px] w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* A PROPOS */}
      <section
        id="about"
        className="section-appear-delayed rounded-2xl border border-cyan-900/30 bg-slate-950/60 p-6 shadow-[0_0_40px_rgba(15,23,42,0.6)] space-y-3"
      >
        <h2 className="text-2xl font-semibold text-slate-50">
          {c.about.title}
        </h2>
        {c.about.paragraphs.map((p) => (
          <p key={p} className="text-slate-300 leading-relaxed">
            {p}
          </p>
        ))}
      </section>

      {/* EXPERIENCE + FORMATION */}
      <section
        id="experience"
        className="section-appear grid gap-6 md:grid-cols-2"
      >
        <div className="rounded-2xl border border-cyan-900/30 bg-slate-950/60 p-6 shadow-[0_0_40px_rgba(15,23,42,0.6)] space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-slate-50">
              {c.experience.title}
            </h2>
            <Link
              href={`/${lang}/experience`}
              className="text-sm text-emerald-400 underline-offset-4 hover:underline"
            >
              {lang === "fr" ? "Voir tout" : "See all"}
            </Link>
          </div>

          {c.experience.items.slice(0, 2).map((e) => (
            <div
              key={e.title + e.period}
              className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 hover:bg-slate-900/80 transition"
            >
              <p className="font-medium text-slate-50">{e.title}</p>
              <p className="text-sm text-slate-400">
                {e.company} • {e.period}
              </p>
              <p className="mt-2 text-sm text-slate-300">{e.bullets[0]}</p>
            </div>
          ))}
        </div>

        <div
          id="education"
          className="rounded-2xl border border-cyan-900/30 bg-slate-950/60 p-6 shadow-[0_0_40px_rgba(15,23,42,0.6)] space-y-3"
        >
          <h2 className="text-2xl font-semibold text-slate-50">
            {c.education.title}
          </h2>
          {c.education.items.map((ed) => (
            <div
              key={ed.title}
              className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 hover:bg-slate-900/80 transition"
            >
              <p className="font-medium text-slate-50">{ed.title}</p>
              <p className="text-sm text-slate-400">
                {ed.place} • {ed.period}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJETS (aperçu) */}
      <section
        id="projects"
        className="section-appear-delayed rounded-2xl border border-cyan-900/30 bg-slate-950/60 p-6 shadow-[0_0_40px_rgba(15,23,42,0.6)] space-y-3"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-slate-50">
            {c.projects.title}
          </h2>
          <Link
            href={`/${lang}/projects`}
            className="text-sm text-emerald-400 underline-offset-4 hover:underline"
          >
            {lang === "fr" ? "Voir tout" : "See all"}
          </Link>
        </div>
        <p className="text-slate-300">{c.projects.intro}</p>

        <div className="grid gap-4 md:grid-cols-2">
          {c.projects.items.slice(0, 4).map((p) => (
            <Link
              key={p.slug}
              href={`/${lang}/projects`}
              className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 hover:bg-slate-900/80 transition"
            >
              <p className="font-medium text-slate-50">{p.title}</p>
              <p className="text-sm text-slate-400">{p.period}</p>
              <p className="mt-2 text-sm text-slate-300">{p.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* COMPETENCES */}
      <section
        id="skills"
        className="section-appear rounded-2xl border border-cyan-900/30 bg-slate-950/60 p-6 shadow-[0_0_40px_rgba(15,23,42,0.6)] space-y-4"
      >
        <h2 className="text-2xl font-semibold text-slate-50">
          {c.skills.title}
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {c.skills.groups.map((g) => (
            <div
              key={g.title}
              className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 hover:bg-slate-900/80 transition"
            >
              <p className="font-medium text-slate-50">{g.title}</p>
              <p className="mt-2 text-sm text-slate-300">
                {g.items.join(" • ")}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <p className="font-medium text-slate-50">
            {c.skills.interestsTitle}
          </p>
          <p className="mt-2 text-sm text-slate-300">
            {c.skills.interests.join(" • ")}
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="section-appear-delayed rounded-2xl border border-cyan-900/30 bg-slate-950/60 p-6 shadow-[0_0_40px_rgba(15,23,42,0.6)] space-y-3"
      >
        <h2 className="text-2xl font-semibold text-slate-50">
          {c.contactSection.title}
        </h2>
        <p className="text-slate-300">{c.contactSection.intro}</p>
        <ContactActions c={c} />
      </section>

      <Footer lang={lang} />
    </div>
  );
}
