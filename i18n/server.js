// i18n/server.js
import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from './settings';

export default getRequestConfig(async ({locale}) => {
  const current = locales.includes(locale) ? locale : defaultLocale;
  const messages = (await import(`../messages/${current}.json`)).default;

  return {
    locale: current,
    messages
  };
});
