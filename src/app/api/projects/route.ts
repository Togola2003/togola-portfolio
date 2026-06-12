import { NextResponse } from "next/server";
import { createPublicClient, mediaUrl } from "@/lib/supabase/public";

export const dynamic = "force-dynamic"; // toujours frais

/**
 * Renvoie les projets dans la même forme que l'ancien projects.json :
 *   { fr: [...], en: [...] }
 * Les chemins d'images sont résolus en URLs publiques Supabase.
 */
export async function GET() {
  const db = createPublicClient();
  const { data, error } = await db.from("projects").select("*").order("sort");

  if (error) {
    return NextResponse.json({ fr: [], en: [] }, { status: 500 });
  }

  const build = (l: "fr" | "en") =>
    (data ?? []).map((p) => {
      const t = (l === "en" ? p.en : p.fr) ?? {};
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
    });

  return NextResponse.json({ fr: build("fr"), en: build("en") });
}
