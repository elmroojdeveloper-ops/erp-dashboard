"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiMoreVertical,
  FiShield,
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

/* ============================================================
   بيانات تجريبية مطابقة للصورة (استبدلها ببيانات الـ API)
============================================================ */
const MOCK_AUDITS = [
  {
    id: "AUD-2024-01",
    type: "internal", // "internal" | "external"
    title: "تدقيق الربع الثالث 2024",
    dateRange: "01/07/2024 - 30/09/2024",
    auditor: {
      name: "سارة العتيبي",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    },
    completedItems: 850,
    totalItems: 1240,
    status: "active", // "active" | "completed"
  },
  {
    id: "AUD-2023-02",
    type: "external",
    title: "مراجعة القوائم المالية 2023",
    dateRange: "01/01/2024 - 15/03/2024",
    auditor: {
      name: "شركة KPMG",
      avatar:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80",
    },
    completedItems: 1240,
    totalItems: 1240,
    status: "completed",
  },
  {
    id: "AUD-2024-03",
    type: "internal",
    title: "تدقيق الزكاة والضريبة Q2",
    dateRange: "01/04/2024 - 30/06/2024",
    auditor: {
      name: "ياسر جلال",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    completedItems: 120,
    totalItems: 500,
    status: "active",
  },
  {
    id: "AUD-2023-04",
    type: "external",
    title: "مراجعة القوائم المالية 2023",
    dateRange: "01/01/2024 - 15/03/2024",
    auditor: {
      name: "شركة KPMG",
      avatar:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80",
    },
    completedItems: 1240,
    totalItems: 1240,
    status: "completed",
  },
];

const cx = (...c) => c.filter(Boolean).join(" ");

const getPages = (page, total) => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, "…", total];
  if (page >= total - 2) return [1, "…", total - 2, total - 1, total];
  return [1, "…", page - 1, page, page + 1, "…", total];
};

const getPercent = (completed, total) => {
  if (!total || total <= 0) return 0;
  return Math.min(100, Math.round((completed / total) * 100));
};

/* ============================================================
   توزيع الأعمدة المطابق تماماً للصورة (من اليمين لليسار)
   1. الشارة + العنوان والتاريخ
   2. المدقق / الجهة
   3. شريط التقدم والنسبة
   4. الحالة (نشط / مكتملة)
   5. زر الإجراءات (⋮)
============================================================ */
const ROW_GRID =
  "grid grid-cols-[minmax(280px,1.5fr)_minmax(160px,0.9fr)_minmax(170px,1fr)_110px_44px] items-center gap-4 px-6";

