"use client";

import React, { useState } from "react";
import {
  FiCalendar,
  FiChevronDown,
  FiFilter,
  FiRotateCcw,
} from "react-icons/fi";

const Filter = ({
  period = "fy24_q3",
  onPeriodChange,
  branch = "all",
  onBranchChange,
  entryType = "all",
  onEntryTypeChange,
  dateRange = "01/07/2024 - 30/09/2024",
  onDateRangeChange,
  onApply,
  onReset,
}) => {
  const [localPeriod, setLocalPeriod] = useState(period);
  const [localBranch, setLocalBranch] = useState(branch);
  const [localEntryType, setLocalEntryType] = useState(entryType);
  const [localDateRange, setLocalDateRange] = useState(dateRange);

  const handleApply = (e) => {
    e?.preventDefault();
    onPeriodChange?.(localPeriod);
    onBranchChange?.(localBranch);
    onEntryTypeChange?.(localEntryType);
    onDateRangeChange?.(localDateRange);
    onApply?.({
      period: localPeriod,
      branch: localBranch,
      entryType: localEntryType,
      dateRange: localDateRange,
    });
  };

  const handleReset = () => {
    setLocalPeriod("fy24_q3");
    setLocalBranch("all");
    setLocalEntryType("all");
    setLocalDateRange("01/07/2024 - 30/09/2024");
    onReset?.();
  };

  return (
    <section
      dir="rtl"
      className="rounded-xl border border-[#e6ecf2] bg-white p-3.5 shadow-2xs text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      <form
        onSubmit={handleApply}
        className="grid grid-cols-1 gap-3 md:grid-cols-12 items-end"
      >
        {/* الفترة المالية */}
        <div className="md:col-span-3">
          <label className="mb-1 block text-[10.5px] font-bold text-[#64748b]">
            الفترة المالية
          </label>
          <div className="relative">
            <select
              value={localPeriod}
              onChange={(e) => setLocalPeriod(e.target.value)}
              className="h-[36px] w-full appearance-none rounded-lg border border-[#e2e8f0] bg-white pr-3 pl-7 text-[11.5px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
            >
              <option value="fy24_q3">السنة المالية 2024 (الربع الثالث)</option>
              <option value="fy24_q2">السنة المالية 2024 (الربع الثاني)</option>
              <option value="fy24_q1">السنة المالية 2024 (الربع الأول)</option>
              <option value="fy24_full">السنة المالية 2024 بالكامل</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
          </div>
        </div>

        {/* الفرع والمستودع */}
        <div className="md:col-span-3">
          <label className="mb-1 block text-[10.5px] font-bold text-[#64748b]">
            الفرع والمستودع
          </label>
          <div className="relative">
            <select
              value={localBranch}
              onChange={(e) => setLocalBranch(e.target.value)}
              className="h-[36px] w-full appearance-none rounded-lg border border-[#e2e8f0] bg-white pr-3 pl-7 text-[11.5px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
            >
              <option value="all">جميع الفروع والمستودعات</option>
              <option value="riyadh_hq">الرياض - الفرع الرئيسي</option>
              <option value="jeddah_ops">جدة - العمليات اللوجستية</option>
              <option value="eastern_khobar">المنطقة الشرقية - الخبر</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
          </div>
        </div>

        {/* نوع القيد */}
        <div className="md:col-span-2">
          <label className="mb-1 block text-[10.5px] font-bold text-[#64748b]">
            نوع القيد
          </label>
          <div className="relative">
            <select
              value={localEntryType}
              onChange={(e) => setLocalEntryType(e.target.value)}
              className="h-[36px] w-full appearance-none rounded-lg border border-[#e2e8f0] bg-white pr-3 pl-7 text-[11.5px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
            >
              <option value="all">كافة القيود (يدوية وآلية)</option>
              <option value="auto">قيود آلية</option>
              <option value="manual">قيود يدوية وتسويات</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
          </div>
        </div>

        {/* النطاق الزمني + أزرار التحكم */}
        <div className="md:col-span-4 flex items-end gap-2">
          <div className="flex-1 min-w-0">
            <label className="mb-1 block text-[10.5px] font-bold text-[#64748b]">
              النطاق الزمني
            </label>
            <div className="relative">
              <input
                type="text"
                value={localDateRange}
                onChange={(e) => setLocalDateRange(e.target.value)}
                className="h-[36px] w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] pr-3 pl-8 text-[11px] font-bold text-[#334155] focus:border-[#0d658a] focus:bg-white focus:outline-none"
              />
              <FiCalendar className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex h-[36px] shrink-0 items-center gap-1.5 rounded-lg bg-[#0d658a] px-3.5 text-[11.5px] font-bold text-white transition hover:bg-[#094e6b]"
          >
            <FiFilter className="h-3.5 w-3.5" />
            <span>تطبيق</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            aria-label="إعادة ضبط الفلاتر"
            className="inline-flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#64748b] transition hover:bg-[#f8fafc]"
          >
            <FiRotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;