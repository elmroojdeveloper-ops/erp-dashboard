"use client";

import { useState } from "react";
import { FiCheck, FiClock } from "react-icons/fi";
import { HiOutlineCalendar } from "react-icons/hi2";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlineRequestPage } from "react-icons/md";
import { PiChartPieSliceBold } from "react-icons/pi";

const periods = ["اليوم", "هذا الأسبوع", "هذا الشهر", "هذه السنة", "نطاق مخصص"];

const kpiCards = [
  {
    id: "sales",
    title: "إجمالي المبيعات",
    value: "1,245,600",
    unit: "ر.س",
    hint: "مقارنة بالشهر الماضي",
    trend: "12.5% ↑",
    icon: PiChartPieSliceBold,
  },
  {
    id: "expenses",
    title: "المصروفات",
    value: "450,230",
    unit: "ر.س",
    hint: "زيادة في التكاليف",
    trend: "3.2% ↑",
    icon: IoWalletOutline,
  },
  {
    id: "profit",
    title: "صافي الربح",
    value: "795,370",
    unit: "ر.س",
    hint: "أداء متميز",
    trend: "8.1% ↑",
    icon: MdOutlineRequestPage,
  },
  {
    id: "cashflow",
    title: "التدفق النقدي",
    value: "328,500",
    unit: "ر.س",
    hint: "سيولة ممتازة",
    trend: "صحي",
    icon: PiChartPieSliceBold,
    trendIcon: true,
  },
];

const Hero = () => {
  const [activePeriod, setActivePeriod] = useState("هذا الشهر");

  return (
    <section className="relative overflow-hidden rounded-[18px] bg-gradient-to-b from-primary to-primary-dark p-4 text-white sm:rounded-[22px] sm:p-5 lg:p-6">
      <div className="pointer-events-none absolute -left-16 top-40 size-[220px] rounded-full bg-white/10 blur-2xl sm:size-[274px]" />
      <div className="pointer-events-none absolute -right-10 -top-24 size-[220px] rounded-full bg-white/10 blur-2xl sm:size-[274px]" />

      <div className="relative z-10 flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col items-start gap-2 lg:items-end">
            <h1 className="text-xl font-semibold leading-tight sm:text-2xl lg:text-[32px]">
              لوحة التحكم الرئيسية
            </h1>
            <div className="flex items-center gap-2 text-sm text-surface sm:text-base">
              <span>آخر تحديث: منذ 5 دقائق</span>
              <FiClock className="size-3" />
            </div>
          </div>

          <div className="scrollbar-thin -mx-1 flex max-w-full items-center gap-1 overflow-x-auto rounded-lg bg-white/10 p-1">
            {periods.map((period) => {
              const isActive = period === activePeriod;
              const isCustom = period === "نطاق مخصص";

              return (
                <div key={period} className="flex shrink-0 items-center">
                  {isCustom && (
                    <span className="mx-1 hidden h-6 w-px bg-warm md:block" />
                  )}
                  <button
                    type="button"
                    onClick={() => setActivePeriod(period)}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition sm:gap-2 sm:px-4 sm:text-sm ${
                      isActive
                        ? "bg-white text-primary shadow-sm"
                        : isCustom
                          ? "text-warm"
                          : "text-white hover:bg-white/10"
                    }`}
                  >
                    {isCustom && <HiOutlineCalendar className="size-3.5" />}
                    {period}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {kpiCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.id}
                className="flex flex-col gap-2 rounded-[18px] bg-white/10 p-3 sm:rounded-[22px] sm:p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/20 sm:size-10">
                    <Icon className="size-5 sm:size-[22px]" />
                  </div>
                  <h3 className="text-sm font-bold sm:text-base">{card.title}</h3>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-1">
                  <span className="text-sm sm:text-base">{card.unit}</span>
                  <span className="text-2xl font-extrabold leading-none sm:text-[32px]">
                    {card.value}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-1 text-xs sm:text-sm">
                  <span className="font-medium">{card.hint}</span>
                  {card.trendIcon ? (
                    <span className="flex items-center gap-1 font-bold text-warm">
                      {card.trend}
                      <FiCheck className="size-3.5" />
                    </span>
                  ) : (
                    <span className="font-bold text-warm">{card.trend}</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
