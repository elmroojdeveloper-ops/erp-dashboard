"use client";

import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiRotateCw,
  FiMonitor,
  FiTool,
  FiTruck,
  FiBox,
  FiEye,
} from "react-icons/fi";

const defaultSuppliersRows = [
  {
    id: "sup-1",
    name: "شركة التقنية المتقدمة",
    code: "AST-2024-001",
    status: "active",
    statusLabel: "نشط",
    category: "توريد أجهزة",
    city: "الرياض",
    paymentTerms: "30 يوم",
    dueBalance: "8,000.00",
    currency: "ر.س",
    iconType: "monitor",
  },
  {
    id: "sup-2",
    name: "مؤسسة صيانة الرياض",
    code: "AST-2023-085",
    status: "inactive",
    statusLabel: "غير نشط",
    category: "خدمات صيانة",
    city: "الرياض",
    paymentTerms: "نقدي",
    dueBalance: "8,000.00",
    currency: "ر.س",
    iconType: "tool",
  },
  {
    id: "sup-3",
    name: "الناقل السريع للتجارة",
    code: "AST-2022-014",
    status: "active",
    statusLabel: "نشط",
    category: "نقل وإمداد",
    city: "جدة",
    paymentTerms: "15 يوم",
    dueBalance: "8,000.00",
    currency: "ر.س",
    iconType: "truck",
  },
  {
    id: "sup-4",
    name: "مورد الخليج للمواد",
    code: "AST-2023-112",
    status: "active",
    statusLabel: "نشط",
    category: "مواد خام",
    city: "الدمام",
    paymentTerms: "نقدي",
    dueBalance: "8,000.00",
    currency: "ر.س",
    iconType: "box",
  },
];

const renderSupplierIcon = (iconType) => {
  switch (iconType) {
    case "monitor":
      return <FiMonitor className="h-4 w-4 text-[#086382]" />;
    case "tool":
      return <FiTool className="h-4 w-4 text-[#086382]" />;
    case "truck":
      return <FiTruck className="h-4 w-4 text-[#086382]" />;
    case "box":
    default:
      return <FiBox className="h-4 w-4 text-[#086382]" />;
  }
};

