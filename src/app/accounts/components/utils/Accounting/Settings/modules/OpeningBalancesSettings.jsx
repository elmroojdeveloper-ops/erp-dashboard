"use client";

import { FiCalendar, FiShield } from "react-icons/fi";
import { openingControlToggles } from "../settingsConstants";
import {
  CardShell,
  CustomFieldsCard,
  ModuleHeading,
  RowNote,
  Toggle,
} from "../SettingsUi";

export default function OpeningBalancesSettings({
  openingFyStart,
  setOpeningFyStart,
  openingBalanceEnforced,
  setOpeningBalanceEnforced,
  openingLockAfterApproval,
  setOpeningLockAfterApproval,
  openingCustomFields,
  setOpeningCustomFields,
  markDirty,
}) {
  const openingControlState = {
    openingBalanceEnforced: {
      checked: openingBalanceEnforced,
      set: setOpeningBalanceEnforced,
    },
    openingLockAfterApproval: {
      checked: openingLockAfterApproval,
      set: setOpeningLockAfterApproval,
    },
  };

  return (
    <div className="flex flex-col gap-5">
      <ModuleHeading title="إعدادات: الأرصدة الافتتاحية" />
      <CardShell
        chip="01"
        icon={FiCalendar}
        iconBg="bg-[#E8F3FA] text-primary"
        title="فترة الأرصدة الافتتاحية"
        desc="تاريخ بداية السنة المالية المرتبطة بالأرصدة الافتتاحية."
      >
        <input
          type="date"
          value={openingFyStart}
          onChange={(e) => {
            setOpeningFyStart(e.target.value);
            markDirty();
          }}
          className="h-11 w-full max-w-lg rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm font-medium focus:border-primary focus:bg-white focus:outline-none"
        />
      </CardShell>

      <CardShell
        chip="02"
        icon={FiShield}
        iconBg="bg-[#FFFBEB] text-[#D97706]"
        title="ضوابط الإدخال"
        desc="التحقق قبل الاعتماد وإقفال الدفعة بعدها."
      >
        <ul className="space-y-3">
          {openingControlToggles.map((row) => {
            const binding = openingControlState[row.key];
            return (
              <li
                key={row.key}
                className="flex items-start justify-between gap-4 rounded-xl border border-[#EEF2F6] px-4 py-3"
              >
                <RowNote title={row.title} desc={row.desc} />
                <Toggle
                  checked={binding.checked}
                  onChange={(v) => {
                    binding.set(v);
                    markDirty();
                  }}
                  ariaLabel={row.title}
                />
              </li>
            );
          })}
        </ul>
      </CardShell>

      <CustomFieldsCard
        chip="03"
        desc="حقول إضافية على شاشة الأرصدة الافتتاحية (مثل رقم المشروع)."
        fields={openingCustomFields}
        setFields={setOpeningCustomFields}
        onDirty={markDirty}
      />
    </div>
  );
}