"use client";

import { FiCheck, FiEdit3, FiInfo } from "react-icons/fi";

const ItemsTable = ({ items = [], linkedPr, itemsCount, footerNote }) => (
  <section className="rounded-[16px] border border-[#E5EDF2] bg-white p-5 shadow-[0_1px_3px_rgba(35,70,90,0.04)] sm:p-6">
    {/* رأس السكشن */}
    <header className="mb-4 flex flex-col gap-3 border-b border-[#EEF2F6] pb-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="h-6 w-1.5 shrink-0 rounded-full bg-[#1B6A9C]" />
          <div className="min-w-0">
            <h2 className="text-[16px] font-bold text-[#1A2332]">
              بنود ومواصفات الطلب{" "}
              <span className="font-semibold text-[#64748B]">(إدخال يدوي)</span>
            </h2>
            {linkedPr ? (
              <p className="mt-1 text-[12px] text-[#64748B]">
                رقم طلب الشراء المرتبط:{" "}
                <span className="font-semibold text-[#1B6A9C]">{linkedPr}</span>
              </p>
            ) : null}
          </div>
        </div>

        <span className="inline-flex rounded-full bg-[#E8F1F7] px-3 py-1 text-[11px] font-bold text-[#1B6A9C]">
          {itemsCount ?? items.length} أصناف مطلوبة
        </span>
      </div>

      {/* تبويبات المسار زي الديزاين */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#B9D3E4] bg-[#EAF3F9] px-3 py-1.5 text-[11px] font-bold text-[#1B6A9C]">
          <FiInfo className="size-3.5" />
          إضافة معلومات
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#E8C87A] bg-[#FFF8E1] px-3 py-1.5 text-[11px] font-bold text-[#8A6A1E]">
          <FiEdit3 className="size-3.5" />
          مسار إدخال يدوي — بدون سحب من طلب شراء
        </span>
      </div>
    </header>

    <div className="overflow-x-auto rounded-[12px] border border-[#E8EEF2]">
      <table className="w-full min-w-[720px] text-[13px]">
        <thead className="bg-[#F5F8FA] text-[#64748B]">
          <tr>
            <th className="w-12 px-4 py-3 text-start font-semibold">#</th>
            <th className="px-4 py-3 text-start font-semibold">
              الصنف / الخدمة
            </th>
            <th className="px-4 py-3 text-start font-semibold">
              المواصفات الفنية والشروط
            </th>
            <th className="w-24 px-3 py-3 text-center font-semibold">الكمية</th>
            <th className="w-28 px-3 py-3 text-center font-semibold">الوحدة</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EEF2F6]">
          {items.map((item, index) => (
            <tr key={item.id || index} className="align-top bg-white">
              <td className="px-4 py-4 font-semibold text-[#94A3B8]">
                {index + 1}
              </td>
              <td className="px-4 py-4">
                <p className="font-bold text-[#1A2332]">{item.name}</p>
                {item.nameEn ? (
                  <p
                    dir="ltr"
                    className="mt-1 text-start font-mono text-[11px] text-[#64748B]"
                  >
                    {item.nameEn}
                  </p>
                ) : null}
                {item.manual ? (
                  <span className="mt-2 inline-flex rounded-full bg-[#E8F1F7] px-2 py-0.5 text-[10px] font-bold text-[#1B6A9C]">
                    أضيف يدوياً
                  </span>
                ) : null}
              </td>
              <td className="px-4 py-4 leading-6 text-[#475569]">
                {item.specs}
              </td>
              <td className="px-3 py-4 text-center text-[15px] font-bold text-[#1B6A9C]">
                {item.qty}
              </td>
              <td className="px-3 py-4 text-center">
                <span className="inline-flex rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-[11px] font-medium text-[#64748B]">
                  {item.unit}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* فوتر الاعتماد */}
    <div className="mt-4 flex items-start gap-2 rounded-[10px] border border-[#D7EADF] bg-[#F3FBF6] px-3.5 py-3 text-[12px] leading-6 text-[#2E7D32]">
      <FiCheck className="mt-0.5 size-4 shrink-0" />
      <p>
        {footerNote ||
          "تم اعتماد الشروط والمواصفات الفنية — مكان التسليم: مستودع السلي المركزي — الرياض"}
      </p>
    </div>
  </section>
);

export default ItemsTable;
