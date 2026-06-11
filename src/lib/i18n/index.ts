type Messages = Record<string, string>;

let arMessages: Messages = {};
let enMessages: Messages = {};

function flattenMessages(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any>,
  prefix = "",
): Messages {
  return Object.keys(obj).reduce((acc: Messages, key: string) => {
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(acc, flattenMessages(value, prefixedKey));
    } else {
      acc[prefixedKey] = String(value);
    }
    return acc;
  }, {});
}

export async function loadMessages(locale: string): Promise<Messages> {
  if (locale === "ar" && Object.keys(arMessages).length > 0) return arMessages;
  if (locale === "en" && Object.keys(enMessages).length > 0) return enMessages;

  try {
    if (locale === "ar") {
      const mod = await import("@/../messages/ar.json");
      arMessages = flattenMessages(mod.default || mod);
      return arMessages;
    }
    const mod = await import("@/../messages/en.json");
    enMessages = flattenMessages(mod.default || mod);
    return enMessages;
  } catch {
    return {};
  }
}

export function getDirection(locale: string): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function isRtl(locale: string): boolean {
  return locale === "ar";
}

export function t(key: string, locale: string, messages?: Messages): string {
  if (!messages) return key;
  return messages[key] || key;
}
