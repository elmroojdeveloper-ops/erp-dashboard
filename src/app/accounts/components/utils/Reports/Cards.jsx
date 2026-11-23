"use client";

import React from "react";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiPieChart,
} from "react-icons/fi";
import { KPI_STATS } from "./mock-data";

const moneyUnit = "ر.س";

const Cards = ({ stats = KPI_STATS }) => {
  const items = [
    {
      key: "revenue",
      title: "إجمالي الإيرادات",
      value: stats.revenue.value,
      change: stats.revenue.change,
      up: stats.revenue.up,
      Icon: FiTrendingUp,
      featured: true,
    },
    {
      key: "expenses",
      title: "إجمالي المصروفات",
      value: stats.expenses.value,
      change: stats.expenses.change,
      up: stats.expenses.up,
      Icon: FiTrendingDown,
      featured: false,
    },
    {
      key: "netProfit",
      title: "صافي الربح",
      value: stats.netProfit.value,
      change: stats.netProfit.change,
      up: stats.netProfit.up,
      Icon: FiPieChart,
      featured: false,
    },
    {
      key: "cashBalance",
      title: "الرصيد النقدي",
      value: stats.cashBalance.value,
      change: stats.cashBalance.change,
      up: false,
      Icon: FiDollarSign,
      featured: false,
    },
  ];

  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {items.map((item) => {
        const Icon = item.Icon;
        return (
          <div
            key={item.key}
            className={`flex min-h-[128px] flex-col justify-between rounded-[20px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] ${
              item.featured
                ? "bg-gradient-to-l from-[#176b8f] to-[#095372] text-white"
                : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[15px] font-bold ${
                  item.featured ? "text-white" : "text-[#374151]"
                }`}
              >
                {item.title}
              </span>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  item.featured
                    ? "bg-white/15 text-white"
                    : "bg-[#eaf4f8] text-[#1b7398]"
                }`}
              >
                <Icon size={18} />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span
                className={`text-[28px] font-extrabold leading-none ${
                  item.featured ? "text-white" : "text-[#1f2937]"
                }`}
              >
                {item.value}
              </span>
              <span
                className={`text-[12px] font-bold ${
                  item.featured ? "text-white/80" : "text-[#6b7280]"
                }`}
              >
                {moneyUnit}
              </span>
            </div>

            <p
              className={`text-[12px] font-medium ${
                item.featured
                  ? "text-white/85"
                  : item.up
                    ? "text-[#159447]"
                    : "text-[#6b7280]"
              }`}
            >
              {item.up ? "↑ " : ""}
              {item.change}
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default Cards;
