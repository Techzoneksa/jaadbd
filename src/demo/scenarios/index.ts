import { DEMO_PROJECTS, DEMO_MILESTONES, DEMO_TASKS, DEMO_RISKS, DEMO_DAILY_REPORTS } from "@/demo/data";
import { getDemoProject, updateDemoProject, createDemoProject, createDemoTask, createDemoRisk, createDemoReport, resetDemoProjects, resetDemoTasks, resetDemoRisks, resetDemoDailyReports } from "@/demo/repositories";

export function simulateProgressUpdate(projectId: string, newProgress: number): void {
  const project = DEMO_PROJECTS.find((p) => p.id === projectId);
  if (!project) return;
  project.actualProgress = Math.min(100, Math.max(0, newProgress));
  project.progressVariance = project.actualProgress - project.plannedProgress;
  const milestones = DEMO_MILESTONES.filter((m) => m.projectId === projectId);
  project.milestonesCompleted = milestones.filter((m) => m.status === "COMPLETED").length;
}

export function simulateCostOverrun(projectId: string, additionalCost: number): void {
  const project = DEMO_PROJECTS.find((p) => p.id === projectId);
  if (!project) return;
  project.actualCost += additionalCost;
  project.forecastAtCompletion = project.actualCost + project.commitments + (project.forecastAtCompletion - project.actualCost - project.commitments);
  project.expectedProfit = project.contractValue - project.forecastAtCompletion;
  project.profitMargin = project.contractValue > 0 ? (project.expectedProfit / project.contractValue) * 100 : 0;
}

export function delayProject(projectId: string, additionalDays: number): void {
  const project = DEMO_PROJECTS.find((p) => p.id === projectId);
  if (!project) return;
  project.delayDays += additionalDays;
  const end = new Date(project.endDate);
  end.setDate(end.getDate() + additionalDays);
  project.endDate = end.toISOString().slice(0, 10);
  if (project.status === "ACTIVE") project.status = "DELAYED";
}

export function completeProject(projectId: string): void {
  const project = DEMO_PROJECTS.find((p) => p.id === projectId);
  if (!project) return;
  project.status = "COMPLETED";
  project.actualProgress = 100;
  project.progressVariance = project.actualProgress - project.plannedProgress;
  project.health = "GREEN";
}

export function resetAllDemoData(): void {
  resetDemoProjects();
  resetDemoTasks();
  resetDemoRisks();
  resetDemoDailyReports();
}

export function generateDelayScenario(projectId: string): void {
  delayProject(projectId, 30);
  createDemoRisk({
    projectId,
    title: "تأخير إضافي بسبب الظروف",
    description: "تم محاكاة سيناريو تأخير لاختبار النظام",
    category: "SCHEDULE",
    probability: 4,
    impact: 4,
    level: "HIGH",
    owner: "مدير المشروع",
    status: "OPEN",
    responsePlan: "خطة معالجة مقترحة",
    preventiveAction: "إجراءات وقائية مقترحة",
    financialImpact: 100000,
    scheduleImpactDays: 30,
  });
  createDemoTask({
    projectId,
    title: "مهمة مستعجلة - السيناريو التجريبي",
    description: "مهمة تم إنشاؤها بواسطة سيناريو تجريبي",
    status: "IN_PROGRESS",
    priority: "URGENT",
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    tags: ["تجريبي"],
    checklist: [],
  });
}

export function generateBudgetScenario(projectId: string): void {
  simulateCostOverrun(projectId, 500000);
  createDemoRisk({
    projectId,
    title: "تجاوز الميزانية التقديرية",
    description: "محاكاة تجاوز في الميزانية لاختبار التقارير المالية",
    category: "COST",
    probability: 3,
    impact: 5,
    level: "HIGH",
    owner: "مدير المشروع",
    status: "OPEN",
    responsePlan: "مراجعة الميزانية وإعادة توزيع الموارد",
    preventiveAction: "مراقبة المصروفات أسبوعياً",
    financialImpact: 500000,
    scheduleImpactDays: 0,
  });
}
