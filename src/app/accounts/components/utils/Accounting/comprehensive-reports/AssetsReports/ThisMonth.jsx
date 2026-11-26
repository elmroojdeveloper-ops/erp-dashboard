"use client";

import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { LuBuilding2, LuFileText } from "react-icons/lu";

const ThisMonth = ({
  statusBadge = "قيد معتمد",
  netBookValue = "19,420,500",
  currency = "ر.س",
  coverageText = "تغطي 78.1% من إجمالي القيمة الشرائية التاريخية للأصول",
  tangibleAmount = "17,250,000",
  tangibleShare = "88.8%",
  tangibleNote = "مبان، آلات، أسطول نقل، حواسب",
  intangibleAmount = "2,170,500",
  intangibleShare = "11.2%",
  intangibleNote = "تراخيص، برمجيات، براءات اختراع",
  complianceTitle = "متوافق مع معيار المحاسبة الدولي IAS 16",
  complianceSubtitle = "معتمد ومطابق لتعليمات الهيئة السعودية للمراجعين والمحاسبين (SOCPA)",
}) => {
  return (
    <section
      dir="rtl"
      className="flex h-full flex-col justify-between rounded-[22px] border border-[#e6ecf2] bg-white p-5 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      <div>
        {/* Top Row: Title on Right, Status Pill on Left */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-[15.5px] font-black leading-[1.35] text-[#0f172a]">
            صافي القيمة الدفترية الإجمالية
          </h2>

          <span className="shrink-0 rounded-full bg-[#eefaf3] px-2.5 py-0.5 text-[10.5px] font-extrabold text-[#047857]">
            {statusBadge}
          </span>
        </div>

        {/* Main KPI Value */}
        <div className="mt-3 flex items-baseline gap-1.5 leading-none text-right">
          <span className="text-[31px] font-black tracking-tight text-[#0f172a]">
            {netBookValue}
          </span>
          <span className="text-[13px] font-bold text-[#64748b]">
            {currency}
          </span>
        </div>

        {/* Coverage Row */}
        <div className="mt-2.5 flex items-center gap-1.5 text-right text-[11px] font-semibold leading-[1.4] text-[#64748b]">
          <FiCheckCircle className="h-3.5 w-3.5 shrink-0 text-[#047857]" />
          <span>{coverageText}</span>
        </div>

        <div className="my-3.5 border-t border-[#f1f5f9]" />

        {/* Breakdown Rows */}
        <div className="space-y-3.5">
          {/* أصول رأسمالية ملموسة */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <div className="text-right leading-tight">
                <div className="text-[12.5px] font-black text-[#086382]">
                  {tangibleAmount}
                </div>
                <div className="text-[11px] font-bold text-[#086382]">
                  {currency}
                </div>
              </div>

              <div className="flex items-start gap-2 text-right">
                <div>
                  <div className="text-[12px] font-extrabold text-[#0f172a]">
                    أصول رأسمالية ملموسة
                  </div>
                  <div className="mt-0.5 text-[10.5px] font-medium text-[#64748b]">
                    {tangibleNote}
                  </div>
                </div>
                <LuBuilding2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#086382]" />
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2.5">
              <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#e2e8f0]">
                <div
                  className="h-full rounded-full bg-[#086382]"
                  style={{ width: tangibleShare }}
                />
              </div>
              <span className="shrink-0 text-[10.5px] font-extrabold text-[#086382]">
                {tangibleShare}
              </span>
            </div>
          </div>

          {/* أصول غير ملموسة */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <div className="text-right leading-tight">
                <div className="text-[12.5px] font-black text-[#0f172a]">
                  {intangibleAmount} {currency}
                </div>
              </div>

              <div className="flex items-start gap-2 text-right">
                <div>
                  <div className="text-[12px] font-extrabold text-[#0f172a]">
                    أصول غير ملموسة
                  </div>
                  <div className="mt-0.5 text-[10.5px] font-medium text-[#64748b]">
                    {intangibleNote}
                  </div>
                </div>
                <LuFileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#64748b]" />
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2.5">
              <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#e2e8f0]">
                <div
                  className="h-full rounded-full bg-[#64748b]"
                  style={{ width: intangibleShare }}
                />
              </div>
              <span className="shrink-0 text-[10.5px] font-bold text-[#64748b]">
                {intangibleShare}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Compliance Box */}
      <div className="mt-4 rounded-[12px] bg-[#f1f9f5] px-3.5 py-2.5 text-right">
        <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#047857]">
          <FiCheckCircle className="h-3.5 w-3.5 shrink-0 text-[#059669]" />
          <span>{complianceTitle}</span>
        </div>
        <p className="mt-1 text-[10px] font-medium leading-[1.45] text-[#64748b]">
          {complianceSubtitle}
        </p>
      </div>
    </section>
  );
};

export default ThisMonth;
