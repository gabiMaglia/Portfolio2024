# Gabriel Maglia — Portfolio · Handoff para implementación

## Descripción

Portfolio con recorrido horizontal: el scroll vertical del usuario se traduce en movimiento lateral suave entre 5 paneles a pantalla completa. Cada sección alterna fondo (crema / tinta / acento naranja) para máximo contraste. Hay parallax por capas, reveal de entrada, barra de progreso, navegación fija y un panel de Tweaks para cambiar paleta y tipografía en vivo.

---

## Estructura de archivos

```
portfolio/
├── index.html          ← Punto de entrada. Tokens CSS, estilos globales, carga de scripts
├── data.js             ← TODO el contenido editable (nombre, proyectos, experiencia, etc.)
├── sections.jsx        ← Los 5 paneles: Hero, Sobre mí, Proyectos, Experiencia, Contacto
├── app.jsx             ← Motor de scroll + UI fija (nav, barra, contador) + Tweaks
├── image-slot.js       ← Web component drag-and-drop para fotos (no tocar)
└── tweaks-panel.jsx    ← Shell del panel de Tweaks (no tocar)
```

---

## Lo que el dev necesita hacer en producción

### 1 · Reemplazar React/Babel standalone por un bundler real

El prototipo usa React 18 + Babel via CDN (in-browser transpile). En producción:

**Con Next.js (recomendado)**
```bash
npx create-next-app@latest gabriel-portfolio --typescript --tailwind false --app
```
Copiar la lógica de `sections.jsx` y `app.jsx` como componentes de Next.js. El motor de scroll va en un Client Component (`"use client"`).

**Con Vite + React**
```bash
npm create vite@latest gabriel-portfolio -- --template react-ts
```
Mover los `.jsx` a `src/`, importarlos normalmente. Sin Babel standalone.

---

### 2 · El único archivo que Gabriel edita: `data.js`

Toda la info personal está centralizada en `window.PORTFOLIO_DATA`. El dev solo tiene que convertirlo a un módulo ES/TS:

```ts
// src/data.ts
export const PORTFOLIO_DATA = {
  name: "Gabriel Maglia",
  // ... igual que data.js, pero como export en vez de window.PORTFOLIO_DATA
}
```

**Campos a completar (marcados con `[ ]`):**

| Campo | Dónde | Qué poner |
|---|---|---|
| `projects.items[n].name` | data.js → projects | Nombre real del proyecto |
| `experience.items[n].role` | data.js → experience | Rol (ej: "Frontend Developer") |
| `experience.items[n].company` | data.js → experience | Empresa (ej: "Acme Corp") |
| `contact.links[1].href` | data.js → contact | URL real de LinkedIn |
| `contact.links[2].href` | data.js → contact | URL real del CV en PDF |

---

### 3 · Imágenes de proyectos

En el prototipo, cada proyecto tiene un `<image-slot>` con drag-and-drop. En producción, reemplazar con `<img>` normales:

```tsx
// Prototipo (placeholder):
<image-slot id="proj-1" shape="rounded" ... />

// Producción:
<img src="/projects/proyecto-1.jpg" alt="Nombre del proyecto"
     style={{ width:'100%', height:'clamp(150px,22vh,230px)', objectFit:'cover', borderRadius:8 }} />
```

Fotos recomendadas: **screenshots de la app**, o mockups en dispositivo. Resolución mínima: 800×500px.

---

### 4 · Foto de retrato (sección Sobre mí)

```tsx
// Reemplazar:
<image-slot id="about-portrait" ... />

// Por:
<img src="/foto-gabriel.jpg" alt="Gabriel Maglia"
     style={{ width:'100%', height:'min(58vh,560px)', objectFit:'cover', borderRadius:8 }} />
```

---

### 5 · Fuentes (Google Fonts)

El portfolio carga estas familias:

