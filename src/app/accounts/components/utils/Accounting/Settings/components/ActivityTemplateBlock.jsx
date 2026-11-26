"use client";

import { FiInfo, FiShoppingBag } from "react-icons/fi";
import { activityTemplates } from "../settingsConstants";
import { Chip } from "../SettingsUi";

export default function ActivityTemplateBlock({
  activityTemplate,
  setActivityTemplate,
  setSavedAt,
  activityPreview,
  hydrated,
  onApply,
}) {
  return (
    <>
    <div className="flex items-start gap-3">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[#FDE68A] bg-[#FFF7ED] text-[#C2410C]">
        <FiShoppingBag className="size-5" />
      </span>
      <div className="min-w-0 flex-1 text-end">
        <div className="flex flex-wrap items-center justify-end gap-2">
          <h2 className="text-[17px] font-bold text-primary">قالب النشاط التجاري</h2>
          <Chip tone="accent">موصى به</Chip>
        </div>
        <p className="mt-1 text-[12px] leading-6 text-[#64748B]">
          اختاري نوع نشاطك لتفعيل الإعدادات المقترحة تلقائيًا.
        </p>
      </div>
    </div>

    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-stretch">
      <select
        value={activityTemplate}
        onChange={(e) => {
          setActivityTemplate(e.target.value);
          setSavedAt(false);
        }}
        className="h-11 w-full shrink-0 rounded-xl border border-[#E2E8F0] bg-white px-3 text-sm text-[#334155] focus:border-primary focus:outline-none sm:max-w-[240px]"
      >
        {activityTemplates.map((opt) => (
          <option key={opt.value || "empty"} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="flex min-h-[44px] min-w-0 flex-1 items-center rounded-xl border border-dashed border-[#C4B5A5] bg-white/60 px-4 py-2.5">
        {activityPreview ? (
          <span className="w-full whitespace-pre-line text-end text-[11px] leading-5 text-[#57534E]">
            {activityPreview}
          </span>
        ) : (
          <span className="w-full text-end text-[11px] leading-5 text-[#A8A29E]">
            .معاينة الإعدادات المقترحة ستظهر هنا بعد اختيار النشاط
          </span>
        )}
      </div>
      <button
        type="button"
        disabled={!activityTemplate || !hydrated}
        onClick={onApply}
        className="inline-flex h-11 w-full shrink-0 items-center justify-center rounded-xl bg-[#1B4D66] px-8 text-sm font-bold text-white transition hover:bg-[#153a4f] disabled:cursor-not-allowed disabled:border disabled:border-[#E5E7EB] disabled:bg-[#E8EAED] disabled:text-[#9CA3AF] sm:w-auto sm:min-w-[140px]"
      >
        تطبيق القالب
      </button>
    </div>

    <p className="mt-4 flex items-center justify-end gap-2 text-end text-[11px] leading-5 text-[#78716C]">
      <FiInfo className="size-4 shrink-0 text-[#D97706]" aria-hidden />
      <span>.يمكنك تعديل أي إعداد يدويًا بعد التطبيق</span>
    </p>
    </>
  );
}

