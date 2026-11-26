"use client";

import { FiClock, FiRotateCcw, FiSave } from "react-icons/fi";

export default function AccountingSettingsStickyBar({ onReset, onSave }) {
  return (
    <div className="sticky bottom-0 z-10 -mx-1 mt-2 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3 shadow-card sm:px-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-[12px] text-[#64748B]">
          <FiClock className="size-4" />
          آخر تعديل على الوحدة بواسطة:{" "}
          <strong className="text-[#334155]">سلطان العتيبي</strong> (اليوم
          الساعة 10:45 ص)
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 text-[13px] font-semibold text-[#475569]"
          >
            <FiRotateCcw className="size-4" />
            استعادة الإعدادات الافتراضية
          </button>
          <button
            type="button"
            onClick={onSave}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#1B4D66] px-5 text-[13px] font-bold text-white"
          >
            <FiSave className="size-4" />
            حفظ جميع الإعدادات
          </button>
        </div>
      </div>
    </div>
  );
}