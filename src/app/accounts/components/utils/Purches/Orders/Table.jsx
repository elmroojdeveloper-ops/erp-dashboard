"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiCalendar,
  FiRotateCcw,
  FiX,
  FiAlertTriangle,
  FiLink,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiEye,
  FiPrinter,
  FiMoreVertical,
  FiArrowLeft,
  FiInfo,
} from "react-icons/fi";

const initialOrders = [
  {
    id: "1",
    poNumber: "PO-2024-049",
    sourceType: "manual",
    sourceLabel: "يدوي (استثنائي) • مورد حصري",
    vendorName: "شركة الخزائن المتقدمة للتجارة والتقنية",
    crNumber: "1010489201",
    vendorTag: "مورد فئة أ",
    status: "pending_approval",
    statusLabel: "بانتظار الاعتماد",
    complianceType: "audit",
    complianceLabel: "قيد التدقيق (عينة Q4)",
    issueDate: "18 نوفمبر 2024",
    deliveryNote: "متبقي 3 أيام للتسليم",
    deliveryTone: "teal",
    amount: "87,975.00",
    vatLabel: "شامل الضريبة 15%",
    selected: false,
  },
  {
    id: "2",
    poNumber: "PO-2024-042",
    sourceType: "comparison",
    sourceLabel: "من مقارنة CMP-2023-001",
    vendorName: "مؤسسة الرواد للحوسبة المتقدمة",
    crNumber: "1010372911",
    vendorTag: "حلول برمجية ومعدات",
    status: "in_progress",
    statusLabel: "قيد التنفيذ والشحن",
    complianceType: "three_way",
    complianceLabel: "المطابقة الثلاثية (Three-Way Match)",
    issueDate: "12 نوفمبر 2024",
    deliveryNote: "تسليم جزئي مؤكد",
    deliveryTone: "muted",
    amount: "425,000.00",
    vatLabel: "شامل الضريبة 15%",
    selected: false,
  },
  {
    id: "3",
    poNumber: "PO-2024-038",
    sourceType: "comparison",
    sourceLabel: "من مقارنة CMP-2023-042",
    vendorName: "شركة الاتصالات والشبكات الحديثة",
    crNumber: "1010198274",
    vendorTag: "توريدات البنية التحتية",
    status: "approved_sent",
    statusLabel: "معتمد ومرسل للمورد",
    complianceType: "compliance_review",
    complianceLabel: "قيد التدقيق (مراجعة امتثال)",
    issueDate: "08 نوفمبر 2024",
    deliveryNote: "متأخر يومين عن التسليم",
    deliveryTone: "amber",
    amount: "312,400.00",
    vatLabel: "شامل الضريبة 15%",
    selected: false,
  },
  {
    id: "4",
    poNumber: "PO-2024-031",
    sourceType: "manual_urgent",
    sourceLabel: "يدوي (استثنائي) • طلب صيانة عاجل",
    vendorName: "مجموعة الدعم الفني والميكانيكي",
    crNumber: "1010558190",
    vendorTag: "قطع غيار وتجهيزات",
    status: "pending_approval",
    statusLabel: "بانتظار الاعتماد",
    complianceType: "not_sampled",
    complianceLabel: "غير مشمول بالعينة",
    issueDate: "01 نوفمبر 2024",
    deliveryNote: "استحقاق فوري",
    deliveryTone: "muted",
    amount: "45,200.00",
    vatLabel: "شامل الضريبة 15%",
    selected: false,
  },
  {
    id: "5",
    poNumber: "PO-2024-025",
    sourceType: "comparison",
    sourceLabel: "من مقارنة CMP-2023-095",
    vendorName: "شركة الحلول المبتكرة للأمن السيبراني",
    crNumber: "1010619023",
    vendorTag: "استشارات ورخص سنوية",
    status: "completed",
    statusLabel: "مكتمل ومستلم نهائياً",
    complianceType: "three_way_done",
    complianceLabel: "المطابقة الثلاثية مكتملة",
    issueDate: "25 أكتوبر 2024",
    deliveryNote: "تم التسليم والاستلام",
    deliveryTone: "teal",
    amount: "189,600.00",
    vatLabel: "شامل الضريبة 15%",
    selected: false,
  },
];

const orderDetailPath = (row) =>
  `/accounts/Purches/orders/${encodeURIComponent(row.id)}`;

