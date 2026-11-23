"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import {
  FiCheck,
  FiMinus,
  FiFileText,
  FiImage,
  FiCreditCard,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiShield,
} from "react-icons/fi";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

/* ============================================================
   داتا ستاتيك (Static Data) للاختبار والعرض
============================================================ */
const MOCK_ROWS = [
  {
    id: 1,
    paymentId: "PMT-2023-4412",
    date: "2023-10-24",
    invoice: "INV-2023-00124",
    client: { name: "مؤسسة الحلول المبتكرة", id: "44231" },
    amount: 42000,
    hasDecimals: false,
    service: "تطوير المنصة السحابية",
    method: "bank",
    attachment: "file",
    status: "pending",
    reviewed: false,
  },
  {
    id: 2,
    paymentId: "PMT-2023-4413",
    date: "2023-10-24",
    invoice: "INV-2023-00125",
    client: { name: "شركة الرؤية العالمية", id: "44231" },
    amount: 15500,
    hasDecimals: true,
    service: "استشارات فنية - الربع الثالث",
    method: "card",
    attachment: "image",
    status: "pending",
    reviewed: false,
  },
  {
    id: 3,
    paymentId: "PMT-2023-4414",
    date: "2023-10-24",
    invoice: "INV-2023-00126",
    client: { name: "متجر الفرسان", id: "44231" },
    amount: 67000,
    hasDecimals: true,
    service: "توريد أجهزة حاسب آلي",
    method: "card",
    attachment: "image",
    status: "mismatch",
    refId: "44231",
    reviewed: true,
  },
  {
    id: 4,
    paymentId: "PMT-2023-4415",
    date: "2023-10-24",
    invoice: "INV-2023-00127",
    client: { name: "متجر الفرسان", id: "44232" },
    amount: 67000,
    hasDecimals: true,
    service: "توريد أجهزة حاسب آلي",
    method: "card",
    attachment: "image",
    status: "mismatch",
    refId: "44232",
    reviewed: true,
  },
  {
    id: 5,
    paymentId: "PMT-2026-4416",
    date: "2026-11-23",
    invoice: "INV-2026-00125",
    client: { name: "شركة الأفق الرقمي", id: "50812" },
    amount: 28500,
    hasDecimals: true,
    service: "إدارة الحملات التسويقية",
    method: "bank",
    attachment: "file",
    status: "pending",
    reviewed: false,
  },
  {
    id: 6,
    paymentId: "PMT-2026-4417",
    date: "2026-11-23",
    invoice: "INV-2026-00126",
    client: { name: "مجموعة النخبة التجارية", id: "50819" },
    amount: 19250,
    hasDecimals: true,
    service: "تصميم الهوية البصرية",
    method: "card",
    attachment: "image",
    status: "pending",
    reviewed: false,
  },
  {
    id: 7,
    paymentId: "PMT-2026-4418",
    date: "2026-11-21",
    invoice: "INV-2026-00127",
    client: { name: "مؤسسة البناء الحديث", id: "50904" },
    amount: 84000,
    hasDecimals: false,
    service: "نظام إدارة المخزون",
    method: "bank",
    attachment: "file",
    status: "mismatch",
    refId: "50904",
    reviewed: false,
  },
  {
    id: 8,
    paymentId: "PMT-2026-4419",
    date: "2026-11-19",
    invoice: "INV-2026-00128",
    client: { name: "دار المعرفة للنشر", id: "50951" },
    amount: 12750,
    hasDecimals: true,
    service: "صيانة البوابة الإلكترونية",
    method: "card",
    attachment: "image",
    status: "pending",
    reviewed: true,
  },
  {
    id: 9,
    paymentId: "PMT-2026-4420",
    date: "2026-11-11",
    invoice: "INV-2026-00129",
    client: { name: "شركة مدار التقنية", id: "51020" },
    amount: 53000,
    hasDecimals: false,
    service: "تطوير تطبيق الجوال",
    method: "bank",
    attachment: "file",
    status: "pending",
    reviewed: true,
  },
  {
    id: 10,
    paymentId: "PMT-2026-4421",
    date: "2026-11-05",
    invoice: "INV-2026-00130",
    client: { name: "متجر واحة العطور", id: "51108" },
    amount: 9800,
    hasDecimals: true,
    service: "ربط بوابة الدفع الإلكتروني",
    method: "card",
    attachment: "image",
    status: "mismatch",
    refId: "51108",
    reviewed: false,
  },
];

