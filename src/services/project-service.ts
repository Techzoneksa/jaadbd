import type { ProjectData, ProjectSummary, ProjectFilter } from "@/domain/projects";
import type { ProjectService } from "@/services";
import {
  listDemoProjects,
  getDemoProject,
  createDemoProject,
  updateDemoProject,
  deleteDemoProject,
  getDemoDashboardStats,
} from "@/demo/repositories";

export class DemoProjectService implements ProjectService {
  async listProjects(filter?: ProjectFilter): Promise<ProjectSummary[]> {
    return listDemoProjects(filter);
  }

  async getProject(id: string): Promise<ProjectData | null> {
    return getDemoProject(id);
  }

  async createProject(data: Partial<ProjectData>): Promise<ProjectData> {
    return createDemoProject(data);
  }

  async updateProject(id: string, data: Partial<ProjectData>): Promise<ProjectData> {
    return updateDemoProject(id, data);
  }

  async deleteProject(id: string): Promise<void> {
    return deleteDemoProject(id);
  }

  async getDashboardStats(): Promise<{
    totalProjects: number;
    activeProjects: number;
    totalContractValue: number;
    totalForecastAtCompletion: number;
    totalExpectedProfit: number;
    overallProfitMargin: number;
    projectsByStatus: Record<string, number>;
  }> {
    return getDemoDashboardStats();
  }
}
