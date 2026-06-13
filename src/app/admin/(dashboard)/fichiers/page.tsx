import { getAssets } from "@/content/getContent";
import { PageTitle } from "../ui";
import { FilesManager } from "./FilesManager";

export const dynamic = "force-dynamic";

export default async function FichiersPage() {
  const { cvUrl, photoUrl } = await getAssets();

  return (
    <div className="space-y-8">
      <PageTitle title="CV & photo" subtitle="Remplace ton CV PDF et ta photo de profil. La mise à jour est immédiate sur le site." />
      <FilesManager cvUrl={cvUrl} photoUrl={photoUrl} />
    </div>
  );
}
