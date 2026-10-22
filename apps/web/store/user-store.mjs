import { createStore } from "zustand/vanilla";

// Map de meses en EN/ES (3 letras y entero)
const MONTHS = {
  jan:0, january:0, ene:0, enero:0,
  feb:1, february:1, febrero:1,
  mar:2, march:2, marz:2, marzo:2,
  apr:3, april:3, abr:3, abril:3,
  may:4, mayo:4,
  jun:5, june:5, junio:5,
  jul:6, july:6,  julio:6,
  aug:7, agosto:7, augus:7,
  sep:8, sept:8, set:8, september:8, septiembre:8,
  oct:9, october:9, octu:9, octubre:9,
  nov:10, november:10, noviem:10, noviembre:10,
  dec:11, december:11, dic:11, diciembre:11
};

// Intenta parsear varios formatos: ISO, "Mes Año" (EN/ES), o solo "YYYY"
function parseExpDate(s) {
  if (!s) return new Date(0);
  const str = String(s).trim();

  // 1) ISO/fechas reconocibles por Date
  const t = Date.parse(str);
  if (!Number.isNaN(t)) return new Date(t);

  // 2) "Mes Año" (tanto EN como ES)
  const m = str.toLowerCase().match(/([a-záéíóúñ]+)\s+(\d{4})/i);
  if (m) {
    const monthKey = m[1].slice(0, 3); // "ene", "mar", "oct", "jan", etc.
    const mi = MONTHS[monthKey] ?? MONTHS[m[1]] ?? 0;
    const y = Number(m[2]);
    if (Number.isFinite(y)) return new Date(y, mi, 1);
  }

  // 3) Solo año
  const y = str.match(/\b(\d{4})\b/);
  if (y) return new Date(Number(y[1]), 0, 1);

  return new Date(0);
}

const toNum = (v, fallback = Number.MAX_SAFE_INTEGER) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

// Estado inicial puro: permite sembrar el store en SSR sin efectos
export function buildInitialState(data) {
  return {
    persona: data?.data ?? {},
    social: data?.socialData ?? [],
    // Ordena por id numérico ascendente, sin mutar el array original
    proyects: [...(data?.restOfData?.proyects ?? [])].sort(
      (a, b) => toNum(a?.id) - toNum(b?.id)
    ),
    // Más viejo → más nuevo
    experiences: [...(data?.restOfData?.experiences ?? [])].sort(
      (a, b) => parseExpDate(a?.startDate_exp) - parseExpDate(b?.startDate_exp)
    ),
    skill: data?.restOfData?.skills ?? [],
    phrases: {
      mainPhrase: data?.data?.main_phrase,
      phrase1: data?.data?.phrase1,
      phrase2: data?.data?.phrase2,
      phrase3: data?.data?.phrase3,
    },
  };
}

// Una instancia por request: un singleton de módulo se filtra entre usuarios en el server
export const createUserStore = (initial = buildInitialState()) =>
  createStore((set) => ({
    persona: {},
    proyects: [],
    experiences: [],
    skill: [],
    social: [],
    phrases: [],
    ...initial,
    setSocial: (v) => set({ social: v ?? [] }),
  }));
