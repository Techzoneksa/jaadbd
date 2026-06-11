import type { DailyReportData } from "@/domain/site-reports";
import type { ReportStatus } from "@/domain/site-reports";
import { DEMO_DAILY_REPORTS } from "@/demo/data";
import { createId, nowISO } from "./utils";

const ORIGINAL_REPORTS: DailyReportData[] = JSON.parse(JSON.stringify(DEMO_DAILY_REPORTS));

export function resetDemoDailyReports(): void {
  DEMO_DAILY_REPORTS.length = 0;
  DEMO_DAILY_REPORTS.push(...JSON.parse(JSON.stringify(ORIGINAL_REPORTS)));
}

export async function listDemoReports(projectId: string): Promise<DailyReportData[]> {
  return DEMO_DAILY_REPORTS.filter((r) => r.projectId === projectId);
}

export async function getDemoReport(id: string): Promise<DailyReportData | null> {
  return DEMO_DAILY_REPORTS.find((r) => r.id === id) ?? null;
}

export async function createDemoReport(data: Partial<DailyReportData>): Promise<DailyReportData> {
  const now = nowISO();
  const report: DailyReportData = {
    id: data.id ?? createId("dr"),
    projectId: data.projectId ?? "",
    reportNumber: data.reportNumber ?? `RPT-${Date.now()}`,
    date: data.date ?? now.slice(0, 10),
    preparedByName: data.preparedByName ?? "",
    preparedById: data.preparedById ?? "",
    status: data.status ?? "DRAFT",
    startTime: data.startTime ?? "07:00",
    endTime: data.endTime ?? "16:00",
    weather: data.weather ?? "مشمس",
    temperature: data.temperature ?? 35,
    siteCondition: data.siteCondition ?? "جيدة",
    workPerformed: data.workPerformed ?? [],
    workforce: data.workforce ?? [],
    equipment: data.equipment ?? [],
    materials: data.materials ?? [],
    delays: data.delays ?? [],
    safety: data.safety ?? { accident: false, nearMiss: false, safetyNote: false, toolboxTalk: false, hoursWithoutIncident: 0 },
    photos: data.photos ?? [],
    notes: data.notes,
    approvedBy: data.approvedBy,
    approvedAt: data.approvedAt,
    createdAt: now,
    updatedAt: now,
  };
  DEMO_DAILY_REPORTS.push(report);
  return report;
}

export async function updateDemoReportStatus(id: string, status: ReportStatus): Promise<DailyReportData> {
  const idx = DEMO_DAILY_REPORTS.findIndex((r) => r.id === id);
  if (idx === -1) throw new Error(`Report ${id} not found`);
  DEMO_DAILY_REPORTS[idx] = {
    ...DEMO_DAILY_REPORTS[idx],
    status,
    ...(status === "APPROVED" ? { approvedAt: nowISO(), approvedBy: DEMO_DAILY_REPORTS[idx].preparedByName } : {}),
    updatedAt: nowISO(),
  };
  return DEMO_DAILY_REPORTS[idx];
}

export async function updateDemoReport(id: string, data: Partial<DailyReportData>): Promise<DailyReportData> {
  const idx = DEMO_DAILY_REPORTS.findIndex((r) => r.id === id);
  if (idx === -1) throw new Error(`Report ${id} not found`);
  DEMO_DAILY_REPORTS[idx] = { ...DEMO_DAILY_REPORTS[idx], ...data, updatedAt: nowISO() };
  return DEMO_DAILY_REPORTS[idx];
}
