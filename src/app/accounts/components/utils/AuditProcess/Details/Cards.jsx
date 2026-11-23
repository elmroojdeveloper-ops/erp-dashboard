"use client";

import React from "react";
import { FiFileText, FiClock, FiBriefcase } from "react-icons/fi";
import { HiOutlineScale } from "react-icons/hi2";

const cx = (...c) => c.filter(Boolean).join(" ");

const DEFAULT_STATS = {
  totalDebit: "1,245,600",
  totalCredit: "1,245,600",
  pendingEntries: 5,
  totalEntries: "14,203",
};

const Cards = ({
  stats = DEFAULT_STATS,
  activeKey,
  onSelectCard,
  className = "",
}) => {
  const {
    totalDebit = "1,245,600",
    totalCredit = "1,245,600",
    pendingEntries = 5,
    totalEntries = "14,203",
  } = stats || {};

  const items = [
    {
      key: "debit",
      label: "إجمالي المدين",
      value: totalDebit,
      unit: "ر.س",
      Icon: HiOutlineScale,
    },
    {
      key: "credit",
      label: "إجمالي الدائن",
      value: totalCredit,
      unit: "ر.س",
      Icon: FiBriefcase,
    },
    {
      key: "pending",
      label: "قيود معلقة",
      value: pendingEntries,
      unit: "",
      Icon: FiClock,
    },
    {
      key: "entries",
      label: "إجمالي القيود",
      value: totalEntries,
      unit: "قيد",
      Icon: FiFileText,
    },
  ];

  return (
    <section
      dir="rtl"
      className={cx(
        "my-4 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4",
        className
      )}
    >
      {items.map((item) => {
        const IconComponent = item.Icon;
        const isSelected = activeKey === item.key;

        return (
          <div
            key={item.key}
            role={onSelectCard ? "button" : undefined}
            tabIndex={onSelectCard ? 0 : undefined}
            onClick={() => onSelectCard?.(item.key)}
            onKeyDown={(e) => {
              if (!onSelectCard) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectCard(item.key);
              }
            }}
            className={cx(
              "flex min-h-[104px] items-start justify-between rounded-[20px] bg-white px-5 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all",
              onSelectCard && "cursor-pointer hover:shadow-[0_6px_18px_rgba(0,0,0,0.05)]",
              isSelected && "ring-2 ring-[#1b7398]/50"
            )}
          >
            {/* يمين الكرت: العنوان والقيمة والوحدة */}
            <div className="flex flex-col items-start justify-between gap-2 text-right">
              <span className="text-[16px] font-bold leading-5 text-[#374151]">
                {item.label}
              </span>

              <div className="flex items-baseline gap-1.5">
                <span
                  dir="ltr"
                  className="text-[32px] font-extrabold leading-7 tracking-tight text-[#1f2937]"
                >
                  {item.value}
                </span>
                {item.unit && (
                  <span className="text-[12.5px] font-bold text-[#6b7280]">
                    {item.unit}
                  </span>
                )}
              </div>
            </div>

            {/* يسار الكرت: الأيقونة */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf4f8] text-[#1b7398]">
              <IconComponent size={20} strokeWidth={2.2} />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Cards;