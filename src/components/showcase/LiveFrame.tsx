import { useRef, useState } from "react";
import { useElementWidth } from "@/hooks/useElementWidth";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

/** Desktop viewport a preview renders at before being scaled down. */
const PREVIEW_WIDTH = 1440;
/** Interactive frames render a bit narrower so text stays readable once scaled. */
const INTERACTIVE_DESKTOP_WIDTH = 1280;
/** Below this container width, interactive frames switch to the site's mobile layout. */
const MOBILE_BREAKPOINT = 640;
const MOBILE_WIDTH = 390;

const PREVIEW_SANDBOX = "allow-scripts allow-same-origin";
const INTERACTIVE_SANDBOX =
  "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox";

type LiveFrameProps = {
  url: string;
  title: string;
  className?: string;
  /** When true, visitors can scroll, click and navigate inside the embedded site. */
  isInteractive?: boolean;
};

function virtualWidthFor(containerWidth: number, isInteractive: boolean): number {
  if (!isInteractive) return PREVIEW_WIDTH;
  return containerWidth < MOBILE_BREAKPOINT ? MOBILE_WIDTH : INTERACTIVE_DESKTOP_WIDTH;
}

/**
 * Scaled-down live render of a site. The iframe is laid out at a real viewport
 * width, then shrunk with a compositor-only transform. Previews are inert;
 * interactive frames accept clicks, scrolling and keyboard focus.
 */
export function LiveFrame({ url, title, className, isInteractive = false }: LiveFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const width = useElementWidth(containerRef);
  const [isLoaded, setIsLoaded] = useState(false);

  const virtualWidth = virtualWidthFor(width, isInteractive);
  const scale = width > 0 ? width / virtualWidth : 0;
  const shouldMount = isInView && scale > 0;

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden bg-background", className)}>
      {!isLoaded && <FrameSkeleton />}
      {shouldMount && (
        <iframe
          src={url}
          title={isInteractive ? title : `${title} — live preview`}
          tabIndex={isInteractive ? undefined : -1}
          aria-hidden={isInteractive ? undefined : true}
          sandbox={isInteractive ? INTERACTIVE_SANDBOX : PREVIEW_SANDBOX}
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-700",
            !isInteractive && "pointer-events-none",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{
            width: virtualWidth,
            height: `${100 / scale}%`,
            transform: `scale(${scale})`,
          }}
        />
      )}
    </div>
  );
}

function FrameSkeleton() {
  return (
    <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-white/[0.02] motion-reduce:animate-none" />
  );
}
