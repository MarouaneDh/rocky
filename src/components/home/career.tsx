"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { career } from "@/lib/site";
import { Reveal } from "@/components/reveal";

// Horizontal scroll-snap track: the career reads as a journey, newest first.
export function Career() {
  const track = useRef<HTMLOListElement>(null);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6 px-4 md:px-8">
        <Reveal>
          <h2 className="max-w-[16ch] text-4xl font-semibold tracking-tighter md:text-5xl">
            From the beat to the boardroom.
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
            Seventeen years of leading people under pressure, first in uniform, then in Whitehall,
            then on more than 60 transactions across the Middle East.
          </p>
        </Reveal>
        <div className="hidden shrink-0 gap-2 md:flex">
          <button
            type="button"
            aria-label="Previous roles"
            onClick={() => step(-1)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line transition-[transform,border-color] hover:border-ink active:scale-[0.96]"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next roles"
            onClick={() => step(1)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line transition-[transform,border-color] hover:border-ink active:scale-[0.96]"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <ol
        ref={track}
        className="no-scrollbar track-inset mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth motion-reduce:scroll-auto"
      >
        {career.map((role, i) => (
          <li
            key={role.org + role.years}
            className={`flex min-h-[260px] w-[78vw] shrink-0 snap-start flex-col justify-between rounded-2xl p-6 sm:w-[320px] md:p-7 ${
              i === 0 ? "bg-accent text-accent-ink" : "bg-bg"
            }`}
          >
            <p className={`font-mono text-[13px] ${i === 0 ? "opacity-80" : "text-muted"}`}>
              {role.years}
            </p>
            <div>
              <p className="text-2xl font-semibold tracking-tight">{role.org}</p>
              <p className={`mt-2 text-[15px] leading-snug ${i === 0 ? "opacity-85" : "text-muted"}`}>
                {role.title}
              </p>
              <p className={`mt-4 text-[13px] ${i === 0 ? "opacity-70" : "text-muted"}`}>
                {role.place}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
