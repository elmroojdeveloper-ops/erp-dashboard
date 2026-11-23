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

const data = [
  { month: "يناير", sales: 85, expenses: 55 },
  { month: "فيراير", sales: 95, expenses: 62 },
  { month: "مارس", sales: 78, expenses: 70 },
  { month: "ابريل", sales: 110, expenses: 68 },
  { month: "مايو", sales: 125, expenses: 80 },
  { month: "يونيو", sales: 140, expenses: 88 },
];

const SalesChart = () => {
  return (
    <section className="flex h-[240px] flex-col rounded-[18px] bg-white p-3 shadow-card sm:h-[280px] sm:rounded-[22px] sm:p-4">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <h3 className="text-sm font-semibold text-deep sm:text-base">
          المبيعات والمصروفات - آخر 6 أشهر
        </h3>
        <div className="flex items-center gap-3 text-[11px] font-medium text-deep sm:gap-4 sm:text-xs">
          <span className="flex items-center gap-1">
            المصروفات
            <span className="size-2.5 rounded-full bg-warm sm:size-3" />
          </span>
          <span className="flex items-center gap-1">
            المبيعات
            <span className="size-2.5 rounded-full bg-primary sm:size-3" />
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2578A2" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2578A2" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="expensesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C6E7FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#C6E7FF" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#ECF4F8" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#2B2B2B", fontSize: 11 }}
              reversed
              interval="preserveStartEnd"
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0 4px 20px rgba(37, 120, 162, 0.12)",
                fontFamily: "inherit",
              }}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#C6E7FF"
              strokeWidth={2}
              fill="url(#expensesFill)"
              name="المصروفات"
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#2578A2"
              strokeWidth={2.5}
              fill="url(#salesFill)"
              name="المبيعات"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default SalesChart;
