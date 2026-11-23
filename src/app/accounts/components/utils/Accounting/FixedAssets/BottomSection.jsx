"use client";

import { FiAlertTriangle, FiPieChart, FiTrendingUp } from "react-icons/fi";

export default function BottomSection() {
  return (
    <div dir="rtl" className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* 1 - تنبيهات الاستهلاك القادم */}
      <div className="rounded-2xl bg-white p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[17px] font-bold text-[#1E7A9B]">
            تنبيهات الاستهلاك القادم
          </h3>
          <FiAlertTriangle className="size-5 text-[#E8A020]" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-xl bg-[#F2F4F7] px-4 py-3">
            <div>
              <p className="text-sm font-bold text-[#2D3748]">طابعة ليزر HP</p>
              <p className="mt-1 text-xs font-medium text-[#D93A3A]">
                تنتهي في 3 أيام
              </p>
            </div>
            <span className="text-sm font-bold text-[#2D3748]">850.00 SAR</span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-[#F2F4F7] px-4 py-3">
            <div>
              <p className="text-sm font-bold text-[#2D3748]">سيارة نقل خفيف</p>
              <p className="mt-1 text-xs font-medium text-[#D98A1A]">
                تنتهي في 3 أيام
              </p>
            </div>
            <span className="text-sm font-bold text-[#2D3748]">12,400.00 SAR</span>
          </div>
        </div>
      </div>

      {/* 2 - توزيع الأصول حسب الحالة */}
      <div className="rounded-2xl bg-white p-5 shadow-card">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-[17px] font-bold text-[#1E7A9B]">
            توزيع الأصول حسب الحالة
          </h3>
          <FiPieChart className="size-6 text-[#8A9BA8]" />
        </div>

        {/* البار */}
        <div className="flex h-4 w-full overflow-hidden rounded-full" dir="ltr">
          <div className="h-full w-[85%] bg-[#1AA386]" />
          <div className="h-full w-[10%] bg-[#B25A1A]" />
          <div className="h-full w-[5%] bg-[#D93A3A]" />
        </div>

        <div className="mt-14 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#5A6B7A]">
            <span className="size-2 rounded-full bg-[#1AA386]" />
            في الخدمة (85%)
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#5A6B7A]">
            <span className="size-2 rounded-full bg-[#B25A1A]" />
            صيانة (10%)
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#5A6B7A]">
            <span className="size-2 rounded-full bg-[#D93A3A]" />
            تصرف (5%)
          </div>
        </div>
      </div>

      {/* 3 - صافي القيمة الدفترية */}
      <div className="relative overflow-hidden rounded-2xl bg-[#1E7A9B] p-5 text-white shadow-card">
        {/* الدواير اللي ورا */}
        <div className="pointer-events-none absolute -left-16 -top-16 size-48 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -right-10 -top-24 size-32 rounded-full bg-white/5" />

        <div className="relative">
          <h3 className="text-end text-[17px] font-medium">
            صافي القيمة الدفترية
          </h3>

          <p className="mt-8 text-center text-[36px] font-extrabold leading-none tracking-tight">
            4,852,190.00
            <span className="mr-2 text-base font-medium">ر.س</span>
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="text-sm text-white/90">مقارنة بالشهر السابق</span>
            <span className="flex items-center gap-1 rounded-md bg-[#1AA386]/90 px-2 py-1 text-xs font-bold">
              <FiTrendingUp className="size-3.5" />
              +2.4%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}