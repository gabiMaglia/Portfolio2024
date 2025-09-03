// middleware.js
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always' // / -> /es
});

export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)']
};
