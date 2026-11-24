"use client";

import React from "react";
import {
  FiEye,
  FiFileText,
  FiLock,
  FiPrinter,
  FiRefreshCw,
} from "react-icons/fi";
import { FaFileExcel } from "react-icons/fa";

const Header = ({
  fiscalYear = "2026",
  breadcrumbs = [
    "المحاسبة",
    "الأرصدة الافتتاحية",
    "سجل عمليات الأرصدة الافتتاحية",
    "سجل الأرصدة الافتتاحية",
  ],
  onRequestReopen,
  onExportExcel,
  onExportPdf,
  onPrint,
}) => {
  return (
    <div dir="rtl" className="flex flex-col gap-2.5">
      <nav className="flex flex-wrap items-center gap-1 text-[11px] font-medium text-[#5B8FA8]">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={`${item}-${index}`}>
            {index > 0 ? (
              <span className="mx-0.5 text-[#A8C5D4]">›</span>
            ) : null}
            <span
              className={
                index === breadcrumbs.length - 1
                  ? "font-bold text-[#237B9F]"
                  : "text-[#7AA0B4]"
              }
            >
              {item}
            </span>
          </React.Fragment>
        ))}
      </nav>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 text-right">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-[22px] font-extrabold leading-none text-[#1A2332]">
              سجل الأرصدة الافتتاحية
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DDD6FE] bg-[#F5F3FF] px-2.5 py-1 text-[10.5px] font-bold text-[#6D28D9]">
              <FiEye className="size-3" />
              وضع القراءة فقط • مقفل نظامياً
            </span>
          </div>
          <p className="mt-2 text-[12.5px] leading-5 text-[#6B7280]">
            عرض الأرصدة الافتتاحية المعتمدة والمقفلة — السنة المالية {fiscalYear}{" "}
            م
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onRequestReopen}
            className="inline-flex h-[34px] cursor-pointer items-center gap-1.5 rounded-[6px] border border-[#B7D5E4] bg-[#EAF4F9] px-3 text-[12px] font-bold text-[#1F6F8F] transition hover:bg-[#DCECF4]"
          >
            <FiLock className="size-3.5" />
            <FiRefreshCw className="size-3" />
            <span>طلب إعادة فتح للتعديل</span>
          </button>

          <button
            type="button"
            onClick={onExportExcel}
            className="inline-flex h-[34px] cursor-pointer items-center gap-1.5 rounded-[6px] border border-[#E2E8F0] bg-white px-2.5 text-[11.5px] font-semibold text-[#475569] transition hover:bg-[#F8FAFC]"
          >
            <FaFileExcel className="size-3.5 text-[#217346]" />
            <span>تصدير Excel</span>
          </button>

          <button
            type="button"
            onClick={onExportPdf}
            className="inline-flex h-[34px] cursor-pointer items-center gap-1.5 rounded-[6px] border border-[#E2E8F0] bg-white px-2.5 text-[11.5px] font-semibold text-[#475569] transition hover:bg-[#F8FAFC]"
          >
            <FiFileText className="size-3.5 text-[#DC2626]" />
            <span>تصدير PDF</span>
          </button>

          <button
            type="button"
            onClick={onPrint}
            className="inline-flex h-[34px] cursor-pointer items-center gap-1.5 rounded-[6px] border border-[#E2E8F0] bg-white px-2.5 text-[11.5px] font-semibold text-[#475569] transition hover:bg-[#F8FAFC]"
          >
            <FiPrinter className="size-3.5" />
            <span>طباعة</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
