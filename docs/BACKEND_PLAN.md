# Plan de implementación — Backend de edición (NestJS) + Monorepo

> Documento de implementación para ejecutar en una sesión de Sonnet.
> Escrito desde el rol de dev backend senior en NestJS.

## 0. Contexto y objetivo

El portfolio (Next.js 14) hoy **lee** la DB directamente con Drizzle desde server components
(`lib/queries.js`). No existe forma de **crear/editar** contenido.

Objetivo: un **BE en NestJS, solo-API REST**, que corre **localmente** y permite hacer CRUD
de todo el contenido de la DB. El front NO cambia su forma de leer (sigue server-side directo).
El Nest es una herramienta de edición que pega contra el **mismo Postgres remoto**.

### Decisiones ya tomadas (no re-discutir)
| Tema | Decisión |
|------|----------|
| Estructura | Monorepo **Turborepo + pnpm workspaces** |
| BE | NestJS, **solo API REST** (sin UI admin) |
| ORM | **Drizzle compartido** — el schema es única fuente de verdad |
| Imágenes | **Solo URLs** (campos text, se pega el link). Sin upload/storage |
| Auth | **API key en header** (`x-api-key`). GET público, escritura protegida |
| Deploy | **Solo local**. No deploy, no Dockerfile obligatorio |
| LLM-ready | API autodescriptiva: Swagger/OpenAPI completo en `/docs` + `/docs-json` |

---

## 1. ⚠️ Pre-requisito de seguridad (hacer ANTES de empezar)

El `.env` actual tiene credenciales reales en texto plano (DBURL, Gmail app-password, EmailJS keys).
**Antes de tocar nada:**
1. Verificar si `.env` está en git (`git log --all --full-history -- .env`). Si está trackeado → rotar
   TODAS las credenciales (password de la DB en mkdb.sh, app-password de Gmail) y removerlo del historial.
2. Confirmar que `.env` está en `.gitignore` (a nivel root del monorepo y por app).
3. La `API_KEY` nueva del Nest debe ser un valor random fuerte (`openssl rand -hex 32`), nunca commiteado.

---

## 2. Estructura final del monorepo

```
Portfolio2024/                      # raíz del monorepo
├── package.json                    # scripts root + devDeps de turbo/pnpm
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json              # config TS compartida
├── .gitignore
├── apps/
│   ├── web/                        # ← el Next.js actual, movido tal cual
│   │   └── (todo lo que hoy está en la raíz: app/, components/, providers/, etc.)
│   └── api/                        # ← NestJS nuevo
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   ├── common/
│       │   │   ├── guards/api-key.guard.ts
│       │   │   ├── decorators/public.decorator.ts
│       │   │   └── dto/locale-query.dto.ts
│       │   ├── db/
│       │   │   └── db.module.ts    # provee la instancia de drizzle (DI)
│       │   └── modules/
│       │       ├── experiences/
│       │       ├── projects/
│       │       ├── skills/
│       │       ├── socials/
│       │       └── phrases/
│       ├── .env                    # DBURL + API_KEY (NO commitear)
│       ├── nest-cli.json
│       ├── tsconfig.json
│       └── package.json
└── packages/
    └── db/                         # ← schema Drizzle compartido (fuente de verdad)
        ├── src/
        │   ├── schema.ts           # migrado desde lib/schema.js → TS
        │   ├── client.ts           # factory del cliente postgres+drizzle
        │   └── index.ts            # barrel: export * schema + tipos
        ├── drizzle.config.ts       # para drizzle-kit (migraciones/introspección)
        ├── tsconfig.json
        └── package.json            # name: "@portfolio/db"
```

**Nombre de los packages:** `@portfolio/db`, `@portfolio/web`, `@portfolio/api`.

---

## 3. Fases de implementación (orden de ejecución para Sonnet)

### Fase 1 — Andamiaje del monorepo
1. Crear `pnpm-workspace.yaml`:
   ```yaml
   packages:
     - "apps/*"
     - "packages/*"
   ```
2. `turbo.json` con pipeline básico (`dev`, `build`, `lint`). `dev` con `"cache": false, "persistent": true`.
3. `package.json` root: `packageManager`, scripts `dev`/`build` que delegan a turbo, devDeps `turbo`.
4. `tsconfig.base.json` con paths y `strict: true`.
5. **No mover el Next todavía** — primero armar `packages/db` y `apps/api` para validar, luego mover web.

### Fase 2 — `packages/db` (schema compartido)
1. Migrar `lib/schema.js` → `packages/db/src/schema.ts` **sin cambios de tablas/columnas**
   (mantener nombres exactos: `Experiences`, `Experiences_es`, `Proyects`, `Proyects_es`,
   `Skills`, `SocialMedia`, `UserPhrases`, `UserPhrases_es`).
