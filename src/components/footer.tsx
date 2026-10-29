import Link from "next/link";
import { LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { nav, site } from "@/lib/site";
import { AmanahLogo } from "./brand";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-16 md:grid-cols-[2fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display text-2xl font-semibold tracking-tight">{site.name}</p>
          <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-muted">
            The people side of M&A, restructuring and leadership change. Advisory through{" "}
            {site.company}.
          </p>
          <Link href="/advisory" className="mt-8 inline-block" aria-label={site.company}>
            <AmanahLogo className="w-32" />
          </Link>
        </div>

        <nav aria-label="Footer">
          <ul className="grid gap-3 text-[15px]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid content-start gap-3 text-[15px]">
          <a href={`mailto:${site.email}`} className="text-muted transition-colors hover:text-ink">
            {site.email}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
          >
            <LinkedinLogo size={18} />
            LinkedIn
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 border-t border-line px-4 py-6 text-[13px] text-muted md:flex-row md:justify-between md:px-8">
        <p>&copy; 2026 {site.name}</p>
        <p>{site.company} FZ-LLC, Meydan Free Zone, Dubai</p>
      </div>
    </footer>
  );
}
