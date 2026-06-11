import type { ProjectData, ProjectSummary, ProjectFilter } from "@/domain/projects";
import type { TaskData, TaskFilter } from "@/domain/tasks";
import type { DailyReportData } from "@/domain/site-reports";
import type { RiskData, RiskFilter } from "@/domain/risks";

export interface ProjectService {
  listProjects(filter?: ProjectFilter): Promise<ProjectSummary[]>;
  getProject(id: string): Promise<ProjectData | null>;
  createProject(data: Partial<ProjectData>): Promise<ProjectData>;
  updateProject(id: string, data: Partial<ProjectData>): Promise<ProjectData>;
  deleteProject(id: string): Promise<void>;
  getDashboardStats(): Promise<{
    totalProjects: number;
    activeProjects: number;
    totalContractValue: number;
    totalForecastAtCompletion: number;
    totalExpectedProfit: number;
    overallProfitMargin: number;
    projectsByStatus: Record<string, number>;
  }>;
}

export interface TaskService {
  listTasks(filter?: TaskFilter): Promise<TaskData[]>;
  getTask(id: string): Promise<TaskData | null>;
  createTask(data: Partial<TaskData>): Promise<TaskData>;
  updateTask(id: string, data: Partial<TaskData>): Promise<TaskData>;
  deleteTask(id: string): Promise<void>;
}

export interface DailyReportService {
  listReports(projectId: string): Promise<DailyReportData[]>;
  getReport(id: string): Promise<DailyReportData | null>;
  createReport(data: Partial<DailyReportData>): Promise<DailyReportData>;
  updateReportStatus(id: string, status: string): Promise<DailyReportData>;
}

export interface RiskService {
  listRisks(filter?: RiskFilter): Promise<RiskData[]>;
  getRisk(id: string): Promise<RiskData | null>;
  createRisk(data: Partial<RiskData>): Promise<RiskData>;
  updateRisk(id: string, data: Partial<RiskData>): Promise<RiskData>;
  closeRisk(id: string): Promise<RiskData>;
}

export interface DemoIdentityService {
  getCurrentRole(): string;
  setDemoRole(roleId: string): void;
  hasPermission(permission: string): boolean;
  getPermissions(): string[];
  getCurrentUser(): { id: string; nameAr: string; nameEn: string; email: string };
}

export { DemoProjectService } from "./project-service";
export { DemoTaskService } from "./task-service";
export { DemoDailyReportService } from "./daily-report-service";
export { DemoRiskService } from "./risk-service";
export { DemoIdentityServiceImpl } from "./demo-identity";
