import {defineRouting} from 'next-intl/routing';

// Única fuente de los locales: la comparten el middleware y la navegación
export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always'
});
