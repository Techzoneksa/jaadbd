"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Input, Select, Skeleton } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { formatDate, formatRelativeTime } from "@/lib/formatters";
import { DEMO_TASKS } from "@/demo/data";
import { Search, X, User, Calendar, CheckSquare, Tag, AlertTriangle } from "lucide-react";
import type { TaskData, TaskStatus, TaskPriority } from "@/domain/tasks";

const PRIORITY_COLORS = {
  LOW: "gray" as const,
  MEDIUM: "blue" as const,
  HIGH: "orange" as const,
  URGENT: "red" as const,
};

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  LOW: "منخفضة",
  MEDIUM: "متوسطة",
  HIGH: "عالية",
  URGENT: "عاجلة",
};

const ALL_STATUSES: TaskStatus[] = ["TODO", "IN_PROGRESS", "IN_REVIEW", "BLOCKED", "COMPLETED", "CANCELLED"];

const STATUS_LABELS: Record<string, string> = {
  BACKLOG: "متراكمة",
  TODO: "مهام",
  IN_PROGRESS: "قيد التنفيذ",
  IN_REVIEW: "مراجعة",
  BLOCKED: "معلقة",
  COMPLETED: "مكتملة",
  CANCELLED: "ملغاة",
  OVERDUE: "متأخرة",
};

function statusGroup(s: string): TaskStatus {
  if (s === "BACKLOG") return "TODO";
  if (s === "OVERDUE") return "BLOCKED";
  return s as TaskStatus;
}

