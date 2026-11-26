"use client";

import React, { useMemo, useState } from "react";
import {
  FiCheck,
  FiCopy,
  FiEye,
  FiFileText,
  FiPrinter,
  FiSearch,
  FiSliders,
} from "react-icons/fi";
import { FaRegStickyNote } from "react-icons/fa";

const defaultEntries = [
  {
    id: "jv-2024-0891",
    entryNo: "JV-2024-0891",
    date: "28/09/2024",
    time: "14:32",
    description: "ترحيل مبيعات المعارض ونقاط البيع اليومية",
    costCenter: "مركز تكلفة: المعارض POS",
    debitAccount: "110101 • البنك الأهلي التجاري",
    debitSub: "حساب النقدية والبنوك التحليلي",
    creditAccount: "410100 • إيرادات مبيعات التجزئة",
    creditSub: "حساب الإيرادات التشغيلية",
    amount: "485,200.00",
    currency: "ر.س",
    status: "posted",
    statusLabel: "مرحل ومعتمد",
    type: "auto",
    typeLabel: "آلي",
    user: "نظام POS الآلي",
    userSub: "ترحيل تلقائي",
    avatarBg: "bg-[#f0f9ff] text-[#0d658a]",
    avatarLabel: "POS",
  },
  {
    id: "jv-2024-0890",
    entryNo: "JV-2024-0890",
    date: "28/09/2024",
    time: "11:15",
    description: "إثبات سداد مستحقات موردي المواد الخام ومستلزمات الإنتاج",
    costCenter: "مركز تكلفة: المشتريات والإمداد",
    debitAccount: "210301 • شركة الصناعات المتطورة",
    debitSub: "حسابات الموردين التجاريين",
    creditAccount: "110102 • بنك الراجحي - الحساب الجاري",
    creditSub: "نقدية البنوك",
    amount: "1,240,000.00",
    currency: "ر.س",
    status: "posted",
    statusLabel: "مرحل ومعتمد",
    type: "manual",
    typeLabel: "يدوي",
    user: "فيصل الحربي",
    userSub: "محاسب أول",
    avatarBg: "bg-[#f1f5f9] text-[#334155]",
    avatarLabel: "ف ح",
  },
  {
    id: "jv-2024-0889",
    entryNo: "JV-2024-0889",
    date: "27/09/2024",
    time: "17:45",
    description: "تسوية صرف رواتب وأجور الموظفين والبدلات - شهر سبتمبر",
    costCenter: "مركز تكلفة: الموارد البشرية",
    debitAccount: "510101 • مصروفات الرواتب والأجور",
    debitSub: "المصاريف التشغيلية والإدارية",
    creditAccount: "220101 • مخصص مستحقات الرواتب",
    creditSub: "الالتزامات المتداولة",
    amount: "3,850,300.00",
    currency: "ر.س",
    status: "review",
    statusLabel: "قيد المراجعة",
    type: "manual",
    typeLabel: "يدوي",
    user: "سارة القحطاني",
    userSub: "مدير الحسابات",
    avatarBg: "bg-[#eff6ff] text-[#1d4ed8]",
    avatarLabel: "س ق",
  },
  {
    id: "jv-2024-0888",
    entryNo: "JV-2024-0888",
    date: "26/09/2024",
    time: "09:00",
    description: "إهلاك الأصول الثابتة والآلات ومعدات النقل لشهر سبتمبر",
    costCenter: "مركز تكلفة: الأصول والإهلاك",
    debitAccount: "520401 • مصروف إهلاك آلات ومعدات",
    debitSub: "مصروفات الإهلاك والاستهلاك",
    creditAccount: "120202 • مجمع إهلاك الآلات والمعدات",
    creditSub: "الأصول الثابتة المجمعة",
    amount: "142,850.00",
    currency: "ر.س",
    status: "posted",
    statusLabel: "مرحل ومعتمد",
    type: "auto",
    typeLabel: "آلي",
    user: "نظام الأصول الثابتة",
    userSub: "إقفال شهري",
    avatarBg: "bg-[#f0fdf4] text-[#15803d]",
    avatarLabel: "FA",
  },
  {
    id: "jv-2024-0887",
    entryNo: "JV-2024-0887",
    date: "25/09/2024",
    time: "16:10",
    description: "تسوية عهدة موظفي المشتريات الخارجية وفواتير السفر والانتقال",
    costCenter: "مركز تكلفة: المبيعات والتسويق",
    debitAccount: "510302 • مصاريف السفر والانتقال",
    debitSub: "مصروفات إدارية وعمومية",
    creditAccount: "110304 • عهد الموظفين المؤقتة",
    creditSub: "أرصدة مدينة أخرى",
    amount: "34,500.00",
    currency: "ر.س",
    status: "reversed",
    statusLabel: "مسودة",
    type: "manual",
    typeLabel: "يدوي",
    user: "محمد خليل",
    userSub: "محاسب مالي",
    avatarBg: "bg-[#fffbeb] text-[#b45309]",
    avatarLabel: "م خ",
  },
];

