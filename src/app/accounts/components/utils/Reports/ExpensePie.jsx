"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { EXPENSE_DISTRIBUTION } from "./mock-data";

const ExpensePie = ({ data = EXPENSE_DISTRIBUTION, totalLabel = "450K" }) => {
  return (
    <section
      dir="rtl"
      className="flex h-[280px] flex-col rounded-[22px] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:h-[320px] sm:p-5"
    >
      <h3 className="mb-2 text-[15px] font-extrabold text-[#1f2937]">
        توزيع المصروفات
      </h3>

      <div className="relative min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={48}
              outerRadius={78}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}%`, name]}
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0 4px 20px rgba(27, 115, 152, 0.12)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute left-1/2 top-[42%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
          <span className="text-[11px] font-medium text-[#8c96a0]">الإجمالي</span>
          <span className="text-lg font-extrabold text-[#1f2937]">{totalLabel}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-1">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-end gap-2 text-[12px] font-medium text-[#374151]"
          >
            <span>
              {item.name} ({item.value}%)
            </span>
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpensePie;
