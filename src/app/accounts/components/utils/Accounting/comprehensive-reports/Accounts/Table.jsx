"use client";

import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const defaultAccounts = [
  {
    id: "101001",
    code: "101001",
    nameLine1: "الصندوق الرئيسي",
    nameLine2: "والخزائن النقدية",
    subtitleLine1: "خزينة الإدارة المركزية -",
    subtitleLine2: "الرياض",
    mainTypeLine1: "أصول",
    mainTypeLine2: "متداولة",
    mainTypeStyle: "bg-[#e3f1f8] text-[#086382]",
    parentLine1: "101000 النقدية وما",
    parentLine2: "في حكمها",
    balance: "4,850,200.00",
    currency: "ر.س",
    nature: "مدين",
    natureStyle: "bg-[#e3f1f8] text-[#086382]",
    status: "نشط",
    statusType: "active",
  },
  {
    id: "102001",
    code: "102001",
    nameLine1: "مصرف الراجحي -",
    nameLine2: "الحساب التشغيلي",
    subtitleLine1: "حساب التحصيل والعمليات",
    subtitleLine2: "IBAN: SA4280...",
    mainTypeLine1: "أصول",
    mainTypeLine2: "متداولة",
    mainTypeStyle: "bg-[#e3f1f8] text-[#086382]",
    parentLine1: "102000 الحسابات",
    parentLine2: "البنكية",
    balance: "18,340,150.00",
    currency: "ر.س",
    nature: "مدين",
    natureStyle: "bg-[#e3f1f8] text-[#086382]",
    status: "نشط",
    statusType: "active",
  },
  {
    id: "105001",
    code: "105001",
    nameLine1: "أراضي ومباني الإدارة",
    nameLine2: "العامة",
    subtitleLine1: "عقارات مقر الشركة - الرياض",
    subtitleLine2: "",
    mainTypeLine1: "أصول ثابتة",
    mainTypeLine2: "",
    mainTypeStyle: "bg-[#eef2f6] text-[#334155]",
    parentLine1: "105000 الأصول",
    parentLine2: "الثابتة العقارية",
    balance: "12,500,000.00",
    currency: "ر.س",
    nature: "مدين",
    natureStyle: "bg-[#e3f1f8] text-[#086382]",
    status: "نشط",
    statusType: "active",
  },
  {
    id: "201001",
    code: "201001",
    nameLine1: "ذمم الموردين",
    nameLine2: "المحليين والتجاريين",
    subtitleLine1: "حسابات التوريد المباشر",
    subtitleLine2: "",
    mainTypeLine1: "خصوم",
    mainTypeLine2: "متداولة",
    mainTypeStyle: "bg-[#f1effa] text-[#6d28d9]",
    parentLine1: "201000 الموردون",
    parentLine2: "والدائنون",
    balance: "6,420,800.00",
    currency: "ر.س",
    nature: "دائن",
    natureStyle: "bg-[#eaf7f0] text-[#047857]",
    status: "نشط",
    statusType: "active",
  },
  {
    id: "301001",
    code: "301001",
    nameLine1: "رأس المال المدفوع",
    nameLine2: "",
    subtitleLine1: "حصص الشركاء والمساهمين",
    subtitleLine2: "الأساسية",
    mainTypeLine1: "حقوق",
    mainTypeLine2: "الملكية",
    mainTypeStyle: "bg-[#e6f4ec] text-[#047857]",
    parentLine1: "301000 حقوق",
    parentLine2: "الشركاء ورأس المال",
    balance: "35,000,000.00",
    currency: "ر.س",
    nature: "دائن",
    natureStyle: "bg-[#eaf7f0] text-[#047857]",
    status: "نشط",
    statusType: "active",
  },
  {
    id: "401001",
    code: "401001",
    nameLine1: "إيرادات مبيعات",
    nameLine2: "التجزئة ونقاط البيع",
    subtitleLine1: "مبيعات الفروع المباشرة",
    subtitleLine2: "ومراكز التسوق",
    mainTypeLine1: "إيرادات",
    mainTypeLine2: "تشغيلية",
    mainTypeStyle: "bg-[#e6f4ec] text-[#047857]",
    parentLine1: "401000 إيرادات",
    parentLine2: "النشاط الرئيسي",
    balance: "28,640,000.00",
    currency: "ر.س",
    nature: "دائن",
    natureStyle: "bg-[#eaf7f0] text-[#047857]",
    status: "نشط",
    statusType: "active",
  },
  {
    id: "501001",
    code: "501001",
    nameLine1: "رواتب وأجور",
    nameLine2: "الموظفين الأساسية",
    subtitleLine1: "مسيرات الرواتب الشهرية",
    subtitleLine2: "والبدلات",
    mainTypeLine1: "مصروفات",
    mainTypeLine2: "إدارية",
    mainTypeStyle: "bg-[#fce8e8] text-[#c0262d]",
    parentLine1: "501000 المصاريف",
    parentLine2: "العمومية والإدارية",
    balance: "3,850,300.00",
    currency: "ر.س",
    nature: "مدين",
    natureStyle: "bg-[#e3f1f8] text-[#086382]",
    status: "نشط",
    statusType: "active",
  },
];