const Table = ({
  rows = MOCK_AUDITS,
  page: initialPage = 1,
  totalPages = 30,
  totalCount = 24,
  externalStatusFilter,
  onPageChange,
  onViewDetails,
  onEditAudit,
  onDeleteAudit,
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(initialPage);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuContainerRef = useRef(null);
const router =useRouter()
  useEffect(() => {
    if (
      externalStatusFilter &&
      ["all", "active", "completed"].includes(externalStatusFilter)
    ) {
      setStatusFilter(externalStatusFilter);
      setPage(1);
    }
  }, [externalStatusFilter]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(e.target)
      ) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();

    return rows.filter((row) => {
      if (statusFilter !== "all" && row.status !== statusFilter) {
        return false;
      }

      if (!q) return true;

      const typeLabel = row.type === "internal" ? "داخلي" : "خارجي";
      return (
        row.title?.toLowerCase().includes(q) ||
        row.auditor?.name?.toLowerCase().includes(q) ||
        row.dateRange?.toLowerCase().includes(q) ||
        typeLabel.includes(q)
      );
    });
  }, [rows, search, statusFilter]);

  const goTo = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    onPageChange?.(p);
  };

  const pages = useMemo(() => getPages(page, totalPages), [page, totalPages]);

  const displayedTotal =
    search.trim() || statusFilter !== "all" ? filteredRows.length : totalCount;
  const rangeStart = filteredRows.length === 0 ? 0 : (page - 1) * rows.length + 1;
  const rangeEnd =
    filteredRows.length === 0
      ? 0
      : Math.min(rangeStart + filteredRows.length - 1, displayedTotal);

  return (
    <div dir="rtl" className="mt-4 space-y-4">
      {/* ============================================================
          1. شريط البحث والفلترة
      ============================================================ */}
      <div className="rounded-[22px] bg-white px-5 py-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* حقل البحث الواسع */}
          <div className="relative min-w-[240px] flex-1">
            <FiSearch
              size={17}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7280]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="ابحث عن عملية تدقيق..."
              className="h-[42px] w-full rounded-full border border-[#e5e7eb] bg-white pl-4 pr-11 text-[13.5px] font-medium text-[#1f2937] placeholder:text-[#9ca3af] transition-colors focus:border-[#1b7398] focus:outline-none"
            />
          </div>

          {/* قائمة فلترة الحالة */}
          <div className="relative w-[155px] shrink-0">
            <select
              aria-label="فلترة حسب الحالة"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="h-[42px] w-full appearance-none rounded-2xl border border-[#e5e7eb] bg-white pl-9 pr-4 text-[13px] font-semibold text-[#4b5563] transition-colors focus:border-[#1b7398] focus:outline-none"
            >
              <option value="all">الحالة: الكل</option>
              <option value="active">الحالة: نشط</option>
              <option value="completed">الحالة: مكتملة</option>
            </select>
            <FiChevronDown
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b7280]"
            />
          </div>
        </div>
      </div>

      {/* ============================================================
          2. بطاقة جدول عمليات التدقيق والترقيم
      ============================================================ */}
      <section
        ref={menuContainerRef}
        className="rounded-[22px] bg-white py-2 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
      >
        <div className="overflow-x-auto">
          <div className="min-w-[880px] divide-y divide-[#f1f5f9]">
            {filteredRows.length === 0 ? (
              <div className="py-14 text-center text-[14px] font-medium text-[#6b7280]">
                لا توجد عمليات تدقيق مطابقة لبحثك.
              </div>
            ) : (
              filteredRows.map((row) => {
                const percent = getPercent(row.completedItems, row.totalItems);
                const isInternal = row.type === "internal";
                const isActive = row.status === "active";
                const isMenuOpen = openMenuId === row.id;

                return (
                  <div
                    key={row.id}
                    className={cx(
                      ROW_GRID,
                      "min-h-[82px] py-4 transition-colors hover:bg-[#f9fbfc]"
                    )}
                  >
                    {/* 1. الشارة (داخلي / خارجي) + عنوان العملية + التاريخ */}
                    <div className="flex items-center gap-3.5">
                      <span
                        className={cx(
                          "inline-flex h-[32px] w-[78px] shrink-0 items-center justify-center gap-1.5 rounded-lg text-[12px] font-bold text-white",
                          isInternal ? "bg-[#1b7398]" : "bg-[#116485]"
                        )}
                      >
                        {isInternal ? (
                          <>
                            <FiShield size={13} />
                            <span>داخلي</span>
                          </>
                        ) : (
                          <>
                            <HiOutlineBuildingLibrary size={14} />
                            <span>خارجي</span>
                          </>
                        )}
                      </span>

                      <div className="min-w-0 space-y-1">
                        <p className="truncate text-[14.5px] font-bold text-[#1f2937]">
                          {row.title}
                        </p>
                        <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#6b7280]">
                          <FiCalendar size={13} className="shrink-0 text-[#4b5563]" />
                          <span dir="ltr">{row.dateRange}</span>
                        </div>
                      </div>
                    </div>

                    {/* 2. المدقق / الجهة */}
                    <div className="flex items-center gap-2.5">
                      <img
                        src={row.auditor.avatar}
                        alt={row.auditor.name}
                        className="h-9 w-9 shrink-0 rounded-full border border-[#e5e7eb] object-cover"
                      />
                      <span className="truncate text-[13.5px] font-semibold text-[#374151]">
                        {row.auditor.name}
                      </span>
                    </div>

                    {/* 3. التقدم (850 / 1240 و 68%) */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[12px]">
                        <span
                          dir="ltr"
                          className="font-bold text-[#374151]"
                        >
                          {row.completedItems} / {row.totalItems}
                        </span>
                        <span
                          dir="ltr"
                          className="font-semibold text-[#6b7280]"
                        >
                          {percent}%
                        </span>
                      </div>
                      <div className="h-[6px] w-full overflow-hidden rounded-full bg-[#e5e7eb]">
                        <div
                          className="h-full rounded-full bg-[#1b7398] transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    {/* 4. الحالة (نشط / مكتملة) */}
                    <div className="flex justify-center">
                      {isActive ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#dcfce7] px-3.5 py-1 text-[12px] font-bold text-[#15803d]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                          <span>نشط</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center rounded-full bg-[#e5e7eb] px-3.5 py-1 text-[12px] font-bold text-[#6b7280]">
                          مكتملة
                        </span>
                      )}
                    </div>

                    {/* 5. قائمة الإجراءات (⋮) */}
                    <div className="relative flex justify-center">
                      <button
                        type="button"
                        aria-label="المزيد من الإجراءات"
                        onClick={() =>
                          setOpenMenuId(isMenuOpen ? null : row.id)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#4b5563] transition-colors hover:bg-[#f1f5f9]"
                      >
                        <FiMoreVertical size={17} />
                      </button>

                      {isMenuOpen && (
                        <div className="absolute left-0 top-9 z-20 w-40 rounded-xl border border-[#e5e7eb] bg-white py-1.5 shadow-lg">
                          <button
                            type="button"
                            onClick={()=>{
                                router.push(`/accounts/AuditProcess/${row.id}`)
                                setOpenMenuId(false)
                            }}
                            className="flex w-full items-center gap-2 px-3.5 py-2 text-right text-[12.5px] font-semibold text-[#374151] hover:bg-[#f8fafc]"
                          >
                            <FiEye size={14} className="text-[#1b7398]" />
                            <span>عرض التفاصيل</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null);
                              onEditAudit?.(row);
                            }}
                            className="flex w-full items-center gap-2 px-3.5 py-2 text-right text-[12.5px] font-semibold text-[#374151] hover:bg-[#f8fafc]"
                          >
                            <FiEdit2 size={14} className="text-[#4b5563]" />
                            <span>تعديل العملية</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null);
                              onDeleteAudit?.(row);
                            }}
                            className="flex w-full items-center gap-2 px-3.5 py-2 text-right text-[12.5px] font-semibold text-[#dc2626] hover:bg-[#fef2f2]"
                          >
                            <FiTrash2 size={14} />
                            <span>حذف</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ============================================================
            3. الفوتر: ملخص العرض (يمين) + أزرار الترقيم (يسار)
        ============================================================ */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#f1f5f9] px-6 pb-4 pt-5">
          {/* يمين: عرض 1-4 من 24 عملية تدقيق */}
          <p className="text-[13px] font-semibold text-[#1b7398]">
            عرض {rangeStart}-{rangeEnd} من {displayedTotal} عملية تدقيق
          </p>

          {/* يسار: الترقيم الدائري */}
          <nav aria-label="الترقيم" className="flex items-center gap-2">
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
        </div>
      </section>
    </div>
  );
};

export default Table;