"use client";

import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import {
  Button, Card, CardHeader, CardTitle, CardContent,
  Badge, Skeleton,
} from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { KPICard } from "@/components/dashboard/kpi-card";
import {
  formatCurrency, formatNumber, formatDate,
  formatDateRange, formatRelativeTime, formatDays,
} from "@/lib/formatters";
import { DemoProjectService, DemoTaskService, DemoDailyReportService, DemoRiskService } from "@/services";
import { DEMO_MILESTONES, DEMO_ACTIVITIES, ALL_PROJECT_MEMBERS } from "@/demo/data";
import type { Milestone, ActivityLog } from "@/demo/data";
import type { ProjectData } from "@/domain/projects";
import type { TaskData } from "@/domain/tasks";
import type { DailyReportData } from "@/domain/site-reports";
import type { RiskData } from "@/domain/risks";
import {
  Building2, MapPin, Calendar, User, Pencil, FilePlus2,
  AlertTriangle, CheckCircle2, TrendingUp,
  Clock, BarChart3, Users, Shield, FileText,
  ListTodo, Eye, Flag, MessageSquare,
} from "lucide-react";

const projectStatusLabels: Record<string, string> = {
  ACTIVE: "قيد التنفيذ", PLANNING: "تخطيط", DELAYED: "متأخر",
  COMPLETED: "مكتمل", ON_HOLD: "معلق", DRAFT: "مسودة",
  CLOSED: "مقفل", CANCELLED: "ملغي",
};

const healthLabels: Record<string, string> = {
  GREEN: "جيد", YELLOW: "متوسط", RED: "سيء",
};

const riskLevelLabels: Record<string, string> = {
  LOW: "منخفض", MEDIUM: "متوسط", HIGH: "عالي", CRITICAL: "حرج",
};

const taskStatusLabels: Record<string, string> = {
  TODO: "للتنفيذ", IN_PROGRESS: "قيد التنفيذ", COMPLETED: "مكتمل",
  BACKLOG: "مؤجل", BLOCKED: "معطل", IN_REVIEW: "قيد المراجعة",
  CANCELLED: "ملغي", OVERDUE: "متأخر",
};

const milestoneStatusLabels: Record<string, string> = {
  NOT_STARTED: "لم تبدأ", IN_PROGRESS: "قيد التنفيذ",
  COMPLETED: "مكتملة", DELAYED: "متأخرة",
};

const reportStatusLabels: Record<string, string> = {
  DRAFT: "مسودة", SUBMITTED: "مقدّم",
  UNDER_REVIEW: "قيد المراجعة", APPROVED: "معتمد", RETURNED: "مُعاد",
};

const riskStatusLabels: Record<string, string> = {
  OPEN: "مفتوحة", MONITORING: "تحت المراقبة",
  MITIGATING: "قيد المعالجة", ESCALATED: "مرفوعة", CLOSED: "مغلقة",
};

const roleLabels: Record<string, string> = {
  PROJECTS_DIRECTOR: "مدير المشاريع", PROJECT_MANAGER: "مدير مشروع",
  SITE_ENGINEER: "مهندس موقع", QUANTITY_SURVEYOR: "مساح كميات",
  PLANNING_ENGINEER: "مهندس تخطيط", HSE_OFFICER: "مسؤول سلامة",
  QA_QC_ENGINEER: "مهندس جودة", PROCUREMENT_MANAGER: "مدير مشتريات",
  FINANCE_MANAGER: "مدير مالي",
};

const activityIcons: Record<string, React.ReactNode> = {
  status_change: <BarChart3 className="h-4 w-4" />,
  risk_updated: <Shield className="h-4 w-4" />,
  milestone: <Flag className="h-4 w-4" />,
  report_submitted: <FileText className="h-4 w-4" />,
  report_approved: <CheckCircle2 className="h-4 w-4" />,
  task_created: <ListTodo className="h-4 w-4" />,
  task_completed: <CheckCircle2 className="h-4 w-4" />,
  comment: <MessageSquare className="h-4 w-4" />,
  member_added: <Users className="h-4 w-4" />,
};

