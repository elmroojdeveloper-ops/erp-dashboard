"use client";

import { FiDownload, FiPlus } from "react-icons/fi";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

const Header = ({ onCreate }) => {
  return (
    <section className="rounded-xl bg-white p-4 shadow-card sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
              طلبات عروض الأسعار
            </h1>
            <span className="inline-flex items-center rounded-full bg-[#E8F4FC] px-2.5 py-1 text-[11px] font-bold text-[#1B7398]">
              42 نشط
            </span>
            <span className="inline-flex items-center rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[11px] font-semibold text-[#64748B]">
              المرحلة الثانية: دورة المشتريات والتعميد
            </span>
          </div>
          <p className="mt-2 max-w-3xl text-sm text-[#64748B] sm:text-[15px]">
            إدارة ومتابعة طلبات عروض الأسعار (RFQ) الصادرة للموردين المعتمدين.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
        <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-primary bg-white px-3.5 text-sm font-medium text-primary transition hover:bg-surface"
          >
            <FiDownload className="size-5" />
            تحميل PDF
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-3.5 text-sm font-medium text-[#475569] transition hover:bg-surface"
          >
            <HiOutlineClipboardDocumentCheck className="size-5" />
            إنشاء تدقيق
          </button>
          <button
            type="button"
            onClick={onCreate}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-3.5 text-sm font-medium text-white transition hover:bg-primary-dark"
          >
            <FiPlus className="size-5" />
            إنشاء طلب عرض سعر جديد
          </button>
      
      
        </div>
      </div>
    </section>
  );
};

export default Header;
