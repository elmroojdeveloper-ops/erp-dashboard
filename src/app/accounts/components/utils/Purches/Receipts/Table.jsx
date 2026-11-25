"use client";

import React, { useMemo, useState } from "react";
import { FiAlertTriangle, FiArrowLeft, FiCheckCircle, FiEye, FiLink } from "react-icons/fi";
import {
  goodsReceiptRows,
  goodsReceiptsTotal,
} from "../Home/mock-data";

const defaultRows = [
  {
    id: "1",
    number: "GRN-2024-889",
    poNumber: "PO-2024-231",
    vendor: "شركة الخزائن المتقدمة للتجارة والتقنية",
    status: "partial",
    statusLabel: "استلام جزئي (60/100)",
    statusSubtext: "متبقي 40 قطعة",
    progressPercent: 60,
    date: "19 نوفمبر 2024",
    time: "10:45 ص",
    receiverName: "سلطان العتيبي",
    receiverRole: "أمين مستودع",
    receiverInitial: "س",
  },
  {
    id: "2",
    number: "GRN-2024-888",
    poNumber: "PO-2024-042",
    vendor: "مؤسسة الرواد للحوسبة المتقدمة",
    status: "complete",
    statusLabel: "استلام كامل",
    statusSubtext: "100% مستلم ومطابق",
    progressPercent: 100,
    date: "18 نوفمبر 2024",
    time: "02:15 م",
    receiverName: "أحمد الغامدي",
    receiverRole: "أمين مستودع",
    receiverInitial: "أ",
  },
  {
    id: "3",
    number: "GRN-2024-887",
    poNumber: "PO-2024-038",
    vendor: "شركة الاتصالات والشبكات الحديثة",
    status: "complete",
    statusLabel: "استلام كامل",
    statusSubtext: "100% مستلم ومطابق",
    progressPercent: 100,
    date: "15 نوفمبر 2024",
    time: "09:30 ص",
    receiverName: "فهد الدوسري",
    receiverRole: "أمين مستودع",
    receiverInitial: "ف",
  },
  {
    id: "4",
    number: "GRN-2024-886",
    poNumber: "PO-2024-049",
    vendor: "مجموعة الدعم الفني والميكانيكي",
    status: "partial",
    statusLabel: "استلام جزئي (15/45)",
    statusSubtext: "دفعة أولى",
    progressPercent: 33,
    date: "14 نوفمبر 2024",
    time: "11:20 ص",
    receiverName: "سلطان العتيبي",
    receiverRole: "أمين مستودع",
    receiverInitial: "س",
  },
];

