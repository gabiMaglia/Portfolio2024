# AGENTS.md

## Purpose
This file helps AI coding agents understand the Portfolio2024 codebase quickly and make safe, effective edits.

## Project overview
- Next.js 14 app router project using `app/` routes.
- Internationalized with `next-intl` and locale-prefixed routing.
- Uses Tailwind CSS, Framer Motion, Radix UI utilities, `drizzle-orm` with PostgreSQL, and Nodemailer for email sending.
- Frontend is mostly in `app/[locale]/page.jsx` and `app/components/`.
- Server-side API endpoints live under `app/api/*/route.js`.

## Key commands
- `npm run dev` — start development server
- `npm run build` — production build
- `npm run start` — start built app
- `npm run lint` — run Next.js ESLint

## Important files and conventions
- `app/layout.js` — root HTML layout and font setup
- `app/page.js` — redirects `/` to the default localized route
- `middleware.js` — next-intl locale middleware with `locales: ['es','en']`
- `i18n.js` — locale lookup and messages import
- `app/[locale]/page.jsx` — client-rendered homepage shell, theme toggle, and main section composition
- `app/api/*/route.js` — server route handlers using `NextResponse`
- `lib/db.js` — shared `drizzle-orm` Postgres client cached on `globalThis`
- `lib/queries.js` — reusable database query helpers

## Environment variables
- `DBURL` — PostgreSQL connection string for `lib/db.js`
- `NODEMAILER_USER` — email sender account
- `NODEMAILER_PASSWORD` — email sender password
- `EMAIL_RECEIVER` — optional recipient for contact form emails

## Known issues to watch for
- `middleware.js` uses `defaultLocale: 'es'`, while `i18n.js` uses `defaultLocale: 'en'`; locale defaults may need alignment.
- `app/[locale]/page.jsx` has a theme effect that writes `'dark'` to localStorage even when `isDarkMode` is false.

## What agents should do first
- Preserve existing localization flow before changing locale defaults.
- Keep API route patterns consistent with Next.js `app` router conventions.
- Use `lib/queries.js` and `lib/db.js` for database access rather than adding raw SQL connections in UI code.
- Prefer editing components in `app/components/` and `app/[locale]/page.jsx` for UI changes.

## When to ask for clarification
- If a requested change affects locale behavior, confirm whether the source of truth is `middleware.js` or `i18n.js`.
- If a requested change touches email sending, confirm current env var usage and whether it should be updated to a more secure service.
- If a requested change adds new database tables or queries, verify schema usage in `lib/schema.js` and route data flows.
