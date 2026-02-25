import type { Lang, SiteContent } from "./types";
import { siteFR } from "./site.fr";
import { siteEN } from "./site.en";

/**
 * Retourne le contenu selon la langue.
 */
export function getContent(lang: Lang): SiteContent {
  return lang === "en" ? siteEN : siteFR;
}
