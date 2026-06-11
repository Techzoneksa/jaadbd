import type { RiskData, RiskFilter } from "@/domain/risks";
import { DEMO_RISKS } from "@/demo/data";
import { createId, nowISO } from "./utils";

const ORIGINAL_RISKS: RiskData[] = JSON.parse(JSON.stringify(DEMO_RISKS));

export function resetDemoRisks(): void {
  DEMO_RISKS.length = 0;
  DEMO_RISKS.push(...JSON.parse(JSON.stringify(ORIGINAL_RISKS)));
}

export function filterRisks(filter?: RiskFilter): RiskData[] {
  let result = [...DEMO_RISKS];

  if (!filter) return result;

  if (filter.projectId) {
    result = result.filter((r) => r.projectId === filter.projectId);
  }

  if (filter.status && filter.status !== "ALL") {
    result = result.filter((r) => r.status === filter.status);
  }

  if (filter.category && filter.category !== "ALL") {
    result = result.filter((r) => r.category === filter.category);
  }

  if (filter.level) {
    result = result.filter((r) => r.level === filter.level);
  }

  if (filter.owner) {
    result = result.filter((r) => r.owner === filter.owner);
  }

  return result;
}

export async function listDemoRisks(filter?: RiskFilter): Promise<RiskData[]> {
  return filterRisks(filter);
}

export async function getDemoRisk(id: string): Promise<RiskData | null> {
  return DEMO_RISKS.find((r) => r.id === id) ?? null;
}

export async function createDemoRisk(data: Partial<RiskData>): Promise<RiskData> {
  const now = nowISO();
  const probability = data.probability ?? 1;
  const impact = data.impact ?? 1;
  const score = data.score ?? probability * impact;

  let level = data.level ?? "LOW";
  if (!data.level) {
    if (score >= 20) level = "CRITICAL";
    else if (score >= 12) level = "HIGH";
    else if (score >= 6) level = "MEDIUM";
    else level = "LOW";
  }

  const risk: RiskData = {
    id: data.id ?? createId("rsk"),
    projectId: data.projectId ?? "",
    code: data.code ?? `RSK-${Date.now()}`,
    title: data.title ?? "مخاطرة جديدة",
    description: data.description ?? "",
    category: data.category ?? "SCHEDULE",
    probability,
    impact,
    score,
    level: level as "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
    owner: data.owner ?? "",
    ownerId: data.ownerId,
    discoveredAt: data.discoveredAt ?? now.slice(0, 10),
    reviewDate: data.reviewDate,
    responsePlan: data.responsePlan ?? "",
    preventiveAction: data.preventiveAction ?? "",
    status: data.status ?? "OPEN",
    financialImpact: data.financialImpact ?? 0,
    scheduleImpactDays: data.scheduleImpactDays ?? 0,
    updatedAt: now,
  };
  DEMO_RISKS.push(risk);
  return risk;
}

export async function updateDemoRisk(id: string, data: Partial<RiskData>): Promise<RiskData> {
  const idx = DEMO_RISKS.findIndex((r) => r.id === id);
  if (idx === -1) throw new Error(`Risk ${id} not found`);
  const updated = { ...DEMO_RISKS[idx], ...data, updatedAt: nowISO() };
  if (data.probability !== undefined || data.impact !== undefined) {
    const p = updated.probability;
    const i = updated.impact;
    updated.score = p * i;
    if (updated.score >= 20) updated.level = "CRITICAL";
    else if (updated.score >= 12) updated.level = "HIGH";
    else if (updated.score >= 6) updated.level = "MEDIUM";
    else updated.level = "LOW";
  }
  DEMO_RISKS[idx] = updated;
  return updated;
}

export async function closeDemoRisk(id: string): Promise<RiskData> {
  return updateDemoRisk(id, { status: "CLOSED" });
}
