import { NextIntlClientProvider } from 'next-intl';
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

export default async function LocaleLayout({ children, params: { locale } }) {
  const messages = locale === 'en' ? en : es;

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

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LangSync />
      <ToasterProvider />
      <StoreProvider key={locale} data={data}>{children}</StoreProvider>
    </NextIntlClientProvider>
  );
}
