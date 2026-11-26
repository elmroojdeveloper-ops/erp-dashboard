"use client";

import React, { useMemo, useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiChevronDown, FiInfo } from "react-icons/fi";
import { LuGauge } from "react-icons/lu";

const monthlyData = [
  {
    month: "سبتمبر",
    autoEntries: 950,
    manualEntries: 620,
    amountMillions: 28.45,
    isHighlighted: true,
  },
  {
    month: "أغسطس",
    autoEntries: 860,
    manualEntries: 540,
    amountMillions: 26.8,
    isHighlighted: false,
  },
  {
    month: "يوليو",
    autoEntries: 780,
    manualEntries: 490,
    amountMillions: 23.2,
    isHighlighted: false,
  },
  {
    month: "يونيو",
    autoEntries: 710,
    manualEntries: 430,
    amountMillions: 20.1,
    isHighlighted: false,
  },
  {
    month: "مايو",
    autoEntries: 620,
    manualEntries: 360,
    amountMillions: 16.5,
    isHighlighted: false,
  },
  {
    month: "أبريل",
    autoEntries: 540,
    manualEntries: 310,
    amountMillions: 12.2,
    isHighlighted: false,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const autoVal = payload.find((p) => p.dataKey === "autoEntries")?.value ?? 0;
  const manualVal =
    payload.find((p) => p.dataKey === "manualEntries")?.value ?? 0;
  const amountVal =
    payload.find((p) => p.dataKey === "amountMillions")?.value ?? 0;

  return (
    <div
      dir="rtl"
      className="rounded-xl border border-[#e2e8f0] bg-white px-3 py-2 text-[11px] text-[#1e293b]"
    >
      <div className="mb-1 font-black text-[#0f172a]">{label} 2024</div>
      <div className="flex items-center justify-between gap-4 font-bold text-[#086382]">
        <span>قيود آلية:</span>
        <span>{autoVal.toLocaleString()} قيد</span>
      </div>
      <div className="flex items-center justify-between gap-4 font-bold text-[#475569]">
        <span>قيود يدوية:</span>
        <span>{manualVal.toLocaleString()} قيد</span>
      </div>
      <div className="mt-1 flex items-center justify-between gap-4 border-t border-[#f1f5f9] pt-1 font-extrabold text-[#047857]">
        <span>القيمة المالية:</span>
        <span>{Number(amountVal).toFixed(2)} مليون ر.س</span>
      </div>
    </div>
  );
};

const CustomXAxisTick = ({ x, y, payload }) => {
  const isSept = payload?.value === "سبتمبر";
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={14}
        textAnchor="middle"
        fill={isSept ? "#086382" : "#64748b"}
        fontSize={12.5}
        fontWeight={isSept ? 800 : 600}
      >
        {payload?.value}
      </text>
    </g>
  );
};

const Chart = ({ data = monthlyData }) => {
  const [rangeFilter, setRangeFilter] = useState("6m");

  const visibleData = useMemo(() => {
    if (rangeFilter === "3m") return data.slice(0, 3);
    return data;
  }, [data, rangeFilter]);

  return (
    <section
      dir="rtl"
      className="flex h-full flex-col justify-between rounded-[24px] border border-[#e6ecf2] bg-white p-5 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      <div>
        {/* Top Row: Title on Right, Dropdown on Left */}
        <div className="flex items-start justify-between gap-3">
          <div className="text-right">
            <h2 className="text-[19px] font-black leading-[1.3] text-[#0f172a]">
              اتجاه القيود وحجم التداولات الشهري
            </h2>
            <p className="mt-1 text-[12px] font-medium leading-[1.5] text-[#64748b]">
              مقارنة عدد القيود اليدوية والآلية وإجمالي القيم المدينة خلال الستة أشهر الأخيرة
            </p>
          </div>

          <div className="relative shrink-0">
            <select
              value={rangeFilter}
              onChange={(e) => setRangeFilter(e.target.value)}
              className="h-[34px] appearance-none rounded-[10px] bg-[#f4f7f9] pr-3 pl-8 text-[12px] font-bold text-[#334155] focus:outline-none"
            >
              <option value="6m">آخر 6 أشهر</option>
              <option value="3m">آخر 3 أشهر</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#475569]" />
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-[#f1f5f9]" />

        {/* Legend Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[12px] font-bold text-[#475569]">
          <span className="inline-flex items-center gap-2">
            <span className="h-[11px] w-[11px] rounded-[2px] bg-[#086382]" />
            <span>قيود آلية</span>
          </span>

          <span className="inline-flex items-center gap-2">
            <span className="h-[11px] w-[11px] rounded-[2px] bg-[#cbd5e1]" />
            <span>قيود يدوية</span>
          </span>

          <span className="inline-flex items-center gap-2">
            <span className="inline-flex items-center">
              <span className="h-2 w-2 rounded-full bg-[#047857]" />
              <span className="h-[2.5px] w-5 bg-[#047857]" />
            </span>
            <span>منحنى القيمة المالية (مليون ر.س)</span>
          </span>
        </div>

        {/* Recharts Composed Chart */}
        <div className="mt-3 h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={visibleData}
              margin={{ top: 18, right: 24, left: 24, bottom: 18 }}
              barGap={6}
            >
              <CartesianGrid
                strokeDasharray="0"
                vertical={false}
                stroke="#eef2f6"
              />
              <XAxis
                dataKey="month"
                axisLine={{ stroke: "#eef2f6" }}
                tickLine={false}
                tick={<CustomXAxisTick />}
              />
              <YAxis
                yAxisId="left"
                orientation="right"
                hide
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 32]}
                ticks={[0, 10, 20, 30]}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}ر.سM`}
                tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f0f7fc", opacity: 0.55 }} />
              <Bar
                yAxisId="left"
                dataKey="autoEntries"
                fill="#086382"
                radius={[4, 4, 0, 0]}
                barSize={22}
              />
              <Bar
                yAxisId="left"
                dataKey="manualEntries"
                fill="#cbd5e1"
                radius={[4, 4, 0, 0]}
                barSize={22}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="amountMillions"
                stroke="#047857"
                strokeWidth={2.5}
                dot={{ r: 4.5, fill: "#047857", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#047857" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer Row */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#f1f5f9] pt-3.5 text-[11.5px]">
        <div className="inline-flex items-center gap-1.5 font-medium text-[#64748b]">
          <FiInfo className="h-3.5 w-3.5 shrink-0 text-[#94a3b8]" />
          <span>يتم احتساب القيود بعد إغلاق الفترات المسائية للفروع</span>
        </div>

        <div className="inline-flex items-center gap-1.5 font-bold text-[#475569]">
          <span>متوسط عدد القيود المنفذة:</span>
          <strong className="font-black text-[#0f172a]">160.6 قيد / يوم</strong>
          <LuGauge className="h-4 w-4 shrink-0 text-[#086382]" />
        </div>
      </div>
    </section>
  );
};

export default Chart;