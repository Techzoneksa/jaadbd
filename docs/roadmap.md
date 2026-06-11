# خارطة الطريق (Roadmap)

## نظرة عامة

JAAD BUILD يمر بـ 8 مراحل تطويرية تغطي جميع جوانب إدارة شركات المقاولات. كل مرحلة تبني على التي تسبقها لتقديم نظام ERP متكامل.

---

## الحالي (Current) — v0.1.0

### ✅ تم الإنجاز

#### Phase 0 — SaaS Foundation & Design System

- [x] هيكل المشروع الأساسي (Next.js 15 + TypeScript + Tailwind v4)
- [x] نظام المصادقة (Auth.js / NextAuth v5 مع Credentials)
- [x] قاعدة البيانات (Prisma + PostgreSQL) مع المخطط الكامل
- [x] نظام Multi-Tenancy مع عزل البيانات
- [x] نظام الصلاحيات (RBAC) — 16 دورًا
- [x] الترجمة (next-intl) — العربية والإنجليزية
- [x] نظام التصميم — الألوان، الخطوط، المكونات الأساسية
- [x] تخطيط لوحة التحكم (DashboardShell, Sidebar, Header)
- [x] مكتبة المكونات الأساسية (Button, Card, Input, Select, Badge, Skeleton)
- [x] مكتبة تنسيق البيانات (عملة، تاريخ، أرقام)
- [x] التحقق من البيانات (Zod schemas)
- [x] الصفحات التسويقية (الرئيسية، المميزات، الحلول، الأسعار، اتصل بنا)
- [x] صفحات المصادقة (تسجيل الدخول، إنشاء حساب، الإعداد الأولي)
- [x] صفحة لوحة التحكم الرئيسية
- [x] صفحة إعدادات الشركة
- [x] صفحة قائمة المشاريع (الإطار الأساسي)
- [x] صفحة تفاصيل المشروع (الإطار الأساسي)
- [x] صفحة إدارة المستخدمين
- [x] مكونات dashboard (KPI Cards)

#### Phase 1 — Demo Core Projects & Site Operations

- [x] Demo Mode Config — `src/config/demo.ts` مع 8 أدوار تجريبية
- [x] Domain Types — `src/domain/` contracts للـ projects, tasks, site-reports, risks
- [x] Service Layer — 5 Services (Project, Task, DailyReport, Risk, Identity)
- [x] Demo Data — 8 مشاريع، 12 مستخدم، 50 مهمة، 40 Milestone، 15 تقرير، 31 مخاطرة
- [x] Demo Repositories — CRUD في الذاكرة مع filter/sort/reset
- [x] Demo Scenarios — محاكاة (progress, cost, delay, completion, reset)
- [x] Dashboard — 5 KPI cards, project health bar, at-risk card, quick actions, activities
- [x] Projects List — grid/table views, search, 6 pill filters
- [x] Create/Edit Project — form with validation, redirect to show page
- [x] Project Command Center — header + 6 KPI + 8 data tabs (URL query)
- [x] Tasks — Kanban board (6 columns), search, filter, detail modal
- [x] Milestones — table + timeline views
- [x] Daily Reports — list + detail (8 sections, approve/return workflow)
- [x] Team — member cards, project roles, open task count
- [x] Risks — 5×5 matrix + register table + filters
- [x] Activities — timeline grouped by date
- [x] Notifications — all/unread filter, mark all read
- [x] Demo Banner + Role Switcher — مبدّل 8 أدوار مع صلاحيات
- [x] ترجمة كاملة عربي/إنجليزي لجميع الوحدات الجديدة

#### Phase 1.1 — Demo QA, Polish & Deployment Verification

- [x] ESLint: 0 warnings, 0 errors
- [x] TypeScript: 0 errors
- [x] Build: ناجح بدون DATABASE_URL
- [x] Vitest: 50 اختبار وحدة ناجحة
- [x] تحسين الجوال 390px (flex-wrap للأزرار، truncate للتواريخ)
- [x] تحديث الوثائق (README, architecture.md, roadmap.md)
- [x] Push إلى origin/main

---

## ✅ المرحلة 1 (Phase 1) — Core Projects & Site Operations (Demo)

