// Single source of truth for copy and facts.
// Facts are taken from Nicholas's LinkedIn profile (Oct 2026). Items marked TODO need client input.

export const site = {
  name: "Nicholas Williams",
  role: "HR M&A Advisor",
  company: "Amanah People Advisory",
  // TODO: confirm public contact address with the client.
  email: "hello@amanahpeople.com",
  linkedin: "https://www.linkedin.com/in/rockyvwilliams/",
  location: "Based in Dubai, working across the Gulf and internationally.",
  newsletterName: "The People Side", // TODO: confirm newsletter name with client.
  // Canonical origin used for canonical URLs, sitemap, OG and JSON-LD.
  // TODO: set NEXT_PUBLIC_SITE_URL to the final domain before launch.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nicholaswilliams.com").replace(/\/$/, ""),
  // Real profiles that confirm identity for search engines (schema.org sameAs). Add more as they exist.
  sameAs: ["https://www.linkedin.com/in/rockyvwilliams/"],
};

export const nav = [
  { href: "/advisory", label: "Advisory" },
  { href: "/speaking", label: "Speaking" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/podcast", label: "Podcast" },
  { href: "/about", label: "About" },
];

export const contactHref = "/#contact";
export const contactLabel = "Get in touch";

// Photography in /public/images. Only the headshot shows Nicholas; the rest are generated scene images
// with no identifiable people, so their alt text must never claim to show him.
export const images = {
  // Client headshot (400x400). TODO: request a higher-resolution original (1200px+) and a candid shot for About.
  portrait: "/images/nicholas-headshot.jpg",
  about: "/images/nicholas-headshot.jpg",
  advisory: "/images/advisory-boardroom.jpg",
  meeting: "/images/advisory-meeting.jpg",
  speaking: "/images/speaking-stage.jpg",
  skybridge: "/images/deal-skybridge.jpg",
  desk: "/images/newsletter-desk.jpg",
  creek: "/images/about-dubai-creek.jpg",
  microphone: "/images/podcast-microphone.jpg",
};

export const stats = [
  { value: "60+", label: "Transactions led on the people workstream" },
  { value: "$3.2bn", label: "Largest deal supported" },
  { value: "17 yrs", label: "Across policing, government, consulting and M&A" },
  { value: "FCIPD", label: "Chartered Fellow of the CIPD and Fellow of the CMI" },
];

export const career = [
  {
    years: "2026",
    org: "Amanah People Advisory",
    title: "Founder and Managing Director",
    place: "Dubai",
  },
  {
    years: "2023 - 2026",
    org: "EY-Parthenon",
    title: "Director, HR M&A Practice Leader MENA",
    place: "Dubai",
  },
  {
    years: "2021",
    org: "Amazon",
    title: "Senior Principal, HR Transformation",
    place: "Europe",
  },
  {
    years: "2019 - 2023",
    org: "EY",
    title: "Senior Manager, Talent and HR Transformation",
    place: "London and Dubai",
  },
  {
    years: "2016 - 2019",
    org: "UK Civil Service",
    title: "Head of Culture, Chief of Staff, Head of HR Policy",
    place: "Whitehall",
  },
  {
    years: "2015 - 2016",
    org: "Surrey Police",
    title: "Police Inspector",
    place: "Surrey",
  },
  {
    years: "2009 - 2015",
    org: "Metropolitan Police",
    title: "Police Sergeant",
    place: "London",
  },
];

// Excerpts from LinkedIn recommendations. TODO: confirm both people are happy to be quoted.
export const testimonials = [
  {
    quote:
      "I was impressed by his deep understanding of the latest global HR technology and transformation trends.",
    name: "Karel Foltyn",
    role: "Chief People Officer, Rohlik Group",
  },
  {
    quote:
      "He brings enthusiasm, knowledge and belief to all he does. He has a wealth of experience across public and private sector.",
    name: "Pearl Cox",
    role: "Strategic Consultant",
  },
];

export const advisoryServices = [
  {
    title: "Fractional HR M&A lead",
    body: "A senior people integration lead embedded in your deal team or IMO, for as long as the deal needs one.",
  },
  {
    title: "HR due diligence and people risk",
    body: "Surfacing the people liabilities that never make it into the financial model, working alongside finance and legal.",
  },
  {
    title: "Post-merger integration and separation",
    body: "Target operating model, Day 1 readiness, workforce cost modelling and TSAs, through to post-close stabilisation.",
  },
  {
    title: "Change and communication",
    body: "Explaining the why, what, who and when of change so leaders and teams can act on it.",
  },
  {
    title: "Leadership and talent decisions",
    body: "Is the leadership team right for what comes next? Grounded in years close to executive search.",
  },
];

export const speakingTopics = [
  {
    title: "When the plan meets the people",
    body: "Why deals that look right on paper stall in integration, and what boards can do before signing.",
  },
  {
    title: "The leadership team after the deal",
    body: "An impressive track record is not always what the business needs next. How to tell the difference.",
  },
  {
    title: "From the beat to the boardroom",
    body: "Lessons in leadership, pressure and judgement from policing, Whitehall and high-stakes M&A.",
  },
  {
    title: "Performance without burnout",
    body: "Building an ambitious career without letting work consume everything else.",
  },
];
