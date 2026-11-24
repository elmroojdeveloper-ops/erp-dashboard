"use client";

import Link from "next/link";
import {
  FiArrowLeft,
  FiCheck,
  FiDownload,
  FiEdit2,
  FiTrash2,
  FiXCircle,
} from "react-icons/fi";
import { HiOutlineCalendar } from "react-icons/hi2";
import { LuArrowLeftRight } from "react-icons/lu";
import { statusLabels, statusStyles } from "../mock-data";

const Header = ({ data }) => {
  return (
    <section className="rounded-[14px] border border-[#E8EEF2] bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-4 border-b border-[#E8EEF2] pb-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-[20px] font-bold text-primary sm:text-[22px]">
              {data.number}
            </h1>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold ${
                statusStyles[data.status] || "bg-gray-100 text-gray-600"
              }`}
            >
              {data.status === "approved" && <FiCheck className="size-3.5" />}
              {statusLabels[data.status] || data.status}
            </span>
          </div>
          <p className="mt-2 text-sm text-[#64748B] sm:text-[15px]">
            {data.title}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-primary px-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            <FiDownload className="size-4" />
            تحميل PDF
          </button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-[10px] border border-[#E2E8F0] bg-white text-[#475569] transition hover:bg-[#F8FAFC]"
            aria-label="تعديل"
          >
            <FiEdit2 className="size-4" />
          </button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-[10px] border border-[#FECACA] bg-white text-[#EF4444] transition hover:bg-[#FEF2F2]"
            aria-label="حذف"
          >
            <FiTrash2 className="size-4" />
          </button>
          <Link
            href="/accounts/Purches"
            className="inline-flex h-10 items-center gap-1.5 px-2 text-sm font-bold text-primary"
          >
            الرجوع
            <FiArrowLeft className="size-4" />
          </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-[12px] bg-[#F0F5F9] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            <LuArrowLeftRight className="size-4" />
            تحويل إلى طلب عرض سعر
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-[#F87171] bg-white px-4 text-sm font-semibold text-[#EF4444] transition hover:bg-[#FEF2F2]"
          >
            <FiXCircle className="size-4" />
            إلغاء الموافقة
          </button>
        </div>

        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[13px] text-[#475569]">
            <HiOutlineCalendar className="size-4 shrink-0 text-[#64748B]" />
            تاريخ الإنشاء:{" "}
            <span className="font-semibold text-[#334155]">{data.createdAt}</span>
          </p>
          <p className="mt-1 text-[13px] text-[#64748B]">
            بواسطة:{" "}
            <span className="font-bold text-[#334155]">{data.createdBy}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Header;
