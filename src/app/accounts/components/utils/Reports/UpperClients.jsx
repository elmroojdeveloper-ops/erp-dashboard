"use client";

import React from "react";

const cx = (...c) => c.filter(Boolean).join(" ");

const DEFAULT_TOP_CLIENTS = [
  {
    id: "CUST-1012",
    rank: 1,
    name: "شركة الأفق للمقاولات العامة",
    code: "CUST-1012",
    lastInvoiceDate: "25/03/2026",
    statusLabel: "منتظم",
    statusTone: "success", // "success" | "warning" | "danger"
    totalSales: "1,240,000",
    outstandingBalance: "560,000",
  },
  {
    id: "CUST-1104",
    rank: 2,
    name: "شركة الحسام للخدمات اللوجستية",
    code: "CUST-1104",
    lastInvoiceDate: "22/03/2026",
    statusLabel: "متأخر قليلاً",
    statusTone: "warning",
    totalSales: "890,500",
    outstandingBalance: "405,000",
  },
  {
    id: "CUST-1088",
    rank: 3,
    name: "مؤسسة البناء الحديث للتجارة",
    code: "CUST-1088",
    lastInvoiceDate: "18/03/2026",
    statusLabel: "منتظم",
    statusTone: "success",
    totalSales: "760,200",
    outstandingBalance: "410,200",
  },
  {
    id: "CUST-1041",
    rank: 4,
    name: "شركة التوريدات الهندسية المتقدمة",
    code: "CUST-1041",
    lastInvoiceDate: "15/03/2026",
    statusLabel: "متعثر جزئي",
    statusTone: "danger",
    totalSales: "582,100",
    outstandingBalance: "295,120",
  },
];

const STATUS_STYLES = {
  success: "bg-[#e8f8ef] text-[#159447]",
  warning: "bg-[#fff4e5] text-[#d97706]",
  danger: "bg-[#fdecec] text-[#dc2626]",
};

const UpperClients = ({
  title = "أعلى العملاء مساهمة في إجمالي المبيعات (2026)",
  subtitle = "الترتيب حسب الحجم العام من المبيعات مع متابعة سقف الائتمان وسجل السداد",
  badgeText = "عرض الكامل",
  clients = DEFAULT_TOP_CLIENTS,
  onSelectClient,
  onViewAll,
  className = "",
}) => {
  return (
    <section
      dir="rtl"
      className={cx(
        "rounded-[22px] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      {/* ===== رأس البطاقة ===== */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="text-right">
          <h2 className="text-[14.5px] font-extrabold text-[#1f2937]">
            {title}
          </h2>
          <p className="mt-1 text-[11px] font-medium leading-4 text-[#6b7280]">
            {subtitle}
          </p>
        </div>

        {badgeText && (
          <button
            type="button"
            onClick={() => onViewAll?.()}
            className="shrink-0 rounded-lg bg-[#eef4f8] px-2.5 py-1 text-[10.5px] font-bold text-[#1b7398] transition hover:bg-[#dfecf4]"
          >
            {badgeText}
          </button>
        )}
      </div>

      {/* ===== قائمة العملاء ===== */}
      <div className="space-y-2.5">
        {clients.map((client) => {
          const badgeClass =
            STATUS_STYLES[client.statusTone] || STATUS_STYLES.success;

          return (
            <div
              key={client.id}
              role={onSelectClient ? "button" : undefined}
              tabIndex={onSelectClient ? 0 : undefined}
              onClick={() => onSelectClient?.(client)}
              onKeyDown={(e) => {
                if (!onSelectClient) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectClient(client);
                }
              }}
              className={cx(
                "flex items-center justify-between gap-3 rounded-xl border border-[#f1f5f9] bg-[#f8fafc] px-3.5 py-3 transition",
                onSelectClient &&
                  "cursor-pointer hover:border-[#1b7398]/30 hover:bg-[#eef6fa]/60"
              )}
            >
              {/* يمين: الترتيب + اسم العميل + الكود وتاريخ آخر فاتورة */}
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6eff4] text-[11.5px] font-extrabold text-[#1b7398]">
                  {client.rank}
                </span>

                <div className="min-w-0 text-right">
                  <p className="truncate text-[12.5px] font-extrabold text-[#1f2937]">
                    {client.name}
                  </p>
                  <p className="mt-0.5 text-[10.5px] font-medium text-[#64748b]">
                    كود: <span dir="ltr">{client.code}</span> • آخر فاتورة:{" "}
                    <span dir="ltr">{client.lastInvoiceDate}</span>
                  </p>
                </div>
              </div>

              {/* يسار: حالة السداد + إجمالي المبيعات + الرصيد القائم */}
              <div className="flex shrink-0 items-center gap-3">
                <span
                  className={cx(
                    "hidden rounded-md px-2 py-0.5 text-[10px] font-bold sm:inline-flex",
                    badgeClass
                  )}
                >
                  {client.statusLabel}
                </span>

                <div className="text-left">
                  <div className="flex items-baseline justify-end gap-1">
                    <span
                      dir="ltr"
                      className="text-[13px] font-extrabold text-[#111827]"
                    >
                      {client.totalSales}
                    </span>
                    <span className="text-[10px] font-bold text-[#64748b]">
                      ر.س
                    </span>
                  </div>

                  <p className="mt-0.5 text-[10px] font-semibold text-[#64748b]">
                    رصيد قائم:{" "}
                    <span dir="ltr" className="font-bold text-[#374151]">
                      {client.outstandingBalance}
                    </span>{" "}
                    ر.س
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UpperClients;