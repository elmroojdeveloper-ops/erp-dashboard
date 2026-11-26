"use client";

import React from "react";
import { LuBuilding2, LuBot, LuTruck, LuServer } from "react-icons/lu";

const defaultCategories = [
  {
    id: "buildings",
    title: "المباني والعقارات",
    amount: "10,437,000",
    currency: "ر.س",
    percentage: "42%",
    barColor: "#086382",
    iconBg: "bg-[#d6edf8]",
    iconColor: "text-[#086382]",
    percentColor: "text-[#086382]",
    icon: "building",
  },
  {
    id: "equipment",
    title: "الآلات ومعدات الإنتاج",
    amount: "7,703,500",
    currency: "ر.س",
    percentage: "31%",
    barColor: "#475569",
    iconBg: "bg-[#e2e5ec]",
    iconColor: "text-[#475569]",
    percentColor: "text-[#64748b]",
    icon: "equipment",
  },
  {
    id: "vehicles",
    title: "أسطول النقل واللوجستيات",
    amount: "3,976,000",
    currency: "ر.س",
    percentage: "16%",
    barColor: "#046847",
    iconBg: "bg-[#7cf5b4]",
    iconColor: "text-[#0f172a]",
    percentColor: "text-[#046847]",
    icon: "vehicles",
  },
  {
    id: "it",
    title: "الأجهزة التقنية والبرمجيات",
    amount: "2,733,500",
    currency: "ر.س",
    percentage: "11%",
    barColor: "#334155",
    iconBg: "bg-[#e2e6ec]",
    iconColor: "text-[#0f172a]",
    percentColor: "text-[#64748b]",
    icon: "it",
  },
];

const renderCategoryIcon = (type, colorClass) => {
  switch (type) {
    case "building":
      return <LuBuilding2 className={`h-[18px] w-[18px] ${colorClass}`} />;
    case "equipment":
      return <LuBot className={`h-[18px] w-[18px] ${colorClass}`} />;
    case "vehicles":
      return <LuTruck className={`h-[18px] w-[18px] ${colorClass}`} />;
    case "it":
      return <LuServer className={`h-[18px] w-[18px] ${colorClass}`} />;
    default:
      return <LuBuilding2 className={`h-[18px] w-[18px] ${colorClass}`} />;
  }
};

const Distribute = ({ categories = defaultCategories, onSelectCategory }) => {
  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {categories.map((item) => (
        <article
          key={item.id}
          onClick={() => onSelectCategory?.(item)}
          className="flex cursor-pointer flex-col justify-between rounded-[20px] border border-[#e6ecf2] bg-white px-4 py-3.5 transition hover:border-[#cbd5e1]"
        >
          <div className="flex items-start justify-between gap-2.5">
            <div className="text-right">
              <div className="text-[11.5px] font-bold leading-[1.35] text-[#475569]">
                {item.title}
              </div>
              <div className="mt-1.5 flex items-baseline gap-1 leading-none">
                <span className="text-[18px] font-black tracking-tight text-[#0f172a]">
                  {item.amount}
                </span>
                <span className="text-[11px] font-bold text-[#64748b]">
                  {item.currency}
                </span>
              </div>
            </div>

            <div
              className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] ${item.iconBg}`}
            >
              {renderCategoryIcon(item.icon, item.iconColor)}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <span
              className={`shrink-0 text-[11px] font-extrabold ${item.percentColor}`}
            >
              {item.percentage}
            </span>

            <div className="h-[4px] flex-1 overflow-hidden rounded-full bg-[#e8eef3]">
              <div
                className="h-full rounded-full"
                style={{
                  width: item.percentage,
                  backgroundColor: item.barColor,
                }}
              />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default Distribute;
