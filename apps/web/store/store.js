"use client";

import { createContext, useContext } from "react";
import { useStore } from "zustand";

export const StoreContext = createContext(null);

// Misma firma que antes (useUserStore(selector)), ahora leyendo el store del request
export const useUserStore = (selector) => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useUserStore debe usarse dentro de <StoreProvider>");
  return useStore(store, selector);
};
