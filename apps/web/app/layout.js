import { Archivo, Space_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';

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

export const metadata = {
  title: 'Gabriel Maglia',
  description: 'Gabriel Maglia — Fullstack Developer · Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${archivo.variable} ${spaceMono.variable} ${instrumentSerif.variable}`}>
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
