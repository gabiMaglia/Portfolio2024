import { DEFAULT_LOCALE } from '@/lib/site.mjs';

export default function manifest() {
  return {
    name: 'Gabriel Maglia — Fullstack Developer',
    short_name: 'G. Maglia',
    description: 'Portfolio de Gabriel Maglia, desarrollador fullstack en Argentina.',
    start_url: `/${DEFAULT_LOCALE}`,
    display: 'browser',
    background_color: '#efe7d6',
    theme_color: '#efe7d6',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
