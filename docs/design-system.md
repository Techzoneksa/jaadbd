# نظام التصميم (Design System)

## الألوان

### اللوحة الأساسية (Navy Primary)

| الرمز | الاستخدام | HEX |
|-------|-----------|-----|
| `--color-primary-900` | أعمق درجة | `#091827` |
| `--color-primary-800` | خلفية التذييل | `#0C1E33` |
| `--color-primary-700` | الأزرار الأساسية، الشريط الجانبي النشط | `#0F2742` |
| `--color-primary-600` | hover الأزرار | `#1A3A5C` |
| `--color-primary-500` | حدود، عناصر ثانوية | `#264D78` |
| `--color-primary-400` | عناصر توضيحية | `#3A6B9F` |
| `--color-primary-300` | عناصر توضيحية فاتحة | `#5A8BC4` |

### اللون المميز (Construction Amber)

| الرمز | الاستخدام | HEX |
|-------|-----------|-----|
| `--color-accent-500` | التأكيدات، الشعار، التركيز | `#F4A62A` |
| `--color-accent-600` | hover | `#D98A12` |
| `--color-accent-700` | active | `#B06E0E` |

### الرمادي الفولاذي (Steel Gray)

| الرمز | الاستخدام | HEX |
|-------|-----------|-----|
| `--color-steel-400` | نص من الدرجة الثالثة | `#94A3B8` |
| `--color-steel-500` | نص من الدرجة الثانية | `#64748B` |
| `--color-steel-600` | نص ثانوي | `#475569` |
| `--color-steel-700` | نص أساسي | `#334155` |

### الألوان الدلالية (Semantic)

| الرمز | الاستخدام | HEX |
|-------|-----------|-----|
| `--color-success` | النجاح، المكتمل | `#16A36A` |
| `--color-warning` | التحذير، قيد الانتظار | `#D98A12` |
| `--color-danger` | الخطأ، ملغي، خطر | `#DC3C45` |
| `--color-info` | المعلومات، إرشادي | `#2684FF` |

### الأسطح (Surfaces)

| الرمز | الفاتح | الداكن |
|-------|--------|--------|
| `--bg-primary` | `#FFFFFF` | `#0F172A` |
| `--bg-secondary` | `#F6F8FA` | `#1E293B` |
| `--bg-tertiary` | `#EEF1F5` | `#334155` |

### النصوص (Text)

| الرمز | الفاتح | الداكن |
|-------|--------|--------|
| `--text-primary` | `#0F172A` | `#F1F5F9` |
| `--text-secondary` | `#475569` | `#94A3B8` |
| `--text-tertiary` | `#94A3B8` | `#64748B` |
| `--text-inverse` | `#FFFFFF` | `#0F172A` |

### الحدود (Borders)

| الرمز | الفاتح | الداكن |
|-------|--------|--------|
| `--border-primary` | `#E2E8F0` | `#334155` |
| `--border-secondary` | `#CBD5E1` | `#475569` |

## الخطوط (Fonts)

| المتغير | الخط | الاستخدام |
|---------|------|-----------|
| `--font-arabic` | IBM Plex Sans Arabic | النصوص العربية (RTL) |
| `--font-english` | Inter | النصوص الإنجليزية (LTR) |

- المصدر: `@fontsource/ibm-plex-sans-arabic`
- الوضع RTL: `body` يستخدم `--font-arabic`
- الوضع LTR: `body` يستخدم `--font-english`

## الظلال (Shadows)

| الرمز | القيمة |
|-------|--------|
| `--shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` |
| `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1)` |
| `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1)` |
| `--shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1)` |

## الزوايا (Border Radius)

| الرمز | القيمة |
|-------|--------|
| `--radius-sm` | `0.375rem` (6px) |
| `--radius-md` | `0.5rem` (8px) |
| `--radius-lg` | `0.75rem` (12px) |
| `--radius-xl` | `1rem` (16px) |
| `--radius-full` | `9999px` (دوائر) |

## الحركة (Transitions & Animations)

### السرعات

| الرمز | المدة |
|-------|-------|
| `--transition-fast` | 150ms ease |
| `--transition-normal` | 250ms ease |
| `--transition-slow` | 350ms ease |

