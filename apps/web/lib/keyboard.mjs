// El handler global de teclado no debe pisar la activación nativa de controles
const INTERACTIVE = "a,button,input,textarea,select,[role='button']";

export const isInteractiveTarget = (el) => Boolean(el && el.closest && el.closest(INTERACTIVE));
