"use client";

import React from "react";
import { FiArrowDownLeft, FiArrowUpRight, FiCheck } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";
import { HiOutlineScale } from "react-icons/hi2";
import { LuChartColumnIncreasing } from "react-icons/lu";

const SummaryCards = ({
  debitTotal = "54,225,000.00",
  creditTotal = "54,225,000.00",
  debitAccounts = 18,
  approvedAt = "02/01/2026 م - 10:45 ص",
  approver = "أحمد المحاسب (مدير مالي)",
}) => {
  return (
    <div dir="rtl" className="space-y-3">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {/* مدين */}
        <div className="rounded-[12px] border border-[#E8EEF2] bg-white px-4 py-3.5 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 text-right">
              <p className="text-[12px] font-medium text-[#64748B]">
                إجمالي الرصيد المدين
              </p>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span
                  className="text-[22px] font-extrabold tracking-tight text-[#0F172A]"
                  dir="ltr"
                >
                  {debitTotal}
                </span>
                <span className="text-[12px] font-bold text-[#94A3B8]">ر.س</span>
              </div>
              <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#64748B]">
                <LuChartColumnIncreasing className="size-3.5 text-[#237B9F]" />
                الطرف المدين للقيد الافتتاحي ({debitAccounts} حساباً)
              </div>
            </div>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[#E8F1F8] text-[#2563EB]">
              <FiArrowUpRight className="size-4" />
            </span>
          </div>
        </div>

        {/* دائن */}
        <div className="rounded-[12px] border border-[#E8EEF2] bg-white px-4 py-3.5 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 text-right">
              <p className="text-[12px] font-medium text-[#64748B]">
                إجمالي الرصيد الدائن
              </p>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span
                  className="text-[22px] font-extrabold tracking-tight text-[#0F172A]"
                  dir="ltr"
                >
                  {creditTotal}
                </span>
                <span className="text-[12px] font-bold text-[#94A3B8]">ر.س</span>
              </div>
              <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0B6B45]">
                <span className="inline-flex size-3.5 items-center justify-center rounded-full bg-[#D1FAE5]">
                  <FiCheck className="size-2.5 stroke-[3]" />
                </span>
                متوافق مع المعايير الدولية IFRS
              </div>
            </div>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[#E8F5EE] text-[#0B6B45]">
              <FiArrowDownLeft className="size-4" />
            </span>
          </div>
        </div>

        {/* اعتماد */}
        <div className="rounded-[12px] border border-[#E8EEF2] bg-white px-4 py-3.5 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 text-right">
              <p className="text-[12px] font-medium text-[#64748B]">
                تاريخ الاعتماد المالي
              </p>
              <p className="mt-2 text-[17px] font-extrabold leading-7 text-[#0F172A]">
                {approvedAt}
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px] text-[#64748B]">
                <span>
                  المعتمد:{" "}
                  <span className="font-bold text-[#334155]">{approver}</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF4F9] px-2 py-0.5 text-[10px] font-bold text-[#1F6F8F]">
                  <MdOutlineVerified className="size-3" />
                  موثق
                </span>
              </div>
            </div>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[#EAF4F9] text-[#237B9F]">
              <MdOutlineVerified className="size-4" />
            </span>
          </div>
        </div>
      </div>

      {/* شريط التوازن — أخضر صلب */}
      <div className="inline-flex items-center gap-2 rounded-full bg-[#0B6B45] px-4 py-2 text-[12.5px] font-bold text-white shadow-[0_2px_8px_rgba(11,107,69,0.25)]">
        <HiOutlineScale className="size-4 shrink-0" />
        <span>توازن تام: 0.00 ر.س (الفارق المحاسبي: صفر)</span>
      </div>
    </div>
  );
};

export default SummaryCards;
