// Las fechas de la DB son texto libre en inglés ("July 2024", "Jun 2023", "Present Day"):
// se interpretan por prefijo de 3 letras (tolera typos como "Aprlil") y se formatean con Intl.
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const PRESENT = /^(present(\s+day)?|d[ií]a presente|presente|actualidad|current|now)$/i;

const parseMonthYear = (raw) => {
  const m = /^([A-Za-z]+)\.?\s+(\d{4})$/.exec(raw);
  if (!m) return null;
  const month = MONTHS.indexOf(m[1].slice(0, 3).toLowerCase());
  return month < 0 ? null : { month, year: Number(m[2]) };
};

export const formatExpDate = (raw, locale, presentLabel) => {
  const text = String(raw ?? '').trim();
  if (PRESENT.test(text)) return presentLabel;
  const parsed = parseMonthYear(text);
  if (!parsed) return text;
  const date = new Date(Date.UTC(parsed.year, parsed.month, 1));
  const out = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
  return out.charAt(0).toUpperCase() + out.slice(1);
};
