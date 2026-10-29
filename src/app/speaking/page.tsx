import { breadcrumb, graph, pageMeta, speakingService } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import Image from "next/image";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { Contact } from "@/components/contact";
import { contactHref, contactLabel, images, speakingTopics } from "@/lib/site";

export const metadata = pageMeta({
  title: "Keynote Speaker on M&A and Leadership",
  description:
    "Book Nicholas Williams for keynotes, panels and fireside conversations on M&A, leadership teams and the human side of change, in Dubai and internationally.",
  path: "/speaking",
});

const formats = ["Keynotes", "Panels and moderation", "Fireside conversations", "Leadership offsites"];

export default function SpeakingPage() {
  return (
    <>
      <JsonLd data={graph(speakingService(speakingTopics.map((t) => t.title)), breadcrumb("Speaking", "/speaking"))} />
      <PageIntro
        title="Talks for rooms that make the decisions."
        lead="Grounded in 60+ transactions, seven years in policing and years inside Whitehall. Candid, practical and built around your audience."
      >
        <Button href={contactHref}>{contactLabel}</Button>
      </PageIntro>

      <Reveal className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-surface md:aspect-[21/9]">
          {/* TODO: swap for a real on-stage photo of Nicholas once one exists, and update the alt text */}
          <Image src={images.speaking} alt="A speaker at a lectern on a conference stage, seen from the back of a full auditorium" fill priority sizes="100vw" className="object-cover" />
        </div>
      </Reveal>

      <section className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
        <h2 className="text-4xl font-semibold tracking-tighter md:text-5xl">Signature topics</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {speakingTopics.map((t, i) => (
            <Reveal key={t.title} delay={(i % 2) * 0.08}>
              <article className="flex h-full min-h-[240px] flex-col justify-between rounded-2xl bg-surface p-7 md:p-10">
                <h3 className="max-w-[20ch] text-2xl font-semibold tracking-tight md:text-3xl">{t.title}</h3>
                <p className="mt-8 max-w-[44ch] text-[16px] leading-relaxed text-muted">{t.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 flex flex-wrap gap-3">
          {formats.map((f) => (
            <span key={f} className="rounded-full border border-line px-5 py-2.5 text-[15px]">
              {f}
            </span>
          ))}
        </Reveal>
      </section>

      <Contact />
    </>
  );
}
