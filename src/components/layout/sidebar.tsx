"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, HardHat, Users, FileText, FileSignature,
  Construction, ShoppingCart, Warehouse, Handshake, Receipt,
  Landmark, UserRound, Tractor, Shield, BarChart3, FolderOpen,
  Settings, ChevronLeft, ChevronRight, Menu, X, Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  titleKey: string;
  href?: string;
  icon: string;
  comingSoon?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { titleKey: "الرئيسية", href: "/dashboard", icon: "LayoutDashboard" },
  { titleKey: "المشاريع", href: "/dashboard/projects", icon: "HardHat" },
  { titleKey: "العملاء والفرص", icon: "Users", comingSoon: true },
  { titleKey: "المناقصات", icon: "FileText", comingSoon: true },
  { titleKey: "العقود", icon: "FileSignature", comingSoon: true },
  { titleKey: "الموقع والتنفيذ", icon: "Construction", comingSoon: true },
  { titleKey: "المشتريات", icon: "ShoppingCart", comingSoon: true },
  { titleKey: "المستودعات", icon: "Warehouse", comingSoon: true },
  { titleKey: "مقاولو الباطن", icon: "Handshake", comingSoon: true },
  { titleKey: "المستخلصات", icon: "Receipt", comingSoon: true },
  { titleKey: "المالية", icon: "Landmark", comingSoon: true },
  { titleKey: "الموارد البشرية", icon: "UserRound", comingSoon: true },
  { titleKey: "المعدات", icon: "Tractor", comingSoon: true },
  { titleKey: "الجودة والسلامة", icon: "Shield", comingSoon: true },
  { titleKey: "التقارير", icon: "BarChart3", comingSoon: true },
  { titleKey: "المستندات", icon: "FolderOpen", comingSoon: true },
  { titleKey: "الإعدادات", href: "/dashboard/settings/company", icon: "Settings" },
];

const iconMap: Record<string, React.ComponentType<any>> = {
  LayoutDashboard, HardHat, Users, FileText, FileSignature,
  Construction, ShoppingCart, Warehouse, Handshake, Receipt,
  Landmark, UserRound, Tractor, Shield, BarChart3, FolderOpen, Settings,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
      
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 h-full bg-[var(--bg-primary)] border-l border-[var(--border-primary)] transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-[var(--border-primary)]">
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <Building2 className="h-7 w-7 text-[var(--color-accent-500)]" />
              <span className="font-bold text-lg text-[var(--text-primary)]">JAAD BUILD</span>
            </Link>
          )}
          {collapsed && <Building2 className="h-7 w-7 text-[var(--color-accent-500)] mx-auto" />}
          <button
            onClick={() => { setCollapsed(!collapsed); if (window.innerWidth < 1024) onClose(); }}
            className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] p-1 hidden lg:block"
          >
            {collapsed ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
          <button onClick={onClose} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] p-1 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div key={item.titleKey}>
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group",
                      isActive(item.href)
                        ? "bg-[var(--color-primary-700)] text-white"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]",
                    )}
                  >
                    {Icon && <Icon className="h-5 w-5 shrink-0" />}
                    {!collapsed && <span>{item.titleKey}</span>}
                  </Link>
                ) : (
                  <div
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-secondary)] opacity-60",
                    )}
                  >
                    {Icon && <Icon className="h-5 w-5 shrink-0" />}
                    {!collapsed && (
                      <>
                        <span className="flex-1">{item.titleKey}</span>
                        <span className="text-[10px] bg-[var(--color-accent-500)]/10 text-[var(--color-accent-500)] px-1.5 py-0.5 rounded-full font-medium">قريبًا</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[var(--border-primary)]">
          {!collapsed && (
            <p className="text-xs text-[var(--text-tertiary)] text-center">
              JAAD BUILD v0.1.0
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
