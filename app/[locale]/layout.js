// app/[locale]/layout.jsx
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
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

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

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
    <NextIntlClientProvider locale={locale} messages={messages}>
      <StoreProvider data={storeData} locale={locale}>
        {children}
      </StoreProvider>
    </NextIntlClientProvider>
  );
}
