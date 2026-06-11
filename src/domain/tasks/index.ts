export type TaskStatus = "BACKLOG" | "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "BLOCKED" | "COMPLETED" | "CANCELLED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface TaskData {
  id: string;
  projectId: string;
  milestoneId?: string;
  title: string;
  description?: string;
  assigneeId?: string;
  assigneeName?: string;
  status: TaskStatus;
  priority: TaskPriority;
  progress: number;
  startDate?: string;
  dueDate: string;
  completedAt?: string;
  tags: string[];
  checklist: { text: string; done: boolean }[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilter {
  projectId?: string;
  status?: TaskStatus | "ALL";
  priority?: TaskPriority | "ALL";
  assigneeId?: string;
  search?: string;
  overdueOnly?: boolean;
}
