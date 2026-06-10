"use client";

import Link from "next/link";
import { Building2, ClipboardCheck, Package, Users, Receipt, BarChart4, Sliders, HardHat, Truck, Warehouse, Handshake, CalendarCheck, TrendingUp, PieChart, Settings, Layers, FileText, Shield, Smartphone, Globe } from "lucide-react";

const categories = [
  {
    title: "إدارة المشاريع",
    icon: HardHat,
    items: [
      { icon: ClipboardCheck, title: "جدولة المشاريع", desc: "إنشاء الجداول الزمنية وتوزيع المهام ومتابعة الإنجاز اليومي للمشروع" },
      { icon: CalendarCheck, title: "التقارير الميدانية", desc: "تسجيل تقارير يومية ميدانية مع الصور والمواقع وإرفاقها بالمشروع" },
      { icon: Layers, title: "إدارة المراحل", desc: "تقسيم المشروع إلى مراحل ومهام فرعية مع متابعة كل مرحلة على حدة" },
      { icon: FileText, title: "المستندات والعقود", desc: "أرشفة جميع مستندات المشروع والعقود والمراسلات في مكان واحد" },
    ],
  },
  {
    title: "المشتريات والمستودعات",
    icon: Package,
    items: [
      { icon: Truck, title: "طلبات الشراء", desc: "إنشاء طلبات الشراء واعتمادها إلكترونيًا ومتابعة حالة كل طلب" },
      { icon: Warehouse, title: "إدارة المخزون", desc: "متابعة المخزون في المستودعات مع التنبيه عند انخفاض الكميات" },
      { icon: Package, title: "إدارة المورّدين", desc: "قاعدة بيانات للمورّدين وعروض الأسعار وتقييم أدائهم" },
      { icon: Handshake, title: "أوامر التوريد", desc: "إصدار أوامر التوريد ومتابعة الشحنات والاستلام" },
    ],
  },
  {
    title: "المقاولون الباطن",
    icon: Users,
    items: [
      { icon: Users, title: "إدارة عقود الباطن", desc: "إدارة عقود مقاولي الباطن ومتابعة أعمالهم ومستحقاتهم" },
      { icon: Receipt, title: "مستخلصات الباطن", desc: "إصدار واعتماد مستخلصات مقاولي الباطن إلكترونيًا" },
      { icon: Shield, title: "شهادات الإنجاز", desc: "توثيق الأعمال المنفذة وإصدار شهادات الإنجاز المعتمدة" },
      { icon: ClipboardCheck, title: "تقييم الأداء", desc: "تقييم أداء مقاولي الباطن بناءً على الجودة والالتزام بالجدول" },
    ],
  },
  {
    title: "المستخلصات المالية",
    icon: Receipt,
    items: [
      { icon: Receipt, title: "المستخلصات الشهرية", desc: "إعداد المستخلصات الشهرية واعتمادها إلكترونيًا" },
      { icon: PieChart, title: "أوامر التغيير", desc: "توثيق أوامر التغيير وأثرها على القيمة الإجمالية للمشروع" },
      { icon: TrendingUp, title: "التدفقات النقدية", desc: "متابعة التدفقات النقدية للمشروع والمقارنة مع المخطط" },
      { icon: BarChart4, title: "الإقفال المالي", desc: "إقفال المشاريع ماليًا وحساب الربح والخسارة النهائي" },
    ],
  },
  {
    title: "التقارير والتحليلات",
    icon: BarChart4,
    items: [
      { icon: TrendingUp, title: "لوحات الربحية", desc: "لوحة متكاملة لربحية كل مشروع مع التكلفة المتوقعة عند الإكمال" },
      { icon: PieChart, title: "تحليل التكاليف", desc: "تحليل التكاليف حسب النوع والمشروع والمقاول الباطن" },
      { icon: Globe, title: "تقارير الأداء", desc: "تقارير أداء شاملة للمشاريع والموارد والمقاولين" },
      { icon: Smartphone, title: "تقارير لحظية", desc: "تقارير فورية متاحة على الجوال لكل المستويات الإدارية" },
    ],
  },
  {
    title: "التخصيص والمرونة",
    icon: Sliders,
    items: [
      { icon: Settings, title: "تخصيص الوحدات", desc: "اختر الوحدات التي تحتاجها وفعّل ما يناسب نشاطك فقط" },
      { icon: Sliders, title: "الحقول المخصصة", desc: "أضف حقولًا مخصصة حسب احتياجك لكل شاشة في النظام" },
      { icon: Layers, title: "المسميات والحالات", desc: "خصص مسميات الحالات والمراحل لتناسب مصطلحات شركتك" },
      { icon: Shield, title: "الصلاحيات والأدوار", desc: "تحديد صلاحيات دقيقة لكل مستخدم حسب دوره في الشركة" },
    ],
  },
];

export default function FeaturesPage() {
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
            <span>مميزات JAAD BUILD</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">مميزات JAAD BUILD</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            أكثر من ٥٠ ميزة متكاملة تغطي كل جوانب إدارة شركات المقاولات — من المناقصة إلى التسليم
          </p>
        </div>
      </section>

      {/* Features by Category */}
      {categories.map((cat, ci) => (
        <section key={ci} className={`py-16 ${ci % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <cat.icon className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2742]">{cat.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cat.items.map((item, ii) => (
                <div
                  key={ii}
                  className="group p-6 rounded-xl border border-gray-100 bg-white hover:shadow-lg hover:border-amber-200 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                    <item.icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F2742] mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0F2742] to-[#091827]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">جاهز لتجربة JAAD BUILD؟</h2>
          <p className="text-lg text-gray-300 mb-8">احصل على عرض تجريبي مجاني وتعرف على كيف يمكن لنظامنا أن يغير طريقة إدارة مشاريعك</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-amber-500 text-[#091827] font-semibold text-sm hover:bg-amber-400 transition-all"
          >
            اطلب عرضًا تجريبيًا
          </Link>
        </div>
      </section>
    </>
  );
}
