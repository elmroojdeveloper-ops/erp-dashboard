"use client";

import React from "react";
import {
  FiTrendingUp,
  FiClock,
  FiAlertTriangle,
  FiDollarSign,
} from "react-icons/fi";

const cx = (...c) => c.filter(Boolean).join(" ");

const DEFAULT_CARDS_DATA = {
  totalSales: {
    label: "إجمالي المبيعات (Sales Revenue)",
    value: "4,852,190.00",
    unit: "ر.س",
    badge: "↑ 12.8% عن الربع السابق",
    footer: "شامل ضريبة القيمة المضافة (15% — 412 فاتورة مصدرة)",
  },
  receivablesDue: {
    label: "إجمالي المستحق الآن (Receivables Due)",
    value: "1,940,320.00",
    unit: "ر.س",
    badge: "40.0% من إجمالي المبيعات",
    progress: 40,
    footer: "234 عميل عليهم أرصدة قائمة (68 حساب متأخر)",
  },
  collectionDays: {
    label: "متوسط مدة التحصيل (DSO)",
    value: "28",
    unit: "يوماً",
    badge: "✓ ضمن النطاق الأمثل (30 - 45 يوماً)",
    subNote: "↑ تحسن بمقدار 4 أيام عن العام السابق (32 يوماً)",
    footer: "متوسط فترة التحصيل الفعلي لمبيعات الآجلة",
  },
  overdueInvoices: {
    label: "ديون متأخرة السداد (Overdue Invoices)",
    value: "315,400.00",
    unit: "ر.س",
    badge: "41 فواتير متأخرة",
    subNote: "متأخرة باستحقاق الفواتير المتأخرة",
    footer: "تتطلب إجراءات تحصيل ومتابعة فورية",
  },
};

const Cards = ({
  data = DEFAULT_CARDS_DATA,
  activeKey,
  onSelectCard,
  className = "",
}) => {
  const {
    totalSales,
    receivablesDue,
    collectionDays,
    overdueInvoices,
  } = data || DEFAULT_CARDS_DATA;

  const cards = [
    {
      key: "total_sales",
      item: totalSales,
      variant: "sales",
      Icon: FiDollarSign,
    },
    {
      key: "receivables_due",
      item: receivablesDue,
      variant: "receivables",
      Icon: FiTrendingUp,
    },
    {
      key: "collection_days",
      item: collectionDays,
      variant: "dso",
      Icon: FiClock,
    },
    {
      key: "overdue_invoices",
      item: overdueInvoices,
      variant: "overdue",
      Icon: FiAlertTriangle,
    },
  ];

  return (
    <section
      dir="rtl"
      className={cx(
        "my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
        className
      )}
    >
      {cards.map(({ key, item, variant, Icon }) => {
        if (!item) return null;
        const isSelected = activeKey === key;
        const isOverdue = variant === "overdue";
        const isSales = variant === "sales";
        const isReceivables = variant === "receivables";

        const progressValue = Math.max(
          0,
          Math.min(100, Number(item.progress ?? 40) || 0)
        );

        return (
          <div
            key={key}
            role={onSelectCard ? "button" : undefined}
            tabIndex={onSelectCard ? 0 : undefined}
            onClick={() => onSelectCard?.(key)}
            onKeyDown={(e) => {
              if (!onSelectCard) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectCard(key);
              }
            }}
            className={cx(
              "flex flex-col justify-between rounded-[20px] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all",
              isOverdue && "border border-[#fee2e2]",
              onSelectCard &&
                "cursor-pointer hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]",
              isSelected && "ring-2 ring-[#1b7398]/50"
            )}
          >
            {/* رأس الكرت: العنوان + الأيقونة */}
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[12.5px] font-bold leading-5 text-[#374151]">
                  {item.label}
                </span>

                <div
                  className={cx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
                    isOverdue
                      ? "bg-[#fdecec] text-[#dc2626]"
                      : "bg-[#eaf4f8] text-[#1b7398]"
                  )}
                >
                  <Icon size={16} strokeWidth={2.2} />
                </div>
              </div>

              {/* الرقم الرئيسي + الوحدة */}
              <div className="mt-2.5 flex items-baseline gap-1.5">
                <span
                  dir="ltr"
                  className={cx(
                    "text-[23px] font-extrabold leading-7 tracking-tight",
                    isOverdue ? "text-[#dc2626]" : "text-[#111827]"
                  )}
                >
                  {item.value}
                </span>
                {item.unit && (
                  <span className="text-[11.5px] font-bold text-[#6b7280]">
                    {item.unit}
                  </span>
                )}
              </div>

              {/* الشارة */}
              {item.badge && (
                <div className="mt-2">
                  <span
                    className={cx(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10.5px] font-bold",
                      isSales && "bg-[#e8f8ef] text-[#159447]",
                      isReceivables && "bg-[#eaf4f8] text-[#1b7398]",
                      variant === "dso" && "bg-[#e8f8ef] text-[#159447]",
                      isOverdue && "bg-[#fdecec] text-[#dc2626]"
                    )}
                  >
                    {item.badge}
                  </span>
                </div>
              )}

              {/* شريط التقدم للكارد التاني */}
              {isReceivables && (
                <div className="mt-3">
                  <div className="h-[6px] w-full overflow-hidden rounded-full bg-[#e5eef2]">
                    <div
                      className="h-full rounded-full bg-[#1b7398] transition-all duration-300"
                      style={{ width: `${progressValue}%` }}
                    />
                  </div>
                </div>
              )}

              {/* منحنى مصغر لكرت المبيعات */}
              {isSales && (
                <div className="mt-2.5">
                  <svg
                    viewBox="0 0 220 28"
                    className="h-6 w-full overflow-visible"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="salesSparkGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#16a34a" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 24 C 35 22, 55 17, 85 18 C 115 19, 135 10, 165 11 C 190 12, 205 5, 220 3 L 220 28 L 0 28 Z"
                      fill="url(#salesSparkGrad)"
                    />
                    <path
                      d="M0 24 C 35 22, 55 17, 85 18 C 115 19, 135 10, 165 11 C 190 12, 205 5, 220 3"
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}

              {/* ملاحظة إضافية لمتوسط التحصيل أو المتأخرات */}
              {item.subNote && (
                <p
                  className={cx(
                    "mt-2 text-[10.5px] font-semibold leading-4",
                    isOverdue ? "text-[#dc2626]" : "text-[#159447]"
                  )}
                >
                  {item.subNote}
                </p>
              )}
            </div>

            {/* الفوتر السفلي للكارت */}
            {item.footer && (
              <div className="mt-3 border-t border-[#f1f5f9] pt-2.5">
                <p
                  className={cx(
                    "text-[10.5px] font-medium leading-[15px]",
                    isOverdue ? "font-bold text-[#dc2626]" : "text-[#6b7280]"
                  )}
                >
                  {item.footer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Cards;