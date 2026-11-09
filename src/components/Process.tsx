import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShadow } from "@/components/SectionShadow";

const GRADIENT = "linear-gradient(to left, #6366f1, #a855f7, #fcd34d)";
const EASE = [0.16, 1, 0.3, 1] as const;
/** Time for the connecting line to travel the full row; steps reveal as it reaches them. */
const LINE_SECONDS = 1.8;

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
  const listRef = useRef<HTMLOListElement>(null);
  const isInView = useInView(listRef, { once: true, amount: 0.4 });
  const isReduced = useReducedMotion();
  const shouldPlay = isInView || Boolean(isReduced);
  const lineSeconds = isReduced ? 0 : LINE_SECONDS;

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

        <ol ref={listRef} className="relative mx-auto mt-16 grid max-w-5xl gap-12 pl-8 md:grid-cols-4 md:gap-10 md:pl-0 md:pt-10">
          <ProgressLine isPlaying={shouldPlay} seconds={lineSeconds} />
          {STEPS.map(({ step, title, body }, index) => (
            <ProcessStep
              key={step}
              step={step}
              title={title}
              body={body}
              isPlaying={shouldPlay}
              delay={(index / STEPS.length) * lineSeconds}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

type ProgressLineProps = { isPlaying: boolean; seconds: number };

/** Track + drawn line: horizontal above the steps on desktop, vertical on the left on mobile. */
function ProgressLine({ isPlaying, seconds }: ProgressLineProps) {
  const transition = { duration: seconds, ease: "linear" as const };
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute bottom-0 left-[3px] top-2 w-px bg-white/10 md:bottom-auto md:left-0 md:right-0 md:top-[3px] md:h-px md:w-auto" />
      <motion.span
        className="absolute bottom-0 left-[3px] top-2 w-px origin-top bg-gradient-to-b from-foreground/70 to-foreground/20 md:hidden"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isPlaying ? 1 : 0 }}
        transition={transition}
      />
      <motion.span
        className="absolute left-0 right-0 top-[3px] hidden h-px origin-left bg-gradient-to-r from-foreground/70 to-foreground/20 md:block"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isPlaying ? 1 : 0 }}
        transition={transition}
      />
    </span>
  );
}

type ProcessStepProps = {
  step: string;
  title: string;
  body: string;
  isPlaying: boolean;
  delay: number;
};

function ProcessStep({ step, title, body, isPlaying, delay }: ProcessStepProps) {
  const reveal = (extra: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: isPlaying ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { delay: delay + extra, duration: 0.7, ease: EASE },
  });

  return (
    <li className="group relative">
      {/* Node on the line; lights up when the line reaches this step. */}
      <motion.span
        aria-hidden="true"
        className="absolute -left-8 top-2 h-[7px] w-[7px] rounded-full bg-foreground md:-top-10 md:left-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={isPlaying ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ delay, duration: 0.4, ease: EASE }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute -left-8 top-2 h-[7px] w-[7px] rounded-full bg-foreground/40 md:-top-10 md:left-0"
        initial={{ scale: 1, opacity: 0 }}
        animate={isPlaying ? { scale: [1, 3.2], opacity: [0.6, 0] } : undefined}
        transition={{ delay, duration: 0.9, ease: "easeOut" }}
      />

      <span className="block overflow-hidden">
        <motion.span
          aria-hidden="true"
          className="block bg-clip-text font-headline text-6xl font-medium text-transparent transition-transform duration-500 ease-out group-hover:-translate-y-1"
          style={{ backgroundImage: GRADIENT }}
          initial={{ y: "100%" }}
          animate={{ y: isPlaying ? "0%" : "100%" }}
          transition={{ delay, duration: 0.8, ease: EASE }}
        >
          {step}
        </motion.span>
      </span>
      <motion.h3 className="mt-4 font-headline text-xl font-medium text-foreground" {...reveal(0.1)}>
        {title}
      </motion.h3>
      <motion.p className="mt-3 text-sm leading-6 text-foreground/70" {...reveal(0.2)}>
        {body}
      </motion.p>
    </li>
  );
}
