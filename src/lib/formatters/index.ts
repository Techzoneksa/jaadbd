export function formatCurrency(
  amount: number | string | null | undefined,
  currency = "SAR",
  locale = "ar",
): string {
  const value = typeof amount === "string" ? parseFloat(amount) : (amount ?? 0);

  if (locale === "ar") {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(
  value: number | string | null | undefined,
  locale = "ar",
): string {
  const num = typeof value === "string" ? parseFloat(value) : (value ?? 0);
  const lang = locale === "ar" ? "ar-SA" : "en-US";

  return new Intl.NumberFormat(lang, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
}

export function formatPercentage(
  value: number | string | null | undefined,
  locale = "ar",
): string {
  const num = typeof value === "string" ? parseFloat(value) : (value ?? 0);
  const lang = locale === "ar" ? "ar-SA" : "en-US";

  return new Intl.NumberFormat(lang, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(num / 100);
}

export function formatDate(
  date: Date | string | null | undefined,
  locale = "ar",
): string {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  const lang = locale === "ar" ? "ar-SA" : "en-US";

  return new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

export function formatDateRange(
  start: Date | string | null | undefined,
  end: Date | string | null | undefined,
  locale = "ar",
): string {
  const s = start ? formatDate(start, locale) : "-";
  const e = end ? formatDate(end, locale) : "-";
  return `${s} → ${e}`;
}

export function formatRelativeTime(
  date: Date | string | null | undefined,
  locale = "ar",
): string {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (locale === "ar") {
    if (diffMinutes < 1) return "الآن";
    if (diffMinutes < 60) return `منذ ${diffMinutes} دقيقة`;
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    if (diffDays < 7) return `منذ ${diffDays} يوم`;
    if (diffDays < 30) return `منذ ${Math.floor(diffDays / 7)} أسبوع`;
    return formatDate(d, locale);
  }

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return formatDate(d, locale);
}

export function formatDays(days: number, locale = "ar"): string {
  if (locale === "ar") {
    return `${days} يوم`;
  }
  return `${days} days`;
}
