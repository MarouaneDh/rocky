import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Nicholas Williams, keynote speaker";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Keynotes on M&A, leadership and the human side of change.");
}
