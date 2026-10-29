import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}, ${site.role}`,
    short_name: site.name,
    description: "HR M&A advisory, speaking and writing on the people side of change.",
    start_url: "/",
    display: "browser",
    background_color: "#071628",
    theme_color: "#0b2641",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