| Variable CSS | Familia | Uso |
|---|---|---|
| `--font-display` | Archivo (800, 900) | Titulares gigantes |
| `--font-serif` | Instrument Serif (italic) | Acentos editoriales |
| `--font-mono` | Space Mono | Kickers, etiquetas, UI |

Alternativas disponibles en Tweaks: **Syne**, **Space Grotesk** (ya preconectadas).

En Next.js con `next/font`:
```ts
import { Archivo, Instrument_Serif, Space_Mono } from 'next/font/google'
```

---

### 6 · Tokens de color (CSS Custom Properties)

```css
:root {
  --paper:      #efe7d6;   /* fondo cálido */
  --ink:        #16140f;   /* tinta oscura */
  --accent:     #e2552e;   /* naranja quemado */
  --accent-ink: #16140f;   /* texto sobre el acento */
  --font-display: "Archivo", system-ui, sans-serif;
  --font-serif:   "Instrument Serif", Georgia, serif;
  --font-mono:    "Space Mono", ui-monospace, monospace;
  --ease:       cubic-bezier(.16,1,.3,1);
  --frame:      clamp(18px,2.2vw,38px);
}
```

---

### 7 · El motor de scroll

El algoritmo central está en `app.jsx → useEffect (MOTOR de scroll)`:

- Crea un spacer invisible con altura `(N-1) × 100vh × 1.08` para generar scroll vertical
- En cada `requestAnimationFrame`, lee `window.scrollY`, calcula la fracción `f ∈ [0,1]`
- Aplica `translateX(-f × travel)` al track con lerp suave (`curX += (target - cur) * 0.10`)
- Cada panel recibe `--d` (distancia al centro) para parallax de capas
- Compatible con trackpad horizontal: `deltaX` se redirige a scroll vertical

En Next.js esto va en un `useEffect` dentro de un `"use client"` component. No usar `<Suspense>` sin SSR guard en las refs.

---

### 8 · Animaciones de reveal

Cada elemento con clase `.reveal` arranca invisible (`opacity:0, translateY:24px`). Cuando su panel recibe `data-active="1"`, CSS lo anima a estado final. Las clases `.d1`–`.d4` escalonan el delay 60ms por paso.

En React, el equivalente es pasar un prop `isActive` al panel y usar `framer-motion` o CSS classes:

```tsx
<h1 className={`display ${isActive ? 'visible' : 'reveal'}`}>…</h1>
```

---

### 9 · Paletas disponibles (Tweaks)

| Nombre | Paper | Ink | Accent |
|---|---|---|---|
| Naranja quemado | #efe7d6 | #16140f | #e2552e |
| Verde oliva | #ece7d6 | #14160f | #7e8b2c |
| Azul cobalto | #e9e9ea | #11141d | #2f5bd6 |
| Lima ácido | #ece7da | #0f0f0d | #c6e04a |

---

### 10 · SEO / meta tags

Agregar en `<head>` de producción:
```html
<meta name="description" content="Gabriel Maglia — Desarrollador de aplicaciones fullstack. React, Next.js, React Native." />
<meta property="og:title" content="Gabriel Maglia — Portfolio" />
<meta property="og:description" content="Fullstack Developer · Frontend con alma de producto." />
<meta property="og:image" content="/og-image.png" />
<meta name="theme-color" content="#16140f" />
<link rel="icon" href="/favicon.ico" />
```

---

## Checklist de implementación

- [ ] Crear proyecto Next.js/Vite
- [ ] Convertir `data.js` a módulo TS con datos reales
- [ ] Reemplazar placeholders `[ ]` con info real de Gabriel
- [ ] Agregar imágenes de proyectos
- [ ] Agregar foto de retrato
- [ ] Configurar fuentes con `next/font` o CDN
- [ ] Agregar meta tags / OG / favicon
- [ ] Deploy (Vercel recomendado para Next.js)

---

## Contacto del diseño

Este prototipo fue generado como spec de implementación. El diseño está completo — el dev solo tiene que portar la lógica a su stack sin cambiar estilos, tokens ni estructura de paneles.
