import type { DailyReportData } from "@/domain/site-reports";
import type { ReportStatus } from "@/domain/site-reports";
import type { DailyReportService } from "@/services";
import { listDemoReports, getDemoReport, createDemoReport, updateDemoReportStatus } from "@/demo/repositories";

export class DemoDailyReportService implements DailyReportService {
  async listReports(projectId: string): Promise<DailyReportData[]> {
    return listDemoReports(projectId);
  }

  async getReport(id: string): Promise<DailyReportData | null> {
    return getDemoReport(id);
  }

  async createReport(data: Partial<DailyReportData>): Promise<DailyReportData> {
    return createDemoReport(data);
  }

  async updateReportStatus(id: string, status: string): Promise<DailyReportData> {
    return updateDemoReportStatus(id, status as ReportStatus);
  }
}