const METHODS = {
  bank: { label: "تحويل بنكي", Icon: HiOutlineBuildingLibrary },
  card: { label: "بطاقة مدى", Icon: FiCreditCard },
};

const cx = (...c) => c.filter(Boolean).join(" ");

const formatMoney = (n, showDecimals = true) =>
  Number(n || 0).toLocaleString("en-US", {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  });

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
   توزيع الأعمدة المطابق تماماً للصورة (من اليمين لليسار)
============================================================ */
const GRID =
  "grid grid-cols-[125px_135px_145px_95px_115px_100px_55px_85px_95px] justify-between items-center px-5";

const Checkbox = ({ checked, indeterminate, onChange, label }) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={indeterminate ? "mixed" : checked}
    aria-label={label}
    onClick={onChange}
    className={cx(
      "flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-[5px] border transition-colors",
      checked || indeterminate
        ? "border-[#1b7398] bg-[#1b7398] text-white"
        : "border-[#cfd8dc] bg-white hover:border-[#1b7398]"
    )}
  >
    {indeterminate ? (
      <FiMinus size={11} strokeWidth={3} />
    ) : checked ? (
      <FiCheck size={11} strokeWidth={3} />
    ) : null}
  </button>
);

const StatusCell = ({ row }) => {
  if (row.status === "mismatch") {
    return (
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="inline-flex w-[68px] items-center justify-center rounded-xl bg-[#fdeaea] px-2 py-1.5 text-center text-[11px] font-bold leading-[15px] text-[#c92a2a]">
          اختلاف في المبلغ
        </span>
        {row.refId && (
          <span dir="ltr" className="text-[11px] font-medium text-[#c92a2a]">
            ID: {row.refId}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <span className="inline-flex w-[64px] items-center justify-center rounded-xl bg-[#e6eaee] px-2 py-1.5 text-center text-[11px] font-semibold leading-[15px] text-[#68737d]">
        بانتظار المراجعة
      </span>
    </div>
  );
};

/* ============================================================
   شريط الفلترة (Filter Bar)
============================================================ */
const FilterBar = ({
  dateRange,
  onDateRangeChange,
  paymentMethod,
  onPaymentMethodChange,
  selectedCount,
  onApproveSelected,
}) => {
  const hasSelection = selectedCount > 0;

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-[22px] bg-white px-6 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex flex-wrap items-end gap-5">
        {/* النطاق الزمني */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="filter-date-range"
            className="text-[12.5px] font-semibold text-[#374151]"
          >
            النطاق الزمني
          </label>
          <div className="relative w-[195px]">
            <select
              id="filter-date-range"
              value={dateRange}
              onChange={(e) => onDateRangeChange?.(e.target.value)}
              className="h-[40px] w-full appearance-none rounded-xl border border-[#e2e8f0] bg-white pl-9 pr-3.5 text-[13px] font-medium text-[#9aa5b1] transition-colors focus:border-[#1b7398] focus:text-[#374151] focus:outline-none"
            >
              <option value="all">كل الفترات</option>
              <option value="this_week">هذا الأسبوع</option>
              <option value="today">اليوم</option>
              <option value="this_month">هذا الشهر</option>
            </select>
            <FiChevronDown
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa5b1]"
            />
          </div>
        </div>

        {/* وسيلة الدفع */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="filter-payment-method"
            className="text-[12.5px] font-semibold text-[#374151]"
          >
            وسيلة الدفع
          </label>
          <div className="relative w-[195px]">
            <select
              id="filter-payment-method"
              value={paymentMethod}
              onChange={(e) => onPaymentMethodChange?.(e.target.value)}
              className="h-[40px] w-full appearance-none rounded-xl border border-[#e2e8f0] bg-white pl-9 pr-3.5 text-[13px] font-medium text-[#9aa5b1] transition-colors focus:border-[#1b7398] focus:text-[#374151] focus:outline-none"
            >
              <option value="all">الكل</option>
              <option value="bank">تحويل بنكي</option>
              <option value="card">بطاقة مدى</option>
            </select>
            <FiChevronDown
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa5b1]"
            />
          </div>
        </div>

        {/* زر اعتماد الكل المختار */}
        <button
          type="button"
          disabled={!hasSelection}
          onClick={() => onApproveSelected?.()}
          className={cx(
            "inline-flex h-[40px] items-center justify-center gap-2 rounded-xl px-4 text-[13px] font-semibold transition-all",
            hasSelection
              ? "bg-[#1b7398] text-white shadow-xs hover:bg-[#165e7d]"
              : "cursor-not-allowed bg-[#c5dce6] text-white"
          )}
        >
          <FiShield size={16} />
          <span>اعتماد الكل المختار</span>
        </button>
      </div>
    </div>
  );
};

/* ============================================================
   الجدول + الفلترة
============================================================ */
const PaymentsTableWithFilter = ({
  rows = MOCK_ROWS,
  page: initialPage = 1,
  totalPages = 30,
  onPageChange,
  onSelectionChange,
  onReview,
  onOpenAttachment,
  onApproveSelected,
}) => {
  const [selected, setSelected] = useState(() => new Set());
  const [page, setPage] = useState(initialPage);
  const [dateRange, setDateRange] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("all");

  const filteredRows = useMemo(() => {
    // تواريخ ثابتة للفلاتر عشان ما يحصلش hydration mismatch
    const startOfToday = new Date(2026, 10, 23);
    const startOfWeek = new Date(2026, 10, 17);
    const startOfMonth = new Date(2026, 10, 1);

    return rows.filter((row) => {
      if (paymentMethod !== "all" && row.method !== paymentMethod) {
        return false;
      }

      if (dateRange !== "all" && row.date) {
        const [y, m, day] = row.date.split("-").map(Number);
        const rowDate = new Date(y, (m || 1) - 1, day || 1);
        if (!Number.isNaN(rowDate.getTime())) {
          if (dateRange === "today" && rowDate < startOfToday) return false;
          if (dateRange === "this_week" && rowDate < startOfWeek) return false;
          if (dateRange === "this_month" && rowDate < startOfMonth) return false;
        }
      }

      return true;
    });
  }, [rows, dateRange, paymentMethod]);

  const allSelected =
    filteredRows.length > 0 &&
    filteredRows.every((r) => selected.has(r.id));
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
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        filteredRows.forEach((r) => next.delete(r.id));
      } else {
        filteredRows.forEach((r) => next.add(r.id));
      }
      return next;
    });

  const goTo = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    onPageChange?.(p);
  };

  const pages = useMemo(() => getPages(page, totalPages), [page, totalPages]);

  const handleApprove = () => {
    const ids = Array.from(selected);
    onApproveSelected?.(ids);
    setSelected(new Set());
  };

  return (
    <div dir="rtl" className="mt-6 space-y-4">
      {/* ===== شريط الفلترة ===== */}
      <FilterBar
        dateRange={dateRange}
        onDateRangeChange={(val) => {
          setDateRange(val);
          setPage(1);
        }}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={(val) => {
          setPaymentMethod(val);
          setPage(1);
        }}
        selectedCount={selected.size}
        onApproveSelected={handleApprove}
      />

      {/* ===== الجدول ===== */}
      <section className="rounded-[22px] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="overflow-x-auto">
          <div className="min-w-[980px]">
            {/* الهيدر */}
            <div
              className={cx(
                GRID,
                "h-[50px] rounded-full bg-[#e8eff3] text-[13.5px] font-medium text-[#5c6873]"
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
              <span className="text-center">رقم الفاتورة</span>
              <span className="text-center">العميل</span>
              <span className="text-center">المبلغ</span>
              <span className="text-center leading-[17px]">
                الخدمة/
                <br />
                المشروع
              </span>
              <span className="text-center">الوسيلة</span>
              <span className="text-center">المرفق</span>
              <span className="text-center leading-[17px]">
                حالة
                <br />
                المطابقة
              </span>
              <span className="text-center">الإجراءات</span>
            </div>

            {/* الصفوف */}
            <div className="mt-2">
              {filteredRows.length === 0 ? (
                <div className="py-12 text-center text-[14px] font-medium text-[#7b8794]">
                  لا توجد قيود مطابقة للفلتر الحالي.
                </div>
              ) : (
                filteredRows.map((row) => {
                  const isSelected = selected.has(row.id);
                  const method = METHODS[row.method];
                  const MethodIcon = method?.Icon;
                  const isMismatch = row.status === "mismatch";

                  return (
                    <div
                      key={row.id}
                      className={cx(
                        GRID,
                        "min-h-[82px] rounded-2xl py-3.5 transition-colors",
                        isSelected ? "bg-[#f2f8fb]" : "hover:bg-[#f8fbfc]"
                      )}
                    >
                      {/* 1. التاريخ + checkbox */}
                      <div className="flex items-center justify-start gap-2.5 pr-1">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => toggleRow(row.id)}
                          label={`تحديد ${row.invoice}`}
                        />
                        <span
                          dir="ltr"
                          className="text-[14px] font-medium text-[#374151]"
                        >
                          {row.date}
                        </span>
                      </div>

                      {/* 2. رقم الفاتورة */}
                      <span
                        dir="ltr"
                        className="text-center text-[13.5px] font-bold text-[#1b7398]"
                      >
                        {row.invoice}
                      </span>

                      {/* 3. العميل */}
                      <div className="flex flex-col items-center text-center">
                        <p className="max-w-[125px] text-[14px] font-bold leading-[19px] text-[#374151]">
                          {row.client.name}
                        </p>
                        <p
                          dir="ltr"
                          className="mt-0.5 text-[11px] font-medium text-[#8c96a0]"
                        >
                          ID: {row.client.id}
                        </p>
                      </div>

                      {/* 4. المبلغ */}
                      <div
                        className={cx(
                          "flex flex-col items-center text-center text-[14px] font-bold leading-[18px]",
                          isMismatch ? "text-[#c92a2a]" : "text-[#374151]"
                        )}
                      >
                        <span dir="ltr">
                          {formatMoney(row.amount, row.hasDecimals)}
                        </span>
                        <span className="mt-0.5 text-[13px] font-semibold">
                          ر.س
                        </span>
                      </div>

                      {/* 5. الخدمة / المشروع */}
                      <p className="mx-auto max-w-[110px] text-center text-[13.5px] font-medium leading-[19px] text-[#374151]">
                        {row.service}
                      </p>

                      {/* 6. الوسيلة */}
                      <div className="flex items-center justify-center gap-2">
                        {MethodIcon && (
                          <MethodIcon
                            size={19}
                            className="shrink-0 text-[#4b5563]"
                          />
                        )}
                        <span className="max-w-[48px] text-right text-[13px] font-medium leading-[17px] text-[#374151]">
                          {method?.label}
                        </span>
                      </div>

                      {/* 7. المرفق */}
                      <div className="flex items-center justify-center">
                        {row.attachment && (
                          <button
                            type="button"
                            aria-label="عرض المرفق"
                            onClick={() => onOpenAttachment?.(row)}
                            className="text-[#1b7398] transition-opacity hover:opacity-75"
                          >
                            {row.attachment === "file" ? (
                              <FiFileText size={20} />
                            ) : (
                              <FiImage size={20} />
                            )}
                          </button>
                        )}
                      </div>

                      {/* 8. حالة المطابقة */}
                      <StatusCell row={row} />

                      {/* 9. الإجراءات */}
                      <div className="flex justify-center">
                        <Link
                          href={`/accounts/PaymentReview/${encodeURIComponent(
                            row.paymentId || `PMT-${row.id}`
                          )}`}
                          onClick={() => onReview?.(row)}
                          className={cx(
                            "flex items-center justify-center rounded-xl border border-[#1b7398] text-center text-[13px] font-medium text-[#1b7398] transition-colors hover:bg-[#1b7398]/5",
                            row.reviewed
                              ? "h-[44px] w-[76px] leading-[16px]"
                              : "h-[40px] w-[72px]"
                          )}
                        >
                          {row.reviewed ? (
                            <>
                              تمت
                              <br />
                              المراجعة
                            </>
                          ) : (
                            "مراجعة"
                          )}
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* الترقيم */}
        <nav
          aria-label="الترقيم"
          className="mt-7 flex items-center justify-end gap-2"
        >
          <button
            type="button"
            aria-label="السابق"
            disabled={page === 1}
            onClick={() => goTo(page - 1)}
            className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#d5dde2] text-[#9aa5b1] transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            <FiChevronRight size={16} />
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
                  "flex h-[34px] w-[34px] items-center justify-center rounded-full text-[13.5px] transition-colors",
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
            className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#d5dde2] text-[#9aa5b1] transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            <FiChevronLeft size={16} />
          </button>
        </nav>

        {/* شريط التحديد السفلي */}
        {selected.size > 0 && (
          <div className="mt-5 flex h-[48px] items-center justify-between rounded-full bg-[#e8eff3] px-6">
            <span className="text-[14px] font-bold text-[#1b7398]">
              تم تحديد {entriesLabel(selected.size)}
            </span>
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              className="text-[14px] font-medium text-[#7b8794] transition-colors hover:text-gray-900"
            >
              إلغاء التحديد
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default PaymentsTableWithFilter;