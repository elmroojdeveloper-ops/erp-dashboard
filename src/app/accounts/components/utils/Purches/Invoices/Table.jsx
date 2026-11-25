"use client";

import { useMemo, useState } from "react";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiEye,
  FiPackage,
  FiRefreshCw,
  FiSearch,
  FiSettings,
  FiSlash,
  FiTruck,
} from "react-icons/fi";
import { FaRegFilePdf } from "react-icons/fa6";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import {
  HiCheckCircle,
  HiDocumentText,
  HiExclamationCircle,
  HiPrinter,
} from "react-icons/hi2";
import { MdHourglassEmpty } from "react-icons/md";

/* ------------------------------- data ------------------------------- */

const defaultRows = [
  {
    id: "inv-9041",
    invoice: "INV-2024-9041",
    po: "PO-2024-231",
    vendor: "شركة الخزائن المتقدمة للتجارة والتقنية",
    cr: "1010892341",
    date: "19 نوفمبر 2024",
    receipt: "استلام: 19 نوفمبر",
    match: { type: "full", label: "مطابقة تامة (100%)" },
    amount: "87,975.00",
    note: "الأساس: 76,500.00 ر.س",
    noteTone: "muted",
    approval: { type: "done", label: "معتمد ومرحل آلياً" },
    actions: ["view", "doc", "print"],
  },
  {
    id: "inv-9038",
    invoice: "INV-2024-9038",
    po: "PO-2024-228",
    vendor: "مؤسسة الرواد للحوسبة المتقدمة",
    cr: "1010349811",
    date: "18 نوفمبر 2024",
    receipt: "استلام: 18 نوفمبر",
    match: { type: "price", label: "فروقات سعرية (±300.00 ر.س)" },
    amount: "45,650.00",
    note: "تفاوت سعر بند #2",
    noteTone: "danger",
    approval: { type: "review", label: "بانتظار المراجعة اليدوية" },
    actions: [{ button: "حل التفاوت", tone: "primary" }, "view", "pdf"],
  },
  {
    id: "inv-9035",
    invoice: "INV-2024-9035",
    po: "PO-2024-219",
    vendor: "شركة الاتصالات والشبكات الحديثة",
    cr: "1010776420",
    date: "16 نوفمبر 2024",
    receipt: "استلام: 16 نوفمبر",
    match: { type: "grn", label: "بانتظار إذن الاستلام (GRN)" },
    amount: "112,400.00",
    note: "الأساس: 97,739.13 ر.س",
    noteTone: "muted",
    approval: { type: "grnPending", label: "معلق للاستلام المخزني" },
    actions: ["view", "doc", "settings"],
  },
  {
    id: "inv-9029",
    invoice: "INV-2024-9029",
    po: "PO-2024-215",
    vendor: "مجموعة الدعم الفني والميكانيكي",
    cr: "1010119850",
    date: "14 نوفمبر 2024",
    receipt: "استلام: 14 نوفمبر",
    match: { type: "full", label: "مطابقة تامة (100%)" },
    amount: "29,800.00",
    note: "الأساس: 25,913.04 ر.س",
    noteTone: "muted",
    approval: { type: "done", label: "معتمد ومرحل آلياً" },
    actions: ["view", "doc", "print"],
  },
  {
    id: "inv-9022",
    invoice: "INV-2024-9022",
    po: "PO-2024-208",
    vendor: "شركة النظم العالمية للحلول التقنية",
    cr: "1010992301",
    date: "12 نوفمبر 2024",
    receipt: "استلام: 12 نوفمبر",
    match: { type: "qty", label: "فروق كمية (قطع 5-)" },
    amount: "64,200.00",
    note: "إذن الاستلام: 45 / الفاتورة: 50",
    noteTone: "muted",
    approval: { type: "hold", label: "إيقاف دفع مؤقت (On Hold)" },
    actions: [{ button: "إشعار دائن", tone: "gray" }, "view", "pdf"],
  },
];

const matchOptions = [
  { value: "all", label: "كافة الحالات" },
  { value: "full", label: "مطابقة تامة" },
  { value: "price", label: "فروقات سعرية" },
  { value: "qty", label: "فروق كمية" },
  { value: "grn", label: "بانتظار إذن الاستلام" },
];

/* ------------------------------- styles ------------------------------- */

