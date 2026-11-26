"use client";

import React from "react";
import { FiTrendingUp } from "react-icons/fi";
import { LuTag, LuCalculator, LuShoppingCart } from "react-icons/lu";

const Cards = ({ stats, onViewDecommissioned }) => {
  const grossCost = stats?.grossCost ?? "24,850,000";
  const fullyDepreciated = stats?.fullyDepreciated ?? "42";
  const decommissionedCount = stats?.decommissionedCount ?? "12";

  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 gap-4 md:grid-cols-3 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Card 1: إجمالي قيمة الأصول (التاريخية) */}
      <article className="flex flex-col justify-between rounded-[22px] border border-[#e6ecf2] bg-white p-5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="pt-1 text-[15.5px] font-black leading-snug text-[#0f172a]">
              إجمالي قيمة الأصول (التاريخية)
            </h3>
            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[11px] bg-[#e6f3fa] text-[#086382]">
              <LuTag className="h-[18px] w-[18px]" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[32px] font-black leading-none tracking-tight text-[#0f172a]">
                {grossCost}
              </span>
              <span className="text-[13.5px] font-bold text-[#64748b]">
                ر.س
              </span>
            </div>

            <svg
              viewBox="0 0 120 48"
              className="h-[42px] w-[104px] shrink-0 overflow-visible"
              aria-hidden="true"
            >
              <path
                d="M 4 36 C 24 38, 36 16, 56 22 C 74 28, 84 6, 114 20 L 114 46 L 4 46 Z"
                fill="#e9f4f9"
              />
              <path
                d="M 4 36 C 24 38, 36 16, 56 22 C 74 28, 84 6, 114 20"
                fill="none"
                stroke="#086382"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#f1f5f9] pt-3.5 text-[11.5px]">
          <span className="font-semibold text-[#64748b]">
            نمو الأصول الرأسمالية
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-[#eefaf3] px-2.5 py-1 text-[11px] font-extrabold text-[#047857]">
            <FiTrendingUp className="h-3.5 w-3.5" />
            <span>+8.4%</span>
          </span>
        </div>
      </article>

      {/* Card 2: أصول مهلكة دفترياً بالكامل */}
      <article className="flex flex-col justify-between rounded-[22px] border border-[#e6ecf2] bg-white p-5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="pt-1 text-[15.5px] font-black leading-snug text-[#0f172a]">
              أصول مهلكة دفترياً بالكامل
            </h3>
            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[11px] bg-[#e6f3fa] text-[#086382]">
              <LuCalculator className="h-[18px] w-[18px]" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[32px] font-black leading-none tracking-tight text-[#0f172a]">
                {fullyDepreciated}
              </span>
              <span className="text-[13.5px] font-bold text-[#64748b]">
                أصلاً تشغيلياً
              </span>
            </div>

            <div className="flex h-[42px] items-end gap-[5px]">
              <span className="h-[36px] w-[7px] rounded-[2px] bg-[#086382]" />
              <span className="h-[24px] w-[7px] rounded-[2px] bg-[#5a9ab2]" />
              <span className="h-[17px] w-[7px] rounded-[2px] bg-[#8ebbc9]" />
              <span className="h-[21px] w-[7px] rounded-[2px] bg-[#7aaec0]" />
              <span className="h-[14px] w-[7px] rounded-[2px] bg-[#bfd8e2]" />
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1 border-t border-[#f1f5f9] pt-3 text-[11px] text-[#64748b]">
          <div className="font-semibold">
            <strong className="font-black text-[#334155]">7.2%</strong> من الأصول
            لا تزال بالخدمة
          </div>
          <div className="font-semibold">
            قيمة الخردة المتبقية: 145,000 ر.س
          </div>
        </div>
      </article>

      {/* Card 3: أصول مستبعدة هذا العام (تصفية / بيع) */}
      <article className="flex flex-col justify-between rounded-[22px] border border-[#e6ecf2] bg-white p-5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="pt-1 text-[15.5px] font-black leading-snug text-[#0f172a]">
              أصول مستبعدة هذا العام (تصفية / بيع)
            </h3>
            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[11px] bg-[#fdeceb] text-[#c0262d]">
              <LuShoppingCart className="h-[18px] w-[18px]" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[32px] font-black leading-none tracking-tight text-[#0f172a]">
                {decommissionedCount}
              </span>
              <span className="text-[13.5px] font-bold text-[#64748b]">
                أصول مباعة
              </span>
            </div>

            <svg
              viewBox="0 0 110 46"
              className="h-[40px] w-[96px] shrink-0 overflow-visible"
              aria-hidden="true"
            >
              <path
                d="M 4 12 C 26 12, 40 26, 60 22 C 78 18, 90 36, 106 38 L 106 44 L 4 44 Z"
                fill="#fceaea"
              />
              <path
                d="M 4 12 C 26 12, 40 26, 60 22 C 78 18, 90 36, 106 38"
                fill="none"
                stroke="#c0262d"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between gap-2 border-t border-[#f1f5f9] pt-3 text-[11px]">
          <button
            type="button"
            onClick={onViewDecommissioned}
            className="text-right font-semibold leading-[1.4] text-[#64748b] hover:text-[#0f172a]"
          >
            <span className="block">انخفاض الخسائر الرأسمالية</span>
            <span className="block">القيمة البيعية المحصلة: 680,000 ر.س</span>
          </button>

          <span className="inline-flex shrink-0 items-center rounded-full bg-[#fdeceb] px-2.5 py-1 text-[11px] font-extrabold text-[#c0262d]">
            -2.1%
          </span>
        </div>
      </article>
    </section>
  );
};

export default Cards;
