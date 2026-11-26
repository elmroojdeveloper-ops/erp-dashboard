"use client";

import React, { useMemo, useState } from "react";
import { FiFileText, FiSearch, FiEye } from "react-icons/fi";

const defaultAgingRows = [
  {
    id: "aging-1",
    name: "مصنع الرياض للأغلفة والكرتون ش.م.م",
    commercialRegister: "1010398274",
    category: "تغليف",
    code: "VND-1082",
    totalBalance: "2,450,000.00",
    unit: "ر.س",
    current30: "1,850,000.00",
    days31to60: "450,000.00",
    days61to90: "150,000.00",
    over90Critical: "-",
    isCritical: false,
  },
  {
    id: "aging-2",
    name: "شركة اليمامة للصناعات الكيماوية",
    commercialRegister: "1010492100",
    category: "مواد خام",
    code: "VND-1044",
    totalBalance: "3,890,120.00",
    unit: "ر.س",
    current30: "2,100,000.00",
    days31to60: "1,200,120.00",
    days61to90: "420,000.00",
    over90Critical: "170,000.00",
    isCritical: true,
  },
  {
    id: "aging-3",
    name: "شركة الأفق للوجستيات وسلاسل الإمداد",
    commercialRegister: "2050119280",
    category: "لوجستيات",
    code: "VND-1109",
    totalBalance: "1,120,400.00",
    unit: "ر.س",
    current30: "920,400.00",
    days31to60: "200,000.00",
    days61to90: "-",
    over90Critical: "-",
    isCritical: false,
  },
  {
    id: "aging-4",
    name: "شركة الإنشاءات والتجهيزات الحديثة",
    commercialRegister: "1010623911",
    category: "مقاولات",
    code: "VND-0985",
    totalBalance: "945,710.00",
    unit: "ر.س",
    current30: "300,000.00",
    days31to60: "195,260.00",
    days61to90: "150,450.00",
    over90Critical: "300,000.00",
    isCritical: true,
  },
  {
    id: "aging-5",
    name: "مؤسسة التوريدات والحلول التقنية المتقدمة",
    commercialRegister: "4030281923",
    category: "صيانة وتقنية",
    code: "VND-1240",
    totalBalance: "615,000.00",
    unit: "ر.س",
    current30: "180,000.00",
    days31to60: "84,550.00",
    days61to90: "-",
    over90Critical: "350,450.00",
    isCritical: true,
  },
];

const defaultGrandTotals = {
  label: "المجموع الإجمالي (لكافة الموردين 142)",
  totalBalance: "14,850,230.00",
  unit: "ر.س",
  current30: "9,810,400.00",
  days31to60: "2,840,930.00",
  days61to90: "1,378,450.00",
  over90Critical: "820,450.00",
  shareLabel: "100%",
};