const columns = [
  { key: "invoice", label: "رقم الفاتورة والمرجع التعاقدي", width: "12%", align: "text-start" },
  { key: "vendor", label: "المورد", width: "18%", align: "text-start" },
  { key: "date", label: "تاريخ الفواتيرة", width: "10.5%", align: "text-center" },
  { key: "match", label: "مؤشر المطابقة الثلاثية (Three-Way)", width: "13.5%", align: "text-center" },
  { key: "amount", label: "المبلغ الإجمالي (شامل الضريبة)", width: "16%", align: "text-center" },
  { key: "approval", label: "حالة الاعتماد", width: "12.5%", align: "text-center" },
  { key: "actions", label: "إجراءات", width: "17.5%", align: "text-center" },
];

const MATCH = {
  full: {
    cls: "rounded-full border-[#8FE0B3] bg-[#E8FAF0] text-[#0F7A43]",
    icon: <HiCheckCircle className="size-4 shrink-0 text-[#10B981]" />,
  },
  price: {
    cls: "rounded-2xl border-[#F5B5B5] bg-[#FDECEC] text-[#DC2626]",
    icon: <HiExclamationCircle className="size-4 shrink-0 text-[#DC2626]" />,
  },
  grn: {
    cls: "rounded-lg border-[#CBD5E1] bg-[#EEF2F7] text-[#475569]",
    icon: <FiTruck className="size-3.5 shrink-0 text-[#475569]" />,
  },
  qty: {
    cls: "rounded-lg border-[#F5B5C0] bg-[#FDECEF] text-[#E11D48]",
    icon: <FiPackage className="size-3.5 shrink-0 text-[#E11D48]" />,
  },
};

const APPROVAL = {
  done: {
    cls: "rounded-full border-[#E2E8F0] bg-[#F1F5F9] text-[#334155]",
    icon: <span className="size-2 shrink-0 rounded-full bg-[#10B981]" />,
  },
  review: {
    cls: "rounded-[20px] border-[#F3D98B] bg-[#FEF8E1] text-[#B45309]",
    icon: <MdHourglassEmpty className="size-3.5 shrink-0 text-[#D97706]" />,
  },
  grnPending: {
    cls: "rounded-full border-[#E2E8F0] bg-[#F1F5F9] text-[#475569]",
    icon: null,
  },
  hold: {
    cls: "rounded-[20px] border-[#F5B5B5] bg-[#FDECEC] text-[#DC2626]",
    icon: <FiSlash className="size-3.5 shrink-0 text-[#DC2626]" />,
  },
};

const ACTION_ICON = {
  view: { Icon: FiEye, label: "عرض" },
  doc: { Icon: HiDocumentText, label: "المستند" },
  pdf: { Icon: FaRegFilePdf, label: "PDF" },
  print: { Icon: HiPrinter, label: "طباعة" },
  settings: { Icon: FiSettings, label: "إعدادات" },
};

const BUTTON_TONE = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  gray: "bg-[#F1F5F9] text-[#334155] hover:bg-[#E8EDF3]",
};

const pageBtn =
  "flex h-8 min-w-8 items-center justify-center gap-1.5 rounded-md border border-[#E2E8F0] bg-white px-2 text-xs font-medium text-[#475569] transition hover:bg-surface disabled:text-[#CBD5E1] disabled:hover:bg-white";

/* ------------------------------- parts ------------------------------- */

const Pill = ({ cfg, label }) => (
  <span
    className={`inline-flex min-h-[42px] w-[100px] items-center justify-center gap-1.5 border px-2 py-1.5 text-center text-[11px] font-medium leading-4 ${cfg.cls}`}
  >
    {cfg.icon}
    <span>{label}</span>
  </span>
);

const FieldLabel = ({ children }) => (
  <span className="mb-[7px] block text-[11px] leading-4 text-[#64748B]">
    {children}
  </span>
);

const SelectField = ({ label, value, options, onChange, className = "" }) => {
  const current = options.find((o) => o.value === value);
  return (
    <label className={`block ${className}`}>
      <FieldLabel>{label}</FieldLabel>
      <span className="relative flex h-[35px] items-center justify-between rounded-lg border border-[#E2E8F0] bg-white px-3 text-xs text-[#1E293B]">
        <span className="truncate">{current?.label}</span>
        <FiChevronDown className="size-3.5 shrink-0 text-[#64748B]" />
        <select
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
      </span>
    </label>
  );
};

