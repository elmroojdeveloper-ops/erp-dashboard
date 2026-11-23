"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FiEye,
  FiPlus,
  FiPrinter,
  FiRefreshCw,
  FiSearch,
  FiTrash2,
  FiUpload,
} from "react-icons/fi";
import { HiOutlineCalendar } from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";
import {
  creatorTones,
  entriesRows,
  statusStyles,
} from "./mock-data";
import { useRouter } from "next/navigation";

const Filters = ({ filters, setFilters }) => {
  const update = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <section className="rounded-xl bg-white p-4 shadow-card">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-6">
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted">تاريخ القيد</span>
            <div className="flex h-11 items-center gap-2 rounded-xl border border-soft px-3">
              <HiOutlineCalendar className="size-5 shrink-0 text-muted" />
              <input
                type="date"
                value={filters.date}
                onChange={(e) => update("date", e.target.value)}
                className="w-full bg-transparent text-sm text-deep outline-none"
              />
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted">نوع الدفتر</span>
            <div className="relative flex h-11 items-center rounded-xl border border-soft px-3">
              <select
                value={filters.bookType}
                onChange={(e) => update("bookType", e.target.value)}
                className="w-full appearance-none bg-transparent pe-6 text-sm text-deep outline-none"
              >
                <option>الكل</option>
                <option>عام</option>
                <option>مشتريات</option>
                <option>مبيعات</option>
              </select>
              <IoChevronDown className="pointer-events-none absolute end-3 size-5 text-soft" />
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted">الرقم المرجعي</span>
            <div className="flex h-11 items-center gap-2 rounded-xl border border-soft px-3">
              <HiOutlineCalendar className="size-5 shrink-0 text-muted" />
              <input
                type="text"
                value={filters.reference}
                onChange={(e) => update("reference", e.target.value)}
                placeholder="أدخل المرجع..."
                className="w-full bg-transparent text-sm text-deep outline-none placeholder:text-soft"
              />
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted">الحالة</span>
            <div className="relative flex h-11 items-center rounded-xl border border-soft px-3">
              <select
                value={filters.status}
                onChange={(e) => update("status", e.target.value)}
                className="w-full appearance-none bg-transparent pe-6 text-sm text-deep outline-none"
              >
                <option>الكل</option>
                <option>مسودة</option>
                <option>منشور</option>
                <option>معلق</option>
              </select>
              <IoChevronDown className="pointer-events-none absolute end-3 size-5 text-soft" />
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted sm:invisible">بحث</span>
            <div className="flex h-11 items-center gap-2 rounded-xl border border-soft px-3">
              <FiSearch className="size-5 shrink-0 text-soft" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => update("search", e.target.value)}
                placeholder="بحث"
                className="w-full bg-transparent text-sm text-deep outline-none placeholder:text-soft"
              />
            </div>
          </label>
        </div>

        <button
          type="button"
          className="flex size-11 shrink-0 items-center justify-center self-end rounded-xl border border-soft text-muted transition hover:bg-surface"
          aria-label="تحديث"
        >
          <FiRefreshCw className="size-5" />
        </button>
      </div>
    </section>
  );
};

const EmptyState = () => (
  <section className="flex min-h-[520px] flex-col items-center justify-center rounded-[22px] bg-white px-4 py-10 shadow-card sm:px-8">
    <div className="flex w-full max-w-[633px] flex-col items-center gap-6 text-center sm:gap-8">
      <div className="relative h-[240px] w-full max-w-[580px] sm:h-[320px] lg:h-[441px]">
        <Image
          src="/accounts/assets/entries-empty.png"
          alt="لا توجد قيود يومية"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 580px"
          priority
        />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-deep sm:text-2xl lg:text-[32px] lg:leading-[35px]">
          ليس لديك أي قيود يومية بعد
        </h2>
        <p className="text-base font-semibold text-muted sm:text-lg lg:text-xl lg:leading-[26px]">
          ابدأ بتنظيم حساباتك المالية عبر إضافة أول قيد يدوي أو استيراد بياناتك
          السابقة لبدء تتبعك المالي.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
        <Link
          href="/accounts/AddEntries"
          className="flex h-11 items-center justify-center gap-3 rounded-xl bg-gradient-to-b from-primary to-primary-dark px-4 text-base font-medium text-white transition hover:opacity-95"
        >
          <FiPlus className="size-5" />
          إنشاء أول قيد يومية
        </Link>
        <Link
          href="/accounts/Entries/Export"
          className="flex h-11 items-center justify-center gap-3 rounded-xl border border-primary px-4 text-base font-medium text-primary transition hover:bg-surface"
        >
          <FiUpload className="size-5" />
          استيراد البيانات السابقة
        </Link>
      </div>
    </div>
  </section>
);

