"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Input } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency } from "@/lib/formatters";
import { Search, PlusCircle, FolderOpen } from "lucide-react";

const projects = [
  { id: "1", name: "مجمع الروضة السكني", client: "شركة الروضة العقارية", city: "الرياض", value: 12500000, progress: 65, status: "ACTIVE", health: "GREEN", risk: "LOW", manager: "م. أحمد السعيد", endDate: "2026-06-15" },
  { id: "2", name: "برج الأعمال التجاري", client: "مجموعة الأعمال", city: "جدة", value: 8750000, progress: 42, status: "ACTIVE", health: "YELLOW", risk: "MEDIUM", manager: "م. خالد العمري", endDate: "2026-09-30" },
  { id: "3", name: "مستشفى المدينة المنورة", client: "وزارة الصحة", city: "المدينة المنورة", value: 15000000, progress: 28, status: "ACTIVE", health: "GREEN", risk: "LOW", manager: "م. فهد القحطاني", endDate: "2027-03-20" },
  { id: "4", name: "فلل الواحة السكنية", client: "شركة الواحة للتطوير", city: "الخبر", value: 3500000, progress: 80, status: "ACTIVE", health: "GREEN", risk: "LOW", manager: "م. محمد الحربي", endDate: "2025-12-30" },
  { id: "5", name: "مبنى الإدارة الحكومي", client: "أمانة المنطقة", city: "الرياض", value: 5000000, progress: 55, status: "ACTIVE", health: "GREEN", risk: "LOW", manager: "م. سعود الدوسري", endDate: "2026-08-15" },
  { id: "6", name: "طريق الملك فهد", client: "وزارة النقل", city: "تبوك", value: 18000000, progress: 35, status: "DELAYED", health: "RED", risk: "HIGH", manager: "م. نايف الشمري", endDate: "2027-01-30" },
  { id: "7", name: "محطة تحلية المياه", client: "المؤسسة العامة لتحلية المياه", city: "الجبيل", value: 22000000, progress: 15, status: "ACTIVE", health: "YELLOW", risk: "MEDIUM", manager: "م. عبدالله الزهراني", endDate: "2027-06-30" },
  { id: "8", name: "مجمع مدارس النمو", client: "شركة النمو التعليمية", city: "الرياض", value: 4500000, progress: 90, status: "ACTIVE", health: "GREEN", risk: "LOW", manager: "م. تركي المطيري", endDate: "2025-10-15" },
];

const statusFilters = [
  { label: "الكل", value: "ALL" },
  { label: "قيد التنفيذ", value: "ACTIVE" },
  { label: "متأخر", value: "DELAYED" },
  { label: "مكتمل", value: "COMPLETED" },
];

const healthColors: Record<string, string> = {
  GREEN: "bg-[var(--color-success)]",
  YELLOW: "bg-[var(--color-warning)]",
  RED: "bg-[var(--color-danger)]",
};

const riskBadge: Record<string, string> = {
  LOW: "green",
  MEDIUM: "yellow",
  HIGH: "red",
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
};

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = p.name.includes(search) || p.client.includes(search) || p.city.includes(search);
      const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div dir="rtl">
      <Breadcrumbs items={[{ label: "المشاريع" }]} className="mb-2" />
      <PageHeader title="المشاريع" description="جميع مشاريع الشركة وعقودها">
        <Button leftIcon={<PlusCircle className="h-4 w-4" />}>إضافة مشروع</Button>
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
                        {p.name}
                      </Link>
                      <div className="text-xs text-[var(--text-tertiary)]">{p.manager}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{p.client}</td>
                    <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{p.city}</td>
                    <td className="px-4 py-3 text-sm text-[var(--text-primary)] font-medium">{formatCurrency(p.value)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${healthColors[p.health]}`}
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-[var(--text-secondary)] w-10 text-left">{p.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={p.status} label={statusLabel[p.status]} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={p.health} />
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={riskBadge[p.risk] as any}>{riskLabel[p.risk]}</Badge>
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
                  <span className="font-medium text-[var(--text-primary)]">{p.name}</span>
                  <StatusBadge status={p.status} label={statusLabel[p.status]} />
                </div>
                <div className="space-y-1 text-sm text-[var(--text-secondary)]">
                  <div className="flex justify-between">
                    <span>{p.client}</span>
                    <span className="font-medium text-[var(--text-primary)]">{formatCurrency(p.value)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{p.city}</span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
                      {p.manager}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${healthColors[p.health]}`}
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-[var(--text-secondary)]">{p.progress}%</span>
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
