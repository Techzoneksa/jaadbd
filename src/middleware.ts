import createMiddleware from "next-intl/middleware";
import { auth } from "@/lib/auth";
import { routing } from "@/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default auth((req: NextRequest & { auth: unknown }) => {
  const response = intlMiddleware(req);

  if (response.status >= 300 && response.status < 400) {
    return response;
  }

  const pathname = req.nextUrl.pathname.replace(/^\/(ar|en)/, "");

  if (
    !req.auth &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding"))
  ) {
    const locale = req.nextUrl.pathname.match(/^\/(ar|en)/)?.[1] || "ar";
    const loginUrl = new URL(`/${locale}/login`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
});

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
