import { Outfit, Ovo } from 'next/font/google';
import './globals.css';
import { getLocale } from 'next-intl/server';

const outfit = Outfit({ weight: ['400', '500', '600', '700'], subsets: ['latin'] });
const ovo = Ovo({ weight: ['400'], subsets: ['latin'] });

export const metadata = {
  title: 'Gabriel Maglia',
  description: 'Gabriel Maglia personal page',
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className="scroll-smooth dark:">
      <head>
        <link
          href="https://db.onlinewebfonts.com/c/20ed319043dc56ddb162f273742b0cbd?family=Linotype+Zootype+W01+Regular"
          rel="stylesheet"
        />
      </head>
      <body className={`${ovo.className} ${outfit.className} w-[100vw] h-screen flex align-middle antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white`}>
        {children}
      </body>
    </html>
  );
}
