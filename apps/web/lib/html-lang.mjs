// El layout raíz no se re-renderiza en soft-nav: sincronizamos <html lang> a mano
export const syncHtmlLang = (doc, locale) => {
  const root = doc?.documentElement;
  if (root && root.lang !== locale) root.lang = locale;
};
