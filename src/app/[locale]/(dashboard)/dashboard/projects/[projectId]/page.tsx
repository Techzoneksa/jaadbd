"use client";

import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { KPICard } from "@/components/dashboard/kpi-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency, formatDate } from "@/lib/formatters";
import {
  Building2,
  MapPin,
  Calendar,
  User,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BarChart3,
} from "lucide-react";

const allProjects: Record<string, any> = {
  "1": {
    id: "1", name: "مجمع الروضة السكني", client: "شركة الروضة العقارية", city: "الرياض",
    contractValue: 12500000, budget: 11000000, actualCost: 6800000, commitments: 3200000,
    expectedProfit: 1800000, progress: 65, plannedProgress: 60, status: "ACTIVE", health: "GREEN",
    risk: "LOW", manager: "م. أحمد السعيد", startDate: "2025-01-15", endDate: "2026-06-15",
    delayDays: 0, milestones: [
      { name: "الأعمال الترابية", date: "2025-03-15", progress: 100, status: "COMPLETED" },
      { name: "القواعد والأساسات", date: "2025-06-30", progress: 100, status: "COMPLETED" },
      { name: "الهيكل الخرساني", date: "2025-12-30", progress: 80, status: "IN_PROGRESS" },
      { name: "الأعمال المعمارية", date: "2026-03-30", progress: 30, status: "IN_PROGRESS" },
      { name: "التشطيبات النهائية", date: "2026-05-30", progress: 5, status: "PENDING" },
      { name: "التسليم النهائي", date: "2026-06-15", progress: 0, status: "PENDING" },
    ],
  },
  "2": {
    id: "2", name: "برج الأعمال التجاري", client: "مجموعة الأعمال", city: "جدة",
    contractValue: 8750000, budget: 7500000, actualCost: 4200000, commitments: 1800000,
    expectedProfit: 1200000, progress: 42, plannedProgress: 50, status: "ACTIVE", health: "YELLOW",
    risk: "MEDIUM", manager: "م. خالد العمري", startDate: "2025-03-01", endDate: "2026-09-30",
    delayDays: 0, milestones: [
      { name: "الأعمال الترابية", date: "2025-05-15", progress: 100, status: "COMPLETED" },
      { name: "القواعد والأساسات", date: "2025-08-30", progress: 100, status: "COMPLETED" },
      { name: "الهيكل الخرساني", date: "2026-02-28", progress: 45, status: "IN_PROGRESS" },
      { name: "الأعمال المعمارية", date: "2026-06-30", progress: 10, status: "PENDING" },
      { name: "التشطيبات النهائية", date: "2026-08-30", progress: 0, status: "PENDING" },
      { name: "التسليم النهائي", date: "2026-09-30", progress: 0, status: "PENDING" },
    ],
  },
  "3": {
    id: "3", name: "مستشفى المدينة المنورة", client: "وزارة الصحة", city: "المدينة المنورة",
    contractValue: 15000000, budget: 13000000, actualCost: 3200000, commitments: 1800000,
    expectedProfit: 2500000, progress: 28, plannedProgress: 25, status: "ACTIVE", health: "GREEN",
    risk: "LOW", manager: "م. فهد القحطاني", startDate: "2025-06-01", endDate: "2027-03-20",
    delayDays: 0, milestones: [
      { name: "الأعمال الترابية", date: "2025-09-01", progress: 100, status: "COMPLETED" },
      { name: "القواعد والأساسات", date: "2025-12-30", progress: 60, status: "IN_PROGRESS" },
      { name: "الهيكل الخرساني", date: "2026-06-30", progress: 0, status: "PENDING" },
      { name: "الأعمال المعمارية", date: "2026-10-30", progress: 0, status: "PENDING" },
      { name: "التشطيبات النهائية", date: "2027-02-28", progress: 0, status: "PENDING" },
      { name: "التسليم النهائي", date: "2027-03-20", progress: 0, status: "PENDING" },
    ],
  },
  "4": {
    id: "4", name: "فلل الواحة السكنية", client: "شركة الواحة للتطوير", city: "الخبر",
    contractValue: 3500000, budget: 3000000, actualCost: 2400000, commitments: 400000,
    expectedProfit: 400000, progress: 80, plannedProgress: 85, status: "ACTIVE", health: "GREEN",
    risk: "LOW", manager: "م. محمد الحربي", startDate: "2024-10-01", endDate: "2025-12-30",
    delayDays: 0, milestones: [
      { name: "الأعمال الترابية", date: "2024-11-15", progress: 100, status: "COMPLETED" },
      { name: "القواعد والأساسات", date: "2025-01-30", progress: 100, status: "COMPLETED" },
      { name: "الهيكل الخرساني", date: "2025-05-30", progress: 100, status: "COMPLETED" },
      { name: "الأعمال المعمارية", date: "2025-08-30", progress: 90, status: "IN_PROGRESS" },
      { name: "التشطيبات النهائية", date: "2025-11-30", progress: 40, status: "IN_PROGRESS" },
      { name: "التسليم النهائي", date: "2025-12-30", progress: 0, status: "PENDING" },
    ],
  },
  "5": {
    id: "5", name: "مبنى الإدارة الحكومي", client: "أمانة المنطقة", city: "الرياض",
    contractValue: 5000000, budget: 4300000, actualCost: 2100000, commitments: 900000,
    expectedProfit: 900000, progress: 55, plannedProgress: 50, status: "ACTIVE", health: "GREEN",
    risk: "LOW", manager: "م. سعود الدوسري", startDate: "2025-02-01", endDate: "2026-08-15",
    delayDays: 0, milestones: [
      { name: "الأعمال الترابية", date: "2025-04-15", progress: 100, status: "COMPLETED" },
      { name: "القواعد والأساسات", date: "2025-07-30", progress: 100, status: "COMPLETED" },
      { name: "الهيكل الخرساني", date: "2025-12-30", progress: 65, status: "IN_PROGRESS" },
      { name: "الأعمال المعمارية", date: "2026-04-30", progress: 10, status: "PENDING" },
      { name: "التشطيبات النهائية", date: "2026-07-30", progress: 0, status: "PENDING" },
      { name: "التسليم النهائي", date: "2026-08-15", progress: 0, status: "PENDING" },
    ],
  },
  "6": {
    id: "6", name: "طريق الملك فهد", client: "وزارة النقل", city: "تبوك",
    contractValue: 18000000, budget: 16000000, actualCost: 10200000, commitments: 5800000,
    expectedProfit: 1200000, progress: 35, plannedProgress: 55, status: "DELAYED", health: "RED",
    risk: "HIGH", manager: "م. نايف الشمري", startDate: "2024-08-01", endDate: "2027-01-30",
    delayDays: 45, milestones: [
      { name: "الأعمال الترابية", date: "2024-11-30", progress: 100, status: "COMPLETED" },
      { name: "طبقة الأساس", date: "2025-04-30", progress: 100, status: "COMPLETED" },
      { name: "طبقة الأسفلت الأولى", date: "2025-10-30", progress: 60, status: "IN_PROGRESS" },
      { name: "الأعمال الإنشائية", date: "2026-05-30", progress: 15, status: "DELAYED" },
      { name: "طبقة الأسفلت النهائية", date: "2026-10-30", progress: 0, status: "PENDING" },
      { name: "التسليم النهائي", date: "2027-01-30", progress: 0, status: "PENDING" },
    ],
  },
};

