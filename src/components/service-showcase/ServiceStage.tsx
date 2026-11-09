import { LiveFrame } from "@/components/showcase/LiveFrame";
import { cn } from "@/lib/utils";
import { AUDIENCES, type Audience } from "./data";

type ServiceStageProps = {
  audience: Audience;
};

/** Just the live website for the active audience — no surrounding chrome. */
export function ServiceStage({ audience }: ServiceStageProps) {
  return (
    <div
      id="audience-panel"
      role="tabpanel"
      aria-labelledby={`audience-tab-${audience.id}`}
      className="relative h-[560px] overflow-hidden rounded-2xl sm:h-[520px]"
    >
      {/* All sites stay mounted so switching tabs never reloads them or loses scroll position. */}
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
            <LiveFrame url={item.site.url} title={item.site.name} isInteractive className="h-full w-full" />
          </div>
        );
      })}
    </div>
  );
}
