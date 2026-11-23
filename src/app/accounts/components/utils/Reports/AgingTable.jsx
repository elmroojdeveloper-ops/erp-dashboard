"use client";

import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiEye,
  FiFileText,
  FiAlertCircle,
  FiCheck,
  FiMinus,
} from "react-icons/fi";

const cx = (...c) => c.filter(Boolean).join(" ");

const DEFAULT_AGING_ROWS = [
  {
    id: "CUS-1001",
    code: "CUS-\n1001",
    clientName: "شركة الأفق للمقاولات العامة",
    crNumber: "سجل تجاري 1010485621",
    badge: null,
    totalBalance: 680000,
    current1To30: 520000,
    days31To60: 160000,
    days61To90: 0,
    over90: 0,
    hasAlert: false,
  },
  {
    id: "CUS-1002",
    code: "CUS-\n1002",
    clientName: "مؤسسة البناء الحديث للتجارة",
    crNumber: "سجل تجاري 1010592312",
    badge: null,
    totalBalance: 410200,
    current1To30: 180000,
    days31To60: 120200,
    days61To90: 110000,
    over90: 0,
    hasAlert: false,
  },
  {
    id: "CUS-1003",
    code: "CUS-\n1003",
    clientName: "شركة المسار للخدمات اللوجستية",
    crNumber: "سجل تجاري 1010380015",
    badge: {
      label: "حساب متعثر",
      tone: "danger",
    },
    totalBalance: 345000,
    current1To30: 120000,
    days31To60: 75000,
    days61To90: 50000,
    over90: 100000,
    hasAlert: true,
  },
  {
    id: "CUS-1004",
    code: "CUS-\n1004",
    clientName: "شركة التوريدات الهندسية المتقدمة",
    crNumber: "سجل تجاري 1010662187",
    badge: null,
    totalBalance: 295120,
    current1To30: 295120,
    days31To60: 0,
    days61To90: 0,
    over90: 0,
    hasAlert: false,
  },
  {
    id: "CUS-1005",
    code: "CUS-\n1005",
    clientName: "مؤسسة سند للتوزيع والتسويق",
    crNumber: "سجل تجاري 1010779513",
    badge: {
      label: "ملف موجود",
      tone: "warning",
    },
    totalBalance: 210000,
    current1To30: 55000,
    days31To60: 55000,
    days61To90: 0,
    over90: 100000,
    hasAlert: true,
  },
];

const formatMoney = (num) => {
  if (!num || Number(num) === 0) return "—";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(num));
};

const formatExactMoney = (num) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(num || 0));

const Checkbox = ({ checked, indeterminate, onChange, label }) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={indeterminate ? "mixed" : checked}
    aria-label={label}
    onClick={onChange}
    className={cx(
      "flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[4px] border transition-colors",
      checked || indeterminate
        ? "border-[#1b7398] bg-[#1b7398] text-white"
        : "border-[#cbd5e1] bg-white hover:border-[#1b7398]"
    )}
  >
    {indeterminate ? (
      <FiMinus size={10} strokeWidth={3} />
    ) : checked ? (
      <FiCheck size={10} strokeWidth={3} />
    ) : null}
  </button>
);

