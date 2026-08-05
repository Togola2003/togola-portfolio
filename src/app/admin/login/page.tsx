import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { loginAction } from "../actions";

export const metadata = { title: "Admin — Connexion" };

export default async function LoginPage(props: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAuthenticated()) redirect("/admin");
  const { error } = await props.searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        action={loginAction}
        className="w-full max-w-sm space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-2xl"
      >
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-slate-950 font-black text-xl">
            NT
          </div>
          <h1 className="text-2xl font-black text-white">Espace admin</h1>
          <p className="text-sm text-slate-400">Connecte-toi pour gérer ton portfolio.</p>
        </div>

        {error === "blocked" && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
            Trop de tentatives. Réessaie dans une heure.
          </p>
        )}
        {error === "1" && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
            Mot de passe incorrect.
          </p>
        )}

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-300">Mot de passe</label>
          <input
            type="password"
            name="password"
            autoFocus
            required
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500/50"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
