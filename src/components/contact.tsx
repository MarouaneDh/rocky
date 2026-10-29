import { LinkedinLogo, EnvelopeSimple, Clock, LockSimple, Handshake } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/forms";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

const reassurance = [
  { icon: Clock, text: "A personal reply within two working days." },
  { icon: LockSimple, text: "Conversations stay confidential. Happy to sign an NDA before details are shared." },
  { icon: Handshake, text: "The first call is a no-obligation conversation about your situation." },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
      <div className="grid gap-14 md:grid-cols-[1fr_1.2fr] md:gap-20">
        <Reveal>
          <h2 className="max-w-[14ch] text-4xl font-semibold tracking-tighter md:text-5xl">
            A deal, a restructure or a stage in mind?
          </h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-muted">{site.location}</p>
          <ul className="mt-10 grid gap-4 text-[15px]">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-3 transition-colors hover:text-highlight"
              >
                <EnvelopeSimple size={20} />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 transition-colors hover:text-highlight"
              >
                <LinkedinLogo size={20} />
                Connect on LinkedIn
              </a>
            </li>
          </ul>
          <ul aria-label="What to expect" className="mt-12 grid gap-4 border-t border-line pt-8 text-[15px] text-muted">
            {reassurance.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <Icon size={20} className="mt-0.5 shrink-0 text-highlight" aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
