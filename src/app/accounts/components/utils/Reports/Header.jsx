"use client";

import React from "react";
import { FiDownload, FiFilter } from "react-icons/fi";

const Header = ({
  title = "التقارير المالية",
  description = "نظرة شاملة على الأداء المالي والرسوم البيانية والتقارير الجاهزة للتصدير.",
  onExport,
  onFilter,
}) => {
  return (
    <header
      dir="rtl"
      className="flex flex-col gap-4 rounded-2xl bg-white px-6 py-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)] sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="text-right">
        <h1 className="text-[24px] font-bold leading-8 text-[#1b7398]">
          {title}
        </h1>
        <p className="mt-2 text-[14px] leading-5 text-[#4b5563]">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => onFilter?.()}
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#d5dde2] bg-white px-4 text-[13px] font-bold text-[#374151] transition hover:bg-[#f8fafc]"
        >
          <FiFilter size={16} />
          تصفية الفترة
        </button>
        <button
          type="button"
          onClick={() => onExport?.()}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#1b7398] px-4 text-[13px] font-bold text-white transition hover:bg-[#165e7d]"
        >
          <FiDownload size={16} />
          تصدير ملخص
        </button>
      </div>
    </header>
  );
};

export default Header;
