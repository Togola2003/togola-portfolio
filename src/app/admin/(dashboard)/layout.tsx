import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { logoutAction } from "../actions";

export const metadata = { title: "Admin — Portfolio" };

const NAV = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/textes", label: "Textes & statut" },
  { href: "/admin/projets", label: "Projets" },
  { href: "/admin/experiences", label: "Expériences" },
  { href: "/admin/formation", label: "Formation" },
  { href: "/admin/competences", label: "Compétences" },
  { href: "/admin/fichiers", label: "CV & photo" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 text-slate-950 font-black text-sm">
              NT
            </div>
            <span className="font-black tracking-tight">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/fr"
              target="_blank"
              className="text-sm font-bold text-emerald-400 hover:text-emerald-300"
            >
              Voir le site ↗
            </Link>
            <form action={logoutAction}>
              <button className="rounded-lg border border-white/10 px-3 py-1.5 text-sm font-bold text-slate-300 hover:bg-white/5">
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-8">
        <nav className="hidden w-56 shrink-0 space-y-1 md:block">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="block rounded-xl px-4 py-2.5 text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-white"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <main className="min-w-0 flex-1">{children}</main>
      </div>

      {/* Nav mobile */}
      <nav className="sticky bottom-0 z-50 flex gap-1 overflow-x-auto border-t border-white/10 bg-slate-900/90 p-2 backdrop-blur-xl md:hidden">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-300"
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
