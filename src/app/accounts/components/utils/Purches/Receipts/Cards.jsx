"use client";

import React from "react";
import { FiFileText, FiTruck } from "react-icons/fi";

const cards = [
  {
    id: "pending-match",
    title: "بانتظار المطابقة مع الفاتورة",
    subtitle: "مستلمة فعلياً وبانتظار الفاتورة الرسمية",
    value: "8 أذونات",
    Icon: FiFileText,
  },
  {
    id: "partial-shipments",
    title: "استلامات جزئية مفتوحة",
    subtitle: "متبقي دفعات قادمة من الموردين",
    value: "3 شحنات",
    Icon: FiTruck,
  },
];

const Cards = ({ items = cards }) => {
  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      {items.map((card) => {
        const Icon = card.Icon;

        return (
          <article
            key={card.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-[#e6ecf2] bg-white px-5 py-4 shadow-2xs"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f1f5f9] text-[#0d658a]">
                <Icon className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h3 className="text-[14px] font-extrabold text-[#1e293b] leading-snug">
                  {card.title}
                </h3>
                <p className="mt-0.5 text-[11.5px] font-medium text-[#64748b] leading-snug">
                  {card.subtitle}
                </p>
              </div>
            </div>

            <div className="shrink-0 text-[18px] font-extrabold text-[#0d658a] leading-none">
              {card.value}
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Cards;