const Table = ({
  entries = defaultEntries,
  onSelectEntry,
  onPrintEntry,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState(["jv-2024-0889", "jv-2024-0888"]);
  const [copiedId, setCopiedId] = useState(null);

  const filteredEntries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(
      (row) =>
        row.entryNo.toLowerCase().includes(q) ||
        row.description.toLowerCase().includes(q) ||
        row.debitAccount.toLowerCase().includes(q) ||
        row.creditAccount.toLowerCase().includes(q) ||
        row.user.toLowerCase().includes(q)
    );
  }, [entries, searchQuery]);

  const allSelected =
    filteredEntries.length > 0 &&
    filteredEntries.every((row) => selectedIds.includes(row.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredEntries.map((row) => row.id));
    }
  };

  const toggleRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyEntryNo = (id, entryNo) => {
    navigator.clipboard?.writeText(entryNo);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const renderStatusBadge = (row) => {
    if (row.status === "posted") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-2 py-0.5 text-[10px] font-bold text-[#15803d]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
          <span>{row.statusLabel}</span>
        </span>
      );
    }
    if (row.status === "review") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-[#fde68a] bg-[#fffbeb] px-2 py-0.5 text-[10px] font-bold text-[#b45309]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d97706]" />
          <span>{row.statusLabel}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-2 py-0.5 text-[10px] font-bold text-[#64748b]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#94a3b8]" />
        <span>{row.statusLabel}</span>
      </span>
    );
  };

  return (
    <section
      dir="rtl"
      className="overflow-hidden rounded-xl border border-[#e6ecf2] bg-white shadow-2xs text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eef2f6] px-4 py-3">
        <div className="relative w-full sm:w-[270px]">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث سريع برقم القيد، البيان، أو الحساب..."
            className="h-[32px] w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] pr-3 pl-8 text-[11px] font-medium text-[#1e293b] placeholder-[#94a3b8] focus:border-[#0d658a] focus:bg-white focus:outline-none"
          />
          <FiSearch className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#94a3b8]" />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[10.5px] font-bold text-[#64748b]">
          <span>عرض: 1 - {filteredEntries.length} من 4,820 قيد</span>
          <button
            type="button"
            aria-label="إعدادات الأعمدة"
            className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#475569] transition hover:bg-[#f8fafc]"
          >
            <FiSliders className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse text-right text-[11px]">
          <thead>
            <tr className="border-b border-[#e6ecf2] bg-[#f8fafc] text-[10px] font-extrabold text-[#64748b]">
              <th className="w-9 px-3 py-2.5 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="تحديد الكل"
                  className="h-3.5 w-3.5 rounded border-[#cbd5e1] accent-[#0d658a]"
                />
              </th>
              <th className="px-3 py-2.5">رقم القيد والتاريخ</th>
              <th className="min-w-[200px] px-3 py-2.5">البيان / الوصف المحاسبي</th>
              <th className="px-3 py-2.5">الحساب المدين (Debit)</th>
              <th className="px-3 py-2.5">الحساب الدائن (Credit)</th>
              <th className="px-3 py-2.5 text-left">المبلغ الإجمالي</th>
              <th className="px-3 py-2.5 text-center">الحالة</th>
              <th className="px-3 py-2.5 text-center">النوع</th>
              <th className="px-3 py-2.5">مدخل القيد</th>
              <th className="px-3 py-2.5 text-center">إجراءات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#f1f5f9]">
            {filteredEntries.map((row) => {
              const isChecked = selectedIds.includes(row.id);

              return (
                <tr
                  key={row.id}
                  className={`transition-colors align-middle ${
                    isChecked ? "bg-[#f0f9ff]/45" : "hover:bg-[#fafcfd]"
                  }`}
                >
                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleRow(row.id)}
                      aria-label={`تحديد القيد ${row.entryNo}`}
                      className="h-3.5 w-3.5 rounded border-[#cbd5e1] accent-[#0d658a]"
                    />
                  </td>

                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="font-mono text-[11px] font-black text-[#0d658a]">
                      {row.entryNo}
                    </div>
                    <div className="mt-0.5 text-[10px] font-bold text-[#1e293b]">
                      {row.date}
                    </div>
                    <div className="text-[9.5px] font-semibold text-[#94a3b8]">
                      {row.time}
                    </div>
                  </td>

                  <td className="px-3 py-3">
                    <p className="text-[11px] font-extrabold text-[#0f172a] leading-snug">
                      {row.description}
                    </p>
                    <p className="mt-0.5 text-[9.5px] font-semibold text-[#94a3b8]">
                      {row.costCenter}
                    </p>
                  </td>

                  <td className="px-3 py-3">
                    <div className="text-[10.5px] font-extrabold text-[#1e293b] leading-snug">
                      {row.debitAccount}
                    </div>
                    <div className="mt-0.5 text-[9.5px] font-medium text-[#64748b]">
                      {row.debitSub}
                    </div>
                  </td>

                  <td className="px-3 py-3">
                    <div className="text-[10.5px] font-extrabold text-[#1e293b] leading-snug">
                      {row.creditAccount}
                    </div>
                    <div className="mt-0.5 text-[9.5px] font-medium text-[#64748b]">
                      {row.creditSub}
                    </div>
                  </td>

                  <td className="px-3 py-3 text-left whitespace-nowrap">
                    <div className="text-[11.5px] font-black text-[#0f172a]">
                      {row.amount}
                    </div>
                    <div className="text-[9.5px] font-bold text-[#64748b]">
                      {row.currency}
                    </div>
                  </td>

                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    {renderStatusBadge(row)}
                  </td>

                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        row.type === "auto"
                          ? "bg-[#f0f9ff] text-[#0d658a]"
                          : "bg-[#f1f5f9] text-[#475569]"
                      }`}
                    >
                      {row.typeLabel}
                    </span>
                  </td>

                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9.5px] font-black ${row.avatarBg}`}
                      >
                        {row.avatarLabel}
                      </span>
                      <div>
                        <div className="text-[10.5px] font-extrabold text-[#1e293b] leading-tight">
                          {row.user}
                        </div>
                        <div className="text-[9.5px] font-medium text-[#94a3b8]">
                          {row.userSub}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    <div className="inline-flex items-center gap-1 text-[#64748b]">
                      <button
                        type="button"
                        onClick={() => onSelectEntry?.(row)}
                        aria-label={`عرض تفاصيل ${row.entryNo}`}
                        className="rounded p-1 transition hover:bg-[#f0f9ff] hover:text-[#0d658a]"
                      >
                        <FiEye className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onPrintEntry?.(row)}
                        aria-label={`طباعة ${row.entryNo}`}
                        className="rounded p-1 transition hover:bg-[#f8fafc] hover:text-[#0f172a]"
                      >
                        <FiPrinter className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        aria-label={`مرفقات ${row.entryNo}`}
                        className="rounded p-1 transition hover:bg-[#f8fafc] hover:text-[#0f172a]"
                      >
                        <FaRegStickyNote className="h-3 w-3" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopyEntryNo(row.id, row.entryNo)}
                        aria-label={`نسخ رقم ${row.entryNo}`}
                        className="rounded p-1 transition hover:bg-[#f0f9ff] hover:text-[#0d658a]"
                      >
                        {copiedId === row.id ? (
                          <FiCheck className="h-3.5 w-3.5 text-[#16a34a]" />
                        ) : (
                          <FiCopy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom Selection Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e6ecf2] bg-[#fafcfd] px-4 py-2.5 text-[10.5px]">
        <div className="font-bold text-[#64748b]">
          تم تحديد{" "}
          <strong className="font-black text-[#0f172a]">
            {selectedIds.length}
          </strong>{" "}
          قيود
        </div>

        <button
          type="button"
          onClick={() => setSelectedIds([])}
          className="font-bold text-[#0d658a] transition hover:underline"
        >
          إلغاء التحديد
        </button>
      </div>
    </section>
  );
};

export default Table;