"use client";

import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { LuWallet, LuSettings2, LuFilePen } from "react-icons/lu";

const ThisMonth = ({
  monthLabel = "سبتمبر",
  yearLabel = "2024",
  totalAmount = "28,450,900",
  currency = "ر.س",
  description = "تغطي إجمالي الحركات المدينة والدائنة لشهر سبتمبر بعد المطابقة الإدارية",
  autoPercent = "81.3%",
  manualPercent = "18.7%",
  autoAmount = "23,120,400",
  autoShare = "81.3% من الإجمالي",
  autoCount = "3,918 قيد آلي",
  manualAmount = "5,330,500",
  manualShare = "18.7% من الإجمالي",
  manualCount = "902 قيد يدوي",
  complianceNote = "متطابق مع ميزان المراجعة والربط الضريبي لمنظومة زاتكا ZATCA",
}) => {
  const autoShareParts = autoShare.split(" من ");
  const manualShareParts = manualShare.split(" من ");

  return (
    <section
      dir="rtl"
      className="flex h-full flex-col justify-between rounded-[24px] border border-[#e6ecf2] bg-white p-5 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      <div>
        {/* Header Row: Wallet Icon + Title on Right, Month Badge on Left */}
        <div className="flex items-start justify-between gap-3 border-b border-[#f1f5f9] pb-4">
          <div className="flex items-start gap-2.5">
            <LuWallet className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#095c7a]" />
            <h2 className="text-[16px] font-black leading-[1.35] text-[#0f172a]">
              إجمالي قيمة القيود هذا الشهر
            </h2>
          </div>

          <div className="shrink-0 rounded-[12px] bg-[#bae6fd]/75 px-3.5 py-2 text-center leading-[1.2]">
            <span className="block text-[12px] font-extrabold text-[#0f172a]">
              {monthLabel}
            </span>
            <span className="mt-0.5 block text-[11px] font-bold text-[#64748b]">
              {yearLabel}
            </span>
          </div>
        </div>

        {/* Main KPI Amount & Subtitle */}
        <div className="pt-4 text-right">
          <div className="flex items-baseline gap-1.5 leading-none">
            <span className="text-[34px] font-black tracking-tight text-[#086382]">
              {totalAmount}
            </span>
            <span className="text-[17px] font-extrabold text-[#334155]">
              {currency}
            </span>
          </div>

          <p className="mt-2.5 text-[12.5px] font-medium leading-[1.6] text-[#64748b]">
            {description}
          </p>
        </div>

        {/* Ratio Labels & Segmented Progress Bar */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-[12px] font-extrabold">
            <span className="text-[#095c7a]">قيود آلية: {autoPercent}</span>
            <span className="text-[#64748b]">قيود يدوية: {manualPercent}</span>
          </div>

          <div className="flex h-[10px] w-full overflow-hidden rounded-full bg-[#e2e8f0]">
            <div
              className="h-full rounded-r-full bg-[#cbd5e1]"
              style={{ width: manualPercent }}
            />
            <div
              className="h-full rounded-l-full bg-[#086382]"
              style={{ width: autoPercent }}
            />
          </div>
        </div>

        {/* Breakdown Cards */}
        <div className="mt-5 space-y-3">
          {/* Auto Entries Box */}
          <div className="flex items-center justify-between gap-3 rounded-[16px] bg-[#f4f8fb] px-4 py-3.5">
            <div className="text-right">
              <div className="text-[15px] font-black leading-[1.3] text-[#086382]">
                {autoAmount}
              </div>
              <div className="text-[13px] font-extrabold leading-[1.3] text-[#086382]">
                {currency}
              </div>
              <div className="mt-1 text-[11.5px] font-semibold leading-[1.35] text-[#64748b]">
                <span className="block">{autoShareParts[0]} من</span>
                <span className="block">{autoShareParts[1] || "الإجمالي"}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[13.5px] font-black leading-[1.35] text-[#1e293b]">
                  <span className="block">قيود آلية (نظام</span>
                  <span className="block">ومستودعات)</span>
                </div>
                <div className="mt-1 text-[12.5px] font-bold text-[#64748b]">
                  {autoCount}
                </div>
              </div>

              <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] bg-[#e2edf4] text-[#095c7a]">
                <LuSettings2 className="h-[18px] w-[18px]" />
              </div>
            </div>
          </div>

          {/* Manual Entries Box */}
          <div className="flex items-center justify-between gap-3 rounded-[16px] bg-[#f4f8fb] px-4 py-3.5">
            <div className="text-right">
              <div className="text-[15px] font-black leading-[1.3] text-[#334155]">
                {manualAmount}
              </div>
              <div className="text-[13px] font-extrabold leading-[1.3] text-[#334155]">
                {currency}
              </div>
              <div className="mt-1 text-[11.5px] font-semibold leading-[1.35] text-[#64748b]">
                <span className="block">{manualShareParts[0]} من</span>
                <span className="block">{manualShareParts[1] || "الإجمالي"}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[13.5px] font-black leading-[1.35] text-[#1e293b]">
                  <span className="block">قيود يدوية وتسويات</span>
                  <span className="block">محاسبية</span>
                </div>
                <div className="mt-1 text-[12.5px] font-bold text-[#64748b]">
                  {manualCount}
                </div>
              </div>

              <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] bg-[#e2e8f0] text-[#475569]">
                <LuFilePen className="h-[18px] w-[18px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Compliance Box */}
      <div className="mt-4 flex items-center justify-between gap-2.5 rounded-[14px] bg-[#f1f9f5] px-4 py-3 text-right text-[12px] font-extrabold leading-[1.45] text-[#047857]">
        <span>{complianceNote}</span>
        <FiCheckCircle className="h-[17px] w-[17px] shrink-0 text-[#059669]" />
      </div>
    </section>
  );
};

export default ThisMonth;