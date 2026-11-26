"use client";

import { FiChevronDown, FiInfo } from "react-icons/fi";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { activityTemplates } from "../settingsConstants";

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
      {/* العنوان */}
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#F0DDB8] bg-[#F9EBD1] text-[#C0792A]">
          <HiOutlineBuildingStorefront className="size-5" />
        </span>

        <div className="min-w-0 flex-1 text-start">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-[18px] font-bold leading-7 text-primary">
              قالب النشاط التجاري
            </h2>
            <span className="inline-flex items-center rounded-full bg-[#F8E7C6] px-2.5 py-0.5 text-[10px] font-medium text-[#B7791F]">
              موصى به
            </span>
          </div>
          <p className="mt-0.5 text-[12px] leading-5 text-[#64748B]">
            اختاري نوع نشاطك لتفعيل الإعدادات المقترحة تلقائيًا.
          </p>
        </div>
      </div>

      {/* الاختيار + المعاينة + الزرار */}
      <div className="mt-[18px] flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="relative w-full shrink-0 sm:w-[312px]">
          <select
            value={activityTemplate}
            onChange={(e) => {
              setActivityTemplate(e.target.value);
              setSavedAt(false);
            }}
            className={`h-[41px] w-full appearance-none rounded-xl border border-[#D8E1EA] bg-white pe-9 ps-4 text-[13.5px] outline-none focus:border-primary ${
              activityTemplate ? "text-[#334155]" : "text-[#94A3B8]"
            }`}
          >
            {activityTemplates.map((opt) => (
              <option key={opt.value || "empty"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <FiChevronDown className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[#64748B]" />
        </div>

        <div className="flex min-h-[41px] min-w-0 flex-1 items-center rounded-xl border border-dashed border-[#DCCFB8] bg-white/60 px-4 py-2">
          {activityPreview ? (
            <span className="w-full whitespace-pre-line text-start text-[11.5px] leading-5 text-[#57534E]">
              {activityPreview}
            </span>
          ) : (
            <span className="w-full text-start text-[11.5px] leading-5 text-[#A3A3A3]">
              معاينة الإعدادات المقترحة ستظهر هنا بعد اختيار النشاط.
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={!activityTemplate || !hydrated}
          onClick={onApply}
          className="inline-flex h-[41px] w-full shrink-0 items-center justify-center rounded-xl bg-primary px-4 text-[13.5px] font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-[#E3E8EF] disabled:font-medium disabled:text-[#9AA5B8] disabled:hover:bg-[#E3E8EF] sm:w-[106px]"
        >
          تطبيق القالب
        </button>
      </div>

      {/* الملاحظة */}
      <p className="mt-3 flex items-center gap-1.5 text-start text-[11px] leading-5 text-[#78716C]">
        <FiInfo className="size-3.5 shrink-0 text-[#94A3B8]" aria-hidden />
        <span>يمكنك تعديل أي إعداد يدويًا بعد التطبيق.</span>
      </p>
    </>
  );
}