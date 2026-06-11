"use client";

import { useState } from "react";
import { Card, CardContent, Button, Badge, Input } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { StatusBadge } from "@/components/shared/status-badge";
import { Modal } from "@/components/feedback/modal";
import { useToast } from "@/components/feedback/toast";
import { UserPlus, Search, Mail } from "lucide-react";

const users = [
  { name: "مدير النظام", email: "admin@jaadbuild.com", role: "مدير النظام", roleKey: "SUPER_ADMIN", status: "ACTIVE" },
  { name: "م. أحمد السعيد", email: "a.saeed@ufuq.com", role: "مدير مشروع", roleKey: "PROJECT_MANAGER", status: "ACTIVE" },
  { name: "م. خالد العمري", email: "k.omari@ufuq.com", role: "مدير مشروع", roleKey: "PROJECT_MANAGER", status: "ACTIVE" },
  { name: "م. فهد القحطاني", email: "f.alqahtani@ufuq.com", role: "مهندس موقع", roleKey: "SITE_ENGINEER", status: "ACTIVE" },
  { name: "م. محمد الحربي", email: "m.alharbi@ufuq.com", role: "مهندس كميات", roleKey: "QUANTITY_SURVEYOR", status: "ACTIVE" },
  { name: "أ. سارة العنزي", email: "s.alonazi@ufuq.com", role: "محاسب", roleKey: "ACCOUNTANT", status: "ACTIVE" },
  { name: "أ. عبدالله المطيري", email: "a.almutairi@ufuq.com", role: "مسؤول مشتريات", roleKey: "PURCHASING", status: "INVITED" },
];

export default function UsersPage() {
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);

  const filtered = users.filter(
    (u) => u.name.includes(search) || u.email.includes(search) || u.role.includes(search)
  );

  const handleInvite = () => {
    addToast({ type: "success", title: "تم إرسال الدعوة", description: "تم إرسال دعوة التسجيل إلى البريد الإلكتروني" });
    setShowInviteModal(false);
  };

  return (
    <div dir="rtl">
      <Breadcrumbs
        items={[
          { label: "الإعدادات", href: "/dashboard/settings" },
          { label: "المستخدمون" },
        ]}
        className="mb-2"
      />
      <PageHeader title="المستخدمون" description="إدارة المستخدمين والصلاحيات">
        <Button onClick={() => setShowInviteModal(true)} leftIcon={<UserPlus className="h-4 w-4" />}>
          دعوة مستخدم
        </Button>
      </PageHeader>

      <div className="relative mb-6 max-w-sm">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
        <Input
          placeholder="ابحث عن مستخدم..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-9"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-primary)] text-right">
                <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">الاسم</th>
                <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">البريد الإلكتروني</th>
                <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">الدور</th>
                <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]">الحالة</th>
                <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)]"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.email} className="border-b border-[var(--border-primary)] last:border-0 hover:bg-[var(--bg-secondary)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)] flex items-center justify-center text-sm font-medium">
                        {u.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{u.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant={u.roleKey === "SUPER_ADMIN" ? "blue" : "gray"}>{u.role}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={u.status} label={u.status === "ACTIVE" ? "نشط" : "مدعو"} />
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm">تعديل</Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-sm text-[var(--text-tertiary)]">
                    لا يوجد مستخدمون مطابقون للبحث
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Modal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        title="دعوة مستخدم جديد"
        description="أدخل البريد الإلكتروني للمستخدم لإرسال دعوة التسجيل"
      >
        <div className="space-y-4">
          <Input label="البريد الإلكتروني" type="email" placeholder="user@example.com" />
          <Input label="الاسم الكامل" placeholder="الاسم ثلاثي" />
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="secondary" onClick={() => setShowInviteModal(false)}>إلغاء</Button>
            <Button onClick={handleInvite} leftIcon={<Mail className="h-4 w-4" />}>إرسال الدعوة</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
