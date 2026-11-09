/**
 * Live sites shown in the Work showcase.
 * To add a site: append an entry. Set `embeddable: false` if the site sends
 * `X-Frame-Options: DENY` or CSP `frame-ancestors 'none'` — it will then show
 * its `poster` image instead of a live iframe.
 */
export type Site = {
  readonly slug: string;
  readonly name: string;
  readonly url: string;
  readonly category: string;
  readonly description: string;
  readonly embeddable: boolean;
  readonly poster?: string;
};

export const SITES: readonly Site[] = [
  {
    slug: "askmyschool",
    name: "AskMySchool",
    url: "https://am-sv1.vercel.app/",
    category: "Startup · AI product",
    description: "Plain-English answers from a school's official documents, with citations you can verify.",
    embeddable: true,
  },
  {
    slug: "roster",
    name: "Roster",
    url: "https://roster-app-gold.vercel.app/",
    category: "Startup · Web app",
    description: "A digital resume for athletes, verified by coaches, at one link a recruiter can open.",
    embeddable: false,
    poster: "/showcase/roster.webp",
  },
  {
    slug: "aura",
    name: "AURA",
    url: "https://aura-renewal-creme.vercel.app/",
    category: "Brand · Product launch",
    description: "A launch site for The Renewal Crème, a cushion-rich daily moisturizer.",
    embeddable: true,
  },
  {
    slug: "hayden-leaf",
    name: "Hayden Leaf",
    url: "https://hayden-leaf-website.vercel.app/",
    category: "Individual · Artist site",
    description: "The official artist site: latest releases, streaming links, and the story behind the music.",
    embeddable: true,
  },
  {
    slug: "mitchell-jamieson",
    name: "Mitchell Jamieson",
    url: "https://mitchell-jamieson.vercel.app/",
    category: "Individual · Archive",
    description: "A tribute to the American painter and U.S. Navy combat artist of the Second World War.",
    embeddable: true,
  },
  {
    slug: "lucas-haines",
    name: "Lucas Haines",
    url: "https://lucashaines-com.vercel.app/",
    category: "Individual · Portfolio",
    description: "Personal site for a designer, developer, and writer.",
    embeddable: true,
  },
];

/** Sites embedded interactively in the Services showcase instead of the Work grid. */
const SERVICES_SHOWCASE_SLUGS = new Set(["askmyschool", "aura", "hayden-leaf"]);

export const WORK_SITES: readonly Site[] = SITES.filter((site) => !SERVICES_SHOWCASE_SLUGS.has(site.slug));

export function getSiteBySlug(slug: string): Site {
  const site = SITES.find((s) => s.slug === slug);
  if (!site) throw new Error(`Unknown site slug: ${slug}`);
  return site;
}

export function displayHost(url: string): string {
  return new URL(url).host;
}
