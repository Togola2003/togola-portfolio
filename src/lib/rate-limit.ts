import "server-only";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

const MAX_TRIES = 5; // essais autorisés
const WINDOW_MS = 15 * 60 * 1000; // fenêtre de 15 minutes
const BLOCK_MS = 60 * 60 * 1000; // blocage d'une heure

async function clientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "inconnue"
  );
}

/** Retourne true si la tentative est autorisée, false si l'IP est bloquée. */
export async function allowLoginAttempt(): Promise<boolean> {
  const ip = await clientIp();
  const db = createAdminClient();
  const now = Date.now();

  const { data } = await db
    .from("login_attempts")
    .select("*")
    .eq("ip", ip)
    .maybeSingle();

  if (data?.blocked_until && new Date(data.blocked_until).getTime() > now) {
    return false;
  }

  const windowExpired = !data || now - new Date(data.first_try).getTime() > WINDOW_MS;

  if (windowExpired) {
    await db.from("login_attempts").upsert({
      ip,
      count: 1,
      first_try: new Date(now).toISOString(),
      blocked_until: null,
    });
    return true;
  }

  const count = (data.count ?? 0) + 1;
  const blocked = count > MAX_TRIES;

  await db.from("login_attempts").upsert({
    ip,
    count,
    first_try: data.first_try,
    blocked_until: blocked ? new Date(now + BLOCK_MS).toISOString() : null,
  });

  return !blocked;
}

/** Remet le compteur à zéro après une connexion réussie. */
export async function resetLoginAttempts(): Promise<void> {
  const ip = await clientIp();
  await createAdminClient().from("login_attempts").delete().eq("ip", ip);
}
