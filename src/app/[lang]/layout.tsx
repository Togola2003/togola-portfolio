import type { ReactNode } from "react";
import type { Lang } from "@/content/types";
import { Navbar } from "@/components/Navbar";
import { MouseGlow } from "@/components/MouseGlow";
import { notFound } from "next/navigation";

/**
 * Pré-génère /fr et /en.
 */
export function generateStaticParams(): { lang: Lang }[] {
  return [{ lang: "fr" }, { lang: "en" }];
}

/**
 * Layout par langue : halo souris + navbar + contenu.
 * Ici, params N'EST PAS un Promise, et lang est typé string puis vérifié.
 */
export default function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  const lang = params.lang as Lang;

  if (lang !== "fr" && lang !== "en") {
    notFound();
  }

  return (
    <>
      <MouseGlow />
      <Navbar lang={lang} />
      <main className="relative z-10 mx-auto max-w-6xl px-4 pt-20 pb-16">
        {children}
      </main>
    </>
  );
}
