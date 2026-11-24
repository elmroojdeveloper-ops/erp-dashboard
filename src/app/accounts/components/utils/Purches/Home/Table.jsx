"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiPlus,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { HiOutlineCalendar } from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";
import {
  categories,
  departments,
  statusLabels,
  statuses,
  statusStyles,
} from "./mock-data";

const Field = ({ label, children }) => (
  <label className="flex flex-col gap-2">
    <span className="text-sm font-medium text-muted">{label}</span>
    {children}
  </label>
);

const Filters = ({ filters, setFilters }) => {
  const update = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <section className="rounded-xl bg-white p-4 shadow-card sm:p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Field label="مصدر الطلب/القسم">
          <div className="relative flex h-11 items-center rounded-xl border border-soft px-3">
            <select
              value={filters.department}
              onChange={(e) => update("department", e.target.value)}
              className="w-full appearance-none bg-transparent pe-6 text-sm text-deep outline-none"
            >
              {departments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <IoChevronDown className="pointer-events-none absolute end-3 size-5 text-soft" />
          </div>
        </Field>

        <Field label="مقدم الطلب">
          <div className="flex h-11 items-center gap-2 rounded-xl border border-soft px-3">
            <FiUser className="size-5 shrink-0 text-muted" />
            <input
              type="text"
              value={filters.requester}
              onChange={(e) => update("requester", e.target.value)}
              placeholder="بحث باسم الموظف..."
              className="w-full bg-transparent text-sm text-deep outline-none placeholder:text-soft"
            />
          </div>
        </Field>

        <Field label="تاريخ الطلب">
          <div className="flex h-11 items-center gap-2 rounded-xl border border-soft px-3">
            <HiOutlineCalendar className="size-5 shrink-0 text-muted" />
            <input
              type="date"
              value={filters.requestDate}
              onChange={(e) => update("requestDate", e.target.value)}
              className="w-full bg-transparent text-sm text-deep outline-none"
            />
          </div>
        </Field>

        <Field label="الحالة">
          <div className="relative flex h-11 items-center rounded-xl border border-soft px-3">
            <select
              value={filters.status}
              onChange={(e) => update("status", e.target.value)}
              className="w-full appearance-none bg-transparent pe-6 text-sm text-deep outline-none"
            >
              {statuses.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <IoChevronDown className="pointer-events-none absolute end-3 size-5 text-soft" />
          </div>
        </Field>

        <Field label="تصنيف الشراء">
          <div className="relative flex h-11 items-center rounded-xl border border-soft px-3">
            <select
              value={filters.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full appearance-none bg-transparent pe-6 text-sm text-deep outline-none"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <IoChevronDown className="pointer-events-none absolute end-3 size-5 text-soft" />
          </div>
        </Field>

        <Field label="تاريخ الاستحقاق">
          <div className="flex h-11 items-center gap-2 rounded-xl border border-soft px-3">
            <HiOutlineCalendar className="size-5 shrink-0 text-muted" />
            <input
              type="date"
              value={filters.dueDate}
              onChange={(e) => update("dueDate", e.target.value)}
              className="w-full bg-transparent text-sm text-deep outline-none"
            />
          </div>
        </Field>
      </div>
    </section>
  );
};

const EmptyState = ({ onCreate }) => (
  <section className="flex min-h-[480px] flex-col items-center justify-center rounded-[22px] bg-white px-4 py-10 shadow-card sm:px-8">
    <div className="flex w-full max-w-[640px] flex-col items-center gap-6 text-center sm:gap-8">
      <div className="relative h-[220px] w-full max-w-[520px] sm:h-[300px] lg:h-[380px]">
        <Image
          src="/accounts/assets/entries-empty.png"
          alt="لا توجد طلبات شراء"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 520px"
          priority
        />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-deep sm:text-2xl lg:text-[32px] lg:leading-[35px]">
          ليس لديك أي طلب شراء
        </h2>
        <p className="mx-auto max-w-[520px] text-base font-semibold text-muted sm:text-lg lg:text-xl lg:leading-[26px]">
          طلب الشراء هو مستند رسمي يصدره مسؤول المشتريات لطلب أصناف أو خدمات
          محددة من الموردين وفق الاحتياجات المعتمدة.
        </p>
      </div>

      <button
        type="button"
        onClick={onCreate}
        className="flex h-11 items-center justify-center gap-3 rounded-xl bg-gradient-to-b from-primary to-primary-dark px-4 text-base font-medium text-white transition hover:opacity-95"
      >
        <FiPlus className="size-5" />
        إنشاء طلب شراء
      </button>
    </div>
  </section>
);

const RequestsTable = ({ rows, onView }) => {
  const [page, setPage] = useState(1);
  const pageSize = 30;
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const pageRows = rows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section className="overflow-hidden rounded-[22px] bg-white shadow-card">
      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse text-right">
          <thead>
            <tr className="border-b border-cool-gray bg-[#eef3f6] text-[13px] font-semibold text-muted">
              <th className="px-4 py-4">التاريخ</th>
              <th className="px-4 py-4">رقم الطلب</th>
              <th className="px-4 py-4">الوصف</th>
              <th className="px-4 py-4">مصدر الطلب</th>
              <th className="px-4 py-4">مقدم الطلب</th>
              <th className="px-4 py-4">تصنيف الشراء</th>
              <th className="px-4 py-4 text-center">الحالة</th>
              <th className="px-4 py-4 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-cool-gray last:border-0 hover:bg-surface/50"
              >
                <td className="px-4 py-4 text-sm font-medium text-deep">
                  {row.date}
                </td>
                <td className="px-4 py-4">
                  <button
                    type="button"
                    onClick={() => onView?.(row.id)}
                    className="text-sm font-bold text-primary transition hover:underline"
                  >
                    {row.number}
                  </button>
                </td>
                <td className="max-w-[260px] truncate px-4 py-4 text-sm text-deep">
                  {row.description}
                </td>
                <td className="px-4 py-4 text-sm text-deep">{row.source}</td>
                <td className="px-4 py-4 text-sm text-deep">{row.requester}</td>
                <td className="px-4 py-4 text-sm text-deep">{row.category}</td>
                <td className="px-4 py-4 text-center">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-[11px] font-medium ${
                      statusStyles[row.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {statusLabels[row.status] || row.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => onView?.(row.id)}
                      className="flex size-9 items-center justify-center rounded-lg text-primary transition hover:bg-surface"
                      aria-label={`عرض ${row.number}`}
                    >
                      <FiEye className="size-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t border-cool-gray px-4 py-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex size-9 items-center justify-center rounded-full border border-soft text-muted disabled:opacity-40"
            aria-label="السابق"
          >
            <FiChevronRight className="size-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(0, 5)
            .map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setPage(num)}
                className={`flex size-9 items-center justify-center rounded-full text-sm font-medium transition ${
                  page === num
                    ? "bg-primary text-white"
                    : "border border-soft text-muted hover:bg-surface"
                }`}
              >
                {num}
              </button>
            ))}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex size-9 items-center justify-center rounded-full border border-soft text-muted disabled:opacity-40"
            aria-label="التالي"
          >
            <FiChevronLeft className="size-4" />
          </button>
        </div>

        <div className="relative flex h-9 items-center rounded-full border border-soft px-3 text-sm text-muted">
          <select
            defaultValue={pageSize}
            className="appearance-none bg-transparent pe-5 outline-none"
            aria-label="عدد الصفوف"
          >
            <option value={10}>10</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
          <IoChevronDown className="pointer-events-none absolute end-2 size-4" />
        </div>
      </div>
    </section>
  );
};

