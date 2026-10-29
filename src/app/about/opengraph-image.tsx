import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "About Nicholas Williams";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Policing, Whitehall, then the deal room.");
}
