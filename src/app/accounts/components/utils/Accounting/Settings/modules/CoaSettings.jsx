"use client";

import { FiGitBranch, FiSliders } from "react-icons/fi";
import { MdOutlineAccountBalance } from "react-icons/md";
import { coaStructureToggles, coaTemplates } from "../settingsConstants";
import {
  CardShell,
  CustomFieldsCard,
  ModuleHeading,
  RowNote,
  Toggle,
} from "../SettingsUi";

export default function CoaSettings({
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
  markDirty,
}) {
  const structureState = {
    unlimitedSubLevels: {
      checked: unlimitedSubLevels,
      set: setUnlimitedSubLevels,
    },
    unifiedNumbering: {
      checked: unifiedNumbering,
      set: setUnifiedNumbering,
    },
    preventDeleteWithBalance: {
      checked: preventDeleteWithBalance,
      set: setPreventDeleteWithBalance,
    },
  };

  return (
    <div className="flex flex-col gap-5">
      <ModuleHeading title="إعدادات: دليل الحسابات" />

      <CardShell
        chip="01"
        icon={FiSliders}
        iconBg="bg-[#E8F3FA] text-primary"
        title="تفعيل الميزة"
        desc="تشغيل دليل الحسابات وشجرة الحسابات داخل النظام."
      >
        <div className="flex items-center justify-between gap-4 rounded-xl border border-[#EEF2F6] px-4 py-3">
          <p className="text-sm font-bold text-[#1E293B]">تفعيل دليل الحسابات</p>
          <Toggle
            checked={coaFeatureOn}
            onChange={(v) => {
              setCoaFeatureOn(v);
              markDirty();
            }}
            ariaLabel="تفعيل دليل الحسابات"
          />
        </div>
      </CardShell>

      <CardShell
        chip="02"
        icon={MdOutlineAccountBalance}
        iconBg="bg-[#FFFBEB] text-[#D97706]"
        title="قالب شجرة الحسابات"
        desc="نقطة البداية لشجرة الحسابات — يمكن تعديلها لاحقاً."
      >
        <select
          value={coaTemplate}
          onChange={(e) => {
            setCoaTemplate(e.target.value);
            markDirty();
          }}
          className="h-11 w-full max-w-lg rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm font-medium focus:border-primary focus:bg-white focus:outline-none"
        >
          {coaTemplates.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </CardShell>

      <CardShell
        chip="03"
        icon={FiGitBranch}
        iconBg="bg-[#F0FDF4] text-[#15803D]"
        title="بنية الحسابات"
        desc="قواعد المستويات والترقيم وحماية الحسابات المستخدمة."
      >
        <ul className="space-y-3">
          {coaStructureToggles.map((row) => {
            const binding = structureState[row.key];
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
        chip="04"
        desc="أضيفي حقولاً خاصة بنشاطك لقسم «دليل الحسابات» دون الحاجة إلى تطوير — مثل رقم المشروع أو رمز الموسم."
        fields={coaCustomFields}
        setFields={setCoaCustomFields}
        onDirty={markDirty}
      />
    </div>
  );
}