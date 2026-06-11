"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { EmptyState } from "@/components/shared/empty-state";
import { DEMO_ACTIVITIES } from "@/demo/data";
import { DEMO_USERS } from "@/demo/data";
import type { ActivityLog } from "@/demo/data";
import { useLocale } from "next-intl";
import { formatRelativeTime } from "@/lib/formatters";
import {
  Activity,
  PlusCircle,
  CheckSquare,
  FileText,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  TrendingUp,
  MessageSquare,
  Flag,
  Clock,
} from "lucide-react";

const activityIcons: Record<string, React.ReactNode> = {
  project_created: <PlusCircle className="h-4 w-4" />,
  task_created: <CheckSquare className="h-4 w-4" />,
  task_completed: <CheckCircle2 className="h-4 w-4" />,
  report_created: <FileText className="h-4 w-4" />,
  report_submitted: <FileText className="h-4 w-4" />,
  report_approved: <CheckCircle2 className="h-4 w-4" />,
  risk_updated: <AlertTriangle className="h-4 w-4" />,
  risk_added: <AlertTriangle className="h-4 w-4" />,
  member_added: <UserPlus className="h-4 w-4" />,
  progress_updated: <TrendingUp className="h-4 w-4" />,
  status_change: <TrendingUp className="h-4 w-4" />,
  milestone: <Flag className="h-4 w-4" />,
  comment: <MessageSquare className="h-4 w-4" />,
};

const iconColors: Record<string, string> = {
  project_created: "bg-blue-100 text-blue-600",
  task_created: "bg-indigo-100 text-indigo-600",
  task_completed: "bg-green-100 text-green-600",
  report_created: "bg-orange-100 text-orange-600",
  report_submitted: "bg-orange-100 text-orange-600",
  report_approved: "bg-green-100 text-green-600",
  risk_updated: "bg-red-100 text-red-600",
  risk_added: "bg-red-100 text-red-600",
  member_added: "bg-purple-100 text-purple-600",
  progress_updated: "bg-cyan-100 text-cyan-600",
  status_change: "bg-cyan-100 text-cyan-600",
  milestone: "bg-yellow-100 text-yellow-600",
  comment: "bg-gray-100 text-gray-600",
};

function getActivityIcon(type: string) {
  return activityIcons[type] || <Activity className="h-4 w-4" />;
}

function getIconColor(type: string) {
  return iconColors[type] || "bg-gray-100 text-gray-600";
}

function getUserName(userId: string): string {
  const user = DEMO_USERS.find((u) => u.id === userId);
  return user?.nameAr || userId;
}

interface GroupedActivities {
  label: string;
  activities: ActivityLog[];
}

function groupActivities(activities: ActivityLog[]): GroupedActivities[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(thisWeekStart.getDate() - today.getDay());
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const groups: Record<string, ActivityLog[]> = {
    today: [],
    yesterday: [],
    thisWeek: [],
    thisMonth: [],
    older: [],
  };

  activities.forEach((a) => {
    const d = new Date(a.timestamp);
    if (d >= today) {
      groups.today.push(a);
    } else if (d >= yesterday) {
      groups.yesterday.push(a);
    } else if (d >= thisWeekStart) {
      groups.thisWeek.push(a);
    } else if (d >= thisMonthStart) {
      groups.thisMonth.push(a);
    } else {
      groups.older.push(a);
    }
  });

  const result: GroupedActivities[] = [];
  if (groups.today.length) result.push({ label: "اليوم", activities: groups.today });
  if (groups.yesterday.length) result.push({ label: "أمس", activities: groups.yesterday });
  if (groups.thisWeek.length) result.push({ label: "هذا الأسبوع", activities: groups.thisWeek });
  if (groups.thisMonth.length) result.push({ label: "هذا الشهر", activities: groups.thisMonth });
  if (groups.older.length) result.push({ label: "أقدم", activities: groups.older });

  return result;
}

export default function ActivitiesPage() {
  const locale = useLocale();
  const params = useParams();
  const projectId = params.projectId as string;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const activities = useMemo(() => {
    return DEMO_ACTIVITIES.filter((a) => a.projectId === projectId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [projectId]);

  const grouped = useMemo(() => groupActivities(activities), [activities]);

  if (loading) {
    return (
      <div dir="rtl">
        <Breadcrumbs items={[{ label: "المشروع", href: `/dashboard/projects/${projectId}` }, { label: "النشاطات" }]} className="mb-2" />
        <PageHeader title="النشاطات" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="w-10 h-10 rounded-full shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl">
      <Breadcrumbs
        items={[
          { label: "المشروع", href: `/dashboard/projects/${projectId}` },
          { label: "النشاطات" },
        ]}
        className="mb-2"
      />
      <PageHeader title="النشاطات" description="سجل نشاطات وتحديثات المشروع" />

      {grouped.length === 0 ? (
        <EmptyState
          icon={<Activity className="h-12 w-12" />}
          title="لا توجد نشاطات"
          description="لم يتم تسجيل أي نشاطات لهذا المشروع بعد"
        />
      ) : (
        <div className="space-y-8">
          {grouped.map((group) => (
            <div key={group.label}>
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {group.label}
              </h3>
              <div className="space-y-0">
                {group.activities.map((activity, idx) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getIconColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      {idx < group.activities.length - 1 && (
                        <div className="w-px flex-1 bg-[var(--border-primary)] my-1" />
                      )}
                    </div>
                    <div className="pb-6 flex-1 min-w-0">
                      <p className="text-sm text-[var(--text-primary)]">
                        {activity.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-[var(--text-tertiary)]">
                        <span className="font-medium">{getUserName(activity.performedById)}</span>
                        <span>{formatRelativeTime(activity.timestamp, locale)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
