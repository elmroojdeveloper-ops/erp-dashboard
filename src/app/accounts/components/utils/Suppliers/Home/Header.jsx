"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FiPlus } from "react-icons/fi";

const SuppliersHeader = ({
  title = "سجل الموردين",
  countText = "342 مورد مسجل",
  buttonText = "إضافة مورد",
}) => {
  const router =useRouter()
  return (
    <div
      dir="rtl"
      className="flex flex-wrap mt-8 items-center justify-between gap-4 rounded-[20px] border border-[#e6ecf2] bg-white px-5 py-4 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Right Side: Title + Count Pill */}
      <div className="flex items-center gap-3">
        <h1 className="text-[22px] font-black leading-tight text-[#086382]">
          {title}
        </h1>
        <span
          className="rounded-full bg-[#eef4f8] px-3 py-1 text-[11.5px] font-bold text-[#086382] tabular-nums"
          dir="auto"
        >
          {countText}
        </span>
      </div>

      {/* Left Side: Primary Action Button */}
      <button
        type="button"
        onClick={()=>{
          router.push("/accounts/Supliers/AddSupplierPage")
        }}
        className="inline-flex h-[40px] items-center gap-2 rounded-[10px] bg-[#166d8e] px-4 text-[13px] font-extrabold text-white transition hover:bg-[#086382]"
      >
        <FiPlus className="h-4 w-4 stroke-[2.5]" />
        <span>{buttonText}</span>
      </button>
    </div>
  );
};

export default SuppliersHeader;