**الهدف:** إدارة المشاريع والمهام الأساسية — بنمط Demo

**الحالة:** ✅ مكتمل في `44fba50`

- [x] Domain contracts + Service layer
- [x] Demo Data Layer (8 مشاريع، 50 مهمة، 40 Milestone، 15 تقرير، 31 مخاطرة)
- [x] Dashboard مع KPI cards
- [x] CRUD المشاريع مع grid/table views
- [x] Project Command Center مع 8 tabs
- [x] Kanban للمهام (6 أعمدة)
- [x] Milestones (table + timeline)
- [x] Daily Reports مع سير عمل الاعتماد
- [x] Team + Risks + Activities + Notifications
- [x] Demo Role Switcher (8 أدوار)
- [x] Demo Banner + Reset Data
- [x] ترجمة كاملة عربي/إنجليزي

## المرحلة 1.1 (Phase 1.1) — Demo QA, Polish & Deployment Verification

**الحالة:** ✅ مكتمل

- [x] ESLint 0 warnings
- [x] TypeScript 0 errors
- [x] Build بدون PostgreSQL
- [x] 50 اختبار Vitest
- [x] تحسين الجوال 390px
- [x] توثيق Demo Mode

---

## المرحلة 2 (Phase 2) — Tenders & BOQ

**الهدف:** إدارة المناقصات وجداول الكميات

- [ ] إدارة المناقصات (Tenders)
- [ ] جداول الكميات (BOQ — Bill of Quantities)
- [ ] بنود الأسعار (Price Items)
- [ ] عروض الأسعار (Quotations)
- [ ] مقارنة العروض
- [ ] الترسية والتعاقد
- [ ] نموذج أمر التغيير (Change Order)
- [ ] تقارير المناقصات

**المدة التقديرية:** 4 أسابيع

---

## المرحلة 3 (Phase 3) — Procurement & Inventory

**الهدف:** إدارة المشتريات والمخزون

- [ ] طلبات الشراء (Purchase Requests)
- [ ] أوامر الشراء (Purchase Orders)
- [ ] إدارة الموردين (Suppliers Management)
- [ ] إدارة المستودعات (Warehouses)
- [ ] إدارة المخزون (Inventory Management)
- [ ] جرد المخزون
- [ ] حركة المخزون (In/Out)
- [ ] تقارير المشتريات والمخزون

**المدة التقديرية:** 6 أسابيع

---

## المرحلة 4 (Phase 4) — Subcontractors & Progress Billing

**الهدف:** إدارة مقاولي الباطن والمستخلصات

- [ ] إدارة مقاولي الباطن
- [ ] عقود مقاولي الباطن
- [ ] إنجاز مقاولي الباطن
- [ ] مستخلصات المقاولين
- [ ] اعتماد المستخلصات
- [ ] مستخلصات العملاء
- [ ] شهادات الإنجاز
- [ ] تقارير المقاولين والمستخلصات

**المدة التقديرية:** 5 أسابيع

---

## المرحلة 5 (Phase 5) — Finance & Accounting

**الهدف:** الإدارة المالية والمحاسبية

- [ ] دليل الحسابات (Chart of Accounts)
- [ ] القيود المحاسبية (Journal Entries)
- [ ] حسابات المشاريع (Project Costing)
- [ ] الفواتير (Invoices)
- [ ] المدفوعات والمقبوضات (Payables & Receivables)
- [ ] التدفق النقدي (Cash Flow)
- [ ] المصروفات (Expenses)
- [ ] التقارير المالية (ميزانية، دخل، إلخ)
- [ ] التكامل مع البنوك
- [ ] إقرارات ضريبة القيمة المضافة (VAT)

**المدة التقديرية:** 8 أسابيع

---

## المرحلة 6 (Phase 6) — HR & Equipment

**الهدف:** إدارة الموارد البشرية والمعدات

### الموارد البشرية
- [ ] إدارة الموظفين
- [ ] دوام الموظفين (Attendance)
- [ ] الإجازات (Leave Management)
- [ ] الرواتب والأجور (Payroll)
- [ ] تقييم الأداء
- [ ] العقود الإدارية

