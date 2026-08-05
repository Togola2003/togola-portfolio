"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  checkPassword,
  createSession,
  destroySession,
  isAuthenticated,
} from "@/lib/auth";
import { allowLoginAttempt, resetLoginAttempts } from "@/lib/rate-limit";
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
  if (!(await allowLoginAttempt())) {
    redirect("/admin/login?error=blocked");
  }
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }
  await resetLoginAttempts();
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

/** Mémorise l'URL du CV ou de la photo après upload direct (navigateur → Supabase). */
export async function setAssetUrl(kind: "cv" | "photo", path: string) {
  await guard();
  const url = publicMediaUrl(path);
  if (kind === "cv") {
    await writeSingleton("assets", { cvUrl: url }, { cvUrl: url });
  } else {
    await writeSingleton("assets", { photoUrl: url }, { photoUrl: url });
  }
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
//  On NE fait PAS transiter le fichier par le serveur (limite 1 Mo des
//  Server Actions / 4,5 Mo Vercel). À la place, on renvoie une URL signée :
//  le navigateur envoie le fichier DIRECTEMENT à Supabase, sans limite.
// ════════════════════════════════════════════════════════════
// Dossiers et types de fichiers réellement utilisés par l'admin (voir
// ImageManager et FilesManager) : toute autre valeur est refusée.
const SAFE_FOLDERS = ["projects", "experiences", "cv", ""];
const ALLOWED_EXT = /\.(png|jpe?g|webp|avif|gif|pdf)$/i;

export async function createSignedUpload(
  folder: string,
  filename: string,
  fixedPath?: string
): Promise<{ path: string; token: string }> {
  await guard();

  if (!SAFE_FOLDERS.includes(folder)) {
    throw new Error("Dossier non autorisé.");
  }
  if (!ALLOWED_EXT.test(filename)) {
    throw new Error("Type de fichier non autorisé.");
  }
  if (filename.length > 120) {
    throw new Error("Nom de fichier trop long.");
  }

  const db = createAdminClient();
  const safe = filename.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  // fixedPath ne vient que de notre propre code (jamais saisi librement),
  // nettoyé quand même par défense en profondeur contre la traversée de chemin.
  const cleanFixed = fixedPath?.replace(/\.\./g, "").replace(/^\/+/, "");
  const path = cleanFixed || (folder ? `${folder}/${Date.now()}-${safe}` : `${Date.now()}-${safe}`);

  const { data, error } = await db.storage
    .from("media")
    .createSignedUploadUrl(path, { upsert: true });
  if (error) throw error;

  return { path: data.path, token: data.token };
}
