// Las landings viven en otros hosts; el portfolio las sirve bajo /apps/<nombre> por rewrite.
// Cada landing compila con su `base` = /apps/<nombre>, así que el path se reenvía tal cual.
const LISTBUDDY_ORIGIN = 'https://gabimaglia.github.io/listbuddy-site';
const NETGAUGE_ORIGIN = 'https://net-gauge-brown.vercel.app';

export const APPS = [
  { id: 'listbuddy', href: '/apps/listbuddy/', name: 'listBuddy', origin: LISTBUDDY_ORIGIN },
  { id: 'netgauge', href: '/apps/netgauge/', name: 'NetGauge', origin: NETGAUGE_ORIGIN },
];

// El slash final se reenvía tal cual (Next lo come en :path*): las landings viven con slash y
// GH Pages redirige /x -> /x/ a su propio host, lo que arma un loop con su redirect de host.
// El orden importa: gana la primera regla que matchea (raíz, directorios con slash, resto).
export function appsRewrites() {
  return APPS.flatMap(({ id, origin }) => [
    { source: `/apps/${id}`, destination: `${origin}/` },
    { source: `/apps/${id}/`, destination: `${origin}/` },
    { source: `/apps/${id}/:path*/`, destination: `${origin}/:path*/` },
    { source: `/apps/${id}/:path*`, destination: `${origin}/:path*` },
  ]);
}

export function pickAppsLocale(acceptLanguage) {
  const first = (acceptLanguage ?? '').split(',')[0]?.trim().toLowerCase() ?? '';
  return first.startsWith('en') ? 'en' : 'es';
}
