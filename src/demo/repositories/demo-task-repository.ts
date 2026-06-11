import type { TaskData, TaskFilter } from "@/domain/tasks";
import { DEMO_TASKS } from "@/demo/data";
import { applySearchFilter, createId, nowISO } from "./utils";

const ORIGINAL_TASKS: TaskData[] = JSON.parse(JSON.stringify(DEMO_TASKS));

export function resetDemoTasks(): void {
  DEMO_TASKS.length = 0;
  DEMO_TASKS.push(...JSON.parse(JSON.stringify(ORIGINAL_TASKS)));
}

export function filterTasks(filter?: TaskFilter): TaskData[] {
  let result = [...DEMO_TASKS];

  if (!filter) return result;

  if (filter.projectId) {
    result = result.filter((t) => t.projectId === filter.projectId);
  }

  if (filter.status && filter.status !== "ALL") {
    result = result.filter((t) => t.status === filter.status);
  }

  if (filter.priority && filter.priority !== "ALL") {
    result = result.filter((t) => t.priority === filter.priority);
  }

  if (filter.assigneeId) {
    result = result.filter((t) => t.assigneeId === filter.assigneeId);
  }

  if (filter.overdueOnly) {
    const now = new Date();
    result = result.filter((t) => t.status !== "COMPLETED" && t.status !== "CANCELLED" && new Date(t.dueDate) < now);
  }

  if (filter.search) {
    result = applySearchFilter(result, filter.search, ["title", "description", "assigneeName"]);
  }

  return result;
}

export async function listDemoTasks(filter?: TaskFilter): Promise<TaskData[]> {
  return filterTasks(filter);
}

export async function getDemoTask(id: string): Promise<TaskData | null> {
  return DEMO_TASKS.find((t) => t.id === id) ?? null;
}

export async function createDemoTask(data: Partial<TaskData>): Promise<TaskData> {
  const now = nowISO();
  const task: TaskData = {
    id: data.id ?? createId("task"),
    projectId: data.projectId ?? "",
    milestoneId: data.milestoneId,
    title: data.title ?? "مهمة جديدة",
    description: data.description,
    assigneeId: data.assigneeId,
    assigneeName: data.assigneeName,
    status: data.status ?? "TODO",
    priority: data.priority ?? "MEDIUM",
    progress: data.progress ?? 0,
    startDate: data.startDate,
    dueDate: data.dueDate ?? now.slice(0, 10),
    completedAt: data.completedAt,
    tags: data.tags ?? [],
    checklist: data.checklist ?? [],
    createdAt: now,
    updatedAt: now,
  };
  DEMO_TASKS.push(task);
  return task;
}

export async function updateDemoTask(id: string, data: Partial<TaskData>): Promise<TaskData> {
  const idx = DEMO_TASKS.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error(`Task ${id} not found`);
  const updated = { ...DEMO_TASKS[idx], ...data, updatedAt: nowISO() };
  if (updated.status === "COMPLETED" && !updated.completedAt) {
    updated.completedAt = nowISO();
  }
  DEMO_TASKS[idx] = updated;
  return updated;
}

export async function deleteDemoTask(id: string): Promise<void> {
  const idx = DEMO_TASKS.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error(`Task ${id} not found`);
  DEMO_TASKS.splice(idx, 1);
}