const Table = ({
  rows = defaultSuppliersRows,
  page = 1,
  totalPages = 30,
  totalItems = 24,
  pageSize = 4,
  onPageChange,
  onSelectionChange,
}) => {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const statusOptions = useMemo(() => {
    return Array.from(new Set(rows.map((r) => r.statusLabel)));
  }, [rows]);

  const categoryOptions = useMemo(() => {
    return Array.from(new Set(rows.map((r) => r.category)));
  }, [rows]);

  const cityOptions = useMemo(() => {
    return Array.from(new Set(rows.map((r) => r.city).filter(Boolean)));
  }, [rows]);

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesStatus =
        statusFilter === "all" || row.statusLabel === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || row.category === categoryFilter;
      const matchesCity = cityFilter === "all" || row.city === cityFilter;
      const matchesQuery =
        !q ||
        row.name.toLowerCase().includes(q) ||
        row.code.toLowerCase().includes(q) ||
        row.category.toLowerCase().includes(q);
      return matchesStatus && matchesCategory && matchesCity && matchesQuery;
    });
  }, [rows, statusFilter, categoryFilter, cityFilter, searchQuery]);

  const allSelected =
    filteredRows.length > 0 &&
    filteredRows.every((row) => selectedIds.includes(row.id));

  const toggleAll = () => {
    const next = allSelected ? [] : filteredRows.map((row) => row.id);
    setSelectedIds(next);
    onSelectionChange?.(next);
  };

  const toggleRow = (id) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((item) => item !== id)
      : [...selectedIds, id];
    setSelectedIds(next);
    onSelectionChange?.(next);
  };

  const handleReset = () => {
    setStatusFilter("all");
    setCategoryFilter("all");
    setCityFilter("all");
    setSearchQuery("");
    setSelectedIds([]);
    onSelectionChange?.([]);
    onPageChange?.(1);
  };

  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);
  const visiblePages = [3, 2, 1];

  return (
    <div
      dir="rtl"
      className="mt-6 space-y-4 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Filter Bar */}
      <div className="rounded-[20px] border border-[#e6ecf2] bg-white p-4">
        <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:grid-cols-12">
          {/* الحالة */}
          <div className="lg:col-span-3">
            <label className="mb-1.5 block text-right text-[11.5px] font-bold text-[#64748b]">
              الحالة
            </label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[38px] w-full appearance-none rounded-[10px] border border-[#e2e8f0] bg-white pr-3 pl-8 text-right text-[12px] font-bold text-[#475569] outline-none transition focus:border-[#086382]"
              >
                <option value="all">الكل</option>
                {statusOptions.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              <FiChevronDown className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
            </div>
          </div>

          {/* التصنيف */}
          <div className="lg:col-span-3">
            <label className="mb-1.5 block text-right text-[11.5px] font-bold text-[#64748b]">
              التصنيف
            </label>
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-[38px] w-full appearance-none rounded-[10px] border border-[#e2e8f0] bg-white pr-3 pl-8 text-right text-[12px] font-bold text-[#475569] outline-none transition focus:border-[#086382]"
              >
                <option value="all">الكل</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <FiChevronDown className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
            </div>
          </div>

          {/* المدينة */}
          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-right text-[11.5px] font-bold text-[#64748b]">
              المدينة
            </label>
            <div className="relative">
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="h-[38px] w-full appearance-none rounded-[10px] border border-[#e2e8f0] bg-white pr-3 pl-8 text-right text-[12px] font-bold text-[#475569] outline-none transition focus:border-[#086382]"
              >
                <option value="all">الكل</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <FiChevronDown className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
            </div>
          </div>

          {/* بحث + زر إعادة الضبط */}
          <div className="flex items-center gap-2 lg:col-span-4">
            <div className="relative flex-1">
              <FiSearch className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#94a3b8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث"
                className="h-[38px] w-full rounded-[10px] border border-[#e2e8f0] bg-white pr-8 pl-3 text-right text-[12px] font-semibold text-[#0f172a] placeholder-[#94a3b8] outline-none transition focus:border-[#086382]"
              />
            </div>

            <button
              type="button"
              onClick={handleReset}
              aria-label="إعادة تعيين الفلاتر"
              className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] border border-[#e2e8f0] bg-white text-[#64748b] transition hover:bg-[#f8fafc] hover:text-[#086382]"
            >
              <FiRotateCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-[20px] border border-[#e6ecf2] bg-white p-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-separate border-spacing-y-2.5 text-right">
            <thead>
              <tr className="bg-[#086382] text-white">
                <th className="rounded-r-[12px] py-3 pr-4 pl-2 text-right">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      aria-label="تحديد جميع الموردين"
                      className="h-4 w-4 cursor-pointer rounded border-white/60 accent-[#086382]"
                    />
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-extrabold">
                      <span className="h-2 w-2 rounded-[2px] bg-white" />
                      <span>المورد / الرمز</span>
                    </span>
                  </div>
                </th>
                <th className="px-3 py-3 text-center text-[12px] font-extrabold">
                  الحالة
                </th>
                <th className="px-3 py-3 text-center text-[12px] font-extrabold">
                  التصنيف
                </th>
                <th className="px-3 py-3 text-center text-[12px] font-extrabold">
                  شروط الدفع
                </th>
                <th className="px-3 py-3 text-left text-[12px] font-extrabold">
                  الرصيد المستحق (ريال)
                </th>
                <th className="rounded-l-[12px] py-3 pl-4 pr-2 text-center text-[12px] font-extrabold">
                  الإجراءات
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="rounded-[14px] border border-[#eef2f6] bg-[#fafcfd] py-8 text-center text-[12.5px] font-bold text-[#64748b]"
                  >
                    لا توجد نتائج مطابقة للبحث أو الفلاتر المحددة.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => {
                  const isChecked = selectedIds.includes(row.id);
                  const isActive = row.status === "active";

                  return (
                    <tr
                      key={row.id}
                      className="rounded-[14px] border border-[#e6ecf2] bg-white transition hover:bg-[#f8fbfd]"
                    >
                      {/* المورد / الرمز */}
                      <td className="rounded-r-[14px] border-y border-r border-[#e6ecf2] py-3 pr-4 pl-2 align-middle">
                        <div className="flex items-center justify-start gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleRow(row.id)}
                            aria-label={`تحديد ${row.name}`}
                            className="h-4 w-4 shrink-0 cursor-pointer rounded border-[#cbd5e1] accent-[#086382]"
                          />

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[#e6ecf2] bg-[#f4f8fb]">
                            {renderSupplierIcon(row.iconType)}
                          </div>

                          <div className="min-w-0 text-right">
                            <div className="truncate text-[13px] font-black text-[#0f172a]">
                              {row.name}
                            </div>
                            <div
                              className="mt-0.5 text-[11px] font-semibold text-[#64748b] tabular-nums"
                              dir="auto"
                            >
                              {row.code}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* الحالة */}
                      <td className="border-y border-[#e6ecf2] px-3 py-3 text-center align-middle">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[12px] font-extrabold ${
                            isActive ? "text-[#086382]" : "text-[#64748b]"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isActive ? "bg-[#086382]" : "bg-[#94a3b8]"
                            }`}
                          />
                          <span>{row.statusLabel}</span>
                        </span>
                      </td>

                      {/* التصنيف */}
                      <td className="border-y border-[#e6ecf2] px-3 py-3 text-center align-middle">
                        <span className="inline-flex items-center rounded-[7px] bg-[#edf4f8] px-2.5 py-1 text-[11.5px] font-bold text-[#086382]">
                          {row.category}
                        </span>
                      </td>

                      {/* شروط الدفع */}
                      <td className="border-y border-[#e6ecf2] px-3 py-3 text-center align-middle">
                        <span
                          className="text-[12.5px] font-extrabold text-[#1e293b] tabular-nums"
                          dir="auto"
                        >
                          {row.paymentTerms}
                        </span>
                      </td>

                      {/* الرصيد المستحق (ريال) */}
                      <td className="border-y border-[#e6ecf2] px-3 py-3 text-left align-middle">
                        <span
                          className="text-[13.5px] font-black text-[#0f172a] tabular-nums"
                          dir="auto"
                        >
                          {row.dueBalance}{" "}
                          <span className="text-[11px] font-bold text-[#64748b]">
                            {row.currency}
                          </span>
                        </span>
                      </td>

                      {/* الإجراءات (أيقونة العين) */}
                      <td className="rounded-l-[14px] border-y border-l border-[#e6ecf2] py-3 pl-4 pr-2 text-center align-middle">
                        <button
                          type="button"
                          onClick={() => {
                            router.push(`/accounts/Supliers/${row?.id}`);
                          }}
                          aria-label={`عرض تفاصيل ${row.name}`}
                          title="عرض التفاصيل"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#e2e8f0] bg-white text-[#086382] transition hover:border-[#086382] hover:bg-[#edf4f8]"
                        >
                          <FiEye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#eef2f6] pt-3.5 text-[12px]">
          <div className="flex items-center gap-1.5" dir="ltr">
            <button
              type="button"
              onClick={() => onPageChange?.(Math.max(1, page - 1))}
              disabled={page <= 1}
              aria-label="الصفحة السابقة"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#64748b] transition hover:bg-[#f8fafc] disabled:opacity-40"
            >
              <FiChevronLeft className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onPageChange?.(totalPages)}
              className={`flex h-7 w-7 items-center justify-center rounded-full border text-[11.5px] font-bold tabular-nums transition ${
                page === totalPages
                  ? "border-[#086382] bg-[#086382] text-white"
                  : "border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
              }`}
            >
              {totalPages}
            </button>

            <span className="px-1 text-xs font-bold text-[#94a3b8]">...</span>

            {visiblePages.map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => onPageChange?.(num)}
                className={`flex h-7 w-7 items-center justify-center rounded-full border text-[11.5px] font-bold tabular-nums transition ${
                  page === num
                    ? "border-[#086382] bg-[#086382] text-white"
                    : "border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              type="button"
              onClick={() => onPageChange?.(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages}
              aria-label="الصفحة التالية"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#64748b] transition hover:bg-[#f8fafc] disabled:opacity-40"
            >
              <FiChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="font-bold text-[#086382] tabular-nums" dir="auto">
            عرض {startItem}-{endItem} من {totalItems} عملية تدقيق
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;