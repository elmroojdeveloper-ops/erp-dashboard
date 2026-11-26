"use client";

import React from "react";
import { FiTrendingUp, FiCheckCircle, FiRefreshCw } from "react-icons/fi";
import { LuScale, LuTimer, LuBadgeCheck } from "react-icons/lu";

const Cards = ({ stats }) => {
  const approvedBalances = stats?.approvedBalances ?? "184,650,000";
  const avgApprovalDays = stats?.avgApprovalDays ?? "2.4";
  const rejectedRate = stats?.rejectedRate ?? "4.2%";
  const completionRate = stats?.completionRate ?? "98.6%";

  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 my-5 gap-3.5 sm:grid-cols-2 xl:grid-cols-4 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Card 1: إجمالي الأرصدة المعتمدة */}
      <article className="relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-[22px] border border-[#e6ecf2] bg-white p-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-9 -left-9 h-28 w-28 rounded-full bg-[#eef4f8]"
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-2">
            <div className="text-right">
              <h3 className="text-[14px] font-black leading-[1.3] text-[#0f172a]">
                <span className="block">إجمالي الأرصدة</span>
                <span className="block">المعتمدة</span>
              </h3>
              <p className="mt-1 text-[11px] font-semibold leading-[1.35] text-[#64748b]">
                <span className="block">إجمالي 5 سنوات مالية</span>
                <span className="block">مجمعة</span>
              </p>
            </div>

            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[11px] bg-[#e6f1f7] text-[#086382]">
              <LuScale className="h-[18px] w-[18px]" />
            </div>
          </div>

          <div className="mt-4 text-right">
            <div className="text-[28px] font-black leading-none tracking-tight text-[#0f172a] tabular-nums">
              {approvedBalances}
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-4 flex items-center justify-between gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 rounded-[12px] bg-[#eaf6f0] px-3 py-1.5 text-[11px] font-extrabold leading-[1.2] text-[#047857]">
            <span>
              <span className="block">+14.8% عن السنة</span>
              <span className="block">السابقة</span>
            </span>
            <FiTrendingUp className="h-3.5 w-3.5 shrink-0" />
          </span>

          <span className="text-left text-[11px] font-bold leading-[1.3] text-[#64748b]">
            <span className="block">2022 -</span>
            <span className="block">2026 م</span>
          </span>
        </div>
      </article>

      {/* Card 2: متوسط زمن الاعتماد المالي */}
      <article className="relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-[22px] border border-[#e6ecf2] bg-white p-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-9 -left-9 h-28 w-28 rounded-full bg-[#eef4f8]"
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-2">
            <div className="text-right">
              <h3 className="text-[14px] font-black leading-[1.3] text-[#0f172a]">
                <span className="block">متوسط زمن الاعتماد</span>
                <span className="block">المالي</span>
              </h3>
              <p className="mt-1 text-[11px] font-semibold leading-[1.35] text-[#64748b]">
                من الإرسال للاعتماد النهائي
              </p>
            </div>

            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[11px] bg-[#e6f1f7] text-[#086382]">
              <LuTimer className="h-[18px] w-[18px]" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-start gap-1.5 leading-none">
            <span className="text-[28px] font-black tracking-tight text-[#0f172a] tabular-nums">
              {avgApprovalDays}
            </span>
            <span className="text-[12px] font-bold text-[#64748b]">يوم</span>
          </div>
        </div>

        <div className="relative z-10 mt-4 flex items-center justify-between gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 rounded-[12px] bg-[#eaf6f0] px-3 py-1.5 text-[11px] font-extrabold leading-[1.2] text-[#047857]">
            <span>
              <span className="block">-18% كفاءة</span>
              <span className="block">تسريع الدورة</span>
            </span>
            <FiTrendingUp className="h-3.5 w-3.5 shrink-0" />
          </span>

          <span className="text-left text-[11px] font-bold leading-[1.3] text-[#64748b]">
            <span className="block">المستهدف &lt;</span>
            <span className="block">3 أيام</span>
          </span>
        </div>
      </article>

      {/* Card 3: نسبة الدفعات المرفوضة / المعادة */}
      <article className="relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-[22px] border border-[#e6ecf2] bg-white p-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-9 -left-9 h-28 w-28 rounded-full bg-[#eef4f8]"
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-2">
            <div className="text-right">
              <h3 className="text-[14px] font-black leading-[1.3] text-[#0f172a]">
                <span className="block">نسبة الدفعات المرفوضة /</span>
                <span className="block">المعادة</span>
              </h3>
              <p className="mt-1 text-[11px] font-semibold leading-[1.35] text-[#64748b]">
                من إجمالي 48 دفعة محاسبية
              </p>
            </div>

            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[11px] bg-[#e6f1f7] text-[#086382]">
              <FiRefreshCw className="h-[17px] w-[17px]" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-start gap-1.5 leading-none">
            <span className="text-[28px] font-black tracking-tight text-[#0f172a] tabular-nums">
              {rejectedRate}
            </span>
            <span className="text-[11px] font-bold text-[#64748b]">
              (دفعتان فقط)
            </span>
          </div>
        </div>

        <div className="relative z-10 mt-4 flex items-center justify-between gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 rounded-[12px] bg-[#e8eef3] px-3 py-1.5 text-[11px] font-extrabold leading-[1.2] text-[#334155]">
            <FiCheckCircle className="h-3.5 w-3.5 shrink-0 text-[#047857]" />
            <span>
              <span className="block">معدل منخفض</span>
              <span className="block">ومستقر</span>
            </span>
          </span>

          <span className="text-left text-[11px] font-extrabold leading-[1.3] text-[#047857]">
            <span className="block">الحد الآمن</span>
            <span className="block">&lt; 5%</span>
          </span>
        </div>
      </article>

      {/* Card 4: نسبة اكتمال الفئات الخمس */}
      <article className="relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-[22px] border border-[#e6ecf2] bg-white p-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-9 -left-9 h-28 w-28 rounded-full bg-[#eef4f8]"
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-2">
            <div className="text-right">
              <h3 className="text-[14px] font-black leading-[1.3] text-[#0f172a]">
                <span className="block">نسبة اكتمال الفئات</span>
                <span className="block">الخمس</span>
              </h3>
              <p className="mt-1 text-[11px] font-semibold leading-[1.35] text-[#64748b]">
                السنة المالية الحالية 2026 م
              </p>
            </div>

            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[11px] bg-[#e3f3eb] text-[#047857]">
              <LuBadgeCheck className="h-[18px] w-[18px]" />
            </div>
          </div>

          <div className="mt-4 text-right leading-none">
            <span className="text-[28px] font-black tracking-tight text-[#046847] tabular-nums">
              {completionRate}
            </span>
          </div>
        </div>

        <div className="relative z-10 mt-4 pt-1">
          <div className="h-[6px] w-full overflow-hidden rounded-full bg-[#e2e8f0]">
            <div
              className="h-full rounded-full bg-[#046847]"
              style={{ width: completionRate }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between gap-2 text-[11px]">
            <span className="text-right font-bold leading-[1.3] text-[#64748b]">
              <span className="block">5 من 5 فئات معتمدة</span>
              <span className="block">ومتطابقة</span>
            </span>

            <span className="text-left font-extrabold leading-[1.3] text-[#047857]">
              <span className="block">مطابق</span>
              <span className="block">100%</span>
            </span>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Cards;
