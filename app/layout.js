import { Gamja_Flower } from "next/font/google";
import { Maven_Pro } from "next/font/google";
import TransitionProvider from "@/providers/transition-provider";
import "./globals.css";

import {
  getAllData,
  getPersonalData,
  getPersonalSocialMediaData,
} from "@/serevices/fetchUserData";
import StoreProvider from "@/providers/store-provider";
import { ToasterProvider } from "@/providers/toast-provider";

const inter = Maven_Pro({ weight: "500", subsets: ["latin"] });

export const metadata = {
  title: "Gabriel Maglia",
  description: "Gabriel Maglia personal page",
};

export default async function RootLayout({ children }) {
  const data = await getPersonalData();
  const socialData = await getPersonalSocialMediaData();
  const restOfData = await getAllData();

  return (
    <html lang="en">
      <head>
        <link
          href="https://db.onlinewebfonts.com/c/20ed319043dc56ddb162f273742b0cbd?family=Linotype+Zootype+W01+Regular"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} flex align-middle `}>
        <ToasterProvider />
        <StoreProvider data={{ data, socialData, restOfData }} />
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
