import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShadow } from "@/components/SectionShadow";
import { cn } from "@/lib/utils";

const GRADIENT = "linear-gradient(to left, #6366f1, #a855f7, #fcd34d)";

const INCLUDED = [
  "Custom design — no templates, no page builders",
  "Mobile-first, fast & accessible",
  "Domain, hosting, analytics & SEO setup",
  "Booking, forms & e-commerce when you need them",
  "You own the site outright",
] as const;

export function Plans() {
  return (
    <section id="plans" aria-labelledby="plans-heading" className="relative px-8 py-28">
      <SectionShadow />
      <div className="relative">
      <SectionHeading
        id="plans-heading"
        eyebrow="Pricing"
        title="Simple,"
        gradientWord="honest pricing"
        description="Every project is different, so we don't do one-size-fits-all tiers. Tell us what you're building and we'll send a fixed quote."
      />

      <div className="mx-auto mt-16 max-w-xl">
        <div className="rounded-2xl p-[1.4px]" style={{ backgroundImage: GRADIENT }}>
          <article className="flex flex-col rounded-2xl bg-background p-10 text-center">
            <h3 className="font-headline text-xl font-medium text-foreground">Your project</h3>
            <p className="mt-4 font-headline text-5xl font-medium text-foreground">Price on request</p>
            <p className="mt-3 text-sm text-hero-sub opacity-80">
              A free consult, then a fixed quote — the price we agree on is the price you pay.
            </p>
            <ul className="mx-auto mt-8 space-y-3 text-left text-sm leading-6 text-foreground/70">
              {INCLUDED.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-foreground/50" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className={cn(
                buttonVariants({ variant: "heroSecondary", size: "unset" }),
                "mt-10 w-full px-6 py-4"
              )}
            >
              Schedule a Consult
            </a>
          </article>
        </div>
      </div>
      </div>
    </section>
  );
}
