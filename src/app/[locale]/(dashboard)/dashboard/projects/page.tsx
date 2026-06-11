"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, Button, Badge, Input, SkeletonCard } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { StatusBadge } from "@/components/shared/status-badge";
import type { ProjectSummary } from "@/domain/projects";
import { DemoProjectService } from "@/services";
import { useLocale } from "next-intl";
import { formatCurrency } from "@/lib/formatters";
import { Search, PlusCircle, FolderOpen } from "lucide-react";

const projectService = new DemoProjectService();

const statusFilters = [
  { label: "الكل", value: "ALL" },
  { label: "قيد التنفيذ", value: "ACTIVE" },
  { label: "متأخر", value: "DELAYED" },
  { label: "مكتمل", value: "COMPLETED" },
  { label: "تخطيط", value: "PLANNING" },
  { label: "معلق", value: "ON_HOLD" },
];

const healthColors: Record<string, string> = {
  GREEN: "bg-[var(--color-success)]",
  YELLOW: "bg-[var(--color-warning)]",
  RED: "bg-[var(--color-danger)]",
};

const riskBadge: Record<string, "green" | "yellow" | "red"> = {
  LOW: "green",
  MEDIUM: "yellow",
  HIGH: "red",
  CRITICAL: "red",
};

const riskLabel: Record<string, string> = {
  LOW: "منخفضة",
  MEDIUM: "متوسطة",
  HIGH: "عالية",
};

const statusLabel: Record<string, string> = {
  ACTIVE: "قيد التنفيذ",
  DELAYED: "متأخر",
  COMPLETED: "مكتمل",
  PLANNING: "تخطيط",
  ON_HOLD: "معلق",
};

export default function ProjectsPage() {
  const locale = useLocale();
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    async function load() {
      try {
        const data = await projectService.listProjects();
        setProjects(data);
      } catch {
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        !search ||
        p.nameAr.includes(search) ||
        p.clientName.includes(search) ||
        p.city.includes(search) ||
        p.code.includes(search);
      const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  if (loading) {
    return (
      <div dir="rtl">
        <Breadcrumbs items={[{ label: "المشاريع" }]} className="mb-2" />
        <div className="mb-6">
          <SkeletonCard />
        </div>
        <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse" />)}</div>
      </div>
    );
  }

  return (
    <div dir="rtl">
      <Breadcrumbs items={[{ label: "المشاريع" }]} className="mb-2" />
      <PageHeader title="المشاريع" description="جميع مشاريع الشركة وعقودها">
        <Link href="/dashboard/projects/new">
          <Button leftIcon={<PlusCircle className="h-4 w-4" />}>إضافة مشروع</Button>
        </Link>
      </PageHeader>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
          <Input
            placeholder="ابحث عن مشروع..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-9"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {statusFilters.map((f) => (
            <Button
              key={f.value}
              variant={statusFilter === f.value ? "primary" : "secondary"}
              size="sm"
              onClick={() => setStatusFilter(f.value)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="hidden lg:block">
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-primary)] text-right">
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">المشروع</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">العميل</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">المدينة</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">قيمة العقد</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">نسبة الإنجاز</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">الحالة</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">الصحة</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">المخاطرة</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-[var(--border-primary)] last:border-0 hover:bg-[var(--bg-secondary)] transition-colors">
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/projects/${p.id}`}
                        className="text-sm font-medium text-[var(--color-primary-700)] hover:underline"
                      >
                        {p.nameAr}
                      </Link>
                      <div className="text-xs text-[var(--text-tertiary)]">{p.managerName}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{p.clientName}</td>
                    <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{p.city}</td>
                    <td className="px-4 py-3 text-sm text-[var(--text-primary)] font-medium">
                      {formatCurrency(p.contractValue, "SAR", locale)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${healthColors[p.health]}`}
                            style={{ width: `${p.actualProgress}%` }}
                          />
                        </div>
                        <span className="text-xs text-[var(--text-secondary)] w-10 text-left">{p.actualProgress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={p.status} label={statusLabel[p.status]} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={p.health} />
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={riskBadge[p.riskLevel]}>{riskLabel[p.riskLevel]}</Badge>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-sm text-[var(--text-tertiary)]">
                      لا توجد مشاريع مطابقة للبحث
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <div className="lg:hidden space-y-3">
        {filtered.map((p) => (
          <Link key={p.id} href={`/dashboard/projects/${p.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[var(--text-primary)]">{p.nameAr}</span>
                  <StatusBadge status={p.status} label={statusLabel[p.status]} />
                </div>
                <div className="space-y-1 text-sm text-[var(--text-secondary)]">
                  <div className="flex justify-between">
                    <span>{p.clientName}</span>
                    <span className="font-medium text-[var(--text-primary)]">
                      {formatCurrency(p.contractValue, "SAR", locale)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{p.city}</span>
                    <span className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${healthColors[p.health]}`} />
                      {p.managerName}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${healthColors[p.health]}`}
                        style={{ width: `${p.actualProgress}%` }}
                      />
                    </div>
                    <span className="text-xs text-[var(--text-secondary)]">{p.actualProgress}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {filtered.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <FolderOpen className="h-10 w-10 mx-auto mb-2 text-[var(--text-tertiary)]" />
              <p className="text-sm text-[var(--text-tertiary)]">لا توجد مشاريع مطابقة للبحث</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
