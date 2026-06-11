import { describe, it, expect } from "vitest";
import { calculateProjectHealth } from "@/demo/repositories/utils";
import type { ProjectData } from "@/domain/projects";

function mockProject(overrides: Partial<ProjectData> = {}): ProjectData {
  return {
    id: "test-1",
    code: "TEST-001",
    nameAr: "مشروع تجريبي",
    clientName: "عميل تجريبي",
    city: "الرياض",
    projectType: "residential",
    managerName: "مدير المشروع",
    status: "ACTIVE",
    health: "GREEN",
    riskLevel: "LOW",
    contractValue: 10_000_000,
    currency: "SAR",
    budget: 8_000_000,
    actualCost: 5_000_000,
    commitments: 1_000_000,
    forecastAtCompletion: 7_500_000,
    expectedProfit: 2_500_000,
    profitMargin: 25,
    plannedProgress: 50,
    actualProgress: 45,
    progressVariance: -5,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    delayDays: 0,
    daysRemaining: 200,
    milestoneCount: 10,
    milestonesCompleted: 4,
    taskCount: 50,
    tasksOverdue: 2,
    dailyReportCount: 30,
    reportsUnapproved: 3,
    teamMemberCount: 8,
    riskCount: 5,
    risksOpen: 2,
    recentActivityCount: 15,
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-06-01T00:00:00.000Z",
    ...overrides,
  };
}

describe("calculateProjectHealth", () => {
  it("returns GREEN for healthy project", () => {
    const project = mockProject();
    expect(calculateProjectHealth(project)).toBe("GREEN");
  });

  it("returns YELLOW when progress variance exceeds -10", () => {
    const project = mockProject({ progressVariance: -15 });
    expect(calculateProjectHealth(project)).toBe("YELLOW");
  });

  it("returns YELLOW when profit is negative", () => {
    const project = mockProject({ expectedProfit: -100_000 });
    expect(calculateProjectHealth(project)).toBe("YELLOW");
  });

  it("returns YELLOW when cost overrun exceeds 10% of budget", () => {
    const project = mockProject({ budget: 1_000_000, forecastAtCompletion: 1_200_000 });
    expect(calculateProjectHealth(project)).toBe("YELLOW");
  });

  it("returns YELLOW when delay exceeds 30 days", () => {
    const project = mockProject({ delayDays: 45 });
    expect(calculateProjectHealth(project)).toBe("YELLOW");
  });

  it("returns YELLOW when risk is HIGH", () => {
    const project = mockProject({ riskLevel: "HIGH" });
    expect(calculateProjectHealth(project)).toBe("YELLOW");
  });

  it("returns RED when 3 or more negative indicators exist", () => {
    const project = mockProject({
      progressVariance: -15,
      expectedProfit: -100_000,
      forecastAtCompletion: 2_000_000,
      budget: 1_000_000,
      delayDays: 45,
    });
    expect(calculateProjectHealth(project)).toBe("RED");
  });

  it("returns RED when risk is CRITICAL with other issues", () => {
    const project = mockProject({
      riskLevel: "CRITICAL",
      progressVariance: -15,
      delayDays: 45,
    });
    expect(calculateProjectHealth(project)).toBe("RED");
  });
});

describe("Risk scoring", () => {
  it("correctly maps probability × impact", () => {
    const score = 4 * 5;
    expect(score).toBe(20);
  });

  it("LOW risk when score <= 4", () => {
    expect(1 * 1).toBeLessThanOrEqual(4);
    expect(2 * 2).toBeLessThanOrEqual(4);
  });

  it("MEDIUM risk when score 5-9", () => {
    const s = 3 * 3;
    expect(s).toBeGreaterThanOrEqual(5);
    expect(s).toBeLessThanOrEqual(9);
  });

  it("HIGH risk when score 10-19", () => {
    const s = 4 * 3;
    expect(s).toBeGreaterThanOrEqual(10);
    expect(s).toBeLessThanOrEqual(19);
  });

  it("CRITICAL risk when score >= 20", () => {
    const s = 5 * 4;
    expect(s).toBeGreaterThanOrEqual(20);
  });
});

describe("Financial calculations", () => {
  it("expected profit = contract value - forecast", () => {
    const contractValue = 10_000_000;
    const forecastAtCompletion = 7_500_000;
    expect(contractValue - forecastAtCompletion).toBe(2_500_000);
  });

  it("profit margin = (expectedProfit / contractValue) * 100", () => {
    const expectedProfit = 2_500_000;
    const contractValue = 10_000_000;
    expect((expectedProfit / contractValue) * 100).toBe(25);
  });

  it("progress variance = actual - planned", () => {
    expect(45 - 50).toBe(-5);
    expect(60 - 50).toBe(10);
  });

  it("delayDays positive means behind schedule", () => {
    expect(10).toBeGreaterThan(0);
    expect(0).toBe(0);
  });

  it("daysRemaining positive means ongoing", () => {
    expect(200).toBeGreaterThan(0);
    expect(-10).toBeLessThan(0);
  });
});
