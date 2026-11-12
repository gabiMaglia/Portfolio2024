import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import es from '@/messages/es.json';
import en from '@/messages/en.json';

import LangSync from '@/app/components/lang-sync';
import StoreProvider from '@/providers/store-provider';
import { ToasterProvider } from '@/providers/toast-provider';

import {
  fetchExperiences,
  fetchProyects,
  fetchSkills,
  fetchSocials,
  fetchUserPhrases
} from '@/lib/queries';
import { OG_LOCALE, LOCALES, SITE_NAME, isLocale, languageAlternates, personJsonLd, serializeJsonLd } from '@/lib/site.mjs';

// Render dinámico por request: el layout raíz lee el locale del header que setea el middleware
// (getLocale), así que la ruta nunca es estática ni con `revalidate` (verificado en T-011+013:
// Cache-Control no-store con y sin force-dynamic). Sin generateStaticParams: el "● SSG" del
// build era un espejismo (no se prerenderiza nada). Pasar a ISR exige sacar el header del
// layout raíz (setRequestLocale), ver ADR-003; ahí también habría que resincronizar el store.
export const dynamic = 'force-dynamic';

import PropTypes from 'prop-types';

LocaleLayout.propTypes = {
  children: PropTypes.node.isRequired,
  params: PropTypes.shape({
    locale: PropTypes.string.isRequired
  }).isRequired
};

const messagesOf = (locale) => (locale === 'en' ? en : es);

// T-028: título, descripción, canonical y hreflang propios de cada idioma. og:image y
// twitter:image los agregan opengraph-image.jsx / twitter-image.jsx de este segmento.
export function generateMetadata({ params: { locale } }) {
  if (!isLocale(locale)) return {};
  const { title, description } = messagesOf(locale).Meta;
  return {
    title,
    description,
    alternates: { canonical: `/${locale}`, languages: languageAlternates() },
    openGraph: {
      type: 'profile',
      url: `/${locale}`,
      siteName: SITE_NAME,
      title,
      description,
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      firstName: 'Gabriel',
      lastName: 'Maglia',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function LocaleLayout({ children, params: { locale } }) {
  // Sin esto `[locale]` acepta cualquier segmento (/robots.txt, /x.png) y responde 200 con la
  // página entera: soft-404 para los buscadores
  if (!isLocale(locale)) notFound();
  const messages = messagesOf(locale);

  const [experiences, proyects, skills, socials, phrases] = await Promise.all([
    fetchExperiences(locale),
    fetchProyects(locale),
    fetchSkills(),
    fetchSocials(),
    fetchUserPhrases(locale)
  ]);

  const data = {
    data: phrases?.[0] ?? null,
    socialData: socials ?? [],
    restOfData: {
      experiences: experiences ?? [],
      proyects: proyects ?? [],
      skills: skills ?? []
    }
  };

  const jsonLd = personJsonLd({
    locale,
    meta: messages.Meta,
    socials: socials ?? [],
    skills: skills ?? [],
    projects: proyects ?? []
  });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <LangSync />
      <ToasterProvider />
      <StoreProvider key={locale} data={data}>{children}</StoreProvider>
    </NextIntlClientProvider>
  );
}
