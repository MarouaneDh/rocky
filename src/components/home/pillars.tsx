import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Microphone } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { advisoryServices, images, site } from "@/lib/site";
import { AmanahLogo } from "@/components/brand";
import { Spotlight } from "@/components/spotlight";

function Arrow() {
  return (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-current/25 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-45">
      <ArrowUpRight size={16} weight="bold" className="rotate-45" />
    </span>
  );
}

export function Pillars() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-24 md:px-8 md:pb-32">
      <Reveal>
        <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-highlight">
          Work with Nicholas
        </p>
        <h2 className="mt-4 max-w-[18ch] text-4xl font-semibold tracking-tighter md:text-5xl">
          Four ways in, one point of view.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-12 md:grid-rows-[minmax(280px,auto)_minmax(280px,auto)]">
        {/* Advisory: the anchor offer, tallest tile */}
        <Reveal className="md:col-span-7 md:row-span-2">
          <Link
            href="/advisory"
            className="group relative flex h-full min-h-[480px] flex-col justify-between overflow-hidden rounded-2xl bg-[#0b2641] p-6 ring-1 ring-inset ring-white/10 md:p-10"
          >
            <Image
              src={images.advisory}
              alt=""
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover opacity-45 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b2641] via-[#0b2641]/70 to-[#0b2641]/20" />
            <Spotlight size={520} />
            <AmanahLogo tone="reversed" className="relative w-40 md:w-48" />
            <ul className="relative my-10 flex max-w-[52ch] flex-wrap gap-2 text-[14px] text-[#eef1f5]/85">
              {advisoryServices.map((s) => (
                <li key={s.title} className="rounded-full border border-white/15 px-3.5 py-1.5">
                  {s.title}
                </li>
              ))}
            </ul>
            <div className="relative flex items-end justify-between gap-6 text-[#eef1f5]">
              <div>
                <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">Advisory</h3>
                <p className="mt-3 max-w-[42ch] text-[16px] leading-relaxed text-[#eef1f5]/80">
                  Fractional HR M&A leadership, people diligence and integration support through{" "}
                  {site.company}.
                </p>
              </div>
              <Arrow />
            </div>
          </Link>
        </Reveal>

        {/* Speaking */}
        <Reveal delay={0.06} className="md:col-span-5">
          <Link
            href="/speaking"
            className="group relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl bg-ink p-6 md:p-8"
          >
            <Image
              src={images.speaking}
              alt=""
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover opacity-50 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-scrim/90 to-transparent" />
            <Spotlight />
            <div className="relative flex items-end justify-between gap-6 text-[#eef1f5]">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">Speaking</h3>
                <p className="mt-2 max-w-[34ch] text-[15px] leading-relaxed text-[#eef1f5]/80">
                  Keynotes and panels on M&A, leadership and the human side of change.
                </p>
              </div>
              <Arrow />
            </div>
          </Link>
        </Reveal>

        {/* Newsletter + Podcast share the second row */}
        <div className="grid gap-4 sm:grid-cols-2 md:col-span-5">
          <Reveal delay={0.12}>
            <Link
              href="/newsletter"
              className="group flex h-full min-h-[260px] flex-col justify-between rounded-2xl bg-gold p-6 text-on-gold"
            >
              <Arrow />
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">Newsletter</h3>
                <p className="mt-2 text-[15px] leading-relaxed opacity-85">
                  {site.newsletterName}: practical notes on deals, leadership and talent.
                </p>
              </div>
            </Link>
          </Reveal>
          <Reveal delay={0.18}>
            <Link
              href="/podcast"
              className="group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl bg-surface p-6"
            >
              <Spotlight size={320} />
              <Microphone
                aria-hidden
                size={180}
                weight="thin"
                className="pointer-events-none absolute -right-8 -top-6 text-ink/[0.07]"
              />
              <span className="relative w-fit rounded-full border border-line px-3 py-1 text-[13px] text-muted">
                Coming soon
              </span>
              <div className="relative">
                <h3 className="text-2xl font-semibold tracking-tight">Podcast</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  Conversations with leaders who have lived through the deal.
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
