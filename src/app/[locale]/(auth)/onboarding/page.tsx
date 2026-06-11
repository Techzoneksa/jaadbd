"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Check } from "lucide-react";
import { Card, Button } from "@/components/ui";

const steps = ["معلومات الشركة", "الوحدات", "أول مشروع", "دعوة الفريق", "اكتمال التهيئة"];

const activities = [
  { value: "general_contracting", label: "مقاولات عامة" },
  { value: "building", label: "إنشاءات ومبانٍ" },
  { value: "finishing", label: "تشطيبات وديكور" },
  { value: "infrastructure", label: "بنية تحتية" },
  { value: "electrical", label: "مقاولات كهربائية" },
  { value: "mechanical", label: "مقاولات ميكانيكية" },
  { value: "subcontractor", label: "مقاول باطن" },
];

const modules = [
  { id: "projects", label: "المشاريع" },
  { id: "tenders", label: "المناقصات" },
  { id: "contracts", label: "العقود" },
  { id: "site", label: "الموقع" },
  { id: "procurement", label: "المشتريات" },
  { id: "inventory", label: "المستودعات" },
  { id: "subcontractors", label: "مقاولو الباطن" },
  { id: "invoices", label: "المستخلصات" },
  { id: "finance", label: "المالية" },
  { id: "hr", label: "الموارد البشرية" },
  { id: "equipment", label: "المعدات" },
  { id: "quality", label: "الجودة والسلامة" },
];

