import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export interface TenantContext {
  tenantId: string;
  tenantSlug: string;
  userId: string;
}

export async function requireTenantContext(): Promise<TenantContext> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  const membership = await prisma.tenantMembership.findFirst({
    where: {
      userId: session.user.id,
      status: "ACTIVE",
    },
    include: {
      tenant: true,
    },
  });

  if (!membership) {
    throw new Error("NO_TENANT_ACCESS");
  }

  return {
    tenantId: membership.tenantId,
    tenantSlug: membership.tenant.companyNameAr,
    userId: session.user.id,
  };
}

export async function getTenantContext(): Promise<TenantContext | null> {
  try {
    return await requireTenantContext();
  } catch {
    return null;
  }
}

export function withTenantScope(tenantId: string) {
  return {
    tenantId,
    deletedAt: null,
  };
}

export async function verifyTenantAccess(tenantId: string): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.id) return false;

  const membership = await prisma.tenantMembership.findFirst({
    where: {
      userId: session.user.id,
      tenantId,
      status: "ACTIVE",
    },
  });

  return !!membership;
}
