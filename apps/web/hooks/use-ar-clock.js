import { useEffect, useState } from "react";
import { formatArTime, msUntilNextMinute } from "@/lib/ar-clock.mjs";

// null hasta montar: server y primer render del cliente coinciden (sin hydration mismatch)
export const useArClock = () => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    let id;
    const tick = () => {
      const now = new Date();
      setTime(formatArTime(now));
      id = setTimeout(tick, msUntilNextMinute(now));
    };
    tick();
    return () => clearTimeout(id);
  }, []);

  return time;
};
