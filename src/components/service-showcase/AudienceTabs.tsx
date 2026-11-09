import { useRef, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AUDIENCES, CYCLE_MS } from "./data";

type AudienceTabsProps = {
  activeIndex: number;
  isCycling: boolean;
  onSelect: (index: number) => void;
};

export function AudienceTabs({ activeIndex, isCycling, onSelect }: AudienceTabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (activeIndex + step + AUDIENCES.length) % AUDIENCES.length;
    onSelect(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Who we build for"
      aria-orientation="vertical"
      onKeyDown={handleKeyDown}
      className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-3"
    >
      {AUDIENCES.map(({ id, icon: Icon, title, tagline }, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={id}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            id={`audience-tab-${id}`}
            role="tab"
            type="button"
            aria-selected={isActive}
            aria-controls="audience-panel"
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(index)}
            className={cn(
              "group relative overflow-hidden rounded-2xl p-3 text-left outline-none transition-opacity duration-300 focus-visible:ring-2 focus-visible:ring-white/40 sm:p-4 lg:p-5",
              isActive ? "opacity-100" : "opacity-50 hover:opacity-90"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="audience-tab-bg"
                aria-hidden="true"
                className="liquid-glass absolute inset-0 rounded-2xl"
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              />
            )}

            <span className="relative flex flex-col items-center gap-2 sm:flex-row sm:gap-4 lg:items-start">
              <span className="liquid-glass flex h-10 w-10 shrink-0 items-center justify-center rounded-xl lg:h-11 lg:w-11">
                <Icon className="h-5 w-5 text-foreground" aria-hidden="true" />
              </span>
              <span className="min-w-0 text-center sm:text-left">
                <span className="block font-headline text-sm font-medium text-foreground sm:text-lg lg:text-xl">
                  {title}
                </span>
                <span className="mt-1 hidden text-sm text-hero-sub/70 lg:block">{tagline}</span>
              </span>
            </span>

            {isActive && (
              <span aria-hidden="true" className="absolute inset-x-4 bottom-2 h-px overflow-hidden rounded-full bg-white/10 lg:inset-x-5">
                <motion.span
                  key={`${activeIndex}-${isCycling}`}
                  className="block h-full origin-left bg-foreground/60"
                  initial={{ scaleX: isCycling ? 0 : 1 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: isCycling ? CYCLE_MS / 1000 : 0, ease: "linear" }}
                />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
