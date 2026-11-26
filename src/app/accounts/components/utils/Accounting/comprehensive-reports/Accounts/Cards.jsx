"use client";

import React from "react";
import { FiBookOpen, FiShield, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { LuHourglass } from "react-icons/lu";

const Cards = ({ stats, onReviewPending }) => {
  const recordedCount = stats?.recordedCount ?? "4,820";
  const postedCount = stats?.postedCount ?? "4,692";
  const pendingCount = stats?.pendingCount ?? "128";

  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 gap-4 md:grid-cols-3 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Card 1: إجمالي القيود المسجلة */}
      <article className="flex flex-col justify-between rounded-[22px] border border-[#e6ecf2] bg-white p-5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="pt-1 text-[16px] font-black text-[#0f172a] leading-snug">
              إجمالي القيود المسجلة
            </h3>
            <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] bg-[#e6f3fa] text-[#086382]">
              <FiBookOpen className="h-[19px] w-[19px]" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[34px] font-black leading-none tracking-tight text-[#0f172a]">
                {recordedCount}
              </span>
              <span className="text-[14px] font-bold text-[#64748b]">
                قيد محاسبي
              </span>
            </div>

            <svg
              viewBox="0 0 120 52"
              className="h-[46px] w-[112px] shrink-0 overflow-visible"
              aria-hidden="true"
            >
              <path
                d="M 4 34 C 24 36, 36 16, 56 22 C 74 28, 84 6, 114 20 L 114 48 L 4 48 Z"
                fill="#e9f4f9"
              />
              <path
                d="M 4 34 C 24 36, 36 16, 56 22 C 74 28, 84 6, 114 20"
                fill="none"
                stroke="#086382"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#f1f5f9] pt-3.5 text-[12px]">
          <span className="font-semibold text-[#64748b]">
            الدفتر العام 2024
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eefaf3] px-3 py-1 text-[11.5px] font-extrabold text-[#047857]">
            <span>+6.8% عن الفترة السابقة</span>
            <FiTrendingUp className="h-3.5 w-3.5" />
          </span>
        </div>
      </article>

      {/* Card 2: القيود المرحلة المعتمدة */}
      <article className="flex flex-col justify-between rounded-[22px] border border-[#e6ecf2] bg-white p-5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="pt-1 text-[16px] font-black text-[#0f172a] leading-snug">
              القيود المرحلة المعتمدة
            </h3>
            <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] bg-[#e8f5ee] text-[#047857]">
              <FiShield className="h-[19px] w-[19px]" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[34px] font-black leading-none tracking-tight text-[#0f172a]">
                {postedCount}
              </span>
              <span className="text-[14px] font-bold text-[#64748b]">
                قيد منجز
              </span>
            </div>

            <div className="flex h-[44px] items-end gap-[5px]">
              <span className="h-[38px] w-[7px] rounded-[2px] bg-[#047857]" />
              <span className="h-[26px] w-[7px] rounded-[2px] bg-[#66b296]" />
              <span className="h-[18px] w-[7px] rounded-[2px] bg-[#9ecbb9]" />
              <span className="h-[22px] w-[7px] rounded-[2px] bg-[#8ec2ad]" />
              <span className="h-[15px] w-[7px] rounded-[2px] bg-[#c5e0d4]" />
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#f1f5f9] pt-3.5 text-[12px]">
          <span className="font-semibold text-[#64748b]">
            مغلقة نهائيًا
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eefaf3] px-3 py-1 text-[11.5px] font-extrabold text-[#047857]">
            <span>97.3% نسبة الترحيل المعتمد</span>
            <FiShield className="h-3.5 w-3.5" />
          </span>
        </div>
      </article>

      {/* Card 3: القيود المعلقة / غير المرحلة */}
      <article className="flex flex-col justify-between rounded-[22px] border border-[#e6ecf2] bg-white p-5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="pt-1 text-[16px] font-black text-[#0f172a] leading-snug">
              القيود المعلقة / غير المرحلة
            </h3>
            <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] bg-[#fdeceb] text-[#c0262d]">
              <LuHourglass className="h-[18px] w-[18px]" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[34px] font-black leading-none tracking-tight text-[#c0262d]">
                {pendingCount}
              </span>
              <span className="text-[14px] font-bold text-[#64748b]">
                تحت التدقيق
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[#fdeceb] px-3 py-1.5 text-[11.5px] font-extrabold text-[#c0262d]">
              <span className="h-2 w-2 rounded-full bg-[#c0262d]" />
              <span>بانتظار الاعتماد</span>
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#f1f5f9] pt-3.5 text-[12px]">
          <button
            type="button"
            onClick={onReviewPending}
            className="text-right text-[12px] font-extrabold leading-[1.35] text-[#c0262d] underline underline-offset-2"
          >
            <span className="block">مراجعة</span>
            <span className="block">المعلقات</span>
          </button>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f5f9] px-3 py-1 text-[11px] font-bold leading-[1.3] text-[#475569]">
            <span className="text-right">
              <span className="block">-4.1% انخفاض عن الشهر</span>
              <span className="block">الماضي</span>
            </span>
            <FiTrendingDown className="h-3.5 w-3.5 shrink-0 text-[#475569]" />
          </span>
        </div>
      </article>
    </section>
  );
};

export default Cards;