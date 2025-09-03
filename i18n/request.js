import {getRequestConfig} from 'next-intl/server';

// Opcional: valida locales si querés
const locales = ['es', 'en'];
const defaultLocale = 'es';

export default getRequestConfig(async ({locale}) => {
  const current = locales.includes(locale) ? locale : defaultLocale;
  const messages = (await import(`../messages/${current}.json`)).default;

  return {
    locale: current,
    messages
  };
});