"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { isInteractiveTarget } from "@/lib/keyboard.mjs";
import { chromeSegments, snapTargetIdx, shouldSkipSnap, isSingleTouch, snapDurationMs, easeSnap } from "@/lib/scroll-motion.mjs";
import { wheelRoute, inHScroll } from "@/lib/carousel.mjs";
import { PANEL_IDS, panelIndexFromHash } from "@/lib/panel-hash.mjs";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import LocaleSwitcher from "./localeSwitcher";
import SkipLink from "./skip-link";
import Masthead from "./masthead";
import HeroPanel from "./hero-panel";
import AboutPanel from "./about-panel";
import ProjectsPanel from "./projects-panel";
import ExperiencePanel from "./experience-panel";
import ContactPanel from "./contact-panel";

const NAV_LABELS = ["Navbar.home", "Navbar.about", "Navbar.work", "Navbar.experience", "Navbar.contact"];
const navItems = PANEL_IDS.map((id, i) => ({ n: String(i + 1).padStart(2, "0"), id, labelKey: NAV_LABELS[i] }));
const STAGE_ID = "stage";

const sections = [HeroPanel, AboutPanel, ProjectsPanel, ExperiencePanel, ContactPanel];
const N = sections.length;

const reducedMotionQuery = () => window.matchMedia("(prefers-reduced-motion: reduce)");
const scrollBehavior = () => (reducedMotionQuery().matches ? "auto" : "smooth");

