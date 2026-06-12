"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  checkPassword,
  createSession,
  destroySession,
  isAuthenticated,
} from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

/** Garde-fou : toutes les mutations exigent une session valide. */
async function guard() {
  if (!(await isAuthenticated())) {
    throw new Error("Non autorisé");
  }
}

// Rafraîchit les pages publiques + admin après une modification
function refresh() {
  revalidatePath("/", "layout");
}

const lines = (v: FormDataEntryValue | null): string[] =>
  String(v ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

const csv = (v: FormDataEntryValue | null): string[] =>
  String(v ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

// ════════════════════════════════════════════════════════════
//  AUTHENTIFICATION
// ════════════════════════════════════════════════════════════
export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }
  await createSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

// ════════════════════════════════════════════════════════════
//  TEXTES (singletons)
// ════════════════════════════════════════════════════════════
async function writeSingleton(key: string, fr: object, en: object) {
  await guard();
  const db = createAdminClient();
  // Fusionne avec l'existant pour ne pas écraser les champs non édités (upsert si absent)
  const { data } = await db.from("singletons").select("fr, en").eq("key", key).maybeSingle();
  await db
    .from("singletons")
    .upsert(
      {
        key,
        fr: { ...(data?.fr ?? {}), ...fr },
        en: { ...(data?.en ?? {}), ...en },
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" }
    )
    .throwOnError();
  refresh();
}

// Public URL d'un fichier du bucket media (avec cache-busting)
function publicMediaUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return `${base}/storage/v1/object/public/media/${path}?v=${Date.now()}`;
}

/** Remplace le CV PDF (chemin fixe cv/cv.pdf) et mémorise son URL. */
export async function setCvFile(formData: FormData) {
  await guard();
  const db = createAdminClient();
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) throw new Error("Aucun fichier");
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await db.storage
    .from("media")
    .upload("cv/cv.pdf", buffer, { contentType: "application/pdf", upsert: true });
  if (error) throw error;
  const url = publicMediaUrl("cv/cv.pdf");
  await writeSingleton("assets", { cvUrl: url }, { cvUrl: url });
}

