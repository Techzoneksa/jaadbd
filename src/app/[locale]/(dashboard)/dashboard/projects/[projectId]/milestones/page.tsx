"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, Button, Skeleton } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { formatDate } from "@/lib/formatters";
import { DEMO_MILESTONES } from "@/demo/data";
import type { Milestone } from "@/demo/data";
import { List, CalendarDays, AlertTriangle } from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
  NOT_STARTED: "لم تبدأ",
  IN_PROGRESS: "قيد التنفيذ",
  COMPLETED: "مكتملة",
  DELAYED: "متأخرة",
  AT_RISK: "في خطر",
};

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
      <div
        className="h-full rounded-full bg-[var(--color-primary-700)] transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function TimelineView({ milestones }: { milestones: Milestone[] }) {
  if (milestones.length === 0) return null;

  return (
    <div className="overflow-x-auto pb-4">
      <div className="relative flex items-start gap-0 min-w-[700px]">
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-[var(--border-primary)]" />
        {milestones.map((m, idx) => {
          const statusColors: Record<string, string> = {
            NOT_STARTED: "bg-gray-400",
            IN_PROGRESS: "bg-blue-500",
            COMPLETED: "bg-green-500",
            DELAYED: "bg-red-500",
            AT_RISK: "bg-orange-500",
          };
          const dotColor = statusColors[m.status] || "bg-gray-400";

          return (
            <div key={m.id} className="flex-1 min-w-[140px] relative px-2">
              <div className="flex flex-col items-center pt-10">
                <div className={`w-4 h-4 rounded-full ${dotColor} relative z-10 ring-2 ring-white`} />
                <Card className="mt-4 w-full border border-[var(--border-primary)]">
                  <CardContent className="p-3 space-y-2">
                    <h4 className="text-sm font-medium text-[var(--text-primary)] leading-tight line-clamp-2">
                      {m.name}
                    </h4>
                    <StatusBadge status={m.status} label={STATUS_LABELS[m.status]} />
                    <ProgressBar value={m.progress} />
                    <div className="text-xs text-[var(--text-tertiary)]">
                      <p>{formatDate(m.startDate)}</p>
                      <p>{formatDate(m.endDate)}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {idx < milestones.length - 1 && (
                <div className={`absolute top-[26px] right-2 h-0.5 ${dotColor} opacity-30`} style={{ left: "50%", right: "-50%" }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MilestonesPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const [loading, setLoading] = useState(true);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "timeline">("table");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const filtered = DEMO_MILESTONES
        .filter((m) => m.projectId === projectId)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      setMilestones(filtered);
    } catch {
      setError("حدث خطأ أثناء تحميل المراحل");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  if (error) {
    return (
      <div dir="rtl">
        <Breadcrumbs items={[{ label: "المشاريع", href: "/dashboard/projects" }, { label: "المراحل" }]} className="mb-2" />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-[var(--color-warning)]" />
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">خطأ في تحميل المراحل</h2>
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
          { label: "المراحل", href: `/dashboard/projects/${projectId}/milestones` },
        ]}
        className="mb-2"
      />

      <PageHeader title="مراحل المشروع" description="المراحل الزمنية للمشروع وتقدمها">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "table" ? "primary" : "outline"}
            size="sm"
            onClick={() => setViewMode("table")}
          >
            <List className="h-4 w-4 ml-1" />
            جدول
          </Button>
          <Button
            variant={viewMode === "timeline" ? "primary" : "outline"}
            size="sm"
            onClick={() => setViewMode("timeline")}
          >
            <CalendarDays className="h-4 w-4 ml-1" />
            خط زمني
          </Button>
        </div>
      </PageHeader>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : milestones.length === 0 ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center">
            <List className="h-12 w-12 mx-auto mb-3 text-[var(--text-tertiary)]" />
            <p className="text-sm text-[var(--text-tertiary)]">لا توجد مراحل لهذا المشروع</p>
          </div>
        </div>
      ) : viewMode === "timeline" ? (
        <TimelineView milestones={milestones} />
      ) : (
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-primary)] text-right">
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">المرحلة</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">تاريخ البداية</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">تاريخ النهاية</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">التقدم</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">الحالة</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">المسؤول</th>
                </tr>
              </thead>
              <tbody>
                {milestones.map((m) => (
                  <tr key={m.id} className="border-b border-[var(--border-primary)] last:border-0 hover:bg-[var(--bg-accent)]/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-[var(--text-primary)] whitespace-nowrap">{m.name}</td>
                    <td className="px-4 py-3 text-sm text-[var(--text-primary)] whitespace-nowrap">{formatDate(m.startDate)}</td>
                    <td className="px-4 py-3 text-sm text-[var(--text-primary)] whitespace-nowrap">{formatDate(m.endDate)}</td>
                    <td className="px-4 py-3 min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <ProgressBar value={m.progress} />
                        </div>
                        <span className="text-xs text-[var(--text-secondary)] w-8 text-left">{m.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={m.status} label={STATUS_LABELS[m.status]} />
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--text-secondary)] whitespace-nowrap">-</td>
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
