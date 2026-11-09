import { useEffect, useState } from "react";

/** Advances an index every `durationMs` while not paused. Changing the index
 *  manually restarts the timer, so the next step always gets a full duration. */
export function useAutoCycle(count: number, durationMs: number, isPaused: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isPaused || count < 2) return;
    const timer = setTimeout(() => setIndex((current) => (current + 1) % count), durationMs);
    return () => clearTimeout(timer);
  }, [index, isPaused, count, durationMs]);

  return [index, setIndex] as const;
}
