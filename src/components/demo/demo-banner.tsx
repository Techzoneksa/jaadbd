"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui";
import { RoleSwitcher } from "./role-switcher";
import { resetDemoProjects, resetDemoTasks, resetDemoRisks, resetDemoDailyReports } from "@/demo/repositories";
import { X, RotateCcw, Shield } from "lucide-react";

const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export function DemoBanner() {
  const [visible, setVisible] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  useEffect(() => {
    if (!isDemo) return;
    try {
      const dismissed = sessionStorage.getItem("demo_banner_dismissed");
      setVisible(dismissed !== "true");
    } catch {
      setVisible(true);
    }
  }, []);

  if (!isDemo || !visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem("demo_banner_dismissed", "true");
    } catch {}
  };

  const handleReset = () => {
    if (!window.confirm("هل أنت متأكد من إعادة ضبط جميع البيانات التجريبية؟ سيتم فقدان أي تغييرات قمت بها.")) return;
    resetDemoProjects();
    resetDemoTasks();
    resetDemoRisks();
    resetDemoDailyReports();
    window.location.reload();
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-amber-400 border-t border-amber-500 px-4 py-2.5 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm text-amber-900">
          <Shield className="h-5 w-5 shrink-0" />
          <span>وضع العرض التجريبي — البيانات المعروضة لأغراض توضيحية فقط</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
            onClick={handleReset}
          >
            إعادة ضبط البيانات
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
          >
            تبديل الدور
          </Button>
          <button
            onClick={handleDismiss}
            className="p-1 rounded hover:bg-amber-500 transition-colors text-amber-900"
            aria-label="إغلاق"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      {showRoleSwitcher && (
        <div className="max-w-7xl mx-auto mt-2">
          <RoleSwitcher onClose={() => setShowRoleSwitcher(false)} />
        </div>
      )}
    </div>
  );
}
