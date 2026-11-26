"use client";

import React, { useState } from "react";
import {
  FiRefreshCw,
  FiPrinter,
  FiDownload,
  FiChevronDown,
  FiCalendar,
  FiFilter,
  FiClock,
} from "react-icons/fi";

const Header = ({
  title = "تقارير الموردين الشاملة",
  subtitle = "تحليل شامل لأداء الموردين، المستحقات، وجدول أعمال الموردين والمعاملات المالية الدورية.",
  dateRangeLabel = "01/01/2026 م - 31/03/2026 م",
  categorySummary = "جميع التصنيفات (142 مورد)",
  lastUpdatedTime = "11:42 ص",
  lastUpdatedDay = "اليوم",
  syncModeLabel = "تحديث تلقائي",
  onRefresh,
  onPrint,
  onExportPdf,
  onExportExcel,
  onPresetChange,
  onDateRangeClick,
  onCategoryClick,
}) => {
  const [activePreset, setActivePreset] = useState("current-quarter");
  const [exportMenuOpen, setExportMenuOpen] = useState(false);

  const presets = [
    { id: "current-quarter", label: "الربع الحالي" },
    { id: "previous-quarter", label: "الربع السابق" },
    { id: "new-year", label: "السنة الجديدة" },
  ];

  const handleSelectPreset = (presetId) => {
    setActivePreset(presetId);
    onPresetChange?.(presetId);
  };

  return (
    <header
      dir="rtl"
      className="space-y-3.5 mt-6 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Row: Title + Subtitle (Right) & Action Buttons (Left) */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="text-right">
          <h1 className="text-[22px] font-black leading-snug text-[#086382]">
            {title}
          </h1>
          <p className="mt-1 text-[12px] font-semibold text-[#64748b]">
            {subtitle}
          </p>
        </div>

        <div className="relative flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex h-[34px] items-center gap-1.5 rounded-[9px] border border-[#dce4ec] bg-white px-3 text-[11.5px] font-bold text-[#334155] transition hover:border-[#086382] hover:text-[#086382]"
          >
            <FiRefreshCw className="h-3.5 w-3.5 text-[#086382]" />
            <span>تحديث البيانات</span>
          </button>

          <button
            type="button"
            onClick={onPrint}
            className="inline-flex h-[34px] items-center gap-1.5 rounded-[9px] border border-[#dce4ec] bg-white px-3 text-[11.5px] font-bold text-[#334155] transition hover:border-[#086382] hover:text-[#086382]"
          >
            <FiPrinter className="h-3.5 w-3.5 text-[#086382]" />
            <span>طباعة التقرير</span>
          </button>

          {/* Export Dropdown Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setExportMenuOpen((prev) => !prev)}
              className="inline-flex h-[34px] items-center gap-2 rounded-[9px] bg-[#086382] px-3.5 text-[11.5px] font-extrabold text-white shadow-xs transition hover:bg-[#064f68]"
            >
              <FiDownload className="h-3.5 w-3.5" />
              <span>تصدير التقرير (PDF / Excel)</span>
              <FiChevronDown className="h-3.5 w-3.5 opacity-90" />
            </button>

            {exportMenuOpen && (
              <div
                onMouseLeave={() => setExportMenuOpen(false)}
                className="absolute left-0 top-[38px] z-30 w-44 rounded-[12px] border border-[#e2e8f0] bg-white p-1.5 text-right shadow-md"
              >
                <button
                  type="button"
                  onClick={() => {
                    setExportMenuOpen(false);
                    onExportPdf?.();
                  }}
                  className="flex w-full items-center justify-between rounded-[8px] px-3 py-2 text-[11.5px] font-bold text-[#334155] transition hover:bg-[#f1f6f9] hover:text-[#086382]"
                >
                  <span>تصدير PDF</span>
                  <span className="text-[10px] font-extrabold text-[#086382]">
                    PDF
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setExportMenuOpen(false);
                    onExportExcel?.();
                  }}
                  className="flex w-full items-center justify-between rounded-[8px] px-3 py-2 text-[11.5px] font-bold text-[#334155] transition hover:bg-[#f1f6f9] hover:text-[#047857]"
                >
                  <span>تصدير Excel</span>
                  <span className="text-[10px] font-extrabold text-[#047857]">
                    XLSX
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row: Filter Strip + Last Sync Box */}
      <div className="flex flex-wrap items-stretch justify-between gap-3">
        {/* Filters Container */}
        <div className="flex flex-1 flex-wrap items-center justify-between gap-2.5 rounded-[16px] border border-[#e6ecf2] bg-white px-3.5 py-2.5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Date Range Picker Pill */}
            <button
              type="button"
              onClick={onDateRangeClick}
              className="inline-flex h-[32px] items-center gap-2 rounded-[9px] border border-[#e2e8f0] bg-[#fafcfd] px-3 text-[11.5px] font-bold text-[#334155] transition hover:border-[#086382]"
            >
              <FiCalendar className="h-3.5 w-3.5 text-[#086382]" />
              <span className="tabular-nums">{dateRangeLabel}</span>
              <FiChevronDown className="h-3 w-3 text-[#64748b]" />
            </button>

            {/* Period Presets */}
            <div className="flex items-center gap-1 rounded-[9px] bg-[#f1f5f9] p-0.5">
              {presets.map((preset) => {
                const isSelected = activePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`rounded-[7px] px-2.5 py-1 text-[11px] font-extrabold transition ${
                      isSelected
                        ? "bg-white text-[#086382] shadow-2xs"
                        : "text-[#64748b] hover:text-[#1e293b]"
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filter Pill */}
          <button
            type="button"
            onClick={onCategoryClick}
            className="inline-flex h-[32px] items-center gap-2 rounded-[9px] border border-[#e2e8f0] bg-[#fafcfd] px-3 text-[11.5px] font-bold text-[#334155] transition hover:border-[#086382]"
          >
            <FiFilter className="h-3.5 w-3.5 text-[#086382]" />
            <span>{categorySummary}</span>
            <FiChevronDown className="h-3 w-3 text-[#64748b]" />
          </button>
        </div>

        {/* Last Sync Timestamp Card */}
        <div className="flex items-center gap-2.5 rounded-[16px] border border-[#e6ecf2] bg-white px-4 py-2">
          <div className="text-right leading-tight">
            <div className="text-[12px] font-black text-[#0f172a] tabular-nums">
              {lastUpdatedTime}
            </div>
            <div className="text-[10.5px] font-bold text-[#086382]">
              {lastUpdatedDay}
            </div>
          </div>

          <div className="h-7 w-[1px] bg-[#e2e8f0]" />

          <div className="text-right leading-tight">
            <div className="inline-flex items-center gap-1 text-[10.5px] font-bold text-[#64748b]">
              <FiClock className="h-3 w-3 text-[#086382]" />
              <span>{syncModeLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;