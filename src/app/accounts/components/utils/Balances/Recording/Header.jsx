"use client";

import React from "react";
import { FiPlus } from "react-icons/fi";
import { MdOutlineVerifiedUser } from "react-icons/md";

const Header = ({
  title = "سجل عمليات الأرصدة الافتتاحية",
  subtitle = "متابعة جميع دفعات الأرصدة الافتتاحية وحالتها عبر السنوات المالية مع الرقابة والاعتماد ومطابقة التوازن المحاسبي المزدوج",
  onNewBatch,
  onChangeLog,
}) => {
  return (
    <div
      dir="rtl"
      className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
    >
      <div className="min-w-0 text-right">
        <h1 className="text-[22px] font-bold leading-8 text-[#1f1f1f] sm:text-[24px]">
          {title}
        </h1>
        <p className="mt-1.5 max-w-[640px] text-[12.5px] leading-5 text-[#6b7280]">
          {subtitle}
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={onNewBatch}
          className="inline-flex h-10 items-center gap-2 rounded-[6px] bg-[#237B9F] px-4 text-[13px] font-bold text-white transition hover:bg-[#1B6280]"
        >
          <FiPlus className="size-4 stroke-[2.5]" />
          <span>بدء أرصدة افتتاحية جديدة</span>
        </button>

        <button
          type="button"
          onClick={onChangeLog}
          className="inline-flex h-10 items-center gap-2 rounded-[6px] border border-[#D7DEE5] bg-[#EEF2F5] px-4 text-[13px] font-semibold text-[#3d4a54] transition hover:bg-[#E6ECF1]"
        >
          <MdOutlineVerifiedUser className="size-4 text-[#237B9F]" />
          <span>سجل التغييرات الشامل</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
