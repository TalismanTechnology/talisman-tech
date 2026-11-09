import { SITES, type Site } from "@/data/sites";

/** A client testimonial, tied to a showcased site by slug. */
export type Testimonial = {
  readonly siteSlug: Site["slug"];
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  /** Star rating out of 5. */
  readonly rating: number;
};

/** Testimonials shown on the site. */
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    siteSlug: "roster",
    quote:
      "Lucas turned Roster from a pitch into a product. It looks like a real company from the first scroll, and every detail, down to how a recruiter opens a profile, was thought through.",
    name: "Iliyan Moloo",
    role: "Roster",
    rating: 5,
  },
  {
    siteSlug: "mitchell-jamieson",
    quote:
      "We wanted a home for Mitchell's work that felt as quiet and serious as the paintings themselves. Talisman built exactly that: an archive that lets the art speak first.",
    name: "The Jamieson Family",
    role: "Family of Mitchell Jamieson",
    rating: 5,
  },
  {
    siteSlug: "hayden-leaf",
    quote:
      "I wanted a site that looks the way my music sounds, and they nailed it. It's the first link I send anyone, and every release is one tap away.",
    name: "Hayden Leaf",
    role: "Artist",
    rating: 5,
  },
];

export type TestimonialWithSite = Testimonial & { readonly site: Site };

/** Testimonials joined with their site; entries whose site is missing are dropped. */
export function getVisibleTestimonials(): TestimonialWithSite[] {
  return TESTIMONIALS.flatMap((testimonial) => {
    const site = SITES.find((s) => s.slug === testimonial.siteSlug);
    return site ? [{ ...testimonial, site }] : [];
  });
}
