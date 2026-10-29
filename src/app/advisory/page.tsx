import { breadcrumb, graph, pageMeta, services } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import {
  Handshake,
  MagnifyingGlass,
  GitMerge,
  Megaphone,
  UsersThree,
  Plus,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { Contact } from "@/components/contact";
import { AmanahLogo } from "@/components/brand";
import { DealLifecycle } from "@/components/deal-lifecycle";
import { advisoryServices, contactHref, contactLabel, images, site, stats } from "@/lib/site";

export const metadata = pageMeta({
  title: "HR M&A Advisory and People Due Diligence",
  description:
    "Amanah People Advisory provides fractional HR M&A leadership, people due diligence, post-merger integration and change support for deals across the GCC and UK.",
  path: "/advisory",
});

const icons = [Handshake, MagnifyingGlass, GitMerge, Megaphone, UsersThree];

const steps = [
  {
    title: "A confidential first call",
    body: "The deal, the timeline and what is keeping you up at night. No cost and no commitment.",
  },
  {
    title: "A clear written scope",
    body: "Workstreams, deliverables, time and fees set out upfront, so everyone knows what they are getting.",
  },
  {
    title: "Embedded in the deal team",
    body: "Working inside your deal team or IMO, alongside finance, legal and your other advisors.",
  },
  {
    title: "A clean handover",
    body: "Your HR team gets the decisions, documents and plan they need to carry it forward.",
  },
];

// TODO: confirm pricing and start-time answers with the client.
const faqs = [
  {
    q: "Can you work alongside our existing advisors?",
    a: "Yes. Nicholas has worked alongside MBB, Big Four and specialist firms, usually leading the people workstream next to their financial, legal and commercial work.",
  },
  {
    q: "Which regions do you cover?",
    a: "Most work is across the GCC and the UK, including cross-border deals with a Gulf or UK side.",
  },
  {
    q: "How are engagements priced?",
    a: "Either a fixed fee for a defined scope or a day rate for fractional support, agreed in writing before work starts.",
  },
  {
    q: "How quickly can you start?",
    a: "Usually within a couple of weeks, and faster when diligence is time critical.",
  },
  {
    q: "Is everything kept confidential?",
    a: "Yes. An NDA is standard before any deal details are shared.",
  },
];

export default function AdvisoryPage() {
  return (
    <>
      <JsonLd data={graph(...services(advisoryServices), breadcrumb("Advisory", "/advisory"))} />
      <PageIntro
        aside={
          <div className="w-full rounded-2xl bg-surface p-8 md:w-[340px]">
            <AmanahLogo priority className="w-40" />
            <dl className="mt-8 grid gap-5 border-t border-line pt-6">
              {stats.slice(0, 2).map((s) => (
                <div key={s.value}>
                  <dt className="text-[14px] text-muted">{s.label}</dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tighter">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
        title="Getting the people side of deals right."
        lead={`${site.company} bridges the gap between people and M&A. Experienced alongside MBB, Big Four and specialist firms on local and global deals.`}
      >
        <Button href={contactHref}>{contactLabel}</Button>
      </PageIntro>

      <Reveal className="mx-auto mb-16 max-w-[1400px] px-4 md:mb-24 md:px-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-surface md:aspect-[21/9]">
          <Image
            src={images.meeting}
            alt="Two advisors in conversation at a boardroom table at dusk, one taking notes"
            fill
            sizes="(min-width: 1400px) 1336px, 100vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      <section className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
          {advisoryServices.map((s, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={s.title} delay={(i % 2) * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
                <div className={i === 0 ? "grid gap-6 rounded-2xl bg-accent p-8 text-accent-ink md:grid-cols-[auto_1fr] md:p-12" : "grid gap-5 border-t border-line pt-8"}>
                  <Icon size={36} weight="light" className={i === 0 ? "" : "text-highlight"} />
                  <div>
                    <h2 className={`font-semibold tracking-tight ${i === 0 ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                      {s.title}
                    </h2>
                    <p className={`mt-3 max-w-[52ch] text-[16px] leading-relaxed ${i === 0 ? "opacity-85" : "text-muted"}`}>
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <div className="mt-24 md:mt-32">
        <DealLifecycle
          title="When to bring Nicholas in."
          lead="At any point in the deal, or across all of it. The earlier the people side is in the room, the more value it protects."
          link={false}
          flush
        />
      </div>

      <section className="mx-auto mt-24 max-w-[1400px] px-4 md:mt-32 md:px-8">
        <Reveal>
          <h2 className="max-w-[18ch] text-4xl font-semibold tracking-tighter md:text-5xl">
            How an engagement works.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className="h-full">
              <div className="flex h-full flex-col rounded-2xl bg-surface p-6 md:p-8">
                <span className="font-mono text-[14px] text-highlight">0{i + 1}</span>
                <h3 className="mt-10 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 grid max-w-[1400px] gap-12 px-4 md:mt-32 md:grid-cols-[1fr_1.2fr] md:gap-20 md:px-8">
        <Reveal>
          <h2 className="max-w-[14ch] text-4xl font-semibold tracking-tighter md:text-5xl">
            Common questions.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus
                    size={18}
                    className="shrink-0 text-highlight transition-transform duration-300 group-open:rotate-45"
                    aria-hidden
                  />
                </summary>
                <p className="mt-3 max-w-[60ch] text-[16px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      <Contact />
    </>
  );
}
