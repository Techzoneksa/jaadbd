"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, Badge, Input, Button, Skeleton } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { EmptyState } from "@/components/shared/empty-state";
import { ALL_PROJECT_MEMBERS, DEMO_USERS, DEMO_TASKS } from "@/demo/data";
import { Search, UserPlus, Users, Mail, Phone } from "lucide-react";

function getInitials(name: string): string {
  return name.slice(0, 2);
}

const projectRoleColors: Record<string, string> = {
  PROJECTS_DIRECTOR: "bg-purple-100 text-purple-800",
  PROJECT_MANAGER: "bg-blue-100 text-blue-800",
  SITE_ENGINEER: "bg-green-100 text-green-800",
  PLANNING_ENGINEER: "bg-cyan-100 text-cyan-800",
  QUANTITY_SURVEYOR: "bg-orange-100 text-orange-800",
  HSE_OFFICER: "bg-red-100 text-red-800",
  QA_QC_ENGINEER: "bg-teal-100 text-teal-800",
  PROCUREMENT_MANAGER: "bg-yellow-100 text-yellow-800",
  FINANCE_MANAGER: "bg-pink-100 text-pink-800",
};

const projectRoleLabels: Record<string, string> = {
  PROJECTS_DIRECTOR: "مدير المشاريع",
  PROJECT_MANAGER: "مدير مشروع",
  SITE_ENGINEER: "مهندس موقع",
  PLANNING_ENGINEER: "مهندس تخطيط",
  QUANTITY_SURVEYOR: "مساح كميات",
  HSE_OFFICER: "مسؤول سلامة",
  QA_QC_ENGINEER: "مهندس جودة",
  PROCUREMENT_MANAGER: "مدير مشتريات",
  FINANCE_MANAGER: "مدير مالي",
};

const roleLabels: Record<string, string> = {
  TENANT_OWNER: "مالك الشركة",
  EXECUTIVE_MANAGER: "المدير التنفيذي",
  PROJECTS_DIRECTOR: "مدير المشاريع",
  PROJECT_MANAGER: "مدير مشروع",
  SITE_ENGINEER: "مهندس موقع",
  PLANNING_ENGINEER: "مهندس تخطيط",
  HSE_OFFICER: "مسؤول سلامة",
  QA_QC_ENGINEER: "مهندس جودة",
  QUANTITY_SURVEYOR: "مساح كميات",
  PROCUREMENT_MANAGER: "مدير مشتريات",
  FINANCE_MANAGER: "مدير مالي",
};

export default function TeamPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const members = useMemo(() => {
    const memberEntries = ALL_PROJECT_MEMBERS.filter((m) => m.projectId === projectId);
    return memberEntries.map((entry) => {
      const user = DEMO_USERS.find((u) => u.id === entry.userId);
      const openTasks = DEMO_TASKS.filter(
        (t) => t.projectId === projectId && t.assigneeId === entry.userId && t.status !== "COMPLETED"
      ).length;
      return { ...entry, user, openTasks };
    }).filter((m) => m.user);
  }, [projectId]);

  const filtered = useMemo(() => {
    if (!search) return members;
    const q = search.toLowerCase();
    return members.filter((m) => m.userName.includes(q) || (m.user && m.user.nameAr.includes(q)));
  }, [members, search]);

  if (loading) {
    return (
      <div dir="rtl">
        <Breadcrumbs items={[{ label: "المشروع", href: `/dashboard/projects/${projectId}` }, { label: "فريق العمل" }]} className="mb-2" />
        <PageHeader title="فريق العمل" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-14 h-14 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl">
      <Breadcrumbs
        items={[
          { label: "المشروع", href: `/dashboard/projects/${projectId}` },
          { label: "فريق العمل" },
        ]}
        className="mb-2"
      />
      <PageHeader title="فريق العمل" description="أعضاء فريق المشروع وأدوارهم">
        <Button
          leftIcon={<UserPlus className="h-4 w-4" />}
          onClick={() => alert("قريباً — إضافة عضو جديد للفريق")}
        >
          دعوة عضو
        </Button>
      </PageHeader>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
        <Input
          placeholder="ابحث عن عضو..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-9"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Users className="h-12 w-12" />}
          title={search ? "لا يوجد أعضاء مطابقين للبحث" : "لا يوجد أعضاء في الفريق"}
          description={search ? "حاول تغيير مصطلح البحث" : "لم تتم إضافة أي أعضاء لهذا المشروع بعد"}
          action={search ? undefined : { label: "دعوة عضو", onClick: () => alert("قريباً — إضافة عضو جديد للفريق") }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((member) => (
            <Card key={member.userId} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center text-[var(--color-primary-700)] font-bold text-lg shrink-0">
                    {member.user ? getInitials(member.user.nameAr) : "--"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--text-primary)] truncate">
                      {member.user?.nameAr}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      {roleLabels[member.user?.role as string] || member.user?.role}
                    </p>
                    <div className="mt-2">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${projectRoleColors[member.role] || "bg-gray-100 text-gray-800"}`}>
                        {projectRoleLabels[member.role] || member.role}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    <span dir="ltr" className="text-xs truncate">{member.user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    <span dir="ltr" className="text-xs">{member.user?.phone}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-primary)] flex items-center justify-between">
                  <span className="text-xs text-[var(--text-secondary)]">المهام المفتوحة</span>
                  <Badge variant={member.openTasks > 0 ? "blue" : "green"}>
                    {member.openTasks}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
