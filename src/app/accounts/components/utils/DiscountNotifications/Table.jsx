"use client";

import React from "react";
import {
  FiSearch,
  FiRefreshCw,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiPrinter,
  FiDownload,
  FiEdit2,
  FiTrash2,
  FiHash,
  FiPlusCircle,
} from "react-icons/fi";
import { HiUser } from "react-icons/hi2";
import empty from "../../../../../images/empty-notes.png"
import Image from "next/image";
import { useRouter } from "next/navigation";

const data = [
    {
      code: "CN-2023-0892",
      invoice: "#INV-2024-002",
      customer: "مؤسسة الحلول المبتكرة",
      customerId: "ID: 44231",
      reason: "مرتجعات",
      reasonColor: "bg-[#FFF3E0] text-[#E65100]",
      date: "15 أكتوبر 2023",
      time: "10:45 صباحاً",
      amount: "4,500 ر.س",
      status: "معتمد",
      statusColor: "bg-[#E6F4EA] text-[#2E7D32]",
      actions: "view",
    },
    {
      code: "CN-2023-0893",
      invoice: "#INV-2024-045",
      customer: "مؤسسة فهد للتقنية",
      customerId: "عمل قطاع خاص",
      reason: "خطأ في السعر",
      reasonColor: "bg-[#FDECEC] text-[#C62828]",
      date: "15 أكتوبر 2023",
      time: "10:45 صباحاً",
      amount: "1,250 ر.س",
      status: "مسودة",
      statusColor: "bg-[#ECEFF1] text-[#607D8B]",
      actions: "edit",
    },
    {
      code: "CN-2023-0892",
      invoice: "#INV-2024-002",
      customer: "مؤسسة الحلول المبتكرة",
      customerId: "ID: 44231",
      reason: "خصم إضافي",
      reasonColor: "bg-[#E3F2FD] text-[#1565C0]",
      date: "15 أكتوبر 2023",
      time: "10:45 صباحاً",
      amount: "4,500 ر.س",
      status: "معتمد",
      statusColor: "bg-[#E6F4EA] text-[#2E7D32]",
      actions: "view",
    },
  ];

const reasonStyles = {
  "مرتجعات": "bg-[#fdf0e1] text-[#d9822b]",
  "خطأ في السعر": "bg-[#fde8e8] text-[#c62828]",
  "خصم إضافي": "bg-[#e3eef6] text-[#1d6a8a]",
};

const statusStyles = {
  "معتمد": "bg-[#e4f2ea] text-[#2e7d4f]",
  "مسودة": "bg-[#ececec] text-[#555]",
};

const Field = ({ label, children }) => (
  <div>
    {label && (
      <label className="mb-2 block text-right text-[13px] text-gray-500">
        {label}
      </label>
    )}
    {children}
  </div>
);

