"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiDownload,
  FiExternalLink,
  FiEye,
  FiFileText,
  FiPrinter,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import {
  purchaseOrderRows,
  purchaseOrdersTotal,
  purchaseOrderStatusLabels,
  purchaseOrderStatusStyles,
} from "../mock-data";

const urgencyStyles = {
  ok: "bg-[#E6F4EA] text-[#2E7D32]",
  warn: "bg-[#FFF3E0] text-[#E65100]",
  late: "bg-[#FDECEC] text-[#C62828]",
};

const StatusBadge = ({ status, note }) => {
  const label = purchaseOrderStatusLabels[status] || status;
  const styles =
    purchaseOrderStatusStyles[status] || "bg-gray-100 text-gray-600";

  return (
    <div className="flex flex-col items-start gap-1">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles}`}
      >
        {status === "pending" && <FiClock className="size-3.5" />}
        {status === "in_progress" && <FiFileText className="size-3.5" />}
        {status === "completed" && <FiCheckCircle className="size-3.5" />}
        {label}
      </span>
      {note ? (
        <p
          className={`inline-flex items-center gap-1 text-[11px] font-medium ${
            status === "pending"
              ? "text-[#C62828]"
              : status === "in_progress"
                ? "text-primary"
                : "text-[#2E7D32]"
          }`}
        >
          {status === "pending" && <FiAlertTriangle className="size-3" />}
          {note}
        </p>
      ) : null}
    </div>
  );
};

const PurchesCommandTap = () => {
  const rows = purchaseOrderRows;
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [selectedCount] = useState(2);

  const totalPages = Math.max(1, Math.ceil(purchaseOrdersTotal / pageSize));
  const pageRows = useMemo(() => rows.slice(0, pageSize), [rows]);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    return [1, 2, 3, "…", totalPages];
  }, [totalPages]);

  return (
    <section className="overflow-hidden rounded-[16px] border border-[#E8EEF2] bg-white shadow-[0_1px_3px_rgba(35,70,90,0.04)]">
      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse text-right">
          <thead>
            <tr className="border-b border-cool-gray bg-[#eef3f6] text-[13px] font-semibold text-muted">
              <th className="px-4 py-3.5">رقم أمر الشراء / المرجع</th>
              <th className="px-4 py-3.5">المورد المعتمد</th>
              <th className="px-4 py-3.5">حالة الأمر</th>
              <th className="px-4 py-3.5">التواريخ (إصدار / تسليم)</th>
              <th className="px-4 py-3.5">المبلغ الإجمالي</th>
              <th className="px-4 py-3.5 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-cool-gray last:border-0 hover:bg-surface/50"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-primary">{row.number}</p>
                    <FiExternalLink className="size-3.5 text-primary" />
                  </div>
                  <span className="mt-1.5 inline-flex rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[11px] font-semibold text-[#475569]">
                    {row.referenceLabel}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded-[9px]"
                      style={{ backgroundColor: "#ECF4F8", color: "#2578A2" }}
                    >
                      <HiOutlineOfficeBuilding
                        className="size-4"
                        style={{ color: "#2578A2" }}
                      />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-deep">
                        {row.vendor}
                      </p>
                      <p className="mt-0.5 text-[12px] text-muted">
                        س.ت: {row.cr} • {row.location}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <StatusBadge status={row.status} note={row.statusNote} />
                </td>

                <td className="px-4 py-4">
                  <p className="text-sm text-deep">
                    الإصدار:{" "}
                    <span className="font-semibold">{row.issueDate}</span>
                  </p>
                  <p className="mt-0.5 text-sm text-deep">
                    التسليم:{" "}
                    <span className="font-semibold">{row.deliveryDate}</span>
                  </p>
                  {row.urgencyLabel ? (
                    <span
                      className={`mt-1.5 inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                        urgencyStyles[row.urgency] || urgencyStyles.warn
                      }`}
                    >
                      {row.urgencyLabel}
                    </span>
                  ) : null}
                </td>

                <td className="px-4 py-4">
                  <p className="text-sm font-bold text-deep">
                    {row.amount} ر.س
                  </p>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <Link
                      href={`/accounts/Purches/orders/${encodeURIComponent(row.id)}`}
                      className="flex size-8 items-center justify-center rounded-lg text-[#64748B] transition hover:bg-surface hover:text-primary"
                      aria-label={`عرض ${row.number}`}
                    >
                      <FiEye className="size-4" />
                    </Link>
                    <button
                      type="button"
                      className="flex size-8 items-center justify-center rounded-lg text-[#64748B] transition hover:bg-surface hover:text-primary"
                      aria-label="طباعة"
                    >
                      <FiPrinter className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="flex size-8 items-center justify-center rounded-lg text-[#64748B] transition hover:bg-surface hover:text-primary"
                      aria-label="تحميل"
                    >
                      <FiDownload className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="m-4 flex flex-col gap-3 rounded-full bg-[#E8EFF3] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13.5px] font-bold text-primary">
          تم تحديد {selectedCount} قيود
        </p>

        <nav aria-label="الترقيم" className="flex items-center justify-center gap-2">
          <button
            type="button"
            aria-label="السابق"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex size-9 items-center justify-center rounded-full border border-[#D5DDE2] bg-white text-[#9AA5B1] transition hover:bg-surface disabled:opacity-40"
          >
            <FiChevronRight className="size-4" />
          </button>

          {pageNumbers.map((num, index) =>
            num === "…" ? (
              <span
                key={`dots-${index}`}
                className="px-1 text-[12px] tracking-widest text-[#9AA5B1]"
              >
                •••
              </span>
            ) : (
              <button
                key={num}
                type="button"
                onClick={() => setPage(num)}
                className={`flex size-9 items-center justify-center rounded-full text-sm font-medium transition ${
                  page === num
                    ? "bg-primary font-bold text-white"
                    : "border border-[#D5DDE2] bg-white text-[#9AA5B1] hover:bg-surface"
                }`}
              >
                {num}
              </button>
            )
          )}

          <button
            type="button"
            aria-label="التالي"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="flex size-9 items-center justify-center rounded-full border border-[#D5DDE2] bg-white text-[#9AA5B1] transition hover:bg-surface disabled:opacity-40"
          >
            <FiChevronLeft className="size-4" />
          </button>
        </nav>

        <button
          type="button"
          className="text-[13.5px] font-medium text-[#7B8794] transition hover:text-deep"
        >
          إلغاء التحديد
        </button>
      </div>
    </section>
  );
};

export default PurchesCommandTap;
