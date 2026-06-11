export type RiskCategory = "SCHEDULE" | "COST" | "QUALITY" | "SAFETY" | "PROCUREMENT" | "CLIENT" | "CONSULTANT" | "SUBCONTRACTOR" | "WORKFORCE" | "EQUIPMENT" | "EXTERNAL";
export type RiskStatus = "OPEN" | "MONITORING" | "MITIGATING" | "ESCALATED" | "CLOSED";

export interface RiskData {
  id: string;
  projectId: string;
  code: string;
  title: string;
  description: string;
  category: RiskCategory;
  probability: number;
  impact: number;
  score: number;
  level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  owner: string;
  ownerId?: string;
  discoveredAt: string;
  reviewDate?: string;
  responsePlan: string;
  preventiveAction: string;
  status: RiskStatus;
  financialImpact: number;
  scheduleImpactDays: number;
  updatedAt: string;
}

export interface RiskFilter {
  projectId?: string;
  status?: RiskStatus | "ALL";
  category?: RiskCategory | "ALL";
  level?: string;
  owner?: string;
}
