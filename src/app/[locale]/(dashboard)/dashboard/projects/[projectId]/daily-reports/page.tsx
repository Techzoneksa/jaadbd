"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Card, CardContent, Button, Input, Select, Skeleton } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { formatDate, formatRelativeTime } from "@/lib/formatters";
import { DEMO_DAILY_REPORTS } from "@/demo/data";
import type { DailyReportData } from "@/domain/site-reports";
import { Plus, Search, X, FileText, AlertTriangle } from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
  DRAFT: "مسودة",
  SUBMITTED: "مقدمة",
  UNDER_REVIEW: "قيد المراجعة",
  APPROVED: "معتمدة",
  RETURNED: "معادة",
};

export default function DailyReportsListPage() {
  const locale = useLocale();
  const params = useParams();
  const projectId = params.projectId as string;

  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<DailyReportData[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const filtered = DEMO_DAILY_REPORTS.filter((r) => r.projectId === projectId);
      setReports(filtered);
    } catch {
      setError("حدث خطأ أثناء تحميل التقارير");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      if (filterStatus !== "ALL" && r.status !== filterStatus) return false;
      if (searchText) {
        const q = searchText.toLowerCase();
        if (!r.reportNumber.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [reports, filterStatus, searchText]);

  if (error) {
    return (
      <div dir="rtl">
        <Breadcrumbs items={[{ label: "المشاريع", href: "/dashboard/projects" }, { label: "التقارير اليومية" }]} className="mb-2" />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-[var(--color-warning)]" />
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">خطأ في تحميل التقارير</h2>
            <p className="text-sm text-[var(--text-secondary)]">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl">
      <Breadcrumbs
        items={[
          { label: "المشاريع", href: "/dashboard/projects" },
          { label: "التقارير اليومية", href: `/dashboard/projects/${projectId}/daily-reports` },
        ]}
        className="mb-2"
      />

      <PageHeader title="التقارير اليومية" description="سجل التقارير اليومية للموقع">
        <Link href={`/dashboard/projects/${projectId}/daily-reports/new`}>
          <Button size="sm">
            <Plus className="h-4 w-4 ml-1" />
            تقرير جديد
          </Button>
        </Link>
      </PageHeader>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
          <Input
            placeholder="بحث برقم التقرير..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pr-9"
          />
        </div>
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          options={[
            { value: "ALL", label: "جميع الحالات" },
            { value: "DRAFT", label: "مسودة" },
            { value: "SUBMITTED", label: "مقدمة" },
            { value: "UNDER_REVIEW", label: "قيد المراجعة" },
            { value: "APPROVED", label: "معتمدة" },
            { value: "RETURNED", label: "معادة" },
          ]}
        />
        {(searchText || filterStatus !== "ALL") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchText("");
              setFilterStatus("ALL");
            }}
          >
            <X className="h-4 w-4 ml-1" />
            إلغاء التصفية
          </Button>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center">
            <FileText className="h-12 w-12 mx-auto mb-3 text-[var(--text-tertiary)]" />
            <p className="text-sm text-[var(--text-tertiary)]">لا توجد تقارير مطابقة</p>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-primary)] text-right">
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">رقم التقرير</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">التاريخ</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">أعد بواسطة</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">الحالة</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">الطقس</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">درجة الحرارة</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">آخر تحديث</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-[var(--border-primary)] last:border-0 hover:bg-[var(--bg-accent)]/50 transition-colors cursor-pointer"
                    onClick={() => window.location.href = `/dashboard/projects/${projectId}/daily-reports/${r.id}`}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-[var(--color-primary-700)] whitespace-nowrap">
                      {r.reportNumber}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--text-primary)] whitespace-nowrap">
                      {formatDate(r.date)}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--text-primary)] whitespace-nowrap">
                      {r.preparedByName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={r.status} label={STATUS_LABELS[r.status]} />
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--text-primary)] whitespace-nowrap">
                      {r.weather}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--text-primary)] whitespace-nowrap">
                      {r.temperature}°C
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--text-tertiary)] whitespace-nowrap">
                      {formatRelativeTime(r.updatedAt, locale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
