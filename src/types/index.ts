// Navigation types
export interface NavItem {
  titleKey: string;
  href?: string;
  icon?: string;
  disabled?: boolean;
  comingSoon?: boolean;
  external?: boolean;
  badge?: string;
  children?: NavItem[];
}

// Pagination
export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// API Response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Select option type
export interface SelectOption {
  value: string;
  label: string;
  labelEn?: string;
}

// Filter types
export interface FilterOption {
  key: string;
  label: string;
  type: "text" | "select" | "date" | "number" | "boolean";
  options?: SelectOption[];
}

// Status config
export interface StatusConfig {
  value: string;
  labelKey: string;
  color: "green" | "yellow" | "red" | "blue" | "gray" | "orange";
  icon?: string;
}

// Breadcrumb
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// KPI Card data
export interface KPICardData {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: string;
  trend?: "up" | "down" | "neutral";
  color?: "primary" | "success" | "warning" | "danger" | "info";
  isLoading?: boolean;
}
