// Helper para armar transition rápido
export const t = (duration, delay = 0) => ({ duration, delay });

// Presets de initial/whileInView que usás
export const PRESETS = {
    fadeIn: { initial: { opacity: 0 }, whileInView: { opacity: 1 } },
    riseNeg: { initial: { y: -20, opacity: 0 }, whileInView: { y: 0, opacity: 1 } },
    dropPos: { initial: { y: 20, opacity: 0 }, whileInView: { y: 0, opacity: 1 } },
    scaleIn09: { initial: { scale: 0.9, opacity: 0 }, whileInView: { scale: 1, opacity: 1 } },
};

// Opcional, para mantener comportamiento consistente al entrar en viewport
export const VIEWPORT = { once: true, amount: 0.2 };

/* =========================
   TIMES OPTIMIZADOS (ms)
   - Sección: 0.7s
   - Titulares: 0.26–0.30s
   - Párrafos: 0.28s
   - Contenedores grandes (grids/rows): 0.35–0.38s
   - Imagen/About: 0.24s
   ========================= */

// ABOUT (manteniendo tu estilo, solo tiempos)
export const ABOUT = {
    section: { ...PRESETS.fadeIn, transition: t(0.7) },
    h4: { ...PRESETS.riseNeg, transition: t(0.26, 0.12) },
    h2: { ...PRESETS.riseNeg, transition: t(0.30, 0.22) },
    row: { ...PRESETS.fadeIn, transition: t(0.35) },
    img: { ...PRESETS.scaleIn09, transition: t(0.24, 0.08) },
    rightCol: { ...PRESETS.fadeIn, transition: t(0.32, 0.18) },
    subTechH4: { ...PRESETS.dropPos, transition: t(0.26, 0.24) },
    skillsUl: { ...PRESETS.fadeIn, transition: t(0.40, 0.30) },

    // Interacciones por item (igual que tu código)
    skillItem: {
        whileInView: { scale: 1.05 },
        whileHover: { scale: 1.1 }
    }
};

// WORK
export const WORK = {
    section: { ...PRESETS.fadeIn, transition: t(0.7) },
    h4: { ...PRESETS.riseNeg, transition: t(0.26, 0.12) },
    h2: { ...PRESETS.riseNeg, transition: t(0.30, 0.22) },
    p: { ...PRESETS.fadeIn, transition: t(0.28, 0.28) },
    gridWrap: { ...PRESETS.fadeIn, transition: t(0.38, 0.34) },
};

// EXPERIENCE
export const EXPERIENCE = {
    section: { ...PRESETS.fadeIn, transition: t(0.7) },
    h4: { ...PRESETS.riseNeg, transition: t(0.26, 0.12) },
    h2: { ...PRESETS.riseNeg, transition: t(0.30, 0.22) },
    p: { ...PRESETS.fadeIn, transition: t(0.28, 0.28) },
    grid: { ...PRESETS.fadeIn, transition: t(0.38, 0.34) },
};

// CONTACT
export const CONTACT = {
    section: { ...PRESETS.fadeIn, transition: t(0.7) },
    h2: { ...PRESETS.riseNeg, transition: t(0.30, 0.22) },
    p: { ...PRESETS.fadeIn, transition: t(0.28, 0.28) },
    form: { ...PRESETS.fadeIn, transition: t(0.38, 0.34) },
};

export const HEADER = {
    // opcional: si querés un fade suave del bloque principal
    section: { ...PRESETS.fadeIn, transition: t(0.6) },

    // Avatar (spring rápido, sin rebotes exagerados)
    avatar: {
        initial: { scale: 0 },
        whileInView: { scale: 1 },
        transition: { type: 'spring', stiffness: 120, damping: 16, duration: 0.5 }
    },

    // “Hi / Hola”
    h3: {
        initial: { y: -20, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: t(0.28, 0.12)
    },

    // Headline principal (con tu y:-30)
    h1: {
        initial: { y: -30, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: t(0.32, 0.22)
    },

    // Descripción
    p: {
        ...PRESETS.fadeIn,
        transition: t(0.28, 0.32)
    },

    // CTA principal (“Contact”)
    ctaPrimary: {
        initial: { y: 30, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: t(0.30, 0.44)
    },

    // CTA secundaria (“Resume”)
    ctaSecondary: {
        initial: { y: 30, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: t(0.30, 0.52)
    }
};
