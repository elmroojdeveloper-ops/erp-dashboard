"use client";

import React from "react";
import { FiPrinter, FiDownload, FiRefreshCw } from "react-icons/fi";

const Header = ({
  title = "تقارير وإحصائيات الأرصدة الافتتاحية",
  subtitle = "تحليل شامل لاتجاهات الأرصدة الافتتاحية ومقارنتها مع السنوات السابقة مع مؤشرات الحوكمة المحاسبية",
  onPrint,
  onExportFullReport,
  onRefreshData,
}) => {
  return (
    <header
      dir="rtl"
      className="flex mt-4 flex-wrap items-center justify-between gap-4 py-1 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Left Side: Action Buttons */}
      

      {/* Right Side: Title & Subtitle */}
      <div className="min-w-0 text-right">
        <h1 className="text-[22px] font-black leading-[1.3] text-[#0f172a] sm:text-[24px]">
          {title}
        </h1>
        <p className="mt-1 text-[11.5px] font-medium leading-[1.45] text-[#64748b]">
          {subtitle}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onPrint}
          className="inline-flex h-[34px] items-center gap-1.5 rounded-[9px] border border-[#e2e8f0] bg-white px-3 text-[11.5px] font-bold text-[#475569] transition hover:bg-[#f8fafc]"
        >
          <FiPrinter className="h-3.5 w-3.5 text-[#64748b]" />
          <span>طباعة التقرير</span>
        </button>

        <button
          type="button"
          onClick={onExportFullReport}
          className="inline-flex h-[34px] items-center gap-1.5 rounded-[9px] bg-[#086382] px-3.5 text-[11.5px] font-extrabold text-white transition hover:bg-[#064e67]"
        >
          <FiDownload className="h-3.5 w-3.5" />
          <span>تصدير التقرير الشامل (PDF / Excel)</span>
        </button>

        <button
          type="button"
          onClick={onRefreshData}
          className="inline-flex h-[34px] items-center gap-1.5 rounded-[9px] border border-[#e2e8f0] bg-white px-3 text-[11.5px] font-bold text-[#475569] transition hover:bg-[#f8fafc]"
        >
          <FiRefreshCw className="h-3.5 w-3.5 text-[#64748b]" />
          <span>تحديث البيانات</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
