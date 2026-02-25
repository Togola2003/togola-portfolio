import { redirect } from "next/navigation";

/**
 * Redirection simple : le domaine racine envoie vers la version FR.
 */
export default function IndexPage() {
  redirect("/fr");
}
