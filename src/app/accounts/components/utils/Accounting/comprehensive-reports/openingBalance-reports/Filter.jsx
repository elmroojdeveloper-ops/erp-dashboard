"use client";

import React from "react";
import { FiCalendar, FiList, FiFilter } from "react-icons/fi";
import { LuListChecks, LuGitFork } from "react-icons/lu";

const defaultOptions = {
  periods: [
    "السنة المالية 2024 - الربع الثالث",
    "السنة المالية 2026 - السنة الكاملة",
    "السنة المالية 2025 - السنة الكاملة",
    "السنة المالية 2024 - السنة الكاملة",
  ],
  scopes: [
    "جميع النطاقات الرقابية",
    "الأرصدة الافتتاحية",
    "القيود اليومية والرقابة",
    "الذمم والمطابقات",
  ],
  matchingStatuses: [
    "الكل (مطابق ومعلق)",
    "مطابق ومعتمد فقط",
    "معلق / قيد المراجعة",
    "غير مطابق / فجوات",
  ],
  branches: [
    "كافة الفروع والمراكز",
    "المركز الرئيسي - الرياض",
    "فرع جدة التجاري",
    "فرع المنطقة الشرقية",
  ],
};

const Filter = ({
  filters = {
    period: "السنة المالية 2024 - الربع الثالث",
    scope: "جميع النطاقات الرقابية",
    matchingStatus: "الكل (مطابق ومعلق)",
    branch: "كافة الفروع والمراكز",
  },
  options = defaultOptions,
  onChange,
  onReset,
}) => {
  const handleFieldChange = (field, value) => {
    onChange?.({
      ...filters,
      [field]: value,
    });
  };

  return (
    <section
      dir="rtl"
      className="mt-4 rounded-[18px] border border-[#e6ecf2] bg-white p-3 text-[#1e293b] shadow-[0_1px_2px_rgba(15,23,42,0.02)]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="flex flex-col items-stretch gap-2.5 lg:flex-row lg:items-center">
        {/* 4 Filter Controls (Right to Left in RTL) */}
        <div className="grid flex-1 grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
          {/* الفترة المالية */}
          <label className="relative flex cursor-pointer items-center justify-between gap-3 rounded-[12px] border border-[#e6ecf2] bg-[#f4f7fa] px-3.5 py-2.5 transition hover:border-[#cbd5e1]">
            <div className="min-w-0 flex-1 text-right">
              <span className="block text-[10.5px] font-bold text-[#64748b]">
                الفترة المالية
              </span>
              <select
                value={filters.period}
                onChange={(e) => handleFieldChange("period", e.target.value)}
                className="mt-0.5 w-full cursor-pointer appearance-none bg-transparent text-[12px] font-black text-[#0f172a] outline-none"
              >
                {options.periods.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <FiCalendar className="h-4 w-4 shrink-0 text-[#475569]" />
          </label>

          {/* نطاق التدقيق */}
          <label className="relative flex cursor-pointer items-center justify-between gap-3 rounded-[12px] border border-[#e6ecf2] bg-[#f4f7fa] px-3.5 py-2.5 transition hover:border-[#cbd5e1]">
            <div className="min-w-0 flex-1 text-right">
              <span className="block text-[10.5px] font-bold text-[#64748b]">
                نطاق التدقيق
              </span>
              <select
                value={filters.scope}
                onChange={(e) => handleFieldChange("scope", e.target.value)}
                className="mt-0.5 w-full cursor-pointer appearance-none bg-transparent text-[12px] font-black text-[#0f172a] outline-none"
              >
                {options.scopes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <LuListChecks className="h-4 w-4 shrink-0 text-[#475569]" />
          </label>

          {/* حالة المطابقة */}
          <label className="relative flex cursor-pointer items-center justify-between gap-3 rounded-[12px] border border-[#e6ecf2] bg-[#f4f7fa] px-3.5 py-2.5 transition hover:border-[#cbd5e1]">
            <div className="min-w-0 flex-1 text-right">
              <span className="block text-[10.5px] font-bold text-[#64748b]">
                حالة المطابقة
              </span>
              <select
                value={filters.matchingStatus}
                onChange={(e) =>
                  handleFieldChange("matchingStatus", e.target.value)
                }
                className="mt-0.5 w-full cursor-pointer appearance-none bg-transparent text-[12px] font-black text-[#0f172a] outline-none"
              >
                {options.matchingStatuses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <FiList className="h-4 w-4 shrink-0 text-[#475569]" />
          </label>

          {/* الفرع ومركز التكلفة */}
          <label className="relative flex cursor-pointer items-center justify-between gap-3 rounded-[12px] border border-[#e6ecf2] bg-[#f4f7fa] px-3.5 py-2.5 transition hover:border-[#cbd5e1]">
            <div className="min-w-0 flex-1 text-right">
              <span className="block text-[10.5px] font-bold text-[#64748b]">
                الفرع ومركز التكلفة
              </span>
              <select
                value={filters.branch}
                onChange={(e) => handleFieldChange("branch", e.target.value)}
                className="mt-0.5 w-full cursor-pointer appearance-none bg-transparent text-[12px] font-black text-[#0f172a] outline-none"
              >
                {options.branches.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <LuGitFork className="h-4 w-4 shrink-0 text-[#475569]" />
          </label>
        </div>

        {/* Left Reset / Filter Action Button */}
        <button
          type="button"
          onClick={() => onReset?.()}
          title="إعادة ضبط الفلاتر"
          className="flex h-[48px] w-[48px] shrink-0 items-center justify-center self-center rounded-[12px] border border-[#e2e8f0] bg-[#eef2f6] text-[#334155] transition hover:bg-[#e2e8f0] lg:h-auto lg:self-stretch"
        >
          <FiFilter className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};

export default Filter;