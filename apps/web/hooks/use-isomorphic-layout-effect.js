import { useEffect, useLayoutEffect } from "react";

// useLayoutEffect avisa en SSR; en el server se degrada a useEffect (que tampoco corre)
export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