const EntriesTable = ({ rows, selectedIds, onToggle, onClear }) => {
  const router = useRouter();

  return (
    <section className="overflow-hidden rounded-[22px] bg-white shadow-card">
      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse text-right">
          <thead>
            <tr className="border-b border-cool-gray text-[13px] font-semibold text-muted">
              <th className="px-4 py-4">رقم القيد والتاريخ</th>
              <th className="px-4 py-4">البيان / الوصف المحاسبي</th>
              <th className="px-4 py-4">الحساب المدين (منه)</th>
              <th className="px-4 py-4">الحساب الدائن (إليه)</th>
              <th className="px-4 py-4">المبلغ الإجمالي</th>
              <th className="px-4 py-4 text-center">النوع</th>
              <th className="px-4 py-4 text-center">الحالة</th>
              <th className="px-4 py-4">مدخل القيد</th>
              <th className="px-4 py-4 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isSelected = selectedIds.includes(row.id);

              return (
                <tr
                  key={row.id}
                  onClick={() => onToggle(row.id)}
                  className={`cursor-pointer border-b border-cool-gray last:border-0 ${
                    isSelected ? "bg-surface/70" : row.rowClass || "bg-white"
                  }`}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex size-8 items-center justify-center rounded bg-surface text-primary ${
                          row.statusKey === "pending" ? "bg-[#ffdad6] text-danger" : ""
                        } ${row.statusKey === "draft" ? "bg-cool-gray text-muted" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggle(row.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="size-3.5 accent-primary"
                          aria-label={`تحديد ${row.id}`}
                        />
                      </span>
                      <div className="flex flex-col items-end">
                        <span
                          className={`text-sm font-bold ${
                            row.idClass || "text-primary"
                          }`}
                        >
                          {row.id}
                        </span>
                        <span className="text-xs text-gray">
                          {row.date} • {row.time}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="max-w-[220px] px-4 py-4 text-sm font-medium text-deep">
                    {row.description}
                  </td>

                  <td className="px-4 py-4">
                    <p className="text-[13px] font-semibold text-deep">{row.debit.title}</p>
                    <p className="text-xs text-gray">{row.debit.subtitle}</p>
                  </td>

                  <td className="px-4 py-4">
                    <p className="text-[13px] font-semibold text-deep">{row.credit.title}</p>
                    <p className="text-xs text-gray">{row.credit.subtitle}</p>
                  </td>

                  <td className="px-4 py-4">
                    <p
                      className={`text-sm font-bold ${
                        row.amountClass || "text-deep"
                      }`}
                    >
                      {row.amount}
                    </p>
                    <p className="text-[11px] font-medium text-gray">ر.س</p>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${row.typeClass}`}
                    >
                      {row.type}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[row.statusKey]}`}
                    >
                      <span className="size-1.5 rounded-full bg-current" />
                      {row.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <span
                        className={`flex size-6 items-center justify-center rounded-full text-[10px] font-bold ${creatorTones[row.creator.tone]}`}
                      >
                        {row.creator.initials}
                      </span>
                      <span className="text-[11px] font-medium text-muted">
                        {row.creator.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2 text-muted">
                      <button
                        type="button"
                        className="rounded p-1 transition hover:bg-surface hover:text-primary"
                        aria-label="طباعة"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiPrinter className="size-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded p-1 transition hover:bg-surface hover:text-primary"
                        aria-label="عرض"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/accounts/Entries/${row.id}`);
                        }}
                      >
                        <FiEye className="size-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded p-1 transition hover:bg-red-50 hover:text-danger"
                        aria-label="حذف"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiTrash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedIds.length > 0 && (
        <div className="m-3 flex items-center justify-between rounded-[22px] bg-surface px-6 py-3.5 text-base font-semibold sm:m-4">
          <span className="text-primary">تم تحديد {selectedIds.length} قيود</span>
          <button
            type="button"
            onClick={onClear}
            className="text-gray transition hover:text-deep"
          >
            إلغاء التحديد
          </button>
        </div>
      )}
    </section>
  );
};

const Table = () => {
  const [filters, setFilters] = useState({
    date: "",
    bookType: "الكل",
    reference: "",
    status: "الكل",
    search: "",
  });
  const [selectedIds, setSelectedIds] = useState(
    entriesRows.filter((row) => row.selected).map((row) => row.id)
  );

  const rows = entriesRows;
  const hasEntries = rows.length > 0;

  const toggleRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearSelection = () => setSelectedIds([]);

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <Filters filters={filters} setFilters={setFilters} />

      {hasEntries ? (
        <EntriesTable
          rows={rows}
          selectedIds={selectedIds}
          onToggle={toggleRow}
          onClear={clearSelection}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default Table;
