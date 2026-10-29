"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { SealCheck } from "@phosphor-icons/react";
import { Button } from "@/components/button";
import { contactHref, contactLabel, images, site } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

const credentials = [
  "Former HR M&A Practice Leader MENA, EY-Parthenon",
  "Chartered Fellow, CIPD",
  "Fellow, CMI",
];

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease },
        };

  return (
    <section className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 pb-16 pt-10 md:min-h-[min(calc(100dvh-72px),820px)] md:grid-cols-[1.15fr_1fr] md:gap-16 md:px-8 md:pb-20 md:pt-12">
      <div>
        {/* One h1 carries both the name/role (what people search) and the tagline */}
        <h1>
          <motion.span
            {...rise(0)}
            className="block font-sans text-[13px] font-medium uppercase tracking-[0.16em] text-highlight"
          >
            {site.name}, {site.role}
          </motion.span>
          <motion.span
            {...rise(0.08)}
            className="mt-6 block text-5xl font-semibold leading-[0.98] tracking-tighter md:text-6xl lg:text-7xl"
          >
            The people side of the deal.
          </motion.span>
        </h1>
        <motion.p
          {...rise(0.16)}
          className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted md:text-xl"
        >
          I help leaders get people, organisation and talent right through mergers, restructures and
          leadership change across the Gulf and UK.
        </motion.p>
        <motion.div {...rise(0.24)} className="mt-10 flex flex-wrap gap-3">
          <Button href={contactHref}>{contactLabel}</Button>
          <Button href="/advisory" variant="ghost">
            Explore advisory
          </Button>
        </motion.div>
        <motion.ul
          {...rise(0.32)}
          aria-label="Credentials"
          className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6 text-[14px] text-muted"
        >
          {credentials.map((c) => (
            <li key={c} className="flex items-center gap-2">
              <SealCheck size={16} weight="fill" className="text-highlight" aria-hidden />
              {c}
            </li>
          ))}
        </motion.ul>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.1, ease }}
        className="relative aspect-square w-full max-w-[480px] overflow-hidden rounded-2xl bg-surface md:justify-self-end"
      >
        <Image
          src={images.portrait}
          alt="Nicholas Williams, HR M&A advisor and founder of Amanah People Advisory"
          fill
          priority
          sizes="(min-width: 768px) 480px, 100vw"
          className="object-cover"
        />
      </motion.div>
    </section>
  );
}
