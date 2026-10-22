"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { isInteractiveTarget } from "@/lib/keyboard.mjs";
import LocaleSwitcher from "./localeSwitcher";
import HeroPanel from "./hero-panel";
import AboutPanel from "./about-panel";
import ProjectsPanel from "./projects-panel";
import ExperiencePanel from "./experience-panel";
import ContactPanel from "./contact-panel";

const navItems = [
  { n: "01", id: "inicio",      labelKey: "Navbar.home" },
  { n: "02", id: "sobre",       labelKey: "Navbar.about" },
  { n: "03", id: "proyectos",   labelKey: "Navbar.work" },
  { n: "04", id: "experiencia", labelKey: "Navbar.experience" },
  { n: "05", id: "contacto",    labelKey: "Navbar.contact" },
];

const sections = [HeroPanel, AboutPanel, ProjectsPanel, ExperiencePanel, ContactPanel];
const N = sections.length;

const reducedMotionQuery = () => window.matchMedia("(prefers-reduced-motion: reduce)");
const scrollBehavior = () => (reducedMotionQuery().matches ? "auto" : "smooth");

const PortfolioShell = () => {
  const t = useTranslations();
  const trackRef = useRef(null);
  const spacerRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
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

    const activated = new Set();
    let curX = 0;
    let targetX = 0;

    const frac = () => Math.min(1, Math.max(0, window.scrollY / maxScroll));

    const setUI = (idx) => {
      const el = panelEls[idx];
      if (!el) return;
      const want = el.getAttribute("data-ui");
      const map = {
        ink:    "var(--ink)",
        paper:  "var(--paper)",
        accent: "var(--accent-ink)",
      };
      document.documentElement.style.setProperty("--ui", map[want] || map.paper);
    };

    let lastActive = -1;
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

      const idx = Math.round(f * (N - 1));
      if (idx !== lastActive) {
        lastActive = idx;
        setActive(idx);
        setUI(idx);
        activated.add(idx);
        panelEls.forEach((el, i) => {
          el.setAttribute("data-active", activated.has(i) ? "1" : "0");
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
    setUI(0);
    activated.add(0);
    panelEls.forEach((el, i) => {
      if (i === 0) el.setAttribute("data-active", "1");
      else el.setAttribute("inert", "");
    });

    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 0) {
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
      const currentIdx = frac() * (N - 1);
      let targetIdx;
      if (Math.abs(biasVelocity) > FLICK_VELOCITY) {
        targetIdx = biasVelocity > 0 ? Math.ceil(currentIdx) : Math.floor(currentIdx);
        if (Math.abs(targetIdx - currentIdx) < 0.02) {
          targetIdx += biasVelocity > 0 ? 1 : -1;
        }
      } else {
        targetIdx = Math.round(currentIdx);
      }
      targetIdx = Math.min(N - 1, Math.max(0, targetIdx));
      window.scrollTo({ top: (targetIdx / (N - 1)) * maxScroll, behavior: scrollBehavior() });
    };

    const onTouchEnd = () => {
      touchActive = false;
      if (dirLocked === "x") {
        snapToNearest(velocity);
      }
      dirLocked = null;
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
        window.scrollTo({ top: 0, behavior });
      } else if (e.key === "End") {
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
      {/* El chrome va antes del stage en el DOM: Tab llega primero a la navegación */}
      {/* Logo — top left */}
      <div className="frame frame--tl">
        <a href="#" onClick={(e) => { e.preventDefault(); goTo(0); }} className="sig">
          Gabriel <em>Maglia</em>
        </a>
      </div>

      {/* Nav + locale switcher — top right */}
      <div className="frame frame--tr">
        <nav className="nav">
          {navItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              className={active === idx ? "on" : ""}
              onClick={() => goTo(idx)}
            >
              {item.n} — {t(item.labelKey)}
            </button>
          ))}
        </nav>
        <LocaleSwitcher />
      </div>

      {/* Scroll hint — right side, vertical */}
      <div className="hint">
        Scroll <span className="ln" />
      </div>

      {/* Progress bar */}
      <div className="pbar">
        <div className="pbar__fill" id="pbar-fill" />
      </div>

      {/* Section counter — center bottom */}
      <div className="counter">
        <b>{navItems[active]?.n}</b>
        {t(navItems[active]?.labelKey)}
        <span className="counter__of">— {navItems[N - 1].n}</span>
      </div>

      <div id="stage" onScroll={(e) => { e.currentTarget.scrollLeft = 0; }}>
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
