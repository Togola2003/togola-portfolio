/**
 * Types : rendent le contenu FR/EN robuste (tu modifies sans casser).
 */
export type Lang = "fr" | "en";

export type LinkItem = { label: string; href: string };

export type ExperienceItem = {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  tags: string[];
};

export type ProjectImage = { src: string; alt: string };

export type ProjectItem = {
  slug: string;
  title: string;
  period: string;
  tagline: string;
  bullets: string[];
  stack: string[];
  tags: string[];
  links?: LinkItem[];
  images?: ProjectImage[]; // Prévu pour ajouter des images plus tard.
};

export type SiteContent = {
  meta: { name: string; role: string; city: string; availability: string };

  contact: { email: string; phone: string; linkedin: string; location: string };

  englishLevel: string; // ex: "B2 (en cours de validation — test le 5 mars 2026)"

  ui: {
    close: string;
    all: string;
    copyEmail: string;
    copied: string;
  };

  nav: {
    home: string;
    projects: string;
    experience: string;
    resume: string;
  };

  hero: {
    headline: string;
    titleLine: string; // ex: "Ingénieur Mécatronique"
    statusLine: string; // stage etc.
    ctas: { primary: string; secondary: string };
  };

  about: { title: string; paragraphs: string[] };

  experience: { title: string; items: ExperienceItem[] };

  education: { title: string; items: { title: string; place: string; period: string }[] };

  projects: { title: string; intro: string; filtersLabel: string; items: ProjectItem[] };

  skills: {
    title: string;
    groups: { title: string; items: string[] }[];
    interestsTitle: string;
    interests: string[];
  };

  contactSection: { title: string; intro: string };

  footer: { rights: string; madeWith: string };
};
