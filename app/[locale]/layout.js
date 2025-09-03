// app/[locale]/layout.jsx
import {NextIntlClientProvider} from 'next-intl';
import {
  fetchExperiences,
  fetchProyects,
  fetchSkills,
  fetchSocials,
  fetchUserPhrases
} from '@/lib/queries';
import StoreProvider from '@/providers/store-provider';

export default async function LocaleLayout({children, params}) {
  const locale = params?.locale || 'es';

  // Datos por locale (de tus tablas _es / en)
  const [experiences, proyects, skills, socials, phrases] = await Promise.all([
    fetchExperiences(locale),
    fetchProyects(locale),
    fetchSkills(),
    fetchSocials(),
    fetchUserPhrases(locale)
  ]);

  const storeData = {
    data: phrases?.[0] ?? null,
    socialData: socials ?? [],
    restOfData: {experiences, proyects, skills}
  };

  return (
    <NextIntlClientProvider locale={locale}>
      <StoreProvider data={storeData} locale={locale}>
        {children}
      </StoreProvider>
    </NextIntlClientProvider>
  );
}
