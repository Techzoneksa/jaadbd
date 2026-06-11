import type { ProjectData, ProjectSummary, ProjectFilter } from "@/domain/projects";
import { DEMO_PROJECTS } from "@/demo/data";
import { calculateProjectHealth, applySearchFilter, applyRangeFilter, createId, nowISO } from "./utils";

const ORIGINAL_DATA: ProjectData[] = JSON.parse(JSON.stringify(DEMO_PROJECTS));

export function getDemoProjects(): ProjectData[] {
  return DEMO_PROJECTS;
}

export function resetDemoProjects(): void {
  DEMO_PROJECTS.length = 0;
  DEMO_PROJECTS.push(...JSON.parse(JSON.stringify(ORIGINAL_DATA)));
}

export function filterProjects(filter?: ProjectFilter): ProjectData[] {
  let result = [...DEMO_PROJECTS];

  if (!filter) return result;

  if (filter.status && filter.status !== "ALL") {
    result = result.filter((p) => p.status === filter.status);
  }

  if (filter.city) {
    result = result.filter((p) => p.city === filter.city);
  }

  if (filter.managerName) {
    result = result.filter((p) => p.managerName === filter.managerName);
  }

  if (filter.riskLevel && filter.riskLevel !== "ALL") {
    result = result.filter((p) => p.riskLevel === filter.riskLevel);
  }

  if (filter.delayedOnly) {
    result = result.filter((p) => p.delayDays > 0);
  }

  if (filter.minValue !== undefined || filter.maxValue !== undefined) {
    result = applyRangeFilter(result, "contractValue", filter.minValue, filter.maxValue);
  }

  if (filter.search) {
    result = applySearchFilter(result, filter.search, ["nameAr", "nameEn", "clientName", "city", "managerName", "code"]);
  }

  if (filter.dateFrom) {
    result = result.filter((p) => p.startDate >= filter.dateFrom!);
  }

  if (filter.dateTo) {
    result = result.filter((p) => p.endDate <= filter.dateTo!);
  }

  return result;
}

export function toProjectSummary(project: ProjectData): ProjectSummary {
  return {
    id: project.id,
    code: project.code,
    nameAr: project.nameAr,
    nameEn: project.nameEn,
    clientName: project.clientName,
    city: project.city,
    managerName: project.managerName,
    status: project.status,
    health: project.health,
    riskLevel: project.riskLevel,
    contractValue: project.contractValue,
    plannedProgress: project.plannedProgress,
    actualProgress: project.actualProgress,
    budget: project.budget,
    forecastAtCompletion: project.forecastAtCompletion,
    expectedProfit: project.expectedProfit,
    endDate: project.endDate,
    delayDays: project.delayDays,
    taskCount: project.taskCount,
    tasksOverdue: project.tasksOverdue,
  };
}

export async function listDemoProjects(filter?: ProjectFilter): Promise<ProjectSummary[]> {
  return filterProjects(filter).map(toProjectSummary);
}

export async function getDemoProject(id: string): Promise<ProjectData | null> {
  return DEMO_PROJECTS.find((p) => p.id === id) ?? null;
}

export async function createDemoProject(data: Partial<ProjectData>): Promise<ProjectData> {
  const now = nowISO();
  const project: ProjectData = {
    id: data.id ?? createId("proj"),
    code: data.code ?? `PRJ-${DEMO_PROJECTS.length + 1}`,
    nameAr: data.nameAr ?? "مشروع جديد",
    nameEn: data.nameEn,
    clientName: data.clientName ?? "",
    city: data.city ?? "جدة",
    location: data.location,
    projectType: data.projectType ?? "",
    managerName: data.managerName ?? "",
    managerId: data.managerId,
    status: data.status ?? "PLANNING",
    health: data.health ?? "GREEN",
    riskLevel: data.riskLevel ?? "LOW",
    contractValue: data.contractValue ?? 0,
    currency: data.currency ?? "SAR",
    budget: data.budget ?? 0,
    actualCost: data.actualCost ?? 0,
    commitments: data.commitments ?? 0,
    forecastAtCompletion: data.forecastAtCompletion ?? 0,
    expectedProfit: data.expectedProfit ?? 0,
    profitMargin: data.profitMargin ?? 0,
    plannedProgress: data.plannedProgress ?? 0,
    actualProgress: data.actualProgress ?? 0,
    progressVariance: data.progressVariance ?? 0,
    startDate: data.startDate ?? now.slice(0, 10),
    endDate: data.endDate ?? "",
    delayDays: data.delayDays ?? 0,
    daysRemaining: data.daysRemaining ?? 0,
    scopeOfWork: data.scopeOfWork,
    notes: data.notes ?? undefined,
    milestoneCount: data.milestoneCount ?? 0,
    milestonesCompleted: data.milestonesCompleted ?? 0,
    taskCount: data.taskCount ?? 0,
    tasksOverdue: data.tasksOverdue ?? 0,
    dailyReportCount: data.dailyReportCount ?? 0,
    reportsUnapproved: data.reportsUnapproved ?? 0,
    teamMemberCount: data.teamMemberCount ?? 0,
    riskCount: data.riskCount ?? 0,
    risksOpen: data.risksOpen ?? 0,
    recentActivityCount: data.recentActivityCount ?? 0,
    createdAt: now,
    updatedAt: now,
  };
  DEMO_PROJECTS.push(project);
  return project;
}

export async function updateDemoProject(id: string, data: Partial<ProjectData>): Promise<ProjectData> {
  const idx = DEMO_PROJECTS.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error(`Project ${id} not found`);
  const updated = { ...DEMO_PROJECTS[idx], ...data, updatedAt: nowISO() };
  if (updated.actualProgress !== undefined && updated.plannedProgress !== undefined) {
    updated.progressVariance = updated.actualProgress - updated.plannedProgress;
  }
  updated.health = calculateProjectHealth(updated);
  DEMO_PROJECTS[idx] = updated;
  return updated;
}

export async function deleteDemoProject(id: string): Promise<void> {
  const idx = DEMO_PROJECTS.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error(`Project ${id} not found`);
  DEMO_PROJECTS.splice(idx, 1);
}

export async function getDemoDashboardStats(): Promise<{
  totalProjects: number;
  activeProjects: number;
  totalContractValue: number;
  totalForecastAtCompletion: number;
  totalExpectedProfit: number;
  overallProfitMargin: number;
  projectsByStatus: Record<string, number>;
}> {
  const active = DEMO_PROJECTS.filter((p) => p.status === "ACTIVE");
  const totalContractValue = DEMO_PROJECTS.reduce((s, p) => s + p.contractValue, 0);
  const totalForecast = DEMO_PROJECTS.reduce((s, p) => s + p.forecastAtCompletion, 0);
  return {
    totalProjects: DEMO_PROJECTS.length,
    activeProjects: active.length,
    totalContractValue,
    totalForecastAtCompletion: totalForecast,
    totalExpectedProfit: totalContractValue - totalForecast,
    overallProfitMargin: totalContractValue > 0 ? ((totalContractValue - totalForecast) / totalContractValue) * 100 : 0,
    projectsByStatus: DEMO_PROJECTS.reduce((acc: Record<string, number>, p) => {
      acc[p.status] = (acc[p.status] ?? 0) + 1;
      return acc;
    }, {}),
  };
}
