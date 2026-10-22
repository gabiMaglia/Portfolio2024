import {getRequestConfig} from 'next-intl/server';

const supported = ['es', 'en'];

// requestLocale viene del header que setea el middleware: disponible también en el layout raíz,
// donde el segmento [locale] todavía no está resuelto (por eso <html lang> necesita esto)
export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = supported.includes(requested) ? requested : 'es';

  return {
    locale,
    messages: {}
  };
});
