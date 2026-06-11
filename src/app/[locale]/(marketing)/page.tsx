"use client";

import { useState } from "react";
import Link from "next/link";
import { FileSpreadsheet, MessageSquare, BarChart3, GitBranch, Link2, TrendingUp, Sliders, ChevronDown, CheckCircle, ArrowLeft, Star } from "lucide-react";

const problems = [
  {
    icon: FileSpreadsheet,
    title: "تشتت المعلومات",
    desc: "المحاسب عنده برنامج، المهندس عنده Excel، ومدير المشروع يتابع في واتساب",
  },
  {
    icon: BarChart3,
    title: "ربحية غير واضحة",
    desc: "المشروع يظهر رابحًا على الورق، ولكن بعد الإقفال تكتشف الخسارة",
  },
  {
    icon: MessageSquare,
    title: "تأخر المستخلصات",
    desc: "المستخلصات تتأخر، وأوامر التغيير تضيع، والتدفقات النقدية غير واضحة",
  },
  {
    icon: GitBranch,
    title: "غياب الربط الميداني",
    desc: "ما يحدث في الموقع لا ينعكس فورًا على التكاليف والمشتريات والمستخلصات",
  },
];

const solutions = [
  {
    icon: Link2,
    title: "اربط المكتب بالموقع",
    desc: "كل تقرير ميداني، كل كمية منفذة، كل صرف مادة — ينعكس فوريًا على التكاليف والمستخلصات",
  },
  {
    icon: TrendingUp,
    title: "اعرف ربحية مشروعك لحظيًا",
    desc: "لوحة ربحية متكاملة تظهر لك التكلفة المتوقعة عند الإكمال قبل فوات الأوان",
  },
  {
    icon: Sliders,
    title: "خصص نظامك",
    desc: "النظام يتكيف مع نشاطك — مقاولات عامة، تشطيبات، كهرباء، بنية تحتية، أو صيانة وتشغيل",
  },
];

const plans = [
  {
    name: "Build Start",
    price: "٢٩٩",
    desc: "للشركات الصغيرة والمكاتب الهندسية",
    features: ["٣ مستخدمين", "٥ مشاريع نشطة", "١٠ جيجابايت تخزين", "إدارة المشاريع", "التقارير الميدانية", "المستخلصات"],
    cta: "جرب مجانًا",
    popular: false,
  },
  {
    name: "Build Pro",
    price: "٦٩٩",
    desc: "لشركات المقاولات المتوسطة",
    features: ["١٠ مستخدمين", "٢٠ مشروعًا نشطًا", "٥٠ جيجابايت تخزين", "كل مميزات Start", "المشتريات والمستودعات", "تقارير الربحية", "مقاولو الباطن", "API مفتوح"],
    cta: "اطلب العرض",
    popular: true,
  },
  {
    name: "Build Enterprise",
    price: "١٬٢٩٩",
    desc: "للشركات الكبرى ومجموعات المقاولات",
    features: ["مستخدمين غير محدود", "مشاريع غير محدودة", "تخزين غير محدود", "كل مميزات Pro", "تخصيص كامل", "مدير حساب مخصص", "دعم فني 24/7", "تكامل مع الأنظمة الحالية"],
    cta: "تواصل معنا",
    popular: false,
  },
];

