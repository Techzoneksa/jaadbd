import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { PERMISSIONS } from "@/constants";

export type PermissionKey = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export async function getUserPermissions(userId: string, tenantId: string): Promise<string[]> {
  const rolePermissions = await prisma.rolePermission.findMany({
    where: {
      role: {
        memberships: {
          some: {
            userId,
            tenantId,
            status: "ACTIVE",
          },
        },
      },
    },
    include: {
      permission: true,
    },
  });

  return rolePermissions.map((rp: { permission: { key: string } }) => rp.permission.key);
}

export async function hasPermission(
  userId: string,
  tenantId: string,
  permission: PermissionKey,
): Promise<boolean> {
  const permissions = await getUserPermissions(userId, tenantId);
  return permissions.includes(permission);
}

export async function requirePermission(permission: PermissionKey): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  const membership = await prisma.tenantMembership.findFirst({
    where: {
      userId: session.user.id,
      status: "ACTIVE",
    },
  });

  if (!membership) {
    throw new Error("NO_TENANT_ACCESS");
  }

  const hasAccess = await hasPermission(session.user.id, membership.tenantId, permission);
  if (!hasAccess) {
    throw new Error("FORBIDDEN");
  }
}

export async function canAccessModule(
  userId: string,
  tenantId: string,
  module: string,
): Promise<boolean> {
  const permissions = await getUserPermissions(userId, tenantId);
  return permissions.some((p) => p.startsWith(module));
}