### المعدات
- [ ] إدارة أسطول المعدات
- [ ] جدولة المعدات
- [ ] الصيانة الدورية
- [ ] تأجير المعدات
- [ ] استهلاك الوقود

**المدة التقديرية:** 8 أسابيع

---

## المرحلة 7 (Phase 7) — Quality & Safety

**الهدف:** إدارة الجودة والسلامة المهنية

### الجودة (QA/QC)
- [ ] معايير الجودة
- [ ] فحوصات الجودة
- [ ] سجل الاختبارات (ITP)
- [ ] تقارير عدم المطابقة (NCR)
- [ ] الإجراءات التصحيحية (CAR)

### السلامة (HSE)
- [ ] تقييم المخاطر
- [ ] تقارير الحوادث
- [ ] تصاريح العمل
- [ ] تدريب السلامة
- [ ] معدات السلامة
- [ ] خطة السلامة للمشروع (HSE Plan)

**المدة التقديرية:** 6 أسابيع

---

## المرحلة 8 (Phase 8) — AI & Integrations

**الهدف:** الذكاء الاصطناعي والتكاملات

### الذكاء الاصطناعي
- [ ] التنبؤ بتأخر المشاريع
- [ ] تحليل المخاطر الذكي
- [ ] التوصيف الذكي لجداول الكميات
- [ ] مساعد ذكي للمستخدمين (Chatbot)
- [ ] كشف الاحتيال المالي
- [ ] تحسين جدولة الموارد بالذكاء الاصطناعي

### التكاملات
- [ ] API عام للنظام
- [ ] Webhooks
- [ ] التكامل مع منصة اعتماد
- [ ] التكامل مع نظام الدفع (Mada, STC Pay)
- [ ] التكامل مع البريد الإلكتروني
- [ ] التكامل مع SAP / Oracle (للمؤسسات الكبيرة)
- [ ] Single Sign-On (SSO)
- [ ] تطبيق جوال (React Native / Flutter)

**المدة التقديرية:** 12 أسبوعًا

---

## الجدول الزمني الإجمالي

| المرحلة | المحتوى | المدة | الحالة |
|---------|---------|-------|--------|
| الإصدار الحالي | v0.1.0 — البنية الأساسية | — | ✅ مكتمل |
| Phase 1 | Core Projects & Site Operations (Demo) | 6 أسابيع | ✅ مكتمل |
| Phase 1.1 | Demo QA, Polish & Deployment Verification | 1 أسبوع | ✅ مكتمل |
| Phase 2 | Demo CRM, Tenders, BOQ & Contracts | 4 أسابيع | 🔲 |
| Phase 3 | Procurement & Inventory | 6 أسابيع | 🔲 |
| Phase 4 | Subcontractors & Progress Billing | 5 أسابيع | 🔲 |
| Phase 5 | Finance & Accounting | 8 أسابيع | 🔲 |
| Phase 6 | HR & Equipment | 8 أسابيع | 🔲 |
| Phase 7 | Quality & Safety | 6 أسابيع | 🔲 |
| Phase 8 | AI & Integrations | 12 أسبوعًا | 🔲 |

**المجموع التقديري:** 55 أسبوعًا (≈ 13 شهرًا)

---

## الأهداف الاستراتيجية

1. **Q1 2026** — إطلاق الإصدار التجريبي (Phase 1-2) مع شركاء تجريبيين
2. **Q2 2026** — إطلاق تجاري محدود (Phase 3-4)
3. **Q3 2026** — الاكتمال الوظيفي الأساسي (Phase 5-6)
4. **Q4 2026** — النظام المتكامل مع الذكاء الاصطناعي (Phase 7-8)

---

## ملاحظات

- الجدول الزمني تقديري وقد يتغير حسب الأولويات وتعليقات العملاء
- كل مرحلة تشمل: تصميم، تطوير، اختبارات، توثيق
- يتم إصدار تحديثات دورية (كل 2-4 أسابيع)
- يتم جمع تعليقات المستخدمين بعد كل مرحلة
- جميع المراحل تدعم اللغة العربية والإنجليزية
- جميع المراحل تتوافق مع نظام Multi-Tenancy والصلاحيات
