"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { carouselState, stepTarget } from "@/lib/carousel.mjs";

const INITIAL = { index: 0, atStart: true, atEnd: false };
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Mide el scroller nativo (scroll-snap) y expone índice/bordes + acciones. Sin estado propio de
// posición: la verdad es scrollLeft, así trackpad, teclado y botones quedan siempre sincronizados.
export function useCarousel(n) {
  const ref = useRef(null);
  const [state, setState] = useState(INITIAL);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return null;
    const cards = el.children;
    const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : cards[0]?.offsetWidth || 0;
    return { scrollLeft: el.scrollLeft, clientWidth: el.clientWidth, scrollWidth: el.scrollWidth, step };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const m = measure();
      if (!m) return;
      const next = carouselState(m, n);
      setState((s) => (s.index === next.index && s.atStart === next.atStart && s.atEnd === next.atEnd ? s : next));
      // Mobile (lista vertical): el fade del pie vive mientras haya más para scrollear
      if (el.scrollHeight - el.clientHeight - el.scrollTop > 1) el.dataset.fadeEnd = "1";
      else delete el.dataset.fadeEnd;
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    el.addEventListener("scroll", schedule, { passive: true });
    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", schedule);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [n, measure]);

  const go = useCallback((dir) => {
    const el = ref.current;
    const m = measure();
    if (!el || !m) return;
    const s = carouselState(m, n);
    if ((dir < 0 && s.atStart) || (dir > 0 && s.atEnd)) return; // aria-disabled: el clic no hace nada
    el.scrollTo({ left: stepTarget(dir, m), behavior: reduced() ? "auto" : "smooth" });
  }, [measure, n]);

  // ←/→ con foco dentro: 1 card. stopPropagation: el shell no debe mover de panel con la misma tecla.
  const onKeyDown = useCallback((e) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    e.stopPropagation();
    go(e.key === "ArrowRight" ? 1 : -1);
  }, [go]);

  return { ref, ...state, go, onKeyDown };
}
