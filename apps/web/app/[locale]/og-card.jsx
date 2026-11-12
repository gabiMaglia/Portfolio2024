import { ImageResponse } from 'next/og';
import es from '@/messages/es.json';
import en from '@/messages/en.json';

// Tarjeta para links compartidos (T-028): la portada del hero en 1200×630, con las mismas
// tipografías y la paleta papel/tinta/naranja. Satori no lee woff2 ni CSS vars: TTF y hex.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = 'Gabriel Maglia — Fullstack Developer';

const PAPER = '#efe7d6';
const INK = '#16140f';
const ACCENT = '#e2552e';
const RULE = 'rgba(22, 20, 15, .22)';

// new URL con ruta literal: webpack sólo empaqueta el asset si puede leer la ruta estáticamente
const load = (url) => fetch(url).then((r) => r.arrayBuffer());

export async function renderOgCard(locale) {
  const t = (locale === 'en' ? en : es).Hero;
  const [archivo, serif, mono] = await Promise.all([
    load(new URL('../../assets/og/archivo-800.ttf', import.meta.url)),
    load(new URL('../../assets/og/instrument-serif-italic.ttf', import.meta.url)),
    load(new URL('../../assets/og/space-mono-400.ttf', import.meta.url)),
  ]);

  const monoText = { fontFamily: 'Space Mono', fontSize: 20, letterSpacing: 3, textTransform: 'uppercase' };

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: PAPER,
          color: INK,
          padding: '56px 72px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', ...monoText }}>
          <span>{t.kicker}</span>
          <span>gabrielmaglia.me</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 24 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Archivo',
              fontSize: 148,
              lineHeight: 0.86,
              letterSpacing: -6,
              textTransform: 'uppercase',
            }}
          >
            <span>Gabriel</span>
            <span>Maglia</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 30, fontFamily: 'Archivo', fontSize: 40, letterSpacing: -1 }}>
            {/* satori recorta los espacios de borde: la separación va como margen */}
            <span>{t.leadPre}</span>
            <span style={{ fontFamily: 'Instrument Serif', fontSize: 52, color: ACCENT, letterSpacing: 0, margin: '0 12px' }}>{t.leadAccent}</span>
            <span>{t.leadPost}</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `2px solid ${RULE}`,
            paddingTop: 22,
            ...monoText,
            fontSize: 16,
            letterSpacing: 2,
          }}
        >
          <span>{t.roles}</span>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ width: 14, height: 14, borderRadius: 7, background: ACCENT, marginRight: 12 }} />
            {t.available}
          </span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Archivo', data: archivo, weight: 800, style: 'normal' },
        { name: 'Instrument Serif', data: serif, weight: 400, style: 'italic' },
        { name: 'Space Mono', data: mono, weight: 400, style: 'normal' },
      ],
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400' },
    }
  );
}
