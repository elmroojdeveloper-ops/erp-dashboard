"use client";

import { readyImportPackages } from "../settingsStorage";

export default function ImportSettingsModal({ open, onClose, onSelectPreset }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="import-modal-title"
    >
      <div className="w-full max-w-lg rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-card">
        <h3
          id="import-modal-title"
          className="text-lg font-bold text-[#0F172A]"
        >
          استيراد إعدادات من قالب جاهز
        </h3>
        <p className="mt-2 text-[12px] leading-5 text-[#64748B]">
          اختر حزمة جاهزة لتعبئة الإعدادات. يمكنك التعديل بعد الاستيراد ثم
          الحفظ.
        </p>
        <ul className="mt-4 space-y-2">
          {readyImportPackages.map((pkg) => (
            <li key={pkg.id}>
              <button
                type="button"
                onClick={() => onSelectPreset(pkg.id)}
                className="flex w-full flex-col gap-1 rounded-xl border border-[#E2E8F0] px-4 py-3 text-start transition hover:border-primary hover:bg-[#F8FCFF]"
              >
                <span className="text-sm font-bold text-[#1E293B]">
                  {pkg.title}
                </span>
                <span className="text-[11px] text-[#64748B]">
                  {pkg.description}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-xl border border-[#E2E8F0] py-2.5 text-[13px] font-semibold text-[#475569]"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
}