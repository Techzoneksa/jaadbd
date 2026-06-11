export type ReportStatus = "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "RETURNED";

export interface DailyReportData {
  id: string;
  projectId: string;
  reportNumber: string;
  date: string;
  preparedByName: string;
  preparedById: string;
  status: ReportStatus;
  startTime: string;
  endTime: string;
  weather: string;
  temperature: number;
  siteCondition: string;
  workPerformed: WorkEntry[];
  workforce: WorkforceEntry[];
  equipment: EquipmentEntry[];
  materials: MaterialEntry[];
  delays: DelayEntry[];
  safety: SafetyEntry;
  photos: PhotoEntry[];
  notes?: string;
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkEntry {
  id: string;
  activity: string;
  location: string;
  description: string;
  quantity: number;
  unit: string;
  progress: number;
  notes?: string;
}

export interface WorkforceEntry {
  id: string;
  trade: string;
  company: string;
  count: number;
  hours: number;
  overtime: number;
}

export interface EquipmentEntry {
  id: string;
  name: string;
  code: string;
  status: string;
  operatingHours: number;
  downtimeHours: number;
  downtimeReason?: string;
  operator?: string;
}

export interface MaterialEntry {
  id: string;
  name: string;
  quantityReceived: number;
  unit: string;
  supplier: string;
  receiptNumber?: string;
  inspectionStatus: string;
}

export interface DelayEntry {
  id: string;
  type: string;
  description: string;
  responsible: string;
  impact: string;
  actionTaken: string;
  needsEscalation: boolean;
}

export interface SafetyEntry {
  accident: boolean;
  nearMiss: boolean;
  safetyNote: boolean;
  toolboxTalk: boolean;
  hoursWithoutIncident: number;
  incidentDescription?: string;
}

export interface PhotoEntry {
  id: string;
  name: string;
  caption: string;
  category: "before" | "progress" | "after" | "general";
  location?: string;
  previewUrl?: string;
}
