import { User, Rocket, Store } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShadow } from "@/components/SectionShadow";

const SERVICES = [
  {
    icon: User,
    title: "Individuals",
    tagline: "Personal sites that open doors",
    points: ["Portfolios & personal brands", "Resume and link-in-bio sites", "Blogs and creator pages"],
  },
  {
    icon: Rocket,
    title: "Startups",
    tagline: "Ship a site as fast as you ship product",
    points: ["Landing pages that convert", "Product marketing sites", "Waitlists, docs & launch pages"],
  },
  {
    icon: Store,
    title: "Small Businesses",
    tagline: "Look bigger than you are",
    points: ["Business sites & booking flows", "Local SEO foundations", "Simple e-commerce storefronts"],
  },
] as const;

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="relative px-8 py-28">
      <SectionShadow />
      <div className="relative">
      <SectionHeading
        id="services-heading"
        eyebrow="Services"
        title="Built for"
        gradientWord="whoever you are"
        description="One studio, three kinds of clients. Every site is designed from scratch — no templates, no page builders."
      />

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
        {SERVICES.map(({ icon: Icon, title, tagline, points }) => (
          <article key={title} className="liquid-glass flex flex-col rounded-2xl p-8">
            <span className="liquid-glass flex h-12 w-12 items-center justify-center rounded-xl">
              <Icon className="h-5 w-5 text-foreground" aria-hidden="true" />
            </span>
            <h3 className="mt-6 font-headline text-2xl font-medium text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-hero-sub opacity-80">{tagline}</p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-foreground/70">
              {points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-foreground/50" />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
