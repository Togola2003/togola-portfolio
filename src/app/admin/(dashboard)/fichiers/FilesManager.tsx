"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { uploadToMedia } from "@/lib/supabase/browser";
import { setAssetUrl } from "../../actions";
import { Card } from "../ui";

export function FilesManager({ cvUrl, photoUrl }: { cvUrl: string; photoUrl: string }) {
  const router = useRouter();
  const [cvBusy, setCvBusy] = useState(false);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function handleCv(file: File) {
    setCvBusy(true);
    setMsg(null);
    try {
      const path = await uploadToMedia(file, "cv", "cv/cv.pdf");
      await setAssetUrl("cv", path);
      setMsg("✅ CV mis à jour !");
      router.refresh();
    } catch (e) {
      setMsg("❌ Échec : " + (e as Error).message);
    } finally {
      setCvBusy(false);
    }
  }

  async function handlePhoto(file: File) {
    setPhotoBusy(true);
    setMsg(null);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const path = await uploadToMedia(file, "", `profile.${ext}`);
      await setAssetUrl("photo", path);
      setMsg("✅ Photo mise à jour !");
      router.refresh();
    } catch (e) {
      setMsg("❌ Échec : " + (e as Error).message);
    } finally {
      setPhotoBusy(false);
    }
  }

  const fileInput =
    "text-sm text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:font-bold file:text-slate-950 hover:file:bg-emerald-400 disabled:opacity-50";

  return (
    <div className="space-y-8">
      {msg && (
        <p className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm font-bold text-white">
          {msg}
        </p>
      )}

      {/* CV */}
      <Card className="space-y-4">
        <h2 className="font-black text-white">CV (PDF)</h2>
        <a href={cvUrl} target="_blank" rel="noreferrer" className="inline-block text-sm font-bold text-emerald-400 hover:text-emerald-300">
          📄 Voir le CV actuel ↗
        </a>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="file"
            accept="application/pdf"
            disabled={cvBusy}
            className={fileInput}
            onChange={(e) => e.target.files?.[0] && handleCv(e.target.files[0])}
          />
          {cvBusy && <span className="text-sm font-bold text-emerald-400">Envoi en cours…</span>}
        </div>
      </Card>

      {/* PHOTO */}
      <Card className="space-y-4">
        <h2 className="font-black text-white">Photo de profil</h2>
        <div className="relative h-40 w-40 overflow-hidden rounded-2xl border border-white/10">
          <Image src={photoUrl} alt="Photo actuelle" fill className="object-cover" />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="file"
            accept="image/*"
            disabled={photoBusy}
            className={fileInput}
            onChange={(e) => e.target.files?.[0] && handlePhoto(e.target.files[0])}
          />
          {photoBusy && <span className="text-sm font-bold text-emerald-400">Envoi en cours…</span>}
        </div>
      </Card>
    </div>
  );
}
