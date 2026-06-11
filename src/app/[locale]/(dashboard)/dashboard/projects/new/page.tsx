"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { DemoProjectService } from "@/services";
import { DEMO_USERS } from "@/demo/data";
import { ArrowRight, Save } from "lucide-react";

const projectService = new DemoProjectService();

const projectTypes = [
  { value: "سكني", label: "سكني" },
  { value: "تجاري إداري", label: "تجاري إداري" },
  { value: "طرق وجسور", label: "طرق وجسور" },
  { value: "صحي", label: "صحي" },
  { value: "صناعي", label: "صناعي" },
  { value: "تعليمي", label: "تعليمي" },
  { value: "طبي", label: "طبي" },
  { value: "ترفيهي", label: "ترفيهي" },
];

const managerCandidates = DEMO_USERS.filter(
  (u) => u.role === "PROJECT_MANAGER" || u.role === "SITE_ENGINEER"
).map((u) => ({ value: u.nameAr, label: u.nameAr }));

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    nameAr: "",
    nameEn: "",
    clientName: "",
    city: "",
    contractValue: "",
    startDate: "",
    endDate: "",
    managerName: "",
    scopeOfWork: "",
    projectType: "",
  });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const project = await projectService.createProject({
        nameAr: form.nameAr,
        nameEn: form.nameEn || undefined,
        clientName: form.clientName,
        city: form.city,
        contractValue: parseFloat(form.contractValue) || 0,
        startDate: form.startDate,
        endDate: form.endDate,
        managerName: form.managerName,
        scopeOfWork: form.scopeOfWork || undefined,
        projectType: form.projectType,
      });
      router.push(`/dashboard/projects/${project.id}`);
    } catch {
      setSaving(false);
    }
  }

  return (
    <div dir="rtl">
      <Breadcrumbs
        items={[
          { label: "المشاريع", href: "/dashboard/projects" },
          { label: "إضافة مشروع" },
        ]}
        className="mb-2"
      />
      <PageHeader title="إضافة مشروع جديد" description="إدخال بيانات المشروع الجديد" />

      <Card>
        <CardHeader>
          <CardTitle>بيانات المشروع</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="اسم المشروع (عربي)"
                placeholder="أدخل اسم المشروع بالعربية"
                value={form.nameAr}
                onChange={(e) => update("nameAr", e.target.value)}
                required
              />
              <Input
                label="اسم المشروع (إنجليزي)"
                placeholder="Project name in English"
                value={form.nameEn}
                onChange={(e) => update("nameEn", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="اسم العميل"
                placeholder="أدخل اسم العميل"
                value={form.clientName}
                onChange={(e) => update("clientName", e.target.value)}
                required
              />
              <Input
                label="المدينة"
                placeholder="أدخل المدينة"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="قيمة العقد"
                type="number"
                placeholder="0"
                value={form.contractValue}
                onChange={(e) => update("contractValue", e.target.value)}
                required
              />
              <Select
                label="نوع المشروع"
                placeholder="اختر نوع المشروع"
                options={projectTypes}
                value={form.projectType}
                onChange={(e) => update("projectType", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="تاريخ البداية"
                type="date"
                value={form.startDate}
                onChange={(e) => update("startDate", e.target.value)}
                required
              />
              <Input
                label="تاريخ النهاية"
                type="date"
                value={form.endDate}
                onChange={(e) => update("endDate", e.target.value)}
                required
              />
            </div>

            <Select
              label="مدير المشروع"
              placeholder="اختر مدير المشروع"
              options={managerCandidates}
              value={form.managerName}
              onChange={(e) => update("managerName", e.target.value)}
              required
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--text-primary)]">
                نطاق العمل
              </label>
              <textarea
                className="h-24 w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)] transition-colors placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-accent-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-500)]/20"
                placeholder="أدخل نطاق العمل"
                value={form.scopeOfWork}
                onChange={(e) => update("scopeOfWork", e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" isLoading={saving} leftIcon={<Save className="h-4 w-4" />}>
                حفظ المشروع
              </Button>
              <Link href="/dashboard/projects">
                <Button type="button" variant="secondary" leftIcon={<ArrowRight className="h-4 w-4" />}>
                  إلغاء
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
