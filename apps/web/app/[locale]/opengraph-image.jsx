import { OG_ALT, OG_SIZE, renderOgCard } from './og-card';

export const runtime = 'edge';
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image({ params }) {
  return renderOgCard(params.locale);
}
