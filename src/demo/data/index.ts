import { DEMO_COMPANY, DEMO_USERS } from "./company";
import { DEMO_PROJECTS, ALL_PROJECT_MEMBERS } from "./projects";
import { DEMO_MILESTONES } from "./milestones";
import { DEMO_TASKS } from "./tasks";
import { DEMO_DAILY_REPORTS } from "./daily-reports";
import { DEMO_RISKS } from "./risks";
import { DEMO_ACTIVITIES } from "./activities";
import { DEMO_NOTIFICATIONS } from "./notifications";
export type { Milestone } from "./milestones";
export type { ActivityLog } from "./activities";
export type { DemoNotification } from "./notifications";

export { DEMO_COMPANY, DEMO_USERS, DEMO_PROJECTS, ALL_PROJECT_MEMBERS, DEMO_MILESTONES, DEMO_TASKS, DEMO_DAILY_REPORTS, DEMO_RISKS, DEMO_ACTIVITIES, DEMO_NOTIFICATIONS };

export const ALL_DEMO_DATA = {
  projects: DEMO_PROJECTS,
  milestones: DEMO_MILESTONES,
  tasks: DEMO_TASKS,
  dailyReports: DEMO_DAILY_REPORTS,
  risks: DEMO_RISKS,
  activities: DEMO_ACTIVITIES,
  notifications: DEMO_NOTIFICATIONS,
  company: DEMO_COMPANY,
  users: DEMO_USERS,
  projectMembers: ALL_PROJECT_MEMBERS,
} as const;
