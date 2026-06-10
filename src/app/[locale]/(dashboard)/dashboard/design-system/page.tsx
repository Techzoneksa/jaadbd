"use client";

import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, Select, Skeleton, SkeletonCard, SkeletonTable } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Mail, Search, User, Loader2, FolderOpen, AlertTriangle } from "lucide-react";

const colorTokens = [
  { name: "Primary 700", var: "--color-primary-700", class: "bg-[var(--color-primary-700)]" },
  { name: "Primary 500", var: "--color-primary-500", class: "bg-[var(--color-primary-500)]" },
  { name: "Success", var: "--color-success", class: "bg-[var(--color-success)]" },
  { name: "Warning", var: "--color-warning", class: "bg-[var(--color-warning)]" },
  { name: "Danger", var: "--color-danger", class: "bg-[var(--color-danger)]" },
  { name: "Info", var: "--color-info", class: "bg-[var(--color-info)]" },
  { name: "Accent 500", var: "--color-accent-500", class: "bg-[var(--color-accent-500)]" },
  { name: "Bg Primary", var: "--bg-primary", class: "bg-[var(--bg-primary)] border" },
  { name: "Bg Secondary", var: "--bg-secondary", class: "bg-[var(--bg-secondary)]" },
  { name: "Text Primary", var: "--text-primary", class: "bg-[var(--text-primary)]" },
  { name: "Text Secondary", var: "--text-secondary", class: "bg-[var(--text-secondary)]" },
  { name: "Border Primary", var: "--border-primary", class: "bg-[var(--border-primary)]" },
];

export default function DesignSystemPage() {
  return (
    <div dir="rtl" className="space-y-10">
      <Breadcrumbs items={[{ label: "دليل التصميم" }]} className="mb-2" />
      <PageHeader title="دليل التصميم" description="جميع المكونات المستخدمة في النظام" />

      <section>
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">الألوان</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {colorTokens.map((c) => (
            <Card key={c.name}>
              <CardContent className="p-3">
                <div className={`h-12 rounded-lg mb-2 ${c.class}`} />
                <p className="text-xs font-medium text-[var(--text-primary)]">{c.name}</p>
                <p className="text-[10px] text-[var(--text-tertiary)]">{c.var}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">الطباعة</h2>
        <Card>
          <CardContent className="space-y-3 p-6">
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">عنوان رئيسي H1</h1>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">عنوان فرعي H2</h2>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">عنوان بطاقة H3</h3>
            <p className="text-base text-[var(--text-primary)]">نص عادي — يستخدم في المحتوى العام</p>
            <p className="text-sm text-[var(--text-primary)]">نص مساعد — يستخدم في الحقول والجداول</p>
            <p className="text-xs text-[var(--text-secondary)]">نص ثانوي — للتسميات والتوضيحات</p>
            <p className="text-xs text-[var(--text-tertiary)]">نص مساعد — للملاحظات الصغيرة</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">الأزرار</h2>
        <Card>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-3">
              <p className="text-sm font-medium text-[var(--text-primary)]">الأحجام</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Button size="sm">صغير</Button>
                <Button size="md">متوسط</Button>
                <Button size="lg">كبير</Button>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-[var(--text-primary)]">الأنواع</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Button variant="primary">أساسي</Button>
                <Button variant="secondary">ثانوي</Button>
                <Button variant="outline">مخطط</Button>
                <Button variant="ghost">شفاف</Button>
                <Button variant="danger">خطر</Button>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-[var(--text-primary)]">الحالات</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Button leftIcon={<Mail className="h-4 w-4" />}>مع أيقونة</Button>
                <Button rightIcon={<Search className="h-4 w-4" />}>أيقونة يسار</Button>
                <Button isLoading>جار التحميل</Button>
                <Button disabled>معطل</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">البطاقات</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>بطاقة عادية</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--text-secondary)]">محتوى البطاقة العادية مع عنوان ووصف</p>
            </CardContent>
          </Card>
          <Card className="border-[var(--color-primary-700)]/30">
            <CardHeader>
              <CardTitle>بطاقة مميزة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--text-secondary)]">بطاقة مع حدود ملونة للتمييز</p>
            </CardContent>
          </Card>
          <Card className="bg-[var(--bg-secondary)]">
            <CardHeader>
              <CardTitle>بطاقة خلفية</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--text-secondary)]">بطاقة بلون خلفية ثانوي</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">الشارات (Badges)</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="green">نشط</Badge>
          <Badge variant="yellow">قيد الانتظار</Badge>
          <Badge variant="red">موقوف</Badge>
          <Badge variant="blue">قيد التنفيذ</Badge>
          <Badge variant="gray">مسودة</Badge>
          <Badge variant="orange">متأخر</Badge>
        </div>
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <StatusBadge status="ACTIVE" label="قيد التنفيذ" />
          <StatusBadge status="COMPLETED" label="مكتمل" />
          <StatusBadge status="DELAYED" label="متأخر" />
          <StatusBadge status="GREEN" />
          <StatusBadge status="YELLOW" />
          <StatusBadge status="RED" />
          <StatusBadge status="IN_PROGRESS" label="قيد الإنجاز" />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">عناصر النماذج</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          <Input label="حقل نصي" placeholder="نص تجريبي..." />
          <Input label="حقل مع خطأ" error="هذا الحقل مطلوب" placeholder="نص تجريبي..." />
          <Input label="حقل مع مساعد" helperText="نص مساعد للحقل" placeholder="نص تجريبي..." />
          <Input label="حقل معطل" disabled value="نص معطل" />
          <div className="sm:col-span-2">
            <Select
              label="قائمة منسدلة"
              options={[
                { value: "1", label: "خيار ١" },
                { value: "2", label: "خيار ٢" },
                { value: "3", label: "خيار ٣" },
              ]}
              placeholder="اختر من القائمة"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">حالات التحميل</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <p className="text-xs text-[var(--text-secondary)] mb-2">Skeleton</p>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-3 w-full" />
          </div>
          <SkeletonCard />
          <SkeletonTable rows={3} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">الحالات الفارغة</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <EmptyState
            icon={<FolderOpen className="h-12 w-12" />}
            title="لا توجد بيانات"
            description="لم يتم إضافة أي عناصر بعد"
            action={{ label: "إضافة جديد", onClick: () => {} }}
          />
          <EmptyState
            icon={<AlertTriangle className="h-12 w-12" />}
            title="لا توجد نتائج"
            description="حاول تغيير معايير البحث"
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">مؤشرات الحالة</h2>
        <div className="flex items-center gap-6 flex-wrap">
          {[
            { color: "bg-[var(--color-success)]", label: "سليم" },
            { color: "bg-[var(--color-warning)]", label: "متوسط" },
            { color: "bg-[var(--color-danger)]", label: "متعثر" },
            { color: "bg-[var(--color-info)]", label: "قيد التشغيل" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${s.color}`} />
              <span className="text-sm text-[var(--text-primary)]">{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
