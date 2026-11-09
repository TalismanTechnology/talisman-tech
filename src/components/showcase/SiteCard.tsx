import { LiveFrame } from "@/components/showcase/LiveFrame";
import type { Site } from "@/data/sites";
import { cn } from "@/lib/utils";

type SiteCardProps = {
  site: Site;
  className?: string;
  /** Sizing for the preview area; defaults to a fixed-height strip. */
  frameClassName?: string;
  onOpen: (site: Site) => void;
};

const DEFAULT_FRAME = "h-64 md:h-72";

export function SiteCard({ site, className, frameClassName = DEFAULT_FRAME, onOpen }: SiteCardProps) {
  return (
    <article className={cn("group", className)}>
      <button
        type="button"
        onClick={() => onOpen(site)}
        aria-label={`Open live preview of ${site.name}`}
        className={cn(
          "relative block w-full overflow-hidden rounded-2xl bg-background text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/40",
          frameClassName
        )}
      >
        {site.embeddable ? (
          <LiveFrame url={site.url} title={site.name} className="h-full w-full" />
        ) : (
          <img
            src={site.poster}
            alt=""
            width={1440}
            height={1200}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        )}

        <div className="absolute inset-0 bg-background/20 transition-opacity duration-300 group-hover:opacity-0" />

        {/* Wrapper owns positioning: .liquid-glass forces position: relative. */}
        <span className="absolute bottom-5 right-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="liquid-glass flex rounded-full px-4 py-2 text-sm font-medium text-foreground">
            View live
          </span>
        </span>
      </button>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-headline text-xl font-medium text-foreground">{site.name}</h3>
        <p className="text-right text-sm text-foreground/50">{site.category}</p>
      </div>
    </article>
  );
}
