"use client";

import React from "react";
import {
  FiClock,
  FiTruck,
  FiShield,
  FiTrendingUp,
  FiInfo,
} from "react-icons/fi";
import { FaWallet, FaClipboardCheck } from "react-icons/fa";

const Cards = () => {
  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4"
      style={{ fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif" }}
    >
      {/* Card 1: أوامر بانتظار الاعتماد */}
      <article className="relative flex min-h-[124px] flex-col justify-between overflow-hidden rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs">
        <span className="absolute inset-x-0 top-0 h-[3px] bg-[#0b6a91]" />

        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[12px] font-extrabold text-[#1e293b] leading-snug">
              أوامر بانتظار الاعتماد
            </h3>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-[24px] font-black text-[#0b6a91] leading-none">
                7
              </span>
              <span className="text-[11px] font-bold text-[#64748b]">
                أوامر شراء
              </span>
            </div>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e0f2fe] bg-[#f0f9ff] text-[#0b6a91]">
            <FaClipboardCheck className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-[#fff8f6] px-2.5 py-1.5 text-[10px] font-bold text-[#0b6a91] truncate">
          <FiInfo className="h-3.5 w-3.5 shrink-0 text-[#0b6a91]" />
          <span className="truncate">
            تتجاوز سقف الترسية: تتطلب تصديق مالك الا
          </span>
        </div>
      </article>

      {/* Card 2: أوامر قيد التنفيذ والتوريد */}
      <article className="relative flex min-h-[124px] flex-col justify-between overflow-hidden rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs">
        <span className="absolute inset-x-0 top-0 h-[3px] bg-[#1e1b6e]" />

        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[12px] font-extrabold text-[#1e293b] leading-snug">
              أوامر قيد التنفيذ والتوريد
            </h3>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-[24px] font-black text-[#1e293b] leading-none">
                19
              </span>
              <span className="text-[11px] font-bold text-[#64748b]">
                أمر مشحون
              </span>
            </div>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e0e7ff] bg-[#eef2ff] text-[#1e1b6e]">
            <FiTruck className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-2 text-[10px] font-bold">
          <span className="text-[#94a3b8] leading-tight">
            الجدول اللوجستي
            <br />
            اليومي
          </span>
          <span className="rounded-md bg-[#eef2ff] px-2 py-1 text-right text-[#1e1b6e] leading-tight">
            4 متوقع تسليمها
            <br />
            اليوم
          </span>
        </div>
      </article>

      {/* Card 3: إجمالي التزامات الشهر (نوفمبر) - Featured Teal Card */}
      <article className="flex min-h-[124px] flex-col justify-between rounded-xl bg-gradient-to-br from-[#1279a0] to-[#085c7b] p-4 text-white shadow-xs">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[12px] font-extrabold text-white/95 leading-snug">
              إجمالي التزامات الشهر (نوفمبر)
            </h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-[22px] font-black text-white leading-none tracking-tight">
                1,482,950
              </span>
              <span className="text-[10.5px] font-bold text-white/85">
                ر.س
              </span>
            </div>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
            <FaWallet className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-1.5 text-[10px] font-bold text-white/95">
          <span>+14.2% مقارنة بالإنفاق التعاقدي لشهر أكتوبر</span>
          <FiTrendingUp className="h-3.5 w-3.5 shrink-0 text-white" />
        </div>
      </article>

      {/* Card 4: أوامر تحت التدقيق الرقابي */}
      <article className="relative flex min-h-[124px] flex-col justify-between overflow-hidden rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs">
        <span className="absolute inset-x-0 top-0 h-[3px] bg-[#091b47]" />

        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[12px] font-extrabold text-[#1e293b] leading-snug">
              أوامر تحت التدقيق الرقابي
            </h3>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-[24px] font-black text-[#4f6ef7] leading-none">
                3
              </span>
              <span className="text-[11px] font-bold text-[#64748b]">
                أوامر تدقيق
              </span>
            </div>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e2e8f0] bg-[#f1f5f9] text-[#091b47]">
            <FiShield className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-2 text-[10px] font-bold">
          <span className="text-[#94a3b8]">بروتوكول الحوكمة</span>
          <span className="rounded-md bg-[#eef2ff] px-2 py-1 text-[#091b47]">
            عينة Q4 التدقيق الداخلي
          </span>
        </div>
      </article>
    </section>
  );
};

export default Cards;