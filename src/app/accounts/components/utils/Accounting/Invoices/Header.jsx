"use client"
import { useRouter } from "next/navigation";
import React from "react";
import {
  FiSearch,
  FiBell,
  FiMail,
  FiInfo,
  FiGrid,
  FiChevronDown,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { MdPlayArrow } from "react-icons/md";

const Header = () => {
    const router = useRouter()
  return (
    <>

      <div
        className="mx-8 mt-4 h-[116px] bg-white rounded-[14px] px-6 flex items-center justify-between"
      >
        <div>
          <h1 className="text-[#167ca8] text-[26px] font-bold">
            سجل الفواتير العام
          </h1>

          <p className="text-[#555f6c] text-[15px] mt-2">
            إدارة ومراجعة كافة الفواتير الصادرة والمعاملات المالية
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="h-[45px] px-5 rounded-[12px] border border-[#1683b3] text-[#1683b3] flex items-center gap-2 text-[15px]">
            <span className="text-[20px]">⇧</span>
            تصدير التقرير
          </button>

          <button onClick={()=>{
            router.push("/accounts/Invoice/AddInvoice")
          }} className="h-[45px] px-5 rounded-[12px] bg-[#277fa8] text-white flex items-center gap-2 text-[15px]">
            <span className="text-[24px] leading-none">+</span>
            فاتورة جديدة
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;