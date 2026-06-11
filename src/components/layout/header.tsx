"use client";

import { useState } from "react";
import {
  Menu, Search, Bell, Moon, Sun, Globe, User, ChevronDown,
  LogOut, Settings as SettingsIcon,
} from "lucide-react";

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [locale, setLocale] = useState("ar");

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const toggleLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    setLocale(newLocale);
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLocale;
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[var(--bg-primary)] border-b border-[var(--border-primary)]">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button onClick={onMenuToggle} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1">
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="relative hidden md:block">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
            <input
              type="text"
              placeholder="بحث..."
              className="h-9 w-64 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-secondary)] pr-9 pl-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--color-accent-500)]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Add */}
          <button className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-lg bg-[var(--color-primary-700)] text-white text-sm font-medium hover:bg-[var(--color-primary-600)] transition-colors">
            <span>+</span>
            <span>إنشاء سريع</span>
          </button>

          {/* Language Toggle */}
          <button onClick={toggleLocale} className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]" title="Toggle language">
            <Globe className="h-5 w-5" />
          </button>

          {/* Theme Toggle */}
          <button onClick={toggleDark} className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]">
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[var(--color-danger)] text-[10px] text-white flex items-center justify-center font-bold">3</span>
            </button>
            {showNotifications && (
              <div className="absolute left-0 top-full mt-2 w-72 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl shadow-xl z-50">
                <div className="p-3 border-b border-[var(--border-primary)]">
                  <p className="text-sm font-medium text-[var(--text-primary)]">الإشعارات</p>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {[
                    { title: "تمت دعوتك إلى مشروع جديد", time: "منذ 5 دقائق" },
                    { title: "مشروع مجمع الروضة متأخر عن الخطة", time: "منذ ساعة" },
                    { title: "لديك 3 طلبات اعتماد", time: "منذ ساعتين" },
                  ].map((n, i) => (
                    <div key={i} className="p-3 hover:bg-[var(--bg-secondary)] cursor-pointer border-b border-[var(--border-primary)] last:border-0">
                      <p className="text-sm text-[var(--text-primary)]">{n.title}</p>
                      <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{n.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[var(--bg-secondary)]">
              <div className="h-8 w-8 rounded-full bg-[var(--color-primary-700)] text-white flex items-center justify-center text-sm font-medium">
                م
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-[var(--text-primary)]">مدير النظام</p>
                <p className="text-xs text-[var(--text-tertiary)]">admin@jaadbuild.com</p>
              </div>
              <ChevronDown className="h-4 w-4 text-[var(--text-tertiary)]" />
            </button>
            {showUserMenu && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl shadow-xl z-50">
                <div className="p-2 space-y-1">
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-lg">
                    <User className="h-4 w-4" /> الملف الشخصي
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-lg">
                    <SettingsIcon className="h-4 w-4" /> الإعدادات
                  </button>
                  <hr className="my-1 border-[var(--border-primary)]" />
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-danger)] hover:bg-[var(--color-danger)]/5 rounded-lg">
                    <LogOut className="h-4 w-4" /> تسجيل خروج
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
