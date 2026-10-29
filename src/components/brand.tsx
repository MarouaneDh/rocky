import Image from "next/image";
import logoReversed from "../../public/brand/amanah-logo-reversed.png";
import markReversed from "../../public/brand/amanah-mark-reversed.png";

// Assets extracted from the client's amanah_logo_primary.png (transparent, navy + gold).
// The site is always dark, so only the reversed artwork is used. The navy originals stay in
// /public/brand for print and light backgrounds elsewhere.
type Props = {
  variant?: "full" | "mark";
  className?: string;
  priority?: boolean;
};

export function AmanahLogo({ variant = "full", className = "", priority }: Props) {
  return (
    <Image
      src={variant === "full" ? logoReversed : markReversed}
      alt="Amanah People Advisory"
      priority={priority}
      className={`h-auto ${className}`}
    />
  );
}
