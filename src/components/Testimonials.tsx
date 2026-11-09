import { Star } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShadow } from "@/components/SectionShadow";
import { getVisibleTestimonials } from "@/data/testimonials";

export function Testimonials() {
  const testimonials = getVisibleTestimonials();
  if (testimonials.length === 0) return null;

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
          {testimonials.map(({ siteSlug, quote, name, role, site, rating }) => (
            <figure key={siteSlug} className="liquid-glass flex flex-col rounded-2xl p-8">
              <StarRating rating={rating} />
              <blockquote className="flex-1 text-sm leading-7 text-foreground/80">“{quote}”</blockquote>
              <figcaption className="mt-6">
                <div>
                  <p className="text-sm font-semibold text-foreground">{name}</p>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${role} — visit ${site.name}`}
                    className="text-xs text-foreground/50 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {role}
                  </a>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const MAX_STARS = 5;

function StarRating({ rating }: { rating: number }) {
  return (
    <div role="img" aria-label={`Rated ${rating} out of ${MAX_STARS}`} className="mb-5 flex gap-1">
      {Array.from({ length: MAX_STARS }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={i < rating ? "h-4 w-4 fill-amber-300 text-amber-300" : "h-4 w-4 text-foreground/20"}
        />
      ))}
    </div>
  );
}
