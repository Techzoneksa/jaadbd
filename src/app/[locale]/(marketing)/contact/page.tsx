"use client";

import { useState, type FormEvent } from "react";
import { Building2, Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react";

const activityOptions = [
  "مقاولات عامة",
  "تشطيبات وديكور",
  "كهرباء وميكانيكا",
  "بنية تحتية",
  "تشغيل وصيانة",
  "مقاول باطن",
  "أخرى",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    activity: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            <span>تواصل معنا</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">اطلب عرضًا تجريبيًا</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            اترك بياناتك وسيتواصل معك فريقنا لتحديد موعد العرض التجريبي والإجابة على استفساراتك
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="text-center py-16 px-8 rounded-2xl border-2 border-green-100 bg-green-50/30">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F2742] mb-3">تم إرسال طلبك بنجاح</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    شكرًا لتواصلك معنا. سيتواصل معك فريقنا خلال ٢٤ ساعة لتحديد موعد العرض التجريبي.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", company: "", activity: "", message: "" }); }}
                    className="inline-flex items-center gap-2 h-10 px-6 rounded-xl border-2 border-[#0F2742] text-[#0F2742] font-medium text-sm hover:bg-[#0F2742] hover:text-white transition-all"
                  >
                    إرسال طلب آخر
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl font-bold text-[#0F2742] mb-6">نموذج طلب عرض تجريبي</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#0F2742] mb-1.5">
                        الاسم <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-[#0F2742] placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0F2742] mb-1.5">
                        البريد الإلكتروني <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-[#0F2742] placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="example@company.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#0F2742] mb-1.5">
                        رقم الجوال <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-[#0F2742] placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="٠٥٠ xxx xxxx"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0F2742] mb-1.5">
                        اسم الشركة <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-[#0F2742] placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="اسم شركتك"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F2742] mb-1.5">نشاط الشركة</label>
                    <select
                      value={formData.activity}
                      onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                      className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-[#0F2742] focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                    >
                      <option value="">اختر النشاط</option>
                      {activityOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F2742] mb-1.5">الرسالة</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#0F2742] placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                      placeholder="اكتب رسالتك أو استفسارك هنا..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-amber-500 text-[#091827] font-semibold text-sm hover:bg-amber-400 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    إرسال الطلب
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-[#f8fafc] rounded-2xl p-8 border border-gray-100">
                <h3 className="text-lg font-bold text-[#0F2742] mb-6">معلومات التواصل</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0F2742]">البريد الإلكتروني</p>
                      <a href="mailto:info@jaadbuild.com" className="text-sm text-gray-500 hover:text-amber-600 transition-colors">
                        info@jaadbuild.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0F2742]">رقم الجوال</p>
                      <a href="tel:+966500000000" className="text-sm text-gray-500 hover:text-amber-600 transition-colors" dir="ltr">
                        +966 50 000 0000
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0F2742]">المقر الرئيسي</p>
                      <p className="text-sm text-gray-500">الرياض، المملكة العربية السعودية</p>
                    </div>
                  </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <h4 className="text-sm font-bold text-[#0F2742] mb-3">أوقات العمل</h4>
                <p className="text-sm text-gray-500 mb-1">الأحد - الخميس: ٩:٠٠ ص - ٦:٠٠ م</p>
                <p className="text-sm text-gray-500">الجمعة - السبت: إجازة أسبوعية</p>

                <hr className="my-6 border-gray-200" />

                <p className="text-sm text-gray-500 leading-relaxed">
                  فريقنا جاهز للرد على استفساراتكم ودعمكم في أي وقت. لا تتردد في التواصل معنا لأي استفسار حول النظام أو الباقات أو الخدمات.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
