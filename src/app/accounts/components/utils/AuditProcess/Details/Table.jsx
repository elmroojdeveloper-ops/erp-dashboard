"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import {
  FiCheck,
  FiMinus,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiFileText,
  FiMessageSquare,
} from "react-icons/fi";

/* ============================================================
   بيانات تجريبية مطابقة للصورة (استبدلها ببيانات الـ API)
============================================================ */
const MOCK_ENTRIES = [
  {
    id: 1,
    date: "2023-10-24",
    entryNumber: "JE/2023/00124",
    description: "فاتورة مبيعات رقم 4...",
    journal: "المبيعات",
    account: "الحلول التقنية المحدودة",
    total: "12,450.00",
    status: "matched", // "matched" | "unmatched"
    checked: false,
  },
  {
    id: 2,
    date: "2023-10-23",
    entryNumber: "JE/2023/00123",
    description: "صرف رواتب شهر أكتو...",
    journal: "البنك",
    account: "الراتب الأساسي",
    total: "3252",
    status: "matched",
    checked: true,
  },
  {
    id: 3,
    date: "2023-10-22",
    entryNumber: "JE/2023/00122",
    description: "تسوية مصروفات نثري...",
    journal: "الصندوق",
    account: "مصاريف عامة",
    total: "46436",
    status: "unmatched",
    checked: true,
  },
  {
    id: 4,
    date: "2023-10-24",
    entryNumber: "JE/2023/00124",
    description: "فاتورة مبيعات رقم 4...",
    journal: "المبيعات",
    account: "الحلول التقنية المحدودة",
    total: "12,450.00",
    status: "matched",
    checked: false,
  },
  {
    id: 5,
    date: "2023-10-23",
    entryNumber: "JE/2023/00123",
    description: "صرف رواتب شهر أكتو...",
    journal: "البنك",
    account: "الراتب الأساسي",
    total: "3252",
    status: "unmatched",
    checked: false,
  },
  {
    id: 6,
    date: "2023-10-22",
    entryNumber: "JE/2023/00122",
    description: "تسوية مصروفات نثري...",
    journal: "الصندوق",
    account: "مصاريف عامة",
    total: "46436",
    status: "matched",
    checked: false,
  },
];

const cx = (...c) => c.filter(Boolean).join(" ");

const entriesLabel = (n) => {
  if (n === 1) return "1 قيد";
  if (n <= 10) return `${n} قيود`;
  return `${n} قيدًا`;
};

const getPages = (page, total) => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, "…", total];
  if (page >= total - 2) return [1, "…", total - 2, total - 1, total];
  return [1, "…", page - 1, page, page + 1, "…", total];
};

/* ============================================================
   توزيع الأعمدة المطابق للصورة (من اليمين لليسار)
   1. التاريخ | 2. رقم القيد | 3. الوصف | 4. دفتر اليومية | 5. الحساب
   6. الإجمالي | 7. الحالة | 8. الإجراءات
============================================================ */
const GRID =
  "grid grid-cols-[125px_125px_145px_95px_125px_95px_85px_95px] justify-between items-center px-5";

const Checkbox = ({ checked, indeterminate, onChange, label }) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={indeterminate ? "mixed" : checked}
    aria-label={label}
    onClick={onChange}
    className={cx(
      "flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[4px] border transition-colors",
      checked || indeterminate
        ? "border-[#1b7398] bg-[#1b7398] text-white"
        : "border-[#cbd5e1] bg-white hover:border-[#1b7398]"
    )}
  >
    {indeterminate ? (
      <FiMinus size={11} strokeWidth={3} />
    ) : checked ? (
      <FiCheck size={11} strokeWidth={3} />
    ) : null}
  </button>
);

