"use client";

import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Shield, Check, X } from "lucide-react";

const roles = [
  { name: "مدير النظام", key: "SUPER_ADMIN", description: "صلاحية كاملة على جميع أقسام النظام", type: "إدارة عليا" },
  { name: "مدير مشروع", key: "PROJECT_MANAGER", description: "إدارة المشاريع والفريق والتقارير", type: "إدارة" },
  { name: "مهندس موقع", key: "SITE_ENGINEER", description: "تسجيل التقارير اليومية ومتابعة الموقع", type: "هندسي" },
  { name: "مهندس كميات", key: "QUANTITY_SURVEYOR", description: "إدارة الكميات والمستخلصات", type: "هندسي" },
  { name: "محاسب", key: "ACCOUNTANT", description: "إدارة المصروفات والفواتير", type: "مالي" },
  { name: "مسؤول مشتريات", key: "PURCHASING", description: "إدارة طلبات الشراء والموردين", type: "مشتريات" },
  { name: "مدير مالي", key: "FINANCE_MANAGER", description: "إدارة الميزانية والتدفقات المالية", type: "مالي" },
  { name: "مدير عقود", key: "CONTRACT_MANAGER", description: "إدارة العقود والمستخلصات", type: "قانوني" },
  { name: "مشرف", key: "SUPERVISOR", description: "متابعة المشاريع والتقارير", type: "إشراف" },
  { name: "مسؤول مستودع", key: "WAREHOUSE", description: "إدارة المخزون والمستودعات", type: "لوجستي" },
  { name: "مسؤول سلامة", key: "SAFETY_OFFICER", description: "تقارير السلامة والمخاطر", type: "سلامة" },
  { name: "مسؤول موارد بشرية", key: "HR", description: "إدارة الموظفين والحضور", type: "إداري" },
  { name: "سكرتير", key: "SECRETARY", description: "إدارة المراسلات والمواعيد", type: "إداري" },
  { name: "عميل", key: "CLIENT", description: "متابعة مشاريعه وتقاريرها", type: "خارجي" },
  { name: "مقاول باطن", key: "SUBCONTRACTOR", description: "رفع مستخلصاته ومتابعة أعماله", type: "خارجي" },
  { name: "مستخدم ضيف", key: "GUEST", description: "اطلاع على التقارير فقط", type: "محدود" },
];

const permissions = [
  "المشاريع",
  "التقارير اليومية",
  "المستخلصات",
  "المشتريات",
  "المخزون",
  "الحسابات",
  "العقود",
  "الموظفين",
  "التقارير",
  "الإعدادات",
];

const permissionMatrix: Record<string, string[]> = {
  SUPER_ADMIN: permissions.map(() => "full"),
  PROJECT_MANAGER: ["full", "full", "edit", "edit", "view", "view", "edit", "view", "full", "view"],
  SITE_ENGINEER: ["edit", "full", "view", "view", "view", "none", "none", "none", "edit", "none"],
  QUANTITY_SURVEYOR: ["edit", "view", "full", "view", "none", "edit", "full", "none", "edit", "none"],
  ACCOUNTANT: ["view", "none", "edit", "none", "none", "full", "none", "none", "full", "none"],
  PURCHASING: ["view", "none", "none", "full", "edit", "none", "view", "none", "view", "none"],
  FINANCE_MANAGER: ["full", "view", "full", "edit", "none", "full", "full", "none", "full", "none"],
  CONTRACT_MANAGER: ["full", "view", "full", "view", "none", "none", "full", "none", "full", "none"],
  SUPERVISOR: ["full", "edit", "view", "view", "view", "view", "view", "none", "full", "none"],
  WAREHOUSE: ["none", "none", "none", "view", "full", "none", "none", "none", "view", "none"],
  SAFETY_OFFICER: ["edit", "edit", "none", "none", "none", "none", "none", "none", "full", "none"],
  HR: ["none", "none", "none", "none", "none", "none", "none", "full", "edit", "none"],
  SECRETARY: ["view", "none", "none", "none", "none", "none", "view", "none", "view", "none"],
  CLIENT: ["view", "none", "none", "none", "none", "none", "none", "none", "view", "none"],
  SUBCONTRACTOR: ["view", "none", "edit", "none", "none", "none", "none", "none", "none", "none"],
  GUEST: ["view", "none", "none", "none", "none", "none", "none", "none", "view", "none"],
};

const accessLabel: Record<string, string> = {
  full: "كامل",
  edit: "تعديل",
  view: "عرض",
  none: "—",
};

const accessColor: Record<string, string> = {
  full: "text-[var(--color-success)]",
  edit: "text-[var(--color-warning)]",
  view: "text-[var(--color-info)]",
  none: "text-[var(--text-tertiary)]",
};

export default function RolesPage() {
  return (
    <div dir="rtl">
      <Breadcrumbs
        items={[
          { label: "الإعدادات", href: "/dashboard/settings" },
          { label: "الصلاحيات" },
        ]}
        className="mb-2"
      />
      <PageHeader title="الصلاحيات والأدوار" description="إدارة أدوار المستخدمين وصلاحياتهم" />

      <Card>
        <CardHeader>
          <CardTitle>الأدوار ({roles.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-[var(--border-primary)] text-right">
                <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] sticky right-0 bg-[var(--bg-primary)]">الدور</th>
                <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">الوصف</th>
                <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">النوع</th>
                {permissions.map((p) => (
                  <th key={p} className="px-3 py-3 text-xs font-medium text-[var(--text-secondary)] text-center">{p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.key} className="border-b border-[var(--border-primary)] last:border-0 hover:bg-[var(--bg-secondary)] transition-colors">
                  <td className="px-4 py-3 sticky right-0 bg-[var(--bg-primary)]">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-[var(--color-primary-700)]" />
                      <span className="text-sm font-medium text-[var(--text-primary)] whitespace-nowrap">{role.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{role.description}</td>
                  <td className="px-4 py-3">
                    <Badge variant={role.type === "إدارة عليا" ? "red" : role.type === "إدارة" ? "blue" : "gray"}>
                      {role.type}
                    </Badge>
                  </td>
                  {permissions.map((_, pi) => {
                    const level = permissionMatrix[role.key]?.[pi] || "none";
                    return (
                      <td key={pi} className="px-3 py-3 text-center">
                        <span className={`text-xs font-medium ${accessColor[level]}`}>
                          {level === "none" ? <X className="h-3.5 w-3.5 inline" /> : level === "full" ? <Check className="h-3.5 w-3.5 inline" /> : accessLabel[level]}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