### الرسوم المتحركة (Keyframes)

| الاسم | الوصف |
|------|-------|
| `fadeIn` | ظهور تدريجي (opacity 0 → 1) |
| `slideInUp` | انزلاق للأعلى مع ظهور |
| `slideInRight` | انزلاق لليمين مع ظهور (للمحتوى الجديد) |
| `slideInLeft` | انزلاق لليسار مع ظهور |
| `pulse` | نبض (لحالات التحميل Skeleton) |
| `spin` | دوران مستمر |

### كلاسات المساعدة

| الكلاس | الاستخدام |
|--------|-----------|
| `.animate-fade-in` | ظهور تدريجي للعناصر |
| `.animate-slide-up` | ظهور العناصر من الأسفل |
| `.animate-slide-right` | ظهور العناصر من اليسار |
| `.animate-slide-down` | (يُضاف لاحقًا) |

## المكونات

### Button (`src/components/ui/button.tsx`)

```tsx
<Button variant="primary" size="md" isLoading>
  حفظ
</Button>
```

| Prop | القيم |
|------|-------|
| `variant` | `primary` (افتراضي)، `secondary`، `outline`، `ghost`، `danger` |
| `size` | `sm` (h-8 px-3)، `md` (h-10 px-4، افتراضي)، `lg` (h-12 px-6) |
| `isLoading` | boolean - يظهر دائرة تحميل |
| `leftIcon` | ReactNode - أيقونة على اليسار |
| `rightIcon` | ReactNode - أيقونة على اليمين |
| `disabled` | boolean - تعطيل الزر |

### Card (`src/components/ui/card.tsx`)

```tsx
<Card>
  <CardHeader>
    <CardTitle>عنوان البطاقة</CardTitle>
    <CardDescription>وصف البطاقة</CardDescription>
  </CardHeader>
  <CardContent>المحتوى</CardContent>
  <CardFooter>التذييل</CardFooter>
</Card>
```

| المكون | الوصف |
|--------|-------|
| `Card` | غلاف البطاقة (حاوية `.card`) |
| `CardHeader` | رأس البطاقة (flex column, gap, margin) |
| `CardTitle` | عنوان البطاقة (text-lg font-semibold) |
| `CardDescription` | وصف البطاقة (text-sm text-secondary) |
| `CardContent` | محتوى البطاقة |
| `CardFooter` | تذييل البطاقة (flex, border-top, mt-4) |

### Badge (`src/components/ui/badge.tsx`)

```tsx
<Badge variant="green">نشط</Badge>
```

| Prop | القيم |
|------|-------|
| `variant` | `green`، `yellow`، `red`، `blue`، `gray` (افتراضي)، `orange` |

### Input (`src/components/ui/input.tsx`)

```tsx
<Input label="البريد الإلكتروني" error="الحقل مطلوب" required />
```

| Prop | الوصف |
|------|-------|
| `label` | نص التسمية |
| `error` | نص الخطأ (يظهر باللون الأحمر) |
| `helperText` | نص مساعد (يظهر بالرمادي) |
| `required` | يظهر علامة `*` حمراء |
| `...InputHTMLAttributes` | جميع خصائص input العادية |

### Select (`src/components/ui/select.tsx`)

```tsx
<Select label="المدينة" options={[{value:"1", label:"الرياض"}]} placeholder="اختر..." />
```

| Prop | الوصف |
|------|-------|
| `label` | نص التسمية |
| `error` | نص الخطأ |
| `options` | مصفوفة `{value, label}` |
| `placeholder` | خيار افتراضي فارغ |

### Skeleton (`src/components/ui/skeleton.tsx`)

```tsx
<Skeleton className="h-4 w-24" />
<SkeletonCard />
<SkeletonTable rows={5} />
```

| المكون | الوصف |
|--------|-------|
| `Skeleton` | عنصر تحميل مخصص (ارتفاع/عرض حسب الكلاس) |
| `SkeletonCard` | بطاقة تحميل جاهزة |
| `SkeletonTable` | جدول تحميل بعدد صفوف محدد |

### StatusBadge (`src/components/shared/status-badge.tsx`)

