"use client";

import React, { useEffect, useState } from "react";
import {
  FiCalendar,
  FiChevronDown,
  FiFilter,
  FiRotateCcw,
} from "react-icons/fi";

const Filters = ({
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

  useEffect(() => {
    setLocalPeriod(period);
  }, [period]);

  useEffect(() => {
    setLocalBranch(branch);
  }, [branch]);

  useEffect(() => {
    setLocalEntryType(entryType);
  }, [entryType]);

  useEffect(() => {
    setLocalDateRange(dateRange);
  }, [dateRange]);

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
    const defaultPeriod = "fy24_q3";
    const defaultBranch = "all";
    const defaultEntryType = "all";
    const defaultDateRange = "01/07/2024 - 30/09/2024";

    setLocalPeriod(defaultPeriod);
    setLocalBranch(defaultBranch);
    setLocalEntryType(defaultEntryType);
    setLocalDateRange(defaultDateRange);

    onPeriodChange?.(defaultPeriod);
    onBranchChange?.(defaultBranch);
    onEntryTypeChange?.(defaultEntryType);
    onDateRangeChange?.(defaultDateRange);
    onReset?.();
  };

  return (
    <section
      dir="rtl"
      className="rounded-[20px] mt-4 mb-6 border border-[#e6ecf2] bg-white p-4 text-[#1e293b]"
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
          <label className="mb-1.5 block text-[11.5px] font-bold text-[#475569]">
            الفترة المالية
          </label>
          <div className="relative">
            <select
              value={localPeriod}
              onChange={(e) => setLocalPeriod(e.target.value)}
              className="h-[38px] w-full appearance-none rounded-[10px] border border-[#e2e8f0] bg-white pr-3 pl-8 text-[12px] font-extrabold text-[#0f172a] focus:border-[#086382] focus:outline-none"
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
          <label className="mb-1.5 block text-[11.5px] font-bold text-[#475569]">
            الفرع والمستودع
          </label>
          <div className="relative">
            <select
              value={localBranch}
              onChange={(e) => setLocalBranch(e.target.value)}
              className="h-[38px] w-full appearance-none rounded-[10px] border border-[#e2e8f0] bg-white pr-3 pl-8 text-[12px] font-extrabold text-[#0f172a] focus:border-[#086382] focus:outline-none"
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
          <label className="mb-1.5 block text-[11.5px] font-bold text-[#475569]">
            نوع القيد
          </label>
          <div className="relative">
            <select
              value={localEntryType}
              onChange={(e) => setLocalEntryType(e.target.value)}
              className="h-[38px] w-full appearance-none rounded-[10px] border border-[#e2e8f0] bg-white pr-3 pl-8 text-[12px] font-extrabold text-[#0f172a] focus:border-[#086382] focus:outline-none"
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
            <label className="mb-1.5 block text-[11.5px] font-bold text-[#475569]">
              النطاق الزمني
            </label>
            <div className="relative">
              <input
                type="text"
                value={localDateRange}
                onChange={(e) => setLocalDateRange(e.target.value)}
                className="h-[38px] w-full rounded-[10px] border border-[#e2e8f0] bg-[#f8fafc] pr-3 pl-8 text-[11.5px] font-bold text-[#334155] focus:border-[#086382] focus:bg-white focus:outline-none"
              />
              <FiCalendar className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex h-[38px] shrink-0 items-center gap-1.5 rounded-[10px] bg-[#086382] px-4 text-[12px] font-extrabold text-white transition hover:bg-[#064e67]"
          >
            <FiFilter className="h-3.5 w-3.5" />
            <span>تطبيق</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            aria-label="إعادة ضبط الفلاتر"
            className="inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] border border-[#e2e8f0] bg-white text-[#475569] transition hover:bg-[#f8fafc]"
          >
            <FiRotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filters;