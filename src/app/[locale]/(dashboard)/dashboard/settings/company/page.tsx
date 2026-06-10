"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { useToast } from "@/components/feedback/toast";
import { Building2, Upload, Save } from "lucide-react";

const activityTypes = [
  { value: "general", label: "مقاولات عامة" },
  { value: "building", label: "مقاولات بناء" },
  { value: "road", label: "مقاولات طرق" },
  { value: "electrical", label: "مقاولات كهربائية" },
  { value: "plumbing", label: "مقاولات صحية" },
  { value: "finishing", label: "مقاولات تشطيب" },
];

const currencies = [
  { value: "SAR", label: "ريال سعودي (SAR)" },
  { value: "USD", label: "دولار أمريكي (USD)" },
  { value: "AED", label: "درهم إماراتي (AED)" },
];

const timezones = [
  { value: "Asia/Riyadh", label: "(UTC+03:00) الرياض" },
  { value: "Asia/Dubai", label: "(UTC+04:00) دبي" },
  { value: "Asia/Kuwait", label: "(UTC+03:00) الكويت" },
];

const dateFormats = [
  { value: "YYYY-MM-DD", label: "2025-01-15" },
  { value: "DD/MM/YYYY", label: "15/01/2025" },
  { value: "MM/DD/YYYY", label: "01/15/2025" },
];

const weekStarts = [
  { value: "saturday", label: "السبت" },
  { value: "sunday", label: "الأحد" },
  { value: "monday", label: "الإثنين" },
];

const fiscalYears = [
  { value: "jan-dec", label: "يناير - ديسمبر" },
  { value: "mar-feb", label: "مارس - فبراير" },
  { value: "jul-jun", label: "يوليو - يونيو" },
];

export default function CompanySettingsPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    nameAr: "شركة الأفق للمقاولات",
    nameEn: "Ufuq Contracting Company",
    legalName: "شركة الأفق للمقاولات ذ.م.م",
    commercialRegister: "1010456789",
    taxNumber: "312345678901234",
    activityType: "general",
    country: "السعودية",
    city: "الرياض",
    currency: "SAR",
    timezone: "Asia/Riyadh",
    dateFormat: "YYYY-MM-DD",
    weekStart: "saturday",
    fiscalYear: "jan-dec",
    phone: "+966 55 123 4567",
    website: "www.ufuqcontracting.com",
    address: "حي المغرزات، شارع العليا، مبنى رقم ١٢٣",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    addToast({ type: "success", title: "تم الحفظ", description: "تم تحديث بيانات الشركة بنجاح" });
  };

  return (
    <div dir="rtl">
      <Breadcrumbs
        items={[
          { label: "الإعدادات", href: "/dashboard/settings" },
          { label: "بيانات الشركة" },
        ]}
        className="mb-2"
      />
      <PageHeader title="بيانات الشركة" description="إعدادات ومعلومات الشركة الأساسية" />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>شعار الشركة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-xl border-2 border-dashed border-[var(--border-primary)] flex items-center justify-center bg-[var(--bg-secondary)]">
              <Building2 className="h-8 w-8 text-[var(--text-tertiary)]" />
            </div>
            <div>
              <Button variant="secondary" leftIcon={<Upload className="h-4 w-4" />}>رفع شعار</Button>
              <p className="text-xs text-[var(--text-tertiary)] mt-2">يُفضل أن يكون بصيغة PNG أو SVG، بحجم لا يتجاوز 2MB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>المعلومات الأساسية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="اسم الشركة (عربي)"
              value={form.nameAr}
              onChange={(e) => handleChange("nameAr", e.target.value)}
            />
            <Input
              label="اسم الشركة (إنجليزي)"
              value={form.nameEn}
              onChange={(e) => handleChange("nameEn", e.target.value)}
            />
            <Input
              label="الاسم القانوني"
              value={form.legalName}
              onChange={(e) => handleChange("legalName", e.target.value)}
            />
            <Input
              label="السجل التجاري"
              value={form.commercialRegister}
              onChange={(e) => handleChange("commercialRegister", e.target.value)}
            />
            <Input
              label="الرقم الضريبي"
              value={form.taxNumber}
              onChange={(e) => handleChange("taxNumber", e.target.value)}
            />
            <Select
              label="نوع النشاط"
              options={activityTypes}
              value={form.activityType}
              onChange={(e) => handleChange("activityType", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>الموقع والعملة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="الدولة"
              value={form.country}
              onChange={(e) => handleChange("country", e.target.value)}
            />
            <Input
              label="المدينة"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
            <Select
              label="العملة الأساسية"
              options={currencies}
              value={form.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
            />
            <Select
              label="المنطقة الزمنية"
              options={timezones}
              value={form.timezone}
              onChange={(e) => handleChange("timezone", e.target.value)}
            />
            <Select
              label="صيغة التاريخ"
              options={dateFormats}
              value={form.dateFormat}
              onChange={(e) => handleChange("dateFormat", e.target.value)}
            />
            <Select
              label="بداية الأسبوع"
              options={weekStarts}
              value={form.weekStart}
              onChange={(e) => handleChange("weekStart", e.target.value)}
            />
            <Select
              label="السنة المالية"
              options={fiscalYears}
              value={form.fiscalYear}
              onChange={(e) => handleChange("fiscalYear", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>معلومات الاتصال</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="رقم الهاتف"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            <Input
              label="الموقع الإلكتروني"
              value={form.website}
              onChange={(e) => handleChange("website", e.target.value)}
            />
            <div className="md:col-span-2">
              <Input
                label="العنوان"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} leftIcon={<Save className="h-4 w-4" />}>حفظ التغييرات</Button>
      </div>
    </div>
  );
}