const tabs = [
  "نظرة عامة",
  "الجدول",
  "التكلفة",
  "الموقع",
  "المشتريات",
  "المستخلصات",
  "المستندات",
  "الفريق",
  "الإعدادات",
];

const statusLabel: Record<string, string> = {
  ACTIVE: "قيد التنفيذ",
  DELAYED: "متأخر",
  COMPLETED: "مكتمل",
};

function ProgressBar({ progress, planned }: { progress: number; planned: number }) {
  const diff = progress - planned;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[var(--text-primary)]">نسبة الإنجاز</span>
        <span className="font-medium text-[var(--text-primary)]">{progress}%</span>
      </div>
      <div className="h-4 rounded-full bg-gray-200 overflow-hidden relative">
        <div className="h-full bg-[var(--color-success)] rounded-full transition-all" style={{ width: `${progress}%` }} />
        <div
          className="absolute top-0 h-full w-0.5 bg-[var(--text-primary)]"
          style={{ right: `${planned}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-[var(--text-tertiary)]">
        <span>المخطط: {planned}%</span>
        <span className={diff >= 0 ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}>
          {diff >= 0 ? `تقدم +${diff}%` : `تأخر ${Math.abs(diff)}%`}
        </span>
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const params = useParams();
  const project = allProjects[params.projectId as string];

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
          { label: project.name },
        ]}
        className="mb-2"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{project.name}</h1>
          <StatusBadge status={project.status} label={statusLabel[project.status]} />
          <StatusBadge status={project.health} />
          <Badge variant={project.risk === "HIGH" ? "red" : project.risk === "MEDIUM" ? "yellow" : "green"}>
            {project.risk === "HIGH" ? "مخاطرة عالية" : project.risk === "MEDIUM" ? "مخاطرة متوسطة" : "مخاطرة منخفضة"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="h-4 w-4 text-[var(--text-tertiary)]" />
              <span className="text-xs text-[var(--text-secondary)]">العميل</span>
            </div>
            <p className="text-sm font-medium text-[var(--text-primary)]">{project.client}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-4 w-4 text-[var(--text-tertiary)]" />
              <span className="text-xs text-[var(--text-secondary)]">المدينة</span>
            </div>
            <p className="text-sm font-medium text-[var(--text-primary)]">{project.city}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-[var(--text-tertiary)]" />
              <span className="text-xs text-[var(--text-secondary)]">قيمة العقد</span>
            </div>
            <p className="text-sm font-medium text-[var(--text-primary)]">{formatCurrency(project.contractValue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-[var(--text-tertiary)]" />
              <span className="text-xs text-[var(--text-secondary)]">المدة</span>
            </div>
            <p className="text-sm font-medium text-[var(--text-primary)]">{formatDate(project.startDate)} - {formatDate(project.endDate)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <User className="h-4 w-4 text-[var(--text-tertiary)]" />
              <span className="text-xs text-[var(--text-secondary)]">مدير المشروع</span>
            </div>
            <p className="text-sm font-medium text-[var(--text-primary)]">{project.manager}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="h-4 w-4 text-[var(--text-tertiary)]" />
              <span className="text-xs text-[var(--text-secondary)]">الإنجاز</span>
            </div>
            <p className="text-sm font-medium text-[var(--text-primary)]">{project.progress}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard
          title="الميزانية"
          value={formatCurrency(project.budget)}
          icon={<TrendingUp className="h-5 w-5 text-white" />}
          color="info"
        />
        <KPICard
          title="التكلفة الفعلية"
          value={formatCurrency(project.actualCost)}
          icon={<TrendingUp className="h-5 w-5 text-white" />}
          color="warning"
        />
        <KPICard
          title="الالتزامات"
          value={formatCurrency(project.commitments)}
          icon={<Clock className="h-5 w-5 text-white" />}
          color="danger"
        />
        <KPICard
          title="الربح المتوقع"
          value={formatCurrency(project.expectedProfit)}
          icon={<CheckCircle2 className="h-5 w-5 text-white" />}
          color="success"
        />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>تقدم المشروع</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressBar progress={project.progress} planned={project.plannedProgress} />
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>المراحل</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-primary)] text-right">
                <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">المرحلة</th>
                <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">تاريخ الاستحقاق</th>
                <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">نسبة الإنجاز</th>
                <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {project.milestones.map((m: any, i: number) => (
                <tr key={i} className="border-b border-[var(--border-primary)] last:border-0">
                  <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{m.name}</td>
                  <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{formatDate(m.date)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${m.progress === 100 ? "bg-[var(--color-success)]" : m.status === "DELAYED" ? "bg-[var(--color-danger)]" : "bg-[var(--color-warning)]"}`}
                          style={{ width: `${m.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-[var(--text-secondary)] w-10 text-left">{m.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={m.status} label={m.status === "COMPLETED" ? "مكتمل" : m.status === "IN_PROGRESS" ? "قيد التنفيذ" : m.status === "DELAYED" ? "متأخر" : "معلق"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="border-b border-[var(--border-primary)] mb-6">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                i === 0
                  ? "border-[var(--color-primary-700)] text-[var(--color-primary-700)]"
                  : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center py-16 text-center">
        <div>
          <Clock className="h-12 w-12 mx-auto mb-3 text-[var(--text-tertiary)]" />
          <p className="text-sm text-[var(--text-tertiary)]">قريبًا</p>
        </div>
      </div>
    </div>
  );
}
