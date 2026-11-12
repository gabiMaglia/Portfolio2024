import en from '@/messages/en.json';
import { fetchExperiences, fetchProyects, fetchSocials } from '@/lib/queries';
import { buildLlmsTxt } from '@/lib/llms.mjs';

// D-22: /llms.txt se arma con los mismos datos (cacheados 300 s) que el portfolio. Si la DB no
// responde (D-19) sale igual, con las secciones apuntando al sitio, nunca un 500.
export const dynamic = 'force-dynamic';

const settle = (p) => p.then((v) => v ?? [], () => []);

export async function GET() {
  const [projects, experiences, socials] = await Promise.all([
    settle(fetchProyects('en')),
    settle(fetchExperiences('en')),
    settle(fetchSocials()),
  ]);
  const body = buildLlmsTxt({
    projects,
    experiences,
    socials,
    description: en.Meta.description,
    presentLabel: en.Experience.present,
  });
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
