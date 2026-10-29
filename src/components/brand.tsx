import Image from "next/image";
import logo from "../../public/brand/amanah-logo.png";
import logoReversed from "../../public/brand/amanah-logo-reversed.png";
import mark from "../../public/brand/amanah-mark.png";
import markReversed from "../../public/brand/amanah-mark-reversed.png";

// Assets extracted from the client's amanah_logo_primary.png (transparent, navy + gold).
// `tone="auto"` swaps to the reversed artwork in dark mode; "reversed" is for dark/photo grounds.
type Props = {
  variant?: "full" | "mark";
  tone?: "auto" | "reversed";
  className?: string;
  priority?: boolean;
};

export function AmanahLogo({ variant = "full", tone = "auto", className = "", priority }: Props) {
  const light = variant === "full" ? logo : mark;
  const dark = variant === "full" ? logoReversed : markReversed;
  const alt = "Amanah People Advisory";

  if (tone === "reversed") {
    return <Image src={dark} alt={alt} priority={priority} className={`h-auto ${className}`} />;
  }
  return (
    <>
      <Image src={light} alt={alt} priority={priority} className={`h-auto dark:hidden ${className}`} />
      <Image
        src={dark}
        alt={alt}
        priority={priority}
        className={`hidden h-auto dark:block ${className}`}
      />
    </>
  );
}
