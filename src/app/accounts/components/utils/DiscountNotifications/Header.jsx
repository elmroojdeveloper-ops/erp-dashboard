"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FiPlus } from "react-icons/fi";

const PageHeader = () => {
    const router =useRouter()
  return (
    <div
      dir="rtl"
      className="flex items-center justify-between rounded-2xl bg-white px-6 py-6 mb-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
    >
      {/* عنوان الصفحة (يمين) */}
      <h1 className="text-[26px] font-bold leading-none text-[#1d6a8a]">
        سجل شعارات الخصم
      </h1>

      {/* زر إنشاء شعار مدين (يسار) */}
      <button
      onClick={()=>{
                router.push("/accounts/DiscountNotifications/Add")
            }}
        type="button"
        dir="ltr"
        className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#1d6a8a] px-4 text-[15px] font-medium text-white transition-all hover:bg-[#15516b] active:scale-[0.98]"
      >
        <FiPlus className="text-xl" strokeWidth={1.5} />
        <span dir="rtl">إنشاء شعار مدين</span>
      </button>
    </div>
  );
};

export default PageHeader;