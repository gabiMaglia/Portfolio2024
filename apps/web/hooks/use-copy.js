import { useCallback, useEffect, useRef, useState } from "react";
import { copyText } from "@/lib/clipboard.mjs";

export const useCopy = (text, resetMs = 2000) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Devuelve si copió: el llamador decide qué hacer si el navegador lo impide
  const copy = useCallback(async () => {
    const ok = await copyText(text);
    if (ok) {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), resetMs);
    }
    return ok;
  }, [text, resetMs]);

  return { copied, copy };
};
