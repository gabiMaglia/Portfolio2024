# Portfolio 2024 — Gabriel Maglia

## Stack
- **Framework**: Next.js 14 (App Router) con `next-intl` para i18n (es/en)
- **Styling**: CSS custom properties + Tailwind CSS v3 (sólo para el LocaleSwitcher)
- **State**: Zustand (store global para datos de DB)
- **DB**: PostgreSQL + Drizzle ORM
- **Fonts**: Archivo (display), Instrument Serif (accents serif/italic), Space Mono (mono)

## Arquitectura de la app

### Rutas
- `app/layout.js` — RootLayout: carga fuentes, globals.css
- `app/[locale]/layout.js` — LocaleLayout: fetch a DB (server component), inyecta datos al store via `StoreProvider`
- `app/[locale]/page.jsx` — Renderiza `<PortfolioShell />`

### Componentes principales
- `app/components/portfolio-shell.jsx` — Motor de scroll horizontal. Renderiza los 5 panels y el UI fijo (nav, sig, hint, pbar, counter)
- `app/components/hero-panel.jsx` — Panel 01: presentación
- `app/components/about-panel.jsx` — Panel 02: sobre mí (datos de DB: phrases, skills)
- `app/components/projects-panel.jsx` — Panel 03: proyectos (datos de DB: proyects)
- `app/components/experience-panel.jsx` — Panel 04: experiencia (datos de DB: experiences)
- `app/components/contact-panel.jsx` — Panel 05: contacto (datos de DB: social)
- `app/components/localeSwitcher.jsx` — Cambia idioma (es/en), usa Tailwind

### Providers
- `providers/store-provider.jsx` — Inicializa el store de Zustand con datos del servidor
- `providers/toast-provider.jsx` — Proveedor de react-hot-toast

### Store (Zustand)
`store/store.js` — Estado global:
- `phrases` — textos del about (main_phrase, phrase1, phrase2, phrase3)
- `proyects` — array de proyectos
- `experiences` — array de experiencias (ordenados por fecha)
- `skill` — skills para los chips del stack
- `social` — redes sociales para la sección de contacto

### DB (Drizzle, lib/)
- `lib/schema.js` — Tablas: Experiences/Experiences_es, Proyects/Proyects_es, Skills, SocialMedia, UserPhrases/UserPhrases_es
- `lib/queries.js` — Helpers: fetchExperiences, fetchProyects, fetchSkills, fetchSocials, fetchUserPhrases
- `lib/db.js` — Conexión DB

## Diseño (portfolio_design/)
El diseño de referencia vive en `portfolio_design/`. Es un HTML standalone con React via CDN.

### CSS tokens
```css
--paper: #efe7d6      /* fondo claro */
--ink:   #16140f      /* tinta oscura */
--accent: #e2552e     /* naranja quemado */
--ui: var(--ink|--paper)  /* color del UI fijo, cambia por panel */
--frame: clamp(18px, 2.2vw, 38px)
```

### Sistema de scroll
- El `#stage` es `position: fixed` con overflow hidden
- `#track` se mueve horizontalmente via `transform: translate3d()`
- `#spacer` crea el scroll vertical que impulsa el viaje horizontal
- El active panel se detecta por `Math.round(f * (N-1))`
- El `--ui` se actualiza via `document.documentElement.style.setProperty`

### Sistema reveal
- Los elementos con `.reveal` empiezan `opacity:0; transform:translateY(24px)`
- Cuando el panel padre recibe `data-active="1"`, los `.reveal` transicionan a visible
- `.d1`, `.d2`, `.d3`, `.d4` dan delays escalonados (0.06s, 0.12s, 0.18s, 0.24s)

### Paralaje
- `.pll-back` — se mueve `calc(var(--d) * 9vw)` en X
- `.pll-mid` — se mueve `calc(var(--d) * 4.5vw)`
- `.pll-fore` — se mueve `calc(var(--d) * -2.2vw)` (en sentido contrario)
- `--d` es el delta del panel (0 = centrado, positivo = a la derecha)

## Datos: DB vs hardcodeado

### Viene de DB
| Dato | Store key | Usado en |
|------|-----------|---------|
| Frases/bio | `phrases.mainPhrase`, `.phrase1` | AboutPanel |
| Stack chips | `skill` (type==="hard") | AboutPanel |
| Proyectos | `proyects` | ProjectsPanel |
| Experiencias | `experiences` | ExperiencePanel |
| Redes sociales | `social` | ContactPanel |

### Hardcodeado
| Dato | Componente | Valor |
|------|-----------|-------|
| Nombre | HeroPanel, Shell | "Gabriel Maglia" |
| Tagline hero | HeroPanel | "Diseño y construyo aplicaciones de principio a fin." |
| Stats about | AboutPanel | "+4 años", "∞ ganas" |
| Email | ContactPanel | "Gab.Maglia@gmail.com" |
| Ubicación | HeroPanel | "Argentina" |

## Comandos
```bash
npm run dev    # desarrollo
npm run build  # build producción
```

## i18n
- Mensajes en `messages/es.json` y `messages/en.json`
- Las claves de traducción usadas: `Navbar.*`, `About.title`, `Work.*`, `Experience.title`, `Contact.*`
