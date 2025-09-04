// Easings
export const EASE_STD  = [0.4, 0, 0.2, 1];     // Material-like (fades / contenedores)
export const EASE_SNAP = [0.16, 1, 0.3, 1];    // Entrada "rápida pero suave"

// Duraciones (alineadas al About original)
export const DUR = {
  section: 1.0,     // sección completa (fade)
  title: 0.5,       // h4/h2
  paragraph: 0.7,   // p debajo del título
  container: 0.8,   // bloques grandes (fila, grid, ul)
  img: 0.4,         // imagen de About
  text: 0.6,        // columna derecha About
  subtitle: 0.5,    // subtítulos internos (ej: "Technologies")
  list: 0.8,        // ul de skills (About)
  card: 0.36        // item de grid/list
};

// Delays (idénticos al About original)
export const DL = {
  h4: 0.3,
  h2: 0.5,
  p:  0.5,
  rightCol: 0.3,
  sub: 0.4,
  list: 0.6,
};

// Stagger para ítems
export const STAGGER = { start: 0.10, step: 0.06 };
export const itemDelay = (i, start = STAGGER.start, step = STAGGER.step) => start + i * step;

// Viewport (dispara una sola vez al entrar ~20%)
export const VIEWPORT = { once: true, amount: 0.2 };

// Variants reutilizables
export const variants = {
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },

  // Títulos (About usa y:-20 para h4/h2)
  riseNeg: (reduced = false) => ({
    hidden: { y: reduced ? 0 : -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }),

  // Subtítulos internos (About usa y:+20)
  dropPos: (reduced = false) => ({
    hidden: { y: reduced ? 0 : 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }),

  // Entradas con escala leve (img About / cards grid)
  scaleIn: (reduced = false) => ({
    hidden: { opacity: 0, scale: reduced ? 1 : 0.9 },
    visible: { opacity: 1, scale: 1 }
  }),

  // Ítem de lista tipo About (aparece con leve scale up)
  scaleUpListItem: (reduced = false) => ({
    hidden: { opacity: 0, scale: reduced ? 1 : 0.95 },
    visible: { opacity: 1, scale: 1.05 }
  }),

  // Card de grid (leve y + scale)
  cardIn: (reduced = false) => ({
    hidden: { opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 }
  })
};
