"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Input, Button, Skeleton } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { DEMO_RISKS } from "@/demo/data";
import type { RiskData } from "@/domain/risks";
import { useLocale } from "next-intl";
import { Search, PlusCircle, AlertTriangle } from "lucide-react";

const categoryLabels: Record<string, string> = {
  SCHEDULE: "الجدول الزمني",
  COST: "التكاليف",
  QUALITY: "الجودة",
  SAFETY: "السلامة",
  PROCUREMENT: "المشتريات",
  CLIENT: "العميل",
  CONSULTANT: "الاستشاري",
  SUBCONTRACTOR: "مقاول باطن",
  WORKFORCE: "العمالة",
  EQUIPMENT: "المعدات",
  EXTERNAL: "خارجي",
};

const statusLabels: Record<string, string> = {
  OPEN: "مفتوحة",
  MONITORING: "مراقبة",
  MITIGATING: "معالجة",
  ESCALATED: "مرفوعة",
  CLOSED: "مغلقة",
};

const levelLabels: Record<string, string> = {
  LOW: "منخفضة",
  MEDIUM: "متوسطة",
  HIGH: "عالية",
  CRITICAL: "حرجة",
};

const levelColors: Record<string, string> = {
  LOW: "bg-green-100 text-green-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  HIGH: "bg-orange-100 text-orange-800",
  CRITICAL: "bg-red-100 text-red-800",
};

const scoreColors: Record<string, string> = {
  green: "bg-green-100 text-green-800",
  yellow: "bg-yellow-100 text-yellow-800",
  orange: "bg-orange-100 text-orange-800",
  red: "bg-red-100 text-red-800",
};

function getScoreColor(score: number): string {
  if (score <= 4) return "green";
  if (score <= 9) return "yellow";
  if (score <= 16) return "orange";
  return "red";
}

const probabilityLabels = ["", "نادر (1)", "ممكن (2)", "محتمل (3)", "مرجح (4)", "شبه مؤكد (5)"];
const impactLabels = ["", "طفيف (1)", "بسيط (2)", "متوسط (3)", "كبير (4)", "كارثي (5)"];

