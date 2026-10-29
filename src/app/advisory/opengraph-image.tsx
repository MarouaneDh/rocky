import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Amanah People Advisory: HR M&A advisory";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("HR due diligence and integration for deals and restructures.");
}
