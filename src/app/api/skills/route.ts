import { NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/public";

export const dynamic = "force-dynamic"; // toujours frais

/**
 * Renvoie les compétences dans la même forme que l'ancien skills.json :
 *   { fr: { title, groups, interestsTitle, interests }, en: {...} }
 */
export async function GET() {
  const db = createPublicClient();
  const [{ data: groups, error }, { data: singletons }] = await Promise.all([
    db.from("skill_groups").select("*").order("sort"),
    db.from("singletons").select("key, fr, en").in("key", ["misc"]),
  ]);

  if (error) {
    return NextResponse.json({ fr: { groups: [] }, en: { groups: [] } }, { status: 500 });
  }

  const misc = (singletons ?? []).find((s) => s.key === "misc");

  const build = (l: "fr" | "en") => ({
    title: l === "fr" ? "Compétences" : "Skills",
    groups: (groups ?? []).map((g) => {
      const t = (l === "en" ? g.en : g.fr) ?? {};
      return { title: t.title ?? "", items: t.items ?? [] };
    }),
    interestsTitle: (l === "en" ? misc?.en : misc?.fr)?.skillsInterestsTitle ?? "",
    interests: (l === "en" ? misc?.en : misc?.fr)?.skillsInterests ?? [],
  });

  return NextResponse.json({ fr: build("fr"), en: build("en") });
}
