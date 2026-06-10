"use client";

import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { useToast } from "@/components/feedback/toast";
import { Crown, Users, Projector, Database, Calendar, ArrowUp } from "lucide-react";

export default function SubscriptionPage() {
  const { addToast } = useToast();

  const usage = [
    { label: "المستخدمون", current: 7, max: 20, icon: Users },
    { label: "المشاريع", current: 8, max: 15, icon: Projector },
    { label: "مساحة التخزين", current: 400, max: 2048, unit: "MB", icon: Database },
  ];

  return (
    <div dir="rtl">
      <Breadcrumbs
        items={[
          { label: "الإعدادات", href: "/dashboard/settings" },
          { label: "الباقة والاشتراك" },
        ]}
        className="mb-2"
      />
      <PageHeader title="الباقة والاشتراك" description="معلومات الباقة الحالية وإدارة الاشتراك" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[var(--color-primary-100)] text-[var(--color-primary-700)]">
                  <Crown className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>Build Pro</CardTitle>
                  <p className="text-sm text-[var(--text-secondary)]">الباقة الاحترافية</p>
                </div>
              </div>
              <Badge variant="green">نشطة</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {usage.map((item) => {
                const percent = Math.round((item.current / item.max) * 100);
                const Icon = item.icon;
                return (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-[var(--text-secondary)]" />
                        <span className="text-sm text-[var(--text-primary)]">{item.label}</span>
                      </div>
                      <span className="text-sm text-[var(--text-secondary)]">
                        {item.current}{item.unit ? ` ${item.unit}` : ""} / {item.max}{item.unit ? ` ${item.unit}` : ""}
                      </span>
                    </div>
                    <div className="h-2.5 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          percent >= 90
                            ? "bg-[var(--color-danger)]"
                            : percent >= 75
                            ? "bg-[var(--color-warning)]"
                            : "bg-[var(--color-success)]"
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="text-xs text-[var(--text-tertiary)] mt-0.5 block">
                      {percent}% مستخدم
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>تفاصيل الاشتراك</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-secondary)]">
              <Calendar className="h-5 w-5 text-[var(--text-secondary)]" />
              <div>
                <p className="text-xs text-[var(--text-secondary)]">تاريخ التجديد</p>
                <p className="text-sm font-medium text-[var(--text-primary)]">2026-07-15</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">حالة الباقة</span>
                <span className="font-medium text-[var(--color-success)]">نشطة</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">المدة</span>
                <span className="font-medium text-[var(--text-primary)]">سنوي</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">آخر تجديد</span>
                <span className="font-medium text-[var(--text-primary)]">2025-07-15</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">قيمة الاشتراك</span>
                <span className="font-medium text-[var(--text-primary)]">٩٬٩٩٩ ريال/سنويًا</span>
              </div>
            </div>

            <Button
              className="w-full"
              leftIcon={<ArrowUp className="h-4 w-4" />}
              onClick={() => {
                // toast only
              }}
            >
              ترقية الباقة
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
