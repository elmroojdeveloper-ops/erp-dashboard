"use client";

import React from "react";
import { FiBell, FiArrowLeft, FiShield } from "react-icons/fi";

const defaultUpcomingInvoices = [
  {
    id: "up-1",
    supplierName: "مصنع الأغلفة",
    amount: "184,200",
    unit: "ر.س",
    dueLabel: "(غداً)",
    urgent: true,
  },
  {
    id: "up-2",
    supplierName: "اليمامة للكيماويات",
    amount: "320,000",
    unit: "ر.س",
    dueLabel: "(خلال 3 أيام)",
    urgent: false,
  },
  {
    id: "up-3",
    supplierName: "الأفق للخدمات",
    amount: "95,400",
    unit: "ر.س",
    dueLabel: "(خلال 6 أيام)",
    urgent: false,
  },
];

const UpcomingInvoicesBar = ({
  title = "فواتير تستحق خلال 7 أيام قادمة:",
  subtitle = "الدفعة العاجلة لتفادي غرامات التأخير",
  invoices = defaultUpcomingInvoices,
  viewAllLabel = "عرض كل الفواتير المتأخرة والمستحقة (12 فاتورة)",
  complianceText = "التقارير مطابقة لمعايير الهيئة العامة للزكاة والضريبة والجمارك (ZATCA) وضريبة القيمة المضافة 15%",
  onInvoiceClick,
  onViewAllClick,
}) => {
  return (
    <section
      dir="rtl"
      className="rounded-[22px] border border-[#e6ecf2] bg-white px-5 py-4 text-[#1e293b] shadow-2xs"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        {/* Right Side: Alert Title & Subtitle */}
        <div className="flex shrink-0 items-center gap-3 text-right">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#eaf3f7] text-[#086382]">
            <FiBell className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-[15px] font-black leading-snug text-[#0f172a]">
              {title}
            </h2>
            <p className="mt-0.5 text-[11.5px] font-semibold text-[#64748b]">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Center: Clean Upcoming Invoice Pills */}
        <div className="flex flex-1 flex-wrap items-center justify-center gap-2.5">
          {invoices.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onInvoiceClick?.(item)}
              className={`group flex items-center justify-between gap-3 rounded-[14px] border px-3.5 py-2 text-right transition ${
                item.urgent
                  ? "border-[#fecaca] bg-[#fff8f8] hover:border-[#f87171]"
                  : "border-[#e2e8f0] bg-[#f4f8fa] hover:border-[#086382]/40 hover:bg-[#eef5f8]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    item.urgent ? "bg-[#dc2626]" : "bg-[#94a3b8]"
                  }`}
                />
                <span className="whitespace-nowrap text-[12px] font-extrabold text-[#1e293b]">
                  {item.supplierName}
                </span>
              </div>

              <div className="flex items-baseline gap-1 whitespace-nowrap tabular-nums">
                <span className="text-[13px] font-black text-[#0f172a]">
                  {item.amount}
                </span>
                <span className="text-[11px] font-bold text-[#64748b]">
                  {item.unit}
                </span>
              </div>

              <span
                className={`whitespace-nowrap text-[11px] font-extrabold tabular-nums ${
                  item.urgent ? "text-[#dc2626]" : "text-[#475569]"
                }`}
              >
                {item.dueLabel}
              </span>
            </button>
          ))}
        </div>

        {/* Left Side: View All Action & ZATCA Compliance Note */}
        <div className="flex shrink-0 flex-col items-start gap-1.5 border-t border-[#eef2f6] pt-3 xl:items-end xl:border-t-0 xl:pt-0">
          <button
            type="button"
            onClick={onViewAllClick}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-black text-[#086382] transition hover:text-[#064e66] hover:underline"
          >
            <span>{viewAllLabel}</span>
            <FiArrowLeft className="h-4 w-4 shrink-0" />
          </button>

          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#64748b]">
            <FiShield className="h-3.5 w-3.5 shrink-0 text-[#15803d]" />
            <span className="text-right">{complianceText}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingInvoicesBar;