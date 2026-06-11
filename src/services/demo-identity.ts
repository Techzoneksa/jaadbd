import type { DemoIdentityService } from "@/services";
import { demoConfig } from "@/config/demo";

function getStoredRole(): string {
  if (typeof window === "undefined") return demoConfig.demoUser.role;
  try {
    return localStorage.getItem("demo_role") ?? demoConfig.demoUser.role;
  } catch {
    return demoConfig.demoUser.role;
  }
}

function setStoredRole(role: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("demo_role", role);
  } catch {
  }
}

export class DemoIdentityServiceImpl implements DemoIdentityService {
  private currentRole: string;

  constructor() {
    this.currentRole = getStoredRole();
  }

  getCurrentRole(): string {
    return this.currentRole;
  }

  setDemoRole(roleId: string): void {
    this.currentRole = roleId;
    setStoredRole(roleId);
  }

  hasPermission(permission: string): boolean {
    const rolePermissions = demoConfig.permissionsByRole[this.currentRole as keyof typeof demoConfig.permissionsByRole];
    return rolePermissions?.includes(permission) ?? false;
  }

  getPermissions(): string[] {
    return demoConfig.permissionsByRole[this.currentRole as keyof typeof demoConfig.permissionsByRole] ?? [];
  }

  getCurrentUser(): { id: string; nameAr: string; nameEn: string; email: string } {
    return {
      id: demoConfig.demoUser.id,
      nameAr: demoConfig.demoUser.nameAr,
      nameEn: demoConfig.demoUser.nameEn,
      email: demoConfig.demoUser.email,
    };
  }
}
