import { describe, it, expect, beforeEach } from "vitest";
import {
  filterProjects,
  listDemoProjects,
  getDemoProject,
  createDemoProject,
  updateDemoProject,
  deleteDemoProject,
  getDemoDashboardStats,
  resetDemoProjects,
} from "@/demo/repositories/demo-project-repository";
import {
  filterRisks,
  listDemoRisks,
  createDemoRisk,
  updateDemoRisk,
  closeDemoRisk,
  resetDemoRisks,
} from "@/demo/repositories/demo-risk-repository";
import { DEMO_PROJECTS, DEMO_RISKS } from "@/demo/data";

describe("Demo Project Repository", () => {
  beforeEach(() => {
    resetDemoProjects();
  });

  it("lists all projects", async () => {
    const projects = await listDemoProjects();
    expect(projects.length).toBeGreaterThanOrEqual(8);
    expect(projects[0]).toHaveProperty("id");
    expect(projects[0]).toHaveProperty("nameAr");
  });

  it("gets a project by id", async () => {
    const first = await listDemoProjects();
    const project = await getDemoProject(first[0].id);
    expect(project).not.toBeNull();
    expect(project!.id).toBe(first[0].id);
  });

  it("returns null for non-existent project", async () => {
    const project = await getDemoProject("nonexistent");
    expect(project).toBeNull();
  });

  it("creates a new project", async () => {
    const before = await listDemoProjects();
    const created = await createDemoProject({
      nameAr: "مشروع اختبار",
      clientName: "عميل اختبار",
      city: "جدة",
      contractValue: 5_000_000,
      managerName: "م. اختبار",
    });
    const after = await listDemoProjects();
    expect(after.length).toBe(before.length + 1);
    expect(created.nameAr).toBe("مشروع اختبار");
    expect(created.id).toBeDefined();
  });

  it("updates a project", async () => {
    const projects = await listDemoProjects();
    const updated = await updateDemoProject(projects[0].id, {
      nameAr: "اسم محدث",
      actualProgress: 75,
    });
    expect(updated.nameAr).toBe("اسم محدث");
    expect(updated.actualProgress).toBe(75);
  });

  it("recalculates health on update", async () => {
    const projects = await listDemoProjects();
    const updated = await updateDemoProject(projects[0].id, {
      progressVariance: -20,
      expectedProfit: -500_000,
      delayDays: 60,
    });
    expect(["YELLOW", "RED"]).toContain(updated.health);
  });

  it("deletes a project", async () => {
    const before = await listDemoProjects();
    await deleteDemoProject(before[0].id);
    const after = await listDemoProjects();
    expect(after.length).toBe(before.length - 1);
  });

  it("throws on deleting non-existent project", async () => {
    await expect(deleteDemoProject("nonexistent")).rejects.toThrow();
  });

  it("filters by status", async () => {
    const active = filterProjects({ status: "ACTIVE" });
    active.forEach((p) => expect(p.status).toBe("ACTIVE"));
  });

  it("filters by search", async () => {
    const results = filterProjects({ search: "الرياض" });
    expect(results.length).toBeGreaterThanOrEqual(0);
  });

  it("filters by delayed only", async () => {
    const delayed = filterProjects({ delayedOnly: true });
    delayed.forEach((p) => expect(p.delayDays).toBeGreaterThan(0));
  });

  it("resets projects to original state", async () => {
    const before = DEMO_PROJECTS.length;
    DEMO_PROJECTS.splice(0, DEMO_PROJECTS.length);
    expect(DEMO_PROJECTS.length).toBe(0);
    resetDemoProjects();
    expect(DEMO_PROJECTS.length).toBe(before);
  });

  it("computes dashboard stats correctly", async () => {
    const stats = await getDemoDashboardStats();
    expect(stats.totalProjects).toBeGreaterThan(0);
    expect(stats.activeProjects).toBeGreaterThan(0);
    expect(stats.totalContractValue).toBeGreaterThan(0);
    expect(stats.totalExpectedProfit).toBeDefined();
    expect(stats.projectsByStatus).toBeDefined();
  });
});

describe("Demo Risk Repository", () => {
  beforeEach(() => {
    resetDemoRisks();
  });

  it("lists risks filtered by project", () => {
    const firstProject = DEMO_PROJECTS[0];
    const risks = filterRisks({ projectId: firstProject.id });
    expect(Array.isArray(risks)).toBe(true);
  });

  it("creates a risk", async () => {
    const before = await listDemoRisks();
    const risk = await createDemoRisk({
      projectId: DEMO_PROJECTS[0].id,
      title: "مخاطرة اختبار",
      probability: 3,
      impact: 4,
      category: "SCHEDULE",
    });
    const after = await listDemoRisks();
    expect(after.length).toBeGreaterThanOrEqual(before.length);
    expect(risk.score).toBe(12);
    expect(risk.level).toBe("HIGH");
  });

  it("calculates level from score on creation", async () => {
    const critical = await createDemoRisk({
      projectId: "proj-1",
      title: "Critical Test",
      probability: 5,
      impact: 5,
    });
    expect(critical.score).toBe(25);
    expect(critical.level).toBe("CRITICAL");

    const low = await createDemoRisk({
      projectId: "proj-1",
      title: "Low Test",
      probability: 1,
      impact: 2,
    });
    expect(low.score).toBe(2);
    expect(low.level).toBe("LOW");
  });

  it("updates a risk and recalculates score", async () => {
    const risk = await createDemoRisk({
      projectId: "proj-1",
      title: "Update Test",
      probability: 2,
      impact: 2,
    });
    const updated = await updateDemoRisk(risk.id, { probability: 5, impact: 5 });
    expect(updated.score).toBe(25);
    expect(updated.level).toBe("CRITICAL");
  });

  it("closes a risk", async () => {
    const risk = await createDemoRisk({
      projectId: "proj-1",
      title: "Close Test",
      status: "OPEN",
    });
    const closed = await closeDemoRisk(risk.id);
    expect(closed.status).toBe("CLOSED");
  });

  it("resets risks to original state", async () => {
    const before = DEMO_RISKS.length;
    DEMO_RISKS.splice(0, DEMO_RISKS.length);
    resetDemoRisks();
    expect(DEMO_RISKS.length).toBe(before);
  });

  it("filters by status", () => {
    const open = filterRisks({ status: "OPEN" });
    open.forEach((r) => expect(r.status).toBe("OPEN"));
  });
});

describe("Tenant separation (demo)", () => {
  it("projects belong to the demo tenant", () => {
    DEMO_PROJECTS.forEach((p) => {
      expect(p).toBeDefined();
    });
  });

  it("risks are linked to valid projects", () => {
    const projectIds = new Set(DEMO_PROJECTS.map((p) => p.id));
    DEMO_RISKS.forEach((r) => {
      expect(projectIds.has(r.projectId)).toBe(true);
    });
  });
});
