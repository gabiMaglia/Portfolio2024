"use client";

import { useLocale, useTranslations } from "next-intl";
import PropTypes from "prop-types";
import { useLocaleSwitch } from "@/hooks/use-locale-switch";
import LangSwitch from "./lang-switch";

const OPTIONS = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

// panelId viaja en el hash: el otro idioma abre en el mismo panel
const LocaleSwitcher = ({ panelId }) => {
  const t = useTranslations("Lang");
  const locale = useLocale();
  const { target, shown, busy, onClick, onKeyDown } = useLocaleSwitch(locale);

  return (
    <LangSwitch
      options={OPTIONS}
      shown={shown}
      target={target}
      hash={panelId}
      busy={busy}
      onClick={onClick}
      onKeyDown={onKeyDown}
      label={t("switchTo", { language: t(`names.${target}`) })}
    />
  );
};

LocaleSwitcher.propTypes = { panelId: PropTypes.string };

export default LocaleSwitcher;
