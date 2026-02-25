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
 * Layout par langue compatible avec Next 16 + Turbopack :
 * - params est un Promise<{ lang: string }>
 * - on await et on cast proprement vers Lang
 */
export default async function LangLayout(props: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { children, params } = props;
  const { lang: rawLang } = await params;
  const lang = rawLang as Lang;

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
