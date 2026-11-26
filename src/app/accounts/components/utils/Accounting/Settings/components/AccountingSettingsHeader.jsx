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
    <header className="flex flex-col gap-1.5">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <h1 className="text-2xl font-bold leading-[44px] tracking-tight text-primary sm:text-[30px]">
          إدارة نظام المحاسبة
        </h1>

        <div className="flex flex-wrap items-center gap-2.5">
          {hydrated && savedAt ? (
            <span className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] px-3 text-xs font-semibold text-[#15803D]">
              <FiCheck className="size-4" />
              {saveMessage || "تم الحفظ"}
            </span>
          ) : null}
          {hydrated && !savedAt ? (
            <span className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-3 text-xs font-semibold text-[#B45309]">
              لديك تغييرات — احفظ لتثبيتها
            </span>
          ) : null}

          <button
            type="button"
            onClick={onImport}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 text-xs font-medium text-[#475569] transition hover:bg-[#F8FAFC]"
          >
            <FiDownload className="size-4" />
            استيراد إعدادات من قالب جاهز
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

      <p className="text-start text-[13.5px] leading-6 text-[#64748B]">
        خصّصي كل جزء من نظام المحاسبة ليتناسب مع طبيعة نشاطك — بغضّ النظر عن نوع
        أو حجم شركتك.
      </p>
    </header>
  );
}