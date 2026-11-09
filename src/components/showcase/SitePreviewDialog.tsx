import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight, Monitor, Smartphone, Tablet, X, type LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import type { Site } from "@/data/sites";
import { cn } from "@/lib/utils";

type Viewport = "desktop" | "tablet" | "mobile";

const VIEWPORTS: readonly { id: Viewport; label: string; icon: LucideIcon; width: string }[] = [
  { id: "desktop", label: "Desktop", icon: Monitor, width: "100%" },
  { id: "tablet", label: "Tablet", icon: Tablet, width: "820px" },
  { id: "mobile", label: "Mobile", icon: Smartphone, width: "390px" },
];

const GRADIENT = "linear-gradient(to left, #6366f1, #a855f7, #fcd34d)";

const iconButton =
  "flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-white/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/40";

type SitePreviewDialogProps = {
  site: Site | null;
  onClose: () => void;
};

export function SitePreviewDialog({ site, onClose }: SitePreviewDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [viewport, setViewport] = useState<Viewport>("desktop");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (site && !dialog.open) {
      setViewport("desktop");
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!site && dialog.open) dialog.close();
    return () => {
      document.body.style.overflow = "";
    };
  }, [site]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const frameWidth = VIEWPORTS.find((v) => v.id === viewport)?.width ?? "100%";

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-label={site ? `${site.name} live preview` : "Live preview"}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-4 text-foreground backdrop:bg-background/80 backdrop:backdrop-blur-md md:p-8"
    >
      {site && (
        <div className="h-full rounded-2xl p-[1.4px]" style={{ backgroundImage: GRADIENT }}>
          <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-background">
            <header className="flex items-center gap-4 px-5 py-4 md:px-6">
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-headline text-xl font-medium text-foreground">{site.name}</h2>
                <p className="truncate text-sm text-foreground/50">{site.category}</p>
              </div>

              {site.embeddable && (
                <div role="group" aria-label="Preview size" className="liquid-glass hidden items-center gap-1 rounded-full p-1 md:flex">
                  {VIEWPORTS.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      aria-label={label}
                      aria-pressed={viewport === id}
                      onClick={() => setViewport(id)}
                      className={cn(iconButton, "h-8 w-8", viewport === id && "bg-white/[0.08] text-foreground")}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              )}

              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "heroSecondary", size: "unset" }), "px-4 py-2")}
              >
                <span className="hidden sm:inline">Visit site</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <button type="button" onClick={onClose} aria-label="Close preview" className={iconButton}>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

            <div className="flex flex-1 justify-center overflow-hidden">
              {site.embeddable ? (
                <iframe
                  key={site.slug}
                  src={site.url}
                  title={`${site.name} — interactive preview`}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="h-full border-0 bg-white"
                  style={{ width: frameWidth, maxWidth: "100%" }}
                />
              ) : (
                <BlockedPreview site={site} />
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

function BlockedPreview({ site }: { site: Site }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {site.poster && (
        <img src={site.poster} alt="" className="absolute inset-0 h-full w-full object-cover object-top opacity-40" />
      )}
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[360px] w-[min(720px,90%)] -translate-x-1/2 -translate-y-1/2 bg-gray-950 opacity-90 blur-[82px]" />
      <div className="relative max-w-md px-6 text-center">
        <p className="font-headline text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-foreground">
          Best seen{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
            full screen
          </span>
        </p>
        <p className="mt-4 text-base leading-7 text-hero-sub opacity-80">
          {site.name} doesn't allow embedding, so it opens in its own tab.
        </p>
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "heroSecondary", size: "unset" }), "mt-8 px-[29px] py-[18px]")}
        >
          Visit {site.name}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
