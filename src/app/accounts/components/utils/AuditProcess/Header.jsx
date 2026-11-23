"use client";

import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import AddAudit from "./AddAudit";

const cx = (...c) => c.filter(Boolean).join(" ");

const Header = ({
  title = "عمليات التدقيق",
  subtitle = "إدارة ومراجعة عمليات التدقيق الدوري والامتثال للمؤسسة",
  ctaLabel = "إنشاء عملية تدقيق جديدة",
  onCreateAudit,
  className = "",
}) => {
    const [openAddAudit,setOpenAddAudit]=useState(false)
  return  <>
  {
    openAddAudit && <AddAudit setOpenAddAudit={setOpenAddAudit} openAddAudit={openAddAudit}/>
  }
    <header
      dir="rtl"
      className={cx(
        "rounded-[22px] bg-white px-7 py-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* يمين: العنوان والوصف */}
        <div className="space-y-1 text-right">
          <h1 className="text-[22px] font-extrabold tracking-tight text-[#1b7398]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[16px] font-medium text-[#4D5461]">
              {subtitle}
            </p>
          )}
        </div>

        {/* يسار: زر إنشاء عملية تدقيق جديدة */}
        <button
          type="button"
          onClick={() => setOpenAddAudit(true)}
          className="inline-flex h-[42px] items-center justify-center gap-2 rounded-xl bg-[#1b7398] px-5 text-[13.5px] font-bold text-white shadow-xs transition-colors hover:bg-[#165e7d]"
        >
          <FiPlus size={16} strokeWidth={2.5} />
          <span>{ctaLabel}</span>
        </button>
      </div>
    </header>

 </>
};

export default Header;