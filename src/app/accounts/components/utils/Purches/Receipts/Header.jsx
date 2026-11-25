"use client";

import React from "react";
import { FiPlusSquare } from "react-icons/fi";

const Header = ({ onCreate, countLabel = "42 إذن استلام مسجل" }) => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 py-2">
      <div className="flex items-center gap-3">
        <h1 className="text-[28px] font-extrabold tracking-tight text-[#191C1E] leading-none">
          أذون الاستلام
        </h1>
        <span className="inline-flex items-center rounded-md bg-[#f1f5f9] px-2.5 py-1 text-[11.5px] font-bold text-[#64748b]">
          {countLabel}
        </span>
      </div>

      <button
        type="button"
        onClick={onCreate}
        className="inline-flex h-[42px] items-center gap-2 rounded-lg bg-[#0d658a] px-4 text-[13px] font-bold text-white transition hover:bg-[#094e6b]"
      >
        <FiPlusSquare className="h-4 w-4 shrink-0" />
        <span>تسجيل استلام جديد</span>
      </button>
    </header>
  );
};

export default Header;