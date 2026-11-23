"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "مشتريات", value: 40, color: "#2578A2" },
  { name: "رواتب", value: 25, color: "#15AEDD" },
  { name: "أخرى", value: 20, color: "#ECF4F8" },
  { name: "إيجارات", value: 15, color: "#C6E7FF" },
];

const legend = [
  { label: "مشتريات (40%)", color: "bg-primary" },
  { label: "إيجارات (15%)", color: "bg-warm" },
  { label: "رواتب (25%)", color: "bg-rich" },
  { label: "أخرى (20%)", color: "bg-surface" },
];

const ExpensesChart = () => {
  return (
    <section className="flex h-[260px] flex-col rounded-[18px] bg-white p-3 shadow-card sm:h-[280px] sm:rounded-[22px] sm:p-4">
      <h3 className="mb-2 text-sm font-semibold text-deep sm:text-base">
        توزيع المصروفات
      </h3>

      <div className="relative min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="42%"
              innerRadius={40}
              outerRadius={68}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute left-1/2 top-[38%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
          <span className="text-[11px] font-medium text-muted sm:text-xs">
            الإجمالي
          </span>
          <span className="text-base font-bold text-deep sm:text-lg">450K</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-1 sm:gap-x-8 sm:px-2">
        {legend.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-end gap-2 text-xs font-medium text-deep sm:text-sm"
          >
            <span>{item.label}</span>
            <span className={`size-2 rounded-full ${item.color}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpensesChart;
