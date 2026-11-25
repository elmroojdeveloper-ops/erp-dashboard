"use client";

import { FiAlertTriangle, FiClock, FiTrendingUp } from "react-icons/fi";
import {
  HiCheckCircle,
  HiCheckBadge,
  HiExclamationCircle,
  HiOutlineClipboardDocumentCheck,
  HiOutlineDocumentCurrencyDollar,
} from "react-icons/hi2";

const Cards = ({
  monthTotal = "1,428,7",
  monthLabel = "نوفمبر",
  monthYear = "2024",
  growth = "+12.4%",
  autoCount = "42",
  mismatchCount = "3",
  pendingCount = "6",
}) => {
  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 gap-[18px] my-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {/* 1) إجمالي قيمة الفواتير هذا الشهر (الكارت الأزرق) */}
      <article className="flex min-h-[175px] flex-col rounded-2xl bg-primary p-5 text-white shadow-card">
        <div className="flex items-start justify-between gap-3">
          <h3 className="max-w-[110px] text-[12px] font-medium leading-[18px] text-white/90">
            إجمالي قيمة الفواتير هذا الشهر
          </h3>
          <span className="flex size-[34px] shrink-0 items-center justify-center rounded-lg bg-white/15">
            <HiOutlineDocumentCurrencyDollar className="size-[18px] text-white" />
          </span>
        </div>

        <p
          dir="rtl"
          className="mt-3 flex items-baseline gap-1.5 whitespace-nowrap"
        >
          <span className="text-[32px] font-bold leading-10 tracking-tight">
            {monthTotal}
          </span>
          <span className="text-[13px] font-medium text-white/85">ر.س</span>
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/20 pt-3">
          <span className="flex items-center gap-1.5 text-[11px] font-medium leading-4 text-white/90">
            <FiTrendingUp className="size-3.5 shrink-0" />
            <span>{growth} عن الشهر السابق</span>
          </span>
          <span className="flex flex-col items-center rounded-lg bg-white/15 px-3 py-1 text-[11px] leading-4 text-white">
            <span>{monthLabel}</span>
            <span>{monthYear}</span>
          </span>
        </div>
      </article>

      {/* 2) معتمدة تلقائياً (Three-Way) */}
      <article className="flex min-h-[175px] flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[12px] font-medium leading-[18px] text-[#475569]">
            معتمدة تلقائياً (Three-Way)
          </h3>
          <span className="flex size-[34px] shrink-0 items-center justify-center rounded-full bg-[#E3F7EA]">
            <HiCheckBadge className="size-5 text-[#10B981]" />
          </span>
        </div>

        <p className="mt-3 flex items-baseline gap-2">
          <span className="text-[32px] font-bold leading-10 text-[#1E293B]">
            {autoCount}
          </span>
          <span className="text-[13px] font-medium text-[#64748B]">
            فاتورة مرحلة
          </span>
        </p>

        <div className="mt-auto flex items-center gap-2 rounded-lg bg-[#E8F8EF] px-3 py-2 text-[11px] font-medium leading-4 text-[#0F7A43]">
          <HiCheckCircle className="size-4 shrink-0 text-[#10B981]" />
          تمت مطابقتها وترحيل قيدها آلياً
        </div>
      </article>

      {/* 3) فواتير بها فروقات (Mismatch) */}
      <article className="flex min-h-[175px] flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[12px] font-medium leading-[18px] text-[#475569]">
            فواتير بها فروقات (Mismatch)
          </h3>
          <span className="flex size-[34px] shrink-0 items-center justify-center rounded-lg bg-[#FDECEF]">
            <FiAlertTriangle className="size-[18px] text-[#E11D48]" />
          </span>
        </div>

        <p className="mt-3 flex items-baseline gap-2">
          <span className="text-[32px] font-bold leading-10 text-[#E11D48]">
            {mismatchCount}
          </span>
          <span className="text-[13px] font-medium text-[#E11D48]">
            تنتظر تسوية
          </span>
        </p>

        <div className="mt-auto flex items-center gap-2 rounded-lg bg-[#FDECEF] px-3 py-2 text-[11px] font-medium leading-4 text-[#BE123C]">
          <HiExclamationCircle className="size-4 shrink-0 text-[#E11D48]" />
          تحتاج مراجعة يدوية وموافقة
        </div>
      </article>

      {/* 4) فواتير بانتظار المطابقة */}
      <article className="flex min-h-[175px] flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[12px] font-medium leading-[18px] text-[#475569]">
            فواتير بانتظار المطابقة
          </h3>
          <span className="flex size-[34px] shrink-0 items-center justify-center rounded-lg bg-[#FEF6E3]">
            <HiOutlineClipboardDocumentCheck className="size-[18px] text-[#E58A00]" />
          </span>
        </div>

        <p className="mt-3 flex items-baseline gap-2">
          <span className="text-[32px] font-bold leading-10 text-[#1E293B]">
            {pendingCount}
          </span>
          <span className="text-[13px] font-medium text-[#64748B]">
            فواتير معلقة
          </span>
        </p>

        <div className="mt-auto flex items-center gap-2 rounded-lg bg-[#FEF6E3] px-3 py-2 text-[11px] font-medium leading-4 text-[#B45309]">
          <FiClock className="size-4 shrink-0 text-[#E58A00]" />
          بانتظار وصول إذن الاستلام أو الفحص
        </div>
      </article>
    </section>
  );
};

export default Cards;