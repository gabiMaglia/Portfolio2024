// Fuente única de lo que el sitio dice de sí mismo a buscadores y redes (T-028):
// URL canónica, locales, alternates hreflang y el grafo JSON-LD de la persona.
export const SITE_URL = 'https://www.gabrielmaglia.me';
export const SITE_NAME = 'Gabriel Maglia';
export const LOCALES = ['es', 'en'];
export const DEFAULT_LOCALE = 'es';
export const OG_LOCALE = { es: 'es_AR', en: 'en_US' };

export const isLocale = (locale) => LOCALES.includes(locale);
export const localeUrl = (locale) => `${SITE_URL}/${locale}`;

// x-default apunta a la raíz: el middleware la redirige según el idioma del visitante
export const languageAlternates = () => ({
  ...Object.fromEntries(LOCALES.map((l) => [l, localeUrl(l)])),
  'x-default': `${SITE_URL}/`,
});

const absolute = (src) => (!src ? undefined : /^https?:\/\//.test(src) ? src : `${SITE_URL}${src.startsWith('/') ? '' : '/'}${src}`);

// Sólo perfiles públicos navegables: mailto y vacíos no son identidades para sameAs
export const sameAsOf = (socials = []) =>
  socials.map((s) => s?.url?.trim()).filter((url) => url && /^https?:\/\//.test(url));

export function personJsonLd({ locale, meta, socials = [], skills = [], projects = [] }) {
  const page = localeUrl(locale);
  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: SITE_NAME,
    givenName: 'Gabriel',
    familyName: 'Maglia',
    url: page,
    jobTitle: meta.jobTitle,
    description: meta.description,
    address: { '@type': 'PostalAddress', addressCountry: 'AR' },
    sameAs: sameAsOf(socials),
    knowsAbout: skills.filter((s) => s?.type === 'hard' && s.name).map((s) => s.name),
  };
  // mismo orden que el panel de Trabajos (order_pro; sin orden, al final)
  const rank = (p) => (Number.isFinite(p?.order_pro) ? p.order_pro : Infinity);
  const works = [...projects]
    .filter((p) => p?.title_pro)
    .sort((a, b) => rank(a) - rank(b))
    .map((p) => ({
      '@type': 'CreativeWork',
      name: p.title_pro,
      description: p.description_pro || undefined,
      url: p.deployLink_pro || p.githubLink_pro || undefined,
      image: absolute(p.img1_pro || p.img2_pro || p.img3_pro),
      dateCreated: p.year_pro ? String(p.year_pro) : undefined,
      keywords: p.technologies_pro || undefined,
      creator: { '@id': person['@id'] },
    }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: SITE_NAME, inLanguage: LOCALES },
      person,
      {
        '@type': 'ProfilePage',
        '@id': `${page}#profile`,
        url: page,
        name: meta.title,
        inLanguage: locale,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': person['@id'] },
        hasPart: works,
      },
    ],
  };
}

// JSON dentro de <script>: escapar `<` evita que un dato de la DB cierre el tag
export const serializeJsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');
