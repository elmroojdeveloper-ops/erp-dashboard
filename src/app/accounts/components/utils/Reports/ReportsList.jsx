"use client";

import React from "react";
import { FiDownload, FiEye, FiFileText } from "react-icons/fi";
import { REPORTS_LIST } from "./mock-data";

const typeClass = {
  محاسبي: "bg-[#eaf4f8] text-[#1b7398]",
  مالي: "bg-[#dcfce7] text-[#15803d]",
  تشغيلي: "bg-[#fff7ed] text-[#c2410c]",
  ضريبي: "bg-[#fdecec] text-[#dc2626]",
  تحليلي: "bg-[#f3e8ff] text-[#7c3aed]",
};

const ReportsList = ({
  rows = REPORTS_LIST,
  onView,
  onDownload,
}) => {
  return (
    <section
      dir="rtl"
      className="rounded-[22px] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-extrabold text-[#1f2937]">
          التقارير الجاهزة
        </h3>
        <span className="rounded-full bg-[#eaf4f8] px-3 py-1 text-[11px] font-bold text-[#1b7398]">
          {rows.length} تقارير
        </span>
      </div>

      <div className="space-y-2.5">
        {rows.map((row) => (
          <div
            key={row.id}
            className="flex flex-col gap-3 rounded-2xl border border-[#eef2f5] px-4 py-3.5 transition hover:bg-[#f8fbfc] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf4f8] text-[#1b7398]">
                <FiFileText size={18} />
              </div>
              <div className="min-w-0 text-right">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[14px] font-bold text-[#1f2937]">
                    {row.title}
                  </p>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                      typeClass[row.type] || typeClass.محاسبي
                    }`}
                  >
                    {row.type}
                  </span>
                </div>
                <p className="mt-1 text-[12px] text-[#6b7280]">
                  {row.description}
                </p>
                <p className="mt-1 text-[11px] font-medium text-[#8c96a0]">
                  الفترة: {row.period} • آخر تحديث: {row.updatedAt}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:shrink-0">
              <button
                type="button"
                aria-label={`عرض ${row.title}`}
                onClick={() => onView?.(row)}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#d5dde2] bg-white px-3 text-[12px] font-bold text-[#374151] transition hover:bg-[#f8fafc]"
              >
                <FiEye size={14} />
                عرض
              </button>
              <button
                type="button"
                aria-label={`تحميل ${row.title}`}
                onClick={() => onDownload?.(row)}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#1b7398] px-3 text-[12px] font-bold text-white transition hover:bg-[#165e7d]"
              >
                <FiDownload size={14} />
                تحميل
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReportsList;
