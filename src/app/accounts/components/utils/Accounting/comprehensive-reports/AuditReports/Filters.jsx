"use client";

import React, { useEffect, useState } from "react";
import { FiCalendar, FiChevronDown } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";

const Filters = ({
  periodRange = "2022_2026",
  onPeriodRangeChange,
  branchScope = "all",
  onBranchScopeChange,
  quickRange = "last_5_years",
  onQuickRangeChange,
  onChange,
}) => {
  const [localPeriodRange, setLocalPeriodRange] = useState(periodRange);
  const [localBranchScope, setLocalBranchScope] = useState(branchScope);
  const [localQuickRange, setLocalQuickRange] = useState(quickRange);

  useEffect(() => {
    setLocalPeriodRange(periodRange);
  }, [periodRange]);

  useEffect(() => {
    setLocalBranchScope(branchScope);
  }, [branchScope]);

  useEffect(() => {
    setLocalQuickRange(quickRange);
  }, [quickRange]);

  const emitChange = (nextValues) => {
    onChange?.(nextValues);
  };

  const handlePeriodChange = (e) => {
    const value = e.target.value;
    setLocalPeriodRange(value);
    onPeriodRangeChange?.(value);
    emitChange({
      periodRange: value,
      branchScope: localBranchScope,
      quickRange: localQuickRange,
    });
  };

  const handleBranchChange = (e) => {
    const value = e.target.value;
    setLocalBranchScope(value);
    onBranchScopeChange?.(value);
    emitChange({
      periodRange: localPeriodRange,
      branchScope: value,
      quickRange: localQuickRange,
    });
  };

  const handleQuickRangeSelect = (value) => {
    setLocalQuickRange(value);
    onQuickRangeChange?.(value);
    emitChange({
      periodRange: localPeriodRange,
      branchScope: localBranchScope,
      quickRange: value,
    });
  };

  const quickButtons = [
    { id: "last_3_years", line1: "آخر 3", line2: "سنوات" },
    { id: "last_5_years", line1: "آخر 5", line2: "سنوات" },
    { id: "all_years", line1: "كافة", line2: "السنوات" },
  ];

  return (
    <section
      dir="rtl"
      className="mt-5 rounded-[18px] border border-[#e6ecf2] bg-white px-5 py-4 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="flex flex-col items-stretch justify-between gap-4 lg:flex-row lg:items-end">
        {/* Right Side: Period Dropdown + Branch Dropdown */}
        <div className="w-full max-w-[540px] space-y-3">
          {/* المدى المحاسبي للتحليل */}
          <div>
            <label className="mb-1.5 block text-right text-[11px] font-bold text-[#64748b]">
              المدى المحاسبي للتحليل
            </label>
            <div className="relative">
              <select
                value={localPeriodRange}
                onChange={handlePeriodChange}
                className="h-[38px] w-full appearance-none rounded-[10px] border border-[#e2e8f0] bg-[#eef4f8] pr-3.5 pl-14 text-right text-[11.5px] font-bold text-[#1e293b] focus:border-[#086382] focus:bg-white focus:outline-none"
              >
                <option value="2022_2026">
                  من سنة: 2022 م — إلى سنة: 2026 م (السنوات الخمس الأخيرة)
                </option>
                <option value="2023_2026">
                  من سنة: 2023 م — إلى سنة: 2026 م
                </option>
                <option value="2024_2026">
                  من سنة: 2024 م — إلى سنة: 2026 م
                </option>
                <option value="2026_only">السنة المالية 2026 م فقط</option>
              </select>
              <FiChevronDown className="pointer-events-none absolute left-9 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#475569]" />
              <FiCalendar className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#086382]" />
            </div>
          </div>

          {/* نطاق الفروع ومراكز التكلفة */}
          <div>
            <label className="mb-1.5 block text-right text-[11px] font-bold text-[#64748b]">
              نطاق الفروع ومراكز التكلفة
            </label>
            <div className="relative">
              <select
                value={localBranchScope}
                onChange={handleBranchChange}
                className="h-[38px] w-full appearance-none rounded-[10px] border border-[#e2e8f0] bg-[#eef4f8] pr-3.5 pl-14 text-right text-[11.5px] font-bold text-[#1e293b] focus:border-[#086382] focus:bg-white focus:outline-none"
              >
                <option value="all">
                  الفرع: جميع الفروع ومراكز التكلفة المجمعة
                </option>
                <option value="hq">المركز الرئيسي - الرياض</option>
                <option value="jeddah">فرع جدة</option>
                <option value="khobar">فرع المنطقة الشرقية - الخبر</option>
              </select>
              <FiChevronDown className="pointer-events-none absolute left-9 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#475569]" />
              <LuBuilding2 className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#086382]" />
            </div>
          </div>
        </div>

        {/* Left Side: Quick Period Preset Buttons */}
        <div className="flex items-center gap-2.5 self-start lg:self-end lg:pb-1">
          <div className="text-right text-[11px] font-bold leading-[1.35] text-[#64748b]">
            <span className="block">اختيار</span>
            <span className="block">سريع:</span>
          </div>

          <div className="inline-flex items-center gap-1 rounded-[12px] border border-[#e2e8f0] bg-[#eef4f8] p-1">
            {quickButtons.map((btn) => {
              const isActive = localQuickRange === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => handleQuickRangeSelect(btn.id)}
                  className={`flex h-[48px] min-w-[66px] flex-col items-center justify-center rounded-[9px] px-2.5 text-[11px] leading-[1.25] transition ${
                    isActive
                      ? "bg-white font-extrabold text-[#086382]"
                      : "bg-transparent font-bold text-[#475569] hover:text-[#0f172a]"
                  }`}
                >
                  <span className="block">{btn.line1}</span>
                  <span className="block">{btn.line2}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filters;