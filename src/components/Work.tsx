import { SectionHeading } from "@/components/SectionHeading";
import { SectionShadow } from "@/components/SectionShadow";

const PROJECTS = [
  {
    name: "Vortex",
    category: "Startup — product launch site",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #6366f1 60%, #a855f7 100%)",
    span: "md:col-span-3",
  },
  {
    name: "Kynder",
    category: "Small business — booking & storefront",
    gradient: "linear-gradient(135deg, #2e1065 0%, #a855f7 65%, #fcd34d 100%)",
    span: "md:col-span-2",
  },
  {
    name: "Prysma",
    category: "Individual — design portfolio",
    gradient: "linear-gradient(135deg, #0f172a 0%, #312e81 55%, #6366f1 100%)",
    span: "md:col-span-2",
  },
  {
    name: "Halcyn",
    category: "Startup — waitlist & docs",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #7c3aed 50%, #f59e0b 100%)",
    span: "md:col-span-3",
  },
] as const;

export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="relative px-8 py-28">
      <SectionShadow />
      <div className="relative">
      <SectionHeading
        id="work-heading"
        eyebrow="Selected Work"
        title="Recent"
        gradientWord="launches"
        description="A few of the sites we've shipped lately — from solo portfolios to full storefronts."
      />

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-5">
        {PROJECTS.map(({ name, category, gradient, span }) => (
          <article key={name} className={`group ${span}`}>
            <div
              className="relative h-64 overflow-hidden rounded-2xl"
              style={{ backgroundImage: gradient }}
            >
              <div className="absolute inset-0 bg-background/20 transition-opacity duration-300 group-hover:opacity-0" />
              <span className="liquid-glass absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold text-foreground">
                {name[0]}
              </span>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="font-headline text-xl font-medium text-foreground">{name}</h3>
              <p className="text-sm text-foreground/50">{category}</p>
            </div>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
