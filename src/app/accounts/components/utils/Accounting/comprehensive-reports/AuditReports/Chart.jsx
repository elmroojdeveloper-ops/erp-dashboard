"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiCheckCircle, FiInfo } from "react-icons/fi";

const defaultTrendData = [
  {
    year: "2026 م",
    topLabel: "54.22 م ر.س",
    subLabel: "+18.7% نمو سنوي",
    subLabelTone: "teal",
    isCurrent: true,
    debit: 54.22,
    credit: 54.22,
  },
  {
    year: "2025 م",
    topLabel: "45.67 م ر.س",
    subLabel: "+8.5% نمو",
    subLabelTone: "green",
    isCurrent: false,
    debit: 45.67,
    credit: 45.67,
  },
  {
    year: "2024 م",
    topLabel: "42.10 م ر.س",
    subLabel: "+22.9% نمو",
    subLabelTone: "green",
    isCurrent: false,
    debit: 42.1,
    credit: 42.1,
  },
  {
    year: "2023 م",
    topLabel: "34.25 م ر.س",
    subLabel: "+20.6% نمو",
    subLabelTone: "green",
    isCurrent: false,
    debit: 34.25,
    credit: 34.25,
  },
  {
    year: "2022 م",
    topLabel: "28.40 م ر.س",
    subLabel: "سنة الأساس",
    subLabelTone: "muted",
    isCurrent: false,
    debit: 28.4,
    credit: 28.4,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const debitVal = payload.find((p) => p.dataKey === "debit")?.value ?? 0;
  const creditVal = payload.find((p) => p.dataKey === "credit")?.value ?? 0;

  return (
    <div
      dir="rtl"
      className="rounded-[10px] border border-[#e2e8f0] bg-white px-3 py-2 text-[11px] text-[#1e293b]"
    >
      <div className="mb-1 font-black text-[#0f172a]" dir="auto">
        {label}
      </div>
      <div className="flex items-center justify-between gap-4 font-bold text-[#086382]">
        <span>الطرف المدين:</span>
        <span dir="auto">{Number(debitVal).toFixed(2)} م ر.س</span>
      </div>
      <div className="mt-0.5 flex items-center justify-between gap-4 font-bold text-[#525866]">
        <span>الطرف الدائن:</span>
        <span dir="auto">{Number(creditVal).toFixed(2)} م ر.س</span>
      </div>
    </div>
  );
};

const CustomXAxisTick = ({ x, y, payload, data }) => {
  const item = data?.find((d) => d.year === payload?.value);
  const subColor =
    item?.subLabelTone === "teal"
      ? "#086382"
      : item?.subLabelTone === "green"
      ? "#047857"
      : "#64748b";

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={14}
        textAnchor="middle"
        fill={item?.isCurrent ? "#086382" : "#0f172a"}
        fontSize={11.5}
        fontWeight={800}
        style={{ unicodeBidi: "plaintext" }}
      >
        {payload?.value}
      </text>
      <text
        x={0}
        y={28}
        textAnchor="middle"
        fill={subColor}
        fontSize={10.5}
        fontWeight={700}
        style={{ unicodeBidi: "plaintext" }}
      >
        {item?.subLabel}
      </text>
    </g>
  );
};

const renderBarTopLabel = (data) => (props) => {
  const { x, y, width, index } = props;
  const item = data?.[index];
  if (!item) return null;

  const centerX = x + width / 2;

  return (
    <g>
      {item.isCurrent && (
        <>
          <rect
            x={centerX - 22}
            y={y - 36}
            width={44}
            height={16}
            rx={8}
            fill="#086382"
          />
          <text
            x={centerX}
            y={y - 25}
            textAnchor="middle"
            fill="#ffffff"
            fontSize={9.5}
            fontWeight={800}
            style={{ unicodeBidi: "plaintext" }}
          >
            الحالية
          </text>
        </>
      )}
      <text
        x={centerX}
        y={y - 8}
        textAnchor="middle"
        fill="#086382"
        fontSize={11.5}
        fontWeight={800}
        style={{ unicodeBidi: "plaintext" }}
      >
        {item.topLabel}
      </text>
    </g>
  );
};

