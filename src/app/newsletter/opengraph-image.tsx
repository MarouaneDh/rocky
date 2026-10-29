import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "The People Side newsletter";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("The People Side: notes on deals, leadership and talent.");
}