const Table = ({ onView, onOpenAudit }) => {
  const router = useRouter();
  const [orders, setOrders] = useState(initialOrders);

  const openOrder = (row) => {
    const path = orderDetailPath(row);
    if (onView) {
      onView(row.id);
      return;
    }
    router.push(path);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending_financial");
  const [vendorFilter, setVendorFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [dateRange] = useState("2024/11/20 - 4/10/01");
  const [activeChips, setActiveChips] = useState([
    { id: "q4", label: "الربع الرابع 2024" },
    { id: "paths", label: "جميع المسارات" },
    { id: "statuses", label: "بانتظار الاعتماد + قيد التنفيذ" },
  ]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredOrders = useMemo(() => {
    return orders.filter((item) => {
      const matchesSearch =
        !searchQuery.trim() ||
        item.poNumber.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        item.vendorName.includes(searchQuery.trim()) ||
        item.sourceLabel.includes(searchQuery.trim());

      const matchesVendor =
        vendorFilter === "all" || item.vendorName === vendorFilter;

      const matchesSource =
        sourceFilter === "all" ||
        (sourceFilter === "manual" && item.sourceType.startsWith("manual")) ||
        (sourceFilter === "comparison" && item.sourceType === "comparison");

      return matchesSearch && matchesVendor && matchesSource;
    });
  }, [orders, searchQuery, vendorFilter, sourceFilter]);

  const totalCount = 86;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const toggleAll = (checked) => {
    setOrders((prev) => prev.map((row) => ({ ...row, selected: checked })));
  };

  const toggleRow = (id) => {
    setOrders((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, selected: !row.selected } : row
      )
    );
  };

  const removeChip = (chipId) => {
    setActiveChips((prev) => prev.filter((c) => c.id !== chipId));
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setVendorFilter("all");
    setSourceFilter("all");
    setActiveChips([]);
  };

  const allSelected =
    filteredOrders.length > 0 && filteredOrders.every((row) => row.selected);

  return (
    <div
      dir="rtl"
      className="space-y-3.5 text-[#1e293b]"
      style={{ fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif" }}
    >
      {/* FILTER BAR CARD */}
      <section className="rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 items-end">
          {/* البحث المباشر */}
          <div className="md:col-span-3">
            <label className="mb-1 block text-[11px] font-bold text-[#64748b]">
              البحث المباشر
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث برقم الأمر، المورد، أو المرجع..."
                className="h-[36px] w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] pr-8 pl-3 text-[11.5px] font-medium text-[#1e293b] placeholder-[#94a3b8] focus:border-[#0d658a] focus:bg-white focus:outline-none"
              />
              <FiSearch className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#94a3b8]" />
            </div>
          </div>

          {/* حالة المعاملة */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-[11px] font-bold text-[#64748b]">
              حالة المعاملة
            </label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[36px] w-full appearance-none rounded-lg border border-[#e2e8f0] bg-white pr-3 pl-7 text-[11.5px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
              >
                <option value="pending_financial">بانتظار الاعتماد المالي</option>
                <option value="all">جميع الحالات</option>
                <option value="in_progress">قيد التنفيذ والشحن</option>
                <option value="completed">مكتمل ومستلم نهائياً</option>
              </select>
              <FiChevronDown className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
            </div>
          </div>

          {/* المورد المعتمد */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-[11px] font-bold text-[#64748b]">
              المورد المعتمد
            </label>
            <div className="relative">
              <select
                value={vendorFilter}
                onChange={(e) => setVendorFilter(e.target.value)}
                className="h-[36px] w-full appearance-none rounded-lg border border-[#e2e8f0] bg-white pr-3 pl-7 text-[11.5px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
              >
                <option value="all">كافة الموردين المسجلين (14)</option>
                {initialOrders.map((o) => (
                  <option key={o.id} value={o.vendorName}>
                    {o.vendorName}
                  </option>
                ))}
              </select>
              <FiChevronDown className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
            </div>
          </div>

          {/* مصدر الأمر والمسار */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-[11px] font-bold text-[#64748b]">
              مصدر الأمر والمسار
            </label>
            <div className="relative">
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="h-[36px] w-full appearance-none rounded-lg border border-[#e2e8f0] bg-white pr-3 pl-7 text-[11.5px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
              >
                <option value="all">كافة المسارات (مقارنة / يدوي)</option>
                <option value="comparison">من مقارنة أسعار</option>
                <option value="manual">يدوي (استثنائي)</option>
              </select>
              <FiChevronDown className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
            </div>
          </div>

          {/* النطاق الزمني للإصدار + تصفية */}
          <div className="md:col-span-3 flex items-end gap-2">
            <div className="flex-1 min-w-0">
              <label className="mb-1 block text-[11px] font-bold text-[#64748b]">
                النطاق الزمني للإصدار
              </label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={dateRange}
                  className="h-[36px] w-full rounded-lg border border-[#e2e8f0] bg-white pr-3 pl-7 text-[11px] font-bold text-[#334155] focus:outline-none"
                />
                <FiCalendar className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#94a3b8]" />
              </div>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-[36px] shrink-0 items-center gap-1 rounded-lg border border-[#e2e8f0] bg-white px-2.5 text-[11px] font-bold text-[#475569] transition hover:bg-[#f8fafc]"
            >
              <FiRotateCcw className="h-3 w-3 text-[#64748b]" />
              <span>تصفية</span>
            </button>
          </div>
        </div>

        {/* ACTIVE FILTER CHIPS ROW */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#f1f5f9] pt-2.5 text-[11px]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-[#94a3b8]">محددات التصفية النشطة:</span>
            {activeChips.map((chip) => (
              <span
                key={chip.id}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#bae6fd] bg-[#f0f9ff] px-2.5 py-0.5 font-bold text-[#0d658a]"
              >
                <span>{chip.label}</span>
                <button
                  type="button"
                  onClick={() => removeChip(chip.id)}
                  className="text-[#0d658a]/70 hover:text-[#0d658a]"
                  aria-label={`إزالة ${chip.label}`}
                >
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="font-bold text-[#94a3b8] hover:text-[#475569] transition"
          >
            إلغاء تفعيل كافة الفلاتر
          </button>
        </div>
      </section>

      {/* MAIN TABLE CARD */}
      <section className="overflow-hidden rounded-xl border border-[#e6ecf2] bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1040px] border-collapse text-right">
            <thead>
              <tr className="border-b border-[#e6ecf2] bg-[#f8fafc] text-[11px] font-extrabold text-[#64748b]">
                <th className="w-10 px-3 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => toggleAll(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-[#cbd5e1] text-[#0d658a] focus:ring-0"
                  />
                </th>
                <th className="px-3.5 py-3">رقم أمر الشراء والمصدر</th>
                <th className="px-3.5 py-3">المورد التجاري / السجل</th>
                <th className="px-3.5 py-3 text-center">حالة الأمر</th>
                <th className="px-3.5 py-3 text-center">مؤشر الامتثال والحوكمة</th>
                <th className="px-3.5 py-3 text-center">تاريخ الإصدار / التسليم المتوقع</th>
                <th className="px-3.5 py-3 text-left">القيمة الإجمالية الصافية</th>
                <th className="px-3.5 py-3 text-center">الإجراءات</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f1f5f9] text-[12px]">
              {filteredOrders.map((row) => {
                const isManual = row.sourceType.startsWith("manual");

                return (
                  <tr
                    key={row.id}
                    className="transition-colors hover:bg-[#fafcfd] align-middle"
                  >
                    {/* Checkbox */}
                    <td className="px-3 py-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={row.selected}
                        onChange={() => toggleRow(row.id)}
                        className="h-3.5 w-3.5 rounded border-[#cbd5e1] text-[#0d658a] focus:ring-0"
                      />
                    </td>

                    {/* رقم أمر الشراء والمصدر */}
                    <td className="px-3.5 py-3.5">
                      <Link
                        href={orderDetailPath(row)}
                        className="text-[13px] font-black leading-tight text-[#0d658a] hover:underline"
                      >
                        {row.poNumber}
                      </Link>
                      <div className="mt-1">
                        {isManual ? (
                          <span className="inline-flex items-center gap-1 rounded bg-[#fffbeb] px-1.5 py-0.5 text-[10px] font-bold text-[#b45309]">
                            <FiAlertTriangle className="h-2.5 w-2.5 text-[#d97706]" />
                            <span>{row.sourceLabel}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-[#0d658a]">
                            <FiLink className="h-3 w-3 text-[#0d658a]" />
                            <span>{row.sourceLabel}</span>
                          </span>
                        )}
                      </div>
                    </td>

                    {/* المورد التجاري / السجل */}
                    <td className="px-3.5 py-3.5">
                      <div className="text-[12.5px] font-extrabold text-[#1e293b] leading-snug">
                        {row.vendorName}
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[10px] font-semibold text-[#94a3b8]">
                        <span>س.ت: {row.crNumber}</span>
                        <span>•</span>
                        <span>{row.vendorTag}</span>
                      </div>
                    </td>

                    {/* حالة الأمر */}
                    <td className="px-3.5 py-3.5 text-center">
                      {row.status === "pending_approval" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bae6fd] bg-[#f0f9ff] px-2.5 py-1 text-[10.5px] font-bold text-[#0369a1]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0ea5e9]" />
                          <span>{row.statusLabel}</span>
                        </span>
                      )}

                      {row.status === "in_progress" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fde68a] bg-[#fffbeb] px-2.5 py-1 text-[10.5px] font-bold text-[#b45309]">
                          <FiClock className="h-3 w-3 text-[#d97706]" />
                          <span>{row.statusLabel}</span>
                        </span>
                      )}

                      {row.status === "approved_sent" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-2.5 py-1 text-[10.5px] font-bold text-[#15803d]">
                          <FiCheckCircle className="h-3 w-3 text-[#16a34a]" />
                          <span>{row.statusLabel}</span>
                        </span>
                      )}

                      {row.status === "completed" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-1 text-[10.5px] font-bold text-[#475569]">
                          <FiCheckCircle className="h-3 w-3 text-[#64748b]" />
                          <span>{row.statusLabel}</span>
                        </span>
                      )}
                    </td>

                    {/* مؤشر الامتثال والحوكمة */}
                    <td className="px-3.5 py-3.5 text-center">
                      {(row.complianceType === "audit" ||
                        row.complianceType === "compliance_review") && (
                        <span className="inline-flex items-center gap-1 rounded-md border border-[#fde68a] bg-[#fffbeb] px-2 py-1 text-[10.5px] font-bold text-[#b45309]">
                          <FiAlertTriangle className="h-3 w-3 text-[#d97706]" />
                          <span>{row.complianceLabel}</span>
                        </span>
                      )}

                      {(row.complianceType === "three_way" ||
                        row.complianceType === "three_way_done") && (
                        <span className="inline-flex items-center gap-1 rounded-md border border-[#e0e7ff] bg-[#eef2ff] px-2 py-1 text-[10.5px] font-bold text-[#3730a3]">
                          <FiCheckCircle className="h-3 w-3 text-[#4f46e5]" />
                          <span>{row.complianceLabel}</span>
                        </span>
                      )}

                      {row.complianceType === "not_sampled" && (
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-[#94a3b8]">
                          <span>— {row.complianceLabel}</span>
                        </span>
                      )}
                    </td>

                    {/* تاريخ الإصدار / التسليم المتوقع */}
                    <td className="px-3.5 py-3.5 text-center">
                      <div className="text-[11.5px] font-bold text-[#1e293b]">
                        {row.issueDate}
                      </div>
                      <div
                        className={`mt-1 inline-flex items-center gap-1 text-[10px] font-bold ${
                          row.deliveryTone === "teal"
                            ? "text-[#0d658a]"
                            : row.deliveryTone === "amber"
                              ? "text-[#d97706]"
                              : "text-[#94a3b8]"
                        }`}
                      >
                        {row.deliveryTone === "teal" && <FiClock className="h-3 w-3" />}
                        {row.deliveryTone === "amber" && (
                          <FiAlertTriangle className="h-3 w-3" />
                        )}
                        {row.deliveryTone === "muted" && <FiTruck className="h-3 w-3" />}
                        <span>{row.deliveryNote}</span>
                      </div>
                    </td>

                    {/* القيمة الإجمالية الصافية */}
                    <td className="px-3.5 py-3.5 text-left">
                      <div className="text-[13.5px] font-black text-[#0f172a] leading-tight">
                        {row.amount}{" "}
                        <span className="text-[10.5px] font-bold text-[#64748b]">ر.س</span>
                      </div>
                      <div className="mt-0.5 text-[10px] font-semibold text-[#94a3b8]">
                        {row.vatLabel}
                      </div>
                    </td>

                    {/* الإجراءات */}
                    <td className="px-3.5 py-3.5">
                      <div className="flex items-center justify-center gap-1 text-[#94a3b8]">
                        <Link
                          href={orderDetailPath(row)}
                          onClick={(e) => {
                            if (onView) {
                              e.preventDefault();
                              openOrder(row);
                            }
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-[#f1f5f9] hover:text-[#0d658a]"
                          aria-label={`عرض ${row.poNumber}`}
                        >
                          <FiEye className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => window.print?.()}
                          className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-[#f1f5f9] hover:text-[#1e293b]"
                          aria-label={`طباعة ${row.poNumber}`}
                        >
                          <FiPrinter className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-[#f1f5f9] hover:text-[#1e293b]"
                          aria-label={`خيارات ${row.poNumber}`}
                        >
                          <FiMoreVertical className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* PAGINATION BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e6ecf2] bg-white px-5 py-3 text-[11.5px]">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#64748b]">
              عرض <strong className="font-extrabold text-[#1e293b]">1</strong> إلى{" "}
              <strong className="font-extrabold text-[#1e293b]">5</strong> من أصل{" "}
              <strong className="font-extrabold text-[#1e293b]">{totalCount}</strong> أمر شراء
              مسجل
            </span>

            <span className="text-[#cbd5e1]">|</span>

            <div className="flex items-center gap-1.5 text-[#64748b]">
              <span>إظهار:</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="h-7 rounded-md border border-[#e2e8f0] bg-white px-2 text-[11px] font-bold text-[#1e293b] focus:outline-none"
              >
                <option value={10}>10 صف لكل صفحة</option>
                <option value={20}>20 صف لكل صفحة</option>
                <option value={50}>50 صف لكل صفحة</option>
              </select>
            </div>
          </div>

          <nav aria-label="الترقيم" className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`flex h-7 w-7 items-center justify-center rounded-md text-[11.5px] font-bold transition ${
                page === 1
                  ? "bg-[#0d658a] text-white"
                  : "border border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
              }`}
            >
              1
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`flex h-7 w-7 items-center justify-center rounded-md text-[11.5px] font-bold transition ${
                page === 2
                  ? "bg-[#0d658a] text-white"
                  : "border border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
              }`}
            >
              2
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`flex h-7 w-7 items-center justify-center rounded-md text-[11.5px] font-bold transition ${
                page === 3
                  ? "bg-[#0d658a] text-white"
                  : "border border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
              }`}
            >
              3
            </button>

            <span className="px-1 text-[#94a3b8]">...</span>

            <button
              type="button"
              onClick={() => setPage(totalPages)}
              className={`flex h-7 w-7 items-center justify-center rounded-md text-[11.5px] font-bold transition ${
                page === totalPages
                  ? "bg-[#0d658a] text-white"
                  : "border border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
              }`}
            >
              {totalPages}
            </button>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e2e8f0] bg-white text-[#64748b] transition hover:bg-[#f8fafc]"
              aria-label="التالي"
            >
              <FiArrowLeft className="h-3.5 w-3.5" />
            </button>
          </nav>
        </div>
      </section>

      {/* BOTTOM GOVERNANCE & INTERNAL AUDIT BANNER */}
      <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#bae6fd] bg-[#f0f9ff] px-4 py-3 shadow-2xs">
        <div className="flex items-center gap-2.5 text-[11.5px]">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e0f2fe] text-[#0d658a]">
            <FiInfo className="h-4 w-4" />
          </div>
          <div>
            <div className="font-extrabold text-[#0c4a6e]">
              تنبيه حوكمة ورقابة داخلية
            </div>
            <p className="text-[11px] font-medium text-[#0369a1]">
              يوجد <strong className="font-black">3 أوامر شراء</strong> مدرجة ضمن العينة
              الإلزامية لعملية التدقيق المالي &quot;تدقيق الربع الرابع 2024&quot; — يُرجى
              استكمال التحقق من شاشة التدقيق الداخلي لتفادي تعليق دورات السداد.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenAudit}
          className="inline-flex h-[34px] shrink-0 items-center gap-1.5 rounded-lg border border-[#7dd3fc] bg-white px-3.5 text-[11.5px] font-extrabold text-[#0d658a] transition hover:bg-[#e0f2fe]"
        >
          <span>الانتقال إلى عمليات التدقيق والحوكمة</span>
          <FiArrowLeft className="h-3.5 w-3.5" />
        </button>
      </section>
    </div>
  );
};

export default Table;