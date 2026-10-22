"use client";

import { useTranslations } from "next-intl";
import { useArClock } from "@/hooks/use-ar-clock";

// Número de edición del sitio (decisión editorial, no la fecha de hoy: evita mismatch de año)
const EDITION_YEAR = 2026;

const Masthead = () => {
  const t = useTranslations("Masthead");
  const time = useArClock();

  return (
    <p className="masthead ui-ink" data-ui-follow>
      {t("edition", { year: EDITION_YEAR })} · {t("localTime")}{" "}
      {time ? <time dateTime={time}>{time}</time> : <span>--:--</span>}
    </p>
  );
};

export default Masthead;
