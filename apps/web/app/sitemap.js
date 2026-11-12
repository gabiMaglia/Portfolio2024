import { APPS } from '@/lib/apps.mjs';
import { LOCALES, SITE_URL, languageAlternates, localeUrl } from '@/lib/site.mjs';

// Una entrada por idioma, cada una con sus alternates: hreflang recíproco también en el sitemap
export default function sitemap() {
  const lastModified = new Date();
  const languages = languageAlternates();
  return [
    ...LOCALES.map((locale) => ({
      url: localeUrl(locale),
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages },
    })),
    { url: `${SITE_URL}/apps`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    // Landings servidas por rewrite: su canonical es gabrielmaglia.me/apps/<nombre>/ (T-017..T-020)
    ...APPS.map((app) => ({ url: `${SITE_URL}${app.href}`, lastModified, changeFrequency: 'monthly', priority: 0.5 })),
  ];
}
