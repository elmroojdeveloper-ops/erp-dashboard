"use client";

import React from "react";
import { FiCheckCircle, FiFileText } from "react-icons/fi";

const defaultItems = [
  {
    id: "01",
    code: "01",
    sku: "SRV-NVME-G4",
    name: "خوادم تخزين سحابية NVMe Gen4 متقدمة",
    specs: "محرك مصفوفة Port-Dual 0.3 بسعة",
    unit: "وحدة سيرفر",
    qty: 2,
    unitPrice: "26,000.00",
    vatRate: 15,
    lineTotal: "7,800.00",
  },
  {
    id: "02",
    code: "02",
    sku: "SEC-ENT3Y",
    name: "تراخيص نظام الحماية وجدار الحماية Enterprise",
    specs: "ترخيص مؤسسي موحد لمدة 3 سنوات",
    unit: "باقة ترخيص",
    qty: 1,
    unitPrice: "19,500.00",
    vatRate: 15,
    lineTotal: "2,925.00",
  },
  {
    id: "03",
    code: "03",
    sku: "FBR-OM4",
    name: "كابلات ألياف ضوئية فائقة السرعة OM4 المجهزة",
    specs: "حزم كابلات بصرية مزدوجة بطول 15 متراً",
    unit: "قطعة",
    qty: 100,
    unitPrice: "50.00",
    vatRate: 15,
    lineTotal: "750.00",
  },
];

const ItemsTable = ({ items = [], totals }) => {
  const rows = items && items.length > 0 ? items : defaultItems;
  const currency = totals?.currency || "ر.س";
  const subtotal = totals?.subtotal || "76,500.00";
  const grand = totals?.grand || "87,975.00";
  const complianceNote =
    totals?.complianceNote ||
    "تأكيد المطابقة الفنية: متوافق 100% مع كراسة الشروط RFP-IT-2024";

  return (
    <section
      dir="rtl"
      className="overflow-hidden rounded-xl border border-[#e6ecf2] bg-white shadow-2xs text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eef2f6] px-4 py-3">
        <div className="flex min-w-0 items-start gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#0d658a] text-white">
            <FiFileText className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-[13.5px] font-black text-[#0f172a]">بنود أمر الشراء المعتمدة</h2>
            <p className="text-[11px] font-medium text-[#94a3b8]">
              البيانات الفنية والكميات المتفق عليها بالعقد المرجعي
            </p>
          </div>
        </div>
        <span className="rounded-md border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-0.5 text-[10.5px] font-bold text-[#475569]">
          {totals?.itemsCount ?? rows.length} بنود رئيسية
        </span>
      </header>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px] border-collapse text-right text-[11.5px]">
          <thead>
            <tr className="border-b border-[#eef2f6] bg-[#f8fafc] text-[10.5px] font-extrabold text-[#64748b]">
              <th className="w-10 px-3 py-2.5 text-center">#</th>
              <th className="px-3 py-2.5">رمز الصنف</th>
              <th className="min-w-[230px] px-3 py-2.5">التوصيف والمواصفات الفنية</th>
              <th className="px-3 py-2.5 text-center">الوحدة</th>
              <th className="px-3 py-2.5 text-center">الكمية</th>
              <th className="px-3 py-2.5 text-center">سعر الوحدة</th>
              <th className="px-3 py-2.5 text-center">الضريبة (15%)</th>
              <th className="px-3 py-2.5 text-left">الإجمالي</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#f1f5f9]">
            {rows.map((row, index) => (
              <tr
                key={row.id || index}
                className="transition-colors hover:bg-[#fafcfd] align-middle"
              >
                <td className="px-3 py-3 text-center text-[11px] font-bold text-[#94a3b8]">
                  {row.code || String(index + 1).padStart(2, "0")}
                </td>

                <td className="px-3 py-3 font-mono text-[10px] font-bold leading-tight text-[#64748b]">
                  {row.sku}
                </td>

                <td className="px-3 py-3">
                  <p className="text-[12px] font-extrabold text-[#0f172a] leading-snug">
                    {row.name}
                  </p>
                  {row.specs ? (
                    <p className="mt-0.5 text-[10.5px] font-medium text-[#64748b]">
                      {row.specs}
                    </p>
                  ) : null}
                </td>

                <td className="px-3 py-3 text-center">
                  <span className="inline-block rounded-md border border-[#e2e8f0] bg-[#f8fafc] px-2 py-0.5 text-[10.5px] font-bold text-[#475569]">
                    {row.unit}
                  </span>
                </td>

                <td className="px-3 py-3 text-center text-[12px] font-black text-[#0f172a]">
                  {row.qty}
                </td>

                <td className="px-3 py-3 text-center">
                  <div className="font-bold text-[#1e293b]">{row.unitPrice}</div>
                  <div className="text-[9.5px] font-semibold text-[#94a3b8]">{currency}</div>
                </td>

                <td className="px-3 py-3 text-center">
                  <div className="font-bold text-[#334155]">
                    {row.vatAmount || row.lineTotal}
                  </div>
                  <div className="text-[9.5px] font-semibold text-[#94a3b8]">
                    ({row.vatRate ?? 15}%)
                  </div>
                </td>

                <td className="px-3 py-3 text-left">
                  <div className="text-[12.5px] font-black text-[#0f172a]">
                    {row.lineTotal}
                  </div>
                  <div className="text-[9.5px] font-semibold text-[#94a3b8]">{currency}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SUMMARY FOOTER */}
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e6ecf2] bg-[#f0f7fb] px-4 py-3 text-[11.5px]">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <span className="block text-[10px] font-semibold text-[#94a3b8]">المجموع الصافي</span>
            <strong className="text-[13px] font-black text-[#0f172a]">
              {subtotal}{" "}
              <span className="text-[10px] font-bold text-[#64748b]">{currency}</span>
            </strong>
          </div>
          <div className="hidden h-6 w-px bg-[#e2e8f0] sm:block" aria-hidden />
          <div>
            <span className="block text-[10px] font-semibold text-[#0d658a]">
              إجمالي الفاتورة مع الضريبة
            </span>
            <strong className="text-[15px] font-black text-[#0d658a]">
              {grand}{" "}
              <span className="text-[10.5px] font-bold text-[#0d658a]">{currency}</span>
            </strong>
          </div>
        </div>
        <div className="flex max-w-md items-center gap-1.5 text-[10.5px] font-bold text-[#0d658a]">
          <FiCheckCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{complianceNote}</span>
        </div>
      </footer>
    </section>
  );
};

export default ItemsTable;