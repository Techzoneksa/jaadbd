"use client";

import Link from "next/link";
import { Building2, CheckCircle, HelpCircle, ArrowLeft, Star } from "lucide-react";

const plans = [
  {
    name: "Build Start",
    price: "٢٩٩",
    desc: "للشركات الصغيرة والمكاتب الهندسية التي تبدأ رحلة التحول الرقمي",
    users: "٣ مستخدمين",
    projects: "٥ مشاريع نشطة",
    storage: "١٠ جيجابايت",
    popular: false,
    features: [
      "إدارة المشاريع والمهام",
      "التقارير الميدانية",
      "المستخلصات الشهرية",
      "لوحة التحكم الرئيسية",
      "دعم فني عبر البريد",
      "تطبيق جوال",
    ],
    cta: "ابدأ الآن",
    href: "/contact",
  },
  {
    name: "Build Pro",
    price: "٦٩٩",
    desc: "لشركات المقاولات المتوسطة التي تحتاج إلى حلول متكاملة",
    users: "١٠ مستخدمين",
    projects: "٢٠ مشروعًا نشطًا",
    storage: "٥٠ جيجابايت",
    popular: true,
    features: [
      "كل مميزات Build Start",
      "المشتريات والمستودعات",
      "إدارة مقاولي الباطن",
      "تقارير الربحية والتحليل",
      "أوامر التغيير",
      "التدفقات النقدية",
      "واجهات API مفتوحة",
      "دعم فني عبر الهاتف",
    ],
    cta: "اطلب العرض",
    href: "/contact",
  },
  {
    name: "Build Enterprise",
    price: "١٬٢٩٩",
    desc: "للشركات الكبرى ومجموعات المقاولات ذات المتطلبات المتقدمة",
    users: "غير محدود",
    projects: "غير محدود",
    storage: "غير محدود",
    popular: false,
    features: [
      "كل مميزات Build Pro",
      "تخصيص كامل للوحدات والحقول",
      "مدير حساب مخصص",
      "دعم فني 24/7",
      "تكامل مع الأنظمة الحالية",
      "تقارير متقدمة مخصصة",
      "النسخ الاحتياطي اليومي",
      "عقد صيانة وتطوير",
    ],
    cta: "تواصل معنا",
    href: "/contact",
  },
  {
    name: "Build Custom",
    price: "مخصص",
    desc: "حلول مخصصة للمؤسسات الحكومية والشركات ذات الاحتياجات الخاصة",
    users: "حسب الاحتياج",
    projects: "حسب الاحتياج",
    storage: "حسب الاحتياج",
    popular: false,
    features: [
      "حلول مخصصة بالكامل",
      "استضافة خاصة (On-Premise)",
      "تكامل مع الأنظمة الحكومية",
      "عقود دعم وتطوير طويلة المدى",
      "تدريب الفريق",
      "ضمانات أداء ووقت تشغيل",
    ],
    cta: "تواصل معنا",
    href: "/contact",
  },
];

