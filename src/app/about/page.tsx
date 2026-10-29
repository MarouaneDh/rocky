import { breadcrumb, graph, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import Image from "next/image";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { contactHref, contactLabel, images, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "About Nicholas Williams",
  description:
    "Nicholas Williams went from London police officer to Whitehall leader to EY-Parthenon HR M&A Practice Leader MENA. Now founder of Amanah People Advisory.",
  path: "/about",
});

const credentials = [
  "Chartered Fellow, CIPD",
  "Fellow, Chartered Management Institute",
  "Imperial College Business School",
  "Founder, Amanah People Advisory",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph({ "@type": "ProfilePage", url: `${site.url}/about`, mainEntity: { "@id": `${site.url}/#person` } }, breadcrumb("About", "/about"))} />
      <PageIntro
        title="Policing, Whitehall, then the deal room."
        lead="Nicholas Williams has spent his career where organisations change and people feel it first."
      />

      <section className="mx-auto grid max-w-[1400px] gap-12 px-4 md:grid-cols-[1fr_1.1fr] md:gap-20 md:px-8">
        <Reveal className="relative aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-2xl bg-surface md:sticky md:top-28 md:self-start">
          {/* TODO: swap for a candid photo of Nicholas so About differs from the home headshot */}
          <Image src={images.about} alt="Nicholas Williams, Dubai-based HR M&A advisor and speaker" fill sizes="(min-width: 768px) 440px, 100vw" className="object-cover object-top" />
        </Reveal>

        <div className="grid gap-8 text-lg leading-relaxed text-muted">
          <Reveal>
            <p>
              <span className="text-ink">He started as a police officer in London</span>, rising to
              Sergeant at the Metropolitan Police and Inspector at Surrey Police. He then moved into
              the UK Civil Service, leading culture, HR policy and the private office as Chief of
              Staff.
            </p>
          </Reveal>
          <Reveal>
            <p>
              At EY, then EY-Parthenon in Dubai, he founded and led the MENA HR M&A practice. That
              meant running the human capital workstream on more than 60 acquisitions, divestitures,
              joint ventures and restructurings, on deals up to $3.2bn, with a stint leading HR
              transformation at Amazon along the way.
            </p>
          </Reveal>
          <Reveal>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
                <Image
                  src={images.creek}
                  alt="A traditional dhow on Dubai Creek at sunrise, with the city skyline behind"
                  fill
                  sizes="(min-width: 768px) 640px, 100vw"
                  className="object-cover object-[50%_45%]"
                />
              </div>
              <figcaption className="mt-3 text-[14px] text-muted">Dubai, home base for his work across the GCC.</figcaption>
            </figure>
          </Reveal>
          <Reveal>
            <p>
              Time close to executive search sharpened one question he keeps asking: the strongest
              candidate on paper is not always the right answer for the business. Today he brings
              that lens to clients through Amanah People Advisory.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Away from work he is working towards a personal training qualification, cycles, travels a
              lot and has a weakness for aeroplanes, good hotels and a well-made television series.
            </p>
          </Reveal>

          <Reveal>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {credentials.map((c) => (
                <li key={c} className="rounded-2xl bg-surface px-5 py-4 text-[15px] text-ink">
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href={contactHref}>{contactLabel}</Button>
            </div>
          </Reveal>
        </div>
      </section>
      <div className="h-24 md:h-32" />
    </>
  );
}
