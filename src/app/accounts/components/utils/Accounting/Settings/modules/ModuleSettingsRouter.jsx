"use client";

import ModuleDisabledPanel from "../components/ModuleDisabledPanel";
import AuditSettings from "./AuditSettings";
import CoaSettings from "./CoaSettings";
import EntriesSettings from "./EntriesSettings";
import FixedAssetsSettings from "./FixedAssetsSettings";
import OpeningBalancesSettings from "./OpeningBalancesSettings";
import SimpleEntriesSettings from "./SimpleEntriesSettings";

const disabledLabels = {
  entries: "القيود اليومية",
  coa: "دليل الحسابات",
  "simple-entries": "القيود اليومية السهلة",
  "opening-balances": "الأرصدة الافتتاحية",
  "fixed-assets": "الأصول الثابتة",
  audit: "عمليات التدقيق",
};

function ModuleDisabledFallback({
  moduleId,
  setEntriesFeatureOn,
  setCoaFeatureOn,
  markDirty,
}) {
  return (
    <ModuleDisabledPanel
      moduleId={moduleId}
      label={disabledLabels[moduleId] ?? moduleId}
      onEnableEntries={() => setEntriesFeatureOn(true)}
      onEnableCoa={() => setCoaFeatureOn(true)}
      markDirty={markDirty}
    />
  );
}

