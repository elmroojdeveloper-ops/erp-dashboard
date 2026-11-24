"use client";

import { useMemo, useState } from "react";
import {
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiEye,
  FiXCircle,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import {
  quoteRequestRows,
  quoteRequestsTotal,
  quoteStatusLabels,
  quoteStatusStyles,
} from "../mock-data";

const StatusBadge = ({ status }) => {
  const label = quoteStatusLabels[status] || status;
  const styles =
    quoteStatusStyles[status] || "bg-gray-100 text-gray-600";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles}`}
    >
      {status === "selected" && <FiCheck className="size-3.5" />}
      {status === "expired" && <FiClock className="size-3.5" />}
      {status === "rejected" && <FiXCircle className="size-3.5" />}
      {status === "awaiting" && (
        <span className="size-1.5 rounded-full bg-current" />
      )}
      {label}
    </span>
  );
};

const PurchesOfferTap = () => {
  const rows = quoteRequestRows;
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);

  const totalPages = Math.max(1, Math.ceil(quoteRequestsTotal / pageSize));
  const pageRows = useMemo(
    () => rows.slice(0, pageSize),
    [rows]
  );

  const allPageSelected =
    pageRows.length > 0 && pageRows.every((row) => selectedIds.includes(row.id));

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

  const rangeStart = (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, quoteRequestsTotal);

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
              <th className="px-4 py-3.5">التاريخ</th>
              <th className="px-4 py-3.5">رقم الطلب</th>
              <th className="px-4 py-3.5">المورد</th>
              <th className="px-4 py-3.5">مصدر الطلب</th>
              <th className="px-4 py-3.5">تاريخ الاستحقاق</th>
              <th className="px-4 py-3.5">تصنيف الشراء</th>
              <th className="px-4 py-3.5 text-center">الحالة</th>
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
                  <td className="px-4 py-3.5 text-sm font-medium text-deep">
                    {row.date}
                  </td>
                  <td className="px-4 py-3.5 text-sm font-bold text-primary">
                    {row.number}
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
                          {row.vendorLocation}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-deep">{row.source}</td>
                  <td className="px-4 py-3.5 text-sm text-deep">{row.dueDate}</td>
                  <td className="px-4 py-3.5 text-sm text-deep">{row.category}</td>
                  <td className="px-4 py-3.5 text-center">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        className="flex size-9 items-center justify-center rounded-lg text-primary transition hover:bg-surface"
                        aria-label={`عرض ${row.number}`}
                      >
                        <FiEye className="size-5" />
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
        <p className="text-[13px] font-semibold text-primary">
          عرض {rangeStart}-{rangeEnd} من أصل {quoteRequestsTotal} طلب
        </p>

        <div className="flex flex-wrap items-center gap-3">
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

          <button
            type="button"
            onClick={() => setSelectedIds([])}
            disabled={selectedIds.length === 0}
            className="inline-flex h-9 items-center rounded-full bg-[#E8EFF3] px-4 text-[13px] font-semibold text-[#64748B] transition hover:text-deep disabled:opacity-50"
          >
            إلغاء التحديد
          </button>
        </div>
      </div>
    </section>
  );
};

export default PurchesOfferTap;
