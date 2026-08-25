import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * An anchor that looks like a button.
 *
 * Base UI's `<Button render={<a />} />` needs `nativeButton={false}`, which in
 * turn stamps `role="button"` onto the anchor — so a screen reader announces a
 * navigation as a button. Links therefore borrow the styles via
 * `buttonVariants` and stay plain anchors.
 *
 * Pass `external` to open in a new tab with the usual rel guard.
 */
export function LinkButton({
  className,
  variant,
  size,
  external = false,
  ...props
}: ComponentProps<"a"> &
  VariantProps<typeof buttonVariants> & { external?: boolean }) {
  return (
    <a
      className={cn(buttonVariants({ variant, size }), className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      {...props}
    />
  );
}
