// app/[locale]/layout.jsx
import { NextIntlClientProvider } from 'next-intl';
import es from '@/messages/es.json';
import en from '@/messages/en.json';

import StoreProvider from '@/providers/store-provider';
import { ToasterProvider } from '@/providers/toast-provider';
import { ScrollToTop } from '@/components/scrollToTop';

import {
  fetchExperiences,
  fetchProyects,
  fetchSkills,
  fetchSocials,
  fetchUserPhrases
} from '@/lib/queries';

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

export default async function LocaleLayout({ children, params: { locale } }) {
  const messages = locale === 'en' ? en : es;

  // tus datos YA localizados (plan A de DB)
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
      <ToasterProvider />
      <ScrollToTop />
      <StoreProvider data={data} />
      {children}
    </NextIntlClientProvider>
  );
}
