import { Gamja_Flower } from "next/font/google";
import { Maven_Pro } from "next/font/google";
import TransitionProvider from "@/providers/transition-provider";
import "./globals.css";

import {
  fetchExperiences,
  fetchProyects,
  fetchSkills,
  fetchSocials,
  fetchStudies,
  fetchUserPhrases,
} from "@/lib/queries";

import StoreProvider from "@/providers/store-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import { ScrollToTop } from "@/components/scrollToTop";

const inter = Maven_Pro({ weight: "500", subsets: ["latin"] });

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
    <html lang="en">
      <head>
        <link
          href="https://db.onlinewebfonts.com/c/20ed319043dc56ddb162f273742b0cbd?family=Linotype+Zootype+W01+Regular"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} w-screen h-screen flex align-middle`}>
        <span className='bg'/>
        <ToasterProvider />
        <ScrollToTop />
        <StoreProvider data={data} />
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
