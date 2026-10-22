export const otherLocale = (locale) => (locale === 'en' ? 'es' : 'en');

// Con modificador o botón del medio el navegador abre otra pestaña: esta no cambia de idioma
export const isModifiedClick = (e) => Boolean(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || (e.button ?? 0) !== 0);