const VendorAgingReport = ({
  title = "تقرير أعمار الديون للموردين (Vendor Aging Report)",
  subtitle = "تصنيف الالتزامات المالية المستحقة حسب فترات التأخير الزمني لتسهيل الجدولة والسيولة",
  rows = defaultAgingRows,
  totals = defaultGrandTotals,
  onViewSupplier,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (row) =>
        row.name?.toLowerCase().includes(q) ||
        row.code?.toLowerCase().includes(q) ||
        row.commercialRegister?.toLowerCase().includes(q) ||
        row.category?.toLowerCase().includes(q)
    );
  }, [rows, searchQuery]);

  const splitCode = (code = "") => {
    const parts = code.split("-");
    if (parts.length === 2) {
      return { prefix: `${parts[0]}-`, suffix: parts[1] };
    }
    return { prefix: code, suffix: "" };
  };

  return (
    <section
      dir="rtl"
      className="rounded-[22px] mt-8 border border-[#e6ecf2] bg-white p-6 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Header Row: Title + Subtitle (Right) & Search Input (Left) */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div className="text-right">
          <div className="flex items-center gap-2">
            <FiFileText className="h-[18px] w-[18px] text-[#086382]" />
            <h2 className="text-[18px] font-black leading-snug text-[#0f172a]">
              {title}
            </h2>
          </div>
          <p className="mt-1 text-[12px] font-semibold text-[#64748b]">
            {subtitle}
          </p>
        </div>

        {/* Search Box */}
        <div className="relative w-full sm:w-[235px]">
          <FiSearch className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث باسم المورد أو الكود.."
            aria-label="بحث باسم المورد أو الكود"
            className="h-[34px] w-full rounded-[10px] border border-[#e2e8f0] bg-[#fafcfd] pr-8 pl-3 text-right text-[11.5px] font-semibold text-[#334155] placeholder-[#94a3b8] outline-none transition focus:border-[#086382] focus:bg-white"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-right">
          <thead>
            <tr className="border-y border-[#e6ecf2] bg-[#f8fafc] text-[12px] font-extrabold text-[#334155]">
              <th className="py-3 pr-3 font-extrabold">اسم المورد</th>
              <th className="px-2.5 py-3 text-center font-extrabold">
                كود المورد
              </th>
              <th className="px-3 py-3 text-left font-extrabold">
                الرصيد الإجمالي
              </th>
              <th className="px-3 py-3 text-left font-extrabold">
                حالي (1-30 يوم)
              </th>
              <th className="px-3 py-3 text-left font-extrabold">
                31 - 60 يوم
              </th>
              <th className="px-3 py-3 text-left font-extrabold">
                61 - 90 يوم
              </th>
              <th className="px-3 py-3 text-left font-extrabold text-[#b91c1c]">
                &lt; 90 يوم (حرج)
              </th>
              <th className="py-3 pl-3 text-center font-extrabold">
                الإجراءات
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#eef2f6] text-[12.5px]">
            {filteredRows.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-8 text-center text-[13px] font-bold text-[#64748b]"
                >
                  لا توجد نتائج مطابقة لبحثك.
                </td>
              </tr>
            ) : (
              filteredRows.map((row) => {
                const codeParts = splitCode(row.code);
                const hasOver90 =
                  row.over90Critical && row.over90Critical !== "-";

                return (
                  <tr
                    key={row.id}
                    className={`transition ${
                      row.isCritical
                        ? "bg-[#fffafa] hover:bg-[#fff2f2]"
                        : "bg-white hover:bg-[#f8fafc]"
                    }`}
                  >
                    {/* اسم المورد */}
                    <td className="py-4 pr-3 align-middle">
                      <div className="text-[13px] font-black leading-snug text-[#0f172a]">
                        {row.name}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10.5px] font-bold text-[#64748b] tabular-nums">
                        <span>سجل تجاري: {row.commercialRegister}</span>
                        <span>•</span>
                        <span>تصنيف: {row.category}</span>
                      </div>
                    </td>

                    {/* كود المورد */}
                    <td className="px-2.5 py-4 text-center align-middle">
                      <span className="inline-flex flex-col items-center justify-center rounded-[8px] border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-1 text-[11px] font-extrabold leading-tight text-[#334155] tabular-nums">
                        <span>{codeParts.prefix}</span>
                        {codeParts.suffix && <span>{codeParts.suffix}</span>}
                      </span>
                    </td>

                    {/* الرصيد الإجمالي */}
                    <td className="px-3 py-4 text-left align-middle tabular-nums">
                      <div className="text-[13px] font-black text-[#0f172a]">
                        {row.totalBalance}
                      </div>
                      <div className="mt-0.5 text-[10.5px] font-bold text-[#64748b]">
                        {row.unit}
                      </div>
                    </td>

                    {/* حالي (1-30 يوم) */}
                    <td className="px-3 py-4 text-left align-middle text-[12.5px] font-bold text-[#334155] tabular-nums">
                      {row.current30}
                    </td>

                    {/* 31 - 60 يوم */}
                    <td className="px-3 py-4 text-left align-middle text-[12.5px] font-bold text-[#334155] tabular-nums">
                      {row.days31to60}
                    </td>

                    {/* 61 - 90 يوم */}
                    <td className="px-3 py-4 text-left align-middle text-[12.5px] font-bold text-[#475569] tabular-nums">
                      {row.days61to90}
                    </td>

                    {/* < 90 يوم (حرج) */}
                    <td className="px-3 py-4 text-left align-middle tabular-nums">
                      {hasOver90 ? (
                        <span className="text-[12.5px] font-black text-[#dc2626]">
                          {row.over90Critical}
                        </span>
                      ) : (
                        <span className="text-[12.5px] font-bold text-[#94a3b8]">
                          -
                        </span>
                      )}
                    </td>

                    {/* الإجراءات */}
                    <td className="py-4 pl-3 text-center align-middle">
                      <button
                        type="button"
                        onClick={() => onViewSupplier?.(row)}
                        aria-label={`عرض تفاصيل ${row.name}`}
                        title="عرض تفاصيل المورد"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#e2e8f0] bg-white text-[#086382] transition hover:border-[#086382] hover:bg-[#eef6f9]"
                      >
                        <FiEye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

          {/* Grand Total Footer Row */}
          <tfoot>
            <tr className="border-t-2 border-[#dbe4ee] bg-[#eef5f9] text-[12.5px]">
              <td className="py-3.5 pr-3 text-[13px] font-black text-[#0f172a]">
                {totals.label}
              </td>
              <td className="px-2.5 py-3.5" />
              <td className="px-3 py-3.5 text-left tabular-nums">
                <div className="text-[13px] font-black text-[#086382]">
                  {totals.totalBalance}
                </div>
                <div className="mt-0.5 text-[10.5px] font-bold text-[#475569]">
                  {totals.unit}
                </div>
              </td>
              <td className="px-3 py-3.5 text-left font-black text-[#0f172a] tabular-nums">
                {totals.current30}
              </td>
              <td className="px-3 py-3.5 text-left font-black text-[#0f172a] tabular-nums">
                {totals.days31to60}
              </td>
              <td className="px-3 py-3.5 text-left font-black text-[#0f172a] tabular-nums">
                {totals.days61to90}
              </td>
              <td className="px-3 py-3.5 text-left font-black text-[#dc2626] tabular-nums">
                {totals.over90Critical}
              </td>
              <td className="py-3.5 pl-3 text-center text-[11.5px] font-extrabold text-[#475569] tabular-nums">
                {totals.shareLabel}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default VendorAgingReport;
