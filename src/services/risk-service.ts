import type { RiskData, RiskFilter } from "@/domain/risks";
import type { RiskService } from "@/services";
import { listDemoRisks, getDemoRisk, createDemoRisk, updateDemoRisk, closeDemoRisk } from "@/demo/repositories";

export class DemoRiskService implements RiskService {
  async listRisks(filter?: RiskFilter): Promise<RiskData[]> {
    return listDemoRisks(filter);
  }

  async getRisk(id: string): Promise<RiskData | null> {
    return getDemoRisk(id);
  }

  async createRisk(data: Partial<RiskData>): Promise<RiskData> {
    return createDemoRisk(data);
  }

  async updateRisk(id: string, data: Partial<RiskData>): Promise<RiskData> {
    return updateDemoRisk(id, data);
  }

  async closeRisk(id: string): Promise<RiskData> {
    return closeDemoRisk(id);
  }
}