function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <Badge variant={PRIORITY_COLORS[priority]}>
      {PRIORITY_LABELS[priority]}
    </Badge>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
      <div
        className="h-full rounded-full bg-[var(--color-primary-700)] transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function TaskCard({
  task,
  onSelect,
}: {
  task: TaskData;
  onSelect: (t: TaskData) => void;
}) {
  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow border border-[var(--border-primary)]"
      onClick={() => onSelect(task)}
    >
      <CardContent className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-medium text-[var(--text-primary)] leading-tight line-clamp-2">
            {task.title}
          </h4>
          <PriorityBadge priority={task.priority} />
        </div>

        <ProgressBar value={task.progress} />

        <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
          {task.assigneeName && (
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {task.assigneeName}
            </span>
          )}
          {task.dueDate && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function TaskDetailPanel({ task, onClose }: { task: TaskData; onClose: () => void }) {
  const locale = useLocale();

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-24">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <Card className="relative w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto z-10">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg">{task.title}</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <PriorityBadge priority={task.priority} />
              <StatusBadge status={task.status} label={STATUS_LABELS[task.status] || task.status} />
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {task.description && (
            <div>
              <h5 className="text-xs font-medium text-[var(--text-secondary)] mb-1">الوصف</h5>
              <p className="text-sm text-[var(--text-primary)]">{task.description}</p>
            </div>
          )}

          {task.assigneeName && (
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-[var(--text-secondary)]" />
              <span className="text-[var(--text-primary)]">{task.assigneeName}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            {task.startDate && (
              <div>
                <span className="text-[var(--text-secondary)] text-xs">تاريخ البداية</span>
                <p className="text-[var(--text-primary)]">{formatDate(task.startDate)}</p>
              </div>
            )}
            <div>
              <span className="text-[var(--text-secondary)] text-xs">تاريخ الاستحقاق</span>
              <p className="text-[var(--text-primary)]">{formatDate(task.dueDate)}</p>
            </div>
          </div>

          <div>
            <span className="text-[var(--text-secondary)] text-xs">نسبة الإنجاز</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1">
                <ProgressBar value={task.progress} />
              </div>
              <span className="text-sm font-medium text-[var(--text-primary)]">{task.progress}%</span>
            </div>
          </div>

          {task.tags.length > 0 && (
            <div>
              <h5 className="text-xs font-medium text-[var(--text-secondary)] mb-1 flex items-center gap-1">
                <Tag className="h-3 w-3" />
                الوسوم
              </h5>
              <div className="flex flex-wrap gap-1">
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="gray">{tag}</Badge>
                ))}
              </div>
            </div>
          )}

          {task.checklist.length > 0 && (
            <div>
              <h5 className="text-xs font-medium text-[var(--text-secondary)] mb-1 flex items-center gap-1">
                <CheckSquare className="h-3 w-3" />
                قائمة المهام ({task.checklist.filter((c) => c.done).length}/{task.checklist.length})
              </h5>
              <div className="space-y-1">
                {task.checklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div
                      className={`h-4 w-4 rounded border flex items-center justify-center ${
                        item.done
                          ? "bg-[var(--color-success)] border-[var(--color-success)]"
                          : "border-[var(--border-primary)]"
                      }`}
                    >
                      {item.done && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className={item.done ? "line-through text-[var(--text-tertiary)]" : "text-[var(--text-primary)]"}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-xs text-[var(--text-tertiary)]">
            <p>تم الإنشاء: {formatRelativeTime(task.createdAt, locale)}</p>
            <p>آخر تحديث: {formatRelativeTime(task.updatedAt, locale)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function TasksPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);

  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [filterPriority, setFilterPriority] = useState<string>("ALL");
  const [filterAssignee, setFilterAssignee] = useState<string>("ALL");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const filtered = DEMO_TASKS.filter((t) => t.projectId === projectId);
      setTasks(filtered);
    } catch {
      setError("حدث خطأ أثناء تحميل المهام");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const assignees = useMemo(() => {
    const names = new Set(tasks.map((t) => t.assigneeName).filter(Boolean));
    return Array.from(names) as string[];
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (filterStatus !== "ALL" && statusGroup(t.status) !== filterStatus) return false;
      if (filterPriority !== "ALL" && t.priority !== filterPriority) return false;
      if (filterAssignee !== "ALL" && t.assigneeName !== filterAssignee) return false;
      if (searchText) {
        const q = searchText.toLowerCase();
        const match =
          t.title.toLowerCase().includes(q) ||
          (t.description || "").toLowerCase().includes(q) ||
          (t.assigneeName || "").toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [tasks, filterStatus, filterPriority, filterAssignee, searchText]);

  const columns = useMemo(() => {
    const map: Record<string, TaskData[]> = {};
    ALL_STATUSES.forEach((s) => (map[s] = []));
    filteredTasks.forEach((t) => {
      const group = statusGroup(t.status);
      if (map[group]) map[group].push(t);
    });
    return map;
  }, [filteredTasks]);

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t)),
    );
    setSelectedTask((prev) =>
      prev && prev.id === taskId ? { ...prev, status: newStatus, updatedAt: new Date().toISOString() } : prev,
    );
  };

  if (error) {
    return (
      <div dir="rtl">
        <Breadcrumbs items={[{ label: "المشاريع", href: "/dashboard/projects" }, { label: "المهام" }]} className="mb-2" />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-[var(--color-warning)]" />
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">خطأ في تحميل المهام</h2>
            <p className="text-sm text-[var(--text-secondary)]">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl">
      <Breadcrumbs
        items={[
          { label: "المشاريع", href: "/dashboard/projects" },
          { label: "المهام", href: `/dashboard/projects/${projectId}/tasks` },
        ]}
        className="mb-2"
      />

      <PageHeader title="المهام" description="إدارة ومتابعة مهام المشروع">
        <div className="flex items-center gap-2">
          {selectedTask && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const currentIdx = ALL_STATUSES.indexOf(selectedTask.status);
                const next = ALL_STATUSES[(currentIdx + 1) % ALL_STATUSES.length];
                handleStatusChange(selectedTask.id, next);
              }}
            >
              تغيير الحالة
            </Button>
          )}
        </div>
      </PageHeader>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
          <Input
            placeholder="بحث في المهام..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pr-9"
          />
        </div>
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          options={[
            { value: "ALL", label: "جميع الحالات" },
            ...ALL_STATUSES.map((s) => ({ value: s, label: STATUS_LABELS[s] })),
          ]}
        />
        <Select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          options={[
            { value: "ALL", label: "جميع الأولويات" },
            { value: "LOW", label: "منخفضة" },
            { value: "MEDIUM", label: "متوسطة" },
            { value: "HIGH", label: "عالية" },
            { value: "URGENT", label: "عاجلة" },
          ]}
        />
        <Select
          value={filterAssignee}
          onChange={(e) => setFilterAssignee(e.target.value)}
          options={[
            { value: "ALL", label: "جميع المسؤولين" },
            ...assignees.map((a) => ({ value: a, label: a })),
          ]}
        />
        {(searchText || filterStatus !== "ALL" || filterPriority !== "ALL" || filterAssignee !== "ALL") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchText("");
              setFilterStatus("ALL");
              setFilterPriority("ALL");
              setFilterAssignee("ALL");
            }}
          >
            <X className="h-4 w-4 ml-1" />
            إلغاء التصفية
          </Button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ))}
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center">
            <Search className="h-12 w-12 mx-auto mb-3 text-[var(--text-tertiary)]" />
            <p className="text-sm text-[var(--text-tertiary)]">لا توجد مهام مطابقة</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {ALL_STATUSES.map((status) => (
            <div key={status} className="min-w-[260px]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  {STATUS_LABELS[status]}
                </h3>
                <Badge variant="gray">{columns[status]?.length || 0}</Badge>
              </div>
              <div className="space-y-2">
                {columns[status]?.map((task) => (
                  <TaskCard key={task.id} task={task} onSelect={setSelectedTask} />
                ))}
                {columns[status]?.length === 0 && (
                  <p className="text-xs text-[var(--text-tertiary)] text-center py-4">لا توجد مهام</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTask && (
        <TaskDetailPanel
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}
