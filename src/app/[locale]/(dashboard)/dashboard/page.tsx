"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { KPICard } from "@/components/dashboard/kpi-card";
import { DemoProjectService, DemoIdentityServiceImpl } from "@/services";
import { DEMO_ACTIVITIES } from "@/demo/data";
import { useLocale } from "next-intl";
import { formatCurrency, formatRelativeTime, formatNumber } from "@/lib/formatters";
import {
  PlusCircle,
  ShoppingCart,
  ClipboardCheck,
  FileText,
  DollarSign,
  UserPlus,
  TrendingUp,
  AlertTriangle,
  Activity,
  Building2,
  Users,
  CheckCircle2,
} from "lucide-react";

const projectService = new DemoProjectService();
const identityService = new DemoIdentityServiceImpl();

const quickActions = [
  { label: "إضافة مشروع", icon: PlusCircle, color: "bg-blue-500/10 text-blue-600", href: "/dashboard/projects/new" },
  { label: "إنشاء طلب شراء", icon: ShoppingCart, color: "bg-emerald-500/10 text-emerald-600", href: "#" },
  { label: "تسجيل تقرير يومي", icon: ClipboardCheck, color: "bg-amber-500/10 text-amber-600", href: "#" },
  { label: "إنشاء مستخلص", icon: FileText, color: "bg-purple-500/10 text-purple-600", href: "#" },
  { label: "إضافة مصروف", icon: DollarSign, color: "bg-rose-500/10 text-rose-600", href: "#" },
  { label: "دعوة مستخدم", icon: UserPlus, color: "bg-cyan-500/10 text-cyan-600", href: "#" },
];

const activityIcons: Record<string, React.ElementType> = {
  status_change: TrendingUp,
  risk_updated: AlertTriangle,
  milestone: CheckCircle2,
  report_submitted: ClipboardCheck,
  report_approved: ClipboardCheck,
  task_created: Activity,
  task_completed: CheckCircle2,
  comment: Activity,
  member_added: Users,
};

export default function DashboardPage() {
  const locale = useLocale();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ nameAr: string } | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const [projectList, dashboardStats] = await Promise.all([
          projectService.listProjects(),
          projectService.getDashboardStats(),
        ]);
        setProjects(projectList);
        setStats(dashboardStats);
        setUser(identityService.getCurrentUser());
      } catch {
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const greenCount = projects.filter((p: any) => p.health === "GREEN").length;
  const yellowCount = projects.filter((p: any) => p.health === "YELLOW").length;
  const redCount = projects.filter((p: any) => p.health === "RED").length;
  const total = projects.length || 1;

  const atRiskProjects = projects.filter(
    (p: any) => p.health === "RED" || p.status === "DELAYED"
  );

  const monthlyRevenue = stats ? Math.round(stats.totalContractValue / 12) : 0;

  if (loading) {
    return (
      <div dir="rtl">
        <Breadcrumbs items={[]} className="mb-2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <KPICard key={i} title="" value="" isLoading />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2"><CardContent className="h-48" /></Card>
          <Card><CardContent className="h-48" /></Card>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl">
      <Breadcrumbs items={[]} className="mb-2" />
      <PageHeader
        title={`مرحبًا، ${user?.nameAr || "المستخدم"}`}
        description="شركة الأفق المتقدمة للمقاولات — نظرة عامة على الأداء"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <KPICard
          title="إجمالي المشاريع"
          value={formatNumber(stats?.totalProjects ?? 0, locale)}
          icon={<Building2 className="h-5 w-5 text-white" />}
          color="primary"
        />
        <KPICard
          title="المشاريع النشطة"
          value={formatNumber(stats?.activeProjects ?? 0, locale)}
          icon={<Activity className="h-5 w-5 text-white" />}
          color="info"
        />
        <KPICard
          title="قيمة العقود"
          value={formatCurrency(stats?.totalContractValue ?? 0, "SAR", locale)}
          icon={<DollarSign className="h-5 w-5 text-white" />}
          color="success"
        />
        <KPICard
          title="المشاريع المتعثرة"
          value={formatNumber(redCount, locale)}
          icon={<AlertTriangle className="h-5 w-5 text-white" />}
          color="danger"
        />
        <KPICard
          title="الإيراد الشهري"
          value={formatCurrency(monthlyRevenue, "SAR", locale)}
          icon={<TrendingUp className="h-5 w-5 text-white" />}
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>صحة المشاريع</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[var(--text-primary)]">توزيع صحة المشاريع</span>
              <span className="text-sm text-[var(--text-secondary)]">{projects.length} مشاريع</span>
            </div>
            <div className="h-3 rounded-full bg-gray-200 overflow-hidden flex">
              <div
                className="h-full bg-[var(--color-success)] transition-all"
                style={{ width: `${(greenCount / total) * 100}%` }}
                title="أخضر"
              />
              <div
                className="h-full bg-[var(--color-warning)] transition-all"
                style={{ width: `${(yellowCount / total) * 100}%` }}
                title="أصفر"
              />
              <div
                className="h-full bg-[var(--color-danger)] transition-all"
                style={{ width: `${(redCount / total) * 100}%` }}
                title="أحمر"
              />
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-[var(--text-secondary)]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-success)]" /> سليم ({greenCount})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-warning)]" /> متوسط ({yellowCount})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-danger)]" /> متعثر ({redCount})
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>المشاريع المتعثرة</CardTitle>
          </CardHeader>
          <CardContent>
            {atRiskProjects.length === 0 ? (
              <p className="text-sm text-[var(--text-secondary)]">لا توجد مشاريع متعثرة</p>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-red-100 text-[var(--color-danger)]">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{atRiskProjects.length}</p>
                    <p className="text-xs text-[var(--text-secondary)]">مشاريع تحتاج اهتمامًا فوريًا</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {atRiskProjects.map((p: any) => (
                    <Link key={p.id} href={`/dashboard/projects/${p.id}`}>
                      <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer">
                        <span className="text-sm font-medium text-[var(--text-primary)]">{p.nameAr}</span>
                        <Badge variant={p.health === "RED" ? "red" : "orange"}>
                          {p.health === "RED" ? "متأخر" : "متعطل"}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">إجراءات سريعة</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.label} href={action.href}>
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer">
                  <div className={`p-2.5 rounded-lg ${action.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-[var(--text-primary)]">{action.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>آخر النشاطات</CardTitle>
        </CardHeader>
        <CardContent>
          {DEMO_ACTIVITIES.length === 0 ? (
            <p className="text-sm text-[var(--text-tertiary)] text-center py-4">لا توجد نشاطات حديثة</p>
          ) : (
            <div className="space-y-1">
              {DEMO_ACTIVITIES.slice(0, 10).map((activity) => {
                const Icon = activityIcons[activity.type] || Activity;
                return (
                  <div key={activity.id} className="flex items-center gap-3 py-3 border-b border-[var(--border-primary)] last:border-0">
                    <div className="p-2 rounded-full bg-[var(--bg-secondary)]">
                      <Icon className="h-4 w-4 text-[var(--text-secondary)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--text-primary)]">{activity.description}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{activity.performedBy}</p>
                    </div>
                    <span className="text-xs text-[var(--text-tertiary)] shrink-0">
                      {formatRelativeTime(activity.timestamp, locale)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
