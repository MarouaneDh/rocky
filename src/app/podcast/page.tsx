import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SubscribeForm } from "@/components/forms";
import { images } from "@/lib/site";

export const metadata = pageMeta({
  title: "Podcast",
  description:
    "A podcast from Nicholas Williams on deals, leadership and the people who make change work. Coming soon.",
  path: "/podcast", noindex: true,
});

export default function PodcastPage() {
  return (
    <section className="mx-auto grid max-w-[1400px] gap-12 px-4 py-16 md:min-h-[calc(100dvh-72px)] md:grid-cols-[1.2fr_1fr] md:items-center md:px-8 md:py-24">
      <Reveal>
        <span className="inline-flex rounded-full border border-line px-4 py-1.5 text-[14px] text-muted">
          Coming soon
        </span>
        <h1 className="mt-8 max-w-[16ch] text-5xl font-semibold leading-[1.02] tracking-tighter md:text-7xl">
          Leaders who have lived through the deal.
        </h1>
        <p className="mt-8 max-w-[48ch] text-lg leading-relaxed text-muted md:text-xl">
          Honest conversations with CEOs, CHROs and dealmakers about what really happens to people
          when businesses change.
        </p>
        <div className="mt-10 max-w-[560px]">
          <SubscribeForm list="podcast" cta="Notify me" successTitle="You will hear about episode one first." />
        </div>
      </Reveal>
      <Reveal delay={0.1} className="relative hidden aspect-square overflow-hidden rounded-2xl bg-[#0b2641] md:block">
        <Image src={images.microphone} alt="" fill priority sizes="(min-width: 768px) 45vw, 0px" className="object-cover" />
      </Reveal>
    </section>
  );
}
