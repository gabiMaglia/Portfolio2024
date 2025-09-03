// i18n/request.js
import {getRequestConfig} from 'next-intl/server';

// Stub mínimo solo para satisfacer al plugin.
// NO se usa en tu layout: seguimos cargando mensajes manualmente por `locale`.
export default getRequestConfig(async ({locale}) => {
  const supported = ['es', 'en'];
  const resolved = supported.includes(locale) ? locale : 'es';
  // Si quieres, puedes cargar mensajes reales aquí,
//   const messages = (await import(`../messages/${resolved}.json`)).default;
  return {
    locale: resolved,
    messages: {} // dejamos vacío; tu layout de [locale] carga los JSON
  };
});
