import Image from "next/image";
import { getAssets } from "@/content/getContent";
import { setCvFile, setPhotoFile } from "../../actions";
import { Card, PageTitle } from "../ui";

export const dynamic = "force-dynamic";

export default async function FichiersPage() {
  const { cvUrl, photoUrl } = await getAssets();

  return (
    <div className="space-y-8">
      <PageTitle title="CV & photo" subtitle="Remplace ton CV PDF et ta photo de profil. La mise à jour est immédiate sur le site." />

      {/* CV */}
      <Card className="space-y-4">
        <h2 className="font-black text-white">CV (PDF)</h2>
        <a href={cvUrl} target="_blank" rel="noreferrer" className="inline-block text-sm font-bold text-emerald-400 hover:text-emerald-300">
          📄 Voir le CV actuel ↗
        </a>
        <form action={setCvFile} className="flex flex-wrap items-center gap-3">
          <input
            type="file"
            name="file"
            accept="application/pdf"
            required
            className="text-sm text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:font-bold file:text-slate-950 hover:file:bg-emerald-400"
          />
          <button type="submit" className="rounded-xl bg-emerald-500 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-emerald-400">
            Remplacer le CV
          </button>
        </form>
      </Card>

      {/* PHOTO */}
      <Card className="space-y-4">
        <h2 className="font-black text-white">Photo de profil</h2>
        <div className="relative h-40 w-40 overflow-hidden rounded-2xl border border-white/10">
          <Image src={photoUrl} alt="Photo actuelle" fill className="object-cover" />
        </div>
        <form action={setPhotoFile} className="flex flex-wrap items-center gap-3">
          <input
            type="file"
            name="file"
            accept="image/*"
            required
            className="text-sm text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:font-bold file:text-slate-950 hover:file:bg-emerald-400"
          />
          <button type="submit" className="rounded-xl bg-emerald-500 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-emerald-400">
            Remplacer la photo
          </button>
        </form>
      </Card>
    </div>
  );
}
