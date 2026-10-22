"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { syncHtmlLang } from "@/lib/html-lang.mjs";

const LangSync = () => {
  const locale = useLocale();
  useEffect(() => {
    syncHtmlLang(document, locale);
  }, [locale]);
  return null;
};

export default LangSync;