const Table = ({ onView }) => {
  const sourceRows =
    goodsReceiptRows && goodsReceiptRows.length > 0 ? goodsReceiptRows : defaultRows;

  const pageSize = 4;
  const [page, setPage] = useState(1);

  const totalItems = goodsReceiptsTotal ?? 42;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    const sliced = sourceRows.slice(start, start + pageSize);
    return sliced.length > 0 ? sliced : defaultRows;
  }, [page, sourceRows]);

  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(totalItems, startItem + pageRows.length - 1);

  return (
    <section
      dir="rtl"
      className="overflow-hidden rounded-xl border border-[#e6ecf2] bg-white shadow-2xs"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse text-right">
          <thead>
            <tr className="border-b border-[#e6ecf2] bg-[#f8fafc] text-[11.5px] font-bold text-[#64748b]">
              <th className="px-4 py-3">رقم إذن الاستلام (GRN)</th>
              <th className="px-4 py-3">المورد</th>
              <th className="px-4 py-3">حالة الاستلام</th>
              <th className="px-4 py-3">تاريخ وتوقيت الاستلام</th>
              <th className="px-4 py-3">القائم بالاستلام</th>
              <th className="px-4 py-3 text-center">الإجراء</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#f1f5f9] text-[12.5px]">
            {pageRows.map((row, index) => {
              const isPartial =
                row.status === "partial" ||
                row.status === "PARTIAL" ||
                (row.matchedCount !== undefined &&
                  row.itemsCount !== undefined &&
                  row.matchedCount < row.itemsCount);

              const statusLabel =
                row.statusLabel ||
                (isPartial
                  ? `استلام جزئي (${row.matchedCount ?? 60}/${row.itemsCount ?? 100})`
                  : "استلام كامل");

              const statusSubtext =
                row.statusSubtext ||
                (isPartial
                  ? `متبقي ${(row.itemsCount ?? 100) - (row.matchedCount ?? 60)} قطعة`
                  : "100% مستلم ومطابق");

              const progressPercent =
                row.progressPercent ??
                (isPartial
                  ? Math.round(
                      ((row.matchedCount ?? 60) / (row.itemsCount || 100)) * 100
                    )
                  : 100);

              const dateText = row.date || row.receivedAt || "19 نوفمبر 2024";
              const timeText =
                row.time ||
                ["10:45 ص", "02:15 م", "09:30 ص", "11:20 ص"][index % 4];

              const receiverName = row.receiverName || "سلطان العتيبي";
              const receiverRole = row.receiverRole || "أمين مستودع";
              const receiverInitial =
                row.receiverInitial || receiverName.trim().charAt(0) || "س";

              const avatarTone =
                index === 1
                  ? "bg-[#f1f5f9] text-[#475569]"
                  : "bg-[#e6f3f8] text-[#0d658a]";

              return (
                <tr
                  key={row.id || row.number}
                  className="transition-colors hover:bg-[#fafcfd]"
                >
                  {/* رقم إذن الاستلام */}
                  <td className="px-4 py-3.5 align-middle">
                    <div className="text-[13px] font-extrabold text-[#1e293b] leading-tight">
                      {row.number}
                    </div>
                    <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#64748b]">
                      <FiLink className="h-3 w-3 text-[#94a3b8]" />
                      <span>أمر شراء: {row.poNumber}</span>
                    </div>
                  </td>

                  {/* المورد */}
                  <td className="px-4 py-3.5 align-middle font-bold text-[#1e293b]">
                    {row.vendor}
                  </td>

                  {/* حالة الاستلام */}
                  <td className="px-4 py-3.5 align-middle w-[230px]">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold ${
                          isPartial
                            ? "bg-[#fffbeb] text-[#b45309] border border-[#fde68a]"
                            : "bg-[#f1f5f9] text-[#334155] border border-[#e2e8f0]"
                        }`}
                      >
                        {isPartial ? (
                          <FiAlertTriangle className="h-3 w-3 text-[#d97706]" />
                        ) : (
                          <FiCheckCircle className="h-3 w-3 text-[#64748b]" />
                        )}
                        <span>{statusLabel}</span>
                      </span>

                      <span className="text-[10.5px] font-medium text-[#64748b] whitespace-nowrap">
                        {statusSubtext}
                      </span>
                    </div>

                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e2e8f0]">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isPartial ? "bg-[#0d658a]" : "bg-[#475569]"
                        }`}
                        style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
                      />
                    </div>
                  </td>

                  {/* تاريخ وتوقيت الاستلام */}
                  <td className="px-4 py-3.5 align-middle">
                    <div className="text-[12.5px] font-bold text-[#1e293b] leading-tight">
                      {dateText}
                    </div>
                    <div className="mt-0.5 text-[11px] font-medium text-[#94a3b8]">
                      {timeText}
                    </div>
                  </td>

                  {/* القائم بالاستلام */}
                  <td className="px-4 py-3.5 align-middle">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[12px] font-extrabold ${avatarTone}`}
                      >
                        {receiverInitial}
                      </div>
                      <div>
                        <div className="text-[12.5px] font-bold text-[#1e293b] leading-tight">
                          {receiverName}
                        </div>
                        <div className="mt-0.5 text-[11px] font-medium text-[#94a3b8]">
                          {receiverRole}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* الإجراء */}
                  <td className="px-4 py-3.5 align-middle text-center">
                    <button
                      type="button"
                      onClick={() => onView?.(row.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#64748b] transition hover:border-[#0d658a] hover:bg-[#f0f9ff] hover:text-[#0d658a]"
                      aria-label={`عرض ${row.number}`}
                    >
                      <FiEye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FOOTER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e6ecf2] bg-white px-5 py-3 text-[12px]">
        <div className="font-medium text-[#64748b]">
          عرض <span className="font-bold text-[#1e293b]">{startItem}</span> إلى{" "}
          <span className="font-bold text-[#1e293b]">{endItem}</span> من أصل{" "}
          <span className="font-bold text-[#1e293b]">{totalItems}</span> إذن استلام
        </div>

        <nav aria-label="الترقيم" className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex h-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12px] font-bold text-[#94a3b8] transition hover:bg-[#f8fafc] disabled:opacity-60"
          >
            السابق
          </button>

          {[1, 2, 3].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setPage(num)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-[12px] font-bold transition ${
                page === num
                  ? "bg-[#0d658a] text-white"
                  : "border border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
              }`}
            >
              {num}
            </button>
          ))}

          <span className="px-1.5 text-[#94a3b8]">...</span>

          <button
            type="button"
            onClick={() => setPage(totalPages)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-[12px] font-bold transition ${
              page === totalPages
                ? "bg-[#0d658a] text-white"
                : "border border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
            }`}
          >
            {totalPages}
          </button>

          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="flex h-8 items-center justify-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12px] font-bold text-[#334155] transition hover:bg-[#f8fafc] disabled:opacity-50"
          >
            <span>التالي</span>
            <FiArrowLeft className="h-3.5 w-3.5" />
          </button>
        </nav>
      </div>
    </section>
  );
};

export default Table;