2. Exportar además los tipos inferidos para DTOs y type-safety:
   ```ts
   import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
   export type Experience = InferSelectModel<typeof experience>;
   export type NewExperience = InferInsertModel<typeof experience>;
   // ...idem cada tabla
   ```
3. `client.ts` — factory reutilizable (mismo patrón que `lib/db.js`, con singleton global):
   ```ts
   import { drizzle } from 'drizzle-orm/postgres-js';
   import postgres from 'postgres';
   import * as schema from './schema';

   export function createDb(url: string) {
     const client = postgres(url, { max: 1, idle_timeout: 30 });
     return drizzle(client, { schema });
   }
   export type DB = ReturnType<typeof createDb>;
   ```
4. `index.ts` barrel: `export * from './schema'; export * from './client';`
5. `drizzle.config.ts` apuntando a `src/schema.ts` para poder usar `drizzle-kit` si hace falta.

### Fase 3 — `apps/api` (NestJS)
1. Scaffold Nest (`nest new` o manual) dentro de `apps/api`. Agregar `@portfolio/db` como dependencia
   de workspace (`"@portfolio/db": "workspace:*"`).
2. **DbModule** (global) que provee la instancia de drizzle por DI:
   ```ts
   import { Global, Module } from '@nestjs/common';
   import { createDb } from '@portfolio/db';
   import { ConfigService } from '@nestjs/config';

   export const DB = Symbol('DB');

   @Global()
   @Module({
     providers: [{
       provide: DB,
       inject: [ConfigService],
       useFactory: (config: ConfigService) => createDb(config.getOrThrow('DBURL')),
     }],
     exports: [DB],
   })
   export class DbModule {}
   ```
3. **ConfigModule** global (`@nestjs/config`) leyendo `apps/api/.env`.
4. **ApiKeyGuard** global: permite cualquier `GET`; para `POST/PUT/PATCH/DELETE` exige
   `x-api-key === process.env.API_KEY`. Un `@Public()` decorator opcional para excepciones.
   ```ts
   @Injectable()
   export class ApiKeyGuard implements CanActivate {
     constructor(private config: ConfigService) {}
     canActivate(ctx: ExecutionContext): boolean {
       const req = ctx.switchToHttp().getRequest();
       if (req.method === 'GET') return true;           // lectura pública
       const key = req.headers['x-api-key'];
       if (key && key === this.config.getOrThrow('API_KEY')) return true;
       throw new UnauthorizedException('Missing or invalid x-api-key');
     }
   }
   ```
   Registrar como `APP_GUARD` global en `app.module.ts`.
5. **ValidationPipe global** en `main.ts`: `{ whitelist: true, forbidNonWhitelisted: true, transform: true }`.
6. **CORS** habilitado en `main.ts` (al ser local + posible consumo desde herramientas).

### Fase 4 — Módulos CRUD
Patrón idéntico por recurso: `*.module.ts`, `*.controller.ts`, `*.service.ts`, `dto/`.

**Recursos NO localizados** (CRUD directo): `skills` (tabla `Skills`), `socials` (tabla `SocialMedia`).

**Recursos localizados** (es/en en tablas separadas): `experiences`, `projects`, `phrases`.
- Manejar el idioma con query param `?locale=es|en` (default `en`, igual que `lib/queries.js`).
- Validar con un `LocaleQueryDto` (`@IsIn(['es','en'])`).
- En el service, un **resolver de tabla** mapea `locale → tabla Drizzle`:
  ```ts
  private table(locale: 'es' | 'en') {
    return locale === 'es' ? experienceEs : experience;
  }
  ```

**Operaciones Drizzle (referencia rápida):**
```ts
// list
this.db.select().from(table);
// one
this.db.select().from(table).where(eq(table.id, id));
// create
this.db.insert(table).values(dto).returning();
// update
this.db.update(table).set(dto).where(eq(table.id, id)).returning();
// delete
this.db.delete(table).where(eq(table.id, id)).returning();
```
- `update`/`delete` deben tirar `NotFoundException` si `returning()` viene vacío.

**DTOs** con `class-validator` + `@ApiProperty` (para Swagger):
- `Create*Dto`: todos los campos del schema (sin `id`), con `@IsString()/@IsOptional()/@IsInt()` según corresponda. `Skills.amount` es `integer` → `@IsInt() @Min(0)`.
- `Update*Dto extends PartialType(Create*Dto)` (de `@nestjs/swagger` → mantiene metadata Swagger).

**Caso `phrases`:** la app usa `phrases[0]` (es prácticamente un singleton).
Igual exponerlo como colección estándar (`GET/POST/PUT/DELETE /phrases?locale=`) por consistencia
y para que el LLM lo trate como cualquier otro recurso.