const TABS = [
  { key: "overview", label: "نظرة عامة" },
  { key: "schedule", label: "الجدول الزمني" },
  { key: "tasks", label: "المهام" },
  { key: "milestones", label: "المراحل" },
  { key: "reports", label: "التقارير اليومية" },
  { key: "team", label: "الفريق" },
  { key: "risks", label: "المخاطر" },
  { key: "activities", label: "النشاطات" },
];

function ProgressVisual({ actual, planned }: { actual: number; planned: number }) {
  const diff = actual - planned;
  const isBehind = diff < 0;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[var(--text-primary)]">نسبة الإنجاز</span>
        <span className="font-medium text-[var(--text-primary)]">{formatNumber(actual)}%</span>
      </div>
      <div className="relative h-4 rounded-full bg-gray-200 overflow-hidden">
        <div className="h-full bg-[var(--color-info)] rounded-full transition-all" style={{ width: `${Math.max(actual, planned)}%` }} />
        {actual > 0 && (
          <div
            className={`absolute top-0 h-full rounded-full transition-all ${isBehind ? "bg-[var(--color-danger)]" : "bg-[var(--color-success)]"}`}
            style={{ width: `${actual}%` }}
          />
        )}
        <div className="absolute top-0 h-full w-0.5 bg-[var(--text-primary)]" style={{ right: `${planned}%` }} />
      </div>
      <div className="flex justify-between text-xs text-[var(--text-tertiary)]">
        <span>المخطط: {formatNumber(planned)}%</span>
        <span className={isBehind ? "text-[var(--color-danger)]" : "text-[var(--color-success)]"}>
          {isBehind ? `تأخر ${formatNumber(Math.abs(diff))}%` : `تقدم +${formatNumber(diff)}%`}
        </span>
      </div>
    </div>
  );
}

