import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "green" | "yellow" | "red" | "blue" | "gray" | "orange";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "gray", ...props }, ref) => {
    const variants = {
      green: "badge-green",
      yellow: "badge-yellow",
      red: "badge-red",
      blue: "badge-blue",
      gray: "badge-gray",
      orange: "badge-orange",
    };

    return (
      <span ref={ref} className={cn("badge", variants[variant], className)} {...props} />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
export type { BadgeProps };
