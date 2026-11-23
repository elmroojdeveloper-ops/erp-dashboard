"use client";

import React, { useState } from "react";
import {
  FiDownload,
  FiPrinter,
  FiRefreshCw,
  FiCalendar,
  FiFilter,
  FiChevronDown,
} from "react-icons/fi";

const cx = (...c) => c.filter(Boolean).join(" ");

const QUICK_PERIODS = [
  { key: "current_month", label: "الشهر الحالي" },
  { key: "q3_2026", label: "الربع الثالث 2026" },
  { key: "fy_2026", label: "السنة المالية 2026" },
];

const DEFAULT_ACCOUNTS = [
  { value: "all", label: "جميع الحسابات (148 حساب)" },
  { value: "sales", label: "حسابات المبيعات" },
  { value: "receivables", label: "الذمم المدينة والعملاء" },
  { value: "collections", label: "التحصيلات النقدية" },
];

const Header = ({
  title = "تقارير المبيعات والتحليلات المالية",
  description = "تحليل شامل لأداء المبيعات، التحصيلات النقدية والذمم والعملاء وتقارير عمر الديون، المبيعات والامتثال الضريبي العام.",
  liveLabel = "محدّث لحظيًا — اليوم 11:45 ص",
  dateRangeText = "01/01/2026 إلى 31/03/2026",
  accounts = DEFAULT_ACCOUNTS,
  selectedPeriod: controlledPeriod,
  selectedAccount: controlledAccount,
  isRefreshing = false,
  onRefresh,
  onPrint,
  onExport,
  onPeriodChange,
  onAccountChange,
  onDateRangeClick,
  className = "",
}) => {
  const [internalPeriod, setInternalPeriod] = useState("q3_2026");
  const [internalAccount, setInternalAccount] = useState("all");

  const activePeriod = controlledPeriod ?? internalPeriod;
  const activeAccount = controlledAccount ?? internalAccount;

  const handlePeriodSelect = (periodKey) => {
    setInternalPeriod(periodKey);
    onPeriodChange?.(periodKey);
  };

  const handleAccountSelect = (e) => {
    const val = e.target.value;
    setInternalAccount(val);
    onAccountChange?.(val);
  };

  return (
    <header
      dir="rtl"
      className={cx(
        "rounded-[22px] bg-white px-5 py-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:px-6",
        className
      )}
    >
      {/* ===== الصف العلوي: العنوان والوصف + أزرار الإجراءات ===== */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 text-right">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#e8f8ef] px-3 py-1 text-[11px] font-bold text-[#159447]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#159447]" />
            <span>{liveLabel}</span>
          </div>

          <h1 className="text-[22px] font-extrabold leading-8 text-[#1b7398] sm:text-[24px]">
            {title}
          </h1>

          <p className="mt-1.5 max-w-2xl text-[12.5px] font-medium leading-[21px] text-[#5b6572]">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:shrink-0">
          <button
            type="button"
            disabled={isRefreshing}
            onClick={() => onRefresh?.()}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#d5dde2] bg-white px-3.5 text-[12.5px] font-bold text-[#374151] transition hover:bg-[#f8fafc] disabled:opacity-60"
          >
            <FiRefreshCw
              size={14}
              className={cx(isRefreshing && "animate-spin")}
            />
            <span>تحديث البيانات</span>
          </button>

          <button
            type="button"
            onClick={() => onPrint?.()}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#d5dde2] bg-white px-3.5 text-[12.5px] font-bold text-[#374151] transition hover:bg-[#f8fafc]"
          >
            <FiPrinter size={14} />
            <span>طباعة التقرير</span>
          </button>

          <button
            type="button"
            onClick={() => onExport?.()}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#1b7398] px-4 text-[12.5px] font-bold text-white shadow-2xs transition hover:bg-[#165e7d]"
          >
            <FiDownload size={14} />
            <span>تصدير التقرير (Excel / PDF)</span>
          </button>
        </div>
      </div>

      {/* ===== شريط الفلاتر السفلي داخل الهيدر ===== */}
      <div className="mt-4 space-y-3 border-t border-[#f1f5f9] pt-4">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* حقل الفترة الزمنية */}
          <button
            type="button"
            onClick={() => onDateRangeClick?.()}
            className="inline-flex h-9 items-center gap-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 text-[12px] font-bold text-[#334155] transition hover:border-[#1b7398]/50"
          >
            <FiCalendar size={13.5} className="text-[#1b7398]" />
            <span dir="ltr">{dateRangeText}</span>
          </button>

          {/* أزرار الفترات السريعة */}
          <div className="flex flex-wrap items-center gap-1.5">
            {QUICK_PERIODS.map((period) => {
              const isActive = activePeriod === period.key;
              return (
                <button
                  key={period.key}
                  type="button"
                  onClick={() => handlePeriodSelect(period.key)}
                  className={cx(
                    "inline-flex h-8 items-center justify-center rounded-lg px-3 text-[11.5px] font-bold transition",
                    isActive
                      ? "bg-[#1b7398] text-white shadow-2xs"
                      : "bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]"
                  )}
                >
                  {period.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* فلتر الحسابات */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative inline-flex items-center">
            <FiFilter
              size={13}
              className="pointer-events-none absolute right-3 text-[#1b7398]"
            />
            <select
              aria-label="فلترة حسب الحسابات"
              value={activeAccount}
              onChange={handleAccountSelect}
              className="h-9 appearance-none rounded-xl border border-[#e2e8f0] bg-white pl-8 pr-8 text-[12px] font-bold text-[#334155] transition focus:border-[#1b7398] focus:outline-none"
            >
              {accounts.map((acc) => (
                <option key={acc.value} value={acc.value}>
                  {acc.label}
                </option>
              ))}
            </select>
            <FiChevronDown
              size={14}
              className="pointer-events-none absolute left-2.5 text-[#64748b]"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;