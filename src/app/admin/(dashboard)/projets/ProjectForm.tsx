"use client";

import { saveProject } from "../../actions";
import { ImageManager } from "../ImageManager";

const input =
  "w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500/50 placeholder:text-slate-600";
const lbl = "text-xs font-bold uppercase tracking-wide text-slate-400";

interface Project {
  id?: string;
  sort?: number;
  slug?: string;
  period?: string;
  stack?: string[];
  tags?: string[];
  images?: string[];
  fr?: { title?: string; tagline?: string; bullets?: string[] };
  en?: { title?: string; tagline?: string; bullets?: string[] };
}

export function ProjectForm({ project }: { project: Project | null }) {
  const p = project ?? {};

  return (
    <form action={saveProject} className="space-y-6">
      {p.id && <input type="hidden" name="id" value={p.id} />}

      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-1.5">
          <span className={lbl}>Slug (identifiant unique)</span>
          <input name="slug" defaultValue={p.slug} required placeholder="mon-projet" className={input} />
        </label>
        <label className="space-y-1.5">
          <span className={lbl}>Période</span>
          <input name="period" defaultValue={p.period} placeholder="2025" className={input} />
        </label>
        <label className="space-y-1.5">
          <span className={lbl}>Ordre d'affichage</span>
          <input name="sort" type="number" defaultValue={p.sort ?? 0} className={input} />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1.5">
          <span className={lbl}>Technologies (séparées par virgules)</span>
          <input name="stack" defaultValue={(p.stack ?? []).join(", ")} placeholder="Arduino, C++, FreeCAD" className={input} />
        </label>
        <label className="space-y-1.5">
          <span className={lbl}>Tags (séparés par virgules)</span>
          <input name="tags" defaultValue={(p.tags ?? []).join(", ")} placeholder="Robotique, Embarqué" className={input} />
        </label>
      </div>

      <ImageManager name="images" folder="projects" initial={p.images ?? []} />

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-black uppercase tracking-widest text-emerald-400">Français</p>
          <label className="block space-y-1.5">
            <span className={lbl}>Titre</span>
            <input name="fr_title" defaultValue={p.fr?.title} className={input} />
          </label>
          <label className="block space-y-1.5">
            <span className={lbl}>Description courte</span>
            <input name="fr_tagline" defaultValue={p.fr?.tagline} className={input} />
          </label>
          <label className="block space-y-1.5">
            <span className={lbl}>Points clés (un par ligne)</span>
            <textarea name="fr_bullets" rows={5} defaultValue={(p.fr?.bullets ?? []).join("\n")} className={`${input} resize-y`} />
          </label>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-black uppercase tracking-widest text-cyan-400">English</p>
          <label className="block space-y-1.5">
            <span className={lbl}>Title</span>
            <input name="en_title" defaultValue={p.en?.title} className={input} />
          </label>
          <label className="block space-y-1.5">
            <span className={lbl}>Short description</span>
            <input name="en_tagline" defaultValue={p.en?.tagline} className={input} />
          </label>
          <label className="block space-y-1.5">
            <span className={lbl}>Key points (one per line)</span>
            <textarea name="en_bullets" rows={5} defaultValue={(p.en?.bullets ?? []).join("\n")} className={`${input} resize-y`} />
          </label>
        </div>
      </div>

      <button type="submit" className="rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950 hover:bg-emerald-400">
        Enregistrer le projet
      </button>
    </form>
  );
}
