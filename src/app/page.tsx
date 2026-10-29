import { pageMeta } from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { Thesis } from "@/components/home/thesis";
import { DealLifecycle } from "@/components/deal-lifecycle";
import { Pillars } from "@/components/home/pillars";
import { Career } from "@/components/home/career";
import { Testimonials } from "@/components/home/testimonials";
import { NewsletterBand } from "@/components/home/newsletter-band";
import { Contact } from "@/components/contact";

export const metadata = pageMeta({
  title: "Nicholas Williams | HR M&A Advisor and Speaker, Dubai",
  description:
    "Nicholas Williams is an HR M&A advisor and speaker in Dubai, helping leaders get the people side of mergers, restructuring and leadership change right.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Thesis />
      <DealLifecycle />
      <Pillars />
      <Career />
      <Testimonials />
      <NewsletterBand />
      <Contact />
    </>
  );
}
