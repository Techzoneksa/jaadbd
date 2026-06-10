export const config = {
  app: {
    name: "JAAD BUILD",
    description: "Construction ERP by JAAD CLOUD",
    tagline: "من المناقصة إلى التسليم… كل مشروع تحت السيطرة.",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    locale: "ar",
    supportedLocales: ["ar", "en"],
    defaultLocale: "ar",
    direction: "rtl" as const,
    timezone: "Asia/Riyadh",
    currency: "SAR",
  },
  auth: {
    secret: process.env.AUTH_SECRET,
    sessionMaxAge: 30 * 24 * 60 * 60, // 30 days
    bcryptRounds: 12,
  },
  db: {
    url: process.env.DATABASE_URL,
  },
  tenant: {
    maxUsers: 100,
    maxProjects: 50,
  },
  limits: {
    fileUploadMaxSize: 10 * 1024 * 1024, // 10MB
    allowedImageTypes: ["image/png", "image/jpeg", "image/webp", "image/svg+xml"],
    pagination: {
      defaultPageSize: 10,
      maxPageSize: 100,
    },
  },
  api: {
    rateLimit: {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 60,
    },
  },
};
