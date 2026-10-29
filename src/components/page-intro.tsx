import { Reveal } from "@/components/reveal";

export function PageIntro({
  title,
  lead,
  children,
  badge,
  aside,
}: {
  title: string;
  lead: string;
  children?: React.ReactNode;
  badge?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-16 pt-16 md:px-8 md:pb-24 md:pt-20">
      <div className={aside ? "grid items-end gap-12 md:grid-cols-[1fr_auto] md:gap-16" : ""}>
        <Reveal>
          {badge && <div className="mb-10">{badge}</div>}
          <h1 className="max-w-[18ch] text-5xl font-semibold leading-[1.02] tracking-tighter md:text-7xl">
            {title}
          </h1>
          <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted md:text-xl">{lead}</p>
          {children && <div className="mt-10 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
        {aside && <Reveal delay={0.1}>{aside}</Reveal>}
      </div>
    </section>
  );
}
