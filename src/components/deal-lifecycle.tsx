import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { TextLink } from "@/components/button";
import { images } from "@/lib/site";

// Nicholas's signature framing: where the people side of a deal is won or lost, phase by phase.
const phases = [
  {
    when: "Before signing",
    title: "People due diligence",
    body: "Leadership, culture and workforce liabilities surfaced and priced into the deal, not discovered after it.",
  },
  {
    when: "Signing to close",
    title: "Day 1 readiness",
    body: "Organisation design, communication and TSAs ready, so two workforces wake up to one clear story.",
  },
  {
    when: "First 100 days",
    title: "Integration",
    body: "Operating model, harmonised terms and leadership decisions landed while momentum is still there.",
  },
  {
    when: "After close",
    title: "Stabilise and retain",
    body: "Keep the people who carry the deal value, then hand a working plan over to your HR team.",
  },
];

export function DealLifecycle({
  title = "From diligence to Day 100.",
  lead = "Most deals do not fail on paper. They lose value in execution, when the people side is left until last. Nicholas works across the whole lifecycle, or drops in where you need him.",
  link = true,
  flush = false,
}: {
  title?: string;
  lead?: string;
  link?: boolean;
  /** Drop the bottom padding when the next section brings its own top margin. */
  flush?: boolean;
}) {
  return (
    <section className={`mx-auto max-w-[1400px] px-4 md:px-8 ${flush ? "" : "pb-24 md:pb-32"}`}>
      <Reveal className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end md:gap-20">
        <h2 className="max-w-[16ch] text-4xl font-semibold tracking-tighter md:text-5xl">{title}</h2>
        <div>
          <p className="max-w-[52ch] text-lg leading-relaxed text-muted">{lead}</p>
          {link && (
            <div className="mt-6">
              <TextLink href="/advisory">See the advisory services</TextLink>
            </div>
          )}
        </div>
      </Reveal>

      {/* Two towers, one bridge: the visual metaphor for two organisations becoming one */}
      <Reveal className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl bg-surface md:mt-16 md:aspect-[21/9]">
        <Image src={images.skybridge} alt="" fill sizes="(min-width: 1400px) 1336px, 100vw" className="object-cover" />
      </Reveal>

      <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
        {/* The deal timeline: vertical on mobile, horizontal from md up */}
        <span
          aria-hidden
          className="absolute bottom-2 left-[7px] top-2 w-px bg-line md:bottom-auto md:left-0 md:right-0 md:top-[7px] md:h-px md:w-auto"
        />
        {phases.map((p, i) => (
          <li key={p.title} className="relative pl-10 md:pl-0 md:pt-12">
            <span
              aria-hidden
              className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 border-gold bg-bg md:top-0"
            />
            <Reveal delay={i * 0.08}>
              <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-highlight">{p.when}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-muted">{p.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
