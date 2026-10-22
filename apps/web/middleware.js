import createMiddleware from 'next-intl/middleware';
import {NextResponse} from 'next/server';
import {routing} from './i18n/routing';

const intl = createMiddleware(routing);

// skipTrailingSlashRedirect (next.config) apaga el 308 de Next para que /apps/** conserve el
// slash que piden las landings; el portfolio mantiene su comportamiento sin slash acá.
export default function middleware(req) {
  const {pathname} = req.nextUrl;
  if (pathname.length > 1 && pathname.endsWith('/')) {
    // URL plana: NextURL re-agrega el slash cuando skipTrailingSlashRedirect está activo
    const target = new URL(pathname.replace(/\/+$/, '') + req.nextUrl.search, req.url);
    return NextResponse.redirect(target, 308);
  }
  return intl(req);
}

export const config = {
  matcher: ['/', '/(es|en)/:path*', '/((?!_next|_vercel|.*\\..*|api|apps(?:/|$)).*)']
};
