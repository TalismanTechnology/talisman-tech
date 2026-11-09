import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShadow } from "@/components/SectionShadow";
import { AudienceTabs } from "@/components/service-showcase/AudienceTabs";
import { ServiceStage } from "@/components/service-showcase/ServiceStage";
import { AUDIENCES, CYCLE_MS } from "@/components/service-showcase/data";
import { useAutoCycle } from "@/hooks/useAutoCycle";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Services() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(showcaseRef, { amount: 0.35 });
  const isReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [hasPicked, setHasPicked] = useState(false);

  // Auto-advance only while visible, not hovered, and until the visitor picks a tab.
  const isCycling = isInView && !isHovered && !hasPicked && !isReduced;
  const [activeIndex, setActiveIndex] = useAutoCycle(AUDIENCES.length, CYCLE_MS, !isCycling);

  // Clicking into an embedded site moves focus into its iframe, which blurs this
  // window. Treat that as the visitor engaging and stop auto-advancing.
  useEffect(() => {
    const handleWindowBlur = () => {
      const focused = document.activeElement;
      if (focused?.tagName === "IFRAME" && showcaseRef.current?.contains(focused)) {
        setHasPicked(true);
      }
    };
    window.addEventListener("blur", handleWindowBlur);
    return () => window.removeEventListener("blur", handleWindowBlur);
  }, []);

  const handleSelect = (index: number) => {
    setHasPicked(true);
    setActiveIndex(index);
  };

  return (
    <section id="services" aria-labelledby="services-heading" className="relative px-4 py-28 sm:px-8">
      <SectionShadow />
      <div className="relative">
        <SectionHeading
          id="services-heading"
          eyebrow="Services"
          title="Built for"
          gradientWord="whoever you are"
          description="One studio, three kinds of clients. Every site is designed from scratch — no templates, no page builders."
        />

        <motion.div
          ref={showcaseRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
          className="mx-auto mt-16 grid max-w-6xl gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:items-center lg:gap-8"
        >
          <AudienceTabs activeIndex={activeIndex} isCycling={isCycling} onSelect={handleSelect} />
          <ServiceStage audience={AUDIENCES[activeIndex]} />
        </motion.div>
      </div>
    </section>
  );
}
