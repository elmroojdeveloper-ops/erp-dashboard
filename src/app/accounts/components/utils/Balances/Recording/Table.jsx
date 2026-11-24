"use client";

import React, { useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiEdit2,
  FiEye,
  FiFilter,
  FiLock,
  FiRefreshCw,
  FiSearch,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { MdOutlineHourglassTop } from "react-icons/md";

const DEFAULT_ROWS = [
  {
    id: "1",
    fiscalYear: "2026 م (السنة الجارية)",
    batchCode: "JV-2026-OPEN",
    batchTitle: "دفعة البداية الموحدة للمركز الرئيسي",
    status: "pending_approval",
    statusLabel: "بانتظار اعتماد المدير المالي",
    debit: 4850230.0,
    credit: 4850230.0,
    balanceNote: "المدين = الدائن (متوازن 100%)",
    balanceType: "balanced",
    lastUpdatedDate: "اليوم 14:32",
    lastUpdatedBy: "سارة العتيبي (محاسب عام)",
    approverName: "قيد المراجعة",
    approverRole: "",
  },
  {
    id: "2",
    fiscalYear: "2026 م (السنة الجارية)",
    batchCode: "REJ-2026-ERR",
    batchTitle: "تسوية فروع المنطقة الشرقية",
    status: "rejected_returned",
    statusLabel: "مرفوضة ومسترجعة",
    debit: 1820000.0,
    credit: 1670000.0,
    balanceNote: "فارق غير متوازن: 350,000.00 ر.س ▲",
    balanceType: "unbalanced",
    lastUpdatedDate: "أمس 16:20",
    lastUpdatedBy: "فهد الدوسري (مدخل بيانات)",
    approverName: "رفضت بواسطة: أحمد المحاسب",
    approverRole: "",
  },
  {
    id: "3",
    fiscalYear: "2026 م (السنة الجارية)",
    batchCode: "DRAFT-2026-B2",
    batchTitle: "أرصدة بضاعة أول المدة - مستودعات جدة",
    status: "draft",
    statusLabel: "مسودة قيد الإعداد",
    debit: 640120.0,
    credit: 0.0,
    balanceNote: "جارٍ استكمال حساب المخزون المقابل",
    balanceType: "incomplete",
    lastUpdatedDate: "02 فبراير 2026 - 11:15",
    lastUpdatedBy: "خالد السبيعي (مسؤول مخازن)",
    approverName: "—",
    approverRole: "",
  },
  {
    id: "4",
    fiscalYear: "2026 م (السنة الجارية)",
    batchCode: "DRAFT-2026-B3",
    batchTitle: "أرصدة ذمم الموردين والعملاء الافتتاحية",
    status: "draft",
    statusLabel: "مسودة قيد الإعداد",
    debit: 1120400.0,
    credit: 1120400.0,
    balanceNote: "المدين = الدائن (متوازن مؤقتاً 100%)",
    balanceType: "balanced",
    lastUpdatedDate: "01 فبراير 2026 - 17:00",
    lastUpdatedBy: "سارة العتيبي (محاسب عام)",
    approverName: "—",
    approverRole: "",
  },
  {
    id: "5",
    fiscalYear: "2025 م",
    batchCode: "JV-2025-FINAL",
    batchTitle: "الأرصدة الافتتاحية المعتمدة للسنة السابقة",
    status: "approved_posted",
    statusLabel: "معتمدة ومقفولة بالكامل",
    debit: 12450800.0,
    credit: 12450800.0,
    balanceNote: "قيد افتتاحي مقفل ومرحل",
    balanceType: "balanced",
    lastUpdatedDate: "31 ديسمبر 2025",
    lastUpdatedBy: "إقفال السنة المالية الماضي",
    approverName: "أحمد المحاسب (مدير مالي)",
    approverRole: "",
  },
  {
    id: "6",
    fiscalYear: "2024 م",
    batchCode: "JV-2024-ARCHIVE",
    batchTitle: "أرصدة التأسيس المبدئية المؤرشفة",
    status: "approved_posted",
    statusLabel: "معتمدة ومقفولة بالكامل",
    debit: 9200000.0,
    credit: 9200000.0,
    balanceNote: "محفوظ بنجاح",
    balanceType: "balanced",
    lastUpdatedDate: "31 ديسمبر 2024",
    lastUpdatedBy: "أرشيف النظام",
    approverName: "أحمد المحاسب (مدير مالي)",
    approverRole: "",
  },
];

const formatCurrency = (val) =>
  val.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const Table = ({
  rows = DEFAULT_ROWS,
  onViewDetails,
  onApprove,
  onReject,
  onViewRejectReason,
  onContinueEntry,
  onEdit,
  onDelete,
  onRequestReopen,
  onReviewRequest,
  onExport,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const yearOptions = useMemo(() => {
    const unique = Array.from(new Set(rows.map((r) => r.fiscalYear)));
    return unique;
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesStatus =
        statusFilter === "all" || row.status === statusFilter;
      const matchesYear =
        yearFilter === "all" || row.fiscalYear === yearFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        row.fiscalYear.toLowerCase().includes(q) ||
        row.batchCode.toLowerCase().includes(q) ||
        row.batchTitle.toLowerCase().includes(q) ||
        row.lastUpdatedBy.toLowerCase().includes(q) ||
        (row.approverName && row.approverName.toLowerCase().includes(q));
      return matchesStatus && matchesYear && matchesSearch;
    });
  }, [rows, searchQuery, statusFilter, yearFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, currentPage]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setYearFilter("all");
    setCurrentPage(1);
  };

  const renderStatusBadge = (row) => {
    switch (row.status) {
      case "pending_approval":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-[5px] border border-[#F5D061] bg-[#FFF8DB] px-2.5 py-1 text-[11px] font-bold leading-none text-[#A16207]">
            <MdOutlineHourglassTop className="size-3" />
            {row.statusLabel}
          </span>
        );
      case "rejected_returned":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-[5px] border border-[#F5B7B1] bg-[#FDEDEC] px-2.5 py-1 text-[11px] font-bold leading-none text-[#C0392B]">
            <FiX className="size-3 stroke-[2.5]" />
            {row.statusLabel}
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-[5px] border border-[#BFDBFE] bg-[#EFF6FF] px-2.5 py-1 text-[11px] font-bold leading-none text-[#1D4ED8]">
            <FiEdit2 className="size-2.5" />
            {row.statusLabel}
          </span>
        );
      case "approved_posted":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-[5px] border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-1 text-[11px] font-bold leading-none text-[#047857]">
            <FiLock className="size-3" />
            {row.statusLabel}
          </span>
        );
    }
  };

  const renderBalanceNote = (row) => {
    if (row.balanceType === "unbalanced") {
      return (
        <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-[#DC2626]">
          <span>{row.balanceNote}</span>
        </div>
      );
    }
    if (row.balanceType === "incomplete") {
      return (
        <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-[#64748B]">
          <span>ⓘ</span>
          <span>{row.balanceNote}</span>
        </div>
      );
    }
    return (
      <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-[#059669]">
        <span className="inline-flex size-3.5 items-center justify-center rounded-full bg-[#D1FAE5] text-[9px] text-[#059669]">
          ✓
        </span>
        <span>{row.balanceNote}</span>
      </div>
    );
  };

  const renderActions = (row) => {
    if (row.status === "pending_approval") {
      return (
        <div className="flex flex-col items-start gap-1.5">
          <button
            type="button"
            onClick={() => onViewDetails?.(row)}
            className="inline-flex cursor-pointer items-center gap-1 rounded-[5px] border border-[#CBD5E1] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#334155] transition hover:bg-[#F8FAFC]"
          >
            <FiEye className="size-3 text-[#64748B]" />
            <span>عرض التفاصيل</span>
          </button>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onApprove?.(row)}
              className="inline-flex cursor-pointer items-center gap-1 rounded-[5px] bg-[#16A34A] px-2.5 py-1 text-[11px] font-bold text-white transition hover:bg-[#15803D]"
            >
              <FiCheck className="size-3 stroke-[2.5]" />
              <span>اعتماد الدفعة</span>
            </button>
            <button
              type="button"
              onClick={() => onReject?.(row)}
              className="inline-flex cursor-pointer items-center gap-1 rounded-[5px] border border-[#FCA5A5] bg-[#FEF2F2] px-2 py-1 text-[11px] font-bold text-[#DC2626] transition hover:bg-[#FEE2E2]"
            >
              <FiX className="size-3 stroke-[2.5]" />
              <span>رفض</span>
            </button>
          </div>
        </div>
      );
    }

    if (row.status === "rejected_returned") {
      return (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onContinueEntry?.(row)}
            className="inline-flex cursor-pointer items-center gap-1 rounded-[5px] bg-[#237B9F] px-2.5 py-1 text-[11px] font-bold text-white transition hover:bg-[#1B6280]"
          >
            <span>متابعة العمل</span>
            <FiArrowLeft className="size-3" />
          </button>
          <button
            type="button"
            onClick={() => onViewRejectReason?.(row)}
            className="inline-flex cursor-pointer items-center gap-1 rounded-[5px] border border-[#FCA5A5] bg-[#FEF2F2] px-2.5 py-1 text-[11px] font-bold text-[#DC2626] transition hover:bg-[#FEE2E2]"
          >
            <FiEye className="size-3" />
            <span>سبب الرفض</span>
          </button>
        </div>
      );
    }

    if (row.status === "draft") {
      return (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onContinueEntry?.(row)}
            className="inline-flex cursor-pointer items-center gap-1 rounded-[5px] border border-[#BAE6FD] bg-[#F0F9FF] px-2.5 py-1 text-[11px] font-bold text-[#237B9F] transition hover:bg-[#E0F2FE]"
          >
            <span>متابعة الإدخال</span>
            <FiArrowLeft className="size-3" />
          </button>
          <button
            type="button"
            onClick={() => onEdit?.(row)}
            title="تعديل"
            className="inline-flex size-6 cursor-pointer items-center justify-center rounded-[5px] border border-[#E2E8F0] bg-white text-[#64748B] transition hover:bg-[#F8FAFC] hover:text-[#334155]"
          >
            <FiEdit2 className="size-3" />
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(row)}
            title="حذف"
            className="inline-flex size-6 cursor-pointer items-center justify-center rounded-[5px] border border-[#E2E8F0] bg-white text-[#64748B] transition hover:bg-[#FEF2F2] hover:text-[#DC2626]"
          >
            <FiTrash2 className="size-3" />
          </button>
        </div>
      );
    }

    if (row.id === "5") {
      return (
        <div className="flex flex-col items-start gap-1">
          <button
            type="button"
            onClick={() => onReviewRequest?.(row)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-[5px] border border-[#F5D061] bg-[#FFF8DB] px-2.5 py-1 text-[11px] font-semibold text-[#A16207] transition hover:bg-[#FEF3C7]"
          >
            <FiLock className="size-3" />
            <span>مراجعة طلب إعادة الفتح</span>
          </button>
          <span className="text-[10px] font-medium text-[#D97706]">
            بانتظار مراجعة المدير المالي
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-start gap-1.5">
        <button
          type="button"
          onClick={() => onViewDetails?.(row)}
          className="inline-flex cursor-pointer items-center gap-1 rounded-[5px] border border-[#E2E8F0] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#334155] transition hover:bg-[#F8FAFC]"
        >
          <FiEye className="size-3 text-[#64748B]" />
          <span>عرض السجل (للقراءة فقط)</span>
        </button>
        <button
          type="button"
          onClick={() => onRequestReopen?.(row)}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-[5px] border border-[#E2E8F0] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#334155] transition hover:bg-[#F8FAFC]"
        >
          <FiRefreshCw className="size-3 text-[#64748B]" />
          <span>طلب إعادة فتح</span>
        </button>
      </div>
    );
  };

  return (
    <div
      dir="rtl"
      className="flex w-full flex-col gap-3 rounded-[14px] border border-[#E6ECEF] bg-white p-4"
    >
      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <FiSearch className="pointer-events-none absolute top-1/2 right-3.5 size-3.5 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="البحث بالسنة المالية أو رقم الدفعة أو اسم المعتمد أو الملاحظات..."
            className="h-[36px] w-full rounded-[8px] border border-[#E2E8F0] bg-[#F3F7FA] pr-9 pl-3 text-[12px] text-[#334155] placeholder-[#94A3B8] focus:border-[#237B9F] focus:bg-white focus:outline-none"
          />
        </div>

        {/* Status Filter, Year Filter, Export & Reset */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Select */}
          <div className="relative flex items-center">
            <FiFilter className="pointer-events-none absolute right-2.5 size-3 text-[#64748B]" />
            <span className="pointer-events-none pr-7 text-[11px] font-medium text-[#64748B]">
              الحالة:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-[34px] cursor-pointer appearance-none rounded-[7px] border border-[#E2E8F0] bg-white pr-1 pl-6 text-[11.5px] font-bold text-[#334155] focus:border-[#237B9F] focus:outline-none"
            >
              <option value="all">الكل</option>
              <option value="pending_approval">بانتظار اعتماد المدير المالي</option>
              <option value="rejected_returned">مرفوضة ومسترجعة</option>
              <option value="draft">مسودة قيد الإعداد</option>
              <option value="approved_posted">معتمدة ومقفولة بالكامل</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute left-2 size-3.5 text-[#64748B]" />
          </div>

          {/* Year Select */}
          <div className="relative flex items-center">
            <select
              value={yearFilter}
              onChange={(e) => {
                setYearFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-[34px] cursor-pointer appearance-none rounded-[7px] border border-[#E2E8F0] bg-white pr-3 pl-7 text-[11.5px] font-semibold text-[#475569] focus:border-[#237B9F] focus:outline-none"
            >
              <option value="all">جميع السنوات</option>
              {yearOptions.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
            <FiChevronDown className="pointer-events-none absolute left-2 size-3.5 text-[#64748B]" />
          </div>

          {/* Export Button */}
          <button
            type="button"
            onClick={() => onExport?.(filteredRows)}
            className="inline-flex h-[34px] cursor-pointer items-center gap-1.5 rounded-[7px] border border-[#E2E8F0] bg-white px-3 text-[11.5px] font-semibold text-[#334155] transition hover:bg-[#F8FAFC]"
          >
            <FiDownload className="size-3.5 text-[#64748B]" />
            <span>تصدير السجل</span>
            <FiChevronDown className="size-3 text-[#64748B]" />
          </button>

          {/* Reset Filters Button */}
          <button
            type="button"
            onClick={handleResetFilters}
            title="إعادة ضبط الفلاتر"
            className="inline-flex size-[34px] cursor-pointer items-center justify-center rounded-[7px] border border-[#E2E8F0] bg-white text-[#64748B] transition hover:bg-[#F8FAFC] hover:text-[#237B9F]"
          >
            <FiRefreshCw className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto rounded-[10px] border border-[#EEF2F6]">
        <table className="w-full min-w-[920px] border-collapse text-right">
          <thead>
            <tr className="border-b border-[#E6ECEF] bg-[#F8FAFC] text-[11.5px] font-bold text-[#64748B]">
              <th className="px-3.5 py-3">السنة المالية</th>
              <th className="px-3.5 py-3">رقم الدفعة والتسمية</th>
              <th className="px-3.5 py-3">الحالة المحاسبية</th>
              <th className="px-3.5 py-3">إجمالي المدين / الدائن وفحص التوازن</th>
              <th className="px-3.5 py-3">آخر تحديث</th>
              <th className="px-3.5 py-3">المعتمد</th>
              <th className="px-3.5 py-3">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] text-[12px]">
            {paginatedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 text-center text-[12.5px] font-medium text-[#64748B]"
                >
                  لا توجد سجلات مطابقة لمعايير البحث أو الفلترة الحالية.
                </td>
              </tr>
            ) : (
              paginatedRows.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-[#F8FAFC]/80"
                >
                  {/* Fiscal Year */}
                  <td className="px-3.5 py-3.5 align-middle whitespace-nowrap">
                    <span className="inline-block rounded-[5px] bg-[#EBF5FA] px-2.5 py-1 text-[11px] font-bold text-[#237B9F]">
                      {row.fiscalYear}
                    </span>
                  </td>

                  {/* Batch Code & Title */}
                  <td className="px-3.5 py-3.5 align-middle">
                    <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#1E293B]">
                      {row.status === "pending_approval" && (
                        <span className="inline-flex size-3.5 items-center justify-center rounded-xs bg-[#DBEAFE] text-[9px] text-[#2563EB]">
                          ▣
                        </span>
                      )}
                      {row.status === "rejected_returned" && (
                        <span className="text-[11px] text-[#DC2626]">▲</span>
                      )}
                      {row.status === "draft" && (
                        <span className="text-[11px] text-[#64748B]">✎</span>
                      )}
                      {row.status === "approved_posted" && (
                        <span className="inline-flex size-3.5 items-center justify-center rounded-full bg-[#D1FAE5] text-[9px] text-[#059669]">
                          ✓
                        </span>
                      )}
                      <span dir="ltr">{row.batchCode}</span>
                    </div>
                    <div className="mt-0.5 text-[11px] font-normal text-[#64748B]">
                      {row.batchTitle}
                    </div>
                  </td>

                  {/* Accounting Status */}
                  <td className="px-3.5 py-3.5 align-middle whitespace-nowrap">
                    {renderStatusBadge(row)}
                  </td>

                  {/* Debit / Credit & Balance Check */}
                  <td className="px-3.5 py-3.5 align-middle whitespace-nowrap">
                    <div className="flex flex-wrap items-center gap-2 text-[11.5px]">
                      <span className="text-[#475569]">
                        المدين:{" "}
                        <strong className="font-bold text-[#1E293B]">
                          {formatCurrency(row.debit)} ر.س
                        </strong>
                      </span>
                      <span className="text-[#CBD5E1]">|</span>
                      <span className="text-[#475569]">
                        الدائن:{" "}
                        <strong className="font-bold text-[#1E293B]">
                          {formatCurrency(row.credit)} ر.س
                        </strong>
                      </span>
                    </div>
                    {renderBalanceNote(row)}
                  </td>

                  {/* Last Updated */}
                  <td className="px-3.5 py-3.5 align-middle whitespace-nowrap">
                    <div className="text-[11.5px] font-semibold text-[#334155]">
                      {row.lastUpdatedDate}
                    </div>
                    <div className="mt-0.5 text-[11px] font-normal text-[#94A3B8]">
                      {row.lastUpdatedBy}
                    </div>
                  </td>

                  {/* Approver */}
                  <td className="px-3.5 py-3.5 align-middle whitespace-nowrap">
                    {row.status === "pending_approval" && (
                      <span className="inline-block rounded-[5px] bg-[#FEF3C7] px-2.5 py-1 text-[11px] font-bold text-[#B45309]">
                        {row.approverName}
                      </span>
                    )}
                    {row.status === "rejected_returned" && (
                      <div className="inline-flex items-center gap-1 rounded-[5px] border border-[#FECACA] bg-[#FEF2F2] px-2 py-1 text-[11px] font-bold text-[#DC2626]">
                        <FiX className="size-3" />
                        <span>{row.approverName}</span>
                      </div>
                    )}
                    {row.status === "draft" && (
                      <span className="text-[12px] font-medium text-[#94A3B8]">
                        {row.approverName}
                      </span>
                    )}
                    {row.status === "approved_posted" && (
                      <span className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#059669]">
                        <span className="inline-flex size-3.5 items-center justify-center rounded-full bg-[#D1FAE5] text-[9px]">
                          ✓
                        </span>
                        <span>{row.approverName}</span>
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-3.5 py-3.5 align-middle whitespace-nowrap">
                    {renderActions(row)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col items-center justify-between gap-2 pt-1 sm:flex-row">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="inline-flex size-7 cursor-pointer items-center justify-center rounded-[6px] border border-[#E2E8F0] bg-white text-[#64748B] transition hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiChevronRight className="size-3.5" />
          </button>

          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`inline-flex size-7 cursor-pointer items-center justify-center rounded-[6px] text-[11.5px] font-bold transition ${
                  currentPage === page
                    ? "bg-[#237B9F] text-white"
                    : "border border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#F8FAFC]"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="inline-flex size-7 cursor-pointer items-center justify-center rounded-[6px] border border-[#E2E8F0] bg-white text-[#64748B] transition hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiChevronLeft className="size-3.5" />
          </button>
        </div>

        <div className="text-[11px] font-medium text-[#64748B]">
          عرض {paginatedRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}{" "}
          إلى {Math.min(currentPage * pageSize, filteredRows.length)} من إجمالي{" "}
          {filteredRows.length} جلسات مسجلة للنظام
        </div>
      </div>
    </div>
  );
};

export default Table;