```tsx
<StatusBadge status="ACTIVE" label="نشط" />
```

| الحالة | لون Badge |
|--------|-----------|
| `ACTIVE`, `COMPLETED`, `GREEN` | green |
| `PLANNING`, `IN_PROGRESS` | blue |
| `YELLOW`, `ON_HOLD`, `DELAYED` | yellow / orange |
| `DRAFT`, `CLOSED` | gray |
| `CANCELLED`, `RED`, `CRITICAL` | red |

### KPICard (`src/components/dashboard/kpi-card.tsx`)

```tsx
<KPICard
  title="إجمالي المشاريع"
  value="42"
  change={12.5}
  trend="up"
  color="primary"
  icon={<HardHat className="h-5 w-5 text-white" />}
/>
```

| Prop | القيم |
|------|-------|
| `color` | `primary`، `success`، `warning`، `danger`، `info` |
| `trend` | `up`، `down`، `neutral` |
| `isLoading` | boolean - يظهر Skeleton |

### PageHeader (`src/components/shared/page-header.tsx`)

```tsx
<PageHeader title="المشاريع" description="قائمة بجميع المشاريع">
  <Button>مشروع جديد</Button>
</PageHeader>
```

### EmptyState (`src/components/shared/empty-state.tsx`)

```tsx
<EmptyState
  icon={<FolderOpen className="h-12 w-12" />}
  title="لا توجد مشاريع"
  description="لم يتم إنشاء أي مشاريع بعد"
  action={{ label: "إنشاء مشروع", onClick: () => {} }}
/>
```

### Breadcrumbs (`src/components/navigation/breadcrumbs.tsx`)

```tsx
<Breadcrumbs items={[
  { label: "المشاريع", href: "/dashboard/projects" },
  { label: "مشروع الرياض" },
]} />
```

## التخطيط (Layout)

### DashboardShell (`src/components/layout/dashboard-shell.tsx`)

هيكل لوحة التحكم الرئيسي:

```
┌─────────────────────────────────────────┐
│                  Header                  │
│  [Menu] [Search] [Lang] [Dark] [Notif] [User] │
├──────────┬──────────────────────────────┤
│          │                              │
│  Sidebar │        Main Content          │
│  (64/16rem)│     (p-4 lg:p-6)           │
│          │                              │
│          │                              │
└──────────┴──────────────────────────────┘
```

### Sidebar (`src/components/layout/sidebar.tsx`)

- مثبتة على اليمين (RTL)
- عرض قابل للطي: `w-64` (مفرد) / `w-16` (مطوي)
- قائمة تنقل رئيسية مع أيقونات Lucide
- عناصر "قريبًا" (coming soon) مع شارة
- إظهار/إخفاء تلقائي على الشاشات الصغيرة (overlay)

### Header (`src/components/layout/header.tsx`)

- شريط علوي ثابت (sticky)
- بحث عالمي
- تبديل اللغة (ar/en)
- تبديل الوضع (فاتح/داكن)
- قائمة الإشعارات المنسدلة
- قائمة المستخدم المنسدلة

## الوضع الداكن (Dark Mode)

يُفعَّل بإضافة كلاس `.dark` على عنصر `html`:

```tsx
document.documentElement.classList.toggle("dark");
```

جميع Custom Properties تتغير تلقائيًا عبر المعرفات المكررة داخل `.dark { }`.

## حالة التحميل (Loading States)

كل صفحة تدعم ثلاث حالات:

1. **Loading**: Skeleton components (KPICard مع `isLoading`، SkeletonTable، SkeletonCard)
2. **Empty**: EmptyState component مع أيقونة ورسالة وإجراء
3. **Error**: (يُضاف لاحقًا)

## النماذج (Forms)

