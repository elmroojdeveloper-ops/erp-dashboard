"use client";

import React from "react";
import {
  FiCreditCard,
  FiUsers,
  FiClock,
  FiAlertTriangle,
  FiTrendingUp,
  FiCheckCircle,
  FiArrowLeft,
} from "react-icons/fi";

const defaultCardsData = [
  {
    id: "total-due",
    variant: "due",
    title: "إجمالي المستحقات للموردين",
    value: "14,850",
    unit: "ر.س",
    badgeText: "+6.4% عن الشهر السابق",
    showSparkline: true,
  },
  {
    id: "active-suppliers",
    variant: "suppliers",
    title: "عدد الموردين النشطين",
    value: "142",
    unit: "مورداً مسجلاً",
    breakdownText: "84 تجاري • 38 خدمي • 20 مقاولات",
  },
  {
    id: "dpo",
    variant: "dpo",
    title: "متوسط مدة السداد (DPO)",
    value: "34",
    unit: "يوماً",
    statusBadgeText: "ضمن النطاق الآمن (< 40 يوم)",
    deltaText: "-3 أيام",
  },
  {
    id: "overdue-invoices",
    variant: "overdue",
    title: "فواتير متأخرة السداد",
    value: "820,450",
    unit: "ر.س",
    subText: "12 فاتورة معلّقة",
    actionLabel: "متابعة الاستحقاقات",
  },
];

const renderIconBox = (variant) => {
  switch (variant) {
    case "suppliers":
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#eaf2f7] text-[#086382]">
          <FiUsers className="h-5 w-5" />
        </div>
      );
    case "dpo":
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#eaf2f7] text-[#15803d]">
          <FiClock className="h-5 w-5" />
        </div>
      );
    case "overdue":
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#fee2e2] text-[#b91c1c]">
          <FiAlertTriangle className="h-5 w-5" />
        </div>
      );
    case "due":
    default:
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#eaf2f7] text-[#086382]">
          <FiCreditCard className="h-5 w-5" />
        </div>
      );
  }
};

