"use client";

import { FiCheck, FiDownload, FiSave } from "react-icons/fi";

export default function AccountingSettingsHeader({
  hydrated,
  savedAt,
  saveMessage,
  onImport,
  onSave,
}) {
  return (
    <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-bold text-primary sm:text-[28px]">
            إدارة نظام المحاسبة
          </h1>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#A7E9C4] bg-[#ECFDF3] px-2.5 py-1 text-[11px] font-bold text-[#15803D]">
            <span className="size-1.5 rounded-full bg-[#16A34A]" />
            ساري المفعول
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-[13px] leading-6 text-[#64748B]">
          خصّصي كل جزء من نظام المحاسبة ليتناسب مع طبيعة نشاطك — بغضّ النظر عن
          نوع أو حجم شركتك.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 sm:flex-row-reverse">
        {hydrated && savedAt ? (
          <span className="inline-flex items-center gap-2 rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-2 text-[12px] font-semibold text-[#15803D]">
            <FiCheck className="size-4" />
            {saveMessage || "تم الحفظ"}
          </span>
        ) : null}
        {hydrated && !savedAt ? (
          <span className="inline-flex items-center gap-2 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2 text-[12px] font-semibold text-[#B45309]">
            لديك تغييرات — احفظ لتثبيتها
          </span>
        ) : null}
        <button
          type="button"
          onClick={onImport}
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#475569] shadow-card hover:bg-[#F8FAFC]"
        >
          <FiDownload className="size-[18px]" />
          استيراد إعدادات من قالب جاهز
        </button>
        <button
          type="button"
          onClick={onSave}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#1B4D66] px-5 text-sm font-bold text-white shadow-card hover:bg-[#153a4f]"
        >
          <FiSave className="size-[18px]" />
          حفظ جميع الإعدادات
        </button>
      </div>
    </header>
  );
}