const roles = ["مدير مشروع", "مهندس موقع", "مهندس كميات", "محاسب", "أمين مستودع", "مسؤول مشتريات"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [companyData, setCompanyData] = useState({ nameAr: "", nameEn: "", activity: "", size: "", country: "SA", city: "الرياض", currency: "SAR", timezone: "Asia/Riyadh" });
  const [selectedModules, setSelectedModules] = useState<string[]>(["projects"]);
  const [projectData, setProjectData] = useState({ name: "", client: "", city: "", type: "", value: "", startDate: "", endDate: "" });
  const [teamMembers, setTeamMembers] = useState<{ name: string; email: string; role: string }[]>([]);

  const toggleModule = (id: string) => {
    setSelectedModules(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", email: "", role: roles[0] }]);
  };

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">معلومات الشركة</h3>
          <p className="text-sm text-gray-500">أدخل المعلومات الأساسية لشركتك</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">اسم الشركة بالعربية</label>
              <input type="text" value={companyData.nameAr} onChange={e => setCompanyData({ ...companyData, nameAr: e.target.value })} placeholder="مثال: شركة الأفق للمقاولات" className="h-10 rounded-lg border border-gray-200 px-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">اسم الشركة بالإنجليزية</label>
              <input type="text" value={companyData.nameEn} onChange={e => setCompanyData({ ...companyData, nameEn: e.target.value })} placeholder="Al Ufuq Contracting Co." className="h-10 rounded-lg border border-gray-200 px-3 text-sm focus:border-amber-500 focus:outline-none" dir="ltr" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">نوع النشاط</label>
              <select value={companyData.activity} onChange={e => setCompanyData({ ...companyData, activity: e.target.value })} className="h-10 rounded-lg border border-gray-200 px-3 text-sm">
                <option value="">اختر النشاط</option>
                {activities.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">حجم الشركة</label>
              <select value={companyData.size} onChange={e => setCompanyData({ ...companyData, size: e.target.value })} className="h-10 rounded-lg border border-gray-200 px-3 text-sm">
                <option value="">اختر الحجم</option>
                <option value="small">صغيرة (1-10 موظفين)</option>
                <option value="medium">متوسطة (11-50 موظفًا)</option>
                <option value="large">كبيرة (51+ موظفًا)</option>
              </select>
            </div>
          </div>
        </div>
      );

      case 1: return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">تخصيص النظام</h3>
          <p className="text-sm text-gray-500">اختر الوحدات التي تحتاجها في نظامك</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {modules.map(m => (
              <button key={m.id} onClick={() => toggleModule(m.id)} className={`p-3 rounded-lg border text-sm text-right transition-all ${selectedModules.includes(m.id) ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedModules.includes(m.id) ? 'bg-amber-500 border-amber-500' : 'border-gray-300'}`}>
                    {selectedModules.includes(m.id) && <Check className="h-3 w-3 text-white" />}
                  </div>
                  {m.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      );

      case 2: return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">أول مشروع</h3>
          <p className="text-sm text-gray-500">أضف أول مشروع لتبدأ المتابعة</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-medium">اسم المشروع</label>
              <input type="text" value={projectData.name} onChange={e => setProjectData({ ...projectData, name: e.target.value })} placeholder="مثال: مجمع سكني في الرياض" className="h-10 rounded-lg border border-gray-200 px-3 text-sm focus:border-amber-500 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">العميل</label>
              <input type="text" value={projectData.client} onChange={e => setProjectData({ ...projectData, client: e.target.value })} placeholder="اسم العميل" className="h-10 rounded-lg border border-gray-200 px-3 text-sm focus:border-amber-500 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">المدينة</label>
              <input type="text" value={projectData.city} onChange={e => setProjectData({ ...projectData, city: e.target.value })} placeholder="الرياض" className="h-10 rounded-lg border border-gray-200 px-3 text-sm focus:border-amber-500 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">نوع المشروع</label>
              <select value={projectData.type} onChange={e => setProjectData({ ...projectData, type: e.target.value })} className="h-10 rounded-lg border border-gray-200 px-3 text-sm">
                <option value="">اختر النوع</option>
                <option value="residential">سكني</option>
                <option value="commercial">تجاري</option>
                <option value="infrastructure">بنية تحتية</option>
                <option value="industrial">صناعي</option>
                <option value="government">حكومي</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">قيمة العقد (اختياري)</label>
              <input type="number" value={projectData.value} onChange={e => setProjectData({ ...projectData, value: e.target.value })} placeholder="ريال" className="h-10 rounded-lg border border-gray-200 px-3 text-sm focus:border-amber-500 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">تاريخ البداية</label>
              <input type="date" value={projectData.startDate} onChange={e => setProjectData({ ...projectData, startDate: e.target.value })} className="h-10 rounded-lg border border-gray-200 px-3 text-sm" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">تاريخ النهاية المتوقعة</label>
              <input type="date" value={projectData.endDate} onChange={e => setProjectData({ ...projectData, endDate: e.target.value })} className="h-10 rounded-lg border border-gray-200 px-3 text-sm" />
            </div>
          </div>
        </div>
      );

      case 3: return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">دعوة الفريق</h3>
          <p className="text-sm text-gray-500">أضف أعضاء فريقك للتعاون على المنصة</p>
          {teamMembers.map((member, idx) => (
            <div key={idx} className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg">
              <input type="text" placeholder="الاسم" value={member.name} onChange={e => { const updated = [...teamMembers]; updated[idx] = { ...updated[idx], name: e.target.value }; setTeamMembers(updated); }} className="h-10 rounded-lg border border-gray-200 px-3 text-sm" />
              <input type="email" placeholder="البريد الإلكتروني" value={member.email} onChange={e => { const updated = [...teamMembers]; updated[idx] = { ...updated[idx], email: e.target.value }; setTeamMembers(updated); }} className="h-10 rounded-lg border border-gray-200 px-3 text-sm" dir="ltr" />
              <select value={member.role} onChange={e => { const updated = [...teamMembers]; updated[idx] = { ...updated[idx], role: e.target.value }; setTeamMembers(updated); }} className="h-10 rounded-lg border border-gray-200 px-3 text-sm">
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          ))}
          <Button variant="secondary" onClick={addTeamMember} className="w-full">+ إضافة عضو</Button>
        </div>
      );

      case 4: return (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold">أصبحت جاهزًا!</h3>
          <p className="text-gray-500 max-w-sm mx-auto">تم تجهيز مساحة العمل الخاصة بك. يمكنك الآن البدء في إدارة مشاريعك.</p>
          <Button onClick={() => router.push("/dashboard")} className="mt-4">
            الدخول إلى JAAD BUILD
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#091827] via-[#0F2742] to-[#1A3A5C] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6">
          <Building2 className="h-8 w-8 text-amber-500 mx-auto mb-2" />
          <h1 className="text-xl font-bold text-white">تهيئة الشركة</h1>
          <p className="text-gray-400 text-sm">دعنا نجهز مساحة العمل الخاصة بك</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${i <= step ? 'bg-amber-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`text-xs hidden md:block ${i <= step ? 'text-amber-400' : 'text-gray-500'}`}>{s}</span>
              {i < steps.length - 1 && <div className={`w-8 h-0.5 ${i < step ? 'bg-amber-500' : 'bg-gray-700'}`} />}
            </div>
          ))}
        </div>

        <Card className="p-6">
          {renderStep()}
          
          {step < 4 && (
            <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
              <Button variant="secondary" onClick={() => setStep(step - 1)} disabled={step === 0}>
                السابق
              </Button>
              <Button onClick={() => step < 4 ? setStep(step + 1) : router.push("/dashboard")}>
                {step === 3 ? "اكتمال" : "التالي"}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
