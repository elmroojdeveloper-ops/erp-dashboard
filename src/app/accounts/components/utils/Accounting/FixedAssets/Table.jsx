"use client";

import { useState } from "react";
import {
  FiCopy,
  FiEdit2,
  FiEye,
  FiRefreshCw,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { IoChevronDown } from "react-icons/io5";
import { LuServer } from "react-icons/lu";
import { MdOutlineChair, MdOutlineDirectionsCar } from "react-icons/md";
import { assetsRows, iconTones, statusStyles } from "./mock-data";
import { useRouter } from "next/navigation";

const assetIcons = {
  laptop: HiOutlineDesktopComputer,
  server: LuServer,
  car: MdOutlineDirectionsCar,
  furniture: MdOutlineChair,
};

const Filters = ({ filters, setFilters }) => {
  const update = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <section className="rounded-xl bg-white p-4 shadow-card">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-6">
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted">حالة الأصل</span>
            <div className="relative flex h-11 items-center rounded-xl border border-soft px-3">
              <select
                value={filters.status}
                onChange={(e) => update("status", e.target.value)}
                className="w-full appearance-none bg-transparent pe-6 text-sm text-deep outline-none"
              >
                <option>الكل</option>
                <option>في الخدمة</option>
                <option>تحت الصيانة</option>
                <option>تم التصرف فيه</option>
              </select>
              <IoChevronDown className="pointer-events-none absolute end-3 size-5 text-soft" />
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted">الموظف / القسم</span>
            <div className="relative flex h-11 items-center rounded-xl border border-soft px-3">
              <select
                value={filters.department}
                onChange={(e) => update("department", e.target.value)}
                className="w-full appearance-none bg-transparent pe-6 text-sm text-deep outline-none"
              >
                <option>الكل</option>
                <option>تقنية المعلومات</option>
                <option>الإدارة</option>
                <option>المبيعات</option>
              </select>
              <IoChevronDown className="pointer-events-none absolute end-3 size-5 text-soft" />
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted">الموقع / المشروع</span>
            <div className="relative flex h-11 items-center rounded-xl border border-soft px-3">
              <select
                value={filters.location}
                onChange={(e) => update("location", e.target.value)}
                className="w-full appearance-none bg-transparent pe-6 text-sm text-deep outline-none"
              >
                <option>الكل</option>
                <option>المقر الرئيسي</option>
                <option>الفرع الشمالي</option>
                <option>المستودع</option>
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

const AssetsTable = ({ rows, selectedIds, onToggle }) => {
  const router = useRouter();

  return (
    <section className="overflow-hidden rounded-[22px] bg-white shadow-card">
      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-right">
          <thead>
            <tr className="bg-primary-dark text-[13px] font-semibold text-white">
              <th className="px-4 py-4 text-center">
                <span className="sr-only">تحديد</span>
              </th>
              <th className="px-4 py-4">اسم الأصل والكود</th>
              <th className="px-4 py-4">الفئة</th>
              <th className="px-4 py-4 text-center">الحالة</th>
              <th className="px-4 py-4">القيمة الحالية (SAR)</th>
              <th className="px-4 py-4 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isSelected = selectedIds.includes(row.id);
              const Icon = assetIcons[row.icon] || HiOutlineDesktopComputer;

              return (
                <tr
                  key={row.id}
                  onClick={() => onToggle(row.id)}
                  className={`cursor-pointer border-b border-cool-gray last:border-0 ${
                    isSelected ? "bg-surface/70" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(row.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="size-3.5 accent-primary"
                      aria-label={`تحديد ${row.name}`}
                    />
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconTones[row.icon]}`}
                      >
                        <Icon className="size-5" />
                      </span>
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-deep">
                          {row.name}
                        </span>
                        <span className="text-xs text-gray">{row.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-deep">
                    {row.category}
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
                    <p className="text-sm font-bold text-deep">{row.value}</p>
                    <p className="text-[11px] font-medium text-gray">ر.س</p>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2 text-muted">
                      <button
                        type="button"
                        className="rounded p-1 transition hover:bg-surface hover:text-primary"
                        aria-label="عرض"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/accounts/FixedAsset/${row.id}`);
                        }}
                      >
                        <FiEye className="size-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded p-1 transition hover:bg-surface hover:text-primary"
                        aria-label="تعديل"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiEdit2 className="size-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded p-1 transition hover:bg-surface hover:text-primary"
                        aria-label="نسخ"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiCopy className="size-4" />
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

      <div className="flex flex-col gap-3 border-t border-cool-gray px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm font-medium text-muted">
          عرض 1-{rows.length} من 24 أصل
        </p>

        <div className="flex items-center gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              className={`flex size-9 items-center justify-center rounded-full text-sm font-semibold transition ${
                page === 1
                  ? "bg-primary-dark text-white"
                  : "bg-surface text-muted hover:bg-cool-gray"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const Table = () => {
  const [filters, setFilters] = useState({
    status: "الكل",
    department: "الكل",
    location: "الكل",
    search: "",
  });
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <Filters filters={filters} setFilters={setFilters} />
      <AssetsTable
        rows={assetsRows}
        selectedIds={selectedIds}
        onToggle={toggleRow}
      />
    </div>
  );
};

export default Table;
