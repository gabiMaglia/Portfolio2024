import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'es'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({locale}) => {
  const resolvedLocale = locale ?? defaultLocale;
  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default
  };
});
