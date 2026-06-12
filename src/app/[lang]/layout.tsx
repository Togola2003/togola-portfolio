import type { ReactNode } from "react";
import type { Lang } from "@/content/types";
import { Navbar } from "@/components/Navbar";
import { MouseGlow } from "@/components/MouseGlow";
import { notFound } from "next/navigation";
import { getAssets } from "@/content/getContent";

export function generateStaticParams(): { lang: Lang }[] {
  return [{ lang: "fr" }, { lang: "en" }];
}

export default async function LangLayout(props: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await props.params;
  const lang = rawLang as Lang;

  if (lang !== "fr" && lang !== "en") notFound();

  const { cvUrl } = await getAssets();

  return (
    <>
      <MouseGlow />
      <Navbar lang={lang} cvUrl={cvUrl} />
      <main className="relative z-10 mx-auto max-w-6xl px-4 pt-20 pb-16">
        {props.children}
      </main>
    </>
  );
}
