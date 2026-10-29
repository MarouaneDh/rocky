"use client";

// Adapted from 21st.dev "Text Reveal" by ddoemonn (https://21st.dev/@ddoemonn/components/text-reveal).
// Word-by-word blur-and-rise when scrolled into view. Takes styled parts so a phrase can be
// highlighted mid-sentence, keeps the full sentence in an sr-only copy for screen readers and
// crawlers, and shows the text instantly under prefers-reduced-motion.

import { Fragment, useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const EASE = [0.23, 1, 0.32, 1] as const;
const DURATION = 0.6;
const HIDDEN = { opacity: 0, y: 10, filter: "blur(8px)" } as const;
const SHOWN = { opacity: 1, y: 0, filter: "blur(0px)" } as const;

export type TextRevealPart = { text: string; className?: string };

export function TextReveal({
  parts,
  stagger = 0.055,
  maxDuration = 1.6,
  amount = 0.35,
  className = "",
}: {
  parts: TextRevealPart[];
  stagger?: number;
  maxDuration?: number;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount });
  const reduced = useReducedMotion();

  const { words, step } = useMemo(() => {
    const list = parts.flatMap((p) =>
      p.text.trim().split(/\s+/).filter(Boolean).map((text) => ({ text, className: p.className })),
    );
    const span = Math.max(0, maxDuration - DURATION);
    return { words: list, step: list.length > 1 ? Math.min(stagger, span / (list.length - 1)) : 0 };
  }, [parts, stagger, maxDuration]);

  const full = parts.map((p) => p.text.trim()).join(" ");

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{full}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Fragment key={i}>
            {i > 0 ? " " : null}
            <motion.span
              className={`inline-block align-baseline ${w.className ?? ""}`}
              initial={reduced ? false : HIDDEN}
              animate={inView || reduced ? SHOWN : HIDDEN}
              transition={reduced ? { duration: 0 } : { duration: DURATION, ease: EASE, delay: inView ? i * step : 0 }}
            >
              {w.text}
            </motion.span>
          </Fragment>
        ))}
      </span>
    </span>
  );
}
