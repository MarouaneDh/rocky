import { breadcrumb, graph, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import Image from "next/image";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { SubscribeForm } from "@/components/forms";
import { images, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "The People Side Newsletter",
  description:
    "Subscribe to The People Side: short, practical notes from Nicholas Williams on M&A, leadership and talent, written from the Gulf for leaders everywhere.",
  path: "/newsletter",
});

const inside = [
  { title: "Deal notes", body: "What actually happens to people and culture after the press release." },
  { title: "Leadership calls", body: "How boards and CEOs decide who leads what comes next." },
  { title: "The Gulf view", body: "Talent, regulation and ways of working in the region, explained for global readers." },
];

export default function NewsletterPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumb("Newsletter", "/newsletter"))} />
      <PageIntro
        title={site.newsletterName}
        lead="Short, practical notes on deals, leadership and talent. Written for CEOs, HR leaders and deal teams who prefer substance to noise."
      />

      <section className="mx-auto grid max-w-[1400px] gap-4 px-4 md:grid-cols-[minmax(0,640px)_1fr] md:px-8">
        <Reveal className="rounded-2xl bg-accent-soft p-6 md:p-10">
          <SubscribeForm />
        </Reveal>
        <Reveal delay={0.1} className="relative min-h-[260px] overflow-hidden rounded-2xl bg-surface">
          <Image
            src={images.desk}
            alt="An open notebook sketch, a brass pen, Arabic coffee and the financial pages on a navy desk"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
        <h2 className="text-4xl font-semibold tracking-tighter md:text-5xl">What you will read</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {inside.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="border-t border-line pt-6">
              <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 max-w-[36ch] text-[16px] leading-relaxed text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
        {/* Latest issues land here once the newsletter platform is chosen. */}
        <Reveal className="mt-20 rounded-2xl border border-dashed border-line p-8 md:p-12">
          <p className="text-lg font-medium">The first issue is in the works.</p>
          <p className="mt-2 max-w-[52ch] text-[15px] text-muted">
            Subscribe above and it will reach you first. Past issues will be archived on this page.
          </p>
        </Reveal>
      </section>
    </>
  );
}
