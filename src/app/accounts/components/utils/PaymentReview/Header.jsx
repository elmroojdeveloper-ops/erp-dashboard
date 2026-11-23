"use client";

import React from "react";

const TopHeader = ({
  title = "مراجعة المدفوعات المعلقة",
  description = "إدارة وتدقيق التحويلات المالية الواردة للمطابقة مع الفواتير.",
}) => {
  return (
    <header
      className="flex min-h-[116px] flex-col justify-center rounded-2xl bg-white px-6 py-[26px] shadow-sm"
    >
      <h1 className="text-[24px] font-bold leading-8 text-[#1d6a8a]">{title}</h1>
      <p className="mt-2.5 text-[14px] leading-5 text-gray-800">{description}</p>
    </header>
  );
};

export default TopHeader;