function RiskMatrix({ risks }: { risks: RiskData[] }) {
  const cells: { prob: number; imp: number; count: number }[] = [];
  for (let p = 1; p <= 5; p++) {
    for (let i = 1; i <= 5; i++) {
      const count = risks.filter((r) => r.probability === p && r.impact === i).length;
      cells.push({ prob: p, imp: i, count });
    }
  }

  const cellBg = (prob: number, imp: number) => {
    const s = prob * imp;
    if (s <= 4) return "bg-green-100";
    if (s <= 9) return "bg-yellow-100";
    if (s <= 16) return "bg-orange-100";
    return "bg-red-100";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>مصفوفة المخاطر</CardTitle>
        <CardDescription>توزيع المخاطر حسب الاحتمالية والتأثير</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-[320px]">
            <div className="grid grid-cols-6 gap-1 text-center">
              <div className="text-xs text-[var(--text-secondary)] self-end pb-2"></div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="text-xs text-[var(--text-secondary)] pb-2 font-medium">
                  {i}
                </div>
              ))}
              <div className="col-span-6 flex items-center justify-center text-xs text-[var(--text-tertiary)] mb-1">
                التأثير ←
              </div>
              {[5, 4, 3, 2, 1].map((p) => (
                <div key={p} className="flex flex-col items-center">
                  <div className="text-xs text-[var(--text-secondary)] font-medium whitespace-nowrap">
                    {p}
                  </div>
                  {[1, 2, 3, 4, 5].map((i) => {
                    const cell = cells.find((c) => c.prob === p && c.imp === i);
                    return (
                      <div
                        key={`${p}-${i}`}
                        className={`w-full aspect-square flex items-center justify-center rounded text-xs font-bold ${cellBg(p, i)} ${cell?.count ? "text-[var(--text-primary)]" : "text-transparent"}`}
                      >
                        {cell && cell.count > 0 ? cell.count : "·"}
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className="col-span-6 flex items-center justify-center text-xs text-[var(--text-tertiary)] mt-1">
                الاحتمالية ↑
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const statusFilterOptions = [
  { label: "الكل", value: "ALL" },
  { label: "مفتوحة", value: "OPEN" },
  { label: "مراقبة", value: "MONITORING" },
  { label: "معالجة", value: "MITIGATING" },
  { label: "مغلقة", value: "CLOSED" },
];

const categoryFilterOptions = [
  { label: "الكل", value: "ALL" },
  { label: "الجدول الزمني", value: "SCHEDULE" },
  { label: "التكاليف", value: "COST" },
  { label: "الجودة", value: "QUALITY" },
  { label: "السلامة", value: "SAFETY" },
  { label: "المشتريات", value: "PROCUREMENT" },
  { label: "العميل", value: "CLIENT" },
  { label: "العمالة", value: "WORKFORCE" },
  { label: "المعدات", value: "EQUIPMENT" },
  { label: "خارجي", value: "EXTERNAL" },
];

export default function RisksPage() {
  const locale = useLocale();
  const params = useParams();
  const projectId = params.projectId as string;
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [levelFilter, setLevelFilter] = useState("ALL");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const risks = useMemo(() => {
    return DEMO_RISKS.filter((r) => r.projectId === projectId);
  }, [projectId]);

  const filtered = useMemo(() => {
    return risks.filter((r) => {
      if (search && !r.title.includes(search) && !r.code.includes(search)) return false;
      if (statusFilter !== "ALL" && r.status !== statusFilter) return false;
      if (categoryFilter !== "ALL" && r.category !== categoryFilter) return false;
      if (levelFilter !== "ALL" && r.level !== levelFilter) return false;
      return true;
    });
  }, [risks, search, statusFilter, categoryFilter, levelFilter]);

  if (loading) {
    return (
      <div dir="rtl">
        <Breadcrumbs items={[{ label: "المشروع", href: `/dashboard/projects/${projectId}` }, { label: "المخاطر" }]} className="mb-2" />
        <PageHeader title="سجل المخاطر" />
        <div className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl">
      <Breadcrumbs
        items={[
          { label: "المشروع", href: `/dashboard/projects/${projectId}` },
          { label: "المخاطر" },
        ]}
        className="mb-2"
      />
      <PageHeader title="سجل المخاطر" description="إدارة وتقييم مخاطر المشروع">
        <Button
          leftIcon={<PlusCircle className="h-4 w-4" />}
          onClick={() => alert("قريباً — إضافة مخاطرة جديدة")}
        >
          إضافة مخاطرة
        </Button>
      </PageHeader>

      <div className="mb-6">
        <RiskMatrix risks={risks} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
          <Input
            placeholder="ابحث عن مخاطرة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-9"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] text-sm text-[var(--text-primary)]"
        >
          {statusFilterOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] text-sm text-[var(--text-primary)]"
        >
          {categoryFilterOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] text-sm text-[var(--text-primary)]"
        >
          <option value="ALL">جميع المستويات</option>
          <option value="LOW">منخفضة</option>
          <option value="MEDIUM">متوسطة</option>
          <option value="HIGH">عالية</option>
          <option value="CRITICAL">حرجة</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<AlertTriangle className="h-12 w-12" />}
          title={search || statusFilter !== "ALL" || categoryFilter !== "ALL" || levelFilter !== "ALL" ? "لا توجد مخاطر مطابقة" : "لا توجد مخاطر مسجلة"}
          description={search || statusFilter !== "ALL" || categoryFilter !== "ALL" || levelFilter !== "ALL" ? "حاول تغيير معايير التصفية" : "لم يتم تسجيل أي مخاطر لهذا المشروع بعد"}
          action={{ label: "إضافة مخاطرة", onClick: () => alert("قريباً — إضافة مخاطرة جديدة") }}
        />
      ) : (
        <div className="hidden lg:block">
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-primary)] text-right">
                    <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">الكود</th>
                    <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">المخاطرة</th>
                    <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">التصنيف</th>
                    <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">الاحتمالية</th>
                    <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">التأثير</th>
                    <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">الدرجة</th>
                    <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">المستوى</th>
                    <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">الحالة</th>
                    <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">المسؤول</th>
                    <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">خطة المعالجة</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-b border-[var(--border-primary)] last:border-0 hover:bg-[var(--bg-secondary)] transition-colors">
                      <td className="px-4 py-3 text-sm font-mono text-[var(--text-tertiary)]">{r.code}</td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-[var(--text-primary)]">{r.title}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{categoryLabels[r.category] || r.category}</td>
                      <td className="px-4 py-3 text-sm text-center text-[var(--text-primary)]">{r.probability}</td>
                      <td className="px-4 py-3 text-sm text-center text-[var(--text-primary)]">{r.impact}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold ${scoreColors[getScoreColor(r.score)]}`}>
                          {r.score}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${levelColors[r.level]}`}>
                          {levelLabels[r.level]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={r.status} label={statusLabels[r.status]} />
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{r.owner}</td>
                      <td className="px-4 py-3 text-sm text-[var(--text-secondary)] max-w-[200px] truncate">{r.responsePlan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="lg:hidden space-y-3">
        {filtered.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-[var(--text-tertiary)]">{r.code}</span>
                <StatusBadge status={r.status} label={statusLabels[r.status]} />
              </div>
              <h4 className="font-medium text-[var(--text-primary)] text-sm mb-2">{r.title}</h4>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${scoreColors[getScoreColor(r.score)]}`}>
                  {r.score}
                </span>
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${levelColors[r.level]}`}>
                  {levelLabels[r.level]}
                </span>
                <span className="text-xs text-[var(--text-secondary)] px-2 py-0.5 bg-[var(--bg-secondary)] rounded">
                  {categoryLabels[r.category] || r.category}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                <span>احتمال: {r.probability} | تأثير: {r.impact}</span>
                <span>{r.owner}</span>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <EmptyState
            icon={<AlertTriangle className="h-12 w-12" />}
            title="لا توجد مخاطر"
            description="حاول تغيير معايير التصفية"
          />
        )}
      </div>
    </div>
  );
}
