"use client";

import React from "react";
import { FiFileText, FiArrowLeft } from "react-icons/fi";

const cx = (...c) => c.filter(Boolean).join(" ");

const DEFAULT_CREDIT_NOTES_DATA = {
  title: "ملخص إشعارات الخصم والدائن (Credit Notes)",
  subtitle: "المردودات والتسويات المالية المعتمدة خلال الشهر الجاري",
  totalAmount: "42,850.00",
  currency: "ر.س",
  trendText: "↓ -18.5% مقارنة بالشهر السابق",
  issuedCount: "7 إشعارات",
  issuedBreakdown: "5 معتمدة • 2 قيد المراجعة",
  ratioLabel: "النسبة المئوية من إجمالي المبيعات:",
  ratioValue: "0.88%",
  maxLimitLabel: "(الحد الأقصى 2%)",
  reasons: [
    {
      id: "returns",
      label: "مردودات مبيعات وبضاعة تالفة (62%)",
      percent: 62,
      color: "#0e6787",
    },
    {
      id: "discount",
      label: "خصم ترويجي وتعديل أسعار (25%)",
      percent: 25,
      color: "#64748b",
    },
    {
      id: "billing_error",
      label: "تصحيح خطأ فوترة (13%)",
      percent: 13,
      color: "#cbd5e1",
    },
  ],
  footerPrefix: "كافة الإشعارات مرحّلة آليًا لدفتر الأستاذ",
  footerLinkLabel: "سجل الإشعارات العام",
};

const CreditNotesSummary = ({
  data = DEFAULT_CREDIT_NOTES_DATA,
  onViewLedger,
  className = "",
}) => {
  const {
    title,
    subtitle,
    totalAmount,
    currency,
    trendText,
    issuedCount,
    issuedBreakdown,
    ratioLabel,
    ratioValue,
    maxLimitLabel,
    reasons,
    footerPrefix,
    footerLinkLabel,
  } = data || DEFAULT_CREDIT_NOTES_DATA;

  return (
    <section
      dir="rtl"
      className={cx(
        "overflow-hidden rounded-[22px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      <div className="p-4 sm:p-5">
        {/* ===== الهيدر ===== */}
        <div className="flex items-start justify-between gap-3">
          <div className="text-right">
            <h2 className="text-[14px] font-extrabold leading-5 text-[#111827]">
              {title}
            </h2>
            <p className="mt-1 text-[11px] font-medium leading-[17px] text-[#6b7280]">
              {subtitle}
            </p>
          </div>
          <FiFileText size={16} className="mt-0.5 shrink-0 text-[#64748b]" />
        </div>

        {/* ===== البطاقتان العلويتان ===== */}
        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {/* إجمالي قيمة الإشعارات */}
          <div className="rounded-2xl bg-[#f1f5f9] p-3.5 text-right">
            <p className="text-[11px] font-semibold text-[#64748b]">
              إجمالي قيمة الإشعارات
            </p>
            <div className="mt-1.5 flex items-baseline gap-1">
              <span
                dir="ltr"
                className="text-[18px] font-extrabold leading-6 text-[#111827]"
              >
                {totalAmount}
              </span>
              <span className="text-[12px] font-bold text-[#64748b]">
                {currency}
              </span>
            </div>
            {trendText && (
              <p className="mt-1.5 text-[11px] font-bold leading-4 text-[#0d9448]">
                {trendText}
              </p>
            )}
          </div>

          {/* عدد الإشعارات الصادرة */}
          <div className="rounded-2xl bg-[#f1f5f9] p-3.5 text-right">
            <p className="text-[11px] font-semibold text-[#64748b]">
              عدد الإشعارات الصادرة
            </p>
            <p className="mt-1.5 text-[18px] font-extrabold leading-6 text-[#111827]">
              {issuedCount}
            </p>
            {issuedBreakdown && (
              <p className="mt-1.5 text-[11px] font-medium leading-4 text-[#64748b]">
                {issuedBreakdown}
              </p>
            )}
          </div>
        </div>

        {/* ===== صندوق النسبة المئوية من إجمالي المبيعات ===== */}
        <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-[#eaf6f0] px-3.5 py-3">
          <span className="text-[11.5px] font-bold leading-4 text-[#1f2937]">
            {ratioLabel}
          </span>

          <div className="shrink-0 text-left">
            <p
              dir="ltr"
              className="text-[14px] font-extrabold leading-5 text-[#0d9448]"
            >
              {ratioValue}
            </p>
            {maxLimitLabel && (
              <p className="mt-0.5 text-[10px] font-semibold text-[#64748b]">
                {maxLimitLabel}
              </p>
            )}
          </div>
        </div>

        {/* ===== أسباب الإشعارات الصادرة ===== */}
        <div className="mt-4">
          <p className="text-[11.5px] font-extrabold text-[#1f2937]">
            أسباب الإشعارات الصادرة:
          </p>

          {/* شريط التوزيع الأفقي */}
          <div className="mt-2.5 flex h-[7px] w-full overflow-hidden rounded-full bg-[#e2e8f0]">
            {reasons?.map((item) => (
              <div
                key={item.id}
                style={{
                  width: `${Math.max(0, Math.min(100, Number(item.percent) || 0))}%`,
                  backgroundColor: item.color,
                }}
                className="h-full"
              />
            ))}
          </div>

          {/* قائمة الأسباب */}
          <ul className="mt-3 space-y-2">
            {reasons?.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2 text-[11.5px] font-semibold text-[#374151]"
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ===== الفوتر السفلي ===== */}
      <div className="border-t border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 sm:px-5">
        <p className="text-[11px] font-medium leading-[18px] text-[#64748b]">
          <span>{footerPrefix} </span>
          <button
            type="button"
            onClick={() => onViewLedger?.()}
            className="inline-flex items-center gap-1 font-bold text-[#0e6787] hover:underline"
          >
            <span>{footerLinkLabel}</span>
            <FiArrowLeft size={12} className="inline" />
          </button>
        </p>
      </div>
    </section>
  );
};

export default CreditNotesSummary;