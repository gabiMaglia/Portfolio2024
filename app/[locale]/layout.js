import { Outfit, Ovo } from "next/font/google";

import "../globals.css";

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

const outfit = Outfit({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });
const ovo = Ovo({ weight: ["400"], subsets: ["latin"] });

export const metadata = {
  title: "Gabriel Maglia",
  description: "Gabriel Maglia personal page",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params: { locale } }) {
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
    <html lang={locale} className="scroll-smooth dark:">
      <head>
        <link
          href="https://db.onlinewebfonts.com/c/20ed319043dc56ddb162f273742b0cbd?family=Linotype+Zootype+W01+Regular"
          rel="stylesheet"
        />
      </head>
      <body className={`${ovo.className} ${outfit.className} w-[100vw] h-screen flex align-middle antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white `}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ToasterProvider />
          <ScrollToTop />
          <StoreProvider data={data} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