const Table = ({
  accounts = defaultAccounts,
  totalRecords = 1420,
  onSelectAccount,
  onActionClick,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const typeOptions = useMemo(() => {
    const labels = accounts.map((item) =>
      item.mainTypeLine2
        ? `${item.mainTypeLine1} ${item.mainTypeLine2}`
        : item.mainTypeLine1
    );
    return Array.from(new Set(labels));
  }, [accounts]);

  const filteredAccounts = useMemo(() => {
    return accounts.filter((item) => {
      const fullName = `${item.nameLine1} ${item.nameLine2}`.toLowerCase();
      const fullSub =
        `${item.subtitleLine1} ${item.subtitleLine2}`.toLowerCase();
      const fullParent =
        `${item.parentLine1} ${item.parentLine2}`.toLowerCase();
      const fullType = item.mainTypeLine2
        ? `${item.mainTypeLine1} ${item.mainTypeLine2}`
        : item.mainTypeLine1;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.code.toLowerCase().includes(q) ||
        fullName.includes(q) ||
        fullSub.includes(q) ||
        fullParent.includes(q);

      const matchesType = typeFilter === "all" || fullType === typeFilter;
      const matchesStatus =
        statusFilter === "all" || item.statusType === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [accounts, searchQuery, typeFilter, statusFilter]);

  const pageSize = 7;
  const totalPages = Math.max(1, Math.ceil(filteredAccounts.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedAccounts = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredAccounts.slice(start, start + pageSize);
  }, [filteredAccounts, safePage]);

  const isFiltered =
    searchQuery.trim() !== "" || typeFilter !== "all" || statusFilter !== "all";

  const startIndex =
    filteredAccounts.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endIndex = Math.min(safePage * pageSize, filteredAccounts.length);
  const displayTotal = isFiltered ? filteredAccounts.length : totalRecords;

  return (
    <section
      dir="rtl"
      className="rounded-[24px] mt-6 border border-[#e6ecf2] bg-white p-5 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Toolbar: Title & Subtitle on Right, Filter & Search Controls on Left */}
      <div className="flex flex-wrap items-start justify-between gap-3 pb-4">
        <div className="text-right">
          <h2 className="text-[19px] font-black leading-[1.3] text-[#0f172a]">
            سجل حسابات الدليل المالي والأرصدة الختامية
          </h2>
          <p className="mt-1 text-[12px] font-medium leading-[1.45] text-[#64748b]">
            <span className="block">
              عرض تفصيلي لبيانات الأرصدة، الحسابات الأم، والطبيعة الدفترية
            </span>
            <span className="block">لكل حساب</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="تصفية حسب الحالة"
            className="h-[34px] rounded-[9px] border border-[#e2e8f0] bg-white px-2.5 text-[11px] font-bold text-[#334155] focus:border-[#086382] focus:outline-none"
          >
            <option value="all">الحالة (كافة الحسابات)</option>
            <option value="active">نشط فقط</option>
          </select>

          {/* Type Dropdown */}
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="تصفية حسب النوع"
            className="h-[34px] rounded-[9px] border border-[#e2e8f0] bg-white px-2.5 text-[11px] font-bold text-[#334155] focus:border-[#086382] focus:outline-none"
          >
            <option value="all">تصفية حسب النوع (الكل)</option>
            {typeOptions.map((typeName) => (
              <option key={typeName} value={typeName}>
                {typeName}
              </option>
            ))}
          </select>

          {/* Search Input */}
          <div className="relative w-[225px] sm:w-[245px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="ابحث برقم الحساب، اسم الحساب، أو الكود..."
              className="h-[34px] w-full rounded-[9px] border border-[#e2e8f0] bg-[#f8fafc] pr-3 pl-8 text-[11px] font-medium text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#086382] focus:bg-white focus:outline-none"
            />
            <FiSearch className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
          </div>
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px] border-collapse text-right">
          <thead>
            <tr className="border-y border-[#eef2f6] bg-[#fafcfd] text-[11.5px] font-bold leading-[1.3] text-[#64748b]">
              <th className="py-2.5 pr-3 pl-2 font-bold">
                <span className="block">رقم</span>
                <span className="block">الحساب</span>
              </th>
              <th className="py-2.5 px-2.5 font-bold">اسم الحساب</th>
              <th className="py-2.5 px-2 text-center font-bold">
                <span className="block">النوع</span>
                <span className="block">الرئيسي</span>
              </th>
              <th className="py-2.5 px-2.5 text-center font-bold">
                الحساب الأب
              </th>
              <th className="py-2.5 px-2.5 text-left font-bold">
                الرصيد الحالي
              </th>
              <th className="py-2.5 px-2 text-center font-bold">
                <span className="block">طبيعة</span>
                <span className="block">الحساب</span>
              </th>
              <th className="py-2.5 px-2 text-center font-bold">الحالة</th>
              <th className="py-2.5 pr-2 pl-3 text-center font-bold">
                إجراءات
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#eef2f6] text-[12.5px]">
            {paginatedAccounts.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-10 text-center text-[12.5px] font-bold text-[#64748b]"
                >
                  لا توجد حسابات مطابقة لمعايير البحث أو التصفية الحالية.
                </td>
              </tr>
            ) : (
              paginatedAccounts.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onSelectAccount?.(row)}
                  className="cursor-pointer transition hover:bg-[#f8fbfe]"
                >
                  {/* رقم الحساب */}
                  <td className="py-3.5 pr-3 pl-2 align-middle font-extrabold text-[#0f172a] whitespace-nowrap">
                    {row.code}
                  </td>

                  {/* اسم الحساب */}
                  <td className="py-3.5 px-2.5 align-middle text-right">
                    <div className="text-[12.5px] font-black leading-[1.35] text-[#0f172a]">
                      <span className="block">{row.nameLine1}</span>
                      {row.nameLine2 && (
                        <span className="block">{row.nameLine2}</span>
                      )}
                    </div>
                    <div className="mt-0.5 text-[10.5px] font-medium leading-[1.35] text-[#64748b]">
                      <span className="block">{row.subtitleLine1}</span>
                      {row.subtitleLine2 && (
                        <span className="block">{row.subtitleLine2}</span>
                      )}
                    </div>
                  </td>

                  {/* النوع الرئيسي */}
                  <td className="py-3.5 px-2 align-middle text-center whitespace-nowrap">
                    <span
                      className={`inline-block rounded-[8px] px-2.5 py-1 text-[10.5px] font-extrabold leading-[1.3] ${row.mainTypeStyle}`}
                    >
                      <span className="block">{row.mainTypeLine1}</span>
                      {row.mainTypeLine2 && (
                        <span className="block">{row.mainTypeLine2}</span>
                      )}
                    </span>
                  </td>

                  {/* الحساب الأب */}
                  <td className="py-3.5 px-2.5 align-middle text-center">
                    <div className="text-[11.5px] font-bold leading-[1.35] text-[#475569]">
                      <span className="block">{row.parentLine1}</span>
                      {row.parentLine2 && (
                        <span className="block">{row.parentLine2}</span>
                      )}
                    </div>
                  </td>

                  {/* الرصيد الحالي */}
                  <td className="py-3.5 px-2.5 align-middle text-left whitespace-nowrap">
                    <div className="text-[12.5px] font-black leading-[1.25] text-[#0f172a]">
                      {row.balance}
                    </div>
                    <div className="mt-0.5 text-[11px] font-bold text-[#64748b]">
                      {row.currency}
                    </div>
                  </td>

                  {/* طبيعة الحساب */}
                  <td className="py-3.5 px-2 align-middle text-center whitespace-nowrap">
                    <span
                      className={`inline-block rounded-[7px] px-2.5 py-1 text-[10.5px] font-extrabold ${row.natureStyle}`}
                    >
                      {row.nature}
                    </span>
                  </td>

                  {/* الحالة */}
                  <td className="py-3.5 px-2 align-middle text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf7f0] px-2.5 py-1 text-[11px] font-extrabold text-[#047857]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#047857]" />
                      <span>{row.status}</span>
                    </span>
                  </td>

                  {/* إجراءات */}
                  <td
                    className="py-3.5 pr-2 pl-3 align-middle text-center whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => onActionClick?.(row)}
                      aria-label={`إجراءات الحساب ${row.nameLine1}`}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-[#64748b] transition hover:bg-[#f1f5f9] hover:text-[#0f172a]"
                    >
                      <FiMoreVertical className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer: Pagination & Record Summary */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#eef2f6] pt-3.5 text-[11.5px]">
        {/* Pagination Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            aria-label="الصفحة السابقة"
            className="inline-flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#e2e8f0] bg-white text-[#475569] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiChevronRight className="h-3.5 w-3.5" />
          </button>

          {totalPages <= 5 ? (
            Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-7 min-w-[28px] rounded-[7px] px-2 text-[11.5px] font-extrabold transition ${
                    safePage === pageNum
                      ? "bg-[#086382] text-white"
                      : "border border-[#e2e8f0] bg-white text-[#334155] hover:bg-[#f8fafc]"
                  }`}
                >
                  {pageNum}
                </button>
              )
            )
          ) : (
            <>
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className={`h-7 min-w-[28px] rounded-[7px] px-2 text-[11.5px] font-extrabold transition ${
                  safePage === 1
                    ? "bg-[#086382] text-white"
                    : "border border-[#e2e8f0] bg-white text-[#334155] hover:bg-[#f8fafc]"
                }`}
              >
                1
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(2)}
                className={`h-7 min-w-[28px] rounded-[7px] px-2 text-[11.5px] font-extrabold transition ${
                  safePage === 2
                    ? "bg-[#086382] text-white"
                    : "border border-[#e2e8f0] bg-white text-[#334155] hover:bg-[#f8fafc]"
                }`}
              >
                2
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(3)}
                className={`h-7 min-w-[28px] rounded-[7px] px-2 text-[11.5px] font-extrabold transition ${
                  safePage === 3
                    ? "bg-[#086382] text-white"
                    : "border border-[#e2e8f0] bg-white text-[#334155] hover:bg-[#f8fafc]"
                }`}
              >
                3
              </button>

              <span className="px-1 font-bold text-[#94a3b8]">...</span>

              <button
                type="button"
                onClick={() => setCurrentPage(totalPages)}
                className={`h-7 min-w-[28px] rounded-[7px] px-2 text-[11.5px] font-extrabold transition ${
                  safePage === totalPages
                    ? "bg-[#086382] text-white"
                    : "border border-[#e2e8f0] bg-white text-[#334155] hover:bg-[#f8fafc]"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            aria-label="الصفحة التالية"
            className="inline-flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#e2e8f0] bg-white text-[#475569] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiChevronLeft className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Summary Text */}
        <div className="font-semibold text-[#64748b]">
          عرض{" "}
          <strong className="font-black text-[#0f172a]">{startIndex}</strong> إلى{" "}
          <strong className="font-black text-[#0f172a]">{endIndex}</strong> من
          إجمالي{" "}
          <strong className="font-black text-[#0f172a]">
            {displayTotal.toLocaleString()}
          </strong>{" "}
          حسابًا مسجلاً
        </div>
      </div>
    </section>
  );
};

export default Table;
