import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const GRADIENT = "linear-gradient(to left, #6366f1, #a855f7, #fcd34d)";

export function CtaSection() {
  return (
    <section id="contact" aria-labelledby="cta-heading" className="relative overflow-visible px-8 py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-gray-950 opacity-90 blur-[82px]"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <h2
          id="cta-heading"
          className="font-headline text-6xl font-normal leading-[1.05] tracking-[-0.02em] md:text-7xl"
        >
          <span className="text-foreground">Your site,</span>{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
            conjured
          </span>
        </h2>
        <p className="mt-5 text-lg leading-8 text-hero-sub opacity-80">
          Tell us what you're building. We'll reply within one business day with ideas and a fixed quote.
        </p>
        <a
          href="mailto:hello@talismantech.dev?subject=Website%20consult"
          className={cn(
            buttonVariants({ variant: "heroSecondary", size: "unset" }),
            "mt-8 px-[29px] py-[24px]"
          )}
        >
          Schedule a Consult
        </a>
        <p className="mt-6 text-sm text-foreground/50">
          or email{" "}
          <a href="mailto:hello@talismantech.dev" className="text-foreground/80 underline-offset-4 hover:underline">
            hello@talismantech.dev
          </a>
        </p>
      </div>
    </section>
  );
}
