"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { uploadFile } from "../actions";

const SUPA = process.env.NEXT_PUBLIC_SUPABASE_URL;
const toUrl = (path: string) =>
  path.startsWith("http") ? path : `${SUPA}/storage/v1/object/public/media/${path}`;

/**
 * Gestionnaire d'images réutilisable (projets, expériences...).
 * - Upload direct vers Supabase, aperçu immédiat, suppression.
 * - Stocke la liste des chemins dans un <input hidden name={name}> (un par ligne)
 *   pour que la Server Action les reçoive dans le FormData.
 */
export function ImageManager({
  name = "images",
  folder,
  initial = [],
}: {
  name?: string;
  folder: string;
  initial?: string[];
}) {
  const [images, setImages] = useState<string[]>(initial);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList) {
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", folder);
        const path = await uploadFile(fd);
        setImages((prev) => [...prev, path]);
      }
    } catch (e) {
      alert("Échec de l'upload : " + (e as Error).message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const move = (i: number, dir: -1 | 1) => {
    setImages((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  return (
    <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Images</p>
        <span className="text-[11px] text-slate-500">{images.length} image(s)</span>
      </div>
      <input type="hidden" name={name} value={images.join("\n")} />

      <div className="flex flex-wrap gap-3">
        {images.map((img, i) => (
          <div key={img + i} className="group relative h-28 w-36 overflow-hidden rounded-xl border border-white/10">
            <Image src={toUrl(img)} alt="" fill className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-slate-950/80 px-1.5 py-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button type="button" onClick={() => move(i, -1)} className="px-1 text-xs text-slate-300 hover:text-white" title="Reculer">←</button>
              <button
                type="button"
                onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
                className="px-1 text-xs font-bold text-red-300 hover:text-red-200"
                title="Supprimer"
              >
                Supprimer
              </button>
              <button type="button" onClick={() => move(i, 1)} className="px-1 text-xs text-slate-300 hover:text-white" title="Avancer">→</button>
            </div>
            {i === 0 && (
              <span className="absolute left-1 top-1 rounded-md bg-emerald-500 px-1.5 py-0.5 text-[10px] font-black text-slate-950">
                Couverture
              </span>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex h-28 w-36 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-white/20 text-sm font-bold text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400 disabled:opacity-50"
        >
          {uploading ? "Envoi..." : "+ Ajouter"}
          <span className="text-[10px] font-normal text-slate-500">plusieurs possibles</span>
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => e.target.files?.length && handleFiles(e.target.files)}
      />
      <p className="text-[11px] text-slate-500">La 1ʳᵉ image sert de couverture. Glisse l'ordre avec ← →.</p>
    </div>
  );
}
