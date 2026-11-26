"use client";

import { FiLock } from "react-icons/fi";
import { ModuleHeading } from "../SettingsUi";

export default function ModuleDisabledPanel({
  moduleId,
  label,
  onEnableEntries,
  onEnableCoa,
  markDirty,
}) {
  const innerFeatureOnly = moduleId === "entries" || moduleId === "coa";

  return (
    <div className="flex flex-col gap-4">
      <ModuleHeading title={`إعدادات: ${label}`} />
      <div className="rounded-2xl border border-[#E2E8F0] bg-white px-6 py-16 text-center shadow-card">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#E8F3FA] text-primary">
          <FiLock className="size-5" />
        </span>
        <p className="mt-4 text-base font-bold text-[#1E293B]">
          قسم «{label}» غير مفعّل حالياً
        </p>
        <p className="mx-auto mt-3 max-w-md text-[13px] leading-6 text-[#64748B]">
          {innerFeatureOnly
            ? "فعّل الميزة من البطاقة أدناه أو من زر التفعيل لعرض إعدادات هذا القسم."
            : `فعّل المفتاح بجانب «${label}» في «أقسام النظام» على اليمين لعرض الإعدادات.`}
        </p>
        {innerFeatureOnly ? (
          <button
            type="button"
            onClick={() => {
              if (moduleId === "entries") onEnableEntries();
              else onEnableCoa();
              markDirty();
            }}
            className="mt-6 inline-flex h-10 items-center rounded-xl bg-primary px-5 text-[13px] font-bold text-white"
          >
            تفعيل {label}
          </button>
        ) : null}
      </div>
    </div>
  );
}