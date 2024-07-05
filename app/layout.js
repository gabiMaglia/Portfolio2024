import { Inter } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/providers/transition-provider";

import { getAllData, getPersonalData, getPersonalSocialMediaData } from "@/serevices/fetchUserData";
import StoreProvider from "@/providers/store-provider";
import { ToasterProvider } from "@/providers/toast-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gabriel Maglia",
  description: "Gabriel Maglia personal page",
};


export default async function RootLayout({ children }) {
  const data = await getPersonalData()
  const socialData = await getPersonalSocialMediaData()
  const restOfData  = await getAllData()


  return (
    <html lang="en">
      <body className={`${inter.className} flex align-middle bg-fixed bg-gradient-to-b from-blue-100 to-red-300 `}>
      <ToasterProvider />
      <StoreProvider data={{data, socialData, restOfData}} />
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
