/* ============================================================
   PORTFOLIO · Gabriel Maglia
   Contenido + datos. Editá libremente este archivo.
   Los textos entre [ corchetes ] son placeholders a completar.
   ============================================================ */
window.PORTFOLIO_DATA = {
  name: "Gabriel Maglia",
  first: "Gabriel",
  last: "Maglia",
  role: "Desarrollador de aplicaciones",
  roleAlt: "Fullstack Developer",
  location: "Argentina",
  year: "’26",
  available: "Disponible para proyectos",

  nav: [
    { n: "01", id: "inicio",      label: "Inicio" },
    { n: "02", id: "sobre",       label: "Sobre mí" },
    { n: "03", id: "proyectos",   label: "Proyectos" },
    { n: "04", id: "experiencia", label: "Experiencia" },
    { n: "05", id: "contacto",    label: "Contacto" },
  ],

  hero: {
    kicker: "Portfolio — 2026",
    lead: "Diseño y construyo",
    leadAccent: "aplicaciones",
    leadTail: "de principio a fin.",
    sub: "Frontend con alma de producto. Del prototipo a producción, con foco en la experiencia y el detalle.",
  },

  about: {
    title: "Sobre mí",
    paras: [
      "Soy Gabriel, desarrollador fullstack con foco en frontend. Me obsesiona la interfaz: el ritmo, el tipo, el milisegundo de transición que hace que algo se sienta vivo.",
      "Trabajo de punta a punta — pienso el producto, lo diseño, lo construyo y lo pongo en producción.",
    ],
    stats: [
      { k: "+4", v: "años construyendo para la web" },
      { k: "∞", v: "ganas de aprender lo próximo" },
    ],
    stack: [
      "React", "Next.js", "TypeScript", "React Native",
      "Node.js", "PostgreSQL", "Tailwind", "Figma",
    ],
  },

  projects: {
    title: "Proyectos",
    intro: "Una selección de trabajos. Completá cada uno con tu material real.",
    items: [
      { n: "01", name: "[ Nombre del proyecto ]", type: "App web", stack: "Next.js · Node · PostgreSQL", year: "2025", slot: "proj-1" },
      { n: "02", name: "[ Nombre del proyecto ]", type: "Mobile", stack: "React Native · Expo",        year: "2024", slot: "proj-2" },
      { n: "03", name: "[ Nombre del proyecto ]", type: "Plataforma", stack: "React · TypeScript",      year: "2024", slot: "proj-3" },
      { n: "04", name: "[ Nombre del proyecto ]", type: "Landing", stack: "Astro · Tailwind",           year: "2023", slot: "proj-4" },
    ],
  },

  experience: {
    title: "Experiencia",
    intro: "Dónde dejé huella.",
    items: [
      { role: "[ Rol ]",     company: "[ Empresa ]", period: "2024 — Hoy" },
      { role: "[ Rol ]",     company: "[ Empresa ]", period: "2023 — 2024" },
      { role: "[ Rol ]",     company: "[ Empresa ]", period: "2022 — 2023" },
    ],
  },

  contact: {
    title: "Trabajemos",
    titleAccent: "juntos",
    sub: "¿Una idea, un proyecto, una charla? Respondo rápido.",
    email: "Gab.Maglia@gmail.com",
    links: [
      { label: "GitHub",   handle: "gabiMaglia", href: "https://github.com/gabiMaglia" },
      { label: "LinkedIn", handle: "in/gabriel-maglia", href: "#" },
      { label: "CV", handle: "Descargar PDF", href: "#" },
    ],
  },
};
