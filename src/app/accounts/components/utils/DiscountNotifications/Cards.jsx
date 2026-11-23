"use client";

import React from "react";
import { FiAlertCircle, FiZap, FiTrendingUp } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { HiOutlineCheckBadge } from "react-icons/hi2";

/**
 * كل القيم props، والقيم الافتراضية هي حالة "مفيش داتا".
 * مثال لحالة فيها داتا:
 * <Cards
 *   totalDiscounts="45,67"
 *   issuedCount={12}
 *   topReason={{ percent: 62, label: "مرتجعات" }}
 *   growth={12}
 *   unpaidCount={7}
 * />
 */
const Cards = ({
  totalDiscounts = "0",
  issuedCount = 0,
  topReason = null, // { percent: 62, label: "مرتجعات" }
  growth = null, // 12
  unpaidCount = 0,
}) => {
  return (
    <div dir="rtl" className="grid mb-6 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {/* ===== 1. إجمالي الخصومات الشهرية (أزرق داكن) ===== */}
      <div className="flex min-h-[134px] flex-col justify-between rounded-2xl bg-gradient-to-b from-[#20708f] to-[#0b4868] p-4 text-white shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <p className="max-w-[130px] text-[15px] font-bold leading-snug">
            إجمالي الخصومات الشهرية
          </p>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/40 bg-white/10">
            <IoWalletOutline className="text-xl" />
          </div>
        </div>

        <div dir="ltr" className="flex items-baseline justify-end gap-2">
          <span className="text-[15px] font-medium">SAR</span>
          <span className="text-[28px] font-extrabold leading-none">
            {totalDiscounts}
          </span>
        </div>
      </div>

      {/* ===== 2. عدد الإشعارات الصادرة ===== */}
      <div className="flex min-h-[134px] flex-col justify-between rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[15px] font-bold text-gray-800">
            عدد الإشعارات الصادرة
          </p>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f0f5]">
            <FiZap className="text-xl text-[#1d6a8a]" />
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-[28px] font-extrabold leading-none text-[#3a4256]">
            {issuedCount}
          </span>
          <span className="text-[16px] text-gray-500">شعاراً</span>
        </div>
      </div>

      {/* ===== 3. أكثر الأسباب تكراراً ===== */}
      <div className="flex min-h-[134px] flex-col justify-between rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[15px] font-bold text-gray-800">
            أكثر الأسباب تكراراً
          </p>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f0f5]">
            <HiOutlineCheckBadge className="text-[22px] text-[#1d6a8a]" />
          </div>
        </div>

        <div className="space-y-2">
          {topReason && (
            <div className="flex items-center gap-2">
              <span className="text-[16px] text-gray-700">
                {topReason.percent}%
              </span>
              <span className="rounded-full bg-[#fdf0e1] px-3 py-0.5 text-[11px] font-medium text-[#d9822b]">
                {topReason.label}
              </span>
            </div>
          )}

          <p className="flex items-center gap-1.5 text-[12px] text-gray-600">
            <FiTrendingUp className="text-sm" />
            <span>
              {growth !== null
                ? `زيادة ${growth}% عن الشهر الماضي`
                : "زيادة ــ % عن الشهر الماضي"}
            </span>
          </p>
        </div>
      </div>

      {/* ===== 4. فواتير مدفوعة بالكامل ===== */}
      <div className="flex min-h-[134px] flex-col justify-between rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[15px] font-bold text-gray-800">
            فواتير مدفوعة بالكامل
          </p>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fdecea]">
            <FiAlertCircle className="text-xl text-[#c62828]" />
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-extrabold leading-none text-[#c62828]">
              {unpaidCount}
            </span>
            <span className="text-[16px] text-[#c62828]">إشعارات مرتبطة</span>
          </div>
          <p className="mt-2 text-[11px] font-bold text-[#c62828]">
            تحتاج إلى مراجعة مالية لاسترداد المبالغ.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;