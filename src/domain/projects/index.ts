export type ProjectStatus = "DRAFT" | "PLANNING" | "ACTIVE" | "ON_HOLD" | "DELAYED" | "COMPLETED" | "CLOSED" | "CANCELLED";
export type ProjectHealth = "GREEN" | "YELLOW" | "RED";
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface ProjectData {
  id: string;
  code: string;
  nameAr: string;
  nameEn?: string;
  clientName: string;
  city: string;
  location?: string;
  projectType: string;
  managerName: string;
  managerId?: string;
  status: ProjectStatus;
  health: ProjectHealth;
  riskLevel: RiskLevel;
  contractValue: number;
  currency: string;
  budget: number;
  actualCost: number;
  commitments: number;
  forecastAtCompletion: number;
  expectedProfit: number;
  profitMargin: number;
  plannedProgress: number;
  actualProgress: number;
  progressVariance: number;
  startDate: string;
  endDate: string;
  delayDays: number;
  daysRemaining: number;
  scopeOfWork?: string;
  notes?: string;
  milestoneCount: number;
  milestonesCompleted: number;
  taskCount: number;
  tasksOverdue: number;
  dailyReportCount: number;
  reportsUnapproved: number;
  teamMemberCount: number;
  riskCount: number;
  risksOpen: number;
  recentActivityCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectSummary {
  id: string;
  code: string;
  nameAr: string;
  nameEn?: string;
  clientName: string;
  city: string;
  managerName: string;
  status: ProjectStatus;
  health: ProjectHealth;
  riskLevel: RiskLevel;
  contractValue: number;
  plannedProgress: number;
  actualProgress: number;
  budget: number;
  forecastAtCompletion: number;
  expectedProfit: number;
  endDate: string;
  delayDays: number;
  taskCount: number;
  tasksOverdue: number;
}

export interface ProjectFilter {
  search?: string;
  status?: ProjectStatus | "ALL";
  city?: string;
  managerName?: string;
  riskLevel?: RiskLevel | "ALL";
  minValue?: number;
  maxValue?: number;
  delayedOnly?: boolean;
  dateFrom?: string;
  dateTo?: string;
}
