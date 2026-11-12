import { OG_ALT, OG_SIZE, renderOgCard } from './og-card';

// Misma tarjeta que opengraph-image: Next no hereda og:image en twitter:image
export const runtime = 'edge';
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image({ params }) {
  return renderOgCard(params.locale);
}
