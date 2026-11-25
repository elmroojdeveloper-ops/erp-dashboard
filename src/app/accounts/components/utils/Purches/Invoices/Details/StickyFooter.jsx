"use client";

import Link from "next/link";
import { FiArrowLeft, FiCheckCircle, FiFile, FiPrinter } from "react-icons/fi";

const listHref = "/accounts/Purches/invoices";

const StickyFooter = ({ footer }) => {
  if (!footer) return null;

  return (
    <footer className="sticky bottom-0 z-20 -mx-1 mt-2 border-t border-[#E2E8F0] bg-white/95 px-3 py-3 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <p className="text-[10px] font-medium text-[#64748B]">{footer.netLabel}</p>
            <p className="text-[22px] font-bold text-[#1B4D6E]">
              {footer.total}{" "}
              <span className="text-[13px] font-semibold text-[#64748B]">
                {footer.currency}
              </span>
            </p>
          </div>
          <span className="hidden h-10 w-px bg-[#E2E8F0] lg:block" aria-hidden />
          <div>
            <p className="text-[10px] font-medium text-[#64748B]">المستحق لصالح المورد</p>
            <p className="text-[14px] font-bold text-[#0F172A]">{footer.vendorShort}</p>
          </div>
        </div>

        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#B7DFC3] bg-[#E6F4EA] px-3 py-1 text-[11px] font-bold text-[#2E7D32]">
          <FiCheckCircle className="size-3.5" />
          {footer.statusLabel}
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={listHref}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] px-3.5 text-[12px] font-semibold text-[#475569]"
          >
            الرجوع للقائمة
            <FiArrowLeft className="size-3.5" />
          </Link>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[#B8D9EB] bg-white px-3.5 text-[12px] font-semibold text-[#1B6A9C]"
          >
            <FiPrinter className="size-3.5" />
            طباعة إشعار الصرف
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[#B8D9EB] bg-white px-3.5 text-[12px] font-semibold text-[#1B6A9C]"
          >
            <FiFile className="size-3.5" />
            تحميل الحزمة الضريبية (ZIP)
          </button>
        </div>
      </div>
    </footer>
  );
};

export default StickyFooter;