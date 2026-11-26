"use client";

import { FiRotateCcw, FiSave } from "react-icons/fi";

export default function AccountingSettingsStickyBar({ onReset, onSave }) {
  return (
    <div className="sticky bottom-0 z-10 mx-auto mt-2 w-full max-w-[690px] border-t border-[#E8EDF2] bg-white px-8 py-3.5">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2.5 text-[13.5px] text-[#64748B] transition hover:text-[#334155]"
        >
          <FiRotateCcw className="size-4" />
          استعادة الإعدادات الافتراضية
        </button>

        <button
          type="button"
          onClick={onSave}
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-5 text-[13px] font-medium text-white transition hover:bg-primary-dark"
        >
          <FiSave className="size-4" />
          حفظ جميع الإعدادات
        </button>
      </div>
    </div>
  );
}