const Chip = ({ label, onRemove }) => (
  <span className="inline-flex h-[26px] items-center gap-2 rounded-md border border-[#A9CBE0] bg-[#F1F8FC] px-2.5 text-[11px] font-medium text-primary">
    {label}
    <button
      type="button"
      onClick={onRemove}
      aria-label={`إزالة ${label}`}
      className="text-[13px] leading-none"
    >
      ×
    </button>
  </span>
);

const getPageItems = (page, total) => {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, "ellipsis", total];
  if (page >= total - 2) return [1, "ellipsis", total - 2, total - 1, total];
  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", total];
};

/* ------------------------------- main ------------------------------- */

const Table = ({
  rows = defaultRows,
  total = 58,
  pageSize = 5,
  onPageChange,
  onRefresh,
  onAction,
}) => {
  const [search, setSearch] = useState("");
  const [match, setMatch] = useState("all");
  const [vendor, setVendor] = useState("all");
  const [po, setPo] = useState("PO-2024-...");
  const [chips, setChips] = useState([
    { key: "period", label: "الفترة: نوفمبر 2024" },
    { key: "branch", label: "الفرع: الرياض المركزي" },
  ]);
  const [page, setPage] = useState(1);

  const vendorOptions = useMemo(
    () => [
      { value: "all", label: "كافة الموردين المسجلين" },
      ...[...new Set(rows.map((r) => r.vendor))].map((v) => ({
        value: v,
        label: v,
      })),
    ],
    [rows]
  );

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageItems = useMemo(
    () => getPageItems(page, totalPages),
    [page, totalPages]
  );
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const goTo = (p) => {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
    onPageChange?.(next);
  };

  return (
    <div dir="rtl" className="flex flex-col gap-[26px]">
      {/* ============================ الفلاتر ============================ */}
      <section className="rounded-xl border border-[#E2E8F0] bg-white p-4 pb-3.5 shadow-card">
        <div className="flex flex-wrap items-end gap-3">
          <label className="block min-w-[200px] flex-[242]">
            <FieldLabel>بحث في السجلات</FieldLabel>
            <span className="relative flex h-[35px] items-center rounded-lg border border-[#E2E8F0] bg-white">
              <FiSearch className="pointer-events-none absolute end-3 size-3.5 text-[#64748B]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث برقم فاتورة المورد، أمر أو ا..."
                className="size-full rounded-lg bg-transparent pe-9 ps-3 text-xs text-[#1E293B] outline-none placeholder:text-[#94A3B8]"
              />
            </span>
          </label>

          <SelectField
            label="حالة المطابقة"
            value={match}
            options={matchOptions}
            onChange={setMatch}
            className="min-w-[160px] flex-[193]"
          />
          <SelectField
            label="المورد"
            value={vendor}
            options={vendorOptions}
            onChange={setVendor}
            className="min-w-[180px] flex-[223]"
          />

          <label className="block min-w-[150px] flex-[176]">
            <FieldLabel>أمر الشراء المرتبط</FieldLabel>
            <input
              type="text"
              value={po}
              onChange={(e) => setPo(e.target.value)}
              dir="ltr"
              className="h-[35px] w-full rounded-lg border border-[#E2E8F0] bg-white px-3 text-start text-xs text-[#1E293B] outline-none"
            />
          </label>

          <button
            type="button"
            onClick={onRefresh}
            aria-label="تحديث"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#475569] transition hover:bg-surface"
          >
            <FiRefreshCw className="size-4" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#EEF2F6] pt-2.5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] text-[#64748B]">المرشحات النشطة:</span>
            {chips.map((chip) => (
              <Chip
                key={chip.key}
                label={chip.label}
                onRemove={() =>
                  setChips((prev) => prev.filter((c) => c.key !== chip.key))
                }
              />
            ))}
          </div>

          <span className="text-[11px] text-[#64748B]">
            عرض <b className="text-[#1E293B]">{rows.length}</b> من أصل{" "}
            <b className="text-[#1E293B]">{total}</b> فاتورة
          </span>
        </div>
      </section>

      {/* ============================ الجدول ============================ */}
      <section className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-card">
        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full min-w-[950px] table-fixed border-collapse">
            <colgroup>
              {columns.map((c) => (
                <col key={c.key} style={{ width: c.width }} />
              ))}
            </colgroup>

            <thead>
              <tr className="h-[81px] border-b border-[#E8ECF1] bg-white">
                {columns.map((c) => (
                  <th
                    key={c.key}
                    className={`px-4 text-xs font-bold leading-4 text-[#475569] ${c.align}`}
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="h-[109px] border-b border-[#E8ECF1] align-middle"
                >
                  {/* رقم الفاتورة */}
                  <td className="px-4">
                    <div className="flex items-start gap-1.5">
                      <div className="min-w-0">
                        <p className="break-words text-sm font-bold leading-5 text-primary">
                          {row.invoice}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-4 text-[#64748B]">
                          {row.po}
                        </p>
                      </div>
                      <FiExternalLink className="mt-1 size-3 shrink-0 text-primary" />
                    </div>
                  </td>

                  {/* المورد */}
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#E8F1F6] text-primary">
                        <HiOutlineOfficeBuilding className="size-3.5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold leading-4 text-[#1E293B]">
                          {row.vendor}
                        </p>
                        <p className="mt-1 text-[10px] leading-4 text-[#64748B]">
                          س.ت: {row.cr}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* التاريخ */}
                  <td className="px-3 text-center">
                    <p className="text-xs font-medium leading-4 text-[#1E293B]">
                      {row.date}
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-[#94A3B8]">
                      {row.receipt}
                    </p>
                  </td>

                  {/* مؤشر المطابقة */}
                  <td className="px-3 text-center">
                    <Pill cfg={MATCH[row.match.type]} label={row.match.label} />
                  </td>

                  {/* المبلغ */}
                  <td className="px-4">
                    <div className="flex justify-end">
                      <div className="w-[92px] text-left">
                        <p className="text-sm font-bold leading-5 text-[#1E293B]">
                          {row.amount}{" "}
                          <span className="text-[11px] font-medium text-[#64748B]">
                            ر.س
                          </span>
                        </p>
                        <p
                          className={`mt-1 text-[10px] leading-4 ${
                            row.noteTone === "danger"
                              ? "font-medium text-[#DC2626]"
                              : "text-[#64748B]"
                          }`}
                        >
                          {row.note}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* حالة الاعتماد */}
                  <td className="px-3 text-center">
                    <Pill
                      cfg={APPROVAL[row.approval.type]}
                      label={row.approval.label}
                    />
                  </td>

                  {/* الإجراءات */}
                  <td className="px-3">
                    <div className="flex items-center justify-center gap-1">
                      {row.actions.map((action, i) => {
                        if (typeof action === "object") {
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => onAction?.(action.button, row)}
                              className={`mx-1 flex h-[42px] w-[66px] items-center justify-center rounded-md px-2 text-center text-xs font-bold leading-4 transition ${
                                BUTTON_TONE[action.tone]
                              }`}
                            >
                              {action.button}
                            </button>
                          );
                        }
                        const { Icon, label } = ACTION_ICON[action];
                        return (
                          <button
                            key={i}
                            type="button"
                            aria-label={label}
                            onClick={() => onAction?.(action, row)}
                            className="flex size-7 items-center justify-center rounded-md text-[#64748B] transition hover:bg-surface hover:text-primary"
                          >
                            <Icon className="size-4" />
                          </button>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* الترقيم */}
        <div className="flex flex-col gap-3 px-4 py-[14px] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-[#64748B]">
            عرض <b className="text-[#1E293B]">{from}</b> إلى{" "}
            <b className="text-[#1E293B]">{to}</b> من إجمالي{" "}
            <b className="text-[#1E293B]">{total}</b> فاتورة مشتريات
          </p>

          <nav aria-label="الترقيم" className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => goTo(page - 1)}
              className={`${pageBtn} px-3`}
            >
              <FiChevronRight className="size-3.5" />
              السابق
            </button>

            {pageItems.map((item, i) =>
              item === "ellipsis" ? (
                <span key={`e-${i}`} className="px-1.5 text-xs text-[#94A3B8]">
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => goTo(item)}
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
              disabled={page === totalPages}
              onClick={() => goTo(page + 1)}
              className={`${pageBtn} px-3`}
            >
              التالي
              <FiChevronLeft className="size-3.5" />
            </button>
          </nav>
        </div>
      </section>
    </div>
  );
};

export default Table;