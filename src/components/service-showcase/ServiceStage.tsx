import { useRef, type PointerEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { LiveFrame } from "@/components/showcase/LiveFrame";
import { cn } from "@/lib/utils";
import { AUDIENCES, type Audience } from "./data";
import { BrowserFrame } from "./BrowserFrame";

const EASE = [0.16, 1, 0.3, 1] as const;

type ServiceStageProps = {
  audience: Audience;
  index: number;
  total: number;
};

export function ServiceStage({ audience, index, total }: ServiceStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  /** Writes the pointer position to CSS vars so the spotlight follows without re-rendering. */
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const node = stageRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={stageRef}
      id="audience-panel"
      role="tabpanel"
      aria-labelledby={`audience-tab-${audience.id}`}
      onPointerMove={handlePointerMove}
      className="service-stage liquid-glass relative rounded-3xl p-3 sm:p-5"
    >
      <div className="relative flex items-center justify-between gap-3 px-1 pb-3 text-xs text-foreground/50">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={audience.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="min-w-0 truncate"
          >
            <span className="font-medium uppercase tracking-[0.2em] text-foreground/50">
              For {audience.title.toLowerCase()}
            </span>
            <span className="ml-2 text-foreground/80">· {audience.site.name}</span>
          </motion.p>
        </AnimatePresence>
        <span className="shrink-0 tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* All sites stay mounted so switching tabs never reloads them or loses scroll position. */}
      <div className="relative h-[520px] sm:h-[460px]">
        {AUDIENCES.map((item) => {
          const isActive = item.id === audience.id;
          return (
            <div
              key={item.id}
              aria-hidden={!isActive}
              className={cn(
                "absolute inset-0 transition-[opacity,transform,visibility] duration-500 ease-out",
                isActive ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0"
              )}
            >
              <BrowserFrame url={item.site.url} siteName={item.site.name}>
                <LiveFrame url={item.site.url} title={item.site.name} isInteractive className="h-full w-full" />
              </BrowserFrame>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={audience.id}
          className="relative mt-4 flex flex-wrap gap-2"
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
        >
          {audience.points.map((point) => (
            <motion.li
              key={point}
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-foreground/70"
            >
              <Check className="h-3.5 w-3.5 text-foreground/50" aria-hidden="true" />
              {point}
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
