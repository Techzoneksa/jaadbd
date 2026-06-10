"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, Skeleton } from "@/components/ui";

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  color?: "primary" | "success" | "warning" | "danger" | "info";
  isLoading?: boolean;
}

const colorMap = {
  primary: "bg-[var(--color-primary-700)]",
  success: "bg-[var(--color-success)]",
  warning: "bg-[var(--color-warning)]",
  danger: "bg-[var(--color-danger)]",
  info: "bg-[var(--color-info)]",
};

export function KPICard({ title, value, change, changeLabel, icon, trend, color = "primary", isLoading }: KPICardProps) {
  if (isLoading) {
    return (
      <Card>
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-[var(--text-secondary)]">{title}</p>
          <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 text-xs">
              {trend === "up" && <TrendingUp className="h-3 w-3 text-[var(--color-success)]" />}
              {trend === "down" && <TrendingDown className="h-3 w-3 text-[var(--color-danger)]" />}
              {trend === "neutral" && <Minus className="h-3 w-3 text-[var(--text-tertiary)]" />}
              <span className={cn(
                trend === "up" && "text-[var(--color-success)]",
                trend === "down" && "text-[var(--color-danger)]",
                trend === "neutral" && "text-[var(--text-tertiary)]",
              )}>
                {change > 0 ? "+" : ""}{change}%
              </span>
              {changeLabel && <span className="text-[var(--text-tertiary)]">{changeLabel}</span>}
            </div>
          )}
        </div>
        {icon && <div className={cn("p-2.5 rounded-lg", colorMap[color])}>{icon}</div>}
      </div>
    </Card>
  );
}

export function KPIChartCard({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <Card className={cn("", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">{title}</h3>
      </div>
      {children}
    </Card>
  );
}
