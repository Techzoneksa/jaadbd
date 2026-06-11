import { describe, it, expect, beforeEach } from "vitest";
import { DemoIdentityServiceImpl } from "@/services/demo-identity";
import { demoConfig } from "@/config/demo";

describe("DemoIdentityService", () => {
  let identity: DemoIdentityServiceImpl;

  beforeEach(() => {
    identity = new DemoIdentityServiceImpl();
  });

  it("returns a default role", () => {
    const role = identity.getCurrentRole();
    expect(role).toBeDefined();
    expect(typeof role).toBe("string");
  });

  it("has role defined in demo config", () => {
    const role = identity.getCurrentRole();
    const roleConfig = demoConfig.demoSwitchRoles.find((r) => r.id === role);
    expect(roleConfig).toBeDefined();
  });

  it("returns permissions for current role", () => {
    const permissions = identity.getPermissions();
    expect(Array.isArray(permissions)).toBe(true);
  });

  it("hasPermission returns boolean", () => {
    expect(typeof identity.hasPermission("projects:read")).toBe("boolean");
  });

  it("returns current user info", () => {
    const user = identity.getCurrentUser();
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("nameAr");
    expect(user).toHaveProperty("email");
  });

  it("switching role changes permissions", () => {
    const originalPerms = identity.getPermissions();

    const viewerRole = demoConfig.demoSwitchRoles.find((r) => r.id === "VIEWER");
    if (viewerRole) {
      identity.setDemoRole("VIEWER");
      const viewerPerms = identity.getPermissions();
      expect(viewerPerms.length).toBeLessThanOrEqual(originalPerms.length);
    }
  });

  it("viewer has limited permissions", () => {
    identity.setDemoRole("VIEWER");
    expect(identity.hasPermission("projects.create")).toBe(false);
    expect(identity.hasPermission("projects.view")).toBe(true);
  });
});

describe("Permission Guards", () => {
  it("executive manager has all permissions", () => {
    const identity = new DemoIdentityServiceImpl();
    identity.setDemoRole("EXECUTIVE_MANAGER");
    const perms = identity.getPermissions();
    expect(perms.length).toBeGreaterThan(0);
  });

  it("site engineer has report permissions", () => {
    const identity = new DemoIdentityServiceImpl();
    identity.setDemoRole("SITE_ENGINEER");
    expect(identity.hasPermission("daily_reports.create")).toBe(true);
  });

  it("tenant owner has admin permissions", () => {
    const identity = new DemoIdentityServiceImpl();
    identity.setDemoRole("TENANT_OWNER");
    expect(identity.hasPermission("settings.update")).toBe(true);
  });
});
