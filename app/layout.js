import { Inter } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/transitionProvider";
import { ToasterProvider } from "@/providers/toast-provider";
import { getAllData, getPersonalData, getPersonalSocialMediaData } from "@/serevices/fetchUserData";
import StoreProvider from "@/providers/store-provider";


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
      <body className={inter.className}>
      <ToasterProvider />
      <StoreProvider data={{data, socialData, restOfData}} />
        <TransitionProvider>{children}</TransitionProvider>
    
      </body>
    </html>
  );
}