const faqs = [
  {
    q: "ما هو JAAD BUILD؟",
    a: "JAAD BUILD هو نظام ERP سحابي متكامل مصمم خصيصًا لشركات المقاولات والبناء والتشييد في المملكة العربية السعودية. يجمع النظام بين إدارة المشاريع والمشتريات والمستودعات والمقاولين الباطن والمستخلصات المالية في منصة واحدة موحدة.",
  },
  {
    q: "هل النظام مناسب لشركتي الصغيرة؟",
    a: "نعم، باقة Build Start مصممة خصيصًا للشركات الصغيرة بأسعار تنافسية تبدأ من ٢٩٩ ريالًا شهريًا. يمكنك البدء بثلاثة مستخدمين وخمسة مشاريع، ثم الترقية مع نمو أعمالك دون فقدان أي بيانات.",
  },
  {
    q: "هل يمكن تخصيص النظام حسب نشاطي؟",
    a: "بالتأكيد. النظام يتكيف مع طبيعة نشاطك — مقاولات عامة، تشطيبات وديكور، كهرباء وميكانيكا، بنية تحتية، أو صيانة وتشغيل. يمكنك اختيار الوحدات التي تحتاجها وتخصيص المسميات والحالات والحقول حسب احتياجاتك.",
  },
  {
    q: "هل النظام متوافق مع متطلبات هيئة الزكاة والضريبة والجمارك؟",
    a: "النظام مبني ليكون جاهزًا لمتطلبات الفوترة الإلكترونية وضريبة القيمة المضافة الصادرة عن هيئة الزكاة والضريبة والجمارك. يوفر النظام تقارير ضريبية متكاملة ويدعم إصدار الفواتير الإلكترونية المتوافقة مع اللوائح.",
  },
  {
    q: "هل يمكن ربط النظام مع برامج محاسبة أخرى؟",
    a: "نعم، النظام يوفر واجهات برمجية (API) مرنة للتكامل مع الأنظمة المحاسبية الأخرى. كما يمكن ربطه مع الأنظمة البنكية ومنصات الدفع الإلكتروني وأنظمة الموارد البشرية عبر واجهات التكامل المفتوحة.",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#091827]">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#091827] via-[#0c1e33] to-[#0F2742]" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm mb-8">
              <Star className="w-4 h-4" />
              <span>نظام ERP سحابي لشركات المقاولات</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              نظام متكامل لإدارة
              <span className="text-amber-400 block mt-2">شركات المقاولات</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
              منصة سحابية واحدة تربط بين مكتبك وموقع المشروع والمستودع والإدارة المالية — من المناقصة إلى التسليم، كل مشروع تحت السيطرة.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-amber-500 text-[#091827] font-semibold text-sm hover:bg-amber-400 transition-all"
              >
                اطلب عرضًا تجريبيًا
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl border-2 border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-all"
              >
                جرب النظام مجانًا
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-12 pt-8 border-t border-white/10">
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-[#091827] flex items-center justify-center text-[10px] font-bold text-white"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                <span className="text-white font-semibold">+٥٠ شركة</span> تستخدم JAAD BUILD في المملكة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2742] mb-4">تحديات إدارة المقاولات</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              هل تعاني من تشتت البيانات بين Excel وواتساب وبرامج المحاسبة؟
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-xl hover:border-amber-200 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                  <problem.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-[#0F2742] mb-2">{problem.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{problem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2742] mb-4">الحل في منصة واحدة</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              JAAD BUILD يربط كل جوانب إدارة المشاريع في نظام واحد متكامل
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((sol, i) => (
              <div
                key={i}
                className="relative p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-6 shadow-lg shadow-amber-200">
                  <sol.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0F2742] mb-3">{sol.title}</h3>
                <p className="text-gray-500 leading-relaxed">{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#0F2742]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "شركة تستخدم النظام", value: "+٥٠" },
              { label: "مستخدم نشط", value: "+٢٠٠" },
              { label: "مشروع مُدار", value: "+٣٠٠" },
              { label: "سنوات خبرة", value: "+١٠" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2742] mb-4">اختر الباقة المناسبة لشركتك</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              باقات مرنة تبدأ من ٢٩٩ ريالًا شهريًا — اختر ما يناسب حجم عملك
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl border-2 p-8 transition-all duration-300 ${
                  plan.popular
                    ? "border-amber-500 bg-amber-50/30 shadow-xl shadow-amber-100 scale-105 md:scale-105"
                    : "border-gray-100 bg-white hover:shadow-lg hover:border-amber-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    الأكثر طلبًا
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#0F2742]">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{plan.desc}</p>
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-[#0F2742]">{plan.price}</span>
                  <span className="text-gray-400 text-sm mr-1">ريال/شهر</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/pricing"
                  className={`block w-full text-center py-3 rounded-xl font-medium text-sm transition-all ${
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

      {/* FAQ Section */}
      <section className="py-20 bg-[#f8fafc]" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2742] mb-4">الأسئلة الشائعة</h2>
            <p className="text-lg text-gray-500">أجوبة على أكثر الأسئلة شيوعًا حول JAAD BUILD</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-right"
                >
                  <span className="font-medium text-[#0F2742]">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-5 pb-5 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
