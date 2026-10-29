import type { Metadata } from "next";
import { site } from "./site";

// Per-page metadata. Next merges metadata shallowly, so openGraph/twitter are rebuilt here
// in full rather than relying on the root layout's values.
export function pageMeta({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const fullTitle = path === "/" ? title : `${title} | ${site.name}`;
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: path === "/about" ? "profile" : "website",
      url: path,
      siteName: site.name,
      locale: "en_GB",
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

const personId = `${site.url}/#person`;
const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

export const person = {
  "@type": "Person",
  "@id": personId,
  name: site.name,
  url: site.url,
  image: `${site.url}/images/nicholas-headshot.jpg`,
  jobTitle: "Founder and Managing Director, HR M&A Advisor",
  description:
    "HR M&A advisor and speaker based in Dubai. Former EY-Parthenon HR M&A Practice Leader MENA, working across 60+ transactions.",
  worksFor: { "@id": orgId },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Imperial College Business School" },
    { "@type": "Organization", name: "EY-Parthenon" },
    { "@type": "Organization", name: "Metropolitan Police" },
  ],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", name: "Chartered Fellow, CIPD" },
    { "@type": "EducationalOccupationalCredential", name: "Fellow, Chartered Management Institute" },
  ],
  knowsAbout: [
    "Mergers and acquisitions",
    "HR due diligence",
    "Post-merger integration",
    "Organisational design",
    "Change management",
    "Executive leadership",
    "Talent strategy",
  ],
  homeLocation: { "@type": "Place", name: "Dubai, United Arab Emirates" },
  sameAs: site.sameAs,
};

export const organization = {
  "@type": "ProfessionalService",
  "@id": orgId,
  name: `${site.company} FZ-LLC`,
  alternateName: site.company,
  url: `${site.url}/advisory`,
  logo: `${site.url}/brand/amanah-logo.png`,
  founder: { "@id": personId },
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressRegion: "Meydan Free Zone",
    addressCountry: "AE",
  },
  areaServed: ["Gulf Cooperation Council", "United Kingdom"],
  knowsAbout: ["HR due diligence", "Post-merger integration", "Carve-outs and separations", "Change management"],
};

export const website = {
  "@type": "WebSite",
  "@id": websiteId,
  url: site.url,
  name: site.name,
  inLanguage: "en-GB",
  publisher: { "@id": personId },
};

export function breadcrumb(name: string, path: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name, item: `${site.url}${path}` },
    ],
  };
}

export function services(items: { title: string; body: string }[]) {
  return items.map((s) => ({
    "@type": "Service",
    name: s.title,
    description: s.body,
    serviceType: "HR M&A advisory",
    provider: { "@id": orgId },
    areaServed: organization.areaServed,
    url: `${site.url}/advisory`,
  }));
}

export function speakingService(topics: string[]) {
  return {
    "@type": "Service",
    name: "Keynote speaking",
    serviceType: "Public speaking",
    provider: { "@id": personId },
    url: `${site.url}/speaking`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Speaking topics",
      itemListElement: topics.map((t) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: t } })),
    },
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