const Chart = ({
  data = defaultTrendData,
  balanceBadgeText = "فارق القيد السنوي: 0.00 ر.س (توازن تام 100%)",
  footerNote = "جميع القيود الافتتاحية السنوية مقفلة نهائياً بموجب محاضر جرد واعتماد معتمدة من الإدارة المالية ومدقق الحسابات الخارجي.",
  cagrText = "معدل النمو المركب (CAGR): +17.55%",
}) => {
  return (
    <section
      dir="rtl"
      className="mt-4 rounded-[22px] border border-[#e6ecf2] bg-white p-5 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Row: Title on Right, Legend & Balance Pill on Left */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        {/* Right Side: Title & Subtitle */}
        <div className="max-w-[520px] text-right">
          <div className="flex items-start justify-start gap-2">
            <span className="mt-1 h-5 w-[4px] shrink-0 rounded-full bg-[#086382]" />
            <h2 className="text-[18px] font-black leading-[1.3] text-[#0f172a] sm:text-[19px]">
              <span className="block">
                اتجاه إجمالي الأرصدة الافتتاحية وتوازن
              </span>
              <span className="block" dir="auto">
                القيد عبر السنوات (2022 - 2026 م)
              </span>
            </h2>
          </div>

          <p className="mt-1.5 text-[11.5px] font-medium leading-[1.5] text-[#64748b]">
            <span className="block">
              مقارنة سنوية توضح القيمة الإجمالية وتطابق جانبي القيد المحاسبي
              (مدين /
            </span>
            <span className="block">
              دائن) لضمان اتزان المركز المالي التأسيسي
            </span>
          </p>
        </div>

        {/* Left Side: Legend Box & Balance Pill */}
        <div className="flex flex-col items-end gap-2">
          {/* Legend Box */}
          <div className="flex flex-wrap items-center gap-3 rounded-[11px] border border-[#e6ecf2] bg-[#f8fafc] px-3.5 py-2 text-[11px] font-bold text-[#334155]">
            <span className="inline-flex items-center gap-1.5">
              <span>الطرف المدين (أصول ومصروفات)</span>
              <span className="h-2.5 w-2.5 rounded-[2px] bg-[#086382]" />
            </span>

            <span className="h-3.5 w-[1px] bg-[#cbd5e1]" />

            <span className="inline-flex items-center gap-1.5">
              <span>الطرف الدائن (خصوم وحقوق ملكية)</span>
              <span className="h-2.5 w-2.5 rounded-[2px] bg-[#525866]" />
            </span>
          </div>

          {/* Annual Entry Balance Pill */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ccebd9] bg-[#eaf7f0] px-3.5 py-1 text-[11px] font-extrabold text-[#047857]">
            <FiCheckCircle className="h-3.5 w-3.5 shrink-0 text-[#059669]" />
            <span dir="auto">{balanceBadgeText}</span>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="mt-4 rounded-[16px] border border-[#f1f5f9] bg-[#fafcfd] px-3 py-4">
        <div className="h-[295px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 44, right: 12, left: 12, bottom: 26 }}
              barGap={4}
              barCategoryGap="24%"
            >
              <CartesianGrid
                strokeDasharray="0"
                vertical={false}
                stroke="#eef2f6"
              />
              <XAxis
                dataKey="year"
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={false}
                tick={<CustomXAxisTick data={data} />}
              />
              <YAxis
                orientation="right"
                domain={[0, 60]}
                ticks={[0, 15, 30, 45, 60]}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) =>
                  v === 0 ? "0.00 ر.س" : `${v},000,000 ر.س`
                }
                tick={{ fill: "#94a3b8", fontSize: 10.5, fontWeight: 600 }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "#f0f7fc", opacity: 0.45 }}
              />
              <Bar
                dataKey="credit"
                fill="#525866"
                radius={[6, 6, 0, 0]}
                barSize={34}
              />
              <Bar
                dataKey="debit"
                fill="#086382"
                radius={[6, 6, 0, 0]}
                barSize={34}
                label={renderBarTopLabel(data)}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Audit & CAGR Strip */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-[#e6ecf2] bg-[#f8fafc] px-4 py-2.5 text-[11px]">
        <div className="flex items-center gap-1.5 text-right font-semibold text-[#64748b]">
          <FiInfo className="h-3.5 w-3.5 shrink-0 text-[#086382]" />
          <span>{footerNote}</span>
        </div>

        <span className="font-extrabold text-[#086382]" dir="auto">
          {cagrText}
        </span>
      </div>
    </section>
  );
};

export default Chart;