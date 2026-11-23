"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FiLock, FiPlus, FiArrowLeft } from "react-icons/fi";

const cx = (...c) => c.filter(Boolean).join(" ");

const Header = ({
  title = "تدقيق الربع الثاني - 2024",
  dateRange = "01/04/2024 - 30/06/2024",
  progress = 87,
  reviewedCount = 35,
  totalCount = 40,
  isClosed = false,
  onCloseAudit,
  onAddBulkNote,
  onBack,
  className = "",
}) => {
  const clampedProgress = Math.max(0, Math.min(100, Number(progress) || 0));
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (clampedProgress / 100) * circumference;
const router =useRouter()
  return (
    <header
      dir="rtl"
      className={cx(
        "rounded-[22px] bg-white px-6 mb-6 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* يمين: العنوان والفترة */}
        <div className="space-y-1 text-right">
          <h1 className="text-[20px] font-extrabold tracking-tight text-[#1b7398]">
            {title}
          </h1>
          {dateRange && (
            <p className="text-[12.5px] font-medium text-[#6b7280]">
              الفترة:{" "}
              <span dir="ltr" className="font-semibold text-[#4b5563]">
                {dateRange}
              </span>
            </p>
          )}
        </div>

        {/* منتصف: التقدم الإجمالي */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
            <svg className="h-12 w-12 -rotate-90" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r={radius}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3.5"
              />
              <circle
                cx="22"
                cy="22"
                r={radius}
                fill="none"
                stroke="#1b7398"
                strokeWidth="3.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <span
              dir="ltr"
              className="absolute text-[10.5px] font-extrabold text-[#1b7398]"
            >
              {clampedProgress}%
            </span>
          </div>

          <div className="space-y-0.5 text-right">
            <p className="text-[13px] font-bold text-[#1f2937]">
              التقدم الإجمالي
            </p>
            <p className="text-[11.5px] font-medium text-[#6b7280]">
              {reviewedCount} من {totalCount} قيد تمت مراجعتها
            </p>
          </div>
        </div>

        {/* يسار: أزرار إغلاق التدقيق، إضافة ملاحظة جماعية، والرجوع */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            disabled={isClosed}
            onClick={() => onCloseAudit?.()}
            className="inline-flex h-[38px] items-center justify-center gap-1.5 rounded-xl border border-[#e5e7eb] bg-white px-3.5 text-[12.5px] font-bold text-[#374151] transition-colors hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiLock size={14} className="text-[#4b5563]" />
            <span>{isClosed ? "التدقيق مغلق" : "إغلاق التدقيق"}</span>
          </button>

          <button
            type="button"
            disabled={isClosed}
            onClick={() => onAddBulkNote?.()}
            className="inline-flex h-[38px] items-center justify-center gap-1.5 rounded-xl bg-[#1b7398] px-4 text-[12.5px] font-bold text-white shadow-2xs transition-colors hover:bg-[#165e7d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiPlus size={15} strokeWidth={2.5} />
            <span>إضافة ملاحظة جماعية</span>
          </button>

          <button
           
            onClick={() => router.back()}
            className="inline-flex h-[38px] items-center justify-center gap-1.5 rounded-xl border border-[#e5e7eb] bg-white px-3.5 text-[12.5px] font-bold text-[#374151] transition-colors hover:bg-[#f9fafb]"
          >
            <span>الرجوع</span>
            <FiArrowLeft size={14} className="text-[#4b5563]" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 