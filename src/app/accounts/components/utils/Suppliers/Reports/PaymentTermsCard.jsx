"use client";

import React from "react";
import { FiCreditCard, FiInfo } from "react-icons/fi";

const defaultTermsData = [
  {
    id: "net-30",
    label: "آجل 30 يوماً (الافتراضي)",
    percentage: 54,
    suppliersCount: 77,
    unitLabel: "مورداً",
    color: "#157396",
    highlightValue: true,
  },
  {
    id: "net-15",
    label: "آجل 15 يوماً",
    percentage: 18,
    suppliersCount: 26,
    unitLabel: "مورداً",
    color: "#065a78",
    highlightValue: false,
  },
  {
    id: "net-60-plus",
    label: "آجل 60 يوماً فأكثر",
    percentage: 16,
    suppliersCount: 22,
    unitLabel: "مورداً",
    color: "#c98a2e",
    highlightValue: false,
  },
  {
    id: "cash-on-delivery",
    label: "نقدي فوري عند الاستلام",
    percentage: 12,
    suppliersCount: 17,
    unitLabel: "مورداً",
    color: "#4b5262",
    highlightValue: false,
  },
];

const PaymentTermsCard = ({
  title = "شروط الدفع والائتمان",
  subtitle = "توزيع عقود الموردين بناءً على تسهيلات السداد الممنوحة",
  terms = defaultTermsData,
  recommendationText = "يوصى بإعادة التفاوض بشأن الموردين ذوي شروط 15 يوماً لتحسين دورة رأس المال العامل التشغيلي قبل نهاية الربع الحالي.",
  onTermClick,
}) => {
  return (
    <section
      dir="rtl"
      className="rounded-[22px] border border-[#e6ecf2] bg-white p-6 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header Row */}
      <div className="mb-6 flex items-start justify-between gap-3">
        <div className="text-right">
          <h2 className="text-[20px] font-black leading-snug text-[#0f172a]">
            {title}
          </h2>
          <p className="mt-1 text-[12.5px] font-semibold leading-relaxed text-[#64748b]">
            {subtitle}
          </p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-[#475569]">
          <FiCreditCard className="h-5 w-5" />
        </div>
      </div>

      {/* Progress Bars List */}
      <div className="space-y-5">
        {terms.map((item) => {
          const clampedPct = Math.max(0, Math.min(100, Number(item.percentage) || 0));

          return (
            <div
              key={item.id}
              onClick={() => onTermClick?.(item)}
              className={onTermClick ? "cursor-pointer" : ""}
            >
              {/* Label Row: Percentage + Count (Left) & Term Label (Right) */}
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <div
                  className={`text-[13px] tabular-nums ${
                    item.highlightValue
                      ? "font-black text-[#157396]"
                      : "font-extrabold text-[#475569]"
                  }`}
                >
                  {clampedPct}% ({item.suppliersCount} {item.unitLabel || "مورداً"})
                </div>

                <div className="text-right text-[13.5px] font-black text-[#0f172a]">
                  {item.label}
                </div>
              </div>

              {/* Track + Fill from Right to Left */}
              <div className="h-[10px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${clampedPct}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendation Box */}
      {recommendationText && (
        <div className="mt-6 flex items-start gap-3 rounded-[14px] bg-[#edf3f7] px-4 py-3.5 text-right">
          <FiInfo className="mt-0.5 h-4 w-4 shrink-0 text-[#086382]" />
          <p className="text-[12px] font-bold leading-relaxed text-[#475569]">
            {recommendationText}
          </p>
        </div>
      )}
    </section>
  );
};

export default PaymentTermsCard;
