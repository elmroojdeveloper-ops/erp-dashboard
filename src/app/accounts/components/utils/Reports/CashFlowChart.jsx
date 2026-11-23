"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CASH_FLOW } from "./mock-data";

const CashFlowChart = ({ data = CASH_FLOW }) => {
  return (
    <section
      dir="rtl"
      className="flex h-[300px] flex-col rounded-[22px] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:h-[320px] sm:p-5"
    >
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-[15px] font-extrabold text-[#1f2937]">
          التدفقات النقدية
        </h3>
        <div className="flex items-center gap-4 text-[11px] font-medium text-[#4b5563]">
          <span className="flex items-center gap-1.5">
            الصادر
            <span className="size-2.5 rounded-full bg-[#f87171]" />
          </span>
          <span className="flex items-center gap-1.5">
            الوارد
            <span className="size-2.5 rounded-full bg-[#1b7398]" />
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#eef4f7" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 11 }}
              reversed
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "rgba(27,115,152,0.06)" }}
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0 4px 20px rgba(27, 115, 152, 0.12)",
              }}
              formatter={(value, name) => [
                `${Number(value).toLocaleString("en-US")} ألف`,
                name === "inflow" ? "الوارد" : "الصادر",
              ]}
            />
            <Bar
              dataKey="inflow"
              name="inflow"
              fill="#1b7398"
              radius={[8, 8, 0, 0]}
              barSize={18}
            />
            <Bar
              dataKey="outflow"
              name="outflow"
              fill="#f87171"
              radius={[8, 8, 0, 0]}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default CashFlowChart;
