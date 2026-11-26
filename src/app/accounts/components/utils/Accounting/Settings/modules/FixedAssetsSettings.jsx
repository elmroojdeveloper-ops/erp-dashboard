"use client";

import { FiClock, FiLayers } from "react-icons/fi";
import { MdOutlineAssessment } from "react-icons/md";
import {
  depreciationMethods,
  fixedDepreciationCycleToggles,
} from "../settingsConstants";
import { CardShell, CustomFieldsCard, ModuleHeading, Toggle } from "../SettingsUi";

export default function FixedAssetsSettings({
  depreciationMethod,
  setDepreciationMethod,
  monthlyDepreciationAuto,
  setMonthlyDepreciationAuto,
  depreciationEntryAuto,
  setDepreciationEntryAuto,
  assetCategories,
  fixedCustomFields,
  setFixedCustomFields,
  markDirty,
}) {
  const depreciationCycleState = {
    monthlyDepreciationAuto: {
      checked: monthlyDepreciationAuto,
      set: setMonthlyDepreciationAuto,
    },
    depreciationEntryAuto: {
      checked: depreciationEntryAuto,
      set: setDepreciationEntryAuto,
    },
  };

  return (
    <div className="flex flex-col gap-5">
      <ModuleHeading title="إعدادات: الأصول الثابتة" />
      <CardShell
        chip="01"
        icon={MdOutlineAssessment}
        iconBg="bg-[#E8F3FA] text-primary"
        title="طريقة الإهلاك الافتراضية"
        desc="تُطبَّق تلقائياً على الأصول الجديدة ويمكن تغييرها لكل أصل على حدة."
      >
        <select
          value={depreciationMethod}
          onChange={(e) => {
            setDepreciationMethod(e.target.value);
            markDirty();
          }}
          className="h-11 w-full max-w-lg rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm font-medium focus:border-primary focus:bg-white focus:outline-none"
        >
          {depreciationMethods.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </CardShell>

      <CardShell
        chip="02"
        icon={FiClock}
        iconBg="bg-[#F0FDF4] text-[#15803D]"
        title="دورة الإهلاك"
        desc="جدولة احتساب وقيد الإهلاك الشهري."
      >
        <ul className="space-y-3">
          {fixedDepreciationCycleToggles.map((row) => {
            const binding = depreciationCycleState[row.key];
            return (
              <li
                key={row.key}
                className="flex items-center justify-between gap-4 rounded-xl border border-[#EEF2F6] px-4 py-3"
              >
                <p className="text-sm font-bold text-[#1E293B]">{row.title}</p>
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

      <CardShell
        chip="03"
        icon={FiLayers}
        iconBg="bg-[#FFFBEB] text-[#D97706]"
        title="فئات الأصول"
        desc="الفئات الافتراضية المتاحة عند تسجيل أصل جديد."
      >
        <div className="flex flex-wrap gap-2">
          {assetCategories.map((cat) => (
            <span
              key={cat}
              className="inline-flex h-9 items-center rounded-full border border-[#BBD9EA] bg-[#E8F3FA] px-4 text-[12px] font-bold text-primary"
            >
              {cat}
            </span>
          ))}
        </div>
      </CardShell>

      <CustomFieldsCard
        chip="04"
        desc="حقول إضافية على بطاقة الأصل الثابت دون تعديل برمجي."
        fields={fixedCustomFields}
        setFields={setFixedCustomFields}
        onDirty={markDirty}
      />
    </div>
  );
}