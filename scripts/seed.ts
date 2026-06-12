/**
 * Migration : transfère le contenu actuel (fichiers .ts + .json) vers Supabase.
 *
 * Lancer UNE FOIS, après avoir rempli .env.local et exécuté supabase/schema.sql :
 *   node --env-file=.env.local --import tsx scripts/seed.ts
 *
 * Le script est idempotent (il vide puis réinsère) : on peut le relancer sans souci.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { siteFR } from "../src/content/site.fr";
import { siteEn } from "../src/content/site.en";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
if (!url || !key) {
  console.error("❌ Variables manquantes. Remplis .env.local (URL + SERVICE_ROLE_KEY).");
  process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false } });

const readJson = (p: string) =>
  JSON.parse(readFileSync(resolve(process.cwd(), p), "utf-8"));

async function run() {
  // -- Sources de contenu --
  const projectsJson = readJson("public/content/projects.json"); // { fr:[...], en:[...] }
  const skillsJson = readJson("public/content/skills.json");      // { fr:{groups,...}, en:{...} }

  // ── 1. SINGLETONS (textes uniques) ───────────────────────────
  const singletons: { key: string; fr: unknown; en: unknown }[] = [
    { key: "meta",           fr: siteFR.meta,           en: siteEn.meta },
    { key: "hero",           fr: siteFR.hero,           en: siteEn.hero },
    { key: "about",          fr: siteFR.about,          en: siteEn.about },
    { key: "contact",        fr: siteFR.contact,        en: siteEn.contact },
    { key: "contactSection", fr: siteFR.contactSection, en: siteEn.contactSection },
    { key: "footer",         fr: siteFR.footer,         en: siteEn.footer },
    { key: "ui",             fr: siteFR.ui ?? {},       en: siteEn.ui ?? {} },
    {
      key: "misc",
      fr: { englishLevel: siteFR.englishLevel, projectsIntro: siteFR.projects.intro, skillsInterestsTitle: skillsJson.fr.interestsTitle, skillsInterests: skillsJson.fr.interests },
      en: { englishLevel: siteEn.englishLevel, projectsIntro: siteEn.projects.intro, skillsInterestsTitle: skillsJson.en.interestsTitle, skillsInterests: skillsJson.en.interests },
    },
  ];
  await db.from("singletons").delete().neq("key", "");
  await db.from("singletons").insert(singletons).throwOnError();
  console.log(`✅ singletons : ${singletons.length}`);

  // ── 2. EXPERIENCES ───────────────────────────────────────────
  const exp = siteFR.experience.items.map((e, i) => ({
    sort: i,
    company: e.company,
    location: e.location,
    period: e.period,
    tags: e.tags,
    fr: { title: e.title, bullets: e.bullets },
    en: {
      title: siteEn.experience.items[i]?.title ?? e.title,
      bullets: siteEn.experience.items[i]?.bullets ?? e.bullets,
    },
  }));
  await db.from("experiences").delete().neq("sort", -1);
  await db.from("experiences").insert(exp).throwOnError();
  console.log(`✅ experiences : ${exp.length}`);

  // ── 3. EDUCATION ─────────────────────────────────────────────
  const edu = siteFR.education.items.map((e, i) => ({
    sort: i,
    place: e.place,
    period: e.period,
    fr: { title: e.title },
    en: { title: siteEn.education.items[i]?.title ?? e.title },
  }));
  await db.from("education").delete().neq("sort", -1);
  await db.from("education").insert(edu).throwOnError();
  console.log(`✅ education : ${edu.length}`);

  // ── 4. PROJECTS (depuis projects.json, plus complet) ─────────
  const frP = projectsJson.fr as any[];
  const enP = projectsJson.en as any[];
  const projects = frP.map((p, i) => {
    const en = enP.find((x) => x.slug === p.slug) ?? p;
    return {
      sort: i,
      slug: p.slug,
      period: p.period,
      stack: p.stack ?? [],
      tags: p.tags ?? [],
      images: p.images ?? [],
      fr: { title: p.title, tagline: p.tagline, bullets: p.bullets ?? [] },
      en: { title: en.title, tagline: en.tagline, bullets: en.bullets ?? [] },
    };
  });
  await db.from("projects").delete().neq("slug", "");
  await db.from("projects").insert(projects).throwOnError();
  console.log(`✅ projects : ${projects.length}`);

  // ── 5. SKILL GROUPS (depuis skills.json) ─────────────────────
  const frG = skillsJson.fr.groups as any[];
  const enG = skillsJson.en.groups as any[];
  const groups = frG.map((g, i) => ({
    sort: i,
    fr: { title: g.title, items: g.items },
    en: { title: enG[i]?.title ?? g.title, items: enG[i]?.items ?? g.items },
  }));
  await db.from("skill_groups").delete().neq("sort", -1);
  await db.from("skill_groups").insert(groups).throwOnError();
  console.log(`✅ skill_groups : ${groups.length}`);

  console.log("\n🎉 Migration terminée. Va vérifier dans Supabase → Table Editor.");
}

run().catch((e) => {
  console.error("❌ Erreur :", e.message ?? e);
  process.exit(1);
});
