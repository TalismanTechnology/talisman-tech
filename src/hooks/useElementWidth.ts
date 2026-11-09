import { useEffect, useState, type RefObject } from "react";

/** Tracks an element's rendered width via ResizeObserver. */
export function useElementWidth(ref: RefObject<Element>): number {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    setWidth(node.getBoundingClientRect().width);
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setWidth(entry.contentRect.width);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return width;
}
