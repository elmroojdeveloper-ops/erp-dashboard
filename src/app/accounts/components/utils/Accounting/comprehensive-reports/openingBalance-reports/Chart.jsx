"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { LuActivity } from "react-icons/lu";

const defaultMonthlyComplianceData = [
  {
    month: "أبريل",
    rate: 97.1,
    isCurrent: false,
  },
  {
    month: "مايو",
    rate: 97.4,
    isCurrent: false,
  },
  {
    month: "يونيو",
    rate: 98.0,
    isCurrent: false,
  },
  {
    month: "يوليو",
    rate: 98.2,
    isCurrent: false,
  },
  {
    month: "أغسطس",
    rate: 98.6,
    isCurrent: false,
  },
  {
    month: "سبتمبر (الحالي)",
    rate: 98.9,
    isCurrent: true,
  },
];

const CustomTooltip = ({ active, payload, targetRate = 99 }) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0]?.payload;
  if (!item) return null;

  return (
    <div
      dir="rtl"
      className="rounded-[10px] border border-[#e2e8f0] bg-white px-3 py-2 text-[11px] text-[#1e293b] shadow-sm"
    >
      <div className="font-black text-[#0f172a]">{item.month}</div>
      <div className="mt-1 flex items-center justify-between gap-4 font-bold text-[#086382]">
        <span>المطابقة الفعلية:</span>
        <span dir="auto">{Number(item.rate).toFixed(1)}%</span>
      </div>
      <div className="mt-0.5 flex items-center justify-between gap-4 font-bold text-[#dc2626]">
        <span>المستهدف الرقابي:</span>
        <span dir="auto">{targetRate}%</span>
      </div>
    </div>
  );
};

const renderBarTopPercent = (data) => (props) => {
  const { x, y, width, value, index } = props;
  const isCurrent = Boolean(data?.[index]?.isCurrent);
  const centerX = x + width / 2;

  return (
    <text
      x={centerX}
      y={y - 10}
      textAnchor="middle"
      fill={isCurrent ? "#086382" : "#64748b"}
      fontSize={12}
      fontWeight={isCurrent ? 900 : 700}
      style={{ unicodeBidi: "plaintext" }}
    >
      {Number(value).toFixed(1)}%
    </text>
  );
};

const CustomXAxisTick = ({ x, y, payload, data }) => {
  const item = data?.find((d) => d.month === payload?.value);
  const isCurrent = Boolean(item?.isCurrent);

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={16}
        textAnchor="middle"
        fill={isCurrent ? "#086382" : "#64748b"}
        fontSize={11.5}
        fontWeight={isCurrent ? 900 : 700}
        style={{ unicodeBidi: "plaintext" }}
      >
        {payload?.value}
      </text>
    </g>
  );
};

const Chart = ({
  data = defaultMonthlyComplianceData,
  title = "نسبة المطابقة والامتثال الشهري",
  subtitle = "مؤشر التحقق الرقابي التلقائي للأشهر الستة الأخيرة لعام 2024",
  targetRate = 99,
  targetBadgeText = "99% المستهدف الرقابي",
}) => {
  return (
    <section
      dir="rtl"
      className="mt-4 lg:col-span-2 rounded-[22px] border border-[#e6ecf2] bg-white p-5 text-[#1e293b] shadow-[0_1px_2px_rgba(15,23,42,0.02)]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header Row: Icon, Title & Subtitle on Right + Legend on Left */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3 text-right">
          <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] bg-[#eaf3f8] text-[#086382]">
            <LuActivity className="h-4 w-4" />
          </div>

          <div>
            <h2 className="text-[18px] font-black leading-[1.3] text-[#0f172a]">
              {title}
            </h2>
            <p className="mt-0.5 text-[11.5px] font-medium text-[#64748b]">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold text-[#475569]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#086382]" />
            <span>المطابقة الفعلية</span>
          </span>

          <span className="inline-flex items-center gap-1.5">
            <span className="h-[2px] w-3.5 rounded-full bg-[#ef4444]" />
            <span dir="auto">المستهدف ({targetRate}%)</span>
          </span>
        </div>
      </div>

      {/* Chart Area: Right Target Pill + Left Dashed Line & Bars */}
      <div className="relative mt-5 pt-2">
        <div className="mb-1 flex items-center gap-2">
          <span
            className="shrink-0 rounded-[6px] border border-[#fecaca] bg-[#fef2f2] px-2.5 py-0.5 text-[10.5px] font-extrabold text-[#dc2626]"
            dir="auto"
          >
            {targetBadgeText}
          </span>
          <div
            aria-hidden="true"
            className="flex-1 border-t border-dashed border-[#f87171]"
          />
        </div>

        <div className="h-[215px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 24, right: 12, left: 12, bottom: 24 }}
              barCategoryGap="26%"
            >
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={<CustomXAxisTick data={data} />}
              />
              <Tooltip
                content={<CustomTooltip targetRate={targetRate} />}
                cursor={{ fill: "#f8fafc", radius: 8 }}
              />
              <ReferenceLine
                y={96.3}
                stroke="transparent"
                strokeWidth={0}
              />
              <Bar
                dataKey="rate"
                radius={[8, 8, 2, 2]}
                barSize={54}
                label={renderBarTopPercent(data)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isCurrent ? "#086382" : "#e2e8f0"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default Chart;