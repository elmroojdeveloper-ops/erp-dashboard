"use client";

import React from "react";
import Link from "next/link";
import {
  FiArrowRight,
  FiCalendar,
  FiDownload,
  FiExternalLink,
  FiMoreVertical,
  FiPrinter,
  FiShare2,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";

const Toolbar = ({ data = {} }) => {
  const poNumber = data.poNumber || "PO-2024-231";
  const listHref = data.toolbar?.listHref || "/accounts/Purches/orders";
  const issueDate = data.issueDate || "18 نوفمبر 2024";
  const cmpRef = data.cmpRef || "CMP-2024-019";
  const sourceLabel =
    data.sourceLabel || "مصدر الترسية: مقارنة عروض الأسعار";
  const costCenter =
    data.costCenter || "CC-001 - تقنية المعلومات والبنية التحتية";
  const statusLabel = data.statusLabel || "بانتظار الاعتماد المالي / سقف الترسية";
  const deliveryStatusLabel = data.deliveryStatusLabel || "قيد التوريد الجزئي";

  return (
    <div
      dir="rtl"
      className="flex w-full flex-col gap-3 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      <section className="rounded-xl border border-[#e6ecf2] bg-white px-5 py-4 shadow-2xs sm:px-6">
        <div className="flex flex-col gap-3.5 lg:flex-row lg:items-start lg:justify-between">
          {/* Right Side: Title, Badges & Metadata */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-[20px] font-black leading-tight text-[#0f172a] sm:text-[22px]">
                أمر شراء رقم{" "}
                <span className="text-[#0d658a]">{poNumber}</span>
              </h1>

              <span className="inline-flex items-center gap-1.5 rounded-md border border-[#fde68a] bg-[#fffbeb] px-2.5 py-0.5 text-[10.5px] font-bold text-[#b45309]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d97706]" />
                <span>{statusLabel}</span>
              </span>

              {deliveryStatusLabel ? (
                <span className="inline-flex items-center gap-1 rounded-md border border-[#bae6fd] bg-[#f0f9ff] px-2.5 py-0.5 text-[10.5px] font-bold text-[#0369a1]">
                  <FiTruck className="h-3 w-3 shrink-0" />
                  <span>{deliveryStatusLabel}</span>
                </span>
              ) : null}
            </div>

            <ul className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold text-[#64748b]">
              <li className="inline-flex items-center gap-1.5">
                <FiCalendar className="h-3.5 w-3.5 text-[#94a3b8]" />
                <span>تاريخ الإصدار:</span>
                <strong className="font-bold text-[#334155]">{issueDate}</strong>
              </li>
              <li className="inline-flex items-center gap-1.5">
                <FiExternalLink className="h-3.5 w-3.5 text-[#0d658a]" />
                <span>{sourceLabel}</span>
                <strong className="font-extrabold text-[#0d658a]">{cmpRef}</strong>
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-md border border-[#e2e8f0] bg-[#f8fafc] px-2 py-0.5">
                <FiShare2 className="h-3 w-3 text-[#94a3b8]" />
                <span>مركز التكلفة:</span>
                <strong className="font-bold text-[#334155]">{costCenter}</strong>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#64748b] transition hover:bg-[#f8fafc]"
              aria-label="المزيد من الخيارات"
            >
              <FiMoreVertical className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={data.onCancel}
              className="inline-flex h-[34px] items-center gap-1.5 rounded-lg border border-[#fecdd3] bg-[#fff1f2] px-3 text-[11.5px] font-bold text-[#e11d48] transition hover:bg-[#ffe4e6]"
            >
              <FiXCircle className="h-3.5 w-3.5 text-[#e11d48]" />
              <span>إلغاء</span>
            </button>
            <button
              type="button"
              onClick={() => (data.onPrint ? data.onPrint() : window.print?.())}
              className="inline-flex h-[34px] items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[11.5px] font-bold text-[#334155] transition hover:bg-[#f8fafc]"
            >
              <FiPrinter className="h-3.5 w-3.5 text-[#64748b]" />
              <span>طباعة</span>
            </button>
            <button
              type="button"
              onClick={data.onDownloadPdf}
              className="inline-flex h-[34px] items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[11.5px] font-bold text-[#334155] transition hover:bg-[#f8fafc]"
            >
              <FiDownload className="h-3.5 w-3.5 text-[#64748b]" />
              <span>تحميل PDF</span>
            </button>
            <Link
              href={listHref}
              className="inline-flex h-[34px] items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[11.5px] font-bold text-[#334155] transition hover:bg-[#f8fafc]"
            >
              <FiArrowRight className="h-3.5 w-3.5 text-[#64748b]" />
              <span>الرجوع للسجل</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Toolbar;