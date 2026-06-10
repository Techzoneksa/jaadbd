"use client";

import { Badge } from "@/components/ui";
import type { BadgeProps } from "@/components/ui";

interface StatusBadgeProps {
  status: string;
  label?: string;
}

const statusVariantMap: Record<string, BadgeProps["variant"]> = {
  ACTIVE: "green",
  COMPLETED: "green",
  GREEN: "green",
  IN_PROGRESS: "blue",
  PLANNING: "blue",
  YELLOW: "yellow",
  ON_HOLD: "orange",
  DELAYED: "orange",
  DRAFT: "gray",
  CLOSED: "gray",
  CANCELLED: "red",
  RED: "red",
  CRITICAL: "red",
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const variant = statusVariantMap[status] || "gray";
  return <Badge variant={variant}>{label || status}</Badge>;
}
