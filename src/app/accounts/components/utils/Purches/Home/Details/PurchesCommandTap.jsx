"use client";

import { useMemo, useState } from "react";
import {
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiDownload,
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

const StatusBadge = ({ status }) => {
  const label = purchaseOrderStatusLabels[status] || status;
  const styles =
    purchaseOrderStatusStyles[status] || "bg-gray-100 text-gray-600";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles}`}
    >
      {status === "pending" && <FiClock className="size-3.5" />}
      {status === "completed" && <FiCheck className="size-3.5" />}
      {status === "draft" && <FiFileText className="size-3.5" />}
      {label}
    </span>
  );
};

const PurchesCommandTap = () => {
  const rows = purchaseOrderRows;
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState(["1", "2"]);

  const totalPages = Math.max(1, Math.ceil(purchaseOrdersTotal / pageSize));
  const pageRows = useMemo(() => rows.slice(0, pageSize), [rows]);

  const allPageSelected =
    pageRows.length > 0 &&
    pageRows.every((row) => selectedIds.includes(row.id));

  const toggleAll = () => {
    if (allPageSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !pageRows.some((row) => row.id === id))
      );
      return;
    }
    setSelectedIds((prev) => {
      const next = new Set(prev);
      pageRows.forEach((row) => next.add(row.id));
      return [...next];
    });
  };

  const toggleRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const pageNumbers = useMemo(() => {
    const maxButtons = 5;
    const pages = [];
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);
    start = Math.max(1, end - maxButtons + 1);
    for (let i = start; i <= end; i += 1) pages.push(i);
    return pages;
  }, [page, totalPages]);

  return (
    <section className="overflow-hidden rounded-[14px] border border-[#E8EEF2] bg-white">
      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse text-right">
          <thead>
            <tr className="border-b border-cool-gray bg-[#eef3f6] text-[13px] font-semibold text-muted">
              <th className="w-12 px-4 py-3.5">
                <input
                  type="checkbox"
                  checked={allPageSelected}
                  onChange={toggleAll}
                  className="size-4 cursor-pointer rounded border-[#CBD5E1] accent-primary"
                  aria-label="تحديد الكل"
                />
              </th>
              <th className="px-4 py-3.5">رقم أمر الشراء / المرجع</th>
              <th className="px-4 py-3.5">المورد المعتمد</th>
              <th className="px-4 py-3.5 text-center">حالة الأمر</th>
              <th className="px-4 py-3.5">التواريخ (إصدار / تسليم)</th>
              <th className="px-4 py-3.5">المبلغ الإجمالي</th>
              <th className="px-4 py-3.5 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => {
              const checked = selectedIds.includes(row.id);
              return (
                <tr
                  key={row.id}
                  className="border-b border-cool-gray last:border-0 hover:bg-surface/50"
                >
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleRow(row.id)}
                      className="size-4 cursor-pointer rounded border-[#CBD5E1] accent-primary"
                      aria-label={`تحديد ${row.number}`}
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-bold text-primary">{row.number}</p>
                    <span className="mt-1 inline-flex rounded-full bg-[#F1F5F9] px-2 py-0.5 text-[11px] font-semibold text-[#64748B]">
                      {row.reference}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-[9px] bg-[#E8F4FC] text-primary">
                        <HiOutlineOfficeBuilding className="size-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-deep">
                          {row.vendor}
                        </p>
                        <p className="mt-0.5 text-[12px] text-muted">
                          س.ت {row.cr} · {row.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm text-deep">
                      إصدار:{" "}
                      <span className="font-semibold">{row.issueDate}</span>
                    </p>
                    <p className="mt-0.5 text-sm text-deep">
                      تسليم:{" "}
                      <span className="font-semibold">{row.deliveryDate}</span>
                    </p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-bold text-deep">
                      {row.amount}{" "}
                      <span className="text-[11px] font-semibold text-muted">
                        ر.س
                      </span>
                    </p>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-center gap-1">
                    <button
                        type="button"
                        className="flex size-8 items-center justify-center rounded-lg text-primary transition hover:bg-surface"
                        aria-label={`عرض ${row.number}`}
                      >
                        <FiEye className="size-4" />
                      </button>
                  

                      <button
                        type="button"
                        className="flex size-8 items-center justify-center rounded-lg text-primary transition hover:bg-surface"
                        aria-label="تحميل"
                      >
                        <FiDownload className="size-4" />
                      </button>
                 
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-[#E8EEF2] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="الترقيم" className="flex items-center gap-2">
          <button
            type="button"
            aria-label="السابق"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex size-9 items-center justify-center rounded-full border border-[#D5DDE2] text-[#9AA5B1] transition hover:bg-surface disabled:opacity-40"
          >
            <FiChevronRight className="size-4" />
          </button>

          {pageNumbers.map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setPage(num)}
              className={`flex size-9 items-center justify-center rounded-full text-sm font-medium transition ${
                page === num
                  ? "bg-primary font-bold text-white"
                  : "border border-[#D5DDE2] text-[#9AA5B1] hover:bg-surface"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            type="button"
            aria-label="التالي"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="flex size-9 items-center justify-center rounded-full border border-[#D5DDE2] text-[#9AA5B1] transition hover:bg-surface disabled:opacity-40"
          >
            <FiChevronLeft className="size-4" />
          </button>
        </nav>
      </div>

      {selectedIds.length > 0 && (
        <div className="m-4 mt-0 flex h-[44px] items-center justify-between rounded-full bg-[#E8EFF3] px-6">
          <span className="text-[13.5px] font-bold text-primary">
            تم تحديد {selectedIds.length} قيود
          </span>
          <button
            type="button"
            onClick={() => setSelectedIds([])}
            className="text-[13.5px] font-medium text-[#7B8794] transition hover:text-deep"
          >
            إلغاء التحديد
          </button>
        </div>
      )}
    </section>
  );
};

export default PurchesCommandTap;
