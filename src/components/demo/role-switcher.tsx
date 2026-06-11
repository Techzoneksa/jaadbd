"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import { DemoIdentityServiceImpl } from "@/services";
import { demoConfig } from "@/config/demo";
import { Check, RefreshCw } from "lucide-react";

const identityService = new DemoIdentityServiceImpl();

interface RoleSwitcherProps {
  onClose?: () => void;
}

export function RoleSwitcher({ onClose }: RoleSwitcherProps) {
  const currentRole = identityService.getCurrentRole();
  const [switching, setSwitching] = useState<string | null>(null);

  const handleSelect = (roleId: string) => {
    if (roleId === currentRole) return;
    setSwitching(roleId);
    identityService.setDemoRole(roleId);
    window.location.reload();
  };

  return (
    <Card className="border-amber-300">
      <CardHeader>
        <CardTitle className="text-sm">تبديل الدور التجريبي</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {demoConfig.demoSwitchRoles.map((role) => {
            const permissions = demoConfig.permissionsByRole[role.id as keyof typeof demoConfig.permissionsByRole] || [];
            const isActive = currentRole === role.id;
            const isLoading = switching === role.id;

            return (
              <button
                key={role.id}
                onClick={() => handleSelect(role.id)}
                disabled={isLoading}
                className={`relative flex flex-col items-start gap-1 p-3 rounded-lg border text-right transition-all ${
                  isActive
                    ? "border-amber-500 bg-amber-50 shadow-sm"
                    : "border-[var(--border-primary)] hover:border-amber-300 hover:bg-amber-50/50"
                }`}
              >
                {isActive && (
                  <Check className="absolute top-2 left-2 h-3.5 w-3.5 text-amber-600" />
                )}
                {isLoading && (
                  <RefreshCw className="absolute top-2 left-2 h-3.5 w-3.5 text-amber-600 animate-spin" />
                )}
                <span className={`text-sm font-medium ${isActive ? "text-amber-900" : "text-[var(--text-primary)]"}`}>
                  {role.nameAr}
                </span>
                <span className="text-xs text-[var(--text-tertiary)]">{role.nameEn}</span>
                <Badge variant={isActive ? "yellow" : "gray"} className="text-[10px] px-1.5 py-0">
                  {permissions.length} صلاحية
                </Badge>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
