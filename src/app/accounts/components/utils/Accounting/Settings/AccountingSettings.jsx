"use client";

import Link from "next/link";
import AccountingSettingsHeader from "./components/AccountingSettingsHeader";
import AccountingSettingsStickyBar from "./components/AccountingSettingsStickyBar";
import ActivityTemplateBlock from "./components/ActivityTemplateBlock";
import ImportSettingsModal from "./components/ImportSettingsModal";
import SystemModulesSidebar from "./components/SystemModulesSidebar";
import { useAccountingSettings } from "./useAccountingSettings";

const AccountingSettings = () => {
  const settings = useAccountingSettings();
  const {
    activityTemplate,
    setActivityTemplate,
    setSavedAt,
    activityPresetPreview,
    hydrated,
    handleApplyActivityTemplate,
    savedAt,
    saveMessage,
    showImportModal,
    setShowImportModal,
    handleSave,
    handleImportPreset,
    handleResetDefaults,
    selectedModule,
    setSelectedModule,
    moduleEnabled,
    toggleModuleEnabled,
    renderModuleSettings,
    selectedMeta,
    moduleSectionEnabled,
  } = settings;

  return (
    <div dir="rtl" className="flex flex-col gap-5 pb-28">
      <AccountingSettingsHeader
        hydrated={hydrated}
        savedAt={savedAt}
        saveMessage={saveMessage}
        onImport={() => setShowImportModal(true)}
        onSave={handleSave}
      />

      <section className="rounded-2xl border border-[#FCD34D] bg-[#FFFBEB] p-5 shadow-card sm:p-6">
        <ActivityTemplateBlock
          activityTemplate={activityTemplate}
          setActivityTemplate={setActivityTemplate}
          setSavedAt={setSavedAt}
          activityPreview={activityPresetPreview}
          hydrated={hydrated}
          onApply={handleApplyActivityTemplate}
        />
      </section>

      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <SystemModulesSidebar
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
          moduleEnabled={moduleEnabled}
          onToggleModule={toggleModuleEnabled}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {renderModuleSettings()}
          {selectedMeta?.href &&
          moduleSectionEnabled(selectedModule) &&
          selectedModule !== "entries" ? (
            <Link
              href={selectedMeta.href}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#BBD9EA] bg-[#E8F3FA] px-4 py-2 text-[12px] font-bold text-primary transition hover:bg-[#DCEEF8]"
            >
              فتح شاشة {selectedMeta.label} في النظام
            </Link>
          ) : null}
        </div>
      </div>

      <AccountingSettingsStickyBar onReset={handleResetDefaults} onSave={handleSave} />

      <ImportSettingsModal
        open={showImportModal}
        onClose={() => setShowImportModal(false)}
        onSelectPreset={handleImportPreset}
      />
    </div>
  );
};

export default AccountingSettings;