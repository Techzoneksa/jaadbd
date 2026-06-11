# نموذج بيانات العرض التجريبي (Demo Data Model)

## نظرة عامة

بيانات العرض التجريبي (Demo Data) هي بيانات مدمجة في الكود تستخدم لتجربة النظام دون الحاجة إلى PostgreSQL أو أي قاعدة بيانات خارجية. يتم تفعيلها عبر `NEXT_PUBLIC_DEMO_MODE=true`.

## المصادر

جميع البيانات موجودة في `src/demo/data/`:

| الملف | المحتوى |
|-------|---------|
| `company.ts` | بيانات الشركة التجريبية |
| `projects.ts` | 8 مشاريع |
| `users.ts` | 12 مستخدم (بأدوار مختلفة) |
| `tasks.ts` | 50 مهمة موزعة على المشاريع |
| `milestones.ts` | 40 milestone |
| `daily-reports.ts` | 15 تقرير يومي |
| `risks.ts` | 31 مخاطرة |
| `activities.ts` | 25 نشاط |
| `notifications.ts` | 13 إشعار |
| `index.ts` | تجميع وتصدير جميع البيانات |

## المشاريع (8 مشاريع)

| المشروع | الحالة | المخاطرة | الصحة |
|---------|--------|----------|-------|
| مجمع الروضة السكني | ACTIVE | MEDIUM | YELLOW |
| برج الأعمال المركزي | DELAYED | HIGH | RED |
| طريق الملك فهد السريع | ACTIVE | MEDIUM | YELLOW |
| مستشفى الملك سلمان | ACTIVE | LOW | GREEN |
| مجمع الوادي التجاري | PLANNING | LOW | GREEN |
| مشروع البنية التحتية | ACTIVE | HIGH | YELLOW |
| مجمع الفرسان السكني | COMPLETED | MEDIUM | GREEN |
| مبنى الإدارة العامة | ACTIVE | LOW | GREEN |

## المهام (50 مهمة)

- موزعة على المشاريع بنسب متفاوتة
- حالات: TODO, IN_PROGRESS, IN_REVIEW, BLOCKED, COMPLETED, CANCELLED
- أولويات: LOW, MEDIUM, HIGH, URGENT
- كل مهمة تحتوي على وصف، تاريخ بداية، تاريخ استحقاق، و tags
- بعض المهام تحتوي على checklist (قائمة فرعية)

## Milestones (40 milestone)

- 4-6 milestones لكل مشروع
- تحتوي على نسبة إنجاز، تاريخ بداية، تاريخ نهاية
- حالات: NOT_STARTED, IN_PROGRESS, COMPLETED, DELAYED

## التقارير اليومية (15 تقرير)

- موزعة على المشاريع النشطة
- تحتوي على: الأعمال المنفذة، العمالة، المعدات، المواد، التأخيرات، السلامة
- حالات: DRAFT, SUBMITTED, APPROVED, RETURNED

## المخاطر (31 مخاطرة)

- موزعة على المشاريع
- تحتوي على: الاحتمالية (1-5)، التأثير (1-5)
- Risk Score = Probability × Impact
- مستويات: LOW (1-4), MEDIUM (5-9), HIGH (10-19), CRITICAL (20+)
- حالات: OPEN, MONITORING, MITIGATING, CLOSED

## المستخدمون (12 مستخدم)

| الاسم | الدور |
|-------|-------|
| م. عبدالله القحطاني | مالك الشركة |
| م. نايف الدوسري | مدير تنفيذي |
| م. أحمد السعيد | مدير المشاريع |
| م. خالد العمري | مدير مشروع |
| م. فهد القحطاني | مهندس موقع |
| م. محمد الحربي | مهندس تخطيط |
| م. سليمان الشمري | مهندس موقع |
| م. عبدالرحمن العتيبي | مساح كميات |
| أ. سارة العنزي | مدير مالي |
| أ. عبدالله المطيري | مدير مشتريات |
| م. فيصل الزهراني | مسؤول سلامة |
| م. تركي المالكي | مهندس جودة |

## الحسابات

- `expectedProfit = contractValue - forecastAtCompletion`
- `profitMargin = (expectedProfit / contractValue) × 100`
- `progressVariance = actualProgress - plannedProgress`
- `monthlyRevenue = totalContractValue / 12`

## Project Health

يتم حساب صحة المشروع بناءً على:
- `progressVariance < -10` → مؤشر سلبي
- `expectedProfit < 0` → مؤشر سلبي
- `forecastAtCompletion > budget × 1.1` → مؤشر سلبي
- `delayDays > 30` → مؤشر سلبي
- `riskLevel === CRITICAL || HIGH` → مؤشر سلبي

**النتيجة:**
- 0 مؤشرات سلبية → GREEN (سليم)
- 1-2 مؤشرات سلبية → YELLOW (متوسط)
- 3+ مؤشرات سلبية → RED (متعثر)

## إعادة التعيين (Reset)

كل مستودع Demo يحتفظ بنسخة أصلية من البيانات (`ORIGINAL_DATA`). عند استدعاء `resetDemoData()`:

1. يتم تفريغ المصفوفة الأصلية
2. يتم إعادة تعبئتها من النسخة المحفوظة
3. تعود جميع المشاريع والمهام والتقارير والمخاطر إلى حالتها الأصلية
