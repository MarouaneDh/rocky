import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

const base =
  "group inline-flex h-12 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-6 text-[15px] font-medium transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]";

const variants = {
  primary: "bg-accent text-accent-ink hover:bg-ink hover:text-bg",
  ghost: "border border-line text-ink hover:border-ink",
};

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <ArrowUpRight
        size={16}
        weight="bold"
        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-ink underline decoration-line decoration-1 underline-offset-[6px] transition-colors hover:decoration-accent"
    >
      {children}
      <ArrowUpRight
        size={14}
        weight="bold"
        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}
