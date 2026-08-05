import { cookies } from "next/headers";
import crypto from "node:crypto";
import "server-only";

const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 jours

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET manquant ou trop court (32 caractères minimum)."
    );
  }
  return s;
}

function sign(value: string): string {
  return crypto.createHmac("sha256", secret()).update(value).digest("hex");
}

/** Construit un token signé valable MAX_AGE secondes. */
function makeToken(): string {
  const exp = Date.now() + MAX_AGE * 1000;
  const payload = String(exp);
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  // Comparaison à temps constant
  const expected = sign(payload);
  if (sig.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  return Number(payload) > Date.now();
}

/** Vérifie le mot de passe admin (hachage + comparaison à temps constant). */
export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  // Hacher les deux valeurs avant de comparer : elles ont alors toujours la
  // même longueur (32 octets), donc aucune fuite de la longueur du mot de passe.
  const hash = (s: string) => crypto.createHash("sha256").update(s).digest();
  return crypto.timingSafeEqual(hash(input), hash(expected));
}

/** Pose le cookie de session après un login réussi. */
export async function createSession() {
  const store = await cookies();
  store.set(COOKIE, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

/** Supprime le cookie (déconnexion). */
export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

/** Vrai si la requête courante est authentifiée. */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(COOKIE)?.value);
}