/** Remplace la photo de profil (chemin fixe profile.jpg) et mémorise son URL. */
export async function setPhotoFile(formData: FormData) {
  await guard();
  const db = createAdminClient();
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) throw new Error("Aucun fichier");
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `profile.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await db.storage
    .from("media")
    .upload(path, buffer, { contentType: file.type, upsert: true });
  if (error) throw error;
  const url = publicMediaUrl(path);
  await writeSingleton("assets", { photoUrl: url }, { photoUrl: url });
}

export async function saveHero(formData: FormData) {
  await writeSingleton(
    "hero",
    {
      statusLine: String(formData.get("fr_status") ?? "").trim(),
      headline: String(formData.get("fr_headline") ?? "").trim(),
      titleLine: String(formData.get("fr_titleLine") ?? "").trim(),
      ctas: { primary: String(formData.get("fr_cta1") ?? "").trim(), secondary: String(formData.get("fr_cta2") ?? "").trim() },
    },
    {
      statusLine: String(formData.get("en_status") ?? "").trim(),
      headline: String(formData.get("en_headline") ?? "").trim(),
      titleLine: String(formData.get("en_titleLine") ?? "").trim(),
      ctas: { primary: String(formData.get("en_cta1") ?? "").trim(), secondary: String(formData.get("en_cta2") ?? "").trim() },
    }
  );
}

export async function saveAbout(formData: FormData) {
  await writeSingleton(
    "about",
    { title: String(formData.get("fr_title") ?? "").trim(), paragraphs: lines(formData.get("fr_paragraphs")) },
    { title: String(formData.get("en_title") ?? "").trim(), paragraphs: lines(formData.get("en_paragraphs")) }
  );
}

export async function saveContact(formData: FormData) {
  const shared = {
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    linkedin: String(formData.get("linkedin") ?? "").trim(),
  };
  await writeSingleton(
    "contact",
    { ...shared, location: String(formData.get("fr_location") ?? "").trim() },
    { ...shared, location: String(formData.get("en_location") ?? "").trim() }
  );
  // Le bloc "contactSection" (titre + intro) aussi
  await writeSingleton(
    "contactSection",
    { intro: String(formData.get("fr_intro") ?? "").trim() },
    { intro: String(formData.get("en_intro") ?? "").trim() }
  );
}

export async function saveMisc(formData: FormData) {
  await writeSingleton(
    "misc",
    {
      englishLevel: String(formData.get("fr_english") ?? "").trim(),
      projectsIntro: String(formData.get("fr_projectsIntro") ?? "").trim(),
      skillsInterestsTitle: String(formData.get("fr_interestsTitle") ?? "").trim(),
      skillsInterests: csv(formData.get("fr_interests")),
    },
    {
      englishLevel: String(formData.get("en_english") ?? "").trim(),
      projectsIntro: String(formData.get("en_projectsIntro") ?? "").trim(),
      skillsInterestsTitle: String(formData.get("en_interestsTitle") ?? "").trim(),
      skillsInterests: csv(formData.get("en_interests")),
    }
  );
}

// ════════════════════════════════════════════════════════════
//  PROJETS
// ════════════════════════════════════════════════════════════
export async function saveProject(formData: FormData) {
  await guard();
  const db = createAdminClient();
  const id = String(formData.get("id") ?? "");

  const row = {
    sort: Number(formData.get("sort") ?? 0),
    slug: String(formData.get("slug") ?? "").trim(),
    period: String(formData.get("period") ?? "").trim(),
    stack: csv(formData.get("stack")),
    tags: csv(formData.get("tags")),
    images: lines(formData.get("images")),
    fr: {
      title: String(formData.get("fr_title") ?? "").trim(),
      tagline: String(formData.get("fr_tagline") ?? "").trim(),
      bullets: lines(formData.get("fr_bullets")),
    },
    en: {
      title: String(formData.get("en_title") ?? "").trim(),
      tagline: String(formData.get("en_tagline") ?? "").trim(),
      bullets: lines(formData.get("en_bullets")),
    },
    updated_at: new Date().toISOString(),
  };

  if (id) {
    await db.from("projects").update(row).eq("id", id).throwOnError();
  } else {
    await db.from("projects").insert(row).throwOnError();
  }
  refresh();
  redirect("/admin/projets");
}

export async function deleteProject(formData: FormData) {
  await guard();
  const db = createAdminClient();
  await db.from("projects").delete().eq("id", String(formData.get("id"))).throwOnError();
  refresh();
  redirect("/admin/projets");
}

// ════════════════════════════════════════════════════════════
//  EXPÉRIENCES
// ════════════════════════════════════════════════════════════
export async function saveExperience(formData: FormData) {
  await guard();
  const db = createAdminClient();
  const id = String(formData.get("id") ?? "");

  const row = {
    sort: Number(formData.get("sort") ?? 0),
    company: String(formData.get("company") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    period: String(formData.get("period") ?? "").trim(),
    tags: csv(formData.get("tags")),
    images: lines(formData.get("images")),
    fr: {
      title: String(formData.get("fr_title") ?? "").trim(),
      bullets: lines(formData.get("fr_bullets")),
    },
    en: {
      title: String(formData.get("en_title") ?? "").trim(),
      bullets: lines(formData.get("en_bullets")),
    },
    updated_at: new Date().toISOString(),
  };

  if (id) {
    await db.from("experiences").update(row).eq("id", id).throwOnError();
  } else {
    await db.from("experiences").insert(row).throwOnError();
  }
  refresh();
  redirect("/admin/experiences");
}

export async function deleteExperience(formData: FormData) {
  await guard();
  const db = createAdminClient();
  await db.from("experiences").delete().eq("id", String(formData.get("id"))).throwOnError();
  refresh();
  redirect("/admin/experiences");
}

// ════════════════════════════════════════════════════════════
//  FORMATION
// ════════════════════════════════════════════════════════════
export async function saveEducation(formData: FormData) {
  await guard();
  const db = createAdminClient();
  const id = String(formData.get("id") ?? "");

  const row = {
    sort: Number(formData.get("sort") ?? 0),
    place: String(formData.get("place") ?? "").trim(),
    period: String(formData.get("period") ?? "").trim(),
    fr: { title: String(formData.get("fr_title") ?? "").trim() },
    en: { title: String(formData.get("en_title") ?? "").trim() },
    updated_at: new Date().toISOString(),
  };

  if (id) {
    await db.from("education").update(row).eq("id", id).throwOnError();
  } else {
    await db.from("education").insert(row).throwOnError();
  }
  refresh();
  redirect("/admin/formation");
}

export async function deleteEducation(formData: FormData) {
  await guard();
  const db = createAdminClient();
  await db.from("education").delete().eq("id", String(formData.get("id"))).throwOnError();
  refresh();
  redirect("/admin/formation");
}

// ════════════════════════════════════════════════════════════
//  COMPÉTENCES (groupes)
// ════════════════════════════════════════════════════════════
export async function saveSkillGroup(formData: FormData) {
  await guard();
  const db = createAdminClient();
  const id = String(formData.get("id") ?? "");

  const row = {
    sort: Number(formData.get("sort") ?? 0),
    fr: { title: String(formData.get("fr_title") ?? "").trim(), items: lines(formData.get("fr_items")) },
    en: { title: String(formData.get("en_title") ?? "").trim(), items: lines(formData.get("en_items")) },
    updated_at: new Date().toISOString(),
  };

  if (id) {
    await db.from("skill_groups").update(row).eq("id", id).throwOnError();
  } else {
    await db.from("skill_groups").insert(row).throwOnError();
  }
  refresh();
  redirect("/admin/competences");
}

export async function deleteSkillGroup(formData: FormData) {
  await guard();
  const db = createAdminClient();
  await db.from("skill_groups").delete().eq("id", String(formData.get("id"))).throwOnError();
  refresh();
  redirect("/admin/competences");
}

// ════════════════════════════════════════════════════════════
//  UPLOAD DE FICHIERS (bucket "media")
//  Renvoie le chemin stocké (à coller dans le champ images d'un projet,
//  ou utilisé directement pour le CV / la photo).
// ════════════════════════════════════════════════════════════
export async function uploadFile(formData: FormData): Promise<string> {
  await guard();
  const db = createAdminClient();
  const file = formData.get("file") as File | null;
  const folder = String(formData.get("folder") ?? "uploads");
  const fixedName = String(formData.get("fixedName") ?? "").trim();

  if (!file || file.size === 0) throw new Error("Aucun fichier");

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const name = fixedName
    ? fixedName // ex: "cv/CV-TOGOLA.pdf" ou "profile.jpg" → écrase l'ancien
    : `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  await db.storage
    .from("media")
    .upload(name, buffer, { contentType: file.type, upsert: true })
    .then(({ error }) => {
      if (error) throw error;
    });

  refresh();
  return name;
}
