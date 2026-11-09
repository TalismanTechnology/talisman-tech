import { useEffect, useState, type RefObject } from "react";

/** Becomes true once the element nears the viewport, and stays true. */
export function useInView(ref: RefObject<Element>, rootMargin = "300px"): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isInView) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin, isInView]);

  return isInView;
}