const Table = ({ rows = [], onCreate, onView }) => {
  const [filters, setFilters] = useState({
    department: "كل الأقسام",
    requester: "",
    requestDate: "",
    status: "all",
    category: "الكل",
    dueDate: "",
  });

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      if (
        filters.department !== "كل الأقسام" &&
        row.source !== filters.department
      ) {
        return false;
      }
      if (
        filters.requester &&
        !row.requester.includes(filters.requester.trim())
      ) {
        return false;
      }
      if (filters.status !== "all" && row.status !== filters.status) {
        return false;
      }
      if (filters.category !== "الكل" && row.category !== filters.category) {
        return false;
      }
      if (filters.requestDate && row.date !== filters.requestDate) {
        return false;
      }
      return true;
    });
  }, [filters, rows]);

  const hasSourceData = rows.length > 0;

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <Filters filters={filters} setFilters={setFilters} />

      {!hasSourceData ? (
        <EmptyState onCreate={onCreate} />
      ) : filteredRows.length === 0 ? (
        <section className="flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-[22px] bg-white px-4 py-10 text-center shadow-card">
          <FiSearch className="size-8 text-soft" />
          <p className="text-base font-semibold text-muted">
            لا توجد نتائج مطابقة للفلاتر الحالية
          </p>
        </section>
      ) : (
        <RequestsTable rows={filteredRows} onView={onView} />
      )}
    </div>
  );
};

export default Table;
