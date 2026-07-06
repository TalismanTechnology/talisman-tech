import { SectionHeading } from "@/components/SectionHeading";
import { SectionShadow } from "@/components/SectionShadow";

const GRADIENT = "linear-gradient(to left, #6366f1, #a855f7, #fcd34d)";

const STEPS = [
  {
    step: "01",
    title: "Discover",
    body: "A short call to understand your goals, audience, and what the site needs to do for you.",
  },
  {
    step: "02",
    title: "Design",
    body: "A visual direction and page design made for your brand — reviewed together before a line of code.",
  },
  {
    step: "03",
    title: "Build",
    body: "Fast, accessible, hand-built pages. You watch progress on a live preview link the whole way.",
  },
  {
    step: "04",
    title: "Launch",
    body: "Domain, hosting, analytics, and SEO basics handled. You walk away with a site you own outright.",
  },
] as const;

export function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="relative px-8 py-28">
      <SectionShadow />
      <div className="relative">
      <SectionHeading
        id="process-heading"
        eyebrow="Process"
        title="From idea to live"
        gradientWord="in weeks"
        description="A simple four-step process with one point of contact and no surprises."
      />

      <ol className="mx-auto mt-16 grid max-w-5xl gap-10 md:grid-cols-4">
        {STEPS.map(({ step, title, body }) => (
          <li key={step} className="relative">
            <span
              aria-hidden="true"
              className="bg-clip-text font-headline text-6xl font-medium text-transparent"
              style={{ backgroundImage: GRADIENT }}
            >
              {step}
            </span>
            <h3 className="mt-4 font-headline text-xl font-medium text-foreground">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-foreground/70">{body}</p>
          </li>
        ))}
      </ol>
      </div>
    </section>
  );
}