function SectionCard({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          {action}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function SectionLink({ href, count }: { href: string; count?: number }) {
  return (
    <Link href={href} className="text-xs font-medium text-[var(--color-primary-700)] hover:underline flex items-center gap-1">
      {count !== undefined ? `عرض الكل (${count})` : "عرض الكل"}
      <Eye className="h-3 w-3" />
    </Link>
  );
}

function LoadingSkeleton() {
  return (
    <div dir="rtl" className="space-y-6">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProjectCommandCenterContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const projectId = params.projectId as string;
  const activeTab = searchParams.get("tab") || "overview";

  const projectService = useMemo(() => new DemoProjectService(), []);
  const taskService = useMemo(() => new DemoTaskService(), []);
  const reportService = useMemo(() => new DemoDailyReportService(), []);
  const riskService = useMemo(() => new DemoRiskService(), []);

  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [reports, setReports] = useState<DailyReportData[]>([]);
  const [risks, setRisks] = useState<RiskData[]>([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [proj, t, r, ris] = await Promise.all([
          projectService.getProject(projectId),
          taskService.listTasks({ projectId }),
          reportService.listReports(projectId),
          riskService.listRisks({ projectId }),
        ]);
        setProject(proj);
        setTasks(t || []);
        setReports(r || []);
        setRisks(ris || []);
      } catch {
        setProject(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [projectId, projectService, taskService, reportService, riskService]);

  const projectMilestones = useMemo(
    () => DEMO_MILESTONES.filter((m) => m.projectId === projectId),
    [projectId],
  );

  const projectActivities = useMemo(
    () => DEMO_ACTIVITIES.filter((a) => a.projectId === projectId).sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    ),
    [projectId],
  );

  const projectMembers = useMemo(
    () => ALL_PROJECT_MEMBERS.filter((m) => m.projectId === projectId),
    [projectId],
  );

  const setTab = useCallback(
    (tab: string) => {
      const sp = new URLSearchParams(searchParams.toString());
      sp.set("tab", tab);
      router.push(`${pathname}?${sp.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const tasksByStatus = useMemo(() => {
    const counts: Record<string, number> = { TODO: 0, IN_PROGRESS: 0, COMPLETED: 0, OVERDUE: 0 };
    const now = new Date();
    tasks.forEach((t) => {
      const isOverdue = t.dueDate && new Date(t.dueDate) < now && t.status !== "COMPLETED" && t.status !== "CANCELLED";
      if (isOverdue) counts.OVERDUE++;
      else if (counts[t.status] !== undefined) counts[t.status]++;
    });
    return counts;
  }, [tasks]);

  const upcomingMilestones = useMemo(
    () => projectMilestones.filter((m) => m.status !== "COMPLETED").slice(0, 2),
    [projectMilestones],
  );

  const completedMilestones = useMemo(
    () => projectMilestones.filter((m) => m.status === "COMPLETED").slice(-2),
    [projectMilestones],
  );

  const recentReports = useMemo(
    () => [...reports].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3),
    [reports],
  );

  const recentActivities = useMemo(
    () => projectActivities.slice(0, 5),
    [projectActivities],
  );

  const sortedMilestones = useMemo(
    () => [...projectMilestones].sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()),
    [projectMilestones],
  );

  const budgetHalf = project ? project.budget / 2 : 0;
  const costTrend = project && project.actualCost > budgetHalf ? "up" as const : "neutral" as const;
  const costChange = project ? Math.round((project.actualCost / project.budget) * 100) : 0;
  const profitTrend = project && project.expectedProfit > 0 ? "up" as const : "down" as const;
  const progressTrend = project && project.progressVariance >= 0 ? "up" as const : "down" as const;

  if (loading) return <LoadingSkeleton />;

  if (!project) {
    return (
      <div dir="rtl" className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-[var(--color-warning)]" />
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">المشروع غير موجود</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">لم يتم العثور على المشروع المطلوب</p>
          <Link
            href="/dashboard/projects"
            className="text-sm font-medium text-[var(--color-primary-700)] hover:underline"
          >
            العودة إلى المشاريع
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl">
      <Breadcrumbs
        items={[
          { label: "المشاريع", href: "/dashboard/projects" },
          { label: project.nameAr },
        ]}
        className="mb-2"
      />

      <PageHeader title={project.nameAr} description={`${project.code}`}>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/projects/${projectId}/edit`}>
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4 ml-1" />
              تعديل
            </Button>
          </Link>
          <Link href={`/dashboard/projects/${projectId}/daily-reports/new`}>
            <Button size="sm">
              <FilePlus2 className="h-4 w-4 ml-1" />
              تقرير جديد
            </Button>
          </Link>
        </div>
      </PageHeader>

      <div className="flex items-center gap-2 flex-wrap mb-4">
        <StatusBadge status={project.status} label={projectStatusLabels[project.status]} />
        <StatusBadge status={project.health} label={healthLabels[project.health]} />
        <Badge variant={project.riskLevel === "HIGH" || project.riskLevel === "CRITICAL" ? "red" : project.riskLevel === "MEDIUM" ? "yellow" : "green"}>
          {riskLevelLabels[project.riskLevel]}
        </Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="h-4 w-4 text-[var(--text-tertiary)]" />
              <span className="text-xs text-[var(--text-secondary)]">العميل</span>
            </div>
            <p className="text-sm font-medium text-[var(--text-primary)] truncate">{project.clientName}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-4 w-4 text-[var(--text-tertiary)]" />
              <span className="text-xs text-[var(--text-secondary)]">المدينة</span>
            </div>
            <p className="text-sm font-medium text-[var(--text-primary)]">{project.city}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <User className="h-4 w-4 text-[var(--text-tertiary)]" />
              <span className="text-xs text-[var(--text-secondary)]">مدير المشروع</span>
            </div>
            <p className="text-sm font-medium text-[var(--text-primary)]">{project.managerName}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-[var(--text-tertiary)]" />
              <span className="text-xs text-[var(--text-secondary)]">تاريخ البداية</span>
            </div>
            <p className="text-sm font-medium text-[var(--text-primary)]">{formatDate(project.startDate, locale)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-[var(--text-tertiary)]" />
              <span className="text-xs text-[var(--text-secondary)]">تاريخ النهاية</span>
            </div>
            <p className="text-sm font-medium text-[var(--text-primary)]">{formatDate(project.endDate, locale)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="h-4 w-4 text-[var(--text-tertiary)]" />
              <span className="text-xs text-[var(--text-secondary)]">المدة</span>
            </div>
            <p className="text-sm font-medium text-[var(--text-primary)]">{formatDateRange(project.startDate, project.endDate, locale)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
        <KPICard
          title="قيمة العقد"
          value={formatCurrency(project.contractValue, project.currency, locale)}
          icon={<Building2 className="h-5 w-5 text-white" />}
          color="primary"
          trend="neutral"
        />
        <KPICard
          title="التكلفة الفعلية"
          value={formatCurrency(project.actualCost, project.currency, locale)}
          icon={<TrendingUp className="h-5 w-5 text-white" />}
          color="warning"
          trend={costTrend}
          change={costChange}
          changeLabel="من الميزانية"
        />
        <KPICard
          title="الربح المتوقع"
          value={formatCurrency(project.expectedProfit, project.currency, locale)}
          icon={<TrendingUp className="h-5 w-5 text-white" />}
          color="success"
          trend={profitTrend}
          change={Math.round(project.profitMargin)}
          changeLabel="هامش الربح"
        />
        <KPICard
          title="فارق التقدم"
          value={`${formatNumber(project.progressVariance)}%`}
          icon={<BarChart3 className="h-5 w-5 text-white" />}
          color={progressTrend === "up" ? "success" : "danger"}
          trend={progressTrend}
          change={Math.abs(Math.round(project.progressVariance))}
          changeLabel={progressTrend === "up" ? "متقدم" : "متأخر"}
        />
        <KPICard
          title="الأيام المتبقية"
          value={formatDays(project.daysRemaining, locale)}
          icon={<Clock className="h-5 w-5 text-white" />}
          color="info"
          trend="neutral"
        />
        {project.health === "RED" && (
          <KPICard
            title="مخاطر مفتوحة"
          value={String(project.risksOpen)}
            icon={<AlertTriangle className="h-5 w-5 text-white" />}
            color="danger"
            trend="up"
            change={Math.round((project.risksOpen / Math.max(project.riskCount, 1)) * 100)}
            changeLabel="من إجمالي المخاطر"
          />
        )}
      </div>

      <div className="border-b border-[var(--border-primary)] mb-6">
        <div className="flex gap-1 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setTab(tab.key)}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-[var(--color-primary-700)] text-[var(--color-primary-700)]"
                  : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "overview" && (
        <OverviewTab
          project={project}
          locale={locale}
          tasksByStatus={tasksByStatus}
          upcomingMilestones={upcomingMilestones}
          completedMilestones={completedMilestones}
          recentReports={recentReports}
          recentActivities={recentActivities}
          projectId={projectId}
        />
      )}

      {activeTab === "schedule" && (
        <ScheduleTab
          milestones={sortedMilestones}
          locale={locale}
          projectId={projectId}
        />
      )}

      {activeTab === "tasks" && (
        <TasksTab
          tasks={tasks}
          locale={locale}
          projectId={projectId}
        />
      )}

      {activeTab === "milestones" && (
        <MilestonesTab
          milestones={projectMilestones}
          locale={locale}
          projectId={projectId}
        />
      )}

      {activeTab === "reports" && (
        <ReportsTab
          reports={reports}
          locale={locale}
          projectId={projectId}
        />
      )}

      {activeTab === "team" && (
        <TeamTab
          members={projectMembers}
          projectId={projectId}
        />
      )}

      {activeTab === "risks" && (
        <RisksTab
          risks={risks}
          projectId={projectId}
        />
      )}

      {activeTab === "activities" && (
        <ActivitiesTab
          activities={projectActivities}
          locale={locale}
        />
      )}
    </div>
  );
}

function OverviewTab({
  project, locale, tasksByStatus,
  upcomingMilestones, completedMilestones, recentReports,
  recentActivities, projectId,
}: {
  project: ProjectData; locale: string;
  tasksByStatus: Record<string, number>;
  upcomingMilestones: Milestone[]; completedMilestones: Milestone[];
  recentReports: DailyReportData[]; recentActivities: ActivityLog[]; projectId: string;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <SectionCard title="تقدم المشروع">
          <ProgressVisual actual={project.actualProgress} planned={project.plannedProgress} />
        </SectionCard>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SectionCard
            title="المراحل القادمة"
            action={<SectionLink href={`?tab=milestones`} count={project.milestoneCount} />}
          >
            {upcomingMilestones.length === 0 ? (
              <p className="text-sm text-[var(--text-tertiary)]">لا توجد مراحل قادمة</p>
            ) : (
              <div className="space-y-3">
                {upcomingMilestones.map((m) => (
                  <div key={m.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{m.name}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{formatDate(m.endDate, locale)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            m.status === "DELAYED" ? "bg-[var(--color-danger)]" :
                            m.progress > 0 ? "bg-[var(--color-primary-700)]" : "bg-gray-300"
                          }`}
                          style={{ width: `${m.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-[var(--text-secondary)]">{m.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          <SectionCard title="المراحل المنجزة">
            {completedMilestones.length === 0 ? (
              <p className="text-sm text-[var(--text-tertiary)]">لا توجد مراحل منجزة</p>
            ) : (
              <div className="space-y-3">
                {completedMilestones.map((m) => (
                  <div key={m.id} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-success)] shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{m.name}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{formatDate(m.endDate, locale)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        <SectionCard
          title="التقارير اليومية الأخيرة"
          action={<SectionLink href={`/dashboard/projects/${projectId}/daily-reports`} count={project.dailyReportCount} />}
        >
          {recentReports.length === 0 ? (
            <p className="text-sm text-[var(--text-tertiary)]">لا توجد تقارير</p>
          ) : (
            <div className="space-y-3">
              {recentReports.map((r) => (
                <div key={r.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{r.reportNumber}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">{formatDate(r.date, locale)} - {r.preparedByName}</p>
                  </div>
                  <StatusBadge status={r.status} label={reportStatusLabels[r.status]} />
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>

      <div className="space-y-6">
        <SectionCard title="معلومات المشروع">
          <div className="space-y-3">
            <div>
              <span className="text-xs text-[var(--text-secondary)]">النوع</span>
              <p className="text-sm font-medium text-[var(--text-primary)]">{project.projectType}</p>
            </div>
            <div>
              <span className="text-xs text-[var(--text-secondary)]">الموقع</span>
              <p className="text-sm font-medium text-[var(--text-primary)]">{project.location || "-"}</p>
            </div>
            {project.scopeOfWork && (
              <div>
                <span className="text-xs text-[var(--text-secondary)]">نطاق العمل</span>
                <p className="text-xs text-[var(--text-primary)] mt-1 leading-relaxed">{project.scopeOfWork}</p>
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard
          title="المهام"
          action={<SectionLink href={`?tab=tasks`} count={project.taskCount} />}
        >
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-secondary)]">للتنفيذ</span>
              <span className="font-medium text-[var(--text-primary)]">{tasksByStatus.TODO}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-secondary)]">قيد التنفيذ</span>
              <span className="font-medium text-[var(--text-primary)]">{tasksByStatus.IN_PROGRESS}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-secondary)]">مكتملة</span>
              <span className="font-medium text-[var(--text-primary)]">{tasksByStatus.COMPLETED}</span>
            </div>
            {tasksByStatus.OVERDUE > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-danger)]">متأخرة</span>
                <span className="font-medium text-[var(--color-danger)]">{tasksByStatus.OVERDUE}</span>
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard
          title="آخر النشاطات"
          action={<SectionLink href={`?tab=activities`} count={project.recentActivityCount} />}
        >
          {recentActivities.length === 0 ? (
            <p className="text-sm text-[var(--text-tertiary)]">لا توجد نشاطات</p>
          ) : (
            <div className="space-y-3">
              {recentActivities.map((a) => (
                <div key={a.id} className="flex items-start gap-2">
                  <div className="mt-0.5 text-[var(--text-tertiary)]">{activityIcons[a.type]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--text-primary)] truncate">{a.title}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">{formatRelativeTime(a.timestamp, locale)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}

function ScheduleTab({ milestones, locale, projectId }: { milestones: Milestone[]; locale: string; projectId: string }) {
  const minDate = milestones.length > 0
    ? new Date(Math.min(...milestones.map((m) => new Date(m.startDate).getTime())))
    : new Date();
  const maxDate = milestones.length > 0
    ? new Date(Math.max(...milestones.map((m) => new Date(m.endDate).getTime())))
    : new Date();
  return (
    <div className="space-y-6">
      <SectionCard
        title="الجدول الزمني للمراحل"
        action={<SectionLink href={`/dashboard/projects/${projectId}/milestones`} count={milestones.length} />}
      >
        {milestones.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">لا توجد مراحل</p>
        ) : (
          <div className="space-y-4">
            {milestones.map((m) => {
              const msStart = new Date(m.startDate).getTime();
              const msEnd = new Date(m.endDate).getTime();
              const leftPct = ((msStart - minDate.getTime()) / (maxDate.getTime() - minDate.getTime() || 1)) * 100;
              const widthPct = ((msEnd - msStart) / (maxDate.getTime() - minDate.getTime() || 1)) * 100;
              const barColor = m.status === "COMPLETED" ? "bg-[var(--color-success)]"
                : m.status === "DELAYED" ? "bg-[var(--color-danger)]"
                : m.status === "IN_PROGRESS" ? "bg-[var(--color-primary-700)]"
                : "bg-gray-300";
              return (
                <div key={m.id}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">{m.name}</p>
                      <StatusBadge status={m.status} label={milestoneStatusLabels[m.status]} />
                    </div>
                    <span className="text-xs text-[var(--text-tertiary)] shrink-0">
                      {formatDate(m.startDate, locale)} - {formatDate(m.endDate, locale)}
                    </span>
                  </div>
                  <div className="relative h-6 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`absolute top-0 h-full rounded-full ${barColor} transition-all`}
                      style={{ right: `${leftPct}%`, width: `${Math.max(widthPct, 2)}%` }}
                    />
                    <div
                      className="absolute top-0 h-full bg-[var(--color-success)] opacity-40 rounded-full transition-all"
                      style={{ right: `${leftPct}%`, width: `${Math.max(widthPct * (m.progress / 100), 0)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-[var(--text-tertiary)] mt-1">
                    <span>التقدم: {m.progress}%</span>
                    <span>{formatDate(m.startDate, locale)}</span>
                    <span>{formatDate(m.endDate, locale)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function TasksTab({ tasks, locale, projectId }: { tasks: TaskData[]; locale: string; projectId: string }) {
  const displayTasks = tasks.slice(0, 10);

  return (
    <div className="space-y-6">
      <SectionCard
        title="المهام"
        action={<SectionLink href={`/dashboard/projects/${projectId}/tasks`} count={tasks.length} />}
      >
        {displayTasks.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">لا توجد مهام</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-primary)] text-right">
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">المهمة</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">المسؤول</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">الحالة</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">الأولوية</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">تاريخ الاستحقاق</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">التقدم</th>
                </tr>
              </thead>
              <tbody>
                {displayTasks.map((t) => (
                  <tr key={t.id} className="border-b border-[var(--border-primary)] last:border-0">
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{t.title}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{t.assigneeName || "-"}</td>
                    <td className="px-3 py-2">
                      <StatusBadge status={t.status} label={taskStatusLabels[t.status] || t.status} />
                    </td>
                    <td className="px-3 py-2">
                      <Badge variant={t.priority === "URGENT" ? "red" : t.priority === "HIGH" ? "orange" : t.priority === "MEDIUM" ? "yellow" : "gray"}>
                        {t.priority === "URGENT" ? "عاجل" : t.priority === "HIGH" ? "عالية" : t.priority === "MEDIUM" ? "متوسطة" : "منخفضة"}
                      </Badge>
                    </td>
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{formatDate(t.dueDate, locale)}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-gray-200 overflow-hidden">
                          <div className={`h-full rounded-full ${t.progress === 100 ? "bg-[var(--color-success)]" : "bg-[var(--color-primary-700)]"}`}
                            style={{ width: `${t.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-[var(--text-secondary)]">{t.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function MilestonesTab({ milestones, locale, projectId }: { milestones: Milestone[]; locale: string; projectId: string }) {
  return (
    <div className="space-y-6">
      <SectionCard
        title="مراحل المشروع"
        action={<SectionLink href={`/dashboard/projects/${projectId}/milestones`} count={milestones.length} />}
      >
        {milestones.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">لا توجد مراحل</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-primary)] text-right">
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">المرحلة</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">تاريخ البدء</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">تاريخ النهاية</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">التقدم</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {milestones.map((m) => (
                  <tr key={m.id} className="border-b border-[var(--border-primary)] last:border-0">
                    <td className="px-3 py-2">
                      <p className="text-sm font-medium text-[var(--text-primary)]">{m.name}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{m.description}</p>
                    </td>
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{formatDate(m.startDate, locale)}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{formatDate(m.endDate, locale)}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${m.progress === 100 ? "bg-[var(--color-success)]" : m.status === "DELAYED" ? "bg-[var(--color-danger)]" : "bg-[var(--color-primary-700)]"}`}
                            style={{ width: `${m.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-[var(--text-secondary)]">{m.progress}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <StatusBadge status={m.status} label={milestoneStatusLabels[m.status]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function ReportsTab({ reports, locale, projectId }: { reports: DailyReportData[]; locale: string; projectId: string }) {
  const sorted = [...reports].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <div className="space-y-6">
      <SectionCard
        title="التقارير اليومية"
        action={<SectionLink href={`/dashboard/projects/${projectId}/daily-reports`} count={reports.length} />}
      >
        {sorted.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">لا توجد تقارير</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-primary)] text-right">
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">رقم التقرير</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">التاريخ</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">أعد بواسطة</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((r) => (
                  <tr key={r.id} className="border-b border-[var(--border-primary)] last:border-0">
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{r.reportNumber}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{formatDate(r.date, locale)}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{r.preparedByName}</td>
                    <td className="px-3 py-2">
                      <StatusBadge status={r.status} label={reportStatusLabels[r.status]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function TeamTab({ members, projectId }: { members: typeof ALL_PROJECT_MEMBERS; projectId: string }) {
  return (
    <div className="space-y-6">
      <SectionCard
        title="فريق المشروع"
        action={<SectionLink href={`/dashboard/projects/${projectId}/team`} count={members.length} />}
      >
        {members.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">لا يوجد أعضاء في الفريق</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((m) => (
              <Card key={m.userId}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center text-sm font-bold text-[var(--color-primary-700)]">
                      {m.userName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{m.userName}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{roleLabels[m.role] || m.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function RisksTab({ risks, projectId }: { risks: RiskData[]; projectId: string }) {
  const sorted = [...risks].sort((a, b) => b.score - a.score);
  return (
    <div className="space-y-6">
      <SectionCard
        title="المخاطر"
        action={<SectionLink href={`/dashboard/projects/${projectId}/risks`} count={risks.length} />}
      >
        {sorted.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">لا توجد مخاطر</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-primary)] text-right">
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">المخاطرة</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">التصنيف</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">الدرجة</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">المستوى</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">المالك</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((r) => (
                  <tr key={r.id} className="border-b border-[var(--border-primary)] last:border-0">
                    <td className="px-3 py-2">
                      <p className="text-sm font-medium text-[var(--text-primary)]">{r.title}</p>
                    </td>
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{r.category}</td>
                    <td className="px-3 py-2">
                      <span className={`text-sm font-bold ${
                        r.score >= 20 ? "text-[var(--color-danger)]" :
                        r.score >= 12 ? "text-[var(--color-warning)]" :
                        "text-[var(--text-secondary)]"
                      }`}>
                        {r.score}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <StatusBadge status={r.level} label={riskLevelLabels[r.level]} />
                    </td>
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{r.owner}</td>
                    <td className="px-3 py-2">
                      <StatusBadge status={r.status} label={riskStatusLabels[r.status]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function ActivitiesTab({ activities, locale }: { activities: ActivityLog[]; locale: string }) {
  const sorted = [...activities].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
  return (
    <div className="space-y-6">
      <SectionCard title="النشاطات">
        {sorted.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">لا توجد نشاطات</p>
        ) : (
          <div className="space-y-1">
            {sorted.map((a) => (
              <div key={a.id} className="flex items-start gap-3 py-3 border-b border-[var(--border-primary)] last:border-0">
                <div className="mt-1 p-1.5 rounded-full bg-gray-100 text-[var(--text-tertiary)]">
                  {activityIcons[a.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{a.title}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{a.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-[var(--text-tertiary)]">{a.performedBy}</span>
                    <span className="text-xs text-[var(--text-tertiary)]">·</span>
                    <span className="text-xs text-[var(--text-tertiary)]">{formatRelativeTime(a.timestamp, locale)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

export default function ProjectDetailPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProjectCommandCenterContent />
    </Suspense>
  );
}
