import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "./site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Shared social card: navy ground with a gold light beam, Amanah mark, page headline. Rendered at build time.
async function markDataUrl() {
  "use cache";
  const mark = await readFile(join(process.cwd(), "public/brand/amanah-mark-reversed.png"));
  return `data:image/png;base64,${mark.toString("base64")}`;
}

async function backgroundDataUrl() {
  "use cache";
  const bg = await readFile(join(process.cwd(), "public/images/og-background.jpg"));
  return `data:image/jpeg;base64,${bg.toString("base64")}`;
}

export async function ogImage(headline: string, kicker = `${site.name}, ${site.role}`) {
  const [markSrc, bgSrc] = await Promise.all([markDataUrl(), backgroundDataUrl()]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b2641",
          backgroundImage: `url(${bgSrc})`,
          backgroundSize: "100% 100%",
          padding: "72px 80px",
          color: "#f5f6f8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#ca9c59", letterSpacing: 4, textTransform: "uppercase" }}>
            {kicker}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={120} height={93} alt="" />
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05, maxWidth: 980 }}>
          {headline}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#9fadbd" }}>
          <span>{site.company}</span>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
