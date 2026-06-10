// Project status configurations
export const PROJECT_STATUSES = [
  { value: "DRAFT", labelKey: "projects.status_draft", color: "gray" as const },
  { value: "PLANNING", labelKey: "projects.status_planning", color: "blue" as const },
  { value: "ACTIVE", labelKey: "projects.status_active", color: "green" as const },
  { value: "ON_HOLD", labelKey: "projects.status_on_hold", color: "orange" as const },
  { value: "DELAYED", labelKey: "projects.status_delayed", color: "red" as const },
  { value: "COMPLETED", labelKey: "projects.status_completed", color: "green" as const },
  { value: "CLOSED", labelKey: "projects.status_closed", color: "gray" as const },
  { value: "CANCELLED", labelKey: "projects.status_cancelled", color: "red" as const },
] as const;

// Project health configurations
export const PROJECT_HEALTH = {
  GREEN: { labelKey: "projects.health_green", color: "green" as const },
  YELLOW: { labelKey: "projects.health_yellow", color: "yellow" as const },
  RED: { labelKey: "projects.health_red", color: "red" as const },
} as const;

// Navigation items for the sidebar
export const SIDEBAR_NAV = [
  { titleKey: "nav.main", href: "/dashboard", icon: "LayoutDashboard" },
  { titleKey: "nav.projects", href: "/dashboard/projects", icon: "HardHat" },
  { titleKey: "nav.clients", icon: "Users", comingSoon: true },
  { titleKey: "nav.tenders", icon: "FileText", comingSoon: true },
  { titleKey: "nav.contracts", icon: "FileSignature", comingSoon: true },
  { titleKey: "nav.site", icon: "Construction", comingSoon: true },
  { titleKey: "nav.procurement", icon: "ShoppingCart", comingSoon: true },
  { titleKey: "nav.inventory", icon: "Warehouse", comingSoon: true },
  { titleKey: "nav.subcontractors", icon: "Handshake", comingSoon: true },
  { titleKey: "nav.progress_billing", icon: "Receipt", comingSoon: true },
  { titleKey: "nav.finance", icon: "Landmark", comingSoon: true },
  { titleKey: "nav.hr", icon: "UserRound", comingSoon: true },
  { titleKey: "nav.equipment", icon: "Tractor", comingSoon: true },
  { titleKey: "nav.quality_safety", icon: "Shield", comingSoon: true },
  { titleKey: "nav.reports", icon: "BarChart3", comingSoon: true },
  { titleKey: "nav.documents", icon: "FolderOpen", comingSoon: true },
  { titleKey: "nav.settings_menu", href: "/dashboard/settings/company", icon: "Settings" },
];

// Permission keys
export const PERMISSIONS = {
  DASHBOARD_VIEW: "dashboard.view",
  PROJECTS_VIEW: "projects.view",
  PROJECTS_CREATE: "projects.create",
  PROJECTS_UPDATE: "projects.update",
  PROJECTS_DELETE: "projects.delete",
  USERS_VIEW: "users.view",
  USERS_INVITE: "users.invite",
  USERS_MANAGE_ROLES: "users.manage_roles",
  SETTINGS_VIEW: "settings.view",
  SETTINGS_UPDATE: "settings.update",
  BILLING_VIEW: "billing.view",
  REPORTS_VIEW: "reports.view",
} as const;

