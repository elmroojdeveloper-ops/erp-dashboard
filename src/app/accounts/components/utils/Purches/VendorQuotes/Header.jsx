"use client";

import { FiBarChart2, FiDownload, FiPlus } from "react-icons/fi";

const Header = ({ onCreate, onCompare, onExport, compareCount = 3, totalCount = 24 }) => {
  return (
    <section className="flex mt-6 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* العنوان (يمين) */}
      <h1 className="text-2xl font-bold tracking-tight text-[#4D5461] sm:text-[32px] sm:leading-[44px]">
        سجل عروض أسعار الموردين
      </h1>

      {/* الأزرار (يسار) */}
      <div className="flex flex-wrap items-center gap-3">
        {/* محدث تلقائياً */}
        <div className="inline-flex h-11 items-center gap-2.5 rounded-xl border border-[#E2E8F0] bg-white py-1.5 pe-3 ps-1.5 shadow-card">
          <span className="rounded-lg bg-[#E8F3FA] px-3 py-1 text-sm font-bold text-primary">
            {totalCount} عرض
          </span>
          <span className="size-2 rounded-full bg-[#10B981]" />
          <span className="text-sm text-[#64748B]">محدث تلقائيا</span>
        </div>

        {/* إضافة عرض سعر جديد */}
        <button
          type="button"
          onClick={onCreate}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-card transition hover:bg-primary-dark"
        >
          إضافة عرض سعر جديد
          <FiPlus className="size-5" />
        </button>

        {/* مقارنة العروض */}
        <button
          type="button"
          onClick={onCompare}
          className="inline-flex h-11 items-center gap-2 rounded-xl border-2 border-primary bg-white px-4 text-sm font-bold text-primary shadow-card transition hover:bg-surface"
        >
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            {compareCount}
          </span>
          <FiBarChart2 className="size-[18px]" />
          مقارنة العروض
        </button>

        {/* تصدير إكسل */}
        <button
          type="button"
          onClick={onExport}
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-medium text-[#64748B] shadow-card transition hover:bg-surface"
        >
          <FiDownload className="size-[18px]" />
          تصدير إكسل
        </button>
      </div>
    </section>
  );
};

export default Header;