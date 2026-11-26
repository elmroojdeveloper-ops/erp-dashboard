"use client";

import React from "react";
import {
  FiRefreshCw,
  FiSliders,
  FiPrinter,
  FiDownload,
} from "react-icons/fi";

const Header = ({
  title = "سجل عمليات التدقيق والرقابة",
  statusBadgeText = "مُحدّث: الربع الثالث 2024 - تدقيق دوري",
  isRefreshing = false,
  onRefresh,
  onCustomizeReport,
  onPrint,
  onExport,
}) => {
  return (
    <header
      dir="rtl"
      className="rounded-[22px] border border-[#e6ecf2] bg-white px-5 py-4 text-[#1e293b] shadow-[0_1px_2px_rgba(15,23,42,0.02)]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Right Side: Title & Status Pill Below */}
        <div className="flex flex-col items-start text-right">
          <h1 className="text-[20px] font-black leading-[1.25] text-[#0f172a] sm:text-[22px]">
            {title}
          </h1>

          <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-[#f1f5f9] px-3 py-1 text-[11px] font-extrabold text-[#086382]">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full bg-[#048a5e]"
            />
            <span>{statusBadgeText}</span>
          </div>
        </div>

        {/* Left Side: Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onRefresh?.()}
            disabled={isRefreshing}
            className="inline-flex h-[36px] shrink-0 items-center gap-1.5 rounded-[10px] border border-[#e2e8f0] bg-white px-3 text-[11.5px] font-bold text-[#334155] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiRefreshCw
              className={`h-3.5 w-3.5 text-[#475569] ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />
            <span>{isRefreshing ? "جاري التحديث..." : "تحديث"}</span>
          </button>

          <button
            type="button"
            onClick={() => onCustomizeReport?.()}
            className="inline-flex h-[36px] shrink-0 items-center gap-1.5 rounded-[10px] bg-[#086382] px-3.5 text-[11.5px] font-extrabold text-white transition hover:bg-[#064f68]"
          >
            <FiSliders className="h-3.5 w-3.5 text-white" />
            <span>تخصيص التقرير</span>
          </button>

          <button
            type="button"
            onClick={() => onPrint?.()}
            className="inline-flex h-[36px] shrink-0 items-center gap-1.5 rounded-[10px] border border-[#e2e8f0] bg-white px-3 text-[11.5px] font-bold text-[#334155] transition hover:bg-[#f8fafc]"
          >
            <FiPrinter className="h-3.5 w-3.5 text-[#475569]" />
            <span>طباعة</span>
          </button>

          <button
            type="button"
            onClick={() => onExport?.()}
            className="inline-flex h-[36px] shrink-0 items-center gap-1.5 rounded-[10px] border border-[#e2e8f0] bg-white px-3 text-[11.5px] font-bold text-[#334155] transition hover:bg-[#f8fafc]"
          >
            <FiDownload className="h-3.5 w-3.5 text-[#475569]" />
            <span dir="auto">تصدير (PDF / Excel)</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;