const comparisonFeatures = [
  { name: "المستخدمون", start: "٣", pro: "١٠", enterprise: "غير محدود", custom: "حسب الاحتياج" },
  { name: "المشاريع النشطة", start: "٥", pro: "٢٠", enterprise: "غير محدود", custom: "حسب الاحتياج" },
  { name: "مساحة التخزين", start: "١٠ جيجابايت", pro: "٥٠ جيجابايت", enterprise: "غير محدود", custom: "حسب الاحتياج" },
  { name: "إدارة المشاريع", start: "✓", pro: "✓", enterprise: "✓", custom: "✓" },
  { name: "التقارير الميدانية", start: "✓", pro: "✓", enterprise: "✓", custom: "✓" },
  { name: "المستخلصات المالية", start: "✓", pro: "✓", enterprise: "✓", custom: "✓" },
  { name: "المشتريات والمستودعات", start: "—", pro: "✓", enterprise: "✓", custom: "✓" },
  { name: "مقاولو الباطن", start: "—", pro: "✓", enterprise: "✓", custom: "✓" },
  { name: "تقارير الربحية", start: "—", pro: "✓", enterprise: "✓", custom: "✓" },
  { name: "التدفقات النقدية", start: "—", pro: "✓", enterprise: "✓", custom: "✓" },
  { name: "واجهات API", start: "—", pro: "✓", enterprise: "✓", custom: "✓" },
  { name: "تخصيص النظام", start: "—", pro: "بسيط", enterprise: "كامل", custom: "كامل" },
  { name: "مدير حساب مخصص", start: "—", pro: "—", enterprise: "✓", custom: "✓" },
  { name: "دعم فني", start: "بريد إلكتروني", pro: "هاتف + بريد", enterprise: "24/7", custom: "24/7" },
  { name: "استضافة خاصة", start: "—", pro: "—", enterprise: "—", custom: "✓" },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-[#091827] via-[#0c1e33] to-[#0F2742] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm mb-6">
            <Building2 className="w-4 h-4" />
            <span>الباقات والأسعار</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">اختر الباقة المناسبة لشركتك</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            باقات مرنة تبدأ من ٢٩٩ ريالًا شهريًا — ويمكنك الترقية في أي وقت دون فقدان بياناتك
          </p>
        </div>
      </section>

      {/* Plan Cards */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl border-2 p-6 transition-all duration-300 flex flex-col ${
                  plan.popular
                    ? "border-amber-500 bg-white shadow-xl shadow-amber-100/50 scale-105 lg:scale-105"
                    : "border-gray-100 bg-white hover:shadow-lg hover:border-amber-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    <Star className="w-3 h-3 inline mr-1" />
                    الأكثر طلبًا
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-[#0F2742]">{plan.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{plan.desc}</p>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-[#0F2742]">{plan.price}</span>
                  {plan.price !== "مخصص" && <span className="text-gray-400 text-xs mr-1">ريال/شهر</span>}
                </div>
                <div className="space-y-2 mb-4 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                    <span>{plan.users}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                    <span>{plan.projects}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                    <span>{plan.storage}</span>
                  </div>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block w-full text-center py-2.5 rounded-xl font-medium text-xs transition-all ${
                    plan.popular
                      ? "bg-amber-500 text-white hover:bg-amber-600"
                      : "border-2 border-[#0F2742] text-[#0F2742] hover:bg-[#0F2742] hover:text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2742] mb-4">مقارنة الباقات</h2>
            <p className="text-lg text-gray-500">قارن بين الباقات واختر الأنسب لشركتك</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-right p-4 text-sm font-bold text-[#0F2742] border-b-2 border-gray-100 bg-gray-50/50">الميزة</th>
                  {["Build Start", "Build Pro", "Build Enterprise", "Build Custom"].map((name, i) => (
                    <th key={i} className={`text-center p-4 text-sm font-bold border-b-2 border-gray-100 bg-gray-50/50 ${
                      i === 1 ? "text-amber-600" : "text-[#0F2742]"
                    }`}>
                      {name}
                      {i === 1 && <Star className="w-3 h-3 inline mr-1 text-amber-500" />}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feat, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-50/30" : ""}>
                    <td className="p-4 text-sm text-[#0F2742] font-medium border-b border-gray-100">{feat.name}</td>
                    <td className="p-4 text-center text-sm text-gray-500 border-b border-gray-100">{feat.start}</td>
                    <td className={`p-4 text-center text-sm border-b border-gray-100 ${
                      feat.pro === "✓" ? "text-amber-600 font-bold" : "text-gray-500"
                    }`}>{feat.pro}</td>
                    <td className={`p-4 text-center text-sm border-b border-gray-100 ${
                      feat.enterprise === "✓" ? "text-amber-600 font-bold" : "text-gray-500"
                    }`}>{feat.enterprise}</td>
                    <td className={`p-4 text-center text-sm border-b border-gray-100 ${
                      feat.custom === "✓" ? "text-amber-600 font-bold" : "text-gray-500"
                    }`}>{feat.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="w-10 h-10 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#0F2742] mb-2">هل لديك استفسار عن الباقات؟</h2>
          <p className="text-gray-500 mb-6">فريقنا جاهز للإجابة على جميع استفساراتك ومساعدتك في اختيار الباقة المناسبة</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-[#0F2742] text-white font-medium text-sm hover:bg-[#0F2742]/90 transition-all"
          >
            تواصل مع فريق المبيعات
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