export default function ModuleSettingsRouter(props) {
  const {
    selectedModule,
    moduleSectionEnabled,
    entriesFeatureOn,
    setEntriesFeatureOn,
    setCoaFeatureOn,
    markDirty,
  } = props;

  const disabledProps = {
    setEntriesFeatureOn,
    setCoaFeatureOn,
    markDirty,
  };

  switch (selectedModule) {
    case "entries":
      return entriesFeatureOn ? (
        <EntriesSettings
          entriesFeatureOn={entriesFeatureOn}
          entriesPrefix={props.entriesPrefix}
          setEntriesPrefix={props.setEntriesPrefix}
          entriesResetCycle={props.entriesResetCycle}
          setEntriesResetCycle={props.setEntriesResetCycle}
          entriesStartSeq={props.entriesStartSeq}
          setEntriesStartSeq={props.setEntriesStartSeq}
          entriesPreviewId={props.entriesPreviewId}
          entriesApprovalLevels={props.entriesApprovalLevels}
          setEntriesApprovalLevels={props.setEntriesApprovalLevels}
          entriesDualApprovalLimit={props.entriesDualApprovalLimit}
          setEntriesDualApprovalLimit={props.setEntriesDualApprovalLimit}
          entriesPnlAccount={props.entriesPnlAccount}
          setEntriesPnlAccount={props.setEntriesPnlAccount}
          entriesRoundingAccount={props.entriesRoundingAccount}
          setEntriesRoundingAccount={props.setEntriesRoundingAccount}
          entriesNotifyApproval={props.entriesNotifyApproval}
          setEntriesNotifyApproval={props.setEntriesNotifyApproval}
          entriesNotifyRejection={props.entriesNotifyRejection}
          setEntriesNotifyRejection={props.setEntriesNotifyRejection}
          entriesNotifyDailyPending={props.entriesNotifyDailyPending}
          setEntriesNotifyDailyPending={props.setEntriesNotifyDailyPending}
          entriesCustomFields={props.entriesCustomFields}
          setEntriesCustomFields={props.setEntriesCustomFields}
          markDirty={markDirty}
        />
      ) : (
        <ModuleDisabledFallback moduleId="entries" {...disabledProps} />
      );
    case "coa":
      return moduleSectionEnabled("coa") ? (
        <CoaSettings
          coaFeatureOn={props.coaFeatureOn}
          setCoaFeatureOn={props.setCoaFeatureOn}
          coaTemplate={props.coaTemplate}
          setCoaTemplate={props.setCoaTemplate}
          unlimitedSubLevels={props.unlimitedSubLevels}
          setUnlimitedSubLevels={props.setUnlimitedSubLevels}
          unifiedNumbering={props.unifiedNumbering}
          setUnifiedNumbering={props.setUnifiedNumbering}
          preventDeleteWithBalance={props.preventDeleteWithBalance}
          setPreventDeleteWithBalance={props.setPreventDeleteWithBalance}
          coaCustomFields={props.coaCustomFields}
          setCoaCustomFields={props.setCoaCustomFields}
          markDirty={markDirty}
        />
      ) : (
        <ModuleDisabledFallback moduleId="coa" {...disabledProps} />
      );
    case "simple-entries":
      return moduleSectionEnabled("simple-entries") ? (
        <SimpleEntriesSettings
          simpleUi={props.simpleUi}
          setSimpleUi={props.setSimpleUi}
          autoSuggestAccounts={props.autoSuggestAccounts}
          setAutoSuggestAccounts={props.setAutoSuggestAccounts}
          attachInvoiceImage={props.attachInvoiceImage}
          setAttachInvoiceImage={props.setAttachInvoiceImage}
          activeQuickOps={props.activeQuickOps}
          toggleQuickOp={props.toggleQuickOp}
          simpleCustomFields={props.simpleCustomFields}
          setSimpleCustomFields={props.setSimpleCustomFields}
          markDirty={markDirty}
        />
      ) : (
        <ModuleDisabledFallback moduleId="simple-entries" {...disabledProps} />
      );
  case "opening-balances":
    return moduleSectionEnabled("opening-balances") ? (
      <OpeningBalancesSettings
        openingFyStart={props.openingFyStart}
        setOpeningFyStart={props.setOpeningFyStart}
        openingBalanceEnforced={props.openingBalanceEnforced}
        setOpeningBalanceEnforced={props.setOpeningBalanceEnforced}
        openingLockAfterApproval={props.openingLockAfterApproval}
        setOpeningLockAfterApproval={props.setOpeningLockAfterApproval}
        openingCustomFields={props.openingCustomFields}
        setOpeningCustomFields={props.setOpeningCustomFields}
        markDirty={markDirty}
      />
    ) : (
      <ModuleDisabledFallback moduleId="opening-balances" {...disabledProps} />
    );
    case "fixed-assets":
      return moduleSectionEnabled("fixed-assets") ? (
        <FixedAssetsSettings
          depreciationMethod={props.depreciationMethod}
          setDepreciationMethod={props.setDepreciationMethod}
          monthlyDepreciationAuto={props.monthlyDepreciationAuto}
          setMonthlyDepreciationAuto={props.setMonthlyDepreciationAuto}
          depreciationEntryAuto={props.depreciationEntryAuto}
          setDepreciationEntryAuto={props.setDepreciationEntryAuto}
          assetCategories={props.assetCategories}
          fixedCustomFields={props.fixedCustomFields}
          setFixedCustomFields={props.setFixedCustomFields}
          markDirty={markDirty}
        />
      ) : (
        <ModuleDisabledFallback moduleId="fixed-assets" {...disabledProps} />
      );
    case "audit":
      return moduleSectionEnabled("audit") ? (
        <AuditSettings
          auditThreshold={props.auditThreshold}
          setAuditThreshold={props.setAuditThreshold}
          auditRetention={props.auditRetention}
          setAuditRetention={props.setAuditRetention}
          auditLogEntries={props.auditLogEntries}
          setAuditLogEntries={props.setAuditLogEntries}
          auditLogAuth={props.auditLogAuth}
          setAuditLogAuth={props.setAuditLogAuth}
          auditCustomFields={props.auditCustomFields}
          setAuditCustomFields={props.setAuditCustomFields}
          markDirty={markDirty}
        />
      ) : (
        <ModuleDisabledFallback moduleId="audit" {...disabledProps} />
      );
    default:
      return null;
  }
}