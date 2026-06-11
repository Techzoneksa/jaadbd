import type { ProjectData, ProjectHealth, RiskLevel } from "@/domain/projects";

export function calculateProjectHealth(project: ProjectData): ProjectHealth {
  const negativeReasons: string[] = [];
  if (project.progressVariance < -10) negativeReasons.push("progress");
  if (project.expectedProfit < 0) negativeReasons.push("profit");
  if (project.forecastAtCompletion > project.budget * 1.1) negativeReasons.push("cost");
  if (project.delayDays > 30) negativeReasons.push("delay");
  if (project.riskLevel === "CRITICAL" || project.riskLevel === "HIGH") negativeReasons.push("risk");

  if (negativeReasons.length >= 3) return "RED";
  if (negativeReasons.length >= 1) return "YELLOW";
  return "GREEN";
}

export function formatCurrency(value: number, currency = "SAR"): string {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat("ar-SA", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function applySearchFilter<T>(items: T[], search: string, fields: (keyof T)[]): T[] {
  if (!search.trim()) return items;
  const lower = search.toLowerCase();
  return items.filter((item) =>
    fields.some((field) => {
      const val = item[field];
      return String(val ?? "").toLowerCase().includes(lower);
    })
  );
}

export function applyRangeFilter<T>(items: T[], field: keyof T, min?: number, max?: number): T[] {
  return items.filter((item) => {
    const val = Number(item[field]);
    if (isNaN(val)) return true;
    if (min !== undefined && val < min) return false;
    if (max !== undefined && val > max) return false;
    return true;
  });
}

export function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function nowISO(): string {
  return new Date().toISOString();
}
