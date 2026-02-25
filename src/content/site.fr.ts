import type { SiteContent } from "./types";

/**
 * Contenu FR : tu modifies ici, sans toucher aux pages.
 */
export const siteFR: SiteContent = {
  meta: {
    name: "N’Golo dit Ladji TOGOLA",
    role: "Élève-ingénieur généraliste (dominante Mécatronique)",
    city: "La Rochelle, France",
    availability: "Stage 4–6 mois dès mai 2026",
  },

  contact: {
    email: "ndl.togola.27@eigsi.fr",
    phone: "+33 7 46 51 26 67",
    linkedin: "https://www.linkedin.com/in/n-golo-dit-ladji-togola-313254384",
    location: "La Rochelle, France",
  },

  englishLevel: "B2 (en cours de validation — test le 5 mars 2026)",

  ui: {
    close: "Fermer",
    all: "Tous",
    copyEmail: "Copier l’email",
    copied: "Email copié !",
  },

  nav: {
    home: "Accueil",
    projects: "Projets",
    experience: "Expériences",
    resume: "CV",
  },

  hero: {
    headline: "Portfolio",
    titleLine: "Ingénierie Mécatronique — orienté terrain",
    statusLine: "Recherche stage assistant ingénieur (mai 2026, 4–6 mois) • Mobile à l’international",
    ctas: { primary: "Voir mes projets", secondary: "Télécharger mon CV" },
  },

  about: {
    title: "À propos",
    paragraphs: [
      "Je suis pragmatique : je veux des faits, des contraintes, puis une solution simple et fiable.",
      "J’apprends en profondeur : comprendre le mécanisme avant d’exécuter.",
      "Je vise un profil d’ingénieur capable de relier conception, maintenance et optimisation de systèmes industriels.",
    ],
  },

  experience: {
    title: "Expériences",
    items: [
      {
        title: "Stagiaire maintenance industrielle",
        company: "SATMA SUARL",
        location: "Bamako, Mali",
        period: "Juil–Août 2025",
        bullets: [
          "Maintenance préventive et corrective de presses à vis (production d’huile).",
          "Diagnostic et intervention sur pannes mécaniques, assistance sur interventions.",
        ],
        tags: ["Maintenance", "Mécanique", "Industrie"],
      },
      {
        title: "Dessinateur BTP (stage)",
        company: "CADAU SARL",
        location: "Bamako, Mali",
        period: "Juil–Août 2023",
        bullets: [
          "Production de plans architecturaux/techniques sous AutoCAD (BTP).",
          "Collaboration avec l’équipe projet pour validation, respect des normes.",
        ],
        tags: ["AutoCAD", "Plans", "BTP"],
      },
      {
        title: "Gestionnaire boutique & opérateur transfert",
        company: "Boutique familiale",
        location: "Mali",
        period: "2020–2021",
        bullets: ["Gestion quotidienne (stock, caisse, relation client) et opérations de transfert d’argent."],
        tags: ["Autonomie", "Responsabilité"],
      },
    ],
  },

  education: {
    title: "Formation",
    items: [
      { title: "EIGSI La Rochelle–Casablanca — Cycle ingénieur (Génie des systèmes industriels)", place: "France / Maroc", period: "2022–2027 (en cours)" },
      { title: "FSTM Mohammedia — 1 semestre Biologie-Chimie-Géologie", place: "Maroc", period: "2021–2022" },
      { title: "Baccalauréat", place: "Mali", period: "2019–2020" },
    ],
  },

  projects: {
    title: "Projets",
    intro: "Cartes cliquables : clique sur un projet pour ouvrir les détails (et des images plus tard si tu veux).",
    filtersLabel: "Filtrer :",
    items: [
      {
        slug: "robot-desinfecteur",
        title: "Robot désinfecteur de sol",
        period: "2025",
        tagline: "Arduino + FreeCAD + capteurs ultrasoniques.",
        bullets: ["Programmation Arduino (C++), intégration capteurs.", "Conception mécanique sous FreeCAD."],
        stack: ["Arduino", "C++", "FreeCAD"],
        tags: ["Robotique", "Embarqué", "CAO"],
        images: [],
      },
      {
        slug: "voltify",
        title: "Voltify (Startup Weekend)",
        period: "2025",
        tagline: "Kit Plug & Play d’électrification de vélo (moteur/batterie/capteurs).",
        bullets: ["Travail pluridisciplinaire : cahier des charges, faisabilité.", "Approche produit + intégration système."],
        stack: ["Système", "Produit", "Équipe"],
        tags: ["Produit", "Système"],
        images: [],
      },
      {
        slug: "game-coding-week",
        title: "Game Coding Week (EIGSI)",
        period: "2025",
        tagline: "Jeu vidéo complet réalisé en une semaine.",
        bullets: ["Itération rapide, réalisation d’un jeu type Space Invader."],
        stack: ["Dev", "Sprint"],
        tags: ["Logiciel"],
        images: [],
      },
      {
        slug: "parking-intelligent",
        title: "Parking intelligent",
        period: "2023",
        tagline: "Gestion de place avec Arduino.",
        bullets: ["Logique de gestion d’états, base capteurs/retours utilisateur selon matériel."],
        stack: ["Arduino"],
        tags: ["IoT", "Embarqué"],
        images: [],
      },
      {
        slug: "drone-freecad",
        title: "Conception de drone (CAO)",
        period: "2022",
        tagline: "Dimensionnement + modélisation 3D sous FreeCAD.",
        bullets: ["Structure mécanique, logique de conception/assemblage."],
        stack: ["FreeCAD"],
        tags: ["CAO", "Mécanique"],
        images: [],
      },
    ],
  },

  skills: {
    title: "Compétences",
    groups: [
      { title: "CAO/DAO", items: ["FreeCAD (intermédiaire)", "AutoCAD (intermédiaire)"] },
      { title: "Embarqué & programmation", items: ["Arduino (robotique/IoT)", "Python / C++ / Java (niveau académique)"] },
      { title: "Simulation", items: ["MATLAB (intermédiaire)", "ANSYS Workbench (initiation)"] },
      { title: "Outils", items: ["Pack Office (avancé)", "PostgreSQL (basique)", "Modelio UML (basique)"] },
      { title: "Langues", items: ["Français (courant)", "Anglais : B2 (validation en cours)", "Bambara (maternelle)"] },
    ],
    interestsTitle: "Centres d’intérêt",
    interests: ["Kung Fu", "Documentaires scientifiques", "Musculation", "Musique classique", "Jeux stratégiques"],
  },

  contactSection: {
    title: "Contact",
    intro: "Tout est cliquable : Email ouvre ton client mail, LinkedIn s’ouvre en nouvel onglet, téléphone cliquable sur mobile.",
  },

  footer: {
    rights: "Tous droits réservés",
    madeWith: "Conçu avec passion",
  },
};
