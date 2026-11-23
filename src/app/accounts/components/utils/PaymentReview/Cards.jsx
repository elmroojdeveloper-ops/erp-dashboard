"use client";

import React from "react";
import { FiCalendar, FiCheckCircle } from "react-icons/fi";
import { HiOutlineEllipsisHorizontalCircle } from "react-icons/hi2";

const money = (n) =>
  Number(n || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const Cards = ({
  pending = { amount: 124500, count: 12 }, // بانتظار الاعتماد
  today = { amount: 45250, items: 5 }, // دفعات اليوم
  verified = { count: 18 }, // تم التحقق اليوم
}) => {
  return (
    <div dir="rtl" className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
      {/* ===== 1. بانتظار الاعتماد (أزرق داكن) ===== */}
      <div className="flex h-[140px] flex-col justify-between rounded-2xl bg-gradient-to-b from-[#20708f] to-[#0b4868] p-4 text-white shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-bold">بانتظار الاعتماد</p>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/40 bg-white/10">
            <HiOutlineEllipsisHorizontalCircle size={22} />
          </div>
        </div>

        <div>
          <p className="flex items-baseline gap-2 leading-10">
            <span className="text-[32px] font-bold">{money(pending.amount)}</span>
            <span className="text-[16px]">ر.س</span>
          </p>
          <p className="text-[14px] leading-5 text-white/90">
            إجمالي {pending.count} عملية
          </p>
        </div>
      </div>

      {/* ===== 2. دفعات اليوم ===== */}
      <div className="flex h-[140px] flex-col justify-between rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-bold text-gray-800">دفعات اليوم</p>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f0f5]">
            <FiCalendar size={20} className="text-[#1d6a8a]" />
          </div>
        </div>

        <div>
          <p className="flex items-baseline gap-2 leading-10">
            <span className="text-[32px] font-bold text-gray-900">
              {money(today.amount)}
            </span>
            <span className="text-[16px] text-gray-700">ر.س</span>
          </p>
          <p className="text-[14px] leading-5 text-gray-600">
            إجمالي {today.items} بنود
          </p>
        </div>
      </div>

      {/* ===== 3. تم التحقق اليوم ===== */}
      <div className="flex h-[140px] flex-col justify-between rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-bold text-gray-800">تم التحقق اليوم</p>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f0f5]">
            <FiCheckCircle size={20} className="text-[#1d6a8a]" />
          </div>
        </div>

        <div>
          <p className="flex items-baseline gap-2 leading-10">
            <span className="text-[32px] font-bold text-gray-900">
              {verified.count}
            </span>
            <span className="text-[16px] text-gray-700">عملية</span>
          </p>
          <p className="text-[14px] leading-5 text-gray-600">مكتمل</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;