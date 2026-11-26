"use client";

import React from "react";
import { FiArrowLeft } from "react-icons/fi";

const defaultTopSuppliers = [
  {
    id: "top-1",
    name: "شركة اليمامة للصناعات الكيماوية",
    code: "VND-1044",
    ytdPurchases: "12,450,800",
    dueBalance: "3,890,120",
    unit: "ر.س",
    lastInvoiceDate: "24/03/2026",
    paymentStatus: "regular",
    paymentStatusLabel: "منتظم",
  },
  {
    id: "top-2",
    name: "مصنع الرياض للأغلفة والكرتون",
    code: "VND-1082",
    ytdPurchases: "8,920,350",
    dueBalance: "2,450,000",
    unit: "ر.س",
    lastInvoiceDate: "20/03/2026",
    paymentStatus: "regular",
    paymentStatusLabel: "منتظم",
  },
  {
    id: "top-3",
    name: "شركة الأفق للوجستيات وسلاسل الإمداد",
    code: "VND-1109",
    ytdPurchases: "5,630,000",
    dueBalance: "1,120,400",
    unit: "ر.س",
    lastInvoiceDate: "18/03/2026",
    paymentStatus: "under-review",
    paymentStatusLabel: "تحت التدقيق",
  },
  {
    id: "top-4",
    name: "شركة الإنشاءات والتجهيزات الحديثة",
    code: "VND-0985",
    ytdPurchases: "3,810,200",
    dueBalance: "945,710",
    unit: "ر.س",
    lastInvoiceDate: "10/02/2026",
    paymentStatus: "overdue",
    paymentStatusLabel: "متأخر",
  },
];

const splitCode = (code = "") => {
  const parts = code.split("-");
  if (parts.length === 2) {
    return { prefix: `${parts[0]}-`, suffix: parts[1] };
  }
  return { prefix: code, suffix: "" };
};

const getStatusBadgeStyle = (status) => {
  switch (status) {
    case "under-review":
      return "bg-[#dbeafe] text-[#1d4ed8]";
    case "overdue":
      return "bg-[#fee2e2] text-[#dc2626]";
    case "regular":
    default:
      return "bg-[#dcfce7] text-[#15803d]";
  }
};

const TopSuppliersTable = ({
  title = "أعلى الموردين حسب إجمالي المشتريات (2026)",
  subtitle = "الشركاء التجاريون الاستراتيجيون الأكثر تعاملاً مالياً خلال السنة الحالية",
  viewAllLabel = "عرض القائمة الكاملة",
  suppliers = defaultTopSuppliers,
  onViewAll,
  onRowClick,
}) => {
  return (
    <section
      dir="rtl"
      className="rounded-[22px] lg:col-span-2 border border-[#e6ecf2] bg-white p-6 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Header Row */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div className="text-right">
          <h2 className="text-[19px] font-black leading-snug text-[#0f172a]">
            {title}
          </h2>
          <p className="mt-1 text-[12px] font-semibold text-[#64748b]">
            {subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1.5 text-[12.5px] font-extrabold text-[#157396] transition hover:underline"
        >
          <FiArrowLeft className="h-4 w-4" />
          <span>{viewAllLabel}</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-right">
          <thead>
            <tr className="rounded-[12px] bg-[#f1f5f9] text-[12px] font-extrabold text-[#475569]">
              <th className="rounded-r-[10px] py-3 pr-3.5 font-extrabold">
                المورد
              </th>
              <th className="px-2.5 py-3 text-center font-extrabold">الكود</th>
              <th className="px-3 py-3 text-right font-extrabold leading-snug">
                <div>إجمالي</div>
                <div>المشتريات</div>
                <div>(YTD)</div>
              </th>
              <th className="px-3 py-3 text-right font-extrabold leading-snug">
                <div>الرصيد</div>
                <div>المستحق</div>
              </th>
              <th className="px-3 py-3 text-center font-extrabold">
                آخر فاتورة
              </th>
              <th className="rounded-l-[10px] py-3 pl-3.5 text-center font-extrabold">
                حالة السداد
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#eef2f6] text-[12.5px]">
            {suppliers.map((item) => {
              const codeParts = splitCode(item.code);
              const isOverdue = item.paymentStatus === "overdue";

              return (
                <tr
                  key={item.id}
                  onClick={() => onRowClick?.(item)}
                  className={`transition hover:bg-[#f8fafc] ${
                    onRowClick ? "cursor-pointer" : ""
                  }`}
                >
                  {/* المورد */}
                  <td className="max-w-[165px] py-4 pr-3.5 align-middle">
                    <div className="text-[12.5px] font-black leading-snug text-[#0f172a]">
                      {item.name}
                    </div>
                  </td>

                  {/* الكود */}
                  <td className="px-2.5 py-4 text-center align-middle">
                    <span className="inline-flex flex-col items-center justify-center text-[11.5px] font-bold leading-tight text-[#475569] tabular-nums">
                      <span>{codeParts.prefix}</span>
                      {codeParts.suffix && <span>{codeParts.suffix}</span>}
                    </span>
                  </td>

                  {/* إجمالي المشتريات (YTD) */}
                  <td className="px-3 py-4 text-right align-middle tabular-nums">
                    <div className="text-[13px] font-black leading-snug text-[#0f172a]">
                      {item.ytdPurchases}
                    </div>
                    <div className="text-[11.5px] font-black leading-snug text-[#0f172a]">
                      {item.unit}
                    </div>
                  </td>

                  {/* الرصيد المستحق */}
                  <td className="px-3 py-4 text-right align-middle tabular-nums">
                    <div
                      className={`text-[13px] font-black leading-snug ${
                        isOverdue ? "text-[#dc2626]" : "text-[#157396]"
                      }`}
                    >
                      {item.dueBalance}
                    </div>
                    <div
                      className={`text-[11.5px] font-black leading-snug ${
                        isOverdue ? "text-[#dc2626]" : "text-[#157396]"
                      }`}
                    >
                      {item.unit}
                    </div>
                  </td>

                  {/* آخر فاتورة */}
                  <td className="px-3 py-4 text-center align-middle text-[12px] font-bold text-[#475569] tabular-nums">
                    {item.lastInvoiceDate}
                  </td>

                  {/* حالة السداد */}
                  <td className="py-4 pl-3.5 text-center align-middle">
                    <span
                      className={`inline-flex min-w-[68px] items-center justify-center rounded-[12px] px-3 py-1.5 text-[11px] font-extrabold leading-tight ${getStatusBadgeStyle(
                        item.paymentStatus
                      )}`}
                    >
                      {item.paymentStatusLabel}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TopSuppliersTable;
