import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { LogoMarquee } from "@/components/logo-marquee";
import { stats } from "@/lib/site";

// Organisations from Nicholas's career (employers and education, not clients).
const experience = [
  "EY-Parthenon",
  "EY",
  "Amazon",
  "UK Civil Service",
  "Metropolitan Police",
  "Surrey Police",
  "Imperial College Business School",
];

export function Stats() {
  return (
    <section aria-label="At a glance" className="border-y border-line">
      <dl className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-10 px-4 py-14 md:grid-cols-4 md:px-8 md:py-16">
        {stats.map((s, i) => (
          <Reveal key={s.value} delay={i * 0.06} className="flex flex-col-reverse pr-6">
            <dt className="mt-3 max-w-[24ch] text-[14px] leading-snug text-muted">{s.label}</dt>
            <dd className="text-4xl font-semibold tracking-tighter md:text-5xl">
              <CountUp value={s.value} />
            </dd>
          </Reveal>
        ))}
      </dl>
      <div className="border-t border-line">
        <div className="mx-auto grid max-w-[1400px] items-center gap-4 px-4 py-8 md:grid-cols-[auto_1fr] md:gap-10 md:px-8">
          <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-highlight">Experience across</p>
          <LogoMarquee items={experience} label="Organisations Nicholas has worked with" />
        </div>
      </div>
    </section>
  );
}
