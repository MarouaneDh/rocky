"use client";

// Pointer-following glow for hoverable panels, in the spirit of the 21st.dev "Spotlight" cards.
// Drop inside a `relative group overflow-hidden` element; it tracks its parent and stays inert
// (no layout, no pointer events). Place it before the content so text stays on top.
// Updates CSS variables directly, so there are no re-renders.

import { useEffect, useRef } from "react";

export function Spotlight({ size = 420 }: { size?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const move = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - r.left}px`);
      el.style.setProperty("--y", `${e.clientY - r.top}px`);
    };
    parent.addEventListener("pointermove", move);
    return () => parent.removeEventListener("pointermove", move);
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background: `radial-gradient(${size}px circle at var(--x, 50%) var(--y, 50%), rgb(202 156 89 / 0.24), transparent 70%)`,
      }}
    />
  );
}
