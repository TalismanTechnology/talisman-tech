import { SectionHeading } from "@/components/SectionHeading";
import { SectionShadow } from "@/components/SectionShadow";

const TESTIMONIALS = [
  {
    quote:
      "Our old site looked like everyone else's. Talisman gave us something people actually comment on — and signups doubled the month we launched.",
    name: "Maya R.",
    role: "Founder, Vortex",
  },
  {
    quote:
      "I'm a photographer, not a web person. They handled everything from the domain to the gallery and I can update it myself now.",
    name: "Daniel K.",
    role: "Photographer, Prysma",
  },
  {
    quote:
      "Bookings used to come through phone calls only. Now half our appointments come straight through the site.",
    name: "Priya S.",
    role: "Owner, Kynder Studio",
  },
] as const;

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="relative px-8 py-28">
      <SectionShadow />
      <div className="relative">
      <SectionHeading
        id="testimonials-heading"
        eyebrow="Testimonials"
        title="Word gets"
        gradientWord="around"
      />

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
        {TESTIMONIALS.map(({ quote, name, role }) => (
          <figure key={name} className="liquid-glass flex flex-col rounded-2xl p-8">
            <blockquote className="flex-1 text-sm leading-7 text-foreground/80">“{quote}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="liquid-glass flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold text-foreground">
                {name[0]}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{name}</p>
                <p className="text-xs text-foreground/50">{role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      </div>
    </section>
  );
}
