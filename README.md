# JAAD BUILD

**Construction ERP by JAAD CLOUD**

نظام ERP سحابي متكامل مخصص لشركات المقاولات والبناء والتشييد في المملكة العربية السعودية.

من المناقصة إلى التسليم… كل مشروع تحت السيطرة.

## المتطلبات

- Node.js 22.x
- PostgreSQL 15+
- npm 11+

## التقنيات

| التقنية | الاستخدام |
|---------|-----------|
| Next.js 15 | إطار العمل |
| TypeScript | لغة البرمجة |
| Tailwind CSS v4 | التصميم |
| PostgreSQL | قاعدة البيانات |
| Prisma ORM | إدارة قاعدة البيانات |
| Auth.js (NextAuth v5) | المصادقة |
| next-intl | الترجمة |
| Zod | التحقق من البيانات |
| React Hook Form | النماذج |
| TanStack Table | الجداول |
| Recharts | الرسوم البيانية |
| Lucide Icons | الأيقونات |

## التثبيت

```bash
# نسخ المستودع
git clone https://github.com/Techzoneksa/jaadbd.git
cd jaadbd

# تثبيت الاعتماديات
npm install

# إعداد متغيرات البيئة
cp .env.example .env
# عدّل .env بإعدادات قاعدة البيانات الخاصة بك

# إعداد قاعدة البيانات
npx prisma generate
npx prisma db push
npx prisma db seed

# تشغيل المشروع
npm run dev
```

## متغيرات البيئة

| المتغير | الوصف | مثال |
|---------|-------|------|
| DATABASE_URL | رابط PostgreSQL | `postgresql://user:pass@localhost:5432/jaad_build` |
| AUTH_SECRET | مفتاح المصادقة | `openssl rand -base64 32` |
| AUTH_URL | رابط التطبيق | `http://localhost:3000` |
| NEXT_PUBLIC_APP_URL | رابط التطبيق العام | `http://localhost:3000` |
| SEED_ADMIN_PASSWORD | كلمة مرور المشرف الأول | `your-secure-password` |

## أوامر الجودة

```bash
npm run format      # تنسيق الكود
npm run lint        # فحص ESLint
npm run typecheck   # فحص TypeScript
npm run test        # تشغيل الاختبارات
npm run build       # بناء المشروع
```

## بنية المشروع

```
src/
├── app/                    # صفحات Next.js
│   ├── [locale]/
│   │   ├── (marketing)/    # الصفحات التسويقية
│   │   ├── (auth)/         # صفحات المصادقة
│   │   └── (dashboard)/    # لوحة التحكم
│   └── api/               # واجهات API
│
├── components/             # المكونات
│   ├── ui/                 # المكونات الأساسية
│   ├── layout/             # مكونات التخطيط
│   ├── navigation/         # التنقل
│   ├── dashboard/          # لوحة التحكم
│   ├── feedback/           # الإشعارات والنوافذ
│   └── shared/             # مشتركة
│
├── features/               # الوحدات الوظيفية
├── lib/                    # المكتبات
│   ├── auth/               # المصادقة
│   ├── db/                 # قاعدة البيانات
│   ├── permissions/        # الصلاحيات
│   ├── tenancy/            # تعدد الشركات
│   ├── i18n/               # الترجمة
│   ├── formatters/         # تنسيق البيانات
│   └── validation/         # التحقق
│
├── config/                 # الإعدادات
├── constants/              # الثوابت
├── types/                  # أنواع TypeScript
├── hooks/                  # Hooks
├── messages/               # ملفات الترجمة
└── middleware.ts           # الوسيط

prisma/                     # قاعدة البيانات
├── schema.prisma           # مخطط Prisma
└── seed.ts                 # بيانات تجريبية

docs/                       # الوثائق
├── architecture.md
├── design-system.md
└── roadmap.md
```

## نظام Multi-Tenancy

JAAD BUILD يدعم تعدد الشركات (Multi-Tenant):

- كل شركة (Tenant) لها بيانات مستقلة
- جميع الاستعلامات التشغيلية تتضمن `tenantId`
- طبقة حماية تمنع تسرب البيانات بين الشركات
- المستخدم يمكن أن ينتمي إلى عدة شركات

## نظام الصلاحيات

16 دورًا أساسيًا مع صلاحيات محددة:

- PLATFORM_SUPER_ADMIN
- TENANT_OWNER
- EXECUTIVE_MANAGER
- PROJECTS_DIRECTOR
- PROJECT_MANAGER
- SITE_ENGINEER
- PLANNING_ENGINEER
- QUANTITY_SURVEYOR
- PROCUREMENT_MANAGER
- STOREKEEPER
- FINANCE_MANAGER
- ACCOUNTANT
- HR_MANAGER
- HSE_OFFICER
- QA_QC_ENGINEER
- VIEWER

## الحسابات التجريبية

```bash
# المشرف العام
البريد: admin@jaadbuild.com
كلمة المرور: (محددة في SEED_ADMIN_PASSWORD)

# مستخدمي الشركة التجريبية
البريد: owner@ufuq.com
كلمة المرور: Demo@123456
```

## المراحل القادمة

| المرحلة | المحتوى |
|---------|---------|
| Phase 1 | Core Projects & Tasks |
| Phase 2 | Tenders & BOQ |
| Phase 3 | Procurement & Inventory |
| Phase 4 | Subcontractors & Progress Billing |
| Phase 5 | Finance & Accounting |
| Phase 6 | HR & Equipment |
| Phase 7 | Quality & Safety |
| Phase 8 | AI & Integrations |

## الترخيص

جميع الحقوق محفوظة © JAAD CLOUD
