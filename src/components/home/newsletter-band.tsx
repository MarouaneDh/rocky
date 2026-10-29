import { Reveal } from "@/components/reveal";
import { SubscribeForm } from "@/components/forms";
import { site } from "@/lib/site";

export function NewsletterBand() {
  return (
    <section className="px-4 md:px-8">
      <Reveal className="mx-auto grid max-w-[1400px] gap-10 rounded-2xl bg-accent-soft px-6 py-14 md:grid-cols-2 md:items-end md:px-14 md:py-20">
        <div>
          <h2 className="text-4xl font-semibold tracking-tighter md:text-5xl">
            {site.newsletterName}
          </h2>
          <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-muted">
            Short, practical notes on deals, leadership and talent, written from the Gulf for
            leaders everywhere.
          </p>
        </div>
        <SubscribeForm />
      </Reveal>
    </section>
  );
}
