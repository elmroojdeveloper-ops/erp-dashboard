"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { REVENUE_TREND } from "./mock-data";

const RevenueChart = ({ data = REVENUE_TREND }) => {
  return (
    <section
      dir="rtl"
      className="flex h-[280px] flex-col rounded-[22px] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:h-[320px] sm:p-5"
    >
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-[15px] font-extrabold text-[#1f2937]">
          الإيرادات والمصروفات — آخر 6 أشهر
        </h3>
        <div className="flex items-center gap-4 text-[11px] font-medium text-[#4b5563]">
          <span className="flex items-center gap-1.5">
            المصروفات
            <span className="size-2.5 rounded-full bg-[#7ec8e3]" />
          </span>
          <span className="flex items-center gap-1.5">
            الإيرادات
            <span className="size-2.5 rounded-full bg-[#1b7398]" />
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="reportRevenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1b7398" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#1b7398" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="reportExpenseFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7ec8e3" stopOpacity={0.55} />
                <stop offset="95%" stopColor="#7ec8e3" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#eef4f7" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 11 }}
              reversed
              interval="preserveStartEnd"
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0 4px 20px rgba(27, 115, 152, 0.12)",
                fontFamily: "inherit",
              }}
              formatter={(value, name) => [
                `${Number(value).toLocaleString("en-US")} ألف`,
                name === "revenue" ? "الإيرادات" : "المصروفات",
              ]}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#7ec8e3"
              strokeWidth={2}
              fill="url(#reportExpenseFill)"
              name="expenses"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#1b7398"
              strokeWidth={2.5}
              fill="url(#reportRevenueFill)"
              name="revenue"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default RevenueChart;
