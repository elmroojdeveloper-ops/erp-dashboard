"use client";

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
  } = settings;

  const HeadingIcon = selectedMeta?.Icon;

  return (
    <div dir="rtl" className="flex flex-col gap-6 pb-4">
      {/* ============================ الهيدر ============================ */}
      <AccountingSettingsHeader
        hydrated={hydrated}
        savedAt={savedAt}
        saveMessage={saveMessage}
        onImport={() => setShowImportModal(true)}
        onSave={handleSave}
      />

      {/* ====================== السايدبار + المحتوى ====================== */}
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        {/* السايدبار (يمين) */}
        <SystemModulesSidebar
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
          moduleEnabled={moduleEnabled}
          onToggleModule={toggleModuleEnabled}
        />

        {/* العمود الرئيسي */}
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          {/* كارت قالب النشاط */}
          <section className="rounded-2xl border border-[#F0DDB8] bg-gradient-to-l from-[#FAEBD3] via-[#FBF3E4] to-[#FBF8F2] p-[22px] shadow-card">
            <ActivityTemplateBlock
              activityTemplate={activityTemplate}
              setActivityTemplate={setActivityTemplate}
              setSavedAt={setSavedAt}
              activityPreview={activityPresetPreview}
              hydrated={hydrated}
              onApply={handleApplyActivityTemplate}
            />
          </section>

          {/* عنوان القسم المختار */}
          {selectedMeta ? (
            <h2 className="flex items-center gap-2.5 text-[17px] font-bold leading-6 text-primary">
              {HeadingIcon ? <HeadingIcon className="size-[18px]" /> : null}
              إعدادات: {selectedMeta.label}
            </h2>
          ) : null}

          {/* كروت القسم المختار */}
          <div className="-mt-2 flex flex-col gap-[17px]">
            {renderModuleSettings()}
          </div>

          <AccountingSettingsStickyBar
            onReset={handleResetDefaults}
            onSave={handleSave}
          />
        </div>
      </div>

      <ImportSettingsModal
        open={showImportModal}
        onClose={() => setShowImportModal(false)}
        onSelectPreset={handleImportPreset}
      />
    </div>
  );
};

export default AccountingSettings;