const AgingTable = ({
  title = "تقرير أعمار الديون والذمم المدينة للعملاء (Customer Aging Report)",
  subtitle = "تصنيف المستحقات المالية المستحقة حسب فترات التأخير الزمني لتسهيل المتابعة والتحصيل الدوري.",
  rows = DEFAULT_AGING_ROWS,
  totalClientsCount = 148,
  summaryTotals = {
    totalBalance: 1940320,
    current1To30: 1095120,
    days31To60: 410200,
    days61To90: 160000,
    over90: 275000,
  },
  onViewCustomer,
  onStatementClick,
  className = "",
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "overdue" | "current"
  const [selectedIds, setSelectedIds] = useState(() => new Set());

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((row) => {
      if (statusFilter === "overdue" && !(row.over90 > 0 || row.days61To90 > 0)) {
        return false;
      }
      if (statusFilter === "current" && !(row.current1To30 > 0)) {
        return false;
      }

      if (!q) return true;
      return (
        row.clientName?.toLowerCase().includes(q) ||
        row.id?.toLowerCase().includes(q) ||
        row.crNumber?.toLowerCase().includes(q)
      );
    });
  }, [rows, search, statusFilter]);

  const allSelected =
    filteredRows.length > 0 &&
    filteredRows.every((r) => selectedIds.has(r.id));
  const someSelected =
    filteredRows.some((r) => selectedIds.has(r.id)) && !allSelected;

  const toggleRow = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredRows.map((r) => r.id)));
    }
  };

  return (
    <section
      dir="rtl"
      className={cx(
        "rounded-[22px] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      {/* ===== رأس الجدول + البحث والفلترة ===== */}
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-right">
          <h2 className="text-[15px] font-extrabold text-[#1f2937]">
            {title}
          </h2>
          <p className="mt-1 text-[11.5px] font-medium text-[#6b7280]">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* حقل البحث */}
          <div className="relative min-w-[230px] flex-1 sm:w-[270px] sm:flex-none">
            <FiSearch
              size={14}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748b]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث باسم العميل أو الكود أو رقم..."
              className="h-9 w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] pl-3.5 pr-9 text-[12px] font-medium text-[#1f2937] placeholder:text-[#94a3b8] transition focus:border-[#1b7398] focus:bg-white focus:outline-none"
            />
          </div>

          {/* فلتر الحالة */}
          <div className="relative w-[135px]">
            <select
              aria-label="فلترة أعمار الديون"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 w-full appearance-none rounded-xl border border-[#e2e8f0] bg-white pl-8 pr-3 text-[12px] font-bold text-[#334155] transition focus:border-[#1b7398] focus:outline-none"
            >
              <option value="all">الكل (مفصل)</option>
              <option value="overdue">متأخر السداد</option>
              <option value="current">مستحق (1-30)</option>
            </select>
            <FiChevronDown
              size={14}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#64748b]"
            />
          </div>
        </div>
      </div>

      {/* ===== الجدول ===== */}
      <div className="overflow-x-auto rounded-2xl border border-[#eef2f6]">
        <table className="w-full min-w-[960px] border-collapse text-right">
          <thead>
            <tr className="bg-[#eef3f7] text-[11.5px] font-bold text-[#475569]">
              <th className="w-[95px] px-3.5 py-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={toggleAll}
                    label="تحديد جميع العملاء"
                  />
                  <span>كود العميل</span>
                </div>
              </th>
              <th className="min-w-[205px] px-3 py-3">اسم العميل والسجل التجاري</th>
              <th className="w-[130px] px-3 py-3 text-center">
                الرصيد الإجمالي القائم
              </th>
              <th className="w-[135px] bg-[#e3f5ec] px-3 py-3 text-center text-[#15803d]">
                الحالي (1 - 30 يوم)
              </th>
              <th className="w-[115px] px-3 py-3 text-center">31 - 60 يوم</th>
              <th className="w-[115px] px-3 py-3 text-center">61 - 90 يوم</th>
              <th className="w-[130px] bg-[#fdecec] px-3 py-3 text-center text-[#c92a2a]">
                أكثر من 90 يوم (حرج)
              </th>
              <th className="w-[85px] px-3 py-3 text-center">الإجراءات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#f1f5f9] text-[12px]">
            {filteredRows.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-10 text-center text-[13px] font-semibold text-[#64748b]"
                >
                  لا توجد بيانات مطابقة لمعايير البحث أو الفلترة الحالية.
                </td>
              </tr>
            ) : (
              filteredRows.map((row) => {
                const isSelected = selectedIds.has(row.id);

                return (
                  <tr
                    key={row.id}
                    className={cx(
                      "transition-colors",
                      isSelected ? "bg-[#eef6fa]" : "bg-white hover:bg-[#f8fbfc]"
                    )}
                  >
                    {/* كود العميل */}
                    <td className="px-3.5 py-3 align-middle">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => toggleRow(row.id)}
                          label={`تحديد ${row.clientName}`}
                        />
                        <span
                          dir="ltr"
                          className="whitespace-pre-line text-[11px] font-bold leading-[14px] text-[#475569]"
                        >
                          {row.code || row.id}
                        </span>
                      </div>
                    </td>

                    {/* اسم العميل والسجل التجاري */}
                    <td className="px-3 py-3 align-middle">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-[#1f2937]">
                            {row.clientName}
                          </p>
                          <p className="mt-0.5 text-[10.5px] font-medium text-[#8c96a0]">
                            {row.crNumber}
                          </p>
                        </div>

                        {row.badge && (
                          <span
                            className={cx(
                              "shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold leading-4",
                              row.badge.tone === "danger"
                                ? "bg-[#fdecec] text-[#dc2626]"
                                : "bg-[#fff4e5] text-[#d97706]"
                            )}
                          >
                            {row.badge.label}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* الرصيد الإجمالي القائم */}
                    <td className="px-3 py-3 text-center align-middle">
                      <span
                        dir="ltr"
                        className="font-extrabold text-[#111827]"
                      >
                        {formatExactMoney(row.totalBalance)}
                      </span>
                      <span className="mr-1 text-[10px] font-bold text-[#64748b]">
                        ر.س
                      </span>
                    </td>

                    {/* الحالي 1 - 30 يوم */}
                    <td className="bg-[#f3fbf6] px-3 py-3 text-center align-middle">
                      {row.current1To30 > 0 ? (
                        <div>
                          <span
                            dir="ltr"
                            className="font-extrabold text-[#15803d]"
                          >
                            {formatExactMoney(row.current1To30)}
                          </span>
                          <span className="mr-1 text-[10px] font-bold text-[#16a34a]">
                            ر.س
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#94a3b8]">—</span>
                      )}
                    </td>

                    {/* 31 - 60 يوم */}
                    <td className="px-3 py-3 text-center align-middle">
                      {row.days31To60 > 0 ? (
                        <div>
                          <span
                            dir="ltr"
                            className="font-bold text-[#334155]"
                          >
                            {formatExactMoney(row.days31To60)}
                          </span>
                          <span className="mr-1 text-[10px] font-semibold text-[#64748b]">
                            ر.س
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#94a3b8]">—</span>
                      )}
                    </td>

                    {/* 61 - 90 يوم */}
                    <td className="px-3 py-3 text-center align-middle">
                      {row.days61To90 > 0 ? (
                        <div>
                          <span
                            dir="ltr"
                            className="font-bold text-[#334155]"
                          >
                            {formatExactMoney(row.days61To90)}
                          </span>
                          <span className="mr-1 text-[10px] font-semibold text-[#64748b]">
                            ر.س
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#94a3b8]">—</span>
                      )}
                    </td>

                    {/* أكثر من 90 يوم (حرج) */}
                    <td className="bg-[#fff7f7] px-3 py-3 text-center align-middle">
                      {row.over90 > 0 ? (
                        <div>
                          <span
                            dir="ltr"
                            className="font-extrabold text-[#dc2626]"
                          >
                            {formatExactMoney(row.over90)}
                          </span>
                          <span className="mr-1 text-[10px] font-bold text-[#dc2626]">
                            ر.س
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#94a3b8]">—</span>
                      )}
                    </td>

                    {/* الإجراءات */}
                    <td className="px-3 py-3 text-center align-middle">
                      <div className="flex items-center justify-center gap-1">
                        {row.hasAlert && (
                          <span
                            title="تنبيه تأخر سداد حرج"
                            className="flex h-6 w-6 items-center justify-center rounded-md bg-[#fdecec] text-[#dc2626]"
                          >
                            <FiAlertCircle size={13} />
                          </span>
                        )}
                        <button
                          type="button"
                          aria-label="كشف الحساب"
                          onClick={() => onStatementClick?.(row)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#475569] transition hover:bg-[#e2e8f0]/70 hover:text-[#1b7398]"
                        >
                          <FiFileText size={13.5} />
                        </button>
                        <button
                          type="button"
                          aria-label="عرض تفاصيل العميل"
                          onClick={() => onViewCustomer?.(row)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#475569] transition hover:bg-[#e2e8f0]/70 hover:text-[#1b7398]"
                        >
                          <FiEye size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

          {/* ===== صف المجموع الإجمالي ===== */}
          <tfoot>
            <tr className="border-t-2 border-[#cbd5e1] bg-[#f8fafc] text-[12px] font-extrabold text-[#111827]">
              <td colSpan={2} className="px-4 py-3.5 text-right">
                المجموع الإجمالي لكافة العملاء ({totalClientsCount} عميل)
              </td>
              <td className="px-3 py-3.5 text-center">
                <span dir="ltr">{formatExactMoney(summaryTotals.totalBalance)}</span>
                <span className="mr-1 text-[10px] font-bold text-[#64748b]">
                  ر.س
                </span>
              </td>
              <td className="bg-[#e3f5ec] px-3 py-3.5 text-center text-[#15803d]">
                <span dir="ltr">
                  {formatExactMoney(summaryTotals.current1To30)}
                </span>
                <span className="mr-1 text-[10px] font-bold">ر.س</span>
              </td>
              <td className="px-3 py-3.5 text-center">
                <span dir="ltr">{formatExactMoney(summaryTotals.days31To60)}</span>
                <span className="mr-1 text-[10px] font-bold text-[#64748b]">
                  ر.س
                </span>
              </td>
              <td className="px-3 py-3.5 text-center">
                <span dir="ltr">{formatExactMoney(summaryTotals.days61To90)}</span>
                <span className="mr-1 text-[10px] font-bold text-[#64748b]">
                  ر.س
                </span>
              </td>
              <td className="bg-[#fdecec] px-3 py-3.5 text-center text-[#c92a2a]">
                <span dir="ltr">{formatMoney(summaryTotals.over90)}</span>
                <span className="mr-1 text-[10px] font-bold">ر.س</span>
              </td>
              <td className="px-3 py-3.5 text-center text-[10.5px] font-bold text-[#64748b]">
                5 سجلات معروضة
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* ===== شريط التحديد السفلي ===== */}
      {selectedIds.size > 0 && (
        <div className="mt-4 flex h-[42px] items-center justify-between rounded-full bg-[#e8eff3] px-5">
          <span className="text-[12.5px] font-bold text-[#1b7398]">
            تم تحديد {selectedIds.size} عميل
          </span>
          <button
            type="button"
            onClick={() => setSelectedIds(new Set())}
            className="text-[12.5px] font-semibold text-[#64748b] transition hover:text-[#111827]"
          >
            إلغاء التحديد
          </button>
        </div>
      )}
    </section>
  );
};

export default AgingTable;