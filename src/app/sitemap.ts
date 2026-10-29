import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// /podcast is excluded while it is a "coming soon" page (it is also noindex).
const routes: { path: string; priority: number; changeFrequency: "monthly" | "weekly" }[] = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/advisory", priority: 0.9, changeFrequency: "monthly" },
  { path: "/speaking", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/newsletter", priority: 0.6, changeFrequency: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
