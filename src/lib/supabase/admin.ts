import { createClient } from "@supabase/supabase-js";
import "server-only";

/**
 * Client Supabase ADMIN (clé service_role).
 * ⚠️ NE JAMAIS importer dans un composant client : la clé contourne le RLS.
 * Réservé aux routes API / Server Actions protégées par l'authentification admin.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Variables Supabase manquantes : NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (voir .env.local)"
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
