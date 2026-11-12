import { Archivo, Space_Mono, Instrument_Serif } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import './globals.css';
import { FONT_GATE_SCRIPT } from '@/lib/font-gate.mjs';
import { SITE_URL } from '@/lib/site.mjs';

const archivo = Archivo({
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

// Base para resolver URLs relativas (canonical, og:image) en todas las rutas; cada página
// define su título/descripción (T-028)
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Gabriel Maglia',
  description: 'Gabriel Maglia — Fullstack Developer · Argentina',
  authors: [{ name: 'Gabriel Maglia', url: SITE_URL }],
  creator: 'Gabriel Maglia',
};

export const viewport = {
  themeColor: '#efe7d6',
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${archivo.variable} ${spaceMono.variable} ${instrumentSerif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: FONT_GATE_SCRIPT }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

import PropTypes from 'prop-types';

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
