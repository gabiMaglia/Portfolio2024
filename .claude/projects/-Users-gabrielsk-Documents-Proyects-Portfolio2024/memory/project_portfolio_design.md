---
name: project-portfolio-design
description: Portfolio usa el diseño de portfolio_design/ — paleta crema/naranja, scroll horizontal, 5 panels, reveal system, fuentes Archivo/Space Mono/Instrument Serif
metadata:
  type: project
---

El portfolio implementa el diseño de `portfolio_design/` (HTML standalone de referencia).

**Why:** El usuario quería migrar ese diseño al proyecto Next.js, mapeando DB data + hardcodeando lo que no viene de DB.

**How to apply:** Cualquier cambio visual debe respetar los tokens CSS de `globals.css` y el sistema de scroll horizontal de `portfolio-shell.jsx`. No agregar nuevas páginas ni rutas — todo es un SPA de 5 paneles.

## Paleta de diseño actual
- `--paper: #efe7d6` (crema cálido)
- `--ink: #16140f` (tinta oscura)
- `--accent: #e2552e` (naranja quemado)
- `--ui`: dinámico por panel (cambia al scrollear)

## Fonts cargadas (next/font/google)
- `--font-archivo` → display headings
- `--font-space-mono` → mono (kicker, labels)
- `--font-instrument-serif` → clase `.ser` (italic serif accent)

## Sistema reveal
`.reveal` + `data-active="1"` en el panel padre → fade+slide up. Delays: `.d1`=.06s, `.d2`=.12s, `.d3`=.18s, `.d4`=.24s

## Componentes activos
- `portfolio-shell.jsx` — motor de scroll + UI fija
- `hero-panel.jsx`, `about-panel.jsx`, `projects-panel.jsx`, `experience-panel.jsx`, `contact-panel.jsx`
- `localeSwitcher.jsx` — usa Tailwind, debe mantenerse

## Componentes eliminados (eran legacy)
navbar.jsx, transition-provider.jsx, brain.jsx, scroll-to-top.jsx, scrollToTop.jsx, signature.jsx, ui/badge.jsx, ui/card.jsx, ui/button.jsx
