"use client";

// Adapted from 21st.dev "Logo Marquee" by ddoemonn (https://21st.dev/@ddoemonn/components/logo-marquee).
// Physics-based infinite strip: pauses on hover/focus/touch, sleeps off-screen, and becomes a
// static, scrollable row under prefers-reduced-motion. Restyled to the site tokens.

import { useCallback, useEffect, useRef, useState } from "react";
import { useIsomorphicLayoutEffect, useReducedMotion } from "motion/react";

const RAMP = 0.19;
const MAX_COPIES = 14;

function fold(x: number, loop: number) {
  const m = x % loop;
  return m > 0 ? m - loop : m;
}

function clamp(x: number, min: number, max: number) {
  return x < min ? min : x > max ? max : x;
}

function useLogoMarquee({ speed, gap }: { speed: number; gap: number }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);

  const [copies, setCopies] = useState(4);
  const [held, setHeld] = useState(false);
  const [near, setNear] = useState(false);

  const reduced = useReducedMotion() === true;
  const reducedRef = useRef(reduced);
  const movingRef = useRef(false);

  useEffect(() => {
    reducedRef.current = reduced;
    movingRef.current = !held && !reduced;
  }, [held, reduced]);

  const offset = useRef(0);
  const rate = useRef(0);
  const span = useRef(0);

  const paint = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const x = reducedRef.current ? 0 : offset.current - span.current;
    track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
  }, []);

  useIsomorphicLayoutEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;

    const measure = () => {
      const width = group.getBoundingClientRect().width;
      const loop = width > 0 ? width + gap : 0;
      const room = viewport.getBoundingClientRect().width;
      span.current = loop;
      offset.current = loop > 0 ? clamp(offset.current, -loop, loop) : 0;
      paint();
      const next = reduced || loop <= 0 ? 4 : clamp(Math.ceil(room / loop) + 3, 4, MAX_COPIES);
      setCopies((prev) => (prev === next ? prev : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(group);
    return () => observer.disconnect();
  }, [gap, paint, reduced]);

  // Only animate while the strip is near the viewport.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (entry) setNear(entry.isIntersecting);
      },
      { rootMargin: "96px" },
    );
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !near) return;
    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      const loop = span.current;
      if (loop <= 0) return;
      // Ease the speed up and down instead of stopping dead on hover.
      rate.current += ((movingRef.current ? 1 : 0) - rate.current) * (1 - Math.exp(-dt / RAMP));
      offset.current = fold(offset.current - speed * rate.current * dt, loop);
      paint();
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, near, speed, paint]);

  const bind = {
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType !== "touch") setHeld(true);
    },
    onPointerDown: () => setHeld(true),
    onPointerUp: (e: React.PointerEvent) => {
      if (e.pointerType === "touch") setHeld(false);
    },
    onPointerCancel: () => setHeld(false),
    onPointerLeave: () => setHeld(false),
  };

  return { viewportRef, trackRef, groupRef, copies, reduced, bind };
}

export function LogoMarquee({
  items,
  label,
  speed = 36,
  gap = 56,
}: {
  items: string[];
  label: string;
  speed?: number;
  gap?: number;
}) {
  const { viewportRef, trackRef, groupRef, copies, reduced, bind } = useLogoMarquee({ speed, gap });
  const groups = reduced ? 1 : copies;
  const live = reduced ? 0 : 1;

  return (
    <div className="relative isolate min-w-0 overflow-hidden" {...bind}>
      <div
        ref={viewportRef}
        style={{ overflowX: reduced ? "auto" : "hidden" }}
        className="no-scrollbar overflow-y-hidden py-2"
      >
        <div ref={trackRef} style={{ gap, willChange: "transform" }} className="flex w-max items-center">
          {Array.from({ length: groups }, (_, copy) => (
            <ul
              key={copy}
              ref={copy === live ? groupRef : undefined}
              aria-label={copy === live ? label : undefined}
              aria-hidden={copy === live ? undefined : true}
              style={{ gap }}
              className="flex w-max items-center"
            >
              {items.map((item) => (
                <li
                  key={item}
                  className="shrink-0 whitespace-nowrap font-display text-xl font-medium tracking-tight text-muted md:text-2xl"
                >
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
