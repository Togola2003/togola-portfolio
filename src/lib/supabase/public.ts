import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase PUBLIC (clé anon).
 * Utilisé pour les lectures du site public. Soumis au Row Level Security
 * (lecture autorisée, écriture interdite). Peut s'utiliser partout.
 */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    throw new Error(
      "Variables Supabase manquantes : NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY (voir .env.local)"
    );
  }

  return createClient(url, anon, {
    auth: { persistSession: false },
    // Lecture toujours fraîche → tes modifs admin apparaissent en quelques secondes
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}

/** URL publique d'un fichier stocké dans le bucket "media". */
export function mediaUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  if (!path) return "";
  if (path.startsWith("http")) return path; // déjà une URL complète
  return `${base}/storage/v1/object/public/media/${path}`;
}
