# Portfolio 2024 — Gabriel Maglia

## Monorepo

Es un **monorepo pnpm workspaces + turbo**. El frontend deployado en producción
(https://www.gabrielmaglia.me) es `apps/web/` (`@portfolio/web`) — Vercel tiene
Root Directory = `apps/web` (ver `apps/web/vercel.json`, que hace
`cd ../..` para instalar/buildear desde la raíz del workspace).

```
.
├── apps/
│   ├── web/        # @portfolio/web — Next.js 14 (App Router), el frontend real
│   └── api/         # @portfolio/api — NestJS (backend, fuera del scope de este doc)
├── packages/
│   └── db/          # @portfolio/db — schema Drizzle + client Postgres, compartido
├── portfolio_design/ # HTML standalone de referencia visual (ver abajo)
├── pnpm-workspace.yaml
├── turbo.json
└── package.json      # root del monorepo (scripts turbo), NO es la app
```

No hay ningún árbol Next.js vivo en la raíz del repo: `app/`, `components/`,
`lib/`, `providers/`, `store/`, `messages/`, `i18n/`, etc. viven todos bajo
`apps/web/`.

## Stack (apps/web)
- **Framework**: Next.js 14 (App Router) con `next-intl` para i18n (es/en)
- **Styling**: CSS custom properties + Tailwind CSS v3 (sólo para el LocaleSwitcher)
- **State**: Zustand (store global para datos de DB)
- **DB**: PostgreSQL + Drizzle ORM, vía el paquete compartido `@portfolio/db` (`packages/db`)
- **Fonts**: Archivo (display), Instrument Serif (accents serif/italic), Space Mono (mono)

## Arquitectura de la app (apps/web)

### Rutas
- `apps/web/app/layout.js` — RootLayout: carga fuentes, `globals.css`
- `apps/web/app/[locale]/layout.js` — LocaleLayout: fetch a DB (server component), inyecta datos al store via `StoreProvider`
- `apps/web/app/[locale]/page.jsx` — Renderiza `<PortfolioShell />`
- `apps/web/app/api/*` — Route handlers (experience, phrases, proyects, skills, social, send_email)

### Componentes principales
Todos bajo `apps/web/app/components/`:
- `portfolio-shell.jsx` — Motor de scroll horizontal. Renderiza los 5 panels y el UI fijo (nav, sig, hint, pbar, counter)
- `hero-panel.jsx` — Panel 01: presentación
- `about-panel.jsx` — Panel 02: sobre mí (datos de DB: phrases, skills)
- `projects-panel.jsx` — Panel 03: proyectos (datos de DB: proyects)
- `experience-panel.jsx` — Panel 04: experiencia (datos de DB: experiences)
- `contact-panel.jsx` — Panel 05: contacto (datos de DB: social)
- `localeSwitcher.jsx` — Cambia idioma (es/en), usa Tailwind

### Providers
`apps/web/providers/`:
- `store-provider.jsx` — Inicializa el store de Zustand con datos del servidor
- `toast-provider.jsx` — Proveedor de react-hot-toast

### Store (Zustand)
`apps/web/store/store.js` — Estado global:
- `phrases` — textos del about (main_phrase, phrase1, phrase2, phrase3)
- `proyects` — array de proyectos
- `experiences` — array de experiencias (ordenados por fecha)
- `skill` — skills para los chips del stack
- `social` — redes sociales para la sección de contacto

### DB (Drizzle)
- **Schema y client compartidos**: `packages/db/src/schema.ts` (tablas: Experiences/Experiences_es, Proyects/Proyects_es, Skills, SocialMedia, UserPhrases/UserPhrases_es) y `packages/db/src/client.ts` (`createDb`). Se consumen desde `apps/web` como el paquete de workspace `@portfolio/db` (`"@portfolio/db": "workspace:*"` en `apps/web/package.json`).
- `apps/web/lib/db.js` — Instancia singleton de la conexión, usa `createDb` de `@portfolio/db` con `process.env.DBURL`
- `apps/web/lib/queries.js` — Helpers: `fetchExperiences`, `fetchProyects`, `fetchSkills`, `fetchSocials`, `fetchUserPhrases` (importan las tablas desde `@portfolio/db`)
- ⚠️ `apps/web/lib/schema.js` es un archivo duplicado del schema que **no se usa** en ningún import (`queries.js` importa el schema desde `@portfolio/db`, no desde este archivo). Candidato a limpieza en un ticket futuro; no se tocó en T-004 porque estaba fuera de su alcance (D-01 era sólo sobre la raíz del repo).

## Diseño (portfolio_design/)
El diseño de referencia vive en `portfolio_design/` (raíz del repo, no dentro de `apps/web`). Es un HTML standalone con React via CDN.

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
Desde la raíz del monorepo (usa turbo por debajo):
```bash
pnpm install          # instala dependencias de todo el workspace
pnpm dev               # levanta todas las apps (turbo run dev)
pnpm dev:web           # levanta sólo @portfolio/web (Next.js)
pnpm dev:api           # levanta sólo @portfolio/api (NestJS)
pnpm build             # build de todas las apps/paquetes (turbo run build, respeta dependsOn)
pnpm lint              # lint de todo el workspace
pnpm typecheck         # typecheck de todo el workspace
```
También se puede correr dentro de `apps/web` directamente (`cd apps/web && npm run dev`), pero el flujo recomendado es desde la raíz con `pnpm`.

## i18n
- Mensajes en `apps/web/messages/es.json` y `apps/web/messages/en.json`
- Config de `next-intl` en `apps/web/i18n/request.js`, `apps/web/i18n.js` y `apps/web/middleware.js`
- Las claves de traducción usadas: `Navbar.*`, `About.title`, `Work.*`, `Experience.title`, `Contact.*`
