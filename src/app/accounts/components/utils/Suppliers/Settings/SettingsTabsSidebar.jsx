"use client";

import React from "react";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiGitMerge,
  FiHeadphones,
  FiLock,
  FiShield,
  FiSliders,
} from "react-icons/fi";
import { LuHistory, LuShapes } from "react-icons/lu";

export const SETTINGS_TABS = [
  {
    id: "categories",
    label: "تصنيفات الموردين",
    Icon: LuShapes,
  },
  {
    id: "custom-fields",
    label: "الحقول المخصصة",
    Icon: FiCheckCircle,
    badge: 5,
  },
  {
    id: "payment-policies",
    label: "سياسات الدفع والاعتماد",
    Icon: FiShield,
  },
  {
    id: "accounting-integration",
    label: "التكامل المحاسبي",
    Icon: FiGitMerge,
  },
  {
    id: "permissions-matrix",
    label: "مصفوفة الصلاحيات",
    Icon: FiSliders,
  },
  {
    id: "audit-log",
    label: "سجل التدقيق والتعديلات",
    Icon: LuHistory,
    locked: true,
  },
];

const SettingsTabsSidebar = ({
  activeTab,
  onTabChange,
  tabs = SETTINGS_TABS,
  onOpenGuide,
}) => {
  return (
    <aside
      dir="rtl"
      className="flex w-full flex-col justify-between rounded-[22px] border border-[#e6ecf2] bg-white p-4 text-[#1e293b] shadow-2xs lg:w-[270px] lg:shrink-0"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      <div>
        {/* عنوان القائمة */}
        <p className="mb-3 px-2 text-right text-[12px] font-bold text-[#64748b]">
          أقسام التهيئة والسياسات
        </p>

        {/* التبويبات */}
        <nav className="flex flex-col gap-1.5" role="tablist" aria-orientation="vertical">
          {tabs.map((tab) => {
            const Icon = tab.Icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange?.(tab.id)}
                className={`group flex w-full items-center justify-between gap-3 rounded-[14px] px-3.5 py-3 text-right transition ${
                  isActive
                    ? "bg-[#eef5fa] font-black text-[#086382]"
                    : "font-bold text-[#334155] hover:bg-[#f8fafc]"
                }`}
              >
                {/* الأيقونة + النص */}
                <div className="flex min-w-0 items-center gap-3">
                  <Icon
                    className={`size-5 shrink-0 transition ${
                      isActive
                        ? "text-[#086382]"
                        : "text-[#475569] group-hover:text-[#086382]"
                    }`}
                  />
                  <span className="text-[14px] leading-snug">{tab.label}</span>
                </div>

                {/* المؤشر النشط أو الشارة أو القفل على اليسار */}
                <div className="flex shrink-0 items-center gap-2">
                  {typeof tab.badge === "number" && (
                    <span
                      className={`flex h-6 min-w-6 items-center justify-center rounded-[7px] px-1.5 text-[11.5px] font-extrabold tabular-nums ${
                        isActive
                          ? "bg-[#086382] text-white"
                          : "bg-[#e2e8f0] text-[#475569]"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}

                  {tab.locked && (
                    <FiLock className="size-4 text-[#94a3b8]" aria-label="مقيد" />
                  )}

                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="h-6 w-1.5 rounded-full bg-[#086382]"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* كارت المساعدة السفلي */}
      <div className="mt-6 rounded-[16px] bg-[#f1f5f9] p-4 text-right">
        <div className="flex items-center gap-2 text-[#086382]">
          <FiHeadphones className="size-5 shrink-0" />
          <h3 className="text-[15px] font-black">تحتاج مساعدة؟</h3>
        </div>

        <p className="mt-2 text-[12px] font-semibold leading-relaxed text-[#64748b]">
          دليل إعدادات المشتريات متوفر بالكامل في مركز المعرفة المحاسبي.
        </p>

        <button
          type="button"
          onClick={onOpenGuide}
          className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-extrabold text-[#086382] transition hover:opacity-80"
        >
          <span>فتح وثيقة الشرح</span>
          <FiArrowLeft className="size-4" />
        </button>
      </div>
    </aside>
  );
};

export default SettingsTabsSidebar;