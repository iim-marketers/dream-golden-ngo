import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