const Table = ({
  rows = MOCK_ENTRIES,
  auditId,
  page: initialPage = 1,
  totalPages = 30,
  onPageChange,
  onSelectionChange,
  onNoteClick,
  onAttachmentClick,
  onViewClick,
  className = "",
}) => {
  const [selected, setSelected] = useState(
    () => new Set(rows.filter((r) => r.checked).map((r) => r.id))
  );
  const [page, setPage] = useState(initialPage);

  const allSelected = rows.length > 0 && selected.size === rows.length;
  const someSelected = selected.size > 0 && !allSelected;

  useEffect(() => {
    onSelectionChange?.(Array.from(selected));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const toggleRow = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleAll = () =>
    setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)));

  const goTo = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    onPageChange?.(p);
  };

  const pages = useMemo(() => getPages(page, totalPages), [page, totalPages]);

  return (
    <section
      dir="rtl"
      className={cx(
        "rounded-[22px] bg-white p-5 mt-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      <div className="overflow-x-auto">
        <div className="min-w-[920px]">
          {/* ===== الهيدر ===== */}
          <div
            className={cx(
              GRID,
              "h-[46px] rounded-full bg-[#e8eff3] text-[12.5px] font-semibold text-[#5c6873]"
            )}
          >
            <div className="flex items-center justify-start gap-2.5 pr-1">
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={toggleAll}
                label="تحديد الكل"
              />
              <span>التاريخ</span>
            </div>
            <span className="text-center">رقم القيد</span>
            <span className="text-center">الوصف</span>
            <span className="text-center">دفتر اليومية</span>
            <span className="text-center">الحساب</span>
            <span className="text-center">الإجمالي</span>
            <span className="text-center">الحالة</span>
            <span className="text-center">الإجراءات</span>
          </div>

          {/* ===== الصفوف ===== */}
          <div className="mt-2 space-y-1">
            {rows.map((row) => {
              const isSelected = selected.has(row.id);
              const isMatched = row.status === "matched";

              return (
                <div
                  key={row.id}
                  className={cx(
                    GRID,
                    "min-h-[62px] rounded-2xl py-2.5 transition-colors",
                    isSelected ? "bg-[#eef6fa]" : "hover:bg-[#f8fbfc]"
                  )}
                >
                  {/* 1. التاريخ + Checkbox */}
                  <div className="flex items-center justify-start gap-2.5 pr-1">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => toggleRow(row.id)}
                      label={`تحديد القيد ${row.entryNumber}`}
                    />
                    <span
                      dir="ltr"
                      className="text-[12.5px] font-medium text-[#374151]"
                    >
                      {row.date}
                    </span>
                  </div>

                  {/* 2. رقم القيد */}
                  <span
                    dir="ltr"
                    className="text-center text-[12.5px] font-bold text-[#1b7398]"
                  >
                    {row.entryNumber}
                  </span>

                  {/* 3. الوصف */}
                  <p className="truncate text-center text-[12.5px] font-medium text-[#374151]">
                    {row.description}
                  </p>

                  {/* 4. دفتر اليومية */}
                  <span className="text-center text-[12.5px] font-semibold text-[#374151]">
                    {row.journal}
                  </span>

                  {/* 5. الحساب */}
                  <span className="mx-auto max-w-[120px] text-center text-[12px] font-semibold leading-[17px] text-[#374151]">
                    {row.account}
                  </span>

                  {/* 6. الإجمالي */}
                  <span
                    dir="ltr"
                    className="text-center text-[12.5px] font-bold text-[#1f2937]"
                  >
                    {row.total}
                  </span>

                  {/* 7. الحالة */}
                  <div className="flex justify-center">
                    {isMatched ? (
                      <span className="inline-flex items-center justify-center rounded-full bg-[#dcfce7] px-3 py-1 text-[11px] font-bold text-[#15803d]">
                        مطابق
                      </span>
                    ) : (
                      <span className="inline-flex w-[54px] items-center justify-center rounded-xl bg-[#fdecec] px-1.5 py-1 text-center text-[10.5px] font-bold leading-[14px] text-[#c92a2a]">
                        غير
                        <br />
                        مطابق
                      </span>
                    )}
                  </div>

                  {/* 8. الإجراءات */}
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      type="button"
                      aria-label="إضافة ملاحظة"
                      onClick={() => onNoteClick?.(row)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-[#4b5563] transition-colors hover:bg-[#e5eef3] hover:text-[#1b7398]"
                    >
                      <FiMessageSquare size={14} />
                    </button>

                    <button
                      type="button"
                      aria-label="المرفقات"
                      onClick={() => onAttachmentClick?.(row)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-[#4b5563] transition-colors hover:bg-[#e5eef3] hover:text-[#1b7398]"
                    >
                      <FiFileText size={14} />
                    </button>

                    {auditId ? (
                      <Link
                        href={`/accounts/AuditProcess/${encodeURIComponent(
                          auditId
                        )}/${encodeURIComponent(row.entryNumber || String(row.id))}`}
                        aria-label="عرض القيد"
                        onClick={() => onViewClick?.(row)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-[#4b5563] transition-colors hover:bg-[#e5eef3] hover:text-[#1b7398]"
                      >
                        <FiEye size={14.5} />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        aria-label="عرض القيد"
                        onClick={() => onViewClick?.(row)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-[#4b5563] transition-colors hover:bg-[#e5eef3] hover:text-[#1b7398]"
                      >
                        <FiEye size={14.5} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== الترقيم (اليسار) ===== */}
      <nav
        aria-label="الترقيم"
        className="mt-5 flex items-center justify-start gap-2"
      >
        <button
          type="button"
          aria-label="السابق"
          disabled={page === 1}
          onClick={() => goTo(page - 1)}
          className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#d5dde2] text-[#9aa5b1] transition-colors hover:bg-gray-50 disabled:opacity-50"
        >
          <FiChevronRight size={15} />
        </button>

        {pages.map((p, i) =>
          p === "…" ? (
            <span
              key={`dots-${i}`}
              className="px-0.5 text-[12px] tracking-widest text-[#9aa5b1]"
            >
              •••
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => goTo(p)}
              aria-current={p === page ? "page" : undefined}
              className={cx(
                "flex h-[32px] w-[32px] items-center justify-center rounded-full text-[13px] transition-colors",
                p === page
                  ? "bg-[#1b7398] font-bold text-white"
                  : "border border-[#d5dde2] text-[#9aa5b1] hover:bg-gray-50"
              )}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          aria-label="التالي"
          disabled={page === totalPages}
          onClick={() => goTo(page + 1)}
          className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#d5dde2] text-[#9aa5b1] transition-colors hover:bg-gray-50 disabled:opacity-50"
        >
          <FiChevronLeft size={15} />
        </button>
      </nav>

      {/* ===== شريط التحديد السفلي ===== */}
      {selected.size > 0 && (
        <div className="mt-4 flex h-[44px] items-center justify-between rounded-full bg-[#e8eff3] px-6">
          <span className="text-[13.5px] font-bold text-[#1b7398]">
            تم تحديد {entriesLabel(selected.size)}
          </span>
          <button
            type="button"
            onClick={() => setSelected(new Set())}
            className="text-[13.5px] font-medium text-[#7b8794] transition-colors hover:text-gray-900"
          >
            إلغاء التحديد
          </button>
        </div>
      )}
    </section>
  );
};

export default Table;