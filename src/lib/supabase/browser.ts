import { createClient } from "@supabase/supabase-js";
import { createSignedUpload } from "@/app/admin/actions";

/** Client Supabase côté navigateur (clé anon publique). */
const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
);

/**
 * Upload un fichier DIRECTEMENT du navigateur vers Supabase Storage,
 * via une URL signée obtenue côté serveur. Aucune limite de taille serveur.
 * @returns le chemin stocké dans le bucket "media".
 */
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Mo — garde-fou de confort

export async function uploadToMedia(
  file: File,
  folder: string,
  fixedPath?: string
): Promise<string> {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Fichier trop volumineux (10 Mo maximum).");
  }

  const { path, token } = await createSignedUpload(folder, file.name, fixedPath);

  const { error } = await supabaseBrowser.storage
    .from("media")
    .uploadToSignedUrl(path, token, file, {
      contentType: file.type || undefined,
      upsert: true,
    });

  if (error) throw error;
  return path;
}
