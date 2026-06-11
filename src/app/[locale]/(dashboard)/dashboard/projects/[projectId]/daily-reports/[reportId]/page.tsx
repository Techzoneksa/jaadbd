"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Skeleton } from "@/components/ui";
import { StatusBadge } from "@/components/shared/status-badge";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { formatDate, formatNumber, formatRelativeTime } from "@/lib/formatters";
import { DEMO_DAILY_REPORTS } from "@/demo/data";
import type { DailyReportData } from "@/domain/site-reports";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  FileText,
  HardHat,
  Wrench,
  Package,
  AlertOctagon,
  MessageSquare,
} from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
  DRAFT: "مسودة",
  SUBMITTED: "مقدمة",
  UNDER_REVIEW: "قيد المراجعة",
  APPROVED: "معتمدة",
  RETURNED: "معادة",
};

function SectionCard({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card className="mb-4 border border-[var(--border-primary)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value: string | number | React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-[var(--border-primary)] last:border-0">
      <span className="text-sm text-[var(--text-secondary)]">{label}</span>
      <span className="text-sm font-medium text-[var(--text-primary)]">{value}</span>
    </div>
  );
}

export default function DailyReportDetailPage() {
  const locale = useLocale();
  const params = useParams();
  const projectId = params.projectId as string;
  const reportId = params.reportId as string;

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<DailyReportData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const found = DEMO_DAILY_REPORTS.find((r) => r.id === reportId) ?? null;
      setReport(found);
    } catch {
      setError("حدث خطأ أثناء تحميل التقرير");
    } finally {
      setLoading(false);
    }
  }, [reportId]);

  const handleApprove = () => {
    if (!report) return;
    setReport({
      ...report,
      status: "APPROVED",
      approvedBy: "المدير",
      approvedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  const handleReturn = () => {
    if (!report) return;
    setReport({
      ...report,
      status: "RETURNED",
      updatedAt: new Date().toISOString(),
    });
  };

  if (loading) {
    return (
      <div dir="rtl">
        <Breadcrumbs items={[{ label: "المشاريع", href: "/dashboard/projects" }, { label: "التقارير اليومية" }]} className="mb-2" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div dir="rtl">
        <Breadcrumbs
          items={[
            { label: "المشاريع", href: "/dashboard/projects" },
            { label: "التقارير اليومية", href: `/dashboard/projects/${projectId}/daily-reports` },
            { label: "تفاصيل التقرير" },
          ]}
          className="mb-2"
        />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-[var(--color-warning)]" />
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">خطأ في تحميل التقرير</h2>
            <p className="text-sm text-[var(--text-secondary)]">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div dir="rtl">
        <Breadcrumbs
          items={[
            { label: "المشاريع", href: "/dashboard/projects" },
            { label: "التقارير اليومية", href: `/dashboard/projects/${projectId}/daily-reports` },
            { label: "التقرير" },
          ]}
          className="mb-2"
        />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <FileText className="h-16 w-16 mx-auto mb-4 text-[var(--text-tertiary)]" />
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">التقرير غير موجود</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">لم يتم العثور على التقرير المطلوب</p>
            <Link
              href={`/dashboard/projects/${projectId}/daily-reports`}
              className="text-sm font-medium text-[var(--color-primary-700)] hover:underline inline-flex items-center gap-1"
            >
              <ArrowRight className="h-4 w-4" />
              العودة إلى التقارير اليومية
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const canApprove = report.status === "SUBMITTED" || report.status === "UNDER_REVIEW";

  return (
    <div dir="rtl">
      <Breadcrumbs
        items={[
          { label: "المشاريع", href: "/dashboard/projects" },
          { label: "التقارير اليومية", href: `/dashboard/projects/${projectId}/daily-reports` },
          { label: report.reportNumber },
        ]}
        className="mb-2"
      />

      <div className="flex items-center gap-3 flex-wrap mb-2">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">{report.reportNumber}</h1>
        <StatusBadge status={report.status} label={STATUS_LABELS[report.status]} />
      </div>
      <Link href={`/dashboard/projects/${projectId}/daily-reports`} className="inline-block mb-4">
        <Button variant="outline" size="sm">
          <ArrowRight className="h-4 w-4 ml-1" />
          العودة
        </Button>
      </Link>

      <div className="print:hidden mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
        {canApprove && (
          <>
            <Button size="sm" onClick={handleApprove}>
              <CheckCircle2 className="h-4 w-4 ml-1" />
              اعتماد التقرير
            </Button>
            <Button variant="outline" size="sm" onClick={handleReturn}>
              <RotateCcw className="h-4 w-4 ml-1" />
              إعادة التقرير
            </Button>
          </>
        )}
        <Button variant="ghost" size="sm" onClick={() => window.print()}>
          <FileText className="h-4 w-4 ml-1" />
          طباعة
        </Button>
      </div>

      {/* 1. معلومات عامة */}
      <SectionCard title="معلومات عامة" icon={<FileText className="h-5 w-5 text-[var(--text-secondary)]" />}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <InfoRow label="التاريخ" value={formatDate(report.date)} />
          <InfoRow label="أعد بواسطة" value={report.preparedByName} />
          <InfoRow label="الطقس" value={report.weather} />
          <InfoRow label="درجة الحرارة" value={`${report.temperature}°C`} />
          <InfoRow label="حالة الموقع" value={report.siteCondition} />
          <InfoRow label="وقت البداية" value={report.startTime} />
          <InfoRow label="وقت النهاية" value={report.endTime} />
          {report.approvedBy && (
            <>
              <InfoRow label="اعتمد بواسطة" value={report.approvedBy} />
              {report.approvedAt && <InfoRow label="تاريخ الاعتماد" value={formatDate(report.approvedAt)} />}
            </>
          )}
        </div>
      </SectionCard>

      {/* 2. الأعمال المنفذة */}
      <SectionCard title="الأعمال المنفذة" icon={<Wrench className="h-5 w-5 text-[var(--text-secondary)]" />}>
        {report.workPerformed.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">لا توجد أعمال منفذة</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-primary)] text-right">
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">النشاط</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">الموقع</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">الكمية</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">الوحدة</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">التقدم</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">ملاحظات</th>
                </tr>
              </thead>
              <tbody>
                {report.workPerformed.map((w) => (
                  <tr key={w.id} className="border-b border-[var(--border-primary)] last:border-0">
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{w.activity}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-secondary)]">{w.location}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{formatNumber(w.quantity)}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-secondary)]">{w.unit}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-gray-200 overflow-hidden">
                          <div className="h-full rounded-full bg-[var(--color-primary-700)]" style={{ width: `${w.progress}%` }} />
                        </div>
                        <span className="text-xs text-[var(--text-secondary)]">{w.progress}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-xs text-[var(--text-tertiary)]">{w.notes || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      {/* 3. العمالة */}
      <SectionCard title="العمالة" icon={<HardHat className="h-5 w-5 text-[var(--text-secondary)]" />}>
        {report.workforce.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">لا توجد بيانات عمالة</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-primary)] text-right">
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">المهنة</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">الشركة</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">العدد</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">الساعات</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">ساعات إضافية</th>
                </tr>
              </thead>
              <tbody>
                {report.workforce.map((w) => (
                  <tr key={w.id} className="border-b border-[var(--border-primary)] last:border-0">
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{w.trade}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-secondary)]">{w.company}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{formatNumber(w.count)}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{formatNumber(w.hours)}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{formatNumber(w.overtime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      {/* 4. المعدات */}
      <SectionCard title="المعدات" icon={<Wrench className="h-5 w-5 text-[var(--text-secondary)]" />}>
        {report.equipment.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">لا توجد معدات</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-primary)] text-right">
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">المعدة</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">الكود</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">الحالة</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">ساعات التشغيل</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">ساعات التوقف</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">المشغل</th>
                </tr>
              </thead>
              <tbody>
                {report.equipment.map((e) => (
                  <tr key={e.id} className="border-b border-[var(--border-primary)] last:border-0">
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{e.name}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-secondary)]">{e.code}</td>
                    <td className="px-3 py-2">
                      <Badge variant={e.status === "تشغيل" ? "green" : e.status === "تعطل" ? "red" : "gray"}>
                        {e.status}
                      </Badge>
                    </td>
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{formatNumber(e.operatingHours)}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{formatNumber(e.downtimeHours)}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-secondary)]">{e.operator || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      {/* 5. المواد */}
      <SectionCard title="المواد" icon={<Package className="h-5 w-5 text-[var(--text-secondary)]" />}>
        {report.materials.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">لا توجد مواد</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-primary)] text-right">
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">المادة</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">الكمية</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">الوحدة</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">المورد</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">رقم الإيصال</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">الفحص</th>
                </tr>
              </thead>
              <tbody>
                {report.materials.map((m) => (
                  <tr key={m.id} className="border-b border-[var(--border-primary)] last:border-0">
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{m.name}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{formatNumber(m.quantityReceived)}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-secondary)]">{m.unit}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-secondary)]">{m.supplier}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-secondary)]">{m.receiptNumber || "-"}</td>
                    <td className="px-3 py-2">
                      <Badge variant={m.inspectionStatus === "مقبول" ? "green" : "red"}>{m.inspectionStatus}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      {/* 6. التأخيرات - hide if empty */}
      {report.delays.length > 0 && (
        <SectionCard title="التأخيرات" icon={<AlertOctagon className="h-5 w-5 text-[var(--color-warning)]" />}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-primary)] text-right">
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">النوع</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">الوصف</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">المسؤول</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">التأثير</th>
                  <th className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {report.delays.map((d) => (
                  <tr key={d.id} className="border-b border-[var(--border-primary)] last:border-0">
                    <td className="px-3 py-2 text-sm text-[var(--text-primary)]">{d.type}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-secondary)]">{d.description}</td>
                    <td className="px-3 py-2 text-sm text-[var(--text-secondary)]">{d.responsible}</td>
                    <td className="px-3 py-2">
                      <Badge
                        variant={
                          d.impact === "كبير" ? "red" : d.impact === "متوسط" ? "orange" : "yellow"
                        }
                      >
                        {d.impact}
                      </Badge>
                    </td>
                    <td className="px-3 py-2 text-sm text-[var(--text-secondary)]">{d.actionTaken}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {/* 7. السلامة */}
      <SectionCard title="السلامة" icon={<AlertTriangle className="h-5 w-5 text-[var(--text-secondary)]" />}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <div className="text-center p-3 rounded-lg bg-[var(--bg-accent)]">
            <p className="text-xs text-[var(--text-secondary)] mb-1">حوادث</p>
            <span className={`text-lg font-bold ${report.safety.accident ? "text-red-500" : "text-green-500"}`}>
              {report.safety.accident ? "نعم" : "لا"}
            </span>
          </div>
          <div className="text-center p-3 rounded-lg bg-[var(--bg-accent)]">
            <p className="text-xs text-[var(--text-secondary)] mb-1">حالات قريبة</p>
            <span className={`text-lg font-bold ${report.safety.nearMiss ? "text-orange-500" : "text-green-500"}`}>
              {report.safety.nearMiss ? "نعم" : "لا"}
            </span>
          </div>
          <div className="text-center p-3 rounded-lg bg-[var(--bg-accent)]">
            <p className="text-xs text-[var(--text-secondary)] mb-1">ملاحظات سلامة</p>
            <span className={`text-lg font-bold ${report.safety.safetyNote ? "text-green-500" : "text-gray-400"}`}>
              {report.safety.safetyNote ? "نعم" : "لا"}
            </span>
          </div>
          <div className="text-center p-3 rounded-lg bg-[var(--bg-accent)]">
            <p className="text-xs text-[var(--text-secondary)] mb-1">محاضرة سلامة</p>
            <span className={`text-lg font-bold ${report.safety.toolboxTalk ? "text-green-500" : "text-gray-400"}`}>
              {report.safety.toolboxTalk ? "نعم" : "لا"}
            </span>
          </div>
        </div>
        <div className="text-sm text-[var(--text-primary)]">
          <InfoRow
            label="ساعات بدون حوادث"
            value={`${formatNumber(report.safety.hoursWithoutIncident)} ساعة`}
          />
          {report.safety.incidentDescription && (
            <InfoRow label="وصف الحادثة" value={report.safety.incidentDescription} />
          )}
        </div>
      </SectionCard>

      {/* 8. ملاحظات */}
      {report.notes && (
        <SectionCard title="ملاحظات" icon={<MessageSquare className="h-5 w-5 text-[var(--text-secondary)]" />}>
          <p className="text-sm text-[var(--text-primary)] whitespace-pre-wrap">{report.notes}</p>
        </SectionCard>
      )}

      <div className="text-xs text-[var(--text-tertiary)] mt-4 flex items-center gap-4 pb-8">
        <span>تم الإنشاء: {formatRelativeTime(report.createdAt, locale)}</span>
        <span>آخر تحديث: {formatRelativeTime(report.updatedAt, locale)}</span>
      </div>
    </div>
  );
}
