"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, Button, Badge } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { DEMO_NOTIFICATIONS } from "@/demo/data";
import type { DemoNotification } from "@/demo/data";
import { useLocale } from "next-intl";
import { formatRelativeTime } from "@/lib/formatters";
import {
  Bell,
  BellOff,
  CheckCheck,
  AlertTriangle,
  ClipboardCheck,
  CalendarCheck,
  Info,
  CheckCircle2,
  Clock,
} from "lucide-react";

const typeIcons: Record<string, React.ElementType> = {
  approval: CheckCircle2,
  risk: AlertTriangle,
  task: ClipboardCheck,
  report: ClipboardCheck,
  milestone: CalendarCheck,
  system: Info,
};

const typeColors: Record<string, string> = {
  approval: "bg-blue-500/10 text-blue-600",
  risk: "bg-red-500/10 text-red-600",
  task: "bg-amber-500/10 text-amber-600",
  report: "bg-emerald-500/10 text-emerald-600",
  milestone: "bg-purple-500/10 text-purple-600",
  system: "bg-gray-500/10 text-gray-600",
};

export default function NotificationsPage() {
  const locale = useLocale();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<DemoNotification[]>([]);
  const [filter, setFilter] = useState<"ALL" | "UNREAD">("ALL");

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(DEMO_NOTIFICATIONS);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function toggleRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  }

  const filtered = notifications.filter((n) => {
    if (filter === "UNREAD") return !n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (loading) {
    return (
      <div dir="rtl">
        <Breadcrumbs items={[{ label: "الإشعارات" }]} className="mb-2" />
        <Card>
          <CardContent className="space-y-4 py-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div dir="rtl">
      <Breadcrumbs items={[{ label: "الإشعارات" }]} className="mb-2" />
      <PageHeader
        title="الإشعارات"
        description={unreadCount > 0 ? `لديك ${unreadCount} إشعار غير مقروء` : "جميع الإشعارات مقروءة"}
      >
        {unreadCount > 0 && (
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<CheckCheck className="h-4 w-4" />}
            onClick={markAllAsRead}
          >
            تحديد الكل كمقروء
          </Button>
        )}
      </PageHeader>

      <div className="flex gap-2 mb-6">
        <Button
          variant={filter === "ALL" ? "primary" : "secondary"}
          size="sm"
          leftIcon={<Bell className="h-4 w-4" />}
          onClick={() => setFilter("ALL")}
        >
          الكل
        </Button>
        <Button
          variant={filter === "UNREAD" ? "primary" : "secondary"}
          size="sm"
          leftIcon={<BellOff className="h-4 w-4" />}
          onClick={() => setFilter("UNREAD")}
        >
          غير مقروء
          {unreadCount > 0 && (
            <Badge variant="red" className="mr-1">{unreadCount}</Badge>
          )}
        </Button>
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <BellOff className="h-12 w-12 mx-auto mb-4 text-[var(--text-tertiary)]" />
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-1">
              {filter === "UNREAD" ? "لا توجد إشعارات غير مقروءة" : "لا توجد إشعارات"}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              {filter === "UNREAD" ? "جميع الإشعارات مقروءة" : "سوف تظهر الإشعارات هنا"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((notification) => {
            const Icon = typeIcons[notification.type] || Bell;
            const colorClass = typeColors[notification.type] || "bg-gray-500/10 text-gray-600";
            return (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-colors hover:bg-[var(--bg-secondary)] ${
                  !notification.read ? "border-r-4 border-r-[var(--color-primary-700)] bg-[var(--color-primary-50)]" : ""
                }`}
                onClick={() => toggleRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`text-sm ${!notification.read ? "font-bold text-[var(--text-primary)]" : "font-medium text-[var(--text-primary)]"}`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-[var(--text-tertiary)] shrink-0 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatRelativeTime(notification.createdAt, locale)}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">{notification.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
