"use client";

import React from "react";
import { FiArrowLeft, FiFileText, FiPrinter } from "react-icons/fi";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaFileExcel } from "react-icons/fa";

const FooterBar = ({
  batchCode = "JV-2026-OPEN",
  onViewJournal,
  onExportExcel,
  onExportPdf,
  onPrint,
}) => {
  return (
    <div
      dir="rtl"
      className="flex flex-col gap-3 rounded-[12px] border border-[#E6ECEF] bg-white px-4 py-3.5 shadow-[0_1px_4px_rgba(15,23,42,0.03)] lg:flex-row lg:items-center lg:justify-between"
    >
      {/* يمين: الرسالة */}
      <div className="flex min-w-0 flex-1 items-start gap-2.5">
        <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#EAF4F9] text-[#1F6F8F]">
          <MdOutlineVerifiedUser className="size-4" />
        </span>
        <p className="max-w-[600px] text-[12px] leading-5 text-[#64748B]">
          سجل القيد الافتتاحي معتمد ومثبت في الأستاذ العام ومقفل آلياً، ومتوافق مع
          متطلبات هيئة الزكاة والضريبة والجمارك.
          <br />
          أي تعديل يتطلب تقديم طلب إعادة فتح وموافقة المدير المالي.
        </p>
      </div>

      {/* شمال: أزرار التصدير فوق + عرض القيد تحتها */}
      <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          <button
            type="button"
            onClick={onExportExcel}
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-[7px] border border-[#E2E8F0] bg-white px-3 text-[11.5px] font-semibold text-[#334155] transition hover:bg-[#F8FAFC]"
          >
            <FaFileExcel className="size-3.5 text-[#217346]" />
            تصدير تقرير Excel
          </button>
          <button
            type="button"
            onClick={onExportPdf}
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-[7px] border border-[#E2E8F0] bg-white px-3 text-[11.5px] font-semibold text-[#334155] transition hover:bg-[#F8FAFC]"
          >
            <FiFileText className="size-3.5 text-[#DC2626]" />
            تصدير كشف PDF
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-[7px] border border-[#E2E8F0] bg-white px-3 text-[11.5px] font-semibold text-[#334155] transition hover:bg-[#F8FAFC]"
          >
            <FiPrinter className="size-3.5 text-[#64748B]" />
            طباعة السجل الرسمي
          </button>
        </div>

        <button
          type="button"
          onClick={onViewJournal}
          className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#1F6F8F] px-4 text-[12.5px] font-bold text-white transition hover:bg-[#185A74] sm:w-auto"
        >
          <span>عرض القيد اليومي المرتبط ({batchCode})</span>
          <FiArrowLeft className="size-3.5" />
        </button>
      </div>
    </div>
  );
};

export default FooterBar;
