import { User, Rocket, Store, type LucideIcon } from "lucide-react";
import { getSiteBySlug, type Site } from "@/data/sites";

export type AudienceId = "individuals" | "startups" | "businesses";

export type Audience = {
  id: AudienceId;
  icon: LucideIcon;
  title: string;
  tagline: string;
  points: readonly string[];
  /** Real client site embedded live for this audience. */
  site: Site;
};

export const AUDIENCES: readonly Audience[] = [
  {
    id: "individuals",
    icon: User,
    title: "Individuals",
    tagline: "Personal sites that open doors",
    points: ["Portfolios & personal brands", "Resume and link-in-bio sites", "Blogs and creator pages"],
    site: getSiteBySlug("hayden-leaf"),
  },
  {
    id: "startups",
    icon: Rocket,
    title: "Startups",
    tagline: "Ship a site as fast as you ship product",
    points: ["Landing pages that convert", "Product marketing sites", "Waitlists, docs & launch pages"],
    site: getSiteBySlug("askmyschool"),
  },
  {
    id: "businesses",
    icon: Store,
    title: "Small Businesses",
    tagline: "Look bigger than you are",
    points: ["Business sites & booking flows", "Local SEO foundations", "Simple e-commerce storefronts"],
    site: getSiteBySlug("aura"),
  },
];

export const CYCLE_MS = 7000;
