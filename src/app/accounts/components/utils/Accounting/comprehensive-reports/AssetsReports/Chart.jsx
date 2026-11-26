"use client";

import React, { useState } from "react";
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

const defaultDepreciationData = [
  {
    month: "أبريل",
    grossCost: 20.4,
    netBookValue: 18.2,
    isPeak: false,
  },
  {
    month: "مايو",
    grossCost: 21.8,
    netBookValue: 19.3,
    isPeak: false,
  },
  {
    month: "يونيو",
    grossCost: 22.9,
    netBookValue: 20.1,
    isPeak: false,
  },
  {
    month: "يوليو",
    grossCost: 23.6,
    netBookValue: 20.6,
    isPeak: false,
  },
  {
    month: "أغسطس",
    grossCost: 24.2,
    netBookValue: 20.9,
    isPeak: false,
  },
  {
    month: "سبتمبر",
    grossCost: 24.85,
    netBookValue: 19.42,
    isPeak: true,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const grossVal =
    payload.find((entry) => entry.dataKey === "grossCost")?.value ?? 0;
  const netVal =
    payload.find((entry) => entry.dataKey === "netBookValue")?.value ?? 0;

  return (
    <div
      dir="rtl"
      className="rounded-[10px] border border-[#e2e8f0] bg-white px-3 py-2 text-[11px] text-[#1e293b]"
    >
      <div className="mb-1 font-black text-[#0f172a]">{label} 2024</div>
      <div className="flex items-center justify-between gap-4 font-bold text-[#086382]">
        <span>القيمة التاريخية:</span>
        <span>{Number(grossVal).toFixed(2)} مليون ر.س</span>
      </div>
      <div className="mt-0.5 flex items-center justify-between gap-4 font-bold text-[#047857]">
        <span>صافي القيمة الدفترية:</span>
        <span>{Number(netVal).toFixed(2)} مليون ر.س</span>
      </div>
    </div>
  );
};

const CustomXAxisTick = ({ x, y, payload, data }) => {
  const item = data?.find((d) => d.month === payload?.value);
  const highlighted = item?.isPeak;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={14}
        textAnchor="middle"
        fill={highlighted ? "#086382" : "#64748b"}
        fontSize={11.5}
        fontWeight={highlighted ? 800 : 600}
      >
        {payload?.value}
      </text>
      {highlighted && (
        <rect
          x={-22}
          y={20}
          width={44}
          height={16}
          rx={8}
          fill="#e6f3fa"
        />
      )}
      {highlighted && (
        <text
          x={0}
          y={31}
          textAnchor="middle"
          fill="#086382"
          fontSize={9}
          fontWeight={800}
        >
          الأعلى نمواً
        </text>
      )}
    </g>
  );
};

const Chart = ({
  data = defaultDepreciationData,
  onViewEntries,
  statusText = "لم تسجيل استهلاك دوري شهري بقيمة 124,300 ر.س لشهر سبتمبر",
}) => {
  const [periodRange, setPeriodRange] = useState("6m");

  const visibleData =
    periodRange === "3m" ? data.slice(Math.max(0, data.length - 3)) : data;

  return (
    <section
      dir="rtl"
      className="flex h-full lg:col-span-2 flex-col justify-between rounded-[22px] border border-[#e6ecf2] bg-white p-5 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      <div>
        {/* Header Row */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="text-right">
            <h2 className="text-[18px] font-black leading-[1.3] text-[#0f172a]">
              اتجاه الإهلاك الشهري
            </h2>
            <p className="mt-1 text-[11.5px] font-medium leading-[1.5] text-[#64748b]">
              مقارنة القيمة التاريخية مقابل صافي القيمة الدفترية لأشهر السنة
              الأخيرة
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3.5 text-[11px] font-bold text-[#475569]">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-[2px] bg-[#086382]" />
                <span>القيمة التاريخية</span>
              </span>

              <span className="inline-flex items-center gap-1.5">
                <span className="inline-flex items-center">
                  <span className="h-2 w-2 rounded-full bg-[#047857]" />
                  <span className="h-[2px] w-3.5 bg-[#047857]" />
                </span>
                <span>صافي القيمة الدفترية</span>
              </span>
            </div>

            <div className="relative shrink-0">
              <select
                value={periodRange}
                onChange={(e) => setPeriodRange(e.target.value)}
                aria-label="نطاق الأشهر"
                className="h-[32px] appearance-none rounded-[9px] border border-[#e2e8f0] bg-[#f8fafc] pr-2.5 pl-7 text-[11px] font-bold text-[#334155] focus:border-[#086382] focus:outline-none"
              >
                <option value="6m">آخر 6 أشهر</option>
                <option value="3m">آخر 3 أشهر</option>
              </select>
              <FiChevronDown className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
            </div>
          </div>
        </div>

        <div className="my-3.5 border-t border-[#f1f5f9]" />

        {/* Composed Chart */}
        <div className="h-[265px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={visibleData}
              margin={{ top: 12, right: 12, left: 12, bottom: 26 }}
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
                tick={<CustomXAxisTick data={visibleData} />}
              />
              <YAxis
                orientation="right"
                domain={[0, 25]}
                ticks={[0, 10, 15, 20, 25]}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => (v === 0 ? "0" : `${v} ر.سM`)}
                tick={{ fill: "#94a3b8", fontSize: 10.5, fontWeight: 600 }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "#f0f7fc", opacity: 0.5 }}
              />
              <Bar
                dataKey="grossCost"
                fill="#5a9ab2"
                radius={[4, 4, 0, 0]}
                barSize={44}
              />
              <Line
                type="monotone"
                dataKey="netBookValue"
                stroke="#086382"
                strokeWidth={2.4}
                dot={{ r: 3.5, fill: "#086382", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#086382" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer Row */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#f1f5f9] pt-3 text-[11px]">
        <div className="inline-flex items-center gap-1.5 font-semibold text-[#64748b]">
          <FiInfo className="h-3.5 w-3.5 shrink-0 text-[#94a3b8]" />
          <span>{statusText}</span>
        </div>

        <button
          type="button"
          onClick={onViewEntries}
          className="inline-flex items-center gap-1 font-extrabold text-[#086382] hover:underline"
        >
          <span>عرض القيود المحاسبية التلقائية</span>
          <LuGauge className="h-3.5 w-3.5 shrink-0" />
        </button>
      </div>
    </section>
  );
};

export default Chart;
