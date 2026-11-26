"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  activityPresets,
  clearAccountingSettings,
  readAccountingSettings,
  readyImportPackages,
  writeAccountingSettings,
} from "./settingsStorage";
import {
  activityTemplates,
  defaultAssetCategories,
  defaultModuleEnabled,
  depreciationMethods,
  getDefaultSettingsState,
  initialCoaFields,
  initialSimpleFields,
  moduleItems,
  quickOperations,
} from "./settingsConstants";
import { formatAmountDisplay } from "./settingsFormat";
import ModuleSettingsRouter from "./modules/ModuleSettingsRouter";

export function useAccountingSettings() {
  const [activityTemplate, setActivityTemplate] = useState("");
  const [selectedModule, setSelectedModule] = useState("entries");
  const [moduleEnabled, setModuleEnabled] = useState(defaultModuleEnabled);
  const [simpleUi, setSimpleUi] = useState(true);
  const [autoSuggestAccounts, setAutoSuggestAccounts] = useState(true);
  const [attachInvoiceImage, setAttachInvoiceImage] = useState(false);
  const [activeQuickOps, setActiveQuickOps] = useState(() =>
    quickOperations.reduce((acc, op) => ({ ...acc, [op.id]: true }), {}),
  );
  const [simpleCustomFields, setSimpleCustomFields] =
    useState(initialSimpleFields);
  const [coaFeatureOn, setCoaFeatureOn] = useState(true);
  const [coaTemplate, setCoaTemplate] = useState("general-commercial");
  const [unlimitedSubLevels, setUnlimitedSubLevels] = useState(true);
  const [unifiedNumbering, setUnifiedNumbering] = useState(true);
  const [preventDeleteWithBalance, setPreventDeleteWithBalance] =
    useState(true);
  const [coaCustomFields, setCoaCustomFields] = useState(initialCoaFields);
  const [openingFyStart, setOpeningFyStart] = useState("2024-01-01");
  const [openingBalanceEnforced, setOpeningBalanceEnforced] = useState(true);
  const [openingLockAfterApproval, setOpeningLockAfterApproval] =
    useState(true);
  const [openingCustomFields, setOpeningCustomFields] = useState(
    initialCoaFields,
  );
  const [depreciationMethod, setDepreciationMethod] = useState("units");
  const [monthlyDepreciationAuto, setMonthlyDepreciationAuto] = useState(true);
  const [depreciationEntryAuto, setDepreciationEntryAuto] = useState(true);
  const [assetCategories, setAssetCategories] = useState([
    ...defaultAssetCategories,
  ]);
  const [fixedCustomFields, setFixedCustomFields] = useState(initialCoaFields);
  const [auditThreshold, setAuditThreshold] = useState("100000");
  const [auditRetention, setAuditRetention] = useState("5");
  const [auditLogEntries, setAuditLogEntries] = useState(true);
  const [auditLogAuth, setAuditLogAuth] = useState(true);
  const [auditCustomFields, setAuditCustomFields] = useState(initialCoaFields);
  const [entriesFeatureOn, setEntriesFeatureOn] = useState(true);
  const [entriesPrefix, setEntriesPrefix] = useState("JE-2024-");
  const [entriesResetCycle, setEntriesResetCycle] = useState("annual");
  const [entriesStartSeq, setEntriesStartSeq] = useState("1");
  const [entriesApprovalLevels, setEntriesApprovalLevels] = useState(() =>
    getDefaultSettingsState().entriesApprovalLevels.map((l) => ({ ...l })),
  );
  const [entriesDualApprovalLimit, setEntriesDualApprovalLimit] =
    useState("50000");
  const [entriesPnlAccount, setEntriesPnlAccount] = useState("3101");
  const [entriesRoundingAccount, setEntriesRoundingAccount] =
    useState("5209");
  const [entriesNotifyApproval, setEntriesNotifyApproval] = useState(true);
  const [entriesNotifyRejection, setEntriesNotifyRejection] = useState(true);
  const [entriesNotifyDailyPending, setEntriesNotifyDailyPending] =
    useState(false);
  const [entriesCustomFields, setEntriesCustomFields] =
    useState(initialSimpleFields);
  const [savedAt, setSavedAt] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [showImportModal, setShowImportModal] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const markDirty = () => setSavedAt(false);

  const buildSnapshot = useCallback(
    () => ({
      activityTemplate,
      selectedModule,
      moduleEnabled,
      simpleUi,
      autoSuggestAccounts,
      attachInvoiceImage,
      activeQuickOps,
      simpleCustomFields,
      coaFeatureOn,
      coaTemplate,
      unlimitedSubLevels,
      unifiedNumbering,
      preventDeleteWithBalance,
      coaCustomFields,
      openingFyStart,
      openingBalanceEnforced,
      openingLockAfterApproval,
      openingCustomFields,
      depreciationMethod,
      monthlyDepreciationAuto,
      depreciationEntryAuto,
      assetCategories,
      fixedCustomFields,
      auditThreshold,
      auditRetention,
      auditLogEntries,
      auditLogAuth,
      auditCustomFields,
      entriesFeatureOn,
      entriesPrefix,
      entriesResetCycle,
      entriesStartSeq,
      entriesApprovalLevels,
      entriesDualApprovalLimit,
      entriesPnlAccount,
      entriesRoundingAccount,
      entriesNotifyApproval,
      entriesNotifyRejection,
      entriesNotifyDailyPending,
      entriesCustomFields,
    }),
    [
      activityTemplate,
      selectedModule,
      moduleEnabled,
      simpleUi,
      autoSuggestAccounts,
      attachInvoiceImage,
      activeQuickOps,
      simpleCustomFields,
      coaFeatureOn,
      coaTemplate,
      unlimitedSubLevels,
      unifiedNumbering,
      preventDeleteWithBalance,
      coaCustomFields,
      openingFyStart,
      openingBalanceEnforced,
      openingLockAfterApproval,
      openingCustomFields,
      depreciationMethod,
      monthlyDepreciationAuto,
      depreciationEntryAuto,
      assetCategories,
      fixedCustomFields,
      auditThreshold,
      auditRetention,
      auditLogEntries,
      auditLogAuth,
      auditCustomFields,
      entriesFeatureOn,
      entriesPrefix,
      entriesResetCycle,
      entriesStartSeq,
      entriesApprovalLevels,
      entriesDualApprovalLimit,
      entriesPnlAccount,
      entriesRoundingAccount,
      entriesNotifyApproval,
      entriesNotifyRejection,
      entriesNotifyDailyPending,
      entriesCustomFields,
    ],
  );

  const applySnapshot = useCallback((snapshot) => {
    if (!snapshot) return;
    const defaults = getDefaultSettingsState();
    const s = { ...defaults, ...snapshot };
    if (snapshot.moduleEnabled) {
      s.moduleEnabled = {
        ...defaults.moduleEnabled,
        ...snapshot.moduleEnabled,
      };
    }
    if (snapshot.activeQuickOps) {
      s.activeQuickOps = {
        ...defaults.activeQuickOps,
        ...snapshot.activeQuickOps,
      };
    }

    setActivityTemplate(s.activityTemplate);
    setSelectedModule(s.selectedModule);
    setModuleEnabled(s.moduleEnabled);
    setSimpleUi(s.simpleUi);
    setAutoSuggestAccounts(s.autoSuggestAccounts);
    setAttachInvoiceImage(s.attachInvoiceImage);
    setActiveQuickOps(s.activeQuickOps);
    setSimpleCustomFields(s.simpleCustomFields);
    setCoaFeatureOn(s.coaFeatureOn);
    setCoaTemplate(s.coaTemplate);
    setUnlimitedSubLevels(s.unlimitedSubLevels);
    setUnifiedNumbering(s.unifiedNumbering);
    setPreventDeleteWithBalance(s.preventDeleteWithBalance);
    setCoaCustomFields(s.coaCustomFields);
    setOpeningFyStart(s.openingFyStart);
    setOpeningBalanceEnforced(s.openingBalanceEnforced);
    setOpeningLockAfterApproval(s.openingLockAfterApproval);
    setOpeningCustomFields(s.openingCustomFields);
    setDepreciationMethod(s.depreciationMethod);
    setMonthlyDepreciationAuto(s.monthlyDepreciationAuto);
    setDepreciationEntryAuto(s.depreciationEntryAuto);
    setAssetCategories(s.assetCategories);
    setFixedCustomFields(s.fixedCustomFields);
    setAuditThreshold(s.auditThreshold);
    setAuditRetention(s.auditRetention);
    setAuditLogEntries(s.auditLogEntries);
    setAuditLogAuth(s.auditLogAuth);
    setAuditCustomFields(s.auditCustomFields);
    setEntriesFeatureOn(s.entriesFeatureOn);
    setEntriesPrefix(s.entriesPrefix);
    setEntriesResetCycle(s.entriesResetCycle);
    setEntriesStartSeq(s.entriesStartSeq);
    setEntriesApprovalLevels(
      (s.entriesApprovalLevels ?? getDefaultSettingsState().entriesApprovalLevels).map(
        (l) => ({ ...l }),
      ),
    );
    setEntriesDualApprovalLimit(s.entriesDualApprovalLimit);
    setEntriesPnlAccount(s.entriesPnlAccount);
    setEntriesRoundingAccount(s.entriesRoundingAccount);
    setEntriesNotifyApproval(s.entriesNotifyApproval);
    setEntriesNotifyRejection(s.entriesNotifyRejection);
    setEntriesNotifyDailyPending(s.entriesNotifyDailyPending);
    setEntriesCustomFields(s.entriesCustomFields);
  }, []);

  useEffect(() => {
    const stored = readAccountingSettings();
    if (stored) {
      applySnapshot(stored);
      setSavedAt(true);
      setSaveMessage(
        stored.updatedAt
          ? `آخر حفظ: ${new Date(stored.updatedAt).toLocaleString("ar-SA")}`
          : "تم تحميل الإعدادات المحفوظة",
      );
    }
    setEntriesFeatureOn(true);
    setHydrated(true);
  }, [applySnapshot]);

  const toggleQuickOp = (id) => {
    setActiveQuickOps((prev) => ({ ...prev, [id]: !prev[id] }));
    markDirty();
  };

  const toggleModuleEnabled = (id) => {
    setModuleEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
    markDirty();
  };

  const enableModule = (id) => {
    setModuleEnabled((prev) => ({ ...prev, [id]: true }));
    markDirty();
  };

  const handleSave = () => {
    const snapshot = buildSnapshot();
    writeAccountingSettings(snapshot);
    setSavedAt(true);
    setSaveMessage("تم الحفظ للتو");
    alert("تم حفظ جميع إعدادات المحاسبة بنجاح");
  };

  const handleApplyActivityTemplate = () => {
    const preset = activityPresets[activityTemplate];
    if (!preset) return;
    applySnapshot({ ...getDefaultSettingsState(), ...preset });
    markDirty();
    const label =
      activityTemplates.find((t) => t.value === activityTemplate)?.label ?? "";
    alert(`تم تطبيق قالب النشاط: ${label}`);
  };

  const handleImportPreset = (presetId) => {
    const preset = activityPresets[presetId];
    if (!preset) return;
    applySnapshot({ ...getDefaultSettingsState(), ...preset });
    setShowImportModal(false);
    markDirty();
    const pkg = readyImportPackages.find((p) => p.id === presetId);
    alert(`تم استيراد ${pkg?.title ?? "القالب"} بنجاح — احفظ لتثبيت الإعدادات`);
  };

  const handleResetDefaults = () => {
    const ok = window.confirm(
      "هل تريد استعادة الإعدادات الافتراضية؟ سيتم فقدان التخصيصات الحالية غير المحفوظة.",
    );
    if (!ok) return;
    applySnapshot(getDefaultSettingsState());
    clearAccountingSettings();
    setSavedAt(false);
    setSaveMessage("");
    alert("تمت استعادة الإعدادات الافتراضية");
  };

  const moduleSectionEnabled = (id) => {
    if (id === "entries") return entriesFeatureOn;
    if (id === "coa") return coaFeatureOn;
    return Boolean(moduleEnabled[id]);
  };

  const entriesPreviewId = useMemo(() => {
    const seq = String(entriesStartSeq || "1").padStart(5, "0");
    const base = entriesPrefix.replace(/-+$/, "") || "JE-2024";
    return `${base}-${seq}`;
  }, [entriesPrefix, entriesStartSeq]);

  const selectedMeta = useMemo(
    () => moduleItems.find((m) => m.id === selectedModule),
    [selectedModule],
  );

  const activityPresetPreview = useMemo(() => {
    if (!activityTemplate) return null;
    const preset = activityPresets[activityTemplate];
    const label =
      activityTemplates.find((t) => t.value === activityTemplate)?.label ?? "";
    if (!preset) return label;
    const lines = [`نوع النشاط: ${label}`];
    if (preset.coaTemplate) lines.push(`دليل الحسابات: ${preset.coaTemplate}`);
    if (preset.depreciationMethod) {
      const method = depreciationMethods.find(
        (m) => m.value === preset.depreciationMethod,
      )?.label;
      if (method) lines.push(`إهلاك: ${method}`);
    }
    if (preset.auditThreshold) {
      lines.push(
        `سقف التدقيق: ${formatAmountDisplay(String(preset.auditThreshold))} ر.س`,
      );
    }
    if (preset.moduleEnabled) {
      const on = Object.entries(preset.moduleEnabled)
        .filter(([, v]) => v)
        .map(([k]) => moduleItems.find((m) => m.id === k)?.label)
        .filter(Boolean);
      if (on.length) lines.push(`أقسام مفعّلة: ${on.slice(0, 4).join(" · ")}`);
    }
    return lines.join("\n");
  }, [activityTemplate]);

  const renderModuleSettings = () => (
    <ModuleSettingsRouter
      selectedModule={selectedModule}
      moduleSectionEnabled={moduleSectionEnabled}
      entriesFeatureOn={entriesFeatureOn}
      setEntriesFeatureOn={setEntriesFeatureOn}
      setCoaFeatureOn={setCoaFeatureOn}
      markDirty={markDirty}
      toggleQuickOp={toggleQuickOp}
      simpleUi={simpleUi}
      setSimpleUi={setSimpleUi}
      autoSuggestAccounts={autoSuggestAccounts}
      setAutoSuggestAccounts={setAutoSuggestAccounts}
      attachInvoiceImage={attachInvoiceImage}
      setAttachInvoiceImage={setAttachInvoiceImage}
      activeQuickOps={activeQuickOps}
      simpleCustomFields={simpleCustomFields}
      setSimpleCustomFields={setSimpleCustomFields}
      coaFeatureOn={coaFeatureOn}
      coaTemplate={coaTemplate}
      setCoaTemplate={setCoaTemplate}
      unlimitedSubLevels={unlimitedSubLevels}
      setUnlimitedSubLevels={setUnlimitedSubLevels}
      unifiedNumbering={unifiedNumbering}
      setUnifiedNumbering={setUnifiedNumbering}
      preventDeleteWithBalance={preventDeleteWithBalance}
      setPreventDeleteWithBalance={setPreventDeleteWithBalance}
      coaCustomFields={coaCustomFields}
      setCoaCustomFields={setCoaCustomFields}
      openingFyStart={openingFyStart}
      setOpeningFyStart={setOpeningFyStart}
      openingBalanceEnforced={openingBalanceEnforced}
      setOpeningBalanceEnforced={setOpeningBalanceEnforced}
      openingLockAfterApproval={openingLockAfterApproval}
      setOpeningLockAfterApproval={setOpeningLockAfterApproval}
      openingCustomFields={openingCustomFields}
      setOpeningCustomFields={setOpeningCustomFields}
      depreciationMethod={depreciationMethod}
      setDepreciationMethod={setDepreciationMethod}
      monthlyDepreciationAuto={monthlyDepreciationAuto}
      setMonthlyDepreciationAuto={setMonthlyDepreciationAuto}
      depreciationEntryAuto={depreciationEntryAuto}
      setDepreciationEntryAuto={setDepreciationEntryAuto}
      assetCategories={assetCategories}
      fixedCustomFields={fixedCustomFields}
      setFixedCustomFields={setFixedCustomFields}
      auditThreshold={auditThreshold}
      setAuditThreshold={setAuditThreshold}
      auditRetention={auditRetention}
      setAuditRetention={setAuditRetention}
      auditLogEntries={auditLogEntries}
      setAuditLogEntries={setAuditLogEntries}
      auditLogAuth={auditLogAuth}
      setAuditLogAuth={setAuditLogAuth}
      auditCustomFields={auditCustomFields}
      setAuditCustomFields={setAuditCustomFields}
      entriesPrefix={entriesPrefix}
      setEntriesPrefix={setEntriesPrefix}
      entriesResetCycle={entriesResetCycle}
      setEntriesResetCycle={setEntriesResetCycle}
      entriesStartSeq={entriesStartSeq}
      setEntriesStartSeq={setEntriesStartSeq}
      entriesPreviewId={entriesPreviewId}
      entriesApprovalLevels={entriesApprovalLevels}
      setEntriesApprovalLevels={setEntriesApprovalLevels}
      entriesDualApprovalLimit={entriesDualApprovalLimit}
      setEntriesDualApprovalLimit={setEntriesDualApprovalLimit}
      entriesPnlAccount={entriesPnlAccount}
      setEntriesPnlAccount={setEntriesPnlAccount}
      entriesRoundingAccount={entriesRoundingAccount}
      setEntriesRoundingAccount={setEntriesRoundingAccount}
      entriesNotifyApproval={entriesNotifyApproval}
      setEntriesNotifyApproval={setEntriesNotifyApproval}
      entriesNotifyRejection={entriesNotifyRejection}
      setEntriesNotifyRejection={setEntriesNotifyRejection}
      entriesNotifyDailyPending={entriesNotifyDailyPending}
      setEntriesNotifyDailyPending={setEntriesNotifyDailyPending}
      entriesCustomFields={entriesCustomFields}
      setEntriesCustomFields={setEntriesCustomFields}
    />
  );

  return {
    activityTemplate,
    setActivityTemplate,
    selectedModule,
    setSelectedModule,
    moduleEnabled,
    setModuleEnabled,
    simpleUi,
    setSimpleUi,
    autoSuggestAccounts,
    setAutoSuggestAccounts,
    attachInvoiceImage,
    setAttachInvoiceImage,
    activeQuickOps,
    setActiveQuickOps,
    simpleCustomFields,
    setSimpleCustomFields,
    coaFeatureOn,
    setCoaFeatureOn,
    coaTemplate,
    setCoaTemplate,
    unlimitedSubLevels,
    setUnlimitedSubLevels,
    unifiedNumbering,
    setUnifiedNumbering,
    preventDeleteWithBalance,
    setPreventDeleteWithBalance,
    coaCustomFields,
    setCoaCustomFields,
    openingFyStart,
    setOpeningFyStart,
    openingBalanceEnforced,
    setOpeningBalanceEnforced,
    openingLockAfterApproval,
    setOpeningLockAfterApproval,
    openingCustomFields,
    setOpeningCustomFields,
    depreciationMethod,
    setDepreciationMethod,
    monthlyDepreciationAuto,
    setMonthlyDepreciationAuto,
    depreciationEntryAuto,
    setDepreciationEntryAuto,
    assetCategories,
    setAssetCategories,
    fixedCustomFields,
    setFixedCustomFields,
    auditThreshold,
    setAuditThreshold,
    auditRetention,
    setAuditRetention,
    auditLogEntries,
    setAuditLogEntries,
    auditLogAuth,
    setAuditLogAuth,
    auditCustomFields,
    setAuditCustomFields,
    entriesFeatureOn,
    setEntriesFeatureOn,
    entriesPrefix,
    setEntriesPrefix,
    entriesResetCycle,
    setEntriesResetCycle,
    entriesStartSeq,
    setEntriesStartSeq,
    entriesApprovalLevels,
    setEntriesApprovalLevels,
    entriesDualApprovalLimit,
    setEntriesDualApprovalLimit,
    entriesPnlAccount,
    setEntriesPnlAccount,
    entriesRoundingAccount,
    setEntriesRoundingAccount,
    entriesNotifyApproval,
    setEntriesNotifyApproval,
    entriesNotifyRejection,
    setEntriesNotifyRejection,
    entriesNotifyDailyPending,
    setEntriesNotifyDailyPending,
    entriesCustomFields,
    setEntriesCustomFields,
    savedAt,
    setSavedAt,
    saveMessage,
    setSaveMessage,
    showImportModal,
    setShowImportModal,
    hydrated,
    markDirty,
    buildSnapshot,
    toggleQuickOp,
    toggleModuleEnabled,
    enableModule,
    handleSave,
    handleApplyActivityTemplate,
    handleImportPreset,
    handleResetDefaults,
    moduleSectionEnabled,
    entriesPreviewId,
    selectedMeta,
    activityPresetPreview,
    renderModuleSettings,
  };
}
