"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button, Select } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { useToast } from "@/components/feedback/toast";
import { Save, Globe, Moon, Bell } from "lucide-react";

export default function PreferencesPage() {
  const { addToast } = useToast();
  const [prefs, setPrefs] = useState({
    language: "ar",
    theme: "light",
    emailNotifications: "all",
    dateFormat: "YYYY-MM-DD",
    timezone: "Asia/Riyadh",
  });

  const handleChange = (key: string, value: string) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    addToast({ type: "success", title: "تم الحفظ", description: "تم تحديث التفضيلات بنجاح" });
  };

  return (
    <div dir="rtl">
      <Breadcrumbs
        items={[
          { label: "الإعدادات", href: "/dashboard/settings" },
          { label: "التفضيلات" },
        ]}
        className="mb-2"
      />
      <PageHeader title="التفضيلات" description="إعدادات العرض واللغة والإشعارات" />

      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-[var(--text-secondary)]" />
              <CardTitle>اللغة والمنطقة</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              label="اللغة"
              options={[
                { value: "ar", label: "العربية" },
                { value: "en", label: "English" },
              ]}
              value={prefs.language}
              onChange={(e) => handleChange("language", e.target.value)}
            />
            <Select
              label="المنطقة الزمنية"
              options={[
                { value: "Asia/Riyadh", label: "(UTC+03:00) الرياض" },
                { value: "Asia/Dubai", label: "(UTC+04:00) دبي" },
                { value: "Asia/Kuwait", label: "(UTC+03:00) الكويت" },
              ]}
              value={prefs.timezone}
              onChange={(e) => handleChange("timezone", e.target.value)}
            />
            <Select
              label="صيغة التاريخ"
              options={[
                { value: "YYYY-MM-DD", label: "2025-01-15" },
                { value: "DD/MM/YYYY", label: "15/01/2025" },
                { value: "MM/DD/YYYY", label: "01/15/2025" },
              ]}
              value={prefs.dateFormat}
              onChange={(e) => handleChange("dateFormat", e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-[var(--text-secondary)]" />
              <CardTitle>المظهر</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Select
              label="الثيم"
              options={[
                { value: "light", label: "فاتح" },
                { value: "dark", label: "داكن" },
                { value: "system", label: "حسب النظام" },
              ]}
              value={prefs.theme}
              onChange={(e) => handleChange("theme", e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-[var(--text-secondary)]" />
              <CardTitle>الإشعارات</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Select
              label="إشعارات البريد الإلكتروني"
              options={[
                { value: "all", label: "جميع الإشعارات" },
                { value: "important", label: "المهمة فقط" },
                { value: "none", label: "إيقاف الإشعارات" },
              ]}
              value={prefs.emailNotifications}
              onChange={(e) => handleChange("emailNotifications", e.target.value)}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} leftIcon={<Save className="h-4 w-4" />}>حفظ التغييرات</Button>
        </div>
      </div>
    </div>
  );
}
