import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { displayHost } from "@/data/sites";

type BrowserFrameProps = {
  url: string;
  siteName: string;
  children: ReactNode;
};

/** Minimal browser chrome around an embedded site; the address pill opens it in a new tab. */
export function BrowserFrame({ url, siteName, children }: BrowserFrameProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0b0a14]/90 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${siteName} in a new tab`}
          className="group mx-auto flex min-w-0 items-center gap-1.5 rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-foreground/60 transition-colors hover:bg-white/[0.1] hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
        >
          <span className="truncate">{displayHost(url)}</span>
          <ArrowUpRight className="h-3 w-3 shrink-0 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" aria-hidden="true" />
        </a>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      <div className="relative flex-1">{children}</div>
    </div>
  );
}
