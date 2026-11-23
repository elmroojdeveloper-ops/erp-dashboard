"use client"
import { useRouter } from "next/navigation";
import React from "react";
import {
  FiRefreshCw,
  FiCalendar,
  FiChevronDown,
  FiPrinter,
  FiEye,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const invoices = [
  {
    id: "INV-2024-00124",
    type: "مباشر",
    typeClass: "bg-[#edf7fb] text-[#1682b0]",
    reference: "N/A",
    customer: "شركة الأفق للمقاولات",
    date: "2024/10/12",
    total: "12,500.00",
    remaining: "12,500.00",
    paid: "0.00",
    active: true,
  },
  {
    id: "INV-2024-00125",
    type: "جزئي",
    typeClass: "bg-[#fdf2e9] text-[#b56a1d]",
    reference: "CTR-882",
    customer: "مؤسسة الحلول الرقمية",
    date: "2024/11/05",
    total: "45,000.00",
    remaining: "20,000.00",
    paid: "25,000",
  },
  {
    id: "INV-2024-00126",
    type: "نهائي",
    typeClass: "bg-[#e9faef] text-[#12a04a]",
    reference: "CTR-901",
    customer: "توريدات التقنية المحدودة",
    date: "2024/11/15",
    total: "88,400.00",
    remaining: "0.00",
    paid: "88,400",
  },
  {
    id: "INV-2024-00127",
    type: "نشط",
    typeClass: "bg-[#edf7fb] text-[#1682b0]",
    reference: "N/A",
    customer: "شركة الأفق للمقاولات",
    date: "2024/11/18",
    total: "3,150.00",
    remaining: "12,500.00",
    paid: "0.00",
  },
  {
    id: "INV-2024-00128",
    type: "نشط",
    typeClass: "bg-[#edf7fb] text-[#1682b0]",
    reference: "N/A",
    customer: "شركة الأفق للمقاولات",
    date: "2024/10/22",
    total: "12,500.00",
    remaining: "12,500.00",
    paid: "0.00",
  },
];

const Table = () => {
  const router = useRouter();

  return (
    <div className="mt-6">

      {/* Filters */}
      <div className="bg-white rounded-[16px] p-5 mb-6">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">

          {/* Invoice Type */}
          <div>
            <label className="block text-[13px] text-[#626a76] mb-3">
              نوع الفاتورة:
            </label>

            <div className="h-[45px] bg-[#e7e9ed] rounded-[12px] p-[4px] flex">
              {["مدين", "مباشر", "جزئي", "نهائي"].map((item, index) => (
                <button
                  key={item}
                  className={`flex-1 rounded-[10px] text-[14px] ${
                    index === 0
                      ? "bg-white text-[#1682b0] shadow-sm"
                      : "text-[#1682b0]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[13px] text-[#626a76] mb-3">
              الحالة:
            </label>

            <button className="w-full h-[45px] rounded-[11px] border border-[#bdc9d4] flex items-center justify-between px-4 text-[#b6c1cc]">
              <FiChevronDown size={19} />
              <span>الكل</span>
            </button>
          </div>

          {/* Date */}
          <div>
            <label className="block text-[13px] text-[#626a76] mb-3">
              النطاق الزمني:
            </label>

            <div className="flex gap-3">
              <button className="w-[45px] h-[45px] rounded-[11px] border border-[#bdc9d4] flex items-center justify-center text-[#647181] shrink-0">
                <FiRefreshCw size={19} />
              </button>

              <div className="flex-1 h-[45px] rounded-[11px] border border-[#bdc9d4] flex items-center px-4">
                <FiCalendar
                  size={19}
                  className="text-[#657180]"
                />

                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  className="flex-1 outline-none text-right text-[13px] text-[#6b7480] placeholder:text-[#77808b] bg-transparent px-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-[22px] overflow-hidden">

        <div className="p-6">

          {/* Table Header */}
          <div className="overflow-x-auto">
            <div className="min-w-[1050px]">

              <div className="h-[52px] bg-[#edf5f8] rounded-full flex items-center px-5 text-[#525c69] text-[14px] font-medium">

                <div className="w-[130px] text-right">
                  معرف الفاتورة
                </div>

                <div className="w-[100px] text-center">
                  نوع الفاتورة
                </div>

                <div className="w-[100px] text-center">
                  المرجع
                </div>

                <div className="w-[200px] text-center">
                  اسم العميل
                </div>

                <div className="w-[120px] text-center">
                  التاريخ
                </div>

                <div className="w-[120px] text-center">
                  الإجمالي
                </div>

                <div className="w-[120px] text-center">
                  المتبقي
                </div>

                <div className="w-[100px] text-center">
                  المدفوع
                </div>

                <div className="flex-1 text-center">
                  الإجراءات
                </div>
              </div>

              {/* Rows */}
              <div>
                {invoices.map((invoice, index) => (
                  <div
                    key={index}
                    className="h-[66px] flex items-center px-5 border-b border-[#edf0f2] text-[14px]"
                  >

                    {/* Invoice */}
                    <div className="w-[130px] text-right">
                      <span className="text-[#087eaf] font-bold">
                        {invoice.id}
                      </span>
                    </div>

                    {/* Type */}
                    <div className="w-[100px] flex justify-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[12px] font-medium ${invoice.typeClass}`}
                      >
                        {invoice.type}
                      </span>
                    </div>

                    {/* Reference */}
                    <div className="w-[100px] text-center text-[#30363d]">
                      {invoice.reference}
                    </div>

                    {/* Customer */}
                    <div className="w-[200px] text-center text-[#30363d]">
                      {invoice.customer}
                    </div>

                    {/* Date */}
                    <div className="w-[120px] text-center text-[#30363d]">
                      {invoice.date}
                    </div>

                    {/* Total */}
                    <div className="w-[120px] text-center font-bold text-[#2f3439]">
                      {invoice.total}
                    </div>

                    {/* Remaining */}
                    <div
                      className={`w-[120px] text-center font-bold ${
                        invoice.remaining === "0.00"
                          ? "text-[#2f3439]"
                          : "text-[#10a64b]"
                      }`}
                    >
                      {invoice.remaining}
                    </div>

                    {/* Paid */}
                    <div
                      className={`w-[100px] text-center font-bold ${
                        invoice.paid !== "0.00"
                          ? "text-[#df222b]"
                          : "text-[#30363d]"
                      }`}
                    >
                      {invoice.paid}
                    </div>

                    {/* Actions */}
                    <div className="flex-1 flex justify-center gap-4 text-[#1683b3]">
                      <button>
                        <FiPrinter size={18} />
                      </button>

                      <button
                        type="button"
                        aria-label="عرض الفاتورة"
                        onClick={() => {
                          router.push(
                            `/accounts/Invoice/${encodeURIComponent(invoice.id)}`
                          );
                        }}
                      >
                        <FiEye size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-start gap-2 mt-6" dir="ltr">

            <button className="w-[36px] h-[36px] rounded-full border border-[#c4d0da] flex items-center justify-center text-[#b8c4cf]">
              <FiChevronLeft size={19} />
            </button>

            <button className="w-[36px] h-[36px] rounded-full border border-[#c4d0da] text-[#aab7c4] text-[14px]">
              30
            </button>

            <span className="text-[#9eabb8] px-1">...</span>

            <button className="w-[36px] h-[36px] rounded-full border border-[#c4d0da] text-[#aab7c4]">
              3
            </button>

            <button className="w-[36px] h-[36px] rounded-full border border-[#c4d0da] text-[#aab7c4]">
              2
            </button>

            <button className="w-[36px] h-[36px] rounded-full bg-[#277fa8] text-white">
              1
            </button>

            <button className="w-[36px] h-[36px] rounded-full border border-[#c4d0da] flex items-center justify-center text-[#b8c4cf]">
              <FiChevronRight size={19} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Table;