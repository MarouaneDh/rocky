import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Nicholas Williams, HR M&A Advisor and Speaker";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("The people side of the deal.");
}
