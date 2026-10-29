"use client";

// Adapted from 21st.dev "Count Up" by unlumen (https://21st.dev/@unlumen/components/count-up).
// Trimmed to the plain-text effect, and server-renders the final value so crawlers,
// no-JS visitors and reduced-motion users always see the real number.

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

// Splits "$3.2bn" into prefix "$", number 3.2, suffix "bn". Non-numeric values return null.
function parse(value: string) {
  const m = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const decimals = m[2].includes(".") ? m[2].split(".")[1].length : 0;
  return { prefix: m[1], to: Number(m[2]), suffix: m[3], decimals };
}

export function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const parsed = parse(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed || reduce || !inView) return;
    const { prefix, to, suffix, decimals } = parsed;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
    // parsed is derived from value; depend on value to avoid re-running every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
