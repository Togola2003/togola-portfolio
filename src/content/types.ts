export type Lang = "fr" | "en";

export interface MetaContent {
  name: string;
  title: string;
  description: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  tags: string[];
  images?: string[];
}

export interface EducationItem {
  title: string;
  place: string;
  period: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  period: string;
  tagline: string;
  bullets: string[];
  stack: string[];
  tags: string[];
  images?: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface SiteContent {
  meta: MetaContent;

  hero: {
    headline: string;
    titleLine: string;
    statusLine: string;
    ctas: { primary: string; secondary: string };
  };

  about: {
    title: string;
    paragraphs: string[];
  };

  experience: {
    title: string;
    items: ExperienceItem[];
  };

  education: {
    title: string;
    items: EducationItem[];
  };

  projects: {
    title: string;
    intro: string;
    filtersLabel?: string;
    items: ProjectItem[];
  };

  skills: {
    title: string;
    groups: SkillGroup[];
    interestsTitle: string;
    interests: string[];
  };

  contact: {
    email: string;
    phone: string;
    linkedin: string;
    location: string;
  };

  contactSection: {
    title: string;
    intro: string;
  };

  ui?: {
    close?: string;
    all?: string;
    copyEmail?: string;
    copied?: string;
    filter?: string;
    seeAll?: string;
    loading?: string;
  };

  nav?: {
    [key: string]: string;
  };

  englishLevel: string;

  footer: {
    rights: string;
    madeWith: string;
  };
}
