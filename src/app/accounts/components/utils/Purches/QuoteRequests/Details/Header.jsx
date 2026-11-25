"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiCalendar,
  FiCheck,
  FiClock,
  FiDownload,
  FiMonitor,
  FiPrinter,
  FiXCircle,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { LuArrowLeftRight } from "react-icons/lu";
import {
  quoteStatusLabels,
  quoteStatusStyles,
} from "../../Home/mock-data";

const listHref = "/accounts/Purches/quote-requests";

const StatusIcon = ({ status }) => {
  if (status === "selected") return <FiCheck className="size-3.5" />;
  if (status === "expired") return <FiClock className="size-3.5" />;
  if (status === "rejected") return <FiXCircle className="size-3.5" />;
  return <span className="size-1.5 rounded-full bg-current" />;
};

const Header = ({ data }) => {
  const router = useRouter();
  const statusLabel = quoteStatusLabels[data.status] || data.status;
  const statusStyle =
    quoteStatusStyles[data.status] || "bg-gray-100 text-gray-600";
  const compareHref = `${listHref}/${data.id || "1"}/compare`;

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full justify-end">
        <Link
          href={listHref}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1B6A9C]"
        >
          الرجوع إلى السجل
          <FiArrowLeft className="size-4" />
        </Link>
      </div>

      <section className="w-full rounded-[16px] border border-[#E5EDF2] bg-white px-5 py-5 shadow-[0_1px_3px_rgba(35,70,90,0.04)] sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-[20px] font-bold leading-8 text-[#1A2332] sm:text-[22px]">
                طلب عرض سعر رقم {data.number}
              </h1>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${statusStyle}`}
              >
                <StatusIcon status={data.status} />
                {statusLabel}
              </span>
            </div>

            {/* ميتا زي الديزاين */}
            <div className="mt-3.5 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[12px]">
              <div className="flex items-center gap-2 text-[#64748B]">
                <FiMonitor className="size-4 shrink-0 text-[#1B6A9C]" />
                <span>
                  تصنيف الشراء:{" "}
                  <span className="font-semibold text-[#475569]">
                    {data.category}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-[#64748B]">
                <FiClock className="size-4 shrink-0 text-[#D4A017]" />
                <span>
                  تاريخ الاستحقاق:{" "}
                  <span className="font-semibold text-[#C47A12]">
                    {data.dueDate}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-[#64748B]">
                <FiCalendar className="size-4 shrink-0 text-[#1B6A9C]" />
                <span>
                  تاريخ الطلب:{" "}
                  <span className="font-semibold text-[#475569]">
                    {data.requestDate}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-[#64748B]">
                <HiOutlineOfficeBuilding className="size-4 shrink-0 text-[#1B6A9C]" />
                <span>
                  القسم الطالب:{" "}
                  <span className="font-semibold text-[#475569]">
                    {data.department}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => router.push(compareHref)}
              className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-[#1B6A9C] px-4 text-[13px] font-bold text-white"
            >
              <LuArrowLeftRight className="size-4" />
              تحويل إلى أمر شراء
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-[#D5E0E7] bg-white px-3.5 text-[13px] font-semibold text-[#475569]"
            >
              <FiDownload className="size-4" />
              تحميل PDF
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-[#D5E0E7] bg-white px-3.5 text-[13px] font-semibold text-[#475569]"
            >
              <FiPrinter className="size-4" />
              طباعة
            </button>
          </div>
        </div>

        {/* تنبيه الاستثناء زي الديزاين */}
        {data.isException ? (
          <div className="mt-4 flex flex-col gap-3 rounded-[12px] border-2 border-[#F0D9A8] bg-[#FFF8E8] px-4 py-3.5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-2.5">
              <FiAlertTriangle className="mt-0.5 size-5 shrink-0 text-[#D4A017]" />
              <div className="min-w-0">
                <p className="text-[13px] font-bold leading-6 text-[#8A6A1E]">
                  {data.exceptionTitle ||
                    "مسار استثنائي — تم إنشاء هذا الطلب يدوياً بدون طلب شراء مرتبط (PR)"}
                </p>
                {data.exceptionReason ? (
                  <p className="mt-1 text-[12px] leading-5 text-[#A67C1A]">
                    سبب الاستثناء: {data.exceptionReason}
                  </p>
                ) : null}
                {data.exceptionDocLabel ? (
                  <div className="mt-2.5 rounded-[8px] border border-[#E8D4A8] bg-white px-3 py-2 text-[11px] leading-5 text-[#64748B]">
                    المسمى الموثق:{" "}
                    <span className="font-semibold text-[#475569]">
                      {data.exceptionDocLabel}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            {data.exceptionBadge ? (
              <span className="inline-flex shrink-0 self-start rounded-full border border-[#E8C87A] bg-[#FFF4D6] px-3 py-1 text-[11px] font-bold text-[#A16207]">
                {data.exceptionBadge}
              </span>
            ) : null}
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default Header;
