"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";
import { FiInfo } from "react-icons/fi";

const cx = (...c) => c.filter(Boolean).join(" ");

const DEFAULT_MONTHLY_DATA = [
  {
    month: "أغسطس 25",
    shortLabel: "أغسطس 25",
    sales: 520000,
    collected: 430000,
    collectionRate: 82.7,
    isCurrent: false,
  },
  {
    month: "سبتمبر 25",
    shortLabel: "سبتمبر 25",
    sales: 680000,
    collected: 565000,
    collectionRate: 83.1,
    isCurrent: false,
  },
  {
    month: "أكتوبر 25",
    shortLabel: "أكتوبر 25",
    sales: 590000,
    collected: 485000,
    collectionRate: 82.2,
    isCurrent: false,
  },
  {
    month: "نوفمبر 25",
    shortLabel: "نوفمبر 25",
    sales: 510000,
    collected: 420000,
    collectionRate: 82.4,
    isCurrent: false,
  },
  {
    month: "ديسمبر 25",
    shortLabel: "ديسمبر 25",
    sales: 540000,
    collected: 452000,
    collectionRate: 83.7,
    isCurrent: false,
  },
  {
    month: "يناير 26",
    shortLabel: "يناير 26",
    sales: 650000,
    collected: 542000,
    collectionRate: 83.4,
    isCurrent: false,
  },
  {
    month: "فبراير 26",
    shortLabel: "فبراير 26",
    sales: 575000,
    collected: 480000,
    collectionRate: 83.5,
    isCurrent: false,
  },
  {
    month: "مارس 26 الحالي",
    shortLabel: "مارس 26 الحالي",
    sales: 495000,
    collected: 412000,
    collectionRate: 83.2,
    isCurrent: true,
  },
];

const formatCurrency = (val) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(val || 0);

const CustomBarTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;

  return (
    <div
      dir="rtl"
      className="min-w-[185px] rounded-xl border border-[#e2e8f0] bg-white p-3 text-right shadow-md"
    >
      <p className="border-b border-[#f1f5f9] pb-1.5 text-[12px] font-extrabold text-[#1f2937]">
        {row.month}
      </p>
      <div className="mt-2 space-y-1.5 text-[11.5px]">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 font-semibold text-[#475569]">
            <span className="h-2 w-2 rounded-full bg-[#1b7398]" />
            <span>المبيعات المصدرة</span>
          </span>
          <span dir="ltr" className="font-extrabold text-[#1b7398]">
            {formatCurrency(row.sales)} ر.س
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 font-semibold text-[#475569]">
            <span className="h-2 w-2 rounded-full bg-[#475569]" />
            <span>المحصل</span>
          </span>
          <span dir="ltr" className="font-bold text-[#1f2937]">
            {formatCurrency(row.collected)} ر.س
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#f1f5f9] pt-1.5">
          <span className="font-semibold text-[#64748b]">نسبة التحصيل</span>
          <span dir="ltr" className="font-extrabold text-[#159447]">
            {row.collectionRate}%
          </span>
        </div>
      </div>
    </div>
  );
};

const CustomXAxisTick = ({ x, y, payload }) => {
  const label = payload?.value || "";
  const isCurrent = label.includes("الحالي");

  return (
    <g transform={`translate(${x},${y})`}>
      {isCurrent ? (
        <foreignObject x={-42} y={6} width={84} height={24}>
          <div className="flex h-full w-full items-center justify-center rounded-md bg-[#eaf4f8] px-1.5 text-[10px] font-extrabold text-[#1b7398]">
            {label}
          </div>
        </foreignObject>
      ) : (
        <text
          x={0}
          y={16}
          textAnchor="middle"
          fill="#64748b"
          fontSize={10.5}
          fontWeight={600}
        >
          {label}
        </text>
      )}
    </g>
  );
};

const SalesDotChart = ({
  title = "أداء المبيعات الشهرية ومعدل التحصيل (2025 - 2026)",
  subtitle = "مقارنة شهرية لقيمة الفواتير المصدرة مقابل المبالغ المحصلة في الفترة المحددة",
  data = DEFAULT_MONTHLY_DATA,
  summaryText = "معدل التحصيل للربع الأول 83.2% من إجمالي المبيعات المستحقة",
  summaryHighlight = "أفضل أداء في السنوات الثلاث الماضية",
  className = "",
}) => {
  return (
    <section
      dir="rtl"
      className={cx(
        "flex flex-col justify-between rounded-[22px] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      {/* ===== رأس البطاقة + وسيلة الإيضاح ===== */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="text-right">
          <h2 className="text-[14.5px] font-extrabold text-[#1f2937]">
            {title}
          </h2>
          <p className="mt-1 text-[11px] font-medium leading-4 text-[#6b7280]">
            {subtitle}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-4 text-[11px] font-bold text-[#374151]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-[3px] bg-[#1b7398]" />
            <span>المبيعات المصدرة</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-[3px] bg-[#475569]" />
            <span>المحصل (نقديًا / آجل)</span>
          </span>
        </div>
      </div>

      {/* ===== مخطط الأعمدة Recharts ===== */}
      <div className="mt-5 h-[225px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: 8, bottom: 16 }}
            barGap={3}
            barCategoryGap="24%"
          >
            <XAxis
              dataKey="shortLabel"
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
              interval={0}
              tick={<CustomXAxisTick />}
            />
            <Tooltip
              cursor={{ fill: "#f1f5f9", radius: 8 }}
              content={<CustomBarTooltip />}
            />
            <Bar
              dataKey="collected"
              name="المحصل"
              fill="#475569"
              radius={[4, 4, 0, 0]}
              maxBarSize={16}
            />
            <Bar
              dataKey="sales"
              name="المبيعات المصدرة"
              fill="#1b7398"
              radius={[4, 4, 0, 0]}
              maxBarSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ===== الشريط الملخص السفلي ===== */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#f4f7f9] px-3.5 py-2.5 text-[11.5px]">
        <div className="flex items-center gap-2 font-bold text-[#1f2937]">
          <FiInfo size={14} className="shrink-0 text-[#1b7398]" />
          <span>{summaryText}</span>
        </div>

        {summaryHighlight && (
          <span className="rounded-md bg-white px-2.5 py-1 text-[10.5px] font-bold text-[#1b7398] shadow-2xs">
            {summaryHighlight}
          </span>
        )}
      </div>
    </section>
  );
};

export default SalesDotChart;