// Role keys
export const ROLES = {
  PLATFORM_SUPER_ADMIN: "PLATFORM_SUPER_ADMIN",
  TENANT_OWNER: "TENANT_OWNER",
  EXECUTIVE_MANAGER: "EXECUTIVE_MANAGER",
  PROJECTS_DIRECTOR: "PROJECTS_DIRECTOR",
  PROJECT_MANAGER: "PROJECT_MANAGER",
  SITE_ENGINEER: "SITE_ENGINEER",
  PLANNING_ENGINEER: "PLANNING_ENGINEER",
  QUANTITY_SURVEYOR: "QUANTITY_SURVEYOR",
  PROCUREMENT_MANAGER: "PROCUREMENT_MANAGER",
  STOREKEEPER: "STOREKEEPER",
  FINANCE_MANAGER: "FINANCE_MANAGER",
  ACCOUNTANT: "ACCOUNTANT",
  HR_MANAGER: "HR_MANAGER",
  HSE_OFFICER: "HSE_OFFICER",
  QA_QC_ENGINEER: "QA_QC_ENGINEER",
  VIEWER: "VIEWER",
} as const;

// Activity types
export const ACTIVITY_EVENTS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  COMPANY_CREATED: "COMPANY_CREATED",
  COMPANY_UPDATED: "COMPANY_UPDATED",
  USER_INVITED: "USER_INVITED",
  USER_ROLE_CHANGED: "USER_ROLE_CHANGED",
  PROJECT_CREATED: "PROJECT_CREATED",
  PROJECT_UPDATED: "PROJECT_UPDATED",
  PROJECT_STATUS_CHANGED: "PROJECT_STATUS_CHANGED",
  SETTINGS_UPDATED: "SETTINGS_UPDATED",
} as const;

// Subscription plans
export const SUBSCRIPTION_PLANS = [
  {
    code: "build_start",
    nameKey: "Build Start",
    maxUsers: 5,
    maxProjects: 3,
    storageLimitMB: 500,
  },
  {
    code: "build_pro",
    nameKey: "Build Pro",
    maxUsers: 20,
    maxProjects: 15,
    storageLimitMB: 2000,
  },
  {
    code: "build_enterprise",
    nameKey: "Build Enterprise",
    maxUsers: -1, // unlimited
    maxProjects: -1,
    storageLimitMB: 10000,
  },
  {
    code: "build_custom",
    nameKey: "Build Custom",
    maxUsers: -1,
    maxProjects: -1,
    storageLimitMB: -1,
  },
] as const;

// Activity types for construction companies
export const COMPANY_ACTIVITIES = [
  { value: "general_contracting", labelAr: "مقاولات عامة" },
  { value: "building", labelAr: "إنشاءات ومبانٍ" },
  { value: "finishing", labelAr: "تشطيبات وديكور" },
  { value: "infrastructure", labelAr: "بنية تحتية" },
  { value: "roads", labelAr: "طرق وجسور" },
  { value: "electrical", labelAr: "مقاولات كهربائية" },
  { value: "mechanical", labelAr: "مقاولات ميكانيكية" },
  { value: "hvac", labelAr: "تكييف وتبريد" },
  { value: "fire_protection", labelAr: "مكافحة حريق" },
  { value: "plumbing", labelAr: "سباكة" },
  { value: "subcontractor", labelAr: "مقاول باطن" },
  { value: "project_management", labelAr: "إدارة مشاريع" },
  { value: "realestate_dev", labelAr: "تطوير عقاري" },
  { value: "maintenance", labelAr: "صيانة وتشغيل" },
  { value: "concrete", labelAr: "أعمال خرسانة وحدادة" },
  { value: "equipment_rental", labelAr: "تأجير معدات" },
];

// Theme colors for the design system
export const DESIGN_TOKENS = {
  colors: {
    navy: { 900: "#091827", 800: "#0C1E33", 700: "#0F2742", 600: "#1A3A5C", 500: "#264D78" },
    amber: { 500: "#F4A62A", 600: "#D98A12", 700: "#B06E0E" },
    steel: { 400: "#94A3B8", 500: "#64748B", 600: "#475569", 700: "#334155" },
    surface: "#F6F8FA",
    success: "#16A36A",
    warning: "#D98A12",
    danger: "#DC3C45",
    info: "#2684FF",
  },
  fonts: {
    arabic: "'IBM Plex Sans Arabic', sans-serif",
    english: "'Inter', sans-serif",
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
  },
};
