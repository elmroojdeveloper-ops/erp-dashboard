"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiCalendar,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiEye,
  FiFileText,
  FiFilter,
  FiInfo,
  FiPrinter,
  FiRotateCcw,
  FiSearch,
} from "react-icons/fi";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";

const vendorQuotesHref = "/accounts/Purches/vendor-quotes";

const comparisonsTotal = 24;

const comparisonRows = [
  {
    id: "1",
    cmpRef: "CMP-2023-001",
    prRef: "PR-2023-085",
    rfqId: "1",
    vendorCount: 4,
    vendorAvatars: [
      { letter: "ن", bg: "bg-[#9CA3AF]", text: "text-white" },
      { letter: "ع", bg: "bg-[#64748B]", text: "text-white" },
      { letter: "م", bg: "bg-[#14B8A6]", text: "text-white" },
      { letter: "خ", bg: "bg-[#1E293B]", text: "text-white" },
    ],
    date: "14 أكتوبر 2023",
    time: "10:30 ص",
    status: "completed",
    statusLabel: "مكتملة",
    winner: "شركة الخبراء",
    winnerMeta: "تقييم 94%",
    winnerTone: "teal",
    exceptional: true,
  },
  {
    id: "2",
    cmpRef: "CMP-2023-042",
    prRef: "PR-2023-102",
    rfqId: "2",
    vendorCount: 3,
    vendorAvatars: [
      { letter: "س", bg: "bg-[#0f172a]", text: "text-white" },
      { letter: "أ", bg: "bg-[#0d658a]", text: "text-white" },
      { letter: "ر", bg: "bg-[#1d4ed8]", text: "text-white" },
    ],
    date: "18 أكتوبر 2023",
    time: "02:15 م",
    status: "completed",
    statusLabel: "مكتملة",
    winner: "مؤسسة الرك",
    winnerMeta: "معتمد نهائياً",
    winnerTone: "muted",
    exceptional: false,
  },
  {
    id: "3",
    cmpRef: "CMP-2023-078",
    prRef: "PR-2023-119",
    rfqId: "3",
    vendorCount: 5,
    vendorAvatars: [
      { letter: "+2", bg: "bg-[#f1f5f9]", text: "text-[#475569]" },
      { letter: "ش", bg: "bg-[#1d4ed8]", text: "text-white" },
      { letter: "م", bg: "bg-[#0d658a]", text: "text-white" },
      { letter: "د", bg: "bg-[#0f172a]", text: "text-white" },
    ],
    date: "22 أكتوبر 2023",
    time: "11:45 ص",
    status: "review",
    statusLabel: "قيد المراجعة",
    winner: "قيد التحديد",
    winnerMeta: "موافقة م. المالي",
    winnerTone: "review",
    exceptional: true,
  },
  {
    id: "4",
    cmpRef: "CMP-2023-095",
    prRef: "PR-2023-134",
    rfqId: "4",
    vendorCount: 3,
    vendorAvatars: [
      { letter: "ف", bg: "bg-[#cbd5e1]", text: "text-[#1e293b]" },
      { letter: "ن", bg: "bg-[#0d658a]", text: "text-white" },
      { letter: "د", bg: "bg-[#0f172a]", text: "text-white" },
    ],
    date: "25 أكتوبر 2023",
    time: "09:00 ص",
    status: "completed",
    statusLabel: "مكتملة",
    winner: "المتحدون الا",
    winnerMeta: "معتمد نهائياً",
    winnerTone: "muted",
    exceptional: false,
  },
  {
    id: "5",
    cmpRef: "CMP-2023-120",
    prRef: "PR-2023-150",
    rfqId: "5",
    vendorCount: 4,
    vendorAvatars: [
      { letter: "ل", bg: "bg-[#1d4ed8]", text: "text-white" },
      { letter: "د", bg: "bg-[#0d658a]", text: "text-white" },
      { letter: "م", bg: "bg-[#0f172a]", text: "text-white" },
      { letter: "س", bg: "bg-[#1e3a8a]", text: "text-white" },
    ],
    date: "28 أكتوبر 2023",
    time: "04:30 م",
    status: "review",
    statusLabel: "قيد المراجعة",
    winner: "قيد التحديد",
    winnerMeta: "التقييم الفني",
    winnerTone: "review",
    exceptional: false,
  },
];