const Cards = ({
  cards = defaultCardsData,
  onCardClick,
  onOverdueActionClick,
}) => {
  return (
    <div
      dir="rtl"
      className="mt-6 grid grid-cols-1 gap-4 text-[#1e293b] sm:grid-cols-2 xl:grid-cols-4"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {cards.map((card) => {
        const variant = card.variant || card.id;

        if (variant === "overdue") {
          return (
            <div
              key={card.id}
              onClick={() => onCardClick?.(card)}
              className={`relative flex flex-col justify-between overflow-hidden rounded-[20px] border border-[#e6ecf2] border-t-[4px] border-t-[#b91c1c] bg-white p-5 transition hover:border-[#fecaca] ${
                onCardClick ? "cursor-pointer" : ""
              }`}
            >
              {/* 1. العنوان والأيقونة */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  {renderIconBox("overdue")}
                  <span className="text-right text-[13px] font-black text-[#1e293b]">
                    {card.title}
                  </span>
                </div>
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#b91c1c]" />
              </div>

              {/* 2. الرقم ثم الوحدة من اليمين */}
              <div className="my-4 flex items-baseline justify-start gap-2 tabular-nums">
                <span className="text-[30px] font-black leading-none tracking-tight text-[#b91c1c]">
                  {card.value}
                </span>
                <span className="text-[12px] font-extrabold text-[#b91c1c]">
                  {card.unit}
                </span>
              </div>

              {/* 3. السطر السفلي */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-[11px] font-bold text-[#64748b] tabular-nums">
                  {card.subText}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOverdueActionClick?.(card);
                  }}
                  className="inline-flex items-center gap-1 text-[11.5px] font-extrabold text-[#b91c1c] transition hover:underline"
                >
                  <span>{card.actionLabel || "متابعة الاستحقاقات"}</span>
                  <FiArrowLeft className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        }

        if (variant === "dpo") {
          return (
            <div
              key={card.id}
              onClick={() => onCardClick?.(card)}
              className={`flex flex-col justify-between rounded-[20px] border border-[#e6ecf2] bg-white p-5 transition hover:border-[#086382]/35 ${
                onCardClick ? "cursor-pointer" : ""
              }`}
            >
              {/* 1. العنوان والأيقونة */}
              <div className="flex items-center justify-start gap-2.5">
                {renderIconBox("dpo")}
                <span className="text-right text-[13px] font-black text-[#1e293b]">
                  {card.title}
                </span>
              </div>

              {/* 2. الرقم ثم الوحدة من اليمين */}
              <div className="my-4 flex items-baseline justify-start gap-1.5 tabular-nums">
                <span className="text-[30px] font-black leading-none tracking-tight text-[#0f172a]">
                  {card.value}
                </span>
                <span className="text-[12px] font-bold text-[#64748b]">
                  {card.unit}
                </span>
              </div>

              {/* 3. السطر السفلي */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="inline-flex items-center gap-1 rounded-[10px] bg-[#dcfce7] px-2.5 py-1 text-[11px] font-extrabold text-[#15803d]">
                  <FiCheckCircle className="h-3.5 w-3.5 shrink-0 text-[#15803d]" />
                  <span>{card.statusBadgeText}</span>
                </span>

                <span className="text-[11px] font-bold text-[#64748b] tabular-nums">
                  {card.deltaText}
                </span>
              </div>
            </div>
          );
        }

        if (variant === "suppliers") {
          return (
            <div
              key={card.id}
              onClick={() => onCardClick?.(card)}
              className={`flex flex-col justify-between rounded-[20px] border border-[#e6ecf2] bg-white p-5 transition hover:border-[#086382]/35 ${
                onCardClick ? "cursor-pointer" : ""
              }`}
            >
              {/* 1. العنوان والأيقونة */}
              <div className="flex items-center justify-start gap-2.5">
                {renderIconBox("suppliers")}
                <span className="text-right text-[13px] font-black text-[#1e293b]">
                  {card.title}
                </span>
              </div>

              {/* 2. الرقم ثم الوحدة من اليمين */}
              <div className="my-4 flex items-baseline justify-start gap-1.5 tabular-nums">
                <span className="text-[30px] font-black leading-none tracking-tight text-[#0f172a]">
                  {card.value}
                </span>
                <span className="text-[12px] font-bold text-[#64748b]">
                  {card.unit}
                </span>
              </div>

              {/* 3. السطر السفلي */}
              <div className="pt-1 text-right">
                <div className="text-[11px] font-bold text-[#475569] tabular-nums">
                  {card.breakdownText}
                </div>
              </div>
            </div>
          );
        }

        return (
          <div
            key={card.id}
            onClick={() => onCardClick?.(card)}
            className={`flex flex-col justify-between rounded-[20px] border border-[#e6ecf2] bg-white p-5 transition hover:border-[#086382]/35 ${
              onCardClick ? "cursor-pointer" : ""
            }`}
          >
            {/* 1. العنوان والأيقونة */}
            <div className="flex items-center justify-start gap-2.5">
              {renderIconBox("due")}
              <span className="text-right text-[13px] font-black leading-snug text-[#1e293b]">
                {card.title}
              </span>
            </div>

            {/* 2. الرقم ثم الوحدة من اليمين */}
            <div className="my-4 flex items-baseline justify-start gap-1.5 tabular-nums">
              <span className="text-[30px] font-black leading-none tracking-tight text-[#0f172a]">
                {card.value}
              </span>
              <span className="text-[12px] font-bold text-[#64748b]">
                {card.unit}
              </span>
            </div>

            {/* 3. السطر السفلي */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <span className="inline-flex items-center gap-1 rounded-[10px] bg-[#fee2e2] px-2.5 py-1 text-[11px] font-extrabold text-[#b91c1c] tabular-nums">
                <FiTrendingUp className="h-3.5 w-3.5 shrink-0" />
                <span>{card.badgeText}</span>
              </span>

              {card.showSparkline ? (
                <svg
                  viewBox="0 0 92 28"
                  className="h-7 w-24 shrink-0 text-[#086382]"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 23 C 18 22, 24 10, 42 13 C 58 16, 68 5, 90 5"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <span />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
