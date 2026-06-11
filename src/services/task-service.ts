import type { TaskData, TaskFilter } from "@/domain/tasks";
import type { TaskService } from "@/services";
import { listDemoTasks, getDemoTask, createDemoTask, updateDemoTask, deleteDemoTask } from "@/demo/repositories";

export class DemoTaskService implements TaskService {
  async listTasks(filter?: TaskFilter): Promise<TaskData[]> {
    return listDemoTasks(filter);
  }

  async getTask(id: string): Promise<TaskData | null> {
    return getDemoTask(id);
  }

  async createTask(data: Partial<TaskData>): Promise<TaskData> {
    return createDemoTask(data);
  }

  async updateTask(id: string, data: Partial<TaskData>): Promise<TaskData> {
    return updateDemoTask(id, data);
  }

  async deleteTask(id: string): Promise<void> {
    return deleteDemoTask(id);
  }
}
