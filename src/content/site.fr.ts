import type { SiteContent } from "./types";

export const siteFR: SiteContent = {
  meta: {
    name: "N'golo dit Ladji Togola",
    title: "Portfolio — Ladji Togola",
    description: "Étudiant ingénieur Mécatronique à l'EIGSI La Rochelle. Recherche stage 4–6 mois à partir de mai 2026.",
  },

  hero: {
    headline: "Autonomie totale • Apprentissage rapide • Résultats concrets",
    titleLine: "Ingénierie Mécatronique — orienté terrain",
    statusLine: "Recherche stage assistant ingénieur (mai 2026, 4–6 mois) • Mobile à l'international",
    ctas: { primary: "Voir mes projets", secondary: "Télécharger mon CV" },
  },

  about: {
    title: "Mon mindset",
    paragraphs: [
      "Je suis pragmatique et transparent : je veux des faits, des contraintes, puis une solution simple et fiable. Pas de bla-bla, juste des résultats.",
      "J'apprends en profondeur, seul : ce site, fait de zéro sans bagage dev au départ, en est la preuve.",
      "Je vise des missions terrain : comprendre l'atelier ou le chantier avant de concevoir au bureau. Maintenance, optimisation, systèmes complexes.",
    ],
  },

  experience: {
    title: "Expérience",
    items: [
      {
        title: "Stagiaire Maintenance Industrielle",
        company: "SATMA SUARL",
        location: "Mali",
        period: "Juil – Août 2025",
        bullets: [
          "Maintenance préventive et corrective de presses à vis pour optimisation de la production d'huile végétale",
          "Diagnostic et intervention sur pannes mécaniques des presses à vis",
          "Assistance sur interventions de maintenance",
        ],
        tags: ["Maintenance", "Mécanique", "Industrie"],
      },
      {
        title: "Dessinateur BTP",
        company: "CADAU SARL",
        location: "Mali",
        period: "Juil – Août 2023",
        bullets: [
          "Production de plans architecturaux et techniques sur AutoCAD pour projets BTP",
          "Réalisation de plans techniques conformes aux normes BTP",
          "Collaboration avec l'équipe d'ingénierie pour conception de projets de construction",
          "Démarche auprès de différents ministères et mairies pour récupérer ou déposer des documents",
        ],
        tags: ["AutoCAD", "BTP", "Dessin technique"],
      },
      {
        title: "Gestionnaire Boutique / Opérateur Transfert",
        company: "Boutique Familiale",
        location: "Mali",
        period: "2020 – 2021",
        bullets: [
          "Gestion quotidienne : stock, caisse, relation client et opérations de transfert d'argent",
        ],
        tags: ["Gestion", "Commerce"],
      },
    ],
  },

  education: {
    title: "Formation",
    items: [
      {
        title: "Ingénieur Généraliste — option Mécatronique",
        place: "EIGSI La Rochelle",
        period: "2022 – 2027",
      },
      {
        title: "Semestre en Biologie-Chimie-Géologie",
        place: "FSTM Mohammedia, Maroc",
        period: "2021 – 2022",
      },
      {
        title: "Baccalauréat",
        place: "Lycée Kankou Moussa de Daoudabougou, Mali",
        period: "2019 – 2020",
      },
    ],
  },

  projects: {
    title: "Projets",
    intro: "Projets académiques et personnels en mécatronique, systèmes embarqués et conception.",
    filtersLabel: "Filtrer :",
    items: [
      {
        slug: "robot-desinfecteur",
        title: "Robot désinfecteur de sol",
        period: "2025",
        tagline: "Programmation Arduino C++, conception FreeCAD, capteurs ultrasoniques",
        bullets: [
          "Programmation Arduino (C++), intégration capteurs ultrasoniques",
          "Conception mécanique sous FreeCAD",
          "Étude matériaux : limite et maillage",
        ],
        stack: ["Arduino", "C++", "FreeCAD", "Capteurs"],
        tags: ["Robotique", "Embarqué", "CAO"],
        images: [],
      },
      {
        slug: "game-coding-week",
        title: "Game Coding Week — Space Invader",
        period: "2025",
        tagline: "Jeu vidéo complet développé en une semaine avec Cursor et IA",
        bullets: [
          "Développement d'un jeu type Space Invader en une semaine",
          "Utilisation de Cursor (IA) pour accélérer le développement",
        ],
        stack: ["Game Dev", "IA", "Cursor"],
        tags: ["Dev", "IA"],
        images: [],
      },
      {
        slug: "voltify",
        title: "Voltify — Startup Weekend",
        period: "2025",
        tagline: "Système d'électrification modulaire pour vélos classiques",
        bullets: [
          "Conception mécanique et intégration système électrique",
          "Analyse de marché et modèle économique",
          "Prototype et présentation devant jury",
        ],
        stack: ["Mécanique", "Électrique", "Produit"],
        tags: ["Startup", "Mécanique", "Électrique"],
        images: [],
      },
      {
        slug: "suiveur-ligne",
        title: "Robot suiveur de ligne",
        period: "2023",
        tagline: "Robot autonome avec capteurs infrarouges et logique de suivi",
        bullets: [
          "Programmation en Scratch",
          "Calibration capteurs IR",
        ],
        stack: ["Arduino", "Capteurs IR", "Scratch"],
        tags: ["Robotique", "Embarqué"],
        images: [],
      },
      {
        slug: "parking-intelligent",
        title: "Parking intelligent Arduino",
        period: "2023",
        tagline: "Gestion de places avec capteurs et interface LCD",
        bullets: [
          "Système de comptage de places",
          "Interface LCD pour affichage temps réel",
        ],
        stack: ["Arduino", "Capteurs", "LCD"],
        tags: ["IoT", "Système"],
        images: [],
      },
    ],
  },

  skills: {
    title: "Compétences",
    groups: [
      {
        title: "CAO / DAO",
        items: ["FreeCAD (intermédiaire)", "AutoCAD (intermédiaire)"],
      },
      {
        title: "Systèmes Embarqués",
        items: ["Arduino", "C", "Python", "Java"],
      },
      {
        title: "Simulation & Calcul",
        items: ["MATLAB (intermédiaire)", "ANSYS Workbench (initiation)"],
      },
      {
        title: "Informatique & Outils",
        items: ["Pack Office (avancé)", "PostgreSQL (basique)", "Modelio (basique)"],
      },
    ],
    interestsTitle: "Centres d'intérêt",
    interests: ["Kung Fu", "Documentaires scientifiques", "Musculation", "Musique classique", "Jeux stratégiques"],
  },

  contact: {
    email: "ndl.togola.27@eigsi.fr",
    phone: "+33 7 46 51 26 67",
    linkedin: "http://www.linkedin.com/in/n-golo-dit-ladji-togola-313254384",
    location: "La Rochelle, France",
  },

  contactSection: {
    title: "Contact",
    intro: "Disponible pour un stage de 4 à 6 mois à partir de mai 2026. N'hésitez pas à me contacter.",
  },

  ui: {
    close: "Fermer",
    all: "Tous",
    copyEmail: "Copier l'email",
    copied: "Copié !",
    filter: "Filtrer :",
    seeAll: "Voir tout",
    loading: "Chargement...",
  },

  englishLevel: "B1 → objectif B2 fin 2026",

  footer: {
    rights: "Tous droits réservés",
    madeWith: "Fait avec Next.js + Tailwind",
  },
};
