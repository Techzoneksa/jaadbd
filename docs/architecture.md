# المعمارية التقنية

## نظرة عامة

JAAD BUILD هو تطبيق ويب من صفحة واحدة (SPA) مع واجهات API مبنية على Next.js 15 (App Router). يستخدم التطبيق نموذج **معمارية طبقات** تفصل بين العرض ومنطق الأعمال والبيانات.

```
┌─────────────────────────────────────────────────┐
│                   الطبقة الأولى                   │
│              Presentation Layer                  │
│  ┌─────────────────────────────────────────┐   │
│  │  Next.js App Router (src/app/[locale])  │   │
│  │  - Marketing Pages                      │   │
│  │  - Auth Pages (login, register, onboarding) │
│  │  - Dashboard Pages                      │   │
│  └─────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│                   الطبقة الثانية                  │
│               Components Layer                  │
│  ┌─────────────────────────────────────────┐   │
│  │  UI (button, card, input, select...)    │   │
│  │  Layout (sidebar, header, shell)        │   │
│  │  Navigation (breadcrumbs)               │   │
│  │  Dashboard (KPI cards, charts)          │   │
│  │  Shared (empty-state, badges, page-header)│  │
│  │  Forms (future)                         │   │
│  └─────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│                   الطبقة الثالثة                  │
│              Application Layer                   │
│  ┌─────────────────────────────────────────┐   │
│  │  Features (auth, projects, settings...) │   │
│  │  Services (operations layer)            │   │
│  │  Repositories (data access)             │   │
│  └─────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│                   الطبقة الرابعة                  │
│                  Library Layer                   │
│  ┌─────────────────────────────────────────┐   │
│  │  Auth - المصادقة والجلسات               │   │
│  │  DB - اتصال Prisma                      │   │
│  │  Permissions - نظام الصلاحيات            │   │
│  │  Tenancy - إدارة تعدد الشركات           │   │
│  │  i18n - الترجمة (ar/en)                  │   │
│  │  Formatters - تنسيق الأرقام والتواريخ   │   │
│  │  Validation - التحقق من البيانات (Zod)  │   │
│  └─────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│                   الطبقة الخامسة                  │
│                 Data / Config                    │
│  ┌─────────────────────────────────────────┐   │
│  │  Config - إعدادات التطبيق               │   │
│  │  Constants - الثوابت (Roles, Statuses)  │   │
│  │  Types - أنواع TypeScript               │   │
│  │  Hooks - React Hooks                    │   │
│  │  Messages - ملفات الترجمة (ar.json, en.json) │
│  └─────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│                   الطبقة السادسة                  │
│               Database Layer                     │
│  ┌─────────────────────────────────────────┐   │
│  │  PostgreSQL 15+                         │   │
│  │  Prisma ORM                             │   │
│  │  Schema (schema.prisma)                 │   │
│  │  Seed (seed.ts)                         │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

## المكدس التقني

| الطبقة | التقنية | الغرض |
|--------|---------|-------|
| إطار العمل | Next.js 15 (App Router) | توجيه الصفحات، SSR، API Routes |
| اللغة | TypeScript 5 | أمان الأنواع |
| التصميم | Tailwind CSS v4 | نظام تصميم ذري |
| الخطوط | IBM Plex Sans Arabic | دعم اللغة العربية |
| قاعدة البيانات | PostgreSQL 15+ | تخزين البيانات |
| ORM | Prisma 6 | إدارة قاعدة البيانات |
| المصادقة | Auth.js (NextAuth v5) | المصادقة بالجلسات JWT |
| الترجمة | next-intl + next-intl/plugin | الترجمة الديناميكية |
| التحقق | Zod 3 | التحقق من صحة البيانات |
| النماذج | React Hook Form | إدارة النماذج |
| الجداول | TanStack Table 8 | جداول البيانات التفاعلية |
| الرسوم | Recharts | الرسوم البيانية |
| الأيقونات | Lucide React | الأيقونات |
| التجزئة | bcryptjs | تجزئة كلمات المرور |
| التواريخ | date-fns | معالجة التواريخ |
| UUID | uuid | المعرفات الفريدة |
| الاختبارات | Vitest + Playwright | اختبارات الوحدة والتكامل |

## المصادقة (Auth)

نظام المصادقة مبني على Auth.js (NextAuth v5) مع استراتيجية JWT:

```
Login Request
     │
     ▼
Credentials Provider
     │
     ▼
bcrypt.compare(password, user.passwordHash)
     │
     ├──失敗 → return null
     │
     └──نجاح → JWT Token (id, email, name, locale)
                    │
                    ▼
              Session Callback
                    │
                    ▼
              session.user = { id, email, name, locale }
