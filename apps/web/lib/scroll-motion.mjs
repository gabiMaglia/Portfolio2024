// Lógica pura del motor de scroll horizontal (testeable sin DOM).

// Tinta del chrome por superficie del panel: nunca igual al fondo que tiene debajo
export const UI_FOR_SURFACE = { paper: 'ink', ink: 'paper', accent: 'ink' };

// Distancia (en anchos de viewport) a la que un panel vecino empieza a mostrar su contenido.
// Con el easing expo-out de .reveal, a mitad de recorrido ya está casi opaco.
export const REVEAL_NEAR = 0.85;

export const shouldActivate = (d) => Math.abs(d) < REVEAL_NEAR;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

// Panel bajo cada borde del elemento y dónde cae el seam (px desde su borde izquierdo).
// Un elemento más angosto que el viewport cruza como mucho un seam.
export const chromeSegments = (left, right, curX, vw, n) => {
  const a = clamp(Math.floor((left - curX) / vw), 0, n - 1);
  const b = clamp(Math.floor((right - curX - 1e-6) / vw), 0, n - 1);
  if (a === b) return { a, b, cut: 0 };
  return { a, b, cut: (a + 1) * vw + curX - left };
};

const FLICK_EPS = 0.02;

export const snapTargetIdx = (currentIdx, velocity, n, flick = 0.45) => {
  let target;
  if (Math.abs(velocity) > flick) {
    target = velocity > 0 ? Math.ceil(currentIdx) : Math.floor(currentIdx);
    if (Math.abs(target - currentIdx) < FLICK_EPS) target += velocity > 0 ? 1 : -1;
  } else {
    target = Math.round(currentIdx);
  }
  return clamp(target, 0, n - 1);
};

// D-02: no relanzar scrollTo al mismo destino mientras ya vamos hacia él.
// El guard vence (ttl ~ duración del smooth-scroll) para no dejar un destino viejo bloqueado.
export const SNAP_TTL_MS = 700;
export const shouldSkipSnap = (target, last, now, ttl = SNAP_TTL_MS) =>
  Boolean(last) && last.idx === target && now - last.at < ttl;

export const isSingleTouch = (touches) => Boolean(touches) && touches.length === 1;
