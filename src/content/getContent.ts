import { cache } from "react";
import type { Lang, SiteContent } from "./types";
import { createPublicClient, mediaUrl } from "@/lib/supabase/public";

/**
 * Récupère TOUT le contenu du site depuis Supabase et le reconstruit
 * dans la forme `SiteContent` attendue par les pages.
 *
 * `cache()` dédoublonne les appels au sein d'une même requête (page + footer
 * ne déclenchent qu'une seule lecture en base).
 */
export const getContent = cache(async (lang: Lang): Promise<SiteContent> => {
  const db = createPublicClient();

  const [singletonsRes, expRes, eduRes, projRes, skillRes] = await Promise.all([
    db.from("singletons").select("key, fr, en"),
    db.from("experiences").select("*").order("sort"),
    db.from("education").select("*").order("sort"),
    db.from("projects").select("*").order("sort"),
    db.from("skill_groups").select("*").order("sort"),
  ]);

  // Map des singletons par clé → contenu de la langue demandée
  const S: Record<string, any> = {};
  for (const row of singletonsRes.data ?? []) {
    S[row.key] = (lang === "en" ? row.en : row.fr) ?? {};
  }
  const pick = <T>(row: any): T => (lang === "en" ? row.en : row.fr) ?? {};

  // Libellés de sections (structurels, identiques pour tous)
  const L = LABELS[lang];

  return {
    meta: S.meta ?? { name: "", title: "", description: "" },

    hero: S.hero ?? { headline: "", titleLine: "", statusLine: "", ctas: { primary: "", secondary: "" } },

    about: S.about ?? { title: "", paragraphs: [] },

    experience: {
      title: L.experience,
      items: (expRes.data ?? []).map((e) => {
        const t = pick<any>(e);
        return {
          title: t.title ?? "",
          company: e.company ?? "",
          location: e.location ?? "",
          period: e.period ?? "",
          bullets: t.bullets ?? [],
          tags: e.tags ?? [],
          images: (e.images ?? []).map((img: string) => mediaUrl(img)),
        };
      }),
    },

    education: {
      title: L.education,
      items: (eduRes.data ?? []).map((e) => ({
        title: pick<any>(e).title ?? "",
        place: e.place ?? "",
        period: e.period ?? "",
      })),
    },

    projects: {
      title: L.projects,
      intro: S.misc?.projectsIntro ?? "",
      filtersLabel: S.ui?.filter,
      items: (projRes.data ?? []).map((p) => {
        const t = pick<any>(p);
        return {
          slug: p.slug,
          title: t.title ?? "",
          period: p.period ?? "",
          tagline: t.tagline ?? "",
          bullets: t.bullets ?? [],
          stack: p.stack ?? [],
          tags: p.tags ?? [],
          images: (p.images ?? []).map((img: string) => mediaUrl(img)),
        };
      }),
    },

    skills: {
      title: L.skills,
      groups: (skillRes.data ?? []).map((g) => {
        const t = pick<any>(g);
        return { title: t.title ?? "", items: t.items ?? [] };
      }),
      interestsTitle: S.misc?.skillsInterestsTitle ?? "",
      interests: S.misc?.skillsInterests ?? [],
    },

    contact: S.contact ?? { email: "", phone: "", linkedin: "", location: "" },

    contactSection: S.contactSection ?? { title: L.contact, intro: "" },

    ui: S.ui ?? {},

    englishLevel: S.misc?.englishLevel ?? "",

    footer: S.footer ?? { rights: "", madeWith: "" },
  };
});

/**
 * URLs du CV et de la photo de profil.
 * Repli sur les fichiers statiques d'origine tant que rien n'a été uploadé.
 */
export const getAssets = cache(async (): Promise<{ cvUrl: string; photoUrl: string }> => {
  const db = createPublicClient();
  const { data } = await db.from("singletons").select("fr").eq("key", "assets").maybeSingle();
  const a = (data?.fr ?? {}) as { cvUrl?: string; photoUrl?: string };
  return {
    cvUrl: a.cvUrl || "/cv/CV-TOGOLA-2026.pdf",
    photoUrl: a.photoUrl || "/profile.jpg",
  };
});

const LABELS: Record<Lang, Record<string, string>> = {
  fr: { experience: "Expérience", education: "Formation", projects: "Projets", skills: "Compétences", contact: "Contact" },
  en: { experience: "Experience", education: "Education", projects: "Projects", skills: "Skills", contact: "Contact" },
};