```

**حماية المسارات:** Middleware (`src/middleware.ts`) يحمي جميع مسارات `/dashboard/*` و `/onboarding/*` ويعيد التوجيه إلى `/login` في حال عدم وجود جلسة صالحة.

```
middleware.ts
  │
  ├── auth() → تحقق من JWT
  │     │
  │     ├── غير مصرح → redirect("/login")
  │     │
  │     └── مصرح → next()
  │
  └── matcher: ["/dashboard/:path*", "/onboarding/:path*"]
```

## قاعدة البيانات

### المخطط (Schema)

```prisma
// المصادقة
model Account, Session, VerificationToken, Authenticator  // NextAuth models
model User                                                 // المستخدمين

// تعدد الشركات
model Tenant                      // الشركة / المستأجر
model TenantMembership            // عضوية المستخدم في الشركة
model Branch                      // الفروع

// الصلاحيات
model Role                        // الأدوار
model Permission                  // الصلاحيات
model RolePermission              // الربط بين الأدوار والصلاحيات
model UserRole                    // صلاحيات إضافية للمستخدم (لكل مشروع)

// الاشتراكات
model SubscriptionPlan            // خطط الاشتراك
model Subscription                // اشتراكات الشركات

// المشاريع
model Project                     // المشاريع
model ProjectMilestone            // المراحل / المعالم

// الإعدادات
model SystemSetting               // إعدادات النظام
model TenantSetting               // إعدادات الشركة
model CompanyProfile              // ملف الشركة

// الأنشطة والإشعارات
model ActivityLog                 // سجل النشاطات
model Notification                // الإشعارات
```

### العلاقات الرئيسية

```
Tenant 1──N TenantMembership N──1 User
Tenant 1──N Project
Tenant 1──N Branch
Tenant 1──1 CompanyProfile
Tenant 1──N Subscription N──1 SubscriptionPlan
User    1──N TenantMembership N──1 Role
Role    1──N RolePermission N──1 Permission
User    1──N UserRole N──1 Role
User    1──N UserRole N──1 Project
Project 1──N ProjectMilestone
```

### الفهارس (Indexes)

- `TenantMembership`: unique on `[tenantId, userId]`, indexed on `tenantId`, `userId`
- `UserRole`: unique on `[userId, roleId, projectId]`, indexed on `userId`, `projectId`
- `Project`: indexed on `tenantId`, `status`, `managerId`
- `ActivityLog`: indexed on `tenantId`, `userId`, `createdAt`
- `Notification`: indexed on `tenantId`, `userId`, `isRead`
- `Tenant`: indexed on `status`
- `TenantSetting`: unique on `[tenantId, key]`, indexed on `tenantId`

## نظام Multi-Tenancy

كل عملية في قاعدة البيانات تتضمن `tenantId` لضمان عزل البيانات بين الشركات:

```
requireTenantContext()
  │
  ├── auth() → get session
  │     │
  │     ├── لا يوجد جلسة → throw UNAUTHORIZED
  │     │
  │     └── يوجد جلسة → جلب أول عضوية نشطة للمستخدم
  │           │
  │           ├── لا يوجد عضوية → throw NO_TENANT_ACCESS
  │           │
  │           └── يوجد عضوية → return { tenantId, tenantSlug, userId }
```

**وظائف مساعدة:**
- `withTenantScope(tenantId)` → تُرجع شرط `{ tenantId, deletedAt: null }` للاستعلامات
- `verifyTenantAccess(tenantId)` → تتحقق من صلاحية الوصول للشركة

## نظام الصلاحيات (RBAC)

```
16 دورًا أساسيًا:
  ├── PLATFORM_SUPER_ADMIN    (صلاحية كاملة على المنصة)
  ├── TENANT_OWNER            (مالك الشركة)
  ├── EXECUTIVE_MANAGER       (مدير تنفيذي)
  ├── PROJECTS_DIRECTOR       (مدير مشاريع)
  ├── PROJECT_MANAGER         (مدير مشروع)
  ├── SITE_ENGINEER           (مهندس موقع)
  ├── PLANNING_ENGINEER       (مهندس تخطيط)
  ├── QUANTITY_SURVEYOR       (مساح كميات)
  ├── PROCUREMENT_MANAGER     (مدير مشتريات)
  ├── STOREKEEPER             (أمين مستودع)
  ├── FINANCE_MANAGER         (مدير مالي)
  ├── ACCOUNTANT              (محاسب)
  ├── HR_MANAGER              (مدير موارد بشرية)
  ├── HSE_OFFICER             (مسؤول سلامة)
  ├── QA_QC_ENGINEER          (مهندس جودة)
  └── VIEWER                  (مشاهد فقط)
```

**آلية التحقق:**
```
hasPermission(userId, tenantId, permissionKey)
  │
  ├── getUserPermissions(userId, tenantId)
  │     │
  │     └── Prisma: Role → TenantMembership → RolePermission → Permission
  │
  └── permissions.includes(permissionKey)
```

**الصلاحيات المتاحة:**
- `dashboard.view`
- `projects.view`, `projects.create`, `projects.update`, `projects.delete`
- `users.view`, `users.invite`, `users.manage_roles`
- `settings.view`, `settings.update`
- `billing.view`
- `reports.view`

## التوجيه (Routing)

### هيكل المسارات

```
/                                   → Marketing (Homepage)
/[locale]                           → الصفحات المعربة
├── (marketing)/                    → الصفحات التسويقية
│   ├── page.tsx                    → الرئيسية
│   ├── features/                   → المميزات
│   ├── solutions/                  → الحلول
│   ├── pricing/                    → الأسعار
│   └── contact/                    → اتصل بنا
├── (auth)/                         → المصادقة
│   ├── login/                      → تسجيل الدخول
│   ├── register/                   → إنشاء حساب
│   └── onboarding/                 → الإعداد الأولي
└── (dashboard)/                    → لوحة التحكم
    ├── layout.tsx                  → تخطيط اللوحة (DashboardShell)
    └── dashboard/                  → الصفحة الرئيسية للوحة
        ├── page.tsx
        ├── projects/
        ├── settings/
        └── ... (coming soon)

/api                                → واجهات API
    └── auth/[...nextauth]         → NextAuth API Route
```

### Group Routes

استخدام `(auth)`, `(dashboard)`, `(marketing)` كـ Route Groups لفصل المناطق المختلفة مع إمكانية مشاركة التخطيطات:

```
[locale]/
  ├── layout.tsx                   → تخطيط مشترك (dir, lang, font)
  ├── (marketing)/layout.tsx       → تخطيط تسويقي
  ├── (auth)/layout.tsx            → تخطيط المصادقة
  └── (dashboard)/layout.tsx       → تخطيط لوحة التحكم (DashboardShell)
```

## الترجمة (i18n)

استخدام `next-intl` مع ملفات JSON:

```
messages/
  ├── ar.json    → الترجمة العربية
  └── en.json    → الترجمة الإنجليزية

src/
  ├── i18n/
  │   └── request.ts               → تكوين next-intl
  └── lib/
      └── i18n/index.ts            → تحميل وتبسيط ملفات الترجمة
```

**آلية العمل:**
1. `next-intl/plugin` يعترض الطلبات ويحدد اللغة
2. `request.ts` يستدعي `loadMessages(locale)` لتحميل الترجمة المناسبة
3. `loadMessages` يستورد ملف JSON ويفلتره إلى key/value مسطحة
4. المكونات تستخدم `useTranslations()` من next-intl

## التصميم (Styling)

Tailwind CSS v4 مع Custom Properties:

- `globals.css` يعرّف Custom Properties للألوان والظلال والخطوط
- دعم كامل للوضع الداكن (Dark Mode) عبر class `.dark`
- دعم RTL عبر سمة `dir` على عنصر `html`
- خط IBM Plex Sans Arabic للعربية و Inter للإنجليزية

## المكونات (Components)

جميع المكونات مبنية بنمط **Atomic Design**:

| المستوى | المكونات |
|---------|----------|
| Atoms | Button, Badge, Input, Select, Skeleton |
| Molecules | Card (Header, Title, Description, Content, Footer) |
| Organisms | Sidebar, Header, DataTable, KPICard |
| Templates | DashboardShell, MarketingLayout |
| Pages | جميع صفحات Next.js في `/app` |

## سير العمل

### 1. تسجيل شركة جديدة

```
Register → إنشاء حساب مستخدم → Onboarding → إنشاء Tenant + عضوية + مشروع أول
```

### 2. تسجيل الدخول

```
Login → Credentials Provider → JWT → Middleware → Dashboard
```

### 3. إنشاء مشروع

```
Dashboard → Projects → Create Project → Prisma → PostgreSQL
              │                           │
              └── Zod Validation ←─────┘
```

## الأمان

1. **JWT Tokens**: جميع الجلسات مشفرة باستخدام `AUTH_SECRET`
2. **تجزئة كلمات المرور**: bcryptjs مع 12 جولة (Rounds)
3. **حماية API**: Middleware يحمي مسارات لوحة التحكم
4. **عزل البيانات**: جميع الاستعلامات تتضمن `tenantId`
5. **التحقق من الصلاحيات**: `requirePermission()` قبل كل عملية حساسة
6. **Rate Limiting**: 60 طلب في الدقيقة للـ API
7. **سجل النشاطات**: `ActivityLog` يسجل جميع الأحداث الهامة
8. **Soft Delete**: استخدام `deletedAt` للحذف الآمن