### Fase 5 — Swagger / OpenAPI (la parte "LLM-ready")
En `main.ts`:
```ts
const config = new DocumentBuilder()
  .setTitle('Portfolio Content API')
  .setDescription('CRUD de todo el contenido del portfolio. GET público, escritura con x-api-key.')
  .setVersion('1.0')
  .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'api-key')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);   // UI en /docs
// /docs-json queda expuesto automáticamente → spec ingerible por un LLM / wrapper MCP
```
Convenciones para que un agente la consuma sin fricción:
- Nombres de recurso en plural y consistentes.
- `@ApiProperty({ example: ... })` en cada campo del DTO (el LLM aprende el shape por ejemplos).
- `@ApiQuery({ name: 'locale', enum: ['es','en'] })` documentado en los recursos localizados.
- Errores con shape estándar de Nest (`statusCode`, `message`, `error`).
- Marcar las rutas protegidas con `@ApiSecurity('api-key')`.

> Nota futura (no hacer ahora): este `/docs-json` se puede envolver en un server MCP o en
> function-calling de OpenAI para que un LLM edite contenido conversando. La API ya queda lista.

### Fase 6 — Migrar el Next a `apps/web`
1. Mover todo el proyecto Next actual a `apps/web/` (app/, components/, providers/, store/,
   lib/, messages/, public/, configs de next/tailwind/postcss, package.json).
2. **Borrar** `apps/web/lib/schema.js` y reemplazar su uso: `lib/queries.js` y `lib/db.js`
   importan desde `@portfolio/db` en vez del schema local.
   - Agregar `"@portfolio/db": "workspace:*"` al `package.json` de web.
   - `lib/db.js` puede usar `createDb(process.env.DBURL)` del package compartido.
   - `lib/queries.js` importa las tablas (`experience`, `proyectEs`, etc.) desde `@portfolio/db`.
3. Si Next se queja de transpilar el package del workspace, agregar
   `transpilePackages: ['@portfolio/db']` en `next.config.mjs`.
4. Verificar que `npm run dev` (turbo) levanta web y que sigue leyendo igual que antes.

### Fase 7 — Validación end-to-end
1. `pnpm --filter @portfolio/api start:dev` → Nest en `localhost:3001` (web en 3000).
2. Abrir `/docs`, probar un `GET /experiences?locale=es` (sin key) → 200.
3. Probar `POST /skills` sin key → 401. Con `x-api-key` correcta → 201 y `returning()` con el row.
4. Editar un registro real, recargar el front → el cambio se ve (misma DB).
5. Confirmar `DELETE` inexistente → 404.

---

## 4. Tabla de endpoints

| Método | Ruta | Auth | Notas |
|--------|------|------|-------|
| GET | `/experiences?locale=` | público | lista |
| GET | `/experiences/:id?locale=` | público | uno |
| POST | `/experiences?locale=` | x-api-key | crea |
| PUT | `/experiences/:id?locale=` | x-api-key | edita |
| DELETE | `/experiences/:id?locale=` | x-api-key | borra |
| … | `/projects` (idem, localizado) | | |
| … | `/phrases` (idem, localizado) | | |
| GET/POST/PUT/DELETE | `/skills` | GET público / resto x-api-key | NO localizado |
| GET/POST/PUT/DELETE | `/socials` | GET público / resto x-api-key | NO localizado |
| GET | `/docs` · `/docs-json` | público | Swagger UI + spec OpenAPI |

---

## 5. Variables de entorno

`apps/api/.env` (NO commitear):
```
DBURL=postgresql://...        # mismo Postgres que usa el front
API_KEY=<openssl rand -hex 32>
PORT=3001
```
`apps/web/.env` (ya existe, mantener): `DBURL`, vars de nodemailer/emailjs.

---

## 6. Dependencias a instalar

**`packages/db`:** `drizzle-orm`, `postgres`; dev: `drizzle-kit`, `typescript`.

**`apps/api`:** `@nestjs/common @nestjs/core @nestjs/platform-express @nestjs/config @nestjs/swagger`,
`class-validator class-transformer`, `drizzle-orm postgres`, `@portfolio/db (workspace:*)`,
`reflect-metadata rxjs`; dev: `@nestjs/cli typescript ts-node`.

**root:** `turbo` (dev).

---

## 7. Convenciones / gotchas

- **No renombrar tablas ni columnas** del schema — el front en producción depende de esos nombres exactos.
- Drizzle con `postgres-js` no necesita pool grande para uso local: `max: 1` está bien.
- `PartialType` para Update tomarlo de **`@nestjs/swagger`**, no de `@nestjs/mapped-types`, para no perder metadata de la doc.
- El `ValidationPipe` con `forbidNonWhitelisted` evita que un LLM mande campos basura.
- Mantener IDs como `uuid` (el schema usa `defaultRandom()`); el cliente no manda `id` en create.
- `Skills.amount` es el único campo `integer`; el resto es `text`. Tiparlo bien en el DTO.
```
