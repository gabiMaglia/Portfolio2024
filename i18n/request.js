import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  const supported = ['es', 'en'];
  const resolved = supported.includes(locale) ? locale : 'es';
  
  return {
    locale: resolved,
    messages: {} 
  };
});
