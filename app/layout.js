import { Outfit, Ovo } from "next/font/google";

import "./globals.css";

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

const outfit = Outfit({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });
const ovo = Ovo({ weight: ["400"], subsets: ["latin"] });


export const metadata = {
  title: "Gabriel Maglia",
  description: "Gabriel Maglia personal page",
};

export default async function RootLayout({ children }) {
  const [experiences, proyects, skills, socials, phrases] = await Promise.all([
    fetchExperiences(),
    fetchProyects(),
    fetchSkills(),
    fetchSocials(),
    fetchUserPhrases(),
  ])

  const data = {
    data: phrases[0],
    socialData: socials,
    restOfData: {
      experiences,
      proyects,
      skills,
    },
  }

  return (
    <html lang="en" className="scroll-smooth dark:">
      <head >
        <link
          href="https://db.onlinewebfonts.com/c/20ed319043dc56ddb162f273742b0cbd?family=Linotype+Zootype+W01+Regular"
          rel="stylesheet"
         
        />
      </head>
      <body className={`${ovo.className} ${outfit.className} w-[100vw] h-screen flex align-middle antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white `}>
        <ToasterProvider />
        <ScrollToTop />
        <StoreProvider data={data} />
        {children}
      </body>
    </html>
  );
}
