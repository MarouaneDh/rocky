import { Reveal } from "@/components/reveal";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <section aria-label="Testimonials" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
      <div className="grid gap-16 md:grid-cols-2 md:gap-12">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1} className={i === 1 ? "md:mt-24" : ""}>
            <figure>
              <blockquote className="text-2xl font-medium leading-snug tracking-tight md:text-[28px]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 border-t border-line pt-5">
                <p className="font-medium">{t.name}</p>
                <p className="mt-1 text-[14px] text-muted">{t.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
