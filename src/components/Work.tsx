import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShadow } from "@/components/SectionShadow";
import { SiteCard } from "@/components/showcase/SiteCard";
import { SitePreviewDialog } from "@/components/showcase/SitePreviewDialog";
import { WORK_SITES, type Site } from "@/data/sites";

/** 3/2 row on a 5-col grid, then a full-width feature row framed like a laptop screen (16:10). */
type CardLayout = { span: string; frame?: string };

const LAYOUT: readonly CardLayout[] = [
  { span: "md:col-span-3" },
  { span: "md:col-span-2" },
  { span: "md:col-span-5", frame: "aspect-[16/10]" },
];

export function Work() {
  const [activeSite, setActiveSite] = useState<Site | null>(null);

  return (
    <section id="work" aria-labelledby="work-heading" className="relative px-8 py-28">
      <SectionShadow />
      <div className="relative">
        <SectionHeading
          id="work-heading"
          eyebrow="Selected Work"
          title="Recent"
          gradientWord="launches"
          description="Real sites we've designed and shipped. Every preview is live — click one to explore it."
        />

        <div className="mx-auto mt-16 grid max-w-5xl gap-x-6 gap-y-10 md:grid-cols-5">
          {WORK_SITES.map((site, index) => {
            const layout = LAYOUT[index % LAYOUT.length];
            return (
              <SiteCard
                key={site.slug}
                site={site}
                className={layout.span}
                frameClassName={layout.frame}
                onOpen={setActiveSite}
              />
            );
          })}
        </div>
      </div>

      <SitePreviewDialog site={activeSite} onClose={() => setActiveSite(null)} />
    </section>
  );
}
