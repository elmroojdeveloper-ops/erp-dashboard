"use client";

import React, { useState } from "react";
import { FiRotateCcw, FiSave } from "react-icons/fi";

function formatNowArabicTime() {
  const now = new Date();
  const hours24 = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const period = hours24 >= 12 ? "م" : "ص";
  const hours12 = String(hours24 % 12 || 12).padStart(2, "0");
  return `اليوم في ${hours12}:${minutes} ${period}`;
}

const SettingsFooter = ({
  lastSavedText = "اليوم في 11:20 ص",
  lastSavedBy = "أحمد المحاسب",
  hasUnsavedChanges = false,
  isSaving = false,
  onSave,
  onResetDefaults,
}) => {
  const [savedStamp, setSavedStamp] = useState(lastSavedText);
  const [savedActor, setSavedActor] = useState(lastSavedBy);

  const handleSaveClick = async () => {
    if (isSaving) return;
    await onSave?.();
    setSavedStamp(formatNowArabicTime());
    setSavedActor(lastSavedBy);
  };

  return (
    <footer
      dir="rtl"
      className="flex w-full flex-col justify-between gap-4 rounded-[20px] border border-[#e6ecf2] bg-white px-5 py-4 text-[#1e293b] shadow-2xs lg:flex-row lg:items-center"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* يمين الفوتر: مؤشر حالة آخر حفظ */}
      <div className="flex items-center gap-2.5 text-right">
        <span
          aria-hidden="true"
          className={`size-2.5 shrink-0 rounded-full ${
            hasUnsavedChanges ? "bg-[#d97706]" : "bg-[#047857]"
          }`}
        />

        <p className="text-[12.5px] font-semibold leading-relaxed text-[#64748b] sm:text-[13px]">
          {hasUnsavedChanges ? (
            <>
              <span className="font-extrabold text-[#b45309]">
                توجد تغييرات غير محفوظة
              </span>{" "}
              — آخر حفظ: {savedStamp} بواسطة{" "}
              <strong className="font-black text-[#0f172a]">{savedActor}</strong>
            </>
          ) : (
            <>
              تم حفظ آخر تعديل {savedStamp} بواسطة{" "}
              <strong className="font-black text-[#0f172a]">{savedActor}</strong>
            </>
          )}
        </p>
      </div>

      {/* يسار الفوتر: استعادة الإعدادات الافتراضية + حفظ التغييرات وتطبيقها فوراً */}
      <div className="flex flex-wrap items-center gap-3 self-end lg:self-center">
        <button
          type="button"
          onClick={onResetDefaults}
          disabled={isSaving}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-[13px] border border-[#e2e8f0] bg-[#e9eef4] px-4 text-[13px] font-extrabold text-[#475569] transition hover:bg-[#dfe6ef] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiRotateCcw className="size-4" />
          <span>استعادة الإعدادات الافتراضية</span>
        </button>

        <button
          type="button"
          onClick={handleSaveClick}
          disabled={isSaving}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-[13px] bg-[#086382] px-5 text-[13px] font-extrabold text-white transition hover:bg-[#06516b] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiSave className="size-4" />
          <span>
            {isSaving ? "جاري الحفظ..." : "حفظ التغييرات وتطبيقها فوراً"}
          </span>
        </button>
      </div>
    </footer>
  );
};

export default SettingsFooter;