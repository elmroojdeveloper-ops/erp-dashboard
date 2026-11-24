"use client";

import React from "react";
import {
  FiCalendar,
  FiCheck,
  FiExternalLink,
  FiLock,
} from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";

const Chip = ({ children, className = "" }) => (
  <span
    className={`inline-flex h-[32px] items-center gap-1.5 rounded-[8px] border px-2.5 text-[11px] font-semibold shadow-[0_1px_2px_rgba(15,23,42,0.03)] ${className}`}
  >
    {children}
  </span>
);

const MetaBar = ({
  fiscalYear = "2026",
  balanceDate = "01/01/2026 م",
  batchCode = "JV-2026-OPEN",
}) => {
  return (
    <div dir="rtl" className="flex flex-wrap items-center gap-2">
      <Chip className="border-[#C5DFF0] bg-[#EAF4F9] text-[#1F6F8F]">
        <FiLock className="size-3 shrink-0" />
        السنة المالية: {fiscalYear} م (السنة الجارية)
      </Chip>

      <Chip className="border-[#E6ECEF] bg-white text-[#475569]">
        <FiCalendar className="size-3 shrink-0 text-[#64748B]" />
        تاريخ الرصيد: {balanceDate}
      </Chip>

      <Chip className="border-[#E6ECEF] bg-white text-[#334155]">
        <FiExternalLink className="size-3 shrink-0 text-[#64748B]" />
        رمز القيد:{" "}
        <span className="font-bold text-[#237B9F]" dir="ltr">
          {batchCode}
        </span>
      </Chip>

      <Chip className="border-[#B7E4CB] bg-[#E8F7EF] text-[#0B6B45]">
        <FiLock className="size-3 shrink-0" />
        معتمد ومقفل بالكامل
        <FiCheck className="size-3 stroke-[2.5]" />
      </Chip>

      <Chip className="border-[#86EFAC] bg-[#16A34A] text-white">
        <MdOutlineVerified className="size-3.5 shrink-0" />
        مطابق للربط والتوثيق الزكوي (ZATCA)
      </Chip>
    </div>
  );
};

export default MetaBar;
