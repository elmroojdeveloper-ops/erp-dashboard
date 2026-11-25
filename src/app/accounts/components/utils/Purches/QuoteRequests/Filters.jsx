"use client";

import { FiUser } from "react-icons/fi";
import { HiOutlineCalendar } from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";
import {
  categories,
  departments,
  quoteFilterStatuses,
} from "../Home/mock-data";

const Field = ({ label, children }) => (
  <label className="flex min-w-0 flex-col gap-2">
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
              {quoteFilterStatuses.map((item) => (
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

export default Filters;
