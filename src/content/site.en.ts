import type { SiteContent } from "./types";

/**
 * Contenu EN : même structure que FR.
 */
export const siteEN: SiteContent = {
  meta: {
    name: "N’Golo dit Ladji TOGOLA",
    role: "Generalist engineering student (Mechatronics track)",
    city: "La Rochelle, France",
    availability: "Internship (4–6 months) starting May 2026",
  },

  contact: {
    email: "ndl.togola.27@eigsi.fr",
    phone: "+33 7 46 51 26 67",
    linkedin: "https://www.linkedin.com/in/n-golo-dit-ladji-togola-313254384",
    location: "La Rochelle, France",
  },

  englishLevel: "B2 (validation in progress — test on March 5, 2026)",

  ui: {
    close: "Close",
    all: "All",
    copyEmail: "Copy email",
    copied: "Email copied!",
  },

  nav: {
    home: "Home",
    projects: "Projects",
    experience: "Experience",
    resume: "Resume",
  },

  hero: {
    headline: "Portfolio",
    titleLine: "Mechatronics engineering — hands-on mindset",
    statusLine: "Looking for an assistant engineer internship (May 2026, 4–6 months) • International mobility",
    ctas: { primary: "See projects", secondary: "Download resume" },
  },

  about: {
    title: "About",
    paragraphs: [
      "I’m pragmatic: I focus on constraints and facts, then build simple, robust solutions.",
      "I learn deeply: understand the mechanism before executing.",
      "I aim for roles connecting design, maintenance, and optimization of industrial systems.",
    ],
  },

  experience: {
    title: "Experience",
    items: [
      {
        title: "Industrial maintenance intern",
        company: "SATMA SUARL",
        location: "Bamako, Mali",
        period: "Jul–Aug 2025",
        bullets: [
          "Preventive and corrective maintenance on screw presses (oil production).",
          "Mechanical troubleshooting and assistance during interventions.",
        ],
        tags: ["Maintenance", "Mechanics", "Industry"],
      },
      {
        title: "CAD / construction internship",
        company: "CADAU SARL",
        location: "Bamako, Mali",
        period: "Jul–Aug 2023",
        bullets: [
          "Architectural/technical drawings in AutoCAD (construction projects).",
          "Worked with the project team to validate drawings and follow standards.",
        ],
        tags: ["AutoCAD", "Drawings", "Construction"],
      },
      {
        title: "Shop manager & money transfer operator",
        company: "Family business",
        location: "Mali",
        period: "2020–2021",
        bullets: ["Daily operations (stock, cash, customer relations) and money transfers."],
        tags: ["Autonomy", "Ownership"],
      },
    ],
  },

  education: {
    title: "Education",
    items: [
      { title: "EIGSI La Rochelle–Casablanca — Engineering program (Industrial Systems)", place: "France / Morocco", period: "2022–2027 (ongoing)" },
      { title: "FSTM Mohammedia — 1 semester in Biology/Chemistry/Geology", place: "Morocco", period: "2021–2022" },
      { title: "High school diploma", place: "Mali", period: "2019–2020" },
    ],
  },

  projects: {
    title: "Projects",
    intro: "Clickable cards: click a project to open details (images can be added later).",
    filtersLabel: "Filter:",
    items: [
      {
        slug: "floor-disinfection-robot",
        title: "Floor disinfection robot",
        period: "2025",
        tagline: "Arduino + FreeCAD + ultrasonic sensors.",
        bullets: ["Arduino programming (C++), sensor integration.", "Mechanical design in FreeCAD."],
        stack: ["Arduino", "C++", "FreeCAD"],
        tags: ["Robotics", "Embedded", "CAD"],
        images: [],
      },
      {
        slug: "voltify",
        title: "Voltify (Startup Weekend)",
        period: "2025",
        tagline: "Plug & Play e-bike conversion kit (motor/battery/sensors).",
        bullets: ["Requirements and feasibility in a cross-functional team.", "Product mindset + system integration."],
        stack: ["System", "Product", "Team"],
        tags: ["Product", "System"],
        images: [],
      },
      {
        slug: "game-coding-week",
        title: "Game Coding Week (EIGSI)",
        period: "2025",
        tagline: "A complete game built in one week.",
        bullets: ["Fast iteration, built a Space-Invader-like game."],
        stack: ["Dev", "Sprint"],
        tags: ["Software"],
        images: [],
      },
      {
        slug: "smart-parking",
        title: "Smart parking",
        period: "2023",
        tagline: "Slot management with Arduino.",
        bullets: ["State logic, basic sensors and user feedback depending on hardware."],
        stack: ["Arduino"],
        tags: ["IoT", "Embedded"],
        images: [],
      },
      {
        slug: "drone-cad",
        title: "Drone CAD design",
        period: "2022",
        tagline: "Sizing + 3D modeling in FreeCAD.",
        bullets: ["Mechanical structure, design/assembly logic."],
        stack: ["FreeCAD"],
        tags: ["CAD", "Mechanics"],
        images: [],
      },
    ],
  },

  skills: {
    title: "Skills",
    groups: [
      { title: "CAD", items: ["FreeCAD (intermediate)", "AutoCAD (intermediate)"] },
      { title: "Embedded & coding", items: ["Arduino (robotics/IoT)", "Python / C++ / Java (academic level)"] },
      { title: "Simulation", items: ["MATLAB (intermediate)", "ANSYS Workbench (beginner)"] },
      { title: "Tools", items: ["MS Office (advanced)", "PostgreSQL (basic)", "Modelio UML (basic)"] },
      { title: "Languages", items: ["French (fluent)", "English: B2 (in progress)", "Bambara (native)"] },
    ],
    interestsTitle: "Interests",
    interests: ["Kung Fu", "Science documentaries", "Workout", "Classical music", "Strategy games"],
  },

  contactSection: {
    title: "Contact",
    intro: "Everything is clickable: Email opens your mail app, LinkedIn opens in a new tab, phone is clickable on mobile.",
  },

  footer: {
    rights: "All rights reserved",
    madeWith: "Built with passion",
  },
};
