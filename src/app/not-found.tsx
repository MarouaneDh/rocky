import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { nav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
      <h1 className="max-w-[16ch] text-5xl font-semibold tracking-tighter md:text-7xl">
        This page has moved or never existed.
      </h1>
      <p className="mt-8 max-w-[48ch] text-lg leading-relaxed text-muted">
        Try one of these instead, or head back to the home page.
      </p>
      <ul className="mt-10 flex flex-wrap gap-3">
        {nav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex h-12 items-center rounded-full border border-line px-6 text-[15px] transition-colors hover:border-ink"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <Button href="/">Back to home</Button>
      </div>
    </section>
  );
}
