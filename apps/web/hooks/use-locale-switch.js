import { useEffect, useState } from "react";
import { otherLocale, isModifiedClick } from "@/lib/locale-switch.mjs";

const PENDING_TIMEOUT_MS = 6000;

// El thumb se mueve al instante (optimista) mientras llega el otro idioma; si la
// navegación se cuelga vuelve a su lugar.
export const useLocaleSwitch = (locale) => {
  const target = otherLocale(locale);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!pending) return undefined;
    const id = setTimeout(() => setPending(false), PENDING_TIMEOUT_MS);
    return () => clearTimeout(id);
  }, [pending]);

  const onClick = (e) => {
    if (!isModifiedClick(e)) setPending(true);
  };

  // Un link solo se activa con Enter; el switch también responde a Space
  const onKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
      e.currentTarget.click();
    }
  };

  return { target, shown: pending ? target : locale, busy: pending, onClick, onKeyDown };
};