const compareHref = (rfqId) =>
  `/accounts/Purches/quote-requests/${rfqId}/compare`;

const VendorAvatarStack = ({ avatars, count }) => (
  <div className="flex items-center justify-center gap-2.5" dir="ltr">
    <div className="inline-flex items-center">
      {avatars.map((av, idx) => (
        <span
          key={`stack-${idx}-${av.letter}`}
          className={`relative flex size-[30px] shrink-0 items-center justify-center rounded-full border-[2.5px] border-white text-[11px] font-bold leading-none shadow-[0_0_0_1px_rgba(15,23,42,0.06)] ${av.bg} ${av.text} ${
            idx > 0 ? "-ml-[11px]" : ""
          }`}
          style={{ zIndex: avatars.length - idx }}
        >
          {av.letter}
        </span>
      ))}
    </div>
    <span className="whitespace-nowrap text-[12px] font-medium text-[#94A3B8]">
      ({count} موردين)
    </span>
  </div>
);

const WinnerMeta = ({ tone, meta }) => {
  if (tone === "teal") {
    return (
      <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-[#15803D]">
        <FiCheck className="size-3 shrink-0" />
        {meta}
      </span>
    );
  }
  if (tone === "review") {
    return (
      <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#D97706]">
        {meta}
      </span>
    );
  }
  return (
    <span className="mt-1 block text-[11px] font-medium text-[#94A3B8]">
      {meta}
    </span>
  );
};

const ComparisonsArchive = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [comparisonType, setComparisonType] = useState("all");
  const [dateRange] = useState("2023/10/01 - 2023/10/31");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    return comparisonRows.filter((row) => {
      if (status !== "all" && row.status !== status) return false;
      if (comparisonType === "exceptional" && !row.exceptional) return false;
      if (comparisonType === "competitive" && row.exceptional) return false;
      if (!query.trim()) return true;
      const q = query.trim();
      return (
        row.cmpRef.includes(q) ||
        row.prRef.includes(q) ||
        (row.winner && row.winner.includes(q))
      );
    });
  }, [query, status, comparisonType]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const pageRows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, pageSize, safePage]);

  const rangeStart =
    filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const rangeEnd = Math.min(safePage * pageSize, filtered.length);

  const pageNumbers = useMemo(() => {
    const maxButtons = 3;
    let start = Math.max(1, safePage - 1);
    let end = Math.min(totalPages, start + maxButtons - 1);
    start = Math.max(1, end - maxButtons + 1);
    const pages = [];
    for (let i = start; i <= end; i += 1) pages.push(i);
    return pages;
  }, [safePage, totalPages]);

  const handleReset = () => {
    setQuery("");
    setStatus("all");
    setComparisonType("all");
    setPage(1);
  };

  return (
    <div dir="rtl" className="flex flex-col gap-5 pb-8 text-[#1E293B]">
      <div className="mt-4 flex justify-end">
        <Link
          href={vendorQuotesHref}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary"
        >
          الرجوع إلى عروض الموردين
          <FiChevronLeft className="size-4" />
        </Link>
      </div>

      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-[#4D5461] sm:text-[32px] sm:leading-[44px]">
            أرشيف مقارنات المشتريات
          </h1>
          <span className="inline-flex h-9 items-center rounded-lg bg-[#E8F3FA] px-3 text-sm font-bold text-primary">
            {comparisonsTotal} مقارنة مسجلة
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => window.print?.()}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#334155] px-4 text-sm font-bold text-white shadow-card transition hover:bg-[#1E293B]"
          >
            <FiPrinter className="size-[18px]" />
            طباعة التقرير
          </button>

          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#86EFAC] bg-white px-4 text-sm font-semibold text-[#15803D] shadow-card transition hover:bg-[#F0FDF4]"
          >
            <HiOutlineDocumentArrowDown className="size-[18px]" />
            تصدير Excel
          </button>
        </div>
      </header>

      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-card sm:p-5">
        <div className="grid grid-cols-1 items-end gap-3 lg:grid-cols-12">
          {/* البحث المباشر */}
          <div className="lg:col-span-4">
            <label className="mb-1.5 block text-xs font-semibold text-[#64748B]">
              البحث المباشر
            </label>
            <div className="relative">
              <FiSearch className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="بحث برقم طلب الشراء أو اسم المورد..."
                className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] py-2 pe-3 ps-10 text-sm text-[#1E293B] placeholder-[#94A3B8] focus:border-primary focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* الحالة */}
          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold text-[#64748B]">
              الحالة
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="h-11 w-full appearance-none rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
              >
                <option value="all">الكل</option>
                <option value="completed">مكتملة</option>
                <option value="review">قيد المراجعة</option>
              </select>
              <FiChevronDown className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[#94A3B8]" />
            </div>
          </div>

          {/* نوع المقارنة */}
          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold text-[#64748B]">
              نوع المقارنة
            </label>
            <div className="relative">
              <select
                value={comparisonType}
                onChange={(e) => {
                  setComparisonType(e.target.value);
                  setPage(1);
                }}
                className="h-11 w-full appearance-none rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
              >
                <option value="all">الكل</option>
                <option value="competitive">تنافسية</option>
                <option value="exceptional">استثنائية</option>
              </select>
              <FiChevronDown className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[#94A3B8]" />
            </div>
          </div>

          {/* النطاق الزمني + تطبيق + إعادة ضبط */}
          <div className="flex items-end gap-2 lg:col-span-4">
            <div className="min-w-0 flex-1">
              <label className="mb-1.5 block text-xs font-semibold text-[#64748B]">
                النطاق الزمني
              </label>
              <span className="inline-flex h-11 w-full items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm text-[#475569]">
                <FiCalendar className="size-4 shrink-0 text-primary" />
                {dateRange}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setPage(1)}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-card transition hover:bg-primary-dark"
            >
              <FiFilter className="size-4" />
              تطبيق
            </button>

            <button
              type="button"
              onClick={handleReset}
              aria-label="إعادة ضبط الفلاتر"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#64748B] shadow-card transition hover:bg-surface"
            >
              <FiRotateCcw className="size-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-sm">
            <thead>
              <tr className="border-b border-[#E8ECF1] bg-[#F8FAFC] text-[13px] font-semibold text-[#64748B]">
                <th className="px-4 py-3.5 text-start">رقم المقارنة</th>
                <th className="px-4 py-3.5 text-start">مرجع طلب الشراء</th>
                <th className="px-4 py-3.5 text-center">الموردين المقارنين</th>
                <th className="px-4 py-3.5 text-center">التاريخ والوقت</th>
                <th className="px-4 py-3.5 text-center">الحالة</th>
                <th className="px-4 py-3.5 text-start">المورد الفائز</th>
                <th className="px-4 py-3.5 text-center">الإجراءات</th>
              </tr>
            </thead>

            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-14 text-center text-sm text-[#64748B]"
                  >
                    لا توجد مقارنات مطابقة للفلاتر الحالية.
                  </td>
                </tr>
              ) : null}
              {pageRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#EEF2F6] align-middle transition hover:bg-[#FAFCFE]"
                >
                  <td className="px-4 py-[18px]">
                    <button
                      type="button"
                      onClick={() => router.push(compareHref(row.rfqId))}
                      className="inline-flex items-center gap-1.5 font-mono text-[13px] font-bold text-primary hover:underline"
                    >
                      <span>{row.cmpRef}</span>
                      <FiFileText className="size-3.5 shrink-0 text-[#94A3B8]" />
                    </button>
                  </td>

                  <td className="px-4 py-[18px]">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="shrink-0 font-mono text-[13px] font-bold text-[#475569]">
                        {row.prRef}
                      </span>
                      {row.exceptional ? (
                        <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#FCD34D] bg-[#FFFBEB] px-2.5 py-1 text-[10px] font-bold leading-none text-[#C2410C]">
                          <FiAlertTriangle className="size-3 shrink-0 text-[#EA580C]" />
                          تحتوي عرضاً استثنائياً
                        </span>
                      ) : null}
                    </div>
                  </td>

                  <td className="px-4 py-[18px]">
                    <VendorAvatarStack
                      avatars={row.vendorAvatars}
                      count={row.vendorCount}
                    />
                  </td>

                  <td className="px-4 py-[18px] text-center text-[12px] font-semibold text-[#475569]">
                    <span className="text-[#1E293B]">{row.date}</span>
                    <span className="mx-1.5 text-[#CBD5E1]">|</span>
                    <span className="text-[#64748B]">{row.time}</span>
                  </td>

                  {/* الحالة */}
                  <td className="px-4 py-4 text-center">
                    {row.status === "completed" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#A7E9C4] bg-[#E3F8EC] px-2.5 py-1 text-[12px] font-bold text-[#0F7A4A]">
                        <span className="size-1.5 rounded-full bg-[#10B981]" />
                        مكتملة
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FCD34D] bg-[#FFFBEB] px-2.5 py-1 text-[12px] font-bold text-[#B45309]">
                        <span className="size-1.5 rounded-full bg-[#F59E0B]" />
                        قيد المراجعة
                      </span>
                    )}
                  </td>

                  {/* المورد الفائز */}
                  <td className="px-4 py-[18px]">
                    <p className="text-[13px] font-extrabold leading-snug text-[#0F172A]">
                      {row.winner}
                    </p>
                    <WinnerMeta tone={row.winnerTone} meta={row.winnerMeta} />
                  </td>

                  <td className="px-4 py-[18px] text-center">
                    <button
                      type="button"
                      onClick={() => router.push(compareHref(row.rfqId))}
                      aria-label={`عرض ${row.cmpRef}`}
                      className="mx-auto flex size-8 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#64748B] transition hover:border-primary hover:bg-[#F0F9FF] hover:text-primary"
                    >
                      <FiEye className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 items-center gap-3 border-t border-[#E8ECF1] bg-white px-5 py-3.5 lg:grid-cols-3">
          <p className="text-center text-[12px] font-semibold text-[#64748B] lg:text-start">
            {filtered.length === 0 ? (
              "لا توجد نتائج"
            ) : (
              <>
                عرض{" "}
                <strong className="font-extrabold text-[#1E293B]">
                  {rangeStart}
                </strong>{" "}
                إلى{" "}
                <strong className="font-extrabold text-[#1E293B]">
                  {rangeEnd}
                </strong>{" "}
                من أصل{" "}
                <strong className="font-extrabold text-[#1E293B]">
                  {comparisonsTotal}
                </strong>{" "}
                مقارنة
              </>
            )}
          </p>

          <label className="flex items-center justify-center gap-2 text-[12px] font-semibold text-[#64748B]">
            <span>عرض</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="h-8 min-w-[3rem] rounded-md border border-[#E2E8F0] bg-white px-2 text-[12px] font-bold text-[#1E293B]"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span>صف لكل صفحة</span>
          </label>

          <nav
            aria-label="الترقيم"
            className="flex items-center justify-center gap-1 lg:justify-end"
          >
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex size-8 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] disabled:opacity-40"
                aria-label="السابق"
              >
                <FiChevronRight className="size-4" />
              </button>
              {pageNumbers.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`flex size-8 items-center justify-center rounded-lg text-sm font-semibold ${
                    safePage === n
                      ? "bg-primary text-white"
                      : "border border-[#E2E8F0] text-[#475569]"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="flex size-8 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] disabled:opacity-40"
                aria-label="التالي"
              >
                <FiChevronLeft className="size-4" />
              </button>
            </nav>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-[#BAE6FD] bg-[#F0F9FF] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E0F2FE] text-primary">
            <FiInfo className="size-5" />
          </span>
          <div>
            <p className="text-sm font-bold text-[#0C4A6E]">
              تنبيه الرقابة والحوكمة المؤسسية
            </p>
            <p className="mt-1 max-w-3xl text-[13px] leading-6 text-[#0369A1]">
              <strong>2 من المقارنات</strong> في هذا الأرشيف تحتوي على عروض
              استثنائية غير مرتبطة بطلبات عروض أسعار رسمية — يُنصح بمراجعتها
              دورياً من الرقابة الداخلية.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 text-[13px] font-bold text-primary shadow-card"
        >
          عرض تقرير الاستثناءات والرقابة
          <FiArrowLeft className="size-4" />
        </button>
      </section>
    </div>
  );
};

export default ComparisonsArchive;