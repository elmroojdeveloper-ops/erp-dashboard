"use client";

import React from "react";
import { LuBot, LuWallet, LuBanknote, LuArrowLeftRight } from "react-icons/lu";

const defaultSubMetrics = [
  {
    id: "automated_financial_audit",
    title: "التدقيق المالي الآلي",
    percentage: "99.1%",
    statusText: "مثالي",
    statusTone: "green",
    iconType: "bot",
    iconBg: "bg-[#e7f0f5]",
    iconColor: "text-[#086382]",
  },
  {
    id: "asset_movement_audit",
    title: "تدقيق حركة الأصول",
    percentage: "98.5%",
    statusText: "مستقر",
    statusTone: "green",
    iconType: "wallet",
    iconBg: "bg-[#e6f5ec]",
    iconColor: "text-[#059669]",
  },
  {
    id: "payroll_expenses_audit",
    title: "تدقيق الرواتب والمصروفات",
    percentage: "97.8%",
    statusText: "طبيعي",
    statusTone: "muted",
    iconType: "banknote",
    iconBg: "bg-[#eceef5]",
    iconColor: "text-[#64748b]",
  },
  {
    id: "bank_statement_reconciliation",
    title: "مطابقة كشوفات البنوك",
    percentage: "100%",
    statusText: "مكتمل",
    statusTone: "green",
    iconType: "reconcile",
    iconBg: "bg-[#e6f5ec]",
    iconColor: "text-[#059669]",
  },
];

const renderMetricIcon = (iconType, colorClass) => {
  switch (iconType) {
    case "bot":
      return <LuBot className={`h-[19px] w-[19px] ${colorClass}`} />;
    case "wallet":
      return <LuWallet className={`h-[19px] w-[19px] ${colorClass}`} />;
    case "banknote":
      return <LuBanknote className={`h-[19px] w-[19px] ${colorClass}`} />;
    case "reconcile":
      return <LuArrowLeftRight className={`h-[19px] w-[19px] ${colorClass}`} />;
    default:
      return <LuBot className={`h-[19px] w-[19px] ${colorClass}`} />;
  }
};

const getStatusTextColor = (tone) => {
  if (tone === "muted") {
    return "text-[#64748b]";
  }
  return "text-[#047857]";
};

const SubMetrics = ({ metrics = defaultSubMetrics, onSelectMetric }) => {
  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mt-6 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {metrics.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelectMetric?.(item)}
          role={onSelectMetric ? "button" : undefined}
          tabIndex={onSelectMetric ? 0 : undefined}
          onKeyDown={(e) => {
            if (onSelectMetric && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              onSelectMetric(item);
            }
          }}
          className={`flex items-center justify-start gap-3.5 rounded-[20px] border border-[#e6ecf2] bg-white px-4 py-3.5 ${
            onSelectMetric ? "cursor-pointer" : ""
          }`}
        >
          <div
            className={`flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[14px] ${item.iconBg}`}
          >
            {renderMetricIcon(item.iconType, item.iconColor)}
          </div>

          <div className="flex min-w-0 flex-col justify-center text-right">
            <h3 className="truncate text-[12px] font-bold text-[#64748b]">
              {item.title}
            </h3>

            <div className="mt-1.5 flex items-baseline justify-start gap-1.5">
              <span
                className="text-[20px] font-black leading-none tracking-tight text-[#0f172a] tabular-nums"
                dir="auto"
              >
                {item.percentage}
              </span>
              <span
                className={`text-[12px] font-extrabold leading-none ${getStatusTextColor(
                  item.statusTone
                )}`}
              >
                {item.statusText}
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SubMetrics;