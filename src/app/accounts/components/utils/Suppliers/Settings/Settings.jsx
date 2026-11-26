"use client";

import React, { useState } from "react";
import Header from "./Header";
import SettingsTabsSidebar, { SETTINGS_TABS } from "./SettingsTabsSidebar";
import VendorCategoriesSection from "./VendorCategoriesSection";
import CustomFieldsSection from "./CustomFieldsSection";
import PaymentPoliciesSection from "./PaymentPoliciesSection";
import AccountingIntegrationSection from "./AccountingIntegrationSection";
import PermissionsMatrixSection from "./PermissionsMatrixSection";
import AuditLogSection from "./AuditLogSection";
import SettingsFooter from "./SettingsFooter";

const INITIAL_AUDIT_LOGS = [
  {
    id: "log-1",
    type: "policy",
    actor: "أحمد المحاسب",
    actionText:
      "بتفعيل سياسة (حظر إصدار فواتير شراء للموردين غير مكتملـي البيانات الضريبية)",
    timestamp: "اليوم، 10:14 ص",
  },
  {
    id: "log-2",
    type: "field",
    actor: "سارة إبراهيم (مدير المشتريات)",
    actionText: "بإضافة الحقل المخصص (شهادة الآيبان المعتمدة)",
    timestamp: "أمس، 03:45 م",
  },
];

function formatNowArabicTime() {
  const now = new Date();
  const hours24 = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const period = hours24 >= 12 ? "م" : "ص";
  const hours12 = String(hours24 % 12 || 12).padStart(2, "0");
  return `اليوم، ${hours12}:${minutes} ${period}`;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState("categories");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const [categoriesCount, setCategoriesCount] = useState(6);
  const [customFieldsCount, setCustomFieldsCount] = useState(5);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [auditTotalCount, setAuditTotalCount] = useState(38);

  const currentUser = "أحمد المحاسب";

  const sidebarTabs = SETTINGS_TABS.map((tab) =>
    tab.id === "custom-fields" ? { ...tab, badge: customFieldsCount } : tab
  );

  const headerStats = [
    {
      id: "custom-fields",
      label: "إجمالي الحقول\nالمخصصة",
      value: `${customFieldsCount} حقول نشطة`,
    },
    {
      id: "categories",
      label: "التصنيفات\nالمعتمدة",
      value: `${categoriesCount} تصنيفات`,
    },
  ];

  const markDirty = () => {
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const newLog = {
        id: `log-${Date.now()}`,
        type: "policy",
        actor: currentUser,
        actionText: "بحفظ وتطبيق تحديثات إعدادات وسياسات الموردين",
        timestamp: formatNowArabicTime(),
      };
      setAuditLogs((prev) => [newLog, ...prev]);
      setAuditTotalCount((prev) => prev + 1);
      setHasUnsavedChanges(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetDefaults = () => {
    setResetKey((prev) => prev + 1);
    setCategoriesCount(6);
    setCustomFieldsCount(5);
    setHasUnsavedChanges(true);
  };

  const renderSection = () => {
    switch (activeTab) {
      case "categories":
        return (
          <VendorCategoriesSection
            key={`cat-${resetKey}`}
            onCategoriesChange={(list) => {
              setCategoriesCount(list.length);
              markDirty();
            }}
            onAllowInlineCreationChange={markDirty}
          />
        );
      case "custom-fields":
        return (
          <CustomFieldsSection
            key={`fields-${resetKey}`}
            onFieldsChange={(list) => {
              setCustomFieldsCount(list.length);
              markDirty();
            }}
          />
        );
      case "payment-policies":
        return (
          <PaymentPoliciesSection
            key={`policies-${resetKey}`}
            onPoliciesChange={markDirty}
          />
        );
      case "accounting-integration":
        return (
          <AccountingIntegrationSection
            key={`accounting-${resetKey}`}
            onAccountingChange={markDirty}
          />
        );
      case "permissions-matrix":
        return (
          <PermissionsMatrixSection
            key={`matrix-${resetKey}`}
            onMatrixChange={markDirty}
          />
        );
      case "audit-log":
        return (
          <AuditLogSection
            logs={auditLogs}
            totalCount={auditTotalCount}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      dir="rtl"
      className="flex w-full flex-col gap-5 bg-[#f5f8fa] p-4 sm:p-6"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      <Header stats={headerStats} />

      <div className="flex w-full flex-col items-start gap-5 lg:flex-row">
        <SettingsTabsSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={sidebarTabs}
        />

        <main className="min-w-0 flex-1 space-y-5">
          {renderSection()}

          {activeTab !== "audit-log" && (
            <AuditLogSection
              logs={auditLogs}
              totalCount={auditTotalCount}
              onViewAll={() => setActiveTab("audit-log")}
            />
          )}
        </main>
      </div>

      <SettingsFooter
        lastSavedBy={currentUser}
        hasUnsavedChanges={hasUnsavedChanges}
        isSaving={isSaving}
        onSave={handleSave}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
};

export default Settings;