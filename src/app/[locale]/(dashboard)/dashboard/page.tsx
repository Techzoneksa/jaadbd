"use client";

import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { KPICard } from "@/components/dashboard/kpi-card";
import { useToast } from "@/components/feedback/toast";
import { formatCurrency } from "@/lib/formatters";
import {
  PlusCircle,
  ShoppingCart,
  ClipboardCheck,
  FileText,
  DollarSign,
  UserPlus,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Activity,
  Building2,
} from "lucide-react";

const companyName = "شركة الأفق للمقاولات";

const stats = {
  totalProjects: 8,
  activeProjects: 8,
  totalContractValue: "48,750,000",
  totalProgress: 57,
  uncollected: "4,280,000",
  commitments: "6,130,000",
  expectedProfit: "5,420,000",
  atRisk: 2,
};

const quickActions = [
  { label: "إضافة مشروع", icon: PlusCircle, color: "bg-blue-500/10 text-blue-600" },
  { label: "إنشاء طلب شراء", icon: ShoppingCart, color: "bg-emerald-500/10 text-emerald-600" },
  { label: "تسجيل تقرير يومي", icon: ClipboardCheck, color: "bg-amber-500/10 text-amber-600" },
  { label: "إنشاء مستخلص", icon: FileText, color: "bg-purple-500/10 text-purple-600" },
  { label: "إضافة مصروف", icon: DollarSign, color: "bg-rose-500/10 text-rose-600" },
  { label: "دعوة مستخدم", icon: UserPlus, color: "bg-cyan-500/10 text-cyan-600" },
];

const activities = [
  { text: 'تم إنشاء مشروع "مجمع الروضة السكني"', time: "منذ 5 دقائق", icon: PlusCircle },
  { text: 'تم تحديث نسبة إنجاز مشروع "فلل الواحة"', time: "منذ ساعة", icon: TrendingUp },
  { text: 'تم تسجيل تقرير يومي لمشروع "برج الأعمال"', time: "منذ ساعتين", icon: ClipboardCheck },
  { text: "تم إضافة مصروف جديد", time: "منذ 3 ساعات", icon: DollarSign },
  { text: "تم دعوة مستخدم جديد", time: "منذ 5 ساعات", icon: UserPlus },
];

export default function DashboardPage() {
  const { addToast } = useToast();

  return (
    <div dir="rtl">
      <Breadcrumbs items={[]} className="mb-2" />
      <PageHeader
        title={`مرحبًا، مدير النظام`}
        description={`${companyName} — نظرة عامة على الأداء`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <KPICard
          title="إجمالي قيمة العقود"
          value={formatCurrency(stats.totalContractValue)}
          icon={<Building2 className="h-5 w-5 text-white" />}
          color="primary"
          trend="up"
          change={12}
          changeLabel="عن الشهر الماضي"
        />
        <KPICard
          title="المشاريع النشطة"
          value={`${stats.activeProjects} مشاريع`}
          icon={<Activity className="h-5 w-5 text-white" />}
          color="info"
          trend="neutral"
          change={0}
        />
        <KPICard
          title="المبالغ غير المحصلة"
          value={formatCurrency(stats.uncollected)}
          icon={<AlertTriangle className="h-5 w-5 text-white" />}
          color="warning"
          trend="up"
          change={8}
          changeLabel="عن الشهر الماضي"
        />
        <KPICard
          title="الالتزامات المفتوحة"
          value={formatCurrency(stats.commitments)}
          icon={<Clock className="h-5 w-5 text-white" />}
          color="danger"
          trend="up"
          change={5}
          changeLabel="عن الشهر الماضي"
        />
        <KPICard
          title="الربح المتوقع"
          value={formatCurrency(stats.expectedProfit)}
          icon={<TrendingUp className="h-5 w-5 text-white" />}
          color="success"
          trend="up"
          change={15}
          changeLabel="عن الشهر الماضي"
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
              <span className="text-sm text-[var(--text-secondary)]">{stats.totalProjects} مشاريع</span>
            </div>
            <div className="h-3 rounded-full bg-gray-200 overflow-hidden flex">
              <div className="h-full bg-[var(--color-success)] transition-all" style={{ width: "50%" }} title="أخضر" />
              <div className="h-full bg-[var(--color-warning)] transition-all" style={{ width: "25%" }} title="أصفر" />
              <div className="h-full bg-[var(--color-danger)] transition-all" style={{ width: "25%" }} title="أحمر" />
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-[var(--text-secondary)]">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[var(--color-success)]" /> سليم ({4})</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[var(--color-warning)]" /> متوسط ({2})</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[var(--color-danger)]" /> متعثر ({2})</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>المشاريع المتعثرة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-red-100 text-[var(--color-danger)]">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--text-primary)]">{stats.atRisk}</p>
                <p className="text-xs text-[var(--text-secondary)]">مشاريع تحتاج اهتمامًا فوريًا</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                <span className="text-sm font-medium text-[var(--text-primary)]">طريق الملك فهد</span>
                <Badge variant="red">متأخر</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-amber-50 rounded-lg">
                <span className="text-sm font-medium text-[var(--text-primary)]">محطة تحلية المياه</span>
                <Badge variant="yellow">مخاطرة متوسطة</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">إجراءات سريعة</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => addToast({ type: "info", title: "قيد التطوير", description: `سيتم تفعيل "${action.label}" قريبًا` })}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <div className={`p-2.5 rounded-lg ${action.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-[var(--text-primary)]">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>آخر النشاطات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {activities.map((activity, i) => {
              const Icon = activity.icon;
              return (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-[var(--border-primary)] last:border-0">
                  <div className="p-2 rounded-full bg-[var(--bg-secondary)]">
                    <Icon className="h-4 w-4 text-[var(--text-secondary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--text-primary)]">{activity.text}</p>
                  </div>
                  <span className="text-xs text-[var(--text-tertiary)] shrink-0">{activity.time}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
