"use client";

import React from "react";
import { FiCalendar, FiArrowLeft } from "react-icons/fi";

const defaultCategories = [
  {
    id: "assets",
    label: "الأصول",
    count: 410,
    percentage: "28.8%",
    fillPercent: 78,
    accentPercent: 4,
    mainColor: "#1d6f96",
    accentColor: "#b8dff2",
    countColor: "#1d6f96",
    nature: "debit",
  },
  {
    id: "liabilities",
    label: "الخصوم",
    count: 260,
    percentage: "18.3%",
    fillPercent: 52,
    accentPercent: 3,
    mainColor: "#6d727d",
    accentColor: "#dcdbe4",
    countColor: "#6d727d",
    nature: "credit",
  },
  {
    id: "equity",
    label: "الملكية",
    count: 110,
    percentage: "7.8%",
    fillPercent: 25,
    accentPercent: 4,
    mainColor: "#b8dff2",
    accentColor: "#1d6f96",
    countColor: "#6d727d",
    nature: "credit",
  },
  {
    id: "revenues",
    label: "الإيرادات",
    count: 340,
    percentage: "24.0%",
    fillPercent: 72,
    accentPercent: 3.5,
    mainColor: "#046847",
    accentColor: "#0c855c",
    countColor: "#046847",
    nature: "credit",
  },
  {
    id: "expenses",
    label: "المصروفات",
    count: 300,
    percentage: "21.1%",
    fillPercent: 64,
    accentPercent: 3,
    mainColor: "#b81d1d",
    accentColor: "#f3c5c5",
    countColor: "#b81d1d",
    nature: "debit",
  },
];

const Chart = ({
  title = "توزيع الحسابات والأرصدة حسب النوع",
  subtitle = "مقارنة عدد الحسابات وإجمالي الأرصدة التراكمية لكل فئة محاسبية رئيسية",
  periodLabel = "السنة المالية 2024 - جميع الفروع",
  categories = defaultCategories,
  onViewDetails,
}) => {
  return (
    <section
      dir="rtl"
      className="flex h-full flex-col justify-between lg:col-span-2 rounded-[24px] border border-[#e6ecf2] bg-white p-5 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header Row */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="text-right">
          <h2 className="text-[19px] font-black leading-[1.3] text-[#0f172a]">
            {title}
          </h2>
          <p className="mt-1 text-[12px] font-medium leading-[1.5] text-[#64748b]">
            {subtitle}
          </p>
        </div>

        <div className="inline-flex h-[34px] shrink-0 items-center gap-2 rounded-[10px] border border-[#dcebf3] bg-[#f2f8fc] px-3.5 text-[12px] font-bold text-[#1d6f96]">
          <span>{periodLabel}</span>
          <FiCalendar className="h-3.5 w-3.5 shrink-0 text-[#1d6f96]" />
        </div>
      </div>

      {/* 5 Vertical Segmented Columns */}
      <div className="mt-6 grid grid-cols-5 items-end gap-3 sm:gap-5 px-1 sm:px-3">
        {categories.map((item) => {
          const remainingPercent = Math.max(
            0,
            100 - item.fillPercent - item.accentPercent
          );

          return (
            <div
              key={item.id}
              className="flex flex-col items-center text-center"
            >
              {/* Top Count */}
              <span
                className="mb-2.5 text-[16px] font-black leading-none"
                style={{ color: item.countColor }}
              >
                {item.count}
              </span>

              {/* Rounded Vertical Track */}
              <div className="flex h-[215px] w-full max-w-[116px] flex-col justify-end overflow-hidden rounded-[12px] bg-[#edf3f7]">
                <div
                  className="w-full"
                  style={{ height: `${remainingPercent}%` }}
                />
                {item.accentPercent > 0 && (
                  <div
                    className="w-full"
                    style={{
                      height: `${item.accentPercent}%`,
                      backgroundColor: item.accentColor,
                    }}
                  />
                )}
                <div
                  className="w-full"
                  style={{
                    height: `${item.fillPercent}%`,
                    backgroundColor: item.mainColor,
                  }}
                />
              </div>

              {/* Bottom Category Label & Percentage */}
              <div className="mt-3 leading-tight">
                <div className="text-[15px] font-extrabold text-[#0f172a]">
                  {item.label}
                </div>
                <div className="mt-1 text-[12px] font-semibold text-[#64748b]">
                  {item.percentage}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Legend & Link Bar */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[14px] bg-[#f7f9fb] px-4 py-3 text-[12px]">
        <button
          type="button"
          onClick={onViewDetails}
          className="inline-flex items-center gap-1.5 font-extrabold text-[#1d6f96] transition hover:underline"
        >
          <FiArrowLeft className="h-3.5 w-3.5 shrink-0" />
          <span>عرض تفاصيل الأرصدة الشاملة</span>
        </button>

        <div className="flex flex-wrap items-center gap-5 font-bold text-[#475569]">
          <span className="inline-flex items-center gap-2">
            <span>خصوم وحقوق وإيرادات (طبيعة دائنة)</span>
            <span className="h-[10px] w-[10px] rounded-full bg-[#046847]" />
          </span>

          <span className="inline-flex items-center gap-2">
            <span>أصول ومصروفات (طبيعة مدينة)</span>
            <span className="h-[10px] w-[10px] rounded-full bg-[#1d6f96]" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Chart;