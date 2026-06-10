import { getRequestConfig } from "next-intl/server";
import { loadMessages } from "@/lib/i18n";

export default getRequestConfig(async () => {
  const locale = "ar";
  const messages = await loadMessages(locale);

  return {
    locale,
    messages,
  };
});
