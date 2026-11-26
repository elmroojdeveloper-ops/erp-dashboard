"use client";

import React from "react";
import { FiCheckCircle, FiClock, FiTrendingUp } from "react-icons/fi";
import { FaCalculator } from "react-icons/fa";

const Cards = () => {
  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 gap-3.5 md:grid-cols-3"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      <article className="relative flex min-h-[120px] flex-col justify-between overflow-hidden rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs">
        <span className="absolute inset-x-0 top-0 h-[3px] bg-[#0b6a91]" />

        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[12px] font-extrabold text-[#1e293b] leading-snug">
              معاملات محققة ومرحلة
            </h3>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-[22px] font-black text-[#0f172a] leading-none tracking-tight">
                48,250
              </span>
              <span className="text-[10.5px] font-bold text-[#64748b]">
                عملية قيد
              </span>
            </div>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#e0f2fe] bg-[#f0f9ff] text-[#0d658a]">
            <FiCheckCircle className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-2 text-[10px] font-bold">
          <span className="inline-flex items-center gap-1 text-[#15803d]">
            <FiTrendingUp className="h-3 w-3 shrink-0" />
            <span>+12.4% مقارنة بالفترة السابقة</span>
          </span>
          <span className="rounded bg-[#f1f5f9] px-2 py-0.5 text-[#475569]">
            مكتمل التدقيق
          </span>
        </div>
      </article>

      <article className="relative flex min-h-[120px] flex-col justify-between overflow-hidden rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs">
        <span className="absolute inset-x-0 top-0 h-[3px] bg-[#d97706]" />

        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[12px] font-extrabold text-[#1e293b] leading-snug">
              بانتظار الاعتماد المزدوج
            </h3>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-[22px] font-black text-[#0f172a] leading-none tracking-tight">
                14
              </span>
              <span className="text-[10.5px] font-bold text-[#64748b]">
                مذكرة تسوية
              </span>
            </div>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#fde68a] bg-[#fffbeb] text-[#d97706]">
            <FiClock className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-2 text-[10px] font-bold">
          <span className="text-[#d97706]">- 28% انخفاض المعلقات</span>
          <span className="rounded bg-[#fffbeb] px-2 py-0.5 text-[#b45309]">
            تحت مراجعة المدقق
          </span>
        </div>
      </article>

      <article className="relative flex min-h-[120px] flex-col justify-between overflow-hidden rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs">
        <span className="absolute inset-x-0 top-0 h-[3px] bg-[#095c7a]" />

        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[12px] font-extrabold text-[#1e293b] leading-snug">
              إجمالي القيود النشطة
            </h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-[22px] font-black text-[#095c7a] leading-none tracking-tight">
                98,450,000
              </span>
              <span className="text-[10.5px] font-bold text-[#64748b]">
                ر.س
              </span>
            </div>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#bae6fd] bg-[#f0f9ff] text-[#095c7a]">
            <FaCalculator className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-2 text-[10px] font-bold">
          <span className="inline-flex items-center gap-1 text-[#0d658a]">
            <FiTrendingUp className="h-3 w-3 shrink-0" />
            <span>+ 5.2% نمو متوازن</span>
          </span>
          <span className="rounded bg-[#f0f9ff] px-2 py-0.5 text-[#0d658a]">
            الأرصدة المتداولة الموزونة
          </span>
        </div>
      </article>
    </section>
  );
};

export default Cards;
