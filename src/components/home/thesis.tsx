import { Reveal } from "@/components/reveal";
import { TextLink } from "@/components/button";
import { TextReveal } from "@/components/text-reveal";

const statement = [
  { text: "What interests me most is what happens when" },
  { text: "the plan meets the people.", className: "text-highlight" },
];

export function Thesis() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-36">
      <div className="md:pl-[16vw] lg:pl-[22vw]">
        <p className="max-w-[22ch] text-3xl font-medium leading-[1.12] tracking-tight md:text-5xl">
          <TextReveal parts={statement} />
        </p>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-[56ch] text-lg leading-relaxed text-muted">
            A deal looks right on paper, but the leadership team needs to change. Two businesses
            come together with very different ways of working. That is usually where value is kept
            or lost, and where I spend my time.
          </p>
          <div className="mt-8">
            <TextLink href="/about">More about Nicholas</TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