تستخدم React Hook Form مع Zod للتحقق:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});
```

**Zod Schemas المتاحة** (`src/lib/validation/index.ts`):
- `loginSchema`
- `registerSchema`
- `companyProfileSchema`
- `projectSchema`
- `inviteUserSchema`
- `onboardingCompanySchema`
- `onboardingProjectSchema`

## تنسيق البيانات (Formatters)

جميع الدوال في `src/lib/formatters/index.ts`:

| الدالة | الوصف | المثال |
|--------|-------|--------|
| `formatCurrency(value, currency, locale)` | تنسيق العملة | `١٬٥٠٠٫٠٠ ر.س.` |
| `formatNumber(value, locale)` | تنسيق الأرقام | `١٬٢٣٤٫٥٦` |
| `formatPercentage(value, locale)` | تنسيق النسبة | `٧٥٫٠٪` |
| `formatDate(date, locale)` | تنسيق التاريخ | `١٥ يناير ٢٠٢٦` |
| `formatDateRange(start, end, locale)` | تنسيق نطاق تاريخ | `١ يناير → ٣١ يناير` |
| `formatRelativeTime(date, locale)` | وقت نسبي | `منذ ٥ دقائق` |
| `formatDays(days, locale)` | تنسيق الأيام | `٣٠ يوم` |

## أدوات مساعدة (Utils)

جميع الدوال في `src/lib/utils/index.ts`:

| الدالة | الوصف |
|--------|-------|
| `cn(...inputs)` | دمج classNames (مثل clsx) |
| `generateId()` | UUID v4 |
| `sleep(ms)` | تأخير (Promise) |
| `truncate(str, length)` | قص النص + `…` |
| `getInitials(name)` | الأحرف الأولى من الاسم |
| `debounce(fn, delay)` | منع التكرار |
| `formatFileSize(bytes)` | تنسيق حجم الملف (B, KB, MB, GB) |

## كلاسات CSS العامة (globals.css)

### كلاسات مفيدة

| الكلاس | الاستخدام |
|--------|-----------|
| `.card` | بطاقة بحدود وظل وظل hover |
| `.badge` | شارة أساسية |
| `.badge-{color}` | شارة ملونة (green, yellow, red, blue, gray, orange) |
| `.data-table` | جدول بيانات (th محددة مسبقًا) |
| `.skeleton` | عنصر تحميل متحرك |

### Scrollbar

شريط تمرير مخصص بعرض 6px ولون فولاذي.

### Focus

جميع العناصر القابلة للتركيز تستخدم `outline` بلون `--color-accent-500`.

### Selection

النص المحدد يظهر بلون أبيض على خلفية `--color-primary-700`.

## التجاوب (Responsive)

| الشاشة | Sidebar | Header |
|--------|---------|--------|
| `< 1024px` | Overlay (مخفي بالافتراضي) | يظهر زر Menu |
| `≥ 1024px` | مثبت (visible) | مخفي زر Menu |

**Breakpoints المستخدمة:**
- شريط البحث: مخفي تحت `md` (768px)
- زر الإضافة السريع: مخفي تحت `sm` (640px)
- قائمة المستخدم: اسم المستخدم مخفي تحت `md`

## أيقونات Lucide المستخدمة

- `LayoutDashboard` - الرئيسية
- `HardHat` - المشاريع
- `Users` - العملاء
- `FileText` - المناقصات
- `FileSignature` - العقود
- `Construction` - الموقع والتنفيذ
- `ShoppingCart` - المشتريات
- `Warehouse` - المستودعات
- `Handshake` - مقاولو الباطن
- `Receipt` - المستخلصات
- `Landmark` - المالية
- `UserRound` - الموارد البشرية
- `Tractor` - المعدات
- `Shield` - الجودة والسلامة
- `BarChart3` - التقارير
- `FolderOpen` - المستندات
- `Settings` - الإعدادات
- `Building2` - الشعار
- `Bell` - الإشعارات
- `Search` - البحث
- `Moon` / `Sun` - الوضع الليلي/النهاري
- `Globe` - تبديل اللغة
- `ChevronLeft` / `ChevronRight` - طي القائمة
- `ChevronDown` - القوائم المنسدلة
- `Menu` / `X` - القائمة المتنقلة
- `User` - الملف الشخصي
- `LogOut` - تسجيل الخروج
- `TrendingUp` / `TrendingDown` / `Minus` - اتجاهات KPIs
- `Home` - مسار التنقل (Breadcrumbs)
- `Loader2` - حالة التحميل
- `Plus` - إضافة سريعة