const PortfolioShell = () => {
  const t = useTranslations();
  const trackRef = useRef(null);
  const spacerRef = useRef(null);
  const [active, setActive] = useState(0);

  // Layout effect: al llegar con #panel (cambio de idioma) el track se posiciona antes del
  // primer paint, sin mostrar un frame del hero.
  useIsomorphicLayoutEffect(() => {
    const track = trackRef.current;
    const spacer = spacerRef.current;
    if (!track || !spacer) return;

    const panelEls = Array.from(track.querySelectorAll("[data-d-panel]"));
    const motionQuery = reducedMotionQuery();

    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let travel = 0;
    let maxScroll = 1;

    const layout = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      travel = (N - 1) * vw;
      maxScroll = Math.max(1, (N - 1) * vh * 1.08);
      spacer.style.height = `${maxScroll + vh}px`;
    };
    layout();

    const frac = () => Math.min(1, Math.max(0, window.scrollY / maxScroll));

    // Llegada desde el switch de idioma: el hash trae el panel; se consume y se limpia la URL
    const hashIdx = panelIndexFromHash(window.location.hash);
    if (hashIdx >= 0) {
      window.scrollTo({ top: (hashIdx / (N - 1)) * maxScroll, behavior: "auto" });
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
    }

    // Arranca donde ya está el scroll (hash o restauración del navegador): sin barrido desde el panel 1
    let curX = -frac() * travel;
    let targetX = curX;

    const UI_VAR = {
      ink:    "var(--ink)",
      paper:  "var(--paper)",
      accent: "var(--accent-ink)",
    };
    const panelInk = panelEls.map((el) => UI_VAR[el.getAttribute("data-ui")] || UI_VAR.paper);

    // Chrome fijo: cada glifo toma la tinta del panel que tiene debajo en ESTE frame
    // (corte duro en el seam), así nunca queda paper sobre paper a mitad de recorrido.
    const followEls = Array.from(document.querySelectorAll("[data-ui-follow]"));
    const hintEl = document.querySelector(".hint");
    const paintChrome = () => {
      const rects = followEls.map((el) => el.getBoundingClientRect());
      followEls.forEach((el, i) => {
        const r = rects[i];
        const { a, b, cut } = chromeSegments(r.left, r.right, curX, vw, N);
        el.style.setProperty("--ui-a", panelInk[a]);
        el.style.setProperty("--ui-b", panelInk[b]);
        el.style.setProperty("--ui-cut", `${cut.toFixed(2)}px`);
      });
      if (hintEl) {
        const r = hintEl.getBoundingClientRect();
        const { a } = chromeSegments(r.left + r.width / 2, r.left + r.width / 2 + 1, curX, vw, N);
        document.documentElement.style.setProperty("--ui", panelInk[a]);
      }
    };

    let lastActive = -1;
    let lastPaintedX = null;
    let rafId;

    const raf = () => {
      const f = frac();
      targetX = -f * travel;
      // reduced-motion: el track salta, sin easing
      curX = motionQuery.matches ? targetX : curX + (targetX - curX) * 0.1;
      if (Math.abs(targetX - curX) < 0.4) curX = targetX;
      track.style.transform = `translate3d(${curX}px, 0, 0)`;

      for (let i = 0; i < panelEls.length; i += 1) {
        const d = (i * vw + curX) / vw;
        panelEls[i].style.setProperty("--d", motionQuery.matches ? "0" : d.toFixed(4));
      }

      if (curX !== lastPaintedX) {
        lastPaintedX = curX;
        paintChrome();
      }

      const idx = Math.round(f * (N - 1));
      if (idx !== lastActive) {
        lastActive = idx;
        setActive(idx);
        panelEls.forEach((el, i) => {
          // Paneles fuera de pantalla no reciben foco: Tab no puede desplazar el stage
          if (i === idx) el.removeAttribute("inert");
          else el.setAttribute("inert", "");
        });
      }

      const fill = document.getElementById("pbar-fill");
      if (fill) fill.style.width = `${(f * 100).toFixed(2)}%`;
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    panelEls.forEach((el, i) => {
      if (i !== 0) el.setAttribute("inert", "");
    });

    let lastSnap = null; // D-02: destino del último snap, para no relanzar scrollTo al mismo índice
    let gestureInvalid = false; // pinch / multitouch: no es un swipe de navegación

    // Snap smooth: tween propio (el smooth nativo no tiene duración controlable y era brusco)
    let tweenId = 0;
    const cancelTween = () => {
      cancelAnimationFrame(tweenId);
      tweenId = 0;
    };
    const animateScrollTo = (to, duration) => {
      cancelTween();
      const from = window.scrollY;
      if (duration <= 0 || from === to) {
        window.scrollTo({ top: to, behavior: "auto" });
        return;
      }
      const t0 = performance.now();
      const frame = (now) => {
        const p = Math.min(1, (now - t0) / duration);
        window.scrollTo({ top: from + (to - from) * easeSnap(p), behavior: "auto" });
        tweenId = p < 1 ? requestAnimationFrame(frame) : 0;
      };
      tweenId = requestAnimationFrame(frame);
    };

    let ignoreGesture = false; // el touch nació en un scroller horizontal (carrusel): no es del shell

    const onWheel = (e) => {
      lastSnap = null;
      cancelTween();
      // Horizontal sobre el carrusel = nativo (scrollea el carrusel); vertical siempre es del shell
      if (wheelRoute(e.deltaX, e.deltaY, inHScroll(e.target)) === "shell-x") {
        window.scrollBy(0, e.deltaX);
        e.preventDefault();
      }
      document.body.classList.add("scrolled");
    };

    const SWIPE_MULTIPLIER = 2.2;
    const FLICK_VELOCITY = 0.45; // px/ms of raw finger movement to count as a "flick"
    const DIR_LOCK_THRESHOLD = 6; // px before a gesture commits to horizontal/vertical

    let tx0 = 0;
    let ty0 = 0;
    let prevX = 0;
    let prevT = 0;
    let velocity = 0; // smoothed px/ms of raw finger movement (+ = swipe left/forward)
    let dirLocked = null; // 'x' | 'y' | null while undecided
    let touchActive = false;

    const onTouchStart = (e) => {
      lastSnap = null;
      cancelTween();
      ignoreGesture = inHScroll(e.target);
      if (ignoreGesture) return;
      if (!isSingleTouch(e.touches)) {
        gestureInvalid = true;
        return;
      }
      gestureInvalid = false;
      const t = e.touches[0];
      tx0 = prevX = t.clientX;
      ty0 = t.clientY;
      prevT = e.timeStamp;
      velocity = 0;
      dirLocked = null;
      touchActive = true;
      clearTimeout(snapTO);
    };

    const onTouchMove = (e) => {
      if (ignoreGesture) return;
      if (gestureInvalid || !isSingleTouch(e.touches)) {
        gestureInvalid = true;
        return;
      }
      const t = e.touches[0];
      const totalDx = tx0 - t.clientX;
      const totalDy = ty0 - t.clientY;

      if (dirLocked === null) {
        if (Math.abs(totalDx) > DIR_LOCK_THRESHOLD || Math.abs(totalDy) > DIR_LOCK_THRESHOLD) {
          dirLocked = Math.abs(totalDx) > Math.abs(totalDy) ? "x" : "y";
        }
      }

      if (dirLocked === "x") {
        const stepDx = prevX - t.clientX; // incremental delta since last event (fixes runaway scroll)
        const dt = Math.max(1, e.timeStamp - prevT);
        window.scrollBy(0, stepDx * SWIPE_MULTIPLIER);
        velocity = velocity * 0.6 + (stepDx / dt) * 0.4;
        e.preventDefault();
        document.body.classList.add("scrolled");
      }

      prevX = t.clientX;
      prevT = e.timeStamp;
    };

    const snapToNearest = (biasVelocity = 0) => {
      const targetIdx = snapTargetIdx(frac() * (N - 1), biasVelocity, N, FLICK_VELOCITY);
      const now = performance.now();
      if (shouldSkipSnap(targetIdx, lastSnap, now)) return;
      lastSnap = { idx: targetIdx, at: now };
      const to = (targetIdx / (N - 1)) * maxScroll;
      animateScrollTo(to, snapDurationMs(Math.abs(to - window.scrollY), motionQuery.matches));
    };

    const onTouchEnd = (e) => {
      if (e.touches && e.touches.length > 0) return; // quedan dedos: el gesto sigue
      if (ignoreGesture) {
        ignoreGesture = false;
        return;
      }
      touchActive = false;
      if (dirLocked === "x") {
        snapToNearest(gestureInvalid ? 0 : velocity);
      }
      dirLocked = null;
      gestureInvalid = false;
    };

    let snapTO = null;
    const onScroll = () => {
      document.body.classList.add("scrolled");
      if (touchActive) return; // avoid the idle-snap firing mid-drag and fighting the manual scrollBy
      clearTimeout(snapTO);
      snapTO = setTimeout(() => {
        snapToNearest();
      }, 150);
    };

    const onKey = (e) => {
      lastSnap = null;
      cancelTween();
      // Con foco en un link/botón, Space/Enter/flechas son del control, no del scroll
      if (isInteractiveTarget(e.target)) return;
      const behavior = scrollBehavior();
      const step = maxScroll / (N - 1);
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        window.scrollBy({ top: step, behavior });
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        window.scrollBy({ top: -step, behavior });
      } else if (e.key === "Home") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior });
      } else if (e.key === "End") {
        e.preventDefault();
        window.scrollTo({ top: maxScroll, behavior });
      }
    };

    window.addEventListener("resize", layout);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(snapTO);
      cancelTween();
      window.removeEventListener("resize", layout);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  const goTo = (index) => {
    const vh = window.innerHeight;
    const maxScroll = Math.max(1, (N - 1) * vh * 1.08);
    window.scrollTo({ top: (index / (N - 1)) * maxScroll, behavior: scrollBehavior() });
  };

  return (
    <>
      <SkipLink targetId={STAGE_ID} label={t("A11y.skip")} />

      {/* El chrome va antes del stage en el DOM: Tab llega primero a la navegación */}
      {/* Logo — top left */}
      <div className="frame frame--tl">
        <a href="#" onClick={(e) => { e.preventDefault(); goTo(0); }} className="sig ui-ink" data-ui-follow>
          Gabriel <em>Maglia</em>
        </a>
      </div>

      {/* Nav + locale switcher — top right */}
      <div className="frame frame--tr">
        <nav className="nav" aria-label={t("Navbar.label")}>
          {navItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              className={`ui-ink${active === idx ? " on" : ""}`}
              data-ui-follow
              onClick={() => goTo(idx)}
            >
              {item.n} — {t(item.labelKey)}
            </button>
          ))}
        </nav>
        <LocaleSwitcher panelId={navItems[active].id} />
      </div>

      {/* Scroll hint — right side, vertical */}
      <div className="hint">
        Scroll <span className="ln" />
      </div>

      {/* Masthead editorial — bottom left */}
      <div className="frame frame--bl">
        <Masthead />
      </div>

      {/* Progress bar */}
      <div className="pbar" data-ui-follow>
        <div className="pbar__fill" id="pbar-fill" />
      </div>

      {/* Section counter — center bottom */}
      <div className="counter ui-ink" data-ui-follow>
        <b>{navItems[active]?.n}</b>
        {t(navItems[active]?.labelKey)}
        <span>— {navItems[N - 1].n}</span>
      </div>

      <div id={STAGE_ID} tabIndex={-1} onScroll={(e) => { e.currentTarget.scrollLeft = 0; }}>
        <div id="track" ref={trackRef}>
          {sections.map((Section, index) => (
            <Section key={index} index={index} />
          ))}
        </div>
      </div>
      <div id="spacer" ref={spacerRef} />
    </>
  );
};

export default PortfolioShell;
