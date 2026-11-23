"use client";

import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const cx = (...c) => c.filter(Boolean).join(" ");

const DEFAULT_SEGMENTS = [
  {
    id: "construction",
    name: "مقاولات وإنشاءات كبرى",
    amount: 2183425,
    formattedAmount: "2,183,425",
    percent: 45,
    color: "#115978",
  },
  {
    id: "retail",
    name: "قطاع الجملة والشركات الصغيرة",
    amount: 1310090,
    formattedAmount: "1,310,090",
    percent: 27,
    color: "#1b7398",
  },
  {
    id: "pos",
    name: "موزع رئيسي معتمد",
    amount: 776350,
    formattedAmount: "776,350",
    percent: 16,
    color: "#2a8cb5",
  },
  {
    id: "individuals",
    name: "عملاء VIP وأفراد",
    amount: 388175,
    formattedAmount: "388,175",
    percent: 8,
    color: "#67b7d8",
  },
  {
    id: "government",
    name: "جهات حكومية وشبه حكومية",
    amount: 194150,
    formattedAmount: "194,150",
    percent: 4,
    color: "#b7dfef",
  },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0]?.payload;
  if (!item) return null;

  return (
    <div
      dir="rtl"
      className="rounded-xl border border-[#e2e8f0] bg-white px-3.5 py-2.5 text-right shadow-md"
    >
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="text-[12px] font-bold text-[#1f2937]">
          {item.name}
        </span>
      </div>
      <div className="mt-1 flex items-center justify-between gap-4 text-[11.5px]">
        <span dir="ltr" className="font-extrabold text-[#1b7398]">
          {item.formattedAmount} ر.س
        </span>
        <span dir="ltr" className="font-bold text-[#475569]">
          {item.percent}%
        </span>
      </div>
    </div>
  );
};

const SalesbarChart = ({
  title = "توزيع المبيعات حسب تصنيف العميل",
  subtitle = "نظرة عامة على حجم الإيرادات حسب القطاعات الرئيسية",
  centerTotal = "4.85M",
  centerSubLabel = "من إجمالي المبيعات",
  segments = DEFAULT_SEGMENTS,
  onSelectSegment,
  className = "",
}) => {
  return (
    <section
      dir="rtl"
      className={cx(
        "rounded-[22px] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      {/* ===== رأس البطاقة ===== */}
      <div className="text-right">
        <h2 className="text-[14.5px] font-extrabold text-[#1f2937]">
          {title}
        </h2>
        <p className="mt-1 text-[11px] font-medium leading-4 text-[#6b7280]">
          {subtitle}
        </p>
      </div>

      {/* ===== مخطط Recharts الدائري ===== */}
      <div className="relative mx-auto my-4 h-[176px] w-[176px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={segments}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={56}
              outerRadius={76}
              paddingAngle={2}
              stroke="none"
              onClick={(entry) => onSelectSegment?.(entry)}
            >
              {segments.map((seg) => (
                <Cell
                  key={seg.id}
                  fill={seg.color}
                  className={cx(onSelectSegment && "cursor-pointer")}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* النص الداخلي في منتصف الحلقة */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span
            dir="ltr"
            className="text-[17px] font-extrabold leading-5 text-[#111827]"
          >
            {centerTotal}
          </span>
          <span className="mt-0.5 text-[10px] font-medium text-[#6b7280]">
            {centerSubLabel}
          </span>
        </div>
      </div>

      {/* ===== قائمة القطاعات ونسبها ===== */}
      <div className="space-y-3 border-t border-[#f1f5f9] pt-3.5">
        {segments.map((seg) => (
          <div
            key={seg.id}
            role={onSelectSegment ? "button" : undefined}
            tabIndex={onSelectSegment ? 0 : undefined}
            onClick={() => onSelectSegment?.(seg)}
            onKeyDown={(e) => {
              if (!onSelectSegment) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectSegment(seg);
              }
            }}
            className={cx(
              "space-y-1.5",
              onSelectSegment && "cursor-pointer rounded-lg p-1 hover:bg-[#f8fafc]"
            )}
          >
            <div className="flex items-start justify-between gap-2 text-[11.5px]">
              <div className="flex min-w-0 items-center gap-2 text-right">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="truncate font-bold text-[#374151]">
                  {seg.name}
                </span>
              </div>

              <span
                dir="ltr"
                className="shrink-0 font-extrabold text-[#111827]"
              >
                {seg.formattedAmount}{" "}
                <span className="text-[10px] font-semibold text-[#6b7280]">
                  ر.س
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, Math.max(0, seg.percent))}%`,
                    backgroundColor: seg.color,
                  }}
                />
              </div>
              <span
                dir="ltr"
                className="w-8 text-left text-[10.5px] font-bold text-[#64748b]"
              >
                {seg.percent}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SalesbarChart;