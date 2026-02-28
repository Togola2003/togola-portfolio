import type { SiteContent } from "./types";

export const siteEn: SiteContent = {
  meta: {
    name: "N'golo dit Ladji Togola",
    title: "Portfolio — Ladji Togola",
    description: "Mechatronics Engineering student at EIGSI La Rochelle. Looking for a 4–6 month internship from May 2026.",
  },

  hero: {
    headline: "Full Autonomy • Fast Learning • Concrete Results",
    titleLine: "Mechatronics Engineering — Hands-on mindset",
    statusLine: "Looking for assistant engineer internship (May 2026, 4–6 months) • International mobility",
    ctas: { primary: "See my projects", secondary: "Download resume" },
  },

  about: {
    title: "My mindset",
    paragraphs: [
      "Pragmatic and transparent: I want facts, constraints, then simple and reliable solutions. No fluff, just results.",
      "Deep self-learning: this site, built from scratch with zero dev experience at the start, proves it.",
      "Hands-on engineer: understand the workshop or site reality before designing at the office. Maintenance, optimization, complex systems.",
    ],
  },

  experience: {
    title: "Experience",
    items: [
      {
        title: "Industrial Maintenance Intern",
        company: "SATMA SUARL",
        location: "Mali",
        period: "Jul – Aug 2025",
        bullets: [
          "Preventive and corrective maintenance of screw presses for vegetable oil production optimization",
          "Diagnosis and mechanical fault repair on screw presses",
          "Support on maintenance interventions",
        ],
        tags: ["Maintenance", "Mechanics", "Industry"],
      },
      {
        title: "BTP Drafter",
        company: "CADAU SARL",
        location: "Mali",
        period: "Jul – Aug 2023",
        bullets: [
          "Production of architectural and technical plans on AutoCAD for BTP projects",
          "Technical plans compliant with BTP standards on AutoCAD",
          "Collaboration with engineering team for construction project design",
          "Administrative procedures with ministries and town halls",
        ],
        tags: ["AutoCAD", "BTP", "Technical Drawing"],
      },
      {
        title: "Shop Manager / Money Transfer Operator",
        company: "Family Shop",
        location: "Mali",
        period: "2020 – 2021",
        bullets: [
          "Daily management of stock, cash register, customer relations and money transfer operations",
        ],
        tags: ["Management", "Commerce"],
      },
    ],
  },

  education: {
    title: "Education",
    items: [
      {
        title: "Generalist Engineer — Mechatronics",
        place: "EIGSI La Rochelle",
        period: "2022 – 2027",
      },
      {
        title: "Semester in Biology-Chemistry-Geology",
        place: "FSTM Mohammedia, Morocco",
        period: "2021 – 2022",
      },
      {
        title: "Baccalaureate",
        place: "Lycée Kankou Moussa, Mali",
        period: "2019 – 2020",
      },
    ],
  },

  projects: {
    title: "Projects",
    intro: "Academic and personal projects in mechatronics, embedded systems and design.",
    filtersLabel: "Filter:",
    items: [
      {
        slug: "robot-desinfecteur",
        title: "Floor Disinfection Robot",
        period: "2025",
        tagline: "Arduino C++, FreeCAD design, ultrasonic sensors",
        bullets: [
          "Arduino programming (C++), ultrasonic sensor integration",
          "Mechanical design with FreeCAD",
          "Materials study: limits and meshing",
        ],
        stack: ["Arduino", "C++", "FreeCAD", "Sensors"],
        tags: ["Robotics", "Embedded", "CAD"],
        images: [],
      },
      {
        slug: "game-coding-week",
        title: "Game Coding Week — Space Invader",
        period: "2025",
        tagline: "Full video game built in one week using Cursor and AI",
        bullets: [
          "Complete Space Invader-type game built in one week",
          "Used Cursor (AI) to accelerate development",
        ],
        stack: ["Game Dev", "AI", "Cursor"],
        tags: ["Dev", "AI"],
        images: [],
      },
      {
        slug: "voltify",
        title: "Voltify — Startup Weekend",
        period: "2025",
        tagline: "Modular electrification system for classic bikes",
        bullets: [
          "Mechanical design and electrical system integration",
          "Market analysis and business model",
          "Prototype and jury presentation",
        ],
        stack: ["Mechanics", "Electrical", "Product"],
        tags: ["Startup", "Mechanics", "Electrical"],
        images: [],
      },
      {
        slug: "suiveur-ligne",
        title: "Line Follower Robot",
        period: "2023",
        tagline: "Autonomous robot with infrared sensors and following logic",
        bullets: [
          "Line following algorithm",
          "IR sensor calibration",
        ],
        stack: ["Arduino", "IR Sensors", "Scratch"],
        tags: ["Robotics", "Embedded"],
        images: [],
      },
      {
        slug: "parking-intelligent",
        title: "Smart Parking Arduino",
        period: "2023",
        tagline: "Parking space management with sensors and LCD display",
        bullets: [
          "Space counting system",
          "LCD real-time display interface",
        ],
        stack: ["Arduino", "Sensors", "LCD"],
        tags: ["IoT", "System"],
        images: [],
      },
    ],
  },

  skills: {
    title: "Skills",
    groups: [
      {
        title: "CAD / DAO",
        items: ["FreeCAD (intermediate)", "AutoCAD (intermediate)"],
      },
      {
        title: "Embedded Systems",
        items: ["Arduino", "C", "Python", "Java"],
      },
      {
        title: "Simulation & Computing",
        items: ["MATLAB (intermediate)", "ANSYS Workbench (basic)"],
      },
      {
        title: "IT & Tools",
        items: ["Pack Office (advanced)", "PostgreSQL (basic)", "Modelio (basic)"],
      },
    ],
    interestsTitle: "Interests",
    interests: ["Kung Fu", "Scientific documentaries", "Weightlifting", "Classical music", "Strategy games"],
  },

  contact: {
    email: "ndl.togola.27@eigsi.fr",
    phone: "+33 7 46 51 26 67",
    linkedin: "http://www.linkedin.com/in/n-golo-dit-ladji-togola-313254384",
    location: "La Rochelle, France",
  },

  contactSection: {
    title: "Contact",
    intro: "Available for a 4–6 month internship from May 2026. Feel free to reach out.",
  },

  ui: {
    close: "Close",
    all: "All",
    copyEmail: "Copy email",
    copied: "Copied!",
    filter: "Filter:",
    seeAll: "See all",
    loading: "Loading...",
  },

  englishLevel: "B1 → target B2 end of 2026",

  footer: {
    rights: "All rights reserved",
    madeWith: "Made with Next.js + Tailwind",
  },
};
