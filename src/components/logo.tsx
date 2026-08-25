import Image from "next/image";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * The club's emblem, cropped to its circle with transparent corners so it sits
 * cleanly on both the cream header and the dark footer. Source art lives at
 * `public/new-images/ngo-logo.jpeg`; the derived sizes are `public/logo*.png`.
 */
export function Logo({
  className,
  tone = "dark",
  showWordmark = true,
}: {
  className?: string;
  tone?: "dark" | "light";
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Image
        src="/logo-192.png"
        alt={`${site.legalName} emblem`}
        width={48}
        height={48}
        priority
        className="size-12 shrink-0 rounded-full ring-1 ring-coral-500/30"
      />
      {showWordmark && (
        <span className="leading-none">
          <span
            className={cn(
              "block font-heading text-[1.05rem] font-extrabold tracking-tight uppercase",
              tone === "dark" ? "text-green-900" : "text-cream-50",
            )}
          >
            Dream Golden
          </span>
          <span
            className={cn(
              "mt-1 block text-[0.6rem] font-semibold tracking-[0.28em] uppercase",
              tone === "dark" ? "text-coral-700" : "text-coral-300",
            )}
          >
            Memories Club
          </span>
        </span>
      )}
    </span>
  );
}
