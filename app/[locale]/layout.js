import {
  fetchExperiences,
  fetchProyects,
  fetchSkills,
  fetchSocials,
  fetchUserPhrases,
} from "@/lib/queries";
import StoreProvider from "@/providers/store-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import { ScrollToTop } from "@/components/scrollToTop";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }) {
  setRequestLocale(locale);
  const messages = await getMessages();

  const [experiences, proyects, skills, socials, phrases] = await Promise.all([
    fetchExperiences(locale),
    fetchProyects(locale),
    fetchSkills(),
    fetchSocials(),
    fetchUserPhrases(locale),
  ]);

  const data = {
    data: phrases[0],
    socialData: socials,
    restOfData: {
      experiences,
      proyects,
      skills,
    },
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
