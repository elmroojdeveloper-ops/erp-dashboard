"use client";

import React from "react";
import { FiClock } from "react-icons/fi";
import { BsPieChart } from "react-icons/bs";

const defaultDistribution = [
  {
    id: "devices",
    label: "توريد أجهزة (45%)",
    percentage: 45,
    color: "#127598",
    dotColor: "bg-[#127598]",
  },
  {
    id: "services",
    label: "خدمات (35%)",
    percentage: 35,
    color: "#bfe3f7",
    dotColor: "bg-[#bfe3f7]",
  },
  {
    id: "other",
    label: "أخرى (20%)",
    percentage: 20,
    color: "#6b7280",
    dotColor: "bg-[#6b7280]",
  },
];

const defaultUpcomingInvoices = [
  {
    id: "inv-1",
    supplierName: "الناقل السريع للتجارة",
    amount: "850.00 SAR",
    dueText: "تستحق: غداً",
    dueTone: "urgent",
  },
  {
    id: "inv-2",
    supplierName: "مورد الخليج للمواد",
    amount: "12,400.00 SAR",
    dueText: "تستحق: بعد 4 أيام",
    dueTone: "warning",
  },
];

const Cards = ({
  totalPayablesLabel = "إجمالي المستحقات للموردين",
  totalPayablesAmount = "1,245,600",
  totalPayablesCurrency = "ر.س",
  distributionTitle = "توزيع الموردين",
  distribution = defaultDistribution,
  upcomingTitle = "فواتير مستحقة قريباً",
  upcomingInvoices = defaultUpcomingInvoices,
  onInvoiceClick,
}) => {
  return (
    <section
      dir="rtl"
      className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* 1. Upcoming Due Invoices */}
      <div className="flex min-h-[172px] flex-col justify-between rounded-[22px] border border-[#e6ecf2] bg-white px-5 py-4 lg:col-span-4">
        <div className="mb-3 flex items-center justify-end gap-2">
          <h3 className="text-[14px] font-black text-[#334155]">
            {upcomingTitle}
          </h3>
          <FiClock className="h-4 w-4 shrink-0 text-[#086382]" />
        </div>

        <div className="space-y-2.5">
          {upcomingInvoices.map((inv) => {
            const isUrgent = inv.dueTone === "urgent";
            return (
              <div
                key={inv.id}
                onClick={() => onInvoiceClick?.(inv)}
                role={onInvoiceClick ? "button" : undefined}
                tabIndex={onInvoiceClick ? 0 : undefined}
                onKeyDown={(e) => {
                  if (onInvoiceClick && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onInvoiceClick(inv);
                  }
                }}
                className={`flex items-center justify-between gap-3 rounded-[14px] bg-[#f1f4f7] px-4 py-3 ${
                  onInvoiceClick
                    ? "cursor-pointer transition hover:bg-[#e8edf2]"
                    : ""
                }`}
              >
                <div
                  className="text-left text-[13px] font-black text-[#475569] tabular-nums"
                  dir="auto"
                >
                  {inv.amount}
                </div>

                <div className="min-w-0 text-right">
                  <div className="truncate text-[13px] font-extrabold text-[#334155]">
                    {inv.supplierName}
                  </div>
                  <div
                    className={`mt-0.5 text-[11px] font-bold ${
                      isUrgent ? "text-[#dc2626]" : "text-[#b45309]"
                    }`}
                  >
                    {inv.dueText}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Supplier Distribution */}
      <div className="flex min-h-[172px] flex-col justify-between rounded-[22px] border border-[#e6ecf2] bg-white px-6 py-5 lg:col-span-4">
        <div className="flex items-center justify-between gap-2">
          <BsPieChart className="h-[18px] w-[18px] shrink-0 text-[#64748b]" />
          <h3 className="text-[14px] font-black text-[#334155]">
            {distributionTitle}
          </h3>
        </div>

        {/* Horizontal Segmented Bar */}
        <div className="my-5 flex h-[11px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
          {distribution.map((seg) => (
            <div
              key={seg.id}
              style={{
                width: `${seg.percentage}%`,
                backgroundColor: seg.color,
              }}
              className="h-full first:rounded-r-full last:rounded-l-full"
            />
          ))}
        </div>

        {/* Legend Items */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11.5px] font-bold text-[#334155]">
          {distribution.map((seg) => (
            <span key={seg.id} className="inline-flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${seg.dotColor}`} />
              <span dir="auto">{seg.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 3. Last Card: Total Supplier Payables */}
      <div
        className="relative flex min-h-[172px] flex-col justify-between overflow-hidden rounded-[22px] px-6 py-5 text-white lg:col-span-4"
        style={{
          background:
            "linear-gradient(135deg, #157ba0 0%, #0d6888 55%, #09526c 100%)",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 -left-8 h-40 w-40 rounded-full bg-white/[0.08]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-14 right-4 h-44 w-44 rounded-full bg-white/[0.08]"
        />

        <div className="relative z-10 text-right text-[14px] font-extrabold text-white">
          {totalPayablesLabel}
        </div>

        <div className="relative z-10 my-2 flex items-baseline justify-start gap-2">
          <span
            className="text-[36px] font-black leading-none tracking-tight text-white tabular-nums"
            dir="auto"
          >
            {totalPayablesAmount}
          </span>
          <span className="text-[13px] font-bold text-white/90">
            {totalPayablesCurrency}
          </span>
        </div>

        {/* Bottom Mini Bar Indicator */}
        <div className="relative z-10 mt-2 grid grid-cols-5 gap-1.5">
          <div className="h-8 rounded-[5px] bg-white/35" />
          <div className="h-5 self-end rounded-[5px] bg-white/20" />
          <div className="h-2 self-end rounded-[5px] bg-white/15" />
          <div className="h-3.5 self-end rounded-[5px] bg-white/15" />
          <div className="h-2.5 self-end rounded-[5px] bg-white/15" />
        </div>
      </div>
    </section>
  );
};

export default Cards;