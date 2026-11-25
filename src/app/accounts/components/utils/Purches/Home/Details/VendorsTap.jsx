"use client";

import { useMemo, useState } from "react";
import {
  FiAlertTriangle,
  FiCalendar,
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiExternalLink,
  FiEye,
  FiFileText,
  FiLink2,
  FiMoreVertical,
  FiRefreshCw,
  FiSearch,
  FiStar,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { vendorQuoteRows, vendorQuotesTotal } from "../mock-data";

/* ----------------------------- constants ----------------------------- */

const defaultFilters = {
  search: "",
  status: "compare",
  vendor: "all",
  source: "all",
  range: "30",
};

const sourceOptions = [
  { value: "all", label: "جميع الأنواع" },
  { value: "rfq", label: "عروض RFQ" },
  { value: "exception", label: "استثنائي (RFQ خارج)" },
  { value: "market", label: "استكشاف السوق" },
];

const rangeOptions = [
  { value: "7", label: "آخر 7 أيام" },
  { value: "30", label: "آخر 30 يوم" },
  { value: "90", label: "آخر 90 يوم" },
  { value: "all", label: "كل الفترات" },
];

const columns = [
  { key: "number", label: "رقم العرض", width: "9%", align: "text-start" },
  { key: "vendor", label: "المورد", width: "15%", align: "text-start" },
  { key: "source", label: "المصدر وطلب RFQ", width: "13%", align: "text-start" },
  { key: "date", label: "تاريخ التقديم", width: "9%", align: "text-center" },
  { key: "costCenter", label: "مركز التكلفة", width: "10%", align: "text-center" },
  { key: "status", label: "الحالة", width: "14%", align: "text-center" },
  { key: "amount", label: "المبلغ الإجمالي", width: "14%", align: "text-left" },
  { key: "actions", label: "الإجراءات", width: "11%", align: "text-left" },
];

const STATUS = {
  compare: {
    label: "مختار للمقارنة",
    pill: "rounded-full border-[#A9CBE0] bg-[#E8F2F8] text-primary",
    indicator: (
      <span className="size-2 rounded-full bg-primary ring-[3px] ring-primary/20" />
    ),
  },
  received: {
    label: "تم الاستلام - بانتظار الاعتماد",
    pill: "rounded-lg border-[#E2E8F0] bg-[#F1F5F9] text-[#475569]",
    indicator: null,
  },
  winner: {
    label: "العرض المعتمد (فائز)",
    pill: "rounded-[28px] border-[#86DDB5] bg-[#E8F9F1] text-[#047857]",
    indicator: <FiStar className="size-3.5 fill-current" />,
  },
  rejected: {
    label: "تم الرفض",
    pill: "rounded-[28px] border-[#F5B5B5] bg-[#FDECEC] text-[#DC2626]",
    indicator: (
      <span className="size-2 rounded-full bg-[#DC2626] ring-[3px] ring-[#DC2626]/20" />
    ),
  },
};

const SOURCE = {
  rfq: { cls: "bg-primary", Icon: FiLink2, iconEnd: true },
  exception: { cls: "bg-[#D97706]", Icon: FiAlertTriangle, iconEnd: false },
  market: { cls: "bg-[#64748B]", Icon: FiClock, iconEnd: false },
};

const AMOUNT_TONE = {
  primary: { value: "text-primary", note: "text-[#64748B]" },
  default: { value: "text-[#1E293B]", note: "text-[#64748B]" },
  success: { value: "text-[#1E293B]", note: "text-[#059669]" },
  danger: { value: "text-[#DC2626]", note: "text-[#DC2626]" },
};

const pageBtn =
  "flex size-10 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-sm font-medium text-[#475569] transition hover:bg-surface disabled:opacity-40 disabled:hover:bg-white";

/* ----------------------------- small parts ----------------------------- */

const Checkbox = ({ checked, onChange, label }) => (
  <label className="inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label={label}
      className="peer sr-only"
    />
    <span className="flex size-5 items-center justify-center rounded-md border border-[#CBD5E1] bg-white text-transparent transition peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30">
      <FiCheck className="size-3.5" strokeWidth={3} />
    </span>
  </label>
);

const FilterSelect = ({
  prefix,
  value,
  options,
  onChange,
  active = false,
  Icon,
  ariaLabel,
}) => {
  const current = options.find((o) => o.value === value);

  return (
    <div
      className={`relative flex h-12 shrink-0 items-center gap-2 rounded-xl border px-3.5 text-sm font-medium transition ${
        active
          ? "border-[#8FBBD6] bg-[#E8F2F8] text-primary"
          : "border-[#E2E8F0] bg-white text-[#475569] hover:bg-surface"
      }`}
    >
      {Icon ? <Icon className="size-[18px] shrink-0" /> : null}
      <span className="whitespace-nowrap">
        {prefix ? `${prefix}: ` : ""}
        {current?.label}
      </span>
      <FiChevronDown className="size-4 shrink-0" />
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 size-full cursor-pointer opacity-0"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const Chip = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-2 rounded-lg border border-[#A9CBE0] bg-[#EEF6FB] px-3 py-1.5 text-[13px] font-medium text-primary">
    {label}
    <button
      type="button"
      onClick={onRemove}
      aria-label={`إزالة ${label}`}
      className="text-base leading-none transition hover:text-primary-dark"
    >
      ×
    </button>
  </span>
);

const StatusBadge = ({ status, label }) => {
  const cfg = STATUS[status];
  if (!cfg) return null;

  return (
    <span
      className={`inline-flex min-h-10 w-full max-w-[160px] items-center gap-2 border px-3 py-2 text-[13px] font-semibold leading-5 ${cfg.pill}`}
    >
      <span className="flex-1 text-center">{label ?? cfg.label}</span>
      {cfg.indicator ? (
        <span className="flex shrink-0 items-center">{cfg.indicator}</span>
      ) : null}
    </span>
  );
};

const SourceBadge = ({ type, label }) => {
  const cfg = SOURCE[type] ?? SOURCE.market;
  const icon = <cfg.Icon className="size-3.5 shrink-0" />;

  return (
    <span
      className={`inline-flex max-w-[140px] items-center gap-2 rounded-md px-3 py-2 text-[13px] font-semibold leading-5 text-white ${cfg.cls}`}
    >
      {!cfg.iconEnd ? icon : null}
      <span className="text-center">{label}</span>
      {cfg.iconEnd ? icon : null}
    </span>
  );
};

const getPageItems = (page, total) => {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, "ellipsis", total];
  if (page >= total - 2) return [1, "ellipsis", total - 2, total - 1, total];
  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", total];
};

/* ----------------------------- main component ----------------------------- */

const VendorsTap = ({
  rows = vendorQuoteRows,
  total = vendorQuotesTotal,
  pageSize = 5,
  compareCount = 3,
  onFiltersChange,
  onRefresh,
}) => {
  const [filters, setFilters] = useState(defaultFilters);
  const [page, setPage] = useState(1);
  // مطابق للديزاين (أول 3 صفوف محددة) - غيّرها لـ [] في الاستخدام الفعلي
  const [selectedIds, setSelectedIds] = useState(() =>
    rows.slice(0, 3).map((r) => r.id)
  );

  /* ---------- filters ---------- */

  const updateFilters = (patch) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    setPage(1);
    onFiltersChange?.(next);
  };

  const statusOptions = [
    { value: "all", label: "كل الحالات", chip: "كل الحالات" },
    { value: "compare", label: `قيد المقارنة (${compareCount})`, chip: "قيد المقارنة" },
    { value: "received", label: "تم الاستلام", chip: "تم الاستلام" },
    { value: "winner", label: "العرض المعتمد", chip: "العرض المعتمد" },
    { value: "rejected", label: "تم الرفض", chip: "تم الرفض" },
  ];

  const vendorOptions = useMemo(
    () => [
      { value: "all", label: "جميع الموردين" },
      ...[...new Set(rows.map((r) => r.vendor))].map((v) => ({
        value: v,
        label: v,
      })),
    ],
    [rows]
  );

  const chips = [
    filters.status !== "all" && {
      key: "status",
      label: statusOptions.find((o) => o.value === filters.status)?.chip,
    },
    filters.vendor !== "all" && { key: "vendor", label: filters.vendor },
    filters.source !== "all" && {
      key: "source",
      label: sourceOptions.find((o) => o.value === filters.source)?.label,
    },
    filters.range !== "all" && {
      key: "range",
      label: rangeOptions.find((o) => o.value === filters.range)?.label,
    },
  ].filter(Boolean);

  const clearAll = () =>
    updateFilters({ status: "all", vendor: "all", source: "all", range: "all" });

  /* ---------- table data ---------- */

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageRows = useMemo(
    () => rows.slice((page - 1) * pageSize, page * pageSize),
    [rows, page, pageSize]
  );
  const pageItems = useMemo(
    () => getPageItems(page, totalPages),
    [page, totalPages]
  );

  const allSelected =
    pageRows.length > 0 && pageRows.every((r) => selectedIds.includes(r.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !pageRows.some((r) => r.id === id))
      );
      return;
    }
    setSelectedIds((prev) => [
      ...new Set([...prev, ...pageRows.map((r) => r.id)]),
    ]);
  };

  const toggleRow = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const from = pageRows.length ? (page - 1) * pageSize + 1 : 0;
  const to = pageRows.length ? from + pageRows.length - 1 : 0;

  return (
    <div dir="rtl" className="flex flex-col gap-5">
      {/* ============================ الفلاتر ============================ */}
      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-card">
        <div className="flex flex-wrap items-center gap-3">
          {/* البحث */}
          <div className="relative min-w-[260px] flex-1">
            <FiSearch className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-[#64748B]" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              placeholder="بحث برقم العرض، اسم المورد، أو الصنف..."
              className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white pe-4 ps-12 text-sm text-[#1E293B] outline-none transition placeholder:text-[#94A3B8] focus:border-primary"
            />
          </div>

          <FilterSelect
            ariaLabel="الحالة"
            value={filters.status}
            options={statusOptions}
            onChange={(v) => updateFilters({ status: v })}
            active={filters.status !== "all"}
          />
          <FilterSelect
            ariaLabel="المورد"
            prefix="المورد"
            value={filters.vendor}
            options={vendorOptions}
            onChange={(v) => updateFilters({ vendor: v })}
          />
          <FilterSelect
            ariaLabel="المصدر"
            prefix="المصدر"
            value={filters.source}
            options={sourceOptions}
            onChange={(v) => updateFilters({ source: v })}
          />
          <FilterSelect
            ariaLabel="الفترة"
            Icon={FiCalendar}
            value={filters.range}
            options={rangeOptions}
            onChange={(v) => updateFilters({ range: v })}
          />

          <button
            type="button"
            onClick={onRefresh}
            aria-label="تحديث"
            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-[#64748B] transition hover:bg-surface hover:text-primary"
          >
            <FiRefreshCw className="size-5" />
          </button>
        </div>

        {chips.length > 0 ? (
          <>
            <div className="my-4 border-t border-[#EDF1F5]" />
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="text-[#64748B]">الفلاتر المطبقة:</span>
              {chips.map((chip) => (
                <Chip
                  key={chip.key}
                  label={chip.label}
                  onRemove={() => updateFilters({ [chip.key]: "all" })}
                />
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="ms-auto text-sm font-medium text-primary transition hover:text-primary-dark"
              >
                مسح الكل
              </button>
            </div>
          </>
        ) : null}
      </section>

      {/* ============================ الجدول ============================ */}
      <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-card">
        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full min-w-[1100px] table-fixed border-collapse text-start">
            <colgroup>
              <col style={{ width: "5%" }} />
              {columns.map((c) => (
                <col key={c.key} style={{ width: c.width }} />
              ))}
            </colgroup>

            <thead>
              <tr className="border-b border-[#E8ECF1] bg-[#F8FAFC]">
                <th className="px-4 py-4 text-start">
                  <Checkbox
                    checked={allSelected}
                    onChange={toggleAll}
                    label="تحديد الكل"
                  />
                </th>
                {columns.map((c) => (
                  <th
                    key={c.key}
                    className={`px-4 py-4 text-sm font-semibold leading-5 text-[#334155] ${c.align}`}
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {pageRows.map((row) => {
                const checked = selectedIds.includes(row.id);
                const isWinner = row.status === "winner";
                const tone = AMOUNT_TONE[row.amountTone] ?? AMOUNT_TONE.default;

                return (
                  <tr
                    key={row.id}
                    className={`border-b border-[#E8ECF1] align-middle transition ${
                      isWinner ? "bg-[#F1FAF6]" : "hover:bg-surface/50"
                    }`}
                  >
                    {/* checkbox */}
                    <td className="px-4 py-5">
                      <Checkbox
                        checked={checked}
                        onChange={() => toggleRow(row.id)}
                        label={`تحديد ${row.number}`}
                      />
                    </td>

                    {/* رقم العرض */}
                    <td className="px-4 py-5">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <span className="break-words text-sm font-bold leading-5 text-primary">
                            {row.number}
                          </span>
                          <FiExternalLink className="size-3 shrink-0 text-primary" />
                        </div>
                        <p
                          className={`text-[13px] leading-5 ${
                            row.validity.tone === "danger"
                              ? "font-medium text-[#DC2626]"
                              : "text-[#64748B]"
                          }`}
                        >
                          {row.validity.text}
                        </p>
                      </div>
                    </td>

                    {/* المورد */}
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                            isWinner
                              ? "bg-[#DDF3E8] text-[#059669]"
                              : "bg-[#E8F1F6] text-primary"
                          }`}
                        >
                          <HiOutlineOfficeBuilding className="size-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold leading-5 text-[#1E293B]">
                            {row.vendor}
                          </p>
                          <p className="mt-1 text-[13px] leading-5 text-[#64748B]">
                            {row.vendorMeta}
                          </p>
                        </div>
                        {row.vendorDot ? (
                          <span className="mt-5 size-1.5 shrink-0 self-start rounded-full bg-primary" />
                        ) : null}
                      </div>
                    </td>

                    {/* المصدر */}
                    <td className="px-4 py-5">
                      <div className="flex flex-col items-start gap-2">
                        <SourceBadge
                          type={row.source.type}
                          label={row.source.label}
                        />
                        <p className="text-[13px] leading-5 text-[#64748B]">
                          {row.source.note}
                        </p>
                      </div>
                    </td>

                    {/* التاريخ */}
                    <td className="px-4 py-5 text-center">
                      <p className="text-sm font-medium leading-5 text-[#1E293B]">
                        {row.date}
                      </p>
                      <p className="mt-1 text-[13px] leading-5 text-[#64748B]">
                        {row.time}
                      </p>
                    </td>

                    {/* مركز التكلفة */}
                    <td className="px-4 py-5 text-center">
                      <p className="text-sm font-medium leading-5 text-[#1E293B]">
                        {row.costCenter}
                      </p>
                      <p className="mt-1 text-[13px] leading-5 text-[#64748B]">
                        {row.costCenterCode}
                      </p>
                    </td>

                    {/* الحالة */}
                    <td className="px-4 py-5 text-center">
                      <StatusBadge status={row.status} label={row.statusLabel} />
                    </td>

                    {/* المبلغ */}
                    <td className="px-4 py-5 text-left">
                      <p className={`text-base font-bold leading-6 ${tone.value}`}>
                        {row.amount}
                      </p>
                      <p className={`mt-1 text-[13px] leading-5 ${tone.note}`}>
                        {row.amountNote}
                      </p>
                    </td>

                    {/* الإجراءات */}
                    <td className="px-4 py-5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          aria-label={`عرض ${row.number}`}
                          className="flex size-8 items-center justify-center rounded-lg text-[#475569] transition hover:bg-surface hover:text-primary"
                        >
                          <FiEye className="size-[18px]" />
                        </button>
                        <button
                          type="button"
                          aria-label="المستند"
                          className="flex size-8 items-center justify-center rounded-lg text-[#475569] transition hover:bg-surface hover:text-primary"
                        >
                          <FiFileText className="size-[18px]" />
                        </button>
                        <button
                          type="button"
                          aria-label="المزيد"
                          className="flex size-8 items-center justify-center rounded-lg text-[#475569] transition hover:bg-surface hover:text-primary"
                        >
                          <FiMoreVertical className="size-[18px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* الفوتر (الترقيم) */}
        <div className="flex flex-col-reverse items-center gap-3 px-5 py-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-[#64748B]">
            عرض <span className="font-bold text-[#1E293B]">{from}</span> -{" "}
            <span className="font-bold text-[#1E293B]">{to}</span> من إجمالي{" "}
            <span className="font-bold text-[#1E293B]">{total}</span> عرض سعر
          </p>

          <nav aria-label="الترقيم" className="flex items-center gap-2">
            <button
              type="button"
              aria-label="السابق"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={pageBtn}
            >
              <FiChevronRight className="size-4" />
            </button>

            {pageItems.map((item, i) =>
              item === "ellipsis" ? (
                <span key={`e-${i}`} className="px-1 text-sm text-[#94A3B8]">
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPage(item)}
                  aria-current={page === item ? "page" : undefined}
                  className={`${pageBtn} ${
                    page === item
                      ? "!border-primary !bg-primary font-bold !text-white"
                      : ""
                  }`}
                >
                  {item}
                </button>
              )
            )}

            <button
              type="button"
              aria-label="التالي"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className={pageBtn}
            >
              <FiChevronLeft className="size-4" />
            </button>
          </nav>
        </div>
      </section>
    </div>
  );
};

export default VendorsTap;