"use client";

import Link from "next/link";
import { Building2, Paintbrush, Zap, Route, Wrench, Users, ArrowLeft, CheckCircle } from "lucide-react";

const solutions = [
  {
    icon: Building2,
    title: "المقاولات العامة",
    desc: "حل متكامل لشركات المقاولات العامة يدير المشاريع من المناقصة إلى التسليم النهائي. تابع التكاليف والمستخلصات والمقاولين الباطن والمشتريات في نظام واحد.",
    features: [
      "إدارة دورة حياة المشروع كاملة",
      "متابعة التكاليف الفعلية مقابل المخطط",
      "إدارة المستخلصات وأوامر التغيير",
      "تقارير ربحية شاملة",
    ],
  },
  {
    icon: Paintbrush,
    title: "التشطيبات والديكور",
    desc: "نظام مصمم لشركات التشطيبات والديكور يتيح لك متابعة مراحل التشطيب بدقة، وإدارة المواد والعمالة في كل مرحلة من مراحل المشروع.",
    features: [
      "متابعة مراحل التشطيب والتسليم",
      "إدارة مواد التشطيب والموردين",
      "جدولة فرق العمل والمقاولين",
      "توثيق الأعمال المنفذة بالصور",
    ],
  },
  {
    icon: Zap,
    title: "الكهرباء والميكانيكا",
    desc: "حل متخصص لمقاولي الكهرباء والميكانيكا مع دعم لإدارة العقود النسبية ومتابعة الكميات المنفذة وأوامر التغيير الفنية.",
    features: [
      "إدارة العقود النسبية والمقايسات",
      "متابعة الكميات المنفذة بدقة",
      "إدارة أوامر التغيير الفنية",
      "ربط المواد بالمشاريع",
    ],
  },
  {
    icon: Route,
    title: "البنية التحتية",
    desc: "منصة متكاملة تدير مشاريع البنية التحتية والطرق والجسور مع دعم متابعة المواقع البعيدة والتقارير الميدانية دون اتصال.",
    features: [
      "تقارير ميدانية بدون إنترنت",
      "متابعة المواقع الجغرافية",
      "إدارة كميات الحفر والردم",
      "توثيق أعمال المقاولين الباطن",
    ],
  },
  {
    icon: Wrench,
    title: "التشغيل والصيانة",
    desc: "حل متكامل لشركات التشغيل والصيانة يتيح لك إدارة عقود الصيانة وجدولة الفرق ومتابعة طلبات الصيانة وكفاءة الأداء.",
    features: [
      "إدارة عقود الصيانة الدورية",
      "جدولة فرق الصيانة والمهام",
      "نظام تذاكر الصيانة",
      "مؤشرات أداء الصيانة",
    ],
  },
  {
    icon: Users,
    title: "مقاولو الباطن",
    desc: "منصة مخصصة لمقاولي الباطن لإدارة مشاريعهم المتعددة ومتابعة مستخلصاتهم والتواصل مع المقاول العام بشفافية.",
    features: [
      "إدارة المشاريع المتعددة",
      "تقديم المستخلصات إلكترونيًا",
      "توثيق الأعمال المنفذة",
      "تقارير الأداء والإنجاز",
    ],
  },
];

export default function SolutionsPage() {
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
            <span>الحلول حسب النشاط</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">الحلول حسب النشاط</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            JAAD BUILD يتكيف مع طبيعة نشاطك — اختر مجالك لترى كيف يمكننا مساعدتك
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {solutions.map((sol, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-xl hover:border-amber-200 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-100">
                    <sol.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-[#0F2742] mb-3">{sol.title}</h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{sol.desc}</p>
                    <ul className="space-y-2">
                      {sol.features.map((feat, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0F2742] to-[#091827]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">لا تجد مجالك في القائمة؟</h2>
          <p className="text-lg text-gray-300 mb-8">نحن نخصص الحلول لتناسب نشاطك أياً كان. تواصل معنا وسنصمم لك الحل المناسب.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-amber-500 text-[#091827] font-semibold text-sm hover:bg-amber-400 transition-all"
          >
            تواصل معنا
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
