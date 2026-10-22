// Lógica pura del carrusel de proyectos (testeable sin DOM).

const EPS = 1; // tolerancia de subpíxel en los bordes del scroll
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export const formatCounter = (index, n) =>
  `${String(index + 1).padStart(2, '0')}/${String(n).padStart(2, '0')}`;

// index = card inicial visible; al tocar el final es el último, si no con ~3 cards a la vista
// el contador nunca llegaría a "n/n".
export const carouselState = ({ scrollLeft, clientWidth, scrollWidth, step }, n) => {
  const max = Math.max(0, scrollWidth - clientWidth);
  const atStart = scrollLeft <= EPS;
  const atEnd = scrollLeft >= max - EPS;
  const raw = step > 0 ? Math.round(scrollLeft / step) : 0;
  const index = atEnd && max > EPS ? n - 1 : clamp(raw, 0, Math.max(0, n - 1));
  return { index, atStart, atEnd };
};

// scrollLeft destino de avanzar/retroceder 1 card
export const stepTarget = (dir, { scrollLeft, clientWidth, scrollWidth, step }) => {
  const max = Math.max(0, scrollWidth - clientWidth);
  const cur = step > 0 ? Math.round(scrollLeft / step) : 0;
  return clamp((cur + dir) * step, 0, max);
};

// Lo horizontal sobre un scroller horizontal es del scroller; lo vertical siempre es del shell.
export const wheelRoute = (dx, dy, inScroller) => {
  const horizontal = Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 0;
  if (!horizontal) return 'default';
  return inScroller ? 'native' : 'shell-x';
};

// ¿El target está dentro de un [data-hscroll] que realmente desborda en X? (en mobile no)
export const inHScroll = (target) => {
  const el = target && target.closest ? target.closest('[data-hscroll]') : null;
  return Boolean(el) && el.scrollWidth > el.clientWidth + EPS;
};
