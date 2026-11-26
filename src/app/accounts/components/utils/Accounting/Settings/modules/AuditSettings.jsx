"use client";

import { FiCalendar, FiSliders } from "react-icons/fi";
import { MdOutlineFactCheck } from "react-icons/md";
import { auditChangeLogToggles, retentionOptions } from "../settingsConstants";
import { formatAmountDisplay, sanitizeAmountDigits } from "../settingsFormat";
import { CardShell, CustomFieldsCard, ModuleHeading, Toggle } from "../SettingsUi";

export default function AuditSettings({
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
  markDirty,
}) {
  const auditLogState = {
    auditLogEntries: {
      checked: auditLogEntries,
      set: setAuditLogEntries,
    },
    auditLogAuth: {
      checked: auditLogAuth,
      set: setAuditLogAuth,
    },
  };

  return (
    <div className="flex flex-col gap-5">
      <ModuleHeading title="إعدادات: عمليات التدقيق" />
      <CardShell
        chip="01"
        icon={FiSliders}
        iconBg="bg-[#E8F3FA] text-primary"
        title="سقف المبلغ المستوجب لمراجعة إضافية"
        desc="أي عملية تتجاوز هذا المبلغ تُدرج تلقائياً في قائمة المراجعة."
      >
        <div className="relative max-w-lg">
          <input
            type="text"
            inputMode="numeric"
            value={formatAmountDisplay(auditThreshold)}
            onChange={(e) => {
              setAuditThreshold(sanitizeAmountDigits(e.target.value));
              markDirty();
            }}
            className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pe-14 ps-3 text-sm font-bold focus:border-primary focus:bg-white focus:outline-none"
          />
          <span className="absolute end-3 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-[#64748B]">
            ر.س
          </span>
        </div>
      </CardShell>

      <CardShell
        chip="02"
        icon={FiCalendar}
        iconBg="bg-[#FFFBEB] text-[#D97706]"
        title="مدة الاحتفاظ بالسجلات"
        desc="مدة أرشفة سجلات التدقيق بما يتوافق مع الجهات الرقابية."
      >
        <select
          value={auditRetention}
          onChange={(e) => {
            setAuditRetention(e.target.value);
            markDirty();
          }}
          className="h-11 w-full max-w-lg rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm font-medium focus:border-primary focus:bg-white focus:outline-none"
        >
          {retentionOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </CardShell>

      <CardShell
        chip="03"
        icon={MdOutlineFactCheck}
        iconBg="bg-[#F0FDF4] text-[#15803D]"
        title="سجل التغييرات"
        desc="تتبع التعديلات والوصول للمحافظة على الأدلة الرقابية."
      >
        <ul className="space-y-3">
          {auditChangeLogToggles.map((row) => {
            const binding = auditLogState[row.key];
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

      <CustomFieldsCard
        chip="04"
        desc="حقول إضافية على شاشات عمليات التدقيق (مثل رقم المشروع)."
        fields={auditCustomFields}
        setFields={setAuditCustomFields}
        onDirty={markDirty}
      />
    </div>
  );
}