const Table = () => {
    
  const hasData = data && data.length > 0;
  const router =useRouter()

  // ستايل الحقول يختلف حسب الحالة
  const inputBase = hasData
    ? "h-11 w-full rounded-xl bg-[#eef3f6] px-4 text-[14px] text-gray-700 outline-none placeholder:text-gray-700 focus:ring-1 focus:ring-[#1d6a8a]"
    : "h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-[14px] text-gray-700 outline-none placeholder:text-gray-400 focus:border-[#1d6a8a]";

  return (
    <div dir="rtl" className="space-y-6">
      {/* ================= 1. شريط الفلترة ================= */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        {hasData ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            <Field label="سبب الخصم">
              <div className="relative">
                <select className={`${inputBase} appearance-none pl-9`}>
                  <option>الكل</option>
                  <option>مرتجعات</option>
                  <option>خطأ في السعر</option>
                  <option>خصم إضافي</option>
                </select>
                <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6D717F]" />
              </div>
            </Field>

            <Field label="المندوب">
              <div className="relative">
                <select className={`${inputBase} appearance-none pl-9`}>
                  <option>الكل</option>
                  <option>أحمد علي</option>
                  <option>محمد سعيد</option>
                </select>
                <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6D717F]" />
              </div>
            </Field>

            <Field label="من تاريخ">
              <input type="text" placeholder="1-5-2026" className={inputBase} />
            </Field>

            <Field label="إلى تاريخ">
              <input type="text" placeholder="1-5-2026" className={inputBase} />
            </Field>

            <Field label="بحث">
              <div className="relative">
                <FiSearch className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6D717F]" />
                <input
                  type="text"
                  placeholder="بحث الإشعار أو الفاتورة"
                  className={`${inputBase} pr-10 placeholder:text-gray-400`}
                />
              </div>
            </Field>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-[1fr_1fr_1fr_auto]">
            <Field label="العميل">
              <div className="relative">
                <select
                  defaultValue=""
                  className={`${inputBase} border border-[#BFC7CF] appearance-none pl-9 text-gray-400`}
                >
                  <option value="" disabled>
                    اختر العميل...
                  </option>
                  <option>مؤسسة الحلول المبتكرة</option>
                  <option>مؤسسة فهد للتقنية</option>
                </select>
                <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </Field>

            <Field label="رقم الفاتورة">
              <div className="relative">
                <FiHash className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="مثال: 1200"
                  className={`${inputBase} border border-[#BFC7CF] pr-10`}
                />
              </div>
            </Field>

            <Field>
              <div className="relative">
                <FiSearch className="pointer-events-none  absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="بحث"
                  className={`${inputBase} border border-[#BFC7CF] pr-10`}
                />
              </div>
            </Field>

            <button
              type="button"
              className="flex text-[#6D717F] border-[#BFC7CF] h-11 w-11 items-center justify-center rounded-xl border  bg-white text-gray-600 transition-colors hover:bg-gray-50"
              aria-label="تحديث"
            >
              <FiRefreshCw size={18} />
            </button>
          </div>
        )}
      </div>

      {/* ================= 2. الجدول / الحالة الفارغة ================= */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {hasData ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] table-fixed text-right">
                <thead>
                  <tr>
                    <th className="w-[16%] bg-[#eef3f6] py-3.5 pr-6 text-[14px] font-medium text-gray-700 first:rounded-r-full">
                      رقم الإشعار / الفاتورة
                    </th>
                    <th className="w-[25%] bg-[#eef3f6] px-3 py-3.5 text-[14px] font-medium text-gray-700">
                      العميل
                    </th>
                    <th className="w-[11%] bg-[#eef3f6] px-3 py-3.5 text-[14px] font-medium text-gray-700">
                      سبب الخصم
                    </th>
                    <th className="w-[14%] bg-[#eef3f6] px-3 py-3.5 text-[14px] font-medium text-gray-700">
                      التاريخ
                    </th>
                    <th className="w-[12%] bg-[#eef3f6] px-3 py-3.5 text-[14px] font-medium text-gray-700">
                      إجمالي المبلغ
                    </th>
                    <th className="w-[10%] bg-[#eef3f6] px-3 py-3.5 text-[14px] font-medium text-gray-700">
                      الحالة
                    </th>
                    <th className="w-[12%] bg-[#eef3f6] py-3.5 pl-6 pr-3 text-[14px] font-medium text-gray-700 last:rounded-l-full">
                      الإجراءات
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((row) => (
                    <tr key={row.id}>
                      {/* رقم الإشعار / الفاتورة */}
                      <td className="py-3.5 pr-6">
                        <p className="text-[14px] font-bold text-[#1d6a8a]">
                          {row.invoiceNumber}
                        </p>
                        <p className="mt-1 text-[12px] text-gray-500">
                          {row.noticeNumber}
                        </p>
                      </td>

                      {/* العميل */}
                      <td className="px-3 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e3eef4] text-[#1d6a8a]">
                            <HiUser size={16} />
                          </div>
                          <div>
                            <p className="text-[14px] font-bold text-gray-800">
                              {row.clientName}
                            </p>
                            <p className="mt-0.5 text-[12px] text-[#1d6a8a]">
                              {row.clientType}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* سبب الخصم */}
                      <td className="px-3 py-3.5">
                        <span
                          className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium ${
                            reasonStyles[row.reason] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {row.reason}
                        </span>
                      </td>

                      {/* التاريخ */}
                      <td className="px-3 py-3.5">
                        <p className="text-[14px] font-bold text-gray-800">
                          {row.date}
                        </p>
                        <p className="mt-0.5 text-[12px] text-[#1d6a8a]">
                          {row.time}
                        </p>
                      </td>

                      {/* إجمالي المبلغ */}
                      <td className="px-3 py-3.5">
                        <span className="text-[15px] font-bold text-gray-800">
                          {row.amount}
                        </span>{" "}
                        <span className="text-[13px] text-gray-600">ر.س</span>
                      </td>

                      {/* الحالة */}
                      <td className="px-3 py-3.5">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-[11px] font-medium ${
                            statusStyles[row.status] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>

                      {/* الإجراءات */}
                      <td className="py-3.5 pl-6 pr-3">
                        <div className="flex items-center gap-3.5 text-[#1d6a8a]">
                          {row.status === "معتمد" ? (
                            <>
                              <button onClick={()=>{
                                router.push(`/accounts/DiscountNotifications/${row.id}`)
                              }} type="button" aria-label="عرض">
                                <FiEye size={18} />
                              </button>
                              <button type="button" aria-label="طباعة">
                                <FiPrinter size={18} />
                              </button>
                              <button type="button" aria-label="تحميل">
                                <FiDownload size={18} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button type="button" aria-label="تعديل">
                                <FiEdit2 size={18} />
                              </button>
                              <button
                                type="button"
                                aria-label="حذف"
                                className="text-[#c62828]"
                              >
                                <FiTrash2 size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* الترقيم (على الشمال) */}
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50"
              >
                <FiChevronRight size={16} />
              </button>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1d6a8a] text-[14px] font-bold text-white"
              >
                1
              </button>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-[14px] text-gray-500 hover:bg-gray-50"
              >
                2
              </button>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-[14px] text-gray-500 hover:bg-gray-50"
              >
                3
              </button>
              <span className="px-0.5 text-gray-400">...</span>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-[14px] text-gray-500 hover:bg-gray-50"
              >
                30
              </button>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50"
              >
                <FiChevronLeft size={16} />
              </button>
            </div>
          </>
        ) : (
          /* ---------- الحالة الفارغة ---------- */
          <div className="flex min-h-[700px] flex-col items-center justify-center px-4 py-8 text-center">
            <Image
              src={empty}
              alt="لا توجد بيانات"
              className="mb-10 h-auto w-[320px] object-contain md:w-[580px]"
            />

            <h2 className="mb-3 text-[28px] font-bold text-gray-900 md:text-[32px]">
              لا توجد شعارات مدينة مسجلة حالياً
            </h2>

            <p className="mb-8 max-w-[560px] text-[16px] leading-8 text-gray-500">
              سجل الشعارات المدينة الخاص بك فارغ تماماً. يمكنك البدء في إدارة
              مستنداتك المحاسبية بكفاءة عالية.
            </p>

            <button
            onClick={()=>{
                router.push("/accounts/DiscountNotifications/Add")
            }}
              type="button"
              className="flex h-11 items-center gap-2 rounded-xl bg-gradient-to-b from-[#1d6a8a] to-[#0d4a6b] px-5 text-[14px] font-medium text-white shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
            >
              <FiPlusCircle size={20} />
              إنشاء شعار مدين
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;