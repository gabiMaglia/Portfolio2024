import { unstable_cache } from 'next/cache';
import { db } from '@/lib/db';
import {
  experience,
  experienceEs,
  proyect,
  proyectEs,
  skills,
  social,
  userPhrases,
  userPhrasesEs,
} from '@portfolio/db';

// D-19: la base (alpha.mkdb.sh) tiene pocas conexiones y cada deploy levanta funciones nuevas
// mientras las viejas siguen conectadas → "too many connections" (53300) y 500 en /es, /en y
// /api/*. Los datos cambian solo cuando el PO corre SQL, así que se cachean (Data Cache de Next,
// compartido entre funciones): la base se consulta como mucho una vez cada REVALIDATE segundos
// por tabla e idioma, no en cada request. Un cambio en la DB tarda hasta REVALIDATE en verse.
export const REVALIDATE = 300;
export const DB_CACHE_TAG = 'portfolio-db';

const cached = (key, fn) => unstable_cache(fn, ['portfolio', key], { revalidate: REVALIDATE, tags: [DB_CACHE_TAG] });

// El idioma es argumento de la función cacheada, así que forma parte de la clave.
export const fetchExperiences = cached('experiences', async (locale = 'en') =>
  locale === 'es' ? db.select().from(experienceEs) : db.select().from(experience));

export const fetchProyects = cached('proyects', async (locale = 'en') =>
  locale === 'es' ? db.select().from(proyectEs) : db.select().from(proyect));

export const fetchSkills = cached('skills', async () => db.select().from(skills));
export const fetchSocials = cached('socials', async () => db.select().from(social));

export const fetchUserPhrases = cached('phrases', async (locale = 'en') =>
  locale === 'es' ? db.select().from(userPhrasesEs) : db.